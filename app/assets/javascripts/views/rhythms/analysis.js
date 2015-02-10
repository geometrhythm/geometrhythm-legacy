Geometrhythm.Views.Analysis = Backbone.CompositeView.extend({

  template: JST['rhythms/analysis'],

  render: function() {
    // debugger
    if (this.model.id === undefined) {
      this.$el.html("");
      return this;
    } else {
      FIC_sq_dim = Math.min(500 / this.model.get("tallness"),
                            300 / (this.model.get("rhythm_str").length / 2));
      // debugger
      var content = this.template({
        rhythm: this.model,
        FIC_sq_dim: FIC_sq_dim
      });
      this.$el.html(content);

      $( "body" ).tooltip({
        items: "#f_i_c",
        content: "Full interval content is a histogram of every internal interval."
      });

      return this;
    }
  }

})
