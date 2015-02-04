Geometrhythm.Views.ShowYourRhythmsInfo = Backbone.View.extend({
  template: JST['info/show_yours'],

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  }

});
