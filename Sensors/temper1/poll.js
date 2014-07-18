var fs = require('fs')
var l = require('../../lib/log.js')
l.context = __filename 

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }
var cmd = '/usr/local/bin/temper-poll'
exec(cmd, function(err, stdout, stderr) { 
  var start = stdout.indexOf(':') + 2
  var end = stdout.indexOf('C') - 1
  //console.log(start)
  //console.log(end)
  var value = stdout.substr(start, end - start)
  //console.log(value)
  fs.writeFile("/srv/tmp/temper1", value, function(err) {
    if(err) return l.g(err)
  })
})

