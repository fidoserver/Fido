var fs = require('fs')
var request = require('request-json')
var _ = require('underscore')
var l = require('../lib/log.js')
var sendMail = require('./lib/SendEmail.js')
var convertCtoF = require('./lib/ConvertCtoF.js')
var config = JSON.parse(fs.readFileSync(__dirname + '/../config.json', 'utf8'))
l.context = __filename

var sensorPollIntervalDuringSocketIoConnection = 1000
var alertMonitorFrequency = 5000



/*
 * Set up app server
 */

var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)
io.set('log level', 1)
app.use(require('express').bodyParser())



/*
 * Express routes
 */

app.get('/updater/get-available-updates', function(req, res) {
  if(config.hasOwnProperty('Updater')) {
    var client = request.newClient(config.Updater.Url)
    client.get('get-available-updates', function(error, response, body) {
      res.send(JSON.stringify(body))
    })
  }
})

app.get('/updater/run-available-updates', function(req, res) {
  if(config.hasOwnProperty('Updater')) {
    var client = request.newClient(config.Updater.Url)
    client.get('run-available-updates', function(error, response, body) {
      res.send(JSON.stringify(body))
    })
  }
})
  



app.get('/settings', function(req, res) {
  fs.readFile(__dirname + "/../settings.json", function(err, body) {
    if (err)  l.g(err) 
    if (!body) body = '{}'
    res.send(body)
  })
})

app.post('/settings', function(req, res) {
l.g('hello world')
  var newSettings = req.body
  var newWifiSettings = false
  var newHostName = false
  fs.readFile(__dirname + "/../settings.json",{encoding: 'utf8'}, function(err, body) {
    if (body) {
      var oldSettings = JSON.parse(body)
    }
    else {
      var oldSettings = {}
    }
    if ( newSettings.wifiSSID !== '' &&
      (newSettings.wifiSSID !== oldSettings.wifiSSID 
      || newSettings.wifiPassword !== oldSettings.wifiPassword)) {
        newWifiSettings = true  
    }
    if ( newSettings.hostName !== '' && newSettings.hostName !== oldSettings.hostName) {
      newHostName = true  
    }
    fs.writeFile(__dirname + "/../settings.json", JSON.stringify(newSettings), function(err) {
      if (err) return l.g(err)
      if (newWifiSettings == true && newHostName == true) {
        l.g('newHostName is true and newWifiSettings is true')
        require('./lib/ReconfigureNetwork')(newSettings.wifiSSID, newSettings.wifiPassword, newSettings.wifiSecurityType, function(err) {
          if (err) return l.g(err)
          require('./lib/ReconfigureHostname')(newSettings.hostName, oldSettings.hostName, function(err) {
            if (err) return l.g(err)
            require('./lib/Reboot')(function() {l.g('reboot has been issued')})
            res.send(newSettings)
          })
        })
      }
      else if (newWifiSettings == true) {
        l.g('newWifiSettings is true')
        require('./lib/ReconfigureNetwork')(newSettings.wifiSSID, newSettings.wifiPassword, newSettings.wifiSecurityType, function(err) {
          if (err) return l.g(err)
          require('./lib/Reboot')(function() {l.g('reboot has been issued')})
          res.send(newSettings)
        })
      }
      else if (newHostName == true) {
        l.g('newHostName is true')
        require('./lib/ReconfigureHostname')(newSettings.hostName, oldSettings.hostName, function(err) {
          if (err) return l.g(err)
          require('./lib/Reboot')(function() {l.g('reboot has been issued')})
          res.send(newSettings)
        })
      }
      else if (newSettings.Sensor !== oldSettings.Sensor) {
        require('./lib/Reboot')(function() {l.g('reboot has been issued')})
        res.send(newSettings)
      }
      else {
        l.g('newHostName is false and newWifiSettings is false')
        res.send(newSettings)
      }
    })
  })
})

app.get(/^(.+)$/, function(req, res) { 
  res.sendfile(__dirname + '/public/' + req.params[0]) 
})



/*
 * Socket.io channels for UI
 */

io.sockets.on('connection', function(socket){
  l.g('User connected via socket.io')
  // set interval
  // @todo Look for no connection and kill this timer
  var settings = JSON.parse(fs.readFileSync(__dirname + '/../settings.json', 'utf8'))
  setInterval(function(){
    fs.readFile('/srv/tmp/' + settings.Sensor, {encoding:'utf8'}, function(err, value) {
      socket.emit('temperature',{number: value})
    })
  }, sensorPollIntervalDuringSocketIoConnection)
  // start quickly
  fs.readFile('/srv/tmp/' + settings.Sensor, {encoding:'utf8'}, function(err, value) {
    socket.emit('temperature',{number: value})
  })
})



/*
 * Monitor readings for alert
 */
setInterval(function() {

  fs.readFile(__dirname + '/../settings.json', {encoding:'utf8'}, function(err, body) {
    if (err) return l.g(err)
    if (body == "") return
    var settings = JSON.parse(body) 
    if(!settings.hasOwnProperty('alertSwitch') 
      || settings.alertSwitch == "off" 
      || settings.alertSwitch == "" 
      || settings.alertSwitch == null) 
        return  

    fs.readFile('/srv/tmp/' + settings.Sensor, {encoding:'utf8'}, function(err, value) {
      l.g('value found to evaluate for trigger: ' + value)
      var temperature = convertCtoF(value) 
      if(temperature > parseInt(settings.alertUpperLimit)) {
        l.g('sending an alert')
        sendMail('A temperature of ' + temperature + ' degrees F has been detected.', function(err) {
          if(err) l.g(err)  
        })    
        settings.alertSwitch = 'off'
        fs.writeFile(__dirname + '/../settings.json', JSON.stringify(settings), function(err) {
          if(err) l.g(err)  
        }) 
      }
      if(temperature < settings.alertLowerLimit) {
        l.g('sending an alert')
        sendMail('A temperature of ' + temperature + ' degrees F has been detected.', function(err, message) {
          if(err) return l.g(err)  
          return l.g(message) 

        })    
        settings.alertSwitch = 'off'
        fs.writeFile(__dirname + '/../settings.json', JSON.stringify(settings), function(err) {
          if(err) return l.g(err)  
        }) 
      }
    })    

  })

}, alertMonitorFrequency)





/*
 * Set App Server to listen
 */

server.listen(80)
l.g('server now listening at port 80')




/*
 * Log the alive time
 */
var counter = 0 
// I'm alive every minute
setInterval(function() {
  l.g('I\'m alive for ' + counter + ' minutes.')
  counter++
}, 60*1000)
l.g('I\'m alive for ' + counter + ' minutes.')
counter++


console.log('forever::ready')

