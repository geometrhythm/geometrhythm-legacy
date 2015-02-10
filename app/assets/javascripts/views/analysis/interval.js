Geometrhythm.Views.AnalysisInterval = Backbone.CompositeView.extend({

  template: JST['analysis/interval'],

  render: function() {
    if (this.model) {
      var windowWidth = $('#bb-analysis-basic').width();
      var len = this.model.get("full_interval_content").length;
      var max_height = this.model.get("tallness");
      var widthPercentageUnit = 100 / len;
      var heightPixelsUnit = widthPercentageUnit * windowWidth / 100;

      if (max_height * heightPixelsUnit > 50) {
        var tmp = heightPixelsUnit;
        heightPixelsUnit = 50 / max_height;
        var proportion = heightPixelsUnit / tmp;
        widthPercentageUnit = widthPercentageUnit * proportion;
      }

      var content = this.template({
        rhythm: this.model,
        windowWidth: windowWidth,
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
