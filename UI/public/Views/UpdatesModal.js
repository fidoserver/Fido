$(function() {

  App.Views.UpdatesModal = Backbone.View.extend({

    events: {
      'click .install-updates': 'installUpdates'
    },

    attributes: function() {return {
      class: 'updates-container'
    }}, 

    template: $('#template-UpdatesModal').html(),

    modelView: 'UpdateDiv',

    body: '.modal-body',

    installUpdates: function() {
      alert("Updates will now run. Click ok to continue. When updates complete, you will be notified again.")
      $.get('/updater/run-available-updates', function(data) {
        if (data == '"ok"') {
          alert('Updates have installed. Reboot your Fido to finish the update process.')
          location.reload()
        }
        else if (data == '"reboot"') {
          alert('Your Fido will now reboot.')
        }
        else {
          alert('Oops. Something went wrong.')
        }
      })
    },

    addOne: function(model) {
      var view = new App.Views[this.modelView]({model:model})
      view.render()
      this.$el.find(this.body).append(view.el)
    },

    addAll: function() {
      this.collection.forEach(this.addOne, this)
    },

    render: function() {
      this.$el.html(this.template)
      this.addAll()
    }

  })

})

