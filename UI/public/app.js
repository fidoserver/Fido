var App = {
  Models: {},
  Views: {},
  Collections: {},
  start: function() {

    this.width = $(window).width()
    this.height = $(window).height()

    // Settings button
    $("#settings-button" ).click(function() {
      if($(this).hasClass('open')) {
        $(this).removeClass('open')
        $("#right-container" ).animate({
          right: "-350",
        }, 400, function() {
        // Animation complete.
        });
      }
      else {
        $(this).addClass('open')
        $("#right-container" ).animate({
          right: "0",
        }, 400, function() {
        // Animation complete.
        });
      }
    });

    // Position left container
    var width = $(window).width()-650
    var height = $(window).height()
    $('#left-container').attr('width', width)
    $('#left-container').css('width', width)
    $('#left-container').attr('height', height)
    $('#left-container').css('height', height)

    // Position right container
    $('#right-container').css('height', $(window).height())
    $('#right-container .left-pane').css('height', $(window).height())
    $('#right-container .right-pane').css('height', $(window).height())

    // VIEWS
    var sensorReadingLive = new App.Views.SensorReadingLive()
    $('#right-container .left-pane').append(sensorReadingLive.el)

    var settings = new App.Models.Settings()
    var settingsForm = new App.Views.SettingsForm({model: settings})
    var mapPane = new App.Views.MapPane({model: settings})
    $('#right-container .left-pane').append(mapPane.el)
    settingsForm.on('done', function() {
      location.reload()
    })
    $('#right-container .right-pane').append(settingsForm.el)

    settingsForm.model.on('sync', function() {
      settingsForm.render()
      sensorReadingLive.params.scale = settingsForm.model.get('scale')
      sensorReadingLive.render()
      mapPane.render()
      switch(settingsForm.model.get('graphType')) {
        case 'Live Stream': 
        case '':
          var sensorReadingsLiveGraph = new App.Views.SensorReadingsLiveGraph()
          sensorReadingsLiveGraph.params.scale = settingsForm.model.get('scale')
          sensorReadingsLiveGraph.params.millisPerPixel = 20
          $('#left-container').html(sensorReadingsLiveGraph.el)
          sensorReadingsLiveGraph.render()
          break
        case 'Live Aggregated':
          var sensorReadingsLiveAggregateGraph = new App.Views.SensorReadingsLiveAggregateGraph()
          sensorReadingsLiveAggregateGraph.params.scale = settingsForm.model.get('scale')
          sensorReadingsLiveAggregateGraph.params.millisPerPixel = 20
          $('#left-container').html(sensorReadingsLiveAggregateGraph.el)
          sensorReadingsLiveAggregateGraph.render()
          break
      }

    })
    settingsForm.model.fetch()


  }
}


