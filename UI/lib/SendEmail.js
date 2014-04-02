var nodemailer = require('nodemailer')
var fs = require('fs')
var l = require('../../lib/log.js')
l.context = __dirname + __filename 

module.exports = function(message, callback) {
  fs.readFile(__dirname + '/../settings.json',{encoding:'utf8'}, function(err, body) {
    if(err) return l.g(err) 
    var settings = JSON.parse(body)

    var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
        auth: {
          user: settings.gmailUserName,
          pass: settings.gmailPassword
        }
      }
    )

    smtpTransport.sendMail({
        to : settings.phoneNumber + settings.alertPhoneNumberCarrier,
        from : settings.gmailUserName,
        subject : 'trigger!',
        text: message,
      }, 
      function(err, res) { 
        callback(err, res)
      }
    )
  })
}
