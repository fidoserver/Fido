var request = require('request')
var fs = require('fs')

require('getmac').getMac(function(err,macAddress){
  if (err)  throw err;
  fs.writeFile(__dirname + "/macaddress", macAddress, function(err) {
    if(err) return console.log(err)
  })
  request({ "url": "http://127.0.0.1:125/egg/new", method: "POST", json: {"sensors": ["0x02"], "address": macAddress}}, function(err, response, body) {
    if(err) return console.log(err)
    console.log(response)
    console.log(body)
  })     
});

