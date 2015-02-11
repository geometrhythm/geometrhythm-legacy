Geometrhythm.Views.AnalysisInterval = Backbone.View.extend({

  template: JST['analysis/interval'],

  events: {
    'mouseover .FIC_sq' : 'displayIntervals',
    'mouseout .FIC_sq' : 'hideIntervals'
  },

  initialize: function() {
    this.canvas = $('body').find('#polygon-analysis-canvas')
    this.ctx = this.canvas[0].getContext("2d");
    this.ctx.strokeStyle="#ff9800";
  },

  render: function() {
    if (this.model) {
      var len = this.model.get("full_interval_content").length;
      var max_height = this.model.get("tallness");
      var heightPixelsUnit = 120 / max_height;
      var widthPercentageUnit = 85 / len; //85 so it doesn't take up the whole thing
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

  displayIntervals: function(event) {
    $(this.canvas).css('display','inline')
    var ord = $(event.currentTarget).attr('ord');
    var linesToDraw = this.model.get("full_intervals_onset_pairs")[ord];
    $('body').find(".FIC_sq[ord='" + ord + "']").addClass('columnHovered');
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
      that.ctx.lineWidth = 2;
      that.ctx.stroke();
    })
  },

  hideIntervals: function() {
    console.log("FTW");
    $('body').find(".FIC_sq").removeClass('columnHovered');
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  }
})
