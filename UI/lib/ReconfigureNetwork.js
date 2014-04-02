#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sys = require('sys')
var exec = require('child_process').exec;
var _ = require('underscore')
var program = require('commander');
var fs = require('fs')
function puts(error, stdout, stderr) { sys.puts(stdout) } 
var l = require('../../lib/log.js')
l.context = __dirname + __filename 


// Set settings.hostname in /etc/hosts and etc/hostname
module.exports = function(wirelessSSID, password, wirelessSecurityType, callback) {

  switch (wirelessSecurityType) {

    case 'none': 
      l.g('RECONFIGURING SECURITY:NONE')
      var fileName = __dirname + '/interfaces.none.template'
      fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) return l.g(err)
        var result = data.replace("WIRELESSSSID", wirelessSSID)
        var fileName = '/etc/network/interfaces'
        fs.writeFile(fileName, result, 'utf8', function (err) {
          if (err) return l.g(err)
          return callback() 
        })
      })
      break

    case 'WEP': 
      l.g('RECONFIGURING WEP')
      var fileName = __dirname + '/interfaces.wep.template'
      fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) return l.g(err)
        var result = data.replace("WIRELESSSSID", wirelessSSID)
        var result = result.replace("WIRELESSKEY", password)
        var fileName = '/etc/network/interfaces'
        fs.writeFile(fileName, result, 'utf8', function (err) {
          if (err) return l.g(err)
          return callback() 
        })
      })
      break

    case 'WPA':
      l.g('RECONFIGURING WPA')
      var fileName = __dirname + '/interfaces.wpa.template'
      fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) return l.g(err)
        var fileName = '/etc/network/interfaces'
        fs.writeFile(fileName, data, 'utf8', function (err) {
          if (err) return l.g(err)
          var cmd = '/home/pi/Pimometer/lib/wpa.sh ' + wirelessSSID + ' ' + password
          exec(cmd, function(err, stdout, stderr) {
            return callback()
          })
        })
      })
      break

  }
} 
