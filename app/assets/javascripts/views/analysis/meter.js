Geometrhythm.Views.AnalysisMeter = Backbone.CompositeView.extend({

  template: JST['analysis/meter'],

  render: function() {
    if (this.model.id === undefined) {
      this.$el.html("");
      return this;
    } else {
      // var content = this.template({
      //   rhythm: this.model,
      // });
      // this.$el.html(content);
      this.$el.html("");

      return this;
    }
  }
})
