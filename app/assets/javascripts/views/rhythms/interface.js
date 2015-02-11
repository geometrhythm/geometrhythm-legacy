Geometrhythm.Views.Interface = Backbone.View.extend({

  template: JST['rhythms/interface'],

  initialize: function(options) {
    this.analysisDisplayed = options.analysisDisplayed;
  },

  render: function() {
    var content = this.template({
      analysisDisplayed: this.analysisDisplayed
    })
    this.$el.html(content);
    return this;
  },

});
