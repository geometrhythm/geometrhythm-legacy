Geometrhythm.Views.AnalysisBasic = Backbone.View.extend({

  template: JST['analysis/basic'],

  events: {
    'mouseover .TEDAS_sq' : 'displayIntervals',
    'mouseout .TEDAS_sq' : 'hideIntervals'
    // 'mouseover .contour' : 'displayIntervals',
    // 'mouseout .contour' : 'hideIntervals'
  },

  initialize: function() {
    this.canvas = $('body').find('#polygon-analysis-canvas')
    this.ctx = this.canvas[0].getContext("2d");
    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";
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

  displayIntervals: function(event) {
    // console.log("hehhhhhh");
    $(this.canvas).css('display','inline')
    var ord = parseInt($(event.currentTarget).attr('ord'));
    var dur = parseInt($(event.currentTarget).attr('dur'));
    // console.log("wtf is dur? " + dur);
    // var linesToDraw = this.model.get("full_intervals_onset_pairs")[ord];
    // $('body').find(".FIC_sq[ord='" + ord + "']").addClass('columnHovered');
    this.ctx.clearRect(0,0,400,400);
    // var that = this;
    // linesToDraw.forEach( function(lineToDraw) {
    // console.log("NOW WHAT??? " + $('#current-rhythm').val().length);
    // debugger
    // console.log("ord: " + ord);
    // console.log("((ord + dur)): " + ((ord + dur)));
      var posParse1 = $('body').find(".cell[ord='" + ord + "']").position();
      var pos1 = [posParse1.left, posParse1.top];
      var posParse2 = $('body').find(".cell[ord='" + ((ord + dur) % $('#current-rhythm').val().length) + "']").position();
      var pos2 = [posParse2.left, posParse2.top];
      this.ctx.beginPath();
      this.ctx.moveTo(pos1[0] + 13, pos1[1] + 13);
      this.ctx.lineTo(pos2[0] + 13, pos2[1] + 13);
      // this.ctx.lineWidth = 2;
      this.ctx.stroke();
    // })
  },

  hideIntervals: function() {
    // console.log("FTW");
    // $('body').find(".FIC_sq").removeClass('columnHovered');
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  }
})
