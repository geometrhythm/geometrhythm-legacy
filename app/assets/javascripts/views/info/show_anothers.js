Geometrhythm.Views.ShowAnothersRhythmsInfo = Backbone.View.extend({
  template: JST['info/show_anothers'],

  render: function() {
    //debugger
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  }

});
