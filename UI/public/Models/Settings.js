$(function() {

  App.Models.Settings = Backbone.Model.extend({

    url: '/settings',
    defaults: {
      'graphType': 'Live Stream'
    },
    schema: {
      'Sensor': {
        type: 'Select',
        options: ['temper1', 'grove_dht']
      },
      'graphType': {
        type: 'Select',
        options: ['Live Stream', 'Live Aggregated']
      },
      'scale': {
        type: 'Select',
        options: ['Farenheit', 'Celsius']
      },
      'wifiSSID': {
        type: 'Text', 
        title: 'Wifi Network Name'
      },
      'wifiPassword': {
        type: 'Password', 
        title: 'Wifi Network Password'
      },
      'wifiSecurityType': {
        type: 'Select', 
        title: 'Type of Wireless security',
        options: ['none', 'WPA']
      },
      'hostName': {
        type: 'Text', 
        help: 'Change the URL you access your Fido. The text you enter here will result in an address of your-text.local'
      },
      'alertSwitch': {
        type: "Select",
        options: [
          "off",
          "on"
        ]
      },
      'alertUpperLimit': {
        type:'Number', 
        title: "Alert when readings are over..."
      },
      'alertLowerLimit': {
        type:'Number', 
        title: "Alert when readings are under..."
      },
      'phoneNumber': {
        type:'Text', 
        title: 'Phone number for alerts'
      },
      'alertPhoneNumberCarrier': {
        type: "Select",
        options: {
          "@messaging.sprintpcs.com": "Sprint",
          "@vtext.com": "Verizon",
          "@tmomail.net": "T-Mobile",
          "@txt.att.net": "AT&T",
          "@sms.mycricket.com": "Cricket",
          "@mymetropcs.com": "U.S. Cellular",
          "@vmobl.com": "Virgin Mobile USA",
          "@myboostmobile.com": "Boost",
          "@treehouse.su": "Treehouse Industries"
        },
        title: "Carrier company of your phone"
      },
      'gmailUserName': {
        validators: ['email'], 
        type:'Text', 
        title: 'GMail username for sending text messages'
      },
      'gmailPassword': 'Password',
      'latitude': 'Text', 
      'longitude': {
        type: 'Text',
        help: 'Need the latitude and longitude for your location? Use <a style="color: #64c074;" href="http://geocoder.us" target="_blank">http://geocoder.us</a> to get the address of a nearby place and then drag the place marker on the map below to your exact location.'
      }

    }    

  })

})
