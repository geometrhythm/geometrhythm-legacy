Geometrhythm.Views.AnalysisInterval = Backbone.CompositeView.extend({

  template: JST['analysis/interval'],

  render: function() {
    if (this.model.id === undefined) {
      this.$el.html("");
      return this;
    } else {
      FIC_sq_dim = Math.min(500 / this.model.get("tallness"),
                            300 / (this.model.get("rhythm_str").length / 2));
      var content = this.template({
        rhythm: this.model,
        FIC_sq_dim: FIC_sq_dim
      });
      this.$el.html(content);

      return this;
    }
  }
})
