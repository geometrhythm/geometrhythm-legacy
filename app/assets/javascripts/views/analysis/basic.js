Geometrhythm.Views.AnalysisBasic = Backbone.View.extend({

  template: JST['analysis/basic'],

  events: {
    'mouseover #contour' : 'showContour',
    'mouseout #contour' : 'hideContour'
  },

  render: function() {
    if (this.model) {
      // var windowWidth = this.$el.width();
    //  var windowWidth = 300;
      var len = this.model.get("len");
      var max_height = Math.max.apply(null, this.model.get("durational_pattern"))

      var widthPercentageUnit = 85 / len;
      // var heightPixelsUnit = widthPercentageUnit * windowWidth / 100;
      var heightPixelsUnit = 120 / max_height;

      // if (max_height * heightPixelsUnit > 50) {
      //   var tmp = heightPixelsUnit;
      //   heightPixelsUnit = 50 / max_height;
      //   var proportion = heightPixelsUnit / tmp;
      //   widthPercentageUnit = widthPercentageUnit * proportion;
      // }
      // debugger
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
    // debugger
    return this;
  },

  showContour: function() {
    console.log("showing!");
  },

  hideContour: function() {
    console.log("hiding!");
  },
})
