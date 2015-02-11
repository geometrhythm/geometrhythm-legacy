Geometrhythm.Views.AnalysisEvenness = Backbone.View.extend({

  template: JST['analysis/evenness'],

  render: function() {
    if (this.model.id === undefined) {
      this.$el.html("");
      return this;
    } else {
      var content = this.template({
        rhythm: this.model,
      });
      this.$el.html(content);

      return this;
    }
  }
})
