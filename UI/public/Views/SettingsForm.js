$(function() {

  App.Views.SettingsForm = Backbone.View.extend({
    
    attributes : function() {return {
      class: "View Form SettingsForm"
    }},

    events: {
      "click #save": "setForm",
      "submit form" : "setFormFromEnterKey"
    },

    render: function() {
      this.form = new Backbone.Form({ model: this.model })
      this.$el.append('<h2>Settings</h2>')
      this.$el.append(this.form.render().el)
      //this.$el.append('<input type="text" id="search-by-address" class="search-by-address form-control"/>')
      this.$el.append('<div class="location-picker" style="width:225px; height:150px;"></div>')
      //var latitude = '42.3597191'
      //var longitude = '-71.0944627'
      var latitude
      var longitude
      if (this.model.get('latitude') && this.model.get('latitude') !== '') {
        latitude = this.model.get('latitude') 
      }
      if (this.model.get('longitude') && this.model.get('longitude') !== '') {
        longitude = this.model.get('longitude') 
      }
      var locationPickerSettings = { 
        inputBinding: {
          //locationNameInput: $('#search-by-address'), 
          latitudeInput: $('#c3_latitude'), 
          longitudeInput: $('#c3_longitude')
        },
        enableAutocomplete: true
      }
      if (latitude && longitude) {
        locationPickerSettings.location = {latitude: latitude, longitude: longitude}
      }
      $('.location-picker').locationpicker(locationPickerSettings)
      var $button = $('<a class="btn btn-default" id="save">save</a>')
      this.$el.append($button)
    },

    setFormFromEnterKey: function(event) {
      event.preventDefault()
      this.setForm()
    },

    setForm: function() {
      var form = this
      form.form.commit()
      // Protect against location picker defaults from being saved
      if (form.model.get('latitude') == '40.7324319' || form.model.get('longitude') == '-73.82480799999996') {
        form.model.set('latitude', '')
        form.model.set('longitude', '')
      }
      form.model.on('sync', function() {
        form.trigger('done')
      })
      form.model.save()
    },

  });

});
