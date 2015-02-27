//Like most of my analysis-related files, this was rushed and
//does not reflect my best coding practices.

Geometrhythm.Views.AnalysisMeter = Backbone.View.extend({

  template: JST['analysis/meter'],

  events: {
    'mouseover .MH_sq' : 'highlightOnset',
    'mouseout .MH_sq' : 'unHighlightOnset',
    'mouseover .offbeatness' : 'highlightOffbeatness',
    'mouseout .offbeatness' : 'unHighlightOffbeatness',
    'mouseover .strongbeatedness' : 'highlightStrongbeatedness',
    'mouseout .strongbeatedness' : 'unHighlightStrongbeatedness',
    'mouseover .anacrusis' : 'highlightAnacrusis',
    'mouseout .anacrusis' : 'unHighlightAnacrusis',
    'mouseover .closure' : 'highlightClosure',
    'mouseout .closure' : 'unHighlightClosure',
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
      var len = this.model.get("len");
      var max_height = Math.max.apply(null, this.model.get("metric_hierarchy"))
      var widthPercentageUnit = 85 / len;
      var heightPixelsUnit = ((window.innerWidth / 3.666) * 0.85) / len;
      if (heightPixelsUnit * max_height > 120) {
        widthPercentageUnit = widthPercentageUnit * (120 / (heightPixelsUnit * max_height));
        heightPixelsUnit = 120 / max_height;
      }
      var content = this.template({
        rhythm: this.model,
        widthPercentageUnit: widthPercentageUnit,
        heightPixelsUnit: heightPixelsUnit,
        len: len,
        max_height: max_height
      });
      this.$el.html(content)
    } else {
      this.$el.html("");
    }
    return this;
  },

  highlightOnset: function(event) {
    var ord = $(event.currentTarget).attr('ord');
    if (ord === '0') {
      $('body').find(".MH_sq[ord='0']").addClass('columnHovered');
      $('body').find(".cell[ord='0']")
        .css('box-shadow', '0px 0px 10px #ff9800');
      return;
    }
    var that = this;
    var linesToDraw = [];
    var alreadyHighlighted = false;
    this.factors(ord).forEach(function(factor) {
      if (alreadyHighlighted) { return; }
      if (that.model.get("len") % factor === 0) {
        alreadyHighlighted = true;
        for (var i = 0; i < that.model.get("len"); i++) {
          if (i % factor === 0) {
            linesToDraw.push(i);
            $('body').find(".MH_sq[ord='" + i + "']").addClass('columnHovered');
            $('body').find(".cell[ord='" + i + "']")
              .css('box-shadow', '0px 0px 10px #ff9800');
          }
        }
      }
    });
    $(this.canvas).css('display','inline');
    this.ctx.clearRect(0,0,400,400);
    linesToDraw.forEach(function(lineToDraw, index) {
      var posParse1 = $('body').find(".cell[ord='" + lineToDraw + "']").position();
      var pos1 = [posParse1.left, posParse1.top];
      if (index === linesToDraw.length - 1) {
        var posParse2 = $('body').find(".cell[ord='" + linesToDraw[0] + "']").position();
      } else {
        var posParse2 = $('body').find(".cell[ord='" + linesToDraw[index + 1] + "']").position();
      }
      var pos2 = [posParse2.left, posParse2.top];
      if (that.model.get("rhythm_str")[lineToDraw] === "x") {
        that.ctx.strokeStyle="#ff9800";
      } else {
        that.ctx.strokeStyle="rgb(235,198,143)";
      }
      that.ctx.beginPath();
      that.ctx.moveTo(pos1[0] + 13, pos1[1] + 13);
      that.ctx.lineTo(pos2[0] + 13, pos2[1] + 13);
      that.ctx.stroke();
    })
  },

  unHighlightOnset: function(event) {
    $('body').find(".cell")
      .css('box-shadow', '');
    $('body').find(".MH_sq").removeClass('columnHovered');

    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none');
  },

  factors: function(n) {
    var output = [];
    for (var i = n; i > 1; i--) {
      if (n % i == 0) {
        output.push(i);
      }
    }

    return output;
  }

})
