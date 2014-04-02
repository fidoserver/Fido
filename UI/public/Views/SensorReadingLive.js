$(function() {

  App.Views.SensorReadingLive = Backbone.View.extend({

    initialize: function() {
      this.params = {
        scale: 'Farenheit'
      }
    },

    attributes : function() {return {
      class: "View SensorReadingLive"
    }},

    template: $('#template-SensorReadingLive').html(),

    render: function() {

      var SensorReadingLive = this

      this.$el.css('height', App.height)


      var socket = io.connect('/');
      socket.on('temperature',function(data){
        var vars = {}
        if (SensorReadingLive.params.scale == 'Farenheit') {
          vars.reading = SensorReadingLive.formatAsFarenheit(parseInt(data.number))
        }
        else {
          vars.reading = SensorReadingLive.formatAsCelsius(parseInt(data.number))
        }
        SensorReadingLive.$el.html(_.template(SensorReadingLive.template, vars))
        SensorReadingLive.$el.hide()
        $reading = SensorReadingLive.$el.find('.reading')
        $reading.css('margin-top', ((App.height/2) - 55) + 'px')
        SensorReadingLive.$el.show()
      });

    },

    formatAsFarenheit: function(celsius) {
      var farenheit = ((celsius*9)/5) + 32 
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
      return farenheit + '&#176; F'
    },

    formatAsCelsius: function(celsius) {
      reading = celsius.toString()
      if(reading.length > 5) reading = reading.substr(0,4)
      if(reading.length < 5) {
        while(reading.length < 5) {
          if(reading.indexOf('.') == -1) {
            reading += '.' 
          }
          else {
            reading += '0'
          }
        }
      }
      return reading + '&#176; C'
    }



  })

})

