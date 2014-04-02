$(function() {

  App.Views.SensorReadingsLiveAggregateGraph = Backbone.View.extend({

    initialize: function() {
      this.params = {
        millisPerPixel: 20,
        scale: 'Farenheit'
      }
    },

    attributes : function() {return {
      class: "View SensorReadingsLiveAggregateGraph"
    }},

    template: _.template($("#template-SensorReadingsLiveAggregateGraph").html()),

    render: function() {

      var SensorReadingsLiveAggregateGraph = this

      this.$el.append(this.template)

      // Configure the chart dimensions
      // @todo use this.$el.find('#chart')
      var width = App.width - 300
      var height = App.height
      $('#chart').attr('width', width)
      $('#chart').css('width', width)
      $('#chart').attr('height', height)
      $('#chart').css('height', height)
      App.chartSettings = {
        grid: {
          fillStyle:'#64c074',
          strokeStyle:'#54a362'
        }, 
        millisPerPixel: this.params.millisPerPixel,
        yRangeFunction: function(boundaries) {
          return {min: boundaries.min*.9, max: boundaries.max*1.1}
        }
      }
      // Create the chart
      var temperatureTimeSeries = new TimeSeries()
      var chart = new SmoothieChart(App.chartSettings)
      chart.addTimeSeries(temperatureTimeSeries, { strokeStyle: '#FFF', lineWidth: 8 })
      chart.streamTo(document.getElementById("chart"), 3000)
      var startTime = new Date().getTime()
      setInterval(function() {
        var now = new Date().getTime()
        if(width < (now - startTime) / chart.options.millisPerPixel) {
          chart.options.millisPerPixel = (now - startTime) / width
        }
      }, 5)
      // Connect Socket.io
      var socket = io.connect('/')
      socket.on('temperature',function(data){
        //console.log('Connected from SensorReadingsLiveGraph');
        console.log(moment().format() + ' - data received - ' + JSON.stringify(data))
        var reading
        if (SensorReadingsLiveAggregateGraph.params.scale == 'Farenheit') {
          reading = SensorReadingsLiveAggregateGraph.formatAsFarenheit(parseInt(data.number))
        }
        else {
          reading = SensorReadingsLiveAggregateGraph.formatAsCelsius(parseInt(data.number))
        }

        var now = new Date().getTime()
        temperatureTimeSeries.append(now, parseInt(reading))
        
      });

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

