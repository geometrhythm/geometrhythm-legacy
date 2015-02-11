Geometrhythm.Views.AnalysisOnset = Backbone.View.extend({

  template: JST['analysis/onset'],

  render: function() {
    if (this.model) {

      // var windowWidth = 180; //$('#bb-analysis-basic').width();
      var len = this.model.get("adjacent_interval_content").length;
      var max_height = Math.max.apply(null, this.model.get("adjacent_interval_content"))
      // var widthPercentageUnit = 100 / len;
      // var heightPixelsUnit = widthPercentageUnit * windowWidth / 100;

      // if (max_height * heightPixelsUnit > 50) {
      //   var tmp = heightPixelsUnit;
      //   heightPixelsUnit = 50 / max_height;
      //   var proportion = heightPixelsUnit / tmp;
      //   widthPercentageUnit = widthPercentageUnit * proportion;
      // }

      var heightPixelsUnit = 120 / max_height;
      var widthPercentageUnit = 85 / len; //85 so it doesn't take up the whole thing

      // console.log(heightPixelsUnit);

      var content = this.template({
        rhythm: this.model,
        // windowWidth: windowWidth,
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
