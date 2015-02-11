Geometrhythm.Views.AnalysisSymmetry = Backbone.View.extend({

  template: JST['analysis/symmetry'],

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
