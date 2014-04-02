$(function() {

  App.Views.SensorReadingsLiveGraph = Backbone.View.extend({

    initialize: function() {
      this.params = {
        millisPerPixel: 20,
        scale: 'Farenheit'
      }
    },

    attributes : function() {return {
      class: "View SensorReadingsLiveGraph"
    }},

    template: _.template($("#template-SensorReadingsLiveGraph").html()),

    render: function() {

      var SensorReadingsLiveGraph = this

      this.$el.append(this.template)

      // Configure the chart dimensions
      // @todo use this.$el.find('#chart')
      var width = App.width - 300
      var height = App.height
      $('#chart').attr('width', width)
      $('#chart').css('width', width)
      $('#chart').attr('height', height)
      $('#chart').css('height', height)

      var temperatureTimeSeries = new TimeSeries()
      var chart = new SmoothieChart({
        grid: {
          fillStyle:'#64c074',
          strokeStyle:'#54a362'
        }, 
        millisPerPixel: this.params.millisPerPixel,
        yRangeFunction: function(boundaries) {
          return {min: boundaries.min*.9, max: boundaries.max*1.1}
        }
      })
      chart.addTimeSeries(temperatureTimeSeries, { strokeStyle: '#FFF', lineWidth: 8 })
      chart.streamTo(document.getElementById("chart"), 3000)

      var socket = io.connect('/');
      socket.on('temperature',function(data){
        console.log(moment().format() + ' - data received - ' + JSON.stringify(data))
        var reading
        if (SensorReadingsLiveGraph.params.scale == 'Farenheit') {
          reading = SensorReadingsLiveGraph.formatAsFarenheit(parseInt(data.number))
        }
        else {
          reading = SensorReadingsLiveGraph.formatAsCelsius(parseInt(data.number))
        }
        temperatureTimeSeries.append(new Date().getTime(), parseInt(reading))
      })

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
      return reading
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
      return farenheit
    }


  })

})

