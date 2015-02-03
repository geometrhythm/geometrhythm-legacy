Geometrhythm.Views.RhythmShow = Backbone.View.extend({

  template: JST['rhythms/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  // events: {
  //   'change .cur-rhythm' : 'testMe'
  // },

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  },

  // testMe: function() {
  //   console.log("weeogihdiogj");
  // }

});
