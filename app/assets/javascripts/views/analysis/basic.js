Geometrhythm.Views.AnalysisBasic = Backbone.View.extend({

  template: JST['analysis/basic'],

  events: {
    'mouseover #contour' : 'showContour',
    'mouseout #contour' : 'hideContour'
  },

  render: function() {
    if (this.model) {
      var len = this.model.get("len");
      var max_height = Math.max.apply(null, this.model.get("durational_pattern"))
      var widthPercentageUnit = 85 / len;
      var heightPixelsUnit = 120 / max_height;
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
  },

  showContour: function() {
    console.log("showing!");
  },

  hideContour: function() {
    console.log("hiding!");
  },
})
