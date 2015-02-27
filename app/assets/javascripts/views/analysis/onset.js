Geometrhythm.Views.AnalysisOnset = Backbone.View.extend({

  template: JST['analysis/onset'],

  events: {
    'mouseover .AIC_sq' : 'highlightColumn',
    'mouseout .AIC_sq' : 'unHighlightColumn',
  },

  initialize: function() {
    this.canvas = $('body').find('#polygon-analysis-canvas')
    this.ctx = this.canvas[0].getContext("2d");
    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth = 3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";
  },

  render: function() {
    if (this.model) {
      var largestAdjacentInterval = 0;
      this.model.get("complexity_by_onset").forEach(function(duration, index) {
        if (duration > 0) {
          largestAdjacentInterval = index;
        }
      })
      var len = largestAdjacentInterval;
      var max_height = this.model.get("longest_interval")
      var widthPercentageUnit = 85 / len;
      var heightPixelsUnit = ((window.innerWidth / 4.25) * 0.85) / len;
      if (heightPixelsUnit * max_height > 120) {
        widthPercentageUnit = widthPercentageUnit * (120 / (heightPixelsUnit * max_height));
        heightPixelsUnit = 120 / max_height;
      }
      var windowWidth = ((window.innerWidth / 4.25) * 0.85);
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

  highlightColumn: function(event) {
    var ord = $(event.currentTarget).attr('ord');
    $('body').find(".AIC_sq[ord='" + ord + "']").addClass('columnHovered');

    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";

    var idx = $('body').find(".AIC_sq[ord='" + ord + "']").attr('idx')

    $(this.canvas).css('display','inline')
    var linesToDraw = this.model.get("onset_complexity_onset_pairs")[idx];
    this.ctx.clearRect(0,0,400,400);
    var that = this;
    linesToDraw.forEach( function(lineToDraw) {
      var posParse1 = $('body').find(".cell[ord='" + lineToDraw[0] + "']").position();
      var pos1 = [posParse1.left, posParse1.top];
      var posParse2 = $('body').find(".cell[ord='" + lineToDraw[1] + "']").position();
      var pos2 = [posParse2.left, posParse2.top];
      that.ctx.beginPath();
      that.ctx.moveTo(pos1[0] + 13, pos1[1] + 13);
      that.ctx.lineTo(pos2[0] + 13, pos2[1] + 13);
      that.ctx.stroke();
    })
  },

  unHighlightColumn: function(event) {
    $('body').find(".AIC_sq").removeClass('columnHovered');
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  }
})
