var request = require('request')
var fs = require('fs')
var moment = require('moment')
var l = require('../lib/log.js')
l.context = 'Bee/process.js'

var interval = 60*1000

fs.readFile(__dirname + '/macaddress','utf8', function(err, macAddress) {

  if(err) return console.log(err)

  setInterval(function() {

    fs.readFile('/srv/tmp/temper1', {encoding:'utf8'}, function(err, value) {

      if(err) return console.log(err)

      var celsius = value
      var farenheit = ((celsius*9)/5) + 32 
      
      celsius = celsius.toString()
      if(celsius.length > 5) celsius = celsius.substr(0,4)
      if(celsius.length < 5) {
        while(celsius.length < 5) {
          if(celsius.indexOf('.') == -1) {
            celsius += '.' 
          }
          else {
            celsius += '0'
          }
        }
      }

 
      farenheit = farenheit.toString()
      if(farenheit.length > 5) farenheit = farenheit.substr(0,4)
      if(farenheit.length < 5) {
        while(farenheit.length < 5) {
          if(farenheit.indexOf('.') == -1) {
            farenheit += '.' 
          }
          else {
            farenheit += '0'
          }
        }
      }

      console.log(moment().format('YYYY-MM-DD hh:mm:ss') + ' - ' + farenheit + ' - ' + celsius);

      var dateTime = moment().format("HH:mm:ss, DD/MM/YY")
      celsius = parseInt(celsius) * 100
      var data = JSON.parse('{"address":"' + macAddress + '", "data": {"' + dateTime + '": "' + celsius.toString(16) + '"}}') 
      console.log(JSON.stringify(data))
      request({url:"http://127.0.0.1:126", method: "POST", json: data}, function(err, response, body) {
        if (err) return console.log(err)
      })
      
    })

  }, interval)

  l.g('Timer set to poll at an interval of ' + interval)

})
