$(function() {
  App.Views.UpdateDiv = Backbone.View.extend({
    template: _.template($('#template-UpdateDiv').html()),
    render: function() { this.$el.append(this.template(this.model.toJSON())) }
  })
})

