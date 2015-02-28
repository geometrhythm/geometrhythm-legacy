//Like most of my analysis-related files, this was rushed and
//does not reflect my best coding practices.

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
    'mouseout #evenness-canvas' : 'clearPerfectlyEvenRhythm',
  },

  render: function() {
    if (this.model) {
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
        this.ctx.moveTo(
          (i / this.model.get("len")) * this.windowWidth, 0);
        this.ctx.lineTo(
          (i / this.model.get("len")) * this.windowWidth, 120);
        this.ctx.stroke();
      }

      //rows
      for (var i = 0; i < this.model.get("onset_indices").length; i++){
        this.ctx.beginPath();
        this.ctx.moveTo(0,
          (i / this.model.get("onset_indices").length) * 120.0);
        this.ctx.lineTo(this.windowWidth,
          (i / this.model.get("onset_indices").length) * 120.0);
        this.ctx.stroke();
      }

      //onset points
      for (var i = 0; i < this.model.get("onset_indices").length; i++){
        var $newPoint = $('<span class="evenness-point">&#149;</span>');
        $newPoint.css('left', (this.windowWidth / 25)
          + ((this.model.get("onset_indices")[i]
            / this.model.get("len")) * this.windowWidth))
          .css('top', 150.0 - ((i) * (120.0
            / this.model.get("onset_indices").length)))
        $newPoint.attr('ord', this.model.get("onset_indices")[i]);
        $newPoint.attr('idx', i);
        this.$el.append($newPoint);

      }

      // area of nPVI
      var curPosLeft = 0;
      var curPosTop = 120;

      this.ctx.beginPath();
      this.ctx.moveTo(curPosLeft, curPosTop);
      for (var i = 0; i <= this.model.get("onset_indices").length; i++) {
        if (i === this.model.get("onset_indices").length) {
          var nextPosLeft = this.windowWidth;
          var nextPosTop = 0;
        } else {
          var nextPosLeft = ((this.model.get("onset_indices")[i]
            / this.model.get("len")) * this.windowWidth);
          var nextPosTop = 120.0 -
            (i * (120.0 / this.model.get("onset_indices").length));
        }
        this.ctx.lineTo(nextPosLeft, nextPosTop)

        var curPosLeft = nextPosLeft;
        var curPosTop = nextPosTop;

      }
      this.ctx.closePath();
      this.ctx.lineWidth = 1;
      this.ctx.fillStyle="#456B87";
      this.ctx.fill();
      this.ctx.strokeStyle = '#eee';
      this.ctx.stroke();

    } else {
      this.$el.html("");
    }
    return this;
  },

  highlightOnset: function(event) {
    var ord = $(event.currentTarget).attr('idx');
    $('body').find(".cell[ord='" + ord + "']")
      .css('box-shadow', '0px 0px 10px #ff9800');
    this.renderPerfectlyEvenRhythm();
    this.ctx.strokeStyle="#5DA2D6";
    this.ctx.lineWidth=2;
    this.ctx.shadowBlur=0;
    this.ctx.beginPath();
    this.ctx.moveTo(
      -20 + (this.windowWidth / 25)
      + ((this.model.get("onset_indices")[ord]
      / this.model.get("len")) * this.windowWidth),
      120.0 - ((ord / this.model.get("onset_indices").length) * 120.0)
    );
    this.ctx.lineTo(
      (ord / this.model.get("onset_indices").length) * this.windowWidth,
      120.0 - ((ord / this.model.get("onset_indices").length) * 120.0)
    );
    this.ctx.stroke();
  },

  unHighlightOnset: function(event) {
    $('body').find(".cell")
      .css('box-shadow', '');
  },

  renderPerfectlyEvenRhythm: function(event) {
    this.ctx2.strokeStyle="#ff9800";
    this.ctx2.lineWidth=3;
    this.ctx2.shadowBlur=20;
    this.ctx2.shadowColor="#ff9800";
    var that = this;
    var linesToDraw = [];
    //$(this.canvas2).css('display','inline')
    this.ctx2.clearRect(0,0,400,400);
    var curAngle = -90;
    var prevAngleInRadians = curAngle * (Math.PI / 180);
    var prevPos = [139 + (152 * Math.cos(prevAngleInRadians)),
      139 + (152 * Math.sin(prevAngleInRadians))];
    this.ctx2.beginPath();
    this.ctx2.moveTo(prevPos[0] + 13, prevPos[1] + 13);
    var sideArcLength = 360 / this.model.get("onset_indices").length;

    for (var i = 0; i <= this.model.get("onset_indices").length; i++ ){
      curAngle += sideArcLength;
      var nextAngleInRadians = curAngle * (Math.PI / 180);
      var nextPos = [137 + (150 * Math.cos(nextAngleInRadians)),
        137 + (150 * Math.sin(nextAngleInRadians))];
      this.ctx2.lineTo(nextPos[0] + 13, nextPos[1] + 13);
    }
    this.ctx2.stroke();

    for (var i = 0; i <= this.model.get("onset_indices").length; i++) {
      this.ctx.beginPath();
      this.ctx.fillStyle="#ff9800";
      this.ctx.arc((i
        / this.model.get("onset_indices").length) * this.windowWidth,
        120.0 - ((i / this.model.get("onset_indices").length) * 120.0),
        4, 0, 2*Math.PI);
      this.ctx.fill();
    }
  },

  clearPerfectlyEvenRhythm: function(event) {
    this.ctx2.clearRect(0,0,400,400);
    //$(this.canvas2).css('display','none');
    this.render();
  }

})
