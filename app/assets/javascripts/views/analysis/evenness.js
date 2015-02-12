Geometrhythm.Views.AnalysisEvenness = Backbone.View.extend({

  template: JST['analysis/evenness'],

  initialize: function() {
    this.windowWidth = window.innerWidth/4;
    this.points = [];
  },

  events: {
    'mouseover .evenness-point' : 'highlightOnset',
    'mouseout .evenness-point' : 'unHighlightOnset',
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

})
