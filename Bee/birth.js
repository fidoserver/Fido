var request = require('request')
var fs = require('fs')
var l = require('../lib/log.js')
l.context = __filename

require('getmac').getMac(function(err,macAddress){
  if (err)  throw err;
  fs.writeFile(__dirname + "/macaddress", macAddress, function(err) {
    l.g('macAddress: ' + macAddress)
    if(err) return l.g(err)
  })
  request({ "url": "http://127.0.0.1:125/egg/new", method: "POST", json: {"sensors": ["0x02"], "address": macAddress}}, function(err, response, body) {
    if(err) return l.g(err)
    console.log('forever::ready')
    return l.g('done')
  })     
});

