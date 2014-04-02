var fs = require('fs')
var _ = require('underscore')
var l = require('./lib/log.js')
var sendMail = require('./lib/SendEmail.js')
var convertCtoF = require('./lib/ConvertCtoF.js')
l.context = 'server.js'

// Set up app and server
var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)
app.use(require('express').bodyParser())

// Dummy thermometer code
var thermometers = {
  readTemperature: function(devices, callback) {
    callback(null, 32)
  }
}
var devices = [null]




/*
 * Express routes
 */

app.get('/settings', function(req, res) {
  fs.readFile(__dirname + "/settings.json", function(err, body) {
    if (err)  l.g(err) 
    if (!body) body = '{}'
    res.send(body)
  })
})

app.post('/settings', function(req, res) {
  var newSettings = req.body
  fs.readFile(__dirname + "/settings.json",{format: 'utf8'}, function(err, body) {
    if (body) {
      var oldSettings = JSON.parse(body)
    }
    else {
      var oldSettings = {}
    }
    var newWifiSettings = false
    if (newSettings.wifiSSID !== oldSettings.wifiSSID 
      || newSettings.wifiPassword !== oldSettings.wifiPassword 
      || newSettings.hostName !== oldSettings.hostName) {
        reconfigureSettings = true  
    }
    fs.writeFile(__dirname + "/settings.json", JSON.stringify(newSettings), function(err) {
      if (err) return l.g(err)
      if (reconfigureSettings == true) {
        require('./lib/ReconfigureNetwork')(newSettings.wifiSSID, newSettings.wifiPassword, newSettings.wifiSecurityType, function(err) {
          if (err) return l.g(err)
          require('./lib/ReconfigureHostname')(newSettings.hostName, oldSettings.hostName, function(err) {
            if (err) return l.g(err)
            require('./lib/Reboot')(function() {l.g('reboot has been issued')})
            res.send(newSettings)
          })
        })
      }
      else {
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
  l.g('User connected')
  // set interval
  setInterval(function(){
    l.g('read temperature')
    thermometers.readTemperature(devices[0], function(err, value) {
      l.g('emit temperature')
      socket.emit('temperature',{number: value.toString()})
    })
  }, 5000)
  // start quickly
  thermometers.readTemperature(devices[0], function(err, value) {
    socket.emit('temperature',{number: value.toString()})
  })
})



/*
 * Monitor readings for alert

var alertMonitorFrequency = 5000
setInterval(function() {
  fs.readFile(__dirname + '/settings.json', {encoding:'utf8'}, function(err, body) {
    if (err) return l.g(err)
    var settings = JSON.parse(body) 
    if(!settings.hasOwnProperty('alertSwitch') 
      || settings.alertSwitch == "off" 
      || settings.alertSwitch == "" 
      || settings.alertSwitch == null) 
        return l.g('Alerts are off') 

    thermometers.readTemperature(devices[0], function(err, value) {
      l.g('value found to evaluate for trigger: ' + value)
      var temperature = convertCtoF(value) 
      if(temperature > parseInt(settings.alertUpperLimit)) {
        l.g('sending an alert')
        sendMail('A temperature of ' + temperature + ' degrees F has been detected.', function(err) {
          if(err) l.g(err)  
        })    
        settings.alertSwitch = 'off'
        fs.writeFile(__dirname + '/data/settings.json', JSON.stringify(settings), function(err) {
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
        fs.writeFile(__dirname + '/settings.json', JSON.stringify(settings), function(err) {
          if(err) return l.g(err)  
        }) 
      }
    })    
  })
}, alertMonitorFrequency)

 */


/*
 * Listen
 */

server.listen(80)
l.g('server now listening at port 80')

var counter = 0 
// I'm alive every minute
setInterval(function() {
  l.g('I\'m alive for ' + counter + ' minutes.')
  counter++
}, 60*1000)
l.g('I\'m alive for ' + counter + ' minutes.')
counter++

