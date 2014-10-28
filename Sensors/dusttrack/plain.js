var fs = require('fs')
var l = require('../../lib/log.js')
l.context = __filename 

var sp = require("serialport");
sp.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  var string = ''
  serialPort.on('data', function(data) {
    //console.log("data: " + data)
    data = String(data)
    console.log(data)
  });
});

