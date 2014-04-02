var fs = require('fs')
var l = require('../../lib/log.js')
l.context = 'Sensors/temper1/poll.js'

var thermometers=require("temper1")
var devices=thermometers.getDevices()
if (!devices || devices.length == 0) return l.g('No devices found')

thermometers.readTemperature(devices[0], function(err, value) {
  if(err) return l.g(err)
  fs.writeFile("/srv/tmp/temper1", value, function(err) {
    if(err) return l.g(err)
      console.log('wrote ' + value)
  })
})

