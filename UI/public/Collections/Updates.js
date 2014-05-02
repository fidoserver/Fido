$(function() {
  App.Collections.Updates = Backbone. Collection.extend({
    url: '/updater/get-available-updates',
    model: App.Models.Update,
    parse: function(response) {
      var docs = []
      _.each(response, function(value, key, list) {
        value.id = key
        docs.push(value)
      })
      return docs
    }
  })
})
