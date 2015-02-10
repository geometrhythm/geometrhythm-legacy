Geometrhythm.Views.AnalysisBasic = Backbone.CompositeView.extend({

  template: JST['analysis/basic'],

  events: {
    'mouseover #contour' : 'showContour',
    'mouseout #contour' : 'hideContour'
  },

  render: function() {
    if (this.model) {

      var windowWidth = $('#bb-analysis-basic').width();
      // var windowHeightProportion = 150 / windowWidth;
      var len = this.model.get("len")
      var max_height = Math.max.apply(null, this.model.get("durational_pattern"))

      var widthPercentageUnit = 100 / len;
      var heightPixelsUnit = widthPercentageUnit * windowWidth / 100;
      //var heightPercentageUnit =

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
  },

  showContour: function() {
    console.log("showing!");
  },

  hideContour: function() {
    console.log("hiding!");
  },
})
