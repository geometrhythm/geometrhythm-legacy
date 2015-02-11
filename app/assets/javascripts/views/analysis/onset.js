Geometrhythm.Views.AnalysisOnset = Backbone.View.extend({

  template: JST['analysis/onset'],

  render: function() {
    if (this.model) {
      var largestAdjacentInterval = 0;
      this.model.get("adjacent_interval_content").forEach(function(duration, index) {
        if (duration > 0) {
          largestAdjacentInterval = index;
        }
      })
      var len = largestAdjacentInterval;
      var max_height = Math.max.apply(null, this.model.get("adjacent_interval_content"))
      var heightPixelsUnit = 120 / max_height;
      var widthPercentageUnit = 85 / len;
      var content = this.template({
        rhythm: this.model,
        widthPercentageUnit: widthPercentageUnit,
        heightPixelsUnit: heightPixelsUnit,
        len: len,
        max_height: max_height
      });
      this.$el.html(content);
    } else {
      this.$el.html("");
    }
    return this;
  }
})
