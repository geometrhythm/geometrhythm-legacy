Geometrhythm.Views.AnalysisEvenness = Backbone.View.extend({

  template: JST['analysis/evenness'],

  initialize: function() {
    this.windowWidth = window.innerWidth/4;
    this.points = [];

    this.canvas2 = $('body').find('#polygon-analysis-canvas')
    this.ctx2 = this.canvas2[0].getContext("2d");
    this.ctx2.strokeStyle="#ff9800";
    this.ctx2.lineWidth = 3;
    this.ctx2.shadowBlur=20;
    this.ctx2.shadowColor="#ff9800";
  },

  events: {
    'mouseover .evenness-point' : 'highlightOnset',
    'mouseout .evenness-point' : 'unHighlightOnset',
    'mouseover #evenness-canvas' : 'renderPerfectlyEvenRhythm',
    'mouseout #evenness-canvas' : 'clearPerfectlyEvenRhythm'
  },

  render: function() {
    if (this.model.id === undefined) {
      this.$el.html("");
      return this;
    } else {
      var content = this.template({
        rhythm: this.model,
        windowWidth: this.windowWidth
      });
      this.$el.html(content);
      this.canvas = this.$el.find('#evenness-canvas')
      this.ctx = this.canvas[0].getContext("2d");
      this.ctx.strokeStyle="#eee";
      this.ctx.lineWidth = 1;

      //line of evenness
      this.ctx.beginPath();
      this.ctx.moveTo(0, 120);
      this.ctx.lineTo(this.windowWidth, 0);
      this.ctx.stroke();

      //columns
      for (var i = 0; i < this.model.get("len"); i++) {
        this.ctx.beginPath();
        this.ctx.moveTo((i / this.model.get("len")) * this.windowWidth, 0);
        this.ctx.lineTo((i / this.model.get("len")) * this.windowWidth, 120);
        this.ctx.stroke();
      }

      //rows
      for (var i = 0; i < this.model.get("onset_indices").length; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, (i / this.model.get("onset_indices").length) * 120.0);
        this.ctx.lineTo(this.windowWidth, (i / this.model.get("onset_indices").length) * 120.0);
        this.ctx.stroke();
      }

      //onset points
      for (var i = 0; i < this.model.get("onset_indices").length; i++) {
        var $newPoint = $('<span class="evenness-point">&#149;</span>');
        $newPoint.css('left', (this.windowWidth / 25) + ((this.model.get("onset_indices")[i] / this.model.get("len")) * this.windowWidth))
          .css('top', 150.0 - ((i) * (120.0 / this.model.get("onset_indices").length)))
        $newPoint.attr('ord', this.model.get("onset_indices")[i]);
        this.$el.append($newPoint);
        // this.ctx.beginPath();
        // this.ctx.fillStyle="#333";
        // this.ctx.arc((this.model.get("onset_indices")[i] / this.model.get("len")) * this.windowWidth,
        //   120 - (i * (120 / this.model.get("onset_indices").length)),
        //   5, 0, 2*Math.PI);
        // this.ctx.fill();
      }

      // area of nPVI
      var curPosLeft = 0;
      var curPosTop = 120;

      this.ctx.beginPath();
      this.ctx.moveTo(curPosLeft, curPosTop);
      for (var i = 0; i <= this.model.get("onset_indices").length; i++) {
        // this.ctx.beginPath()
        if (i === this.model.get("onset_indices").length) {
          var nextPosLeft = this.windowWidth;
          var nextPosTop = 0;
        } else {
          var nextPosLeft = ((this.model.get("onset_indices")[i] / this.model.get("len")) * this.windowWidth);
          var nextPosTop = 120.0 - (i * (120.0 / this.model.get("onset_indices").length));
        }
        // console.log("drew a line to (" + nextPosLeft + "," + nextPosLeft + ")");
        this.ctx.lineTo(nextPosLeft, nextPosTop)

        var curPosLeft = nextPosLeft;
        var curPosTop = nextPosTop;

      }
      this.ctx.closePath();
      this.ctx.lineWidth = 1;
      this.ctx.fillStyle="#6da2d1";
      this.ctx.fill();
      this.ctx.strokeStyle = '#eee';
      this.ctx.stroke();

      return this;
    }
  },

  highlightOnset: function(event) {
    var ord = $(event.currentTarget).attr('ord');
    $('body').find(".cell[ord='" + ord + "']")
      .css('box-shadow', '0px 0px 10px #ff9800');
  },

  unHighlightOnset: function(event) {
    $('body').find(".cell")
      .css('box-shadow', '');
  },

  renderPerfectlyEvenRhythm: function(event) {
    console.log("tra la lolololo");
    var that = this;
    var linesToDraw = [];
    // var alreadyHighlighted = false;
    // this.factors(ord).forEach(function(factor) {
    //   if (alreadyHighlighted) { return; }
    //   if (that.model.get("len") % factor === 0) {
    //     alreadyHighlighted = true;
    //     for (var i = 0; i < that.model.get("len"); i++) {
    //       if (i % factor === 0) {
    //         linesToDraw.push(i);
    //         $('body').find(".MH_sq[ord='" + i + "']").addClass('columnHovered');
    //         $('body').find(".cell[ord='" + i + "']")
    //           .css('box-shadow', '0px 0px 10px #ff9800');
    //       }
    //     }
    //   }
    // });

    $(this.canvas2).css('display','inline')
    // var ord = $(event.currentTarget).attr('ord');
    // var linesToDraw = this.model.get("full_intervals_onset_pairs")[ord];
    // $('body').find(".FIC_sq[ord='" + ord + "']").addClass('columnHovered');
    this.ctx2.clearRect(0,0,400,400);
    // var that = this;

    var curAngle = -90;
    var prevAngleInRadians = curAngle * (Math.PI / 180);
    var prevPos = [139 + (152 * Math.cos(prevAngleInRadians)),
      139 + (152 * Math.sin(prevAngleInRadians))];
    this.ctx2.moveTo(prevPos[0] + 13, prevPos[1] + 13);
    var sideArcLength = 360 / this.model.get("onset_indices").length;
    // var prevPos = null;
    this.ctx2.beginPath();

    for (var i = 1; i < this.model.get("onset_indices").length; i++ ) {
      curAngle += sideArcLength;
      var nextAngleInRadians = curAngle * (Math.PI / 180);

      var nextPos = [139 + (152 * Math.cos(nextAngleInRadians)),
        139 + (152 * Math.sin(nextAngleInRadians))];


        this.ctx2.lineTo(nextPos[0] + 13, nextPos[1] + 13);
      // var nextPost =

      // this.placeHandle(i, this.handlePos(curAngleInRadians));
      // this.placeLabel(i, this.labelPos(curAngleInRadians));
      ;
    }

    this.ctx2.stroke();

    //
    // linesToDraw.forEach(function(lineToDraw, index) {
    //   var posParse1 = $('body').find(".cell[ord='" + lineToDraw + "']").position();
    //   var pos1 = [posParse1.left, posParse1.top];
    //   if (index === linesToDraw.length - 1) {
    //     var posParse2 = $('body').find(".cell[ord='" + linesToDraw[0] + "']").position();
    //   } else {
    //     var posParse2 = $('body').find(".cell[ord='" + linesToDraw[index + 1] + "']").position();
    //   }
    //   var pos2 = [posParse2.left, posParse2.top];
    //   that.ctx2.beginPath();
    //   that.ctx2.moveTo(pos1[0] + 13, pos1[1] + 13);
    //   that.ctx2.lineTo(pos2[0] + 13, pos2[1] + 13);
    //   that.ctx2.stroke();
    // })
  },

  clearPerfectlyEvenRhythm: function(event) {
    this.ctx2.clearRect(0,0,400,400);
    $(this.canvas2).css('display','none')
  }

})
