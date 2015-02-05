Geometrhythm.Views.RhythmListItemView = Backbone.CompositeView.extend({

  template: JST['rhythms/listIndexItem'],

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  }

});
