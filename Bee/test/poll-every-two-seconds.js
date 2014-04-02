
var moment = require('moment')
var thermometers=require("temper1");

var devices=thermometers.getDevices();

console.log("Devices found:"+devices);

devices.forEach(function(device) {

	setInterval(function() {
		thermometers.readTemperature(device, function(err, value) {
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
		});
	}, 2000)

})
