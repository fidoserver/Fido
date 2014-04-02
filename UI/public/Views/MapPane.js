$(function() {

  App.Views.MapPane = Backbone.View.extend({

    attributes: function() {return {
      class: 'map-container'
    }}, 

    template: $('#template-MapPane').html(),

    render: function() {

      this.$el.html(this.template)

      this.$el.height(App.height)
      this.$el.width(300)
      this.$el.find('#map-pane').height(App.height + 200)
      this.$el.find('#map-pane').width(300)

      if (this.model.get('latitude') && this.model.get('longitude') && this.model.get('latitude') !== '' && this.model.get('longitude') !== '') {
        var latlng = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'))
        var mapOptions = {
          center: latlng,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          mapTypeControl: false,
          disableDefaultUI: true,
          zoom: 16
        }
        var map = new google.maps.Map(document.getElementById("map-pane"), mapOptions)
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        })
      }
    }
  })

})

