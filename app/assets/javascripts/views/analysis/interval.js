Geometrhythm.Views.AnalysisInterval = Backbone.View.extend({

  template: JST['analysis/interval'],

  events: {
    'mouseover .FIC_sq' : 'displayIntervals',
    'mouseout .FIC_sq' : 'hideIntervals'
  },

  initialize: function() {
    this.canvas = $('body').find('#polygon-analysis-canvas')
    this.ctx = this.canvas[0].getContext("2d");
    // $('body').find('#polygon-analysis-canvas').css("position","absolute");
    this.ctx.strokeStyle="#ff9800";
  },

  render: function() {
    if (this.model) {

      // var windowWidth = 180; //$('#bb-analysis-basic').width();
      var len = this.model.get("full_interval_content").length;
      var max_height = this.model.get("tallness");
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
  },

  displayIntervals: function(event) {
    // console.log("WTF??????");
    $(this.canvas).css('display','inline')
    var ord = $(event.currentTarget).attr('ord');
    //  console.log("ord: " + ord);
    var linesToDraw = this.model.get("full_intervals_onset_pairs")[ord];
    // var temp = $('body').find('.rhythm-ring')
    // temp.append("<div id='polygon-analysis-canvas'>")
    // var pac = $('body').find('#polygon-analysis-canvas')
    // $(pac).css("position","absolute");

    this.ctx.clearRect(0,0,400,400);
    // debugger
    var that = this;
    linesToDraw.forEach( function(lineToDraw) {
      // console.log(lineToDraw);
      // debugger
      var posParse1 = $('body').find(".cell[ord='" + lineToDraw[0] + "']").position();
      var pos1 = [posParse1.left, posParse1.top];
      var posParse2 = $('body').find(".cell[ord='" + lineToDraw[1] + "']").position();
      var pos2 = [posParse2.left, posParse2.top];
      that.ctx.beginPath();
      that.ctx.moveTo(pos1[0] + 13, pos1[1] + 13);
      that.ctx.lineTo(pos2[0] + 13, pos2[1] + 13);
      that.ctx.lineWidth = 2;
      that.ctx.stroke();
      //
      // console.log(pos1);
      // console.log(pos2);
      // //And you can use this as
      // console.log("dashed line from (" + pos1[0] + ", " + pos1[1] + ") to (" + pos2[0] + ", " + pos2[1] + ")");
      // that.ctx.dashedLine(pos1[0], pos1[1], pos2[0], pos2[1], 4);
    })


    //$('#polygon-canvas').rhythmRing();
  },

  hideIntervals: function() {
    console.log("FTW");
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  }
})
