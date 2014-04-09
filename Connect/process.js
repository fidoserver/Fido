var fs = require('fs')
var request = require('request')
var _ = require('underscore')
var l = require('../lib/log.js')
var Config = JSON.parse(fs.readFileSync('../config.json', {encoding:'utf8'})) 
l.context = __filename

require('getmac').getMac(function(err,macAddress){
  deviceId = macAddress
  l.g('deviceId: ' + deviceId)

  var callHome = function() {
    request(
      {
        method: 'POST',
        uri: Config.Home.Url + '/device/call',
        json: {deviceId: deviceId}
      },
      function(err, response) {
        if (err) l.g(err)
        if (response) l.g(JSON.stringify(response.body))
      }
    )
  }
  callHome()
  setInterval(callHome, 5000)
  console.log('forever::ready')
})

