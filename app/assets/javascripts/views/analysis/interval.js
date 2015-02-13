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
    this.ctx.lineWidth = 3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";
  },

  render: function() {
    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";

    if (this.model) {
      var len = this.model.get("full_interval_content").length;
      var max_height = this.model.get("tallness");
      // var heightPixelsUnit = 120 / max_height;
      var widthPercentageUnit = 85 / len; //85 so it doesn't take up the whole thing
      var heightPixelsUnit = ((window.innerWidth / 4.25) * 0.85) / len;
      if (heightPixelsUnit * max_height > 120) {
        widthPercentageUnit = widthPercentageUnit * (120 / (heightPixelsUnit * max_height));
        heightPixelsUnit = 120 / max_height;
      }
      //  debugger
      var content = this.template({
        rhythm: this.model,
        widthPercentageUnit: widthPercentageUnit,
        heightPixelsUnit: heightPixelsUnit,
        len: len,
        max_height: max_height
      });
      this.$el.html(content);
      // debugger
      // this.$el.find('details-link').data('associatedtemplate', 'templateInterval');
    } else {
      this.$el.html("");
    }
    return this;
  },

  displayIntervals: function(event) {
    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";

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
      that.ctx.stroke();
    })
  },

  hideIntervals: function() {
    $('body').find(".FIC_sq").removeClass('columnHovered');
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  }
})
