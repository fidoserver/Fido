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
    data = String(data)
    var i = 0
    if (data.indexOf('x') == -1) {
      string += data 
    }
    else {
      i++
      string += data.substr(0, data.indexOf('x'))
      string = string.trim()
      console.log("strin: " + string)
      dataPoint = parseFloat(string)
      dataPoint = (dataPoint / 1024.00) * .2
      console.log("dataPoint: " + dataPoint)
      /*
      if (i == 2) {
        console.log('i is 2')
        fs.writeFile("/srv/tmp/grove_dht", datapoint, function(err) {
          console.log(dataPoint)
          process.exit()
        })
      }
      */
      //console.log(dataPoint)
      string = data.substr(data.indexOf('x')+1, data.length)
    }
  });
});

