Geometrhythm.Views.AnalysisMeter = Backbone.CompositeView.extend({

  template: JST['analysis/meter'],

  render: function() {
    if (this.model) {

      var len = this.model.get("len");
      var max_height = Math.max.apply(null, this.model.get("metric_hierarchy"))


      var heightPixelsUnit = 120 / max_height;
      var widthPercentageUnit = 85 / len; //85 so it doesn't take up the whole thing


      var content = this.template({
        rhythm: this.model,
        // windowWidth: windowWidth,
        widthPercentageUnit: widthPercentageUnit,
        heightPixelsUnit: heightPixelsUnit,
        len: len,
        max_height: max_height
      });

      this.$el.html(content)
    } else {
      this.$el.html("");
    }
    return this;
  }
})
