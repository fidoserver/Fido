var request = require('request')
var fs = require('fs')
var moment = require('moment')
var HiveSettings = require('../../Hive/Settings.js')
var nano = require('nano')(HiveSettings.CouchDB.URL)
var configDb = nano.db.use('config')
var l = require('../lib/log.js')
l.context = __filename 


var interval = 60*1000

function go() {
  getMacAddress()
}

// Get our macaddress

var macAddress = ''

var getMacAddress = function() {
  require('getmac').getMac(function(err,data){
    if (err) l.g(err)
    macAddress = data
    checkForBeeInHive()
  })
}

// Check for existence of our Bee in the Hive
var checkForBeeInHive = function() {
  l.g('Checking for existense of us as a Bee.')
  configDb.view('api', 'BeesByAddress', {keys: [macAddress]}, function (err, response) {
    if(err) l.g(err)
      console.log(JSON.stringify(response.rows))
    if (response.rows == 0) 
      createBee()
    else
      setTimer()
  })
}

// If no Bee in the Hive, create us
var createBee = function() {
  l.g('Bee not found. Creating us.')
  request({ 
    "url": HiveSettings.Queen.URL + "/egg/new", 
    method: "POST", 
    json: {
      "sensors": ["0x02"], 
      "address": macAddress
    }
  }, function(err, response, body) {
    if(err) return l.g(err)
    l.g('birthed this bee')
    return setTimer()
  }) 
}

// Set the timer to poll the Hive at the interval
var setTimer = function() {

  setInterval(function() {

    fs.readFile('/srv/tmp/temper1', {encoding:'utf8'}, function(err, value) {

      if(err) return console.log(err)

      var dateTime = moment().format("HH:mm:ss, DD/MM/YY")
      var data = JSON.parse('{"address":"' + macAddress + '", "data": {"' + dateTime + '": "' + value.toString(16) + '"}}') 
      request({url:"http://127.0.0.1:126", method: "POST", json: data}, function(err, response, body) {
        if (err) return console.log(err)
      })
      
    })

  }, interval)

  l.g('Timer set to poll at an interval of ' + interval)
  console.log('forever::ready')

}

go()
