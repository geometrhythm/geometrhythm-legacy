MINI_POLYGON_OFFSET = 4;
MINI_CANVAS_DIMENSION = 89;
MED_POLYGON_OFFSET = 8;
MED_CANVAS_DIMENSION = 6;

$.MiniRhythmRing = function (el, superSizeMe) {
  this.$el = $(el);
  this.superSizeMe = superSizeMe;
  if (this.superSizeMe) {
    this.ctx = this.$el.find('.medium-polygon-canvas')[0].getContext("2d");
  } else {
    this.ctx = this.$el.find('.mini-polygon-canvas')[0].getContext("2d");
  }
  this.rhythmStr = this.$el.attr("rhythm-str");
  this.initializeRhythm(this.rhythmStr);
  this.refreshPolygon();
  $('body').on('click', '#return-to-root', this.returnToRoot);
};

$.MiniRhythmRing.prototype.returnToRoot = function() {
    Geometrhythm.curPlayingRhythm = null;
    clearInterval(Geometrhythm.playingRhythm);
    Backbone.history.navigate("/", {trigger: true})
}

$.fn.miniRhythmRing = function (superSizeMe) {
  return this.each(function () {
    new $.MiniRhythmRing(this, superSizeMe);
  });
};

$.MiniRhythmRing.prototype.initializeRhythm = function(rhythm) {
  this.rhythmCells = [];
  for (var i = 0; i < this.rhythmStr.length; i++) {
    this.rhythmCells.push( this.rhythmStr[i] === "x" ? true : false);
  }
  this.loopApplyUpdates();
};

$.MiniRhythmRing.prototype.placeCell = function(i, curAngle) {
  var $newCell = $('<div class="mini-cell">');
  $newCell.css('transform',
    'translateX(9px) translateY(-87px) rotate(' + curAngle + 'deg)');
  $newCell.attr('ord', i);
  if (this.rhythmCells[i]) { $newCell.addClass("onset"); }
  this.$el.append($newCell);

};

$.MiniRhythmRing.prototype.placeMedCell = function(i, curAngle) {
  var $newCell = $('<div class="med-cell">');
  $newCell.css('transform',
    'translateX(21px) translateY(-182px) rotate(' + curAngle + 'deg)');
  $newCell.attr('ord', i);
  if (this.rhythmCells[i]) { $newCell.addClass("onset"); }
  this.$el.append($newCell);
};

$.MiniRhythmRing.prototype.loopApplyUpdates = function() {
  var curAngle = CSS_EL_ANGLE_OFFSET;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;
  for (var i = 0; i < this.rhythmCells.length; i++ ) {
    if (this.superSizeMe) {
      this.placeMedCell(i, curAngle);
    } else {
      this.placeCell(i, curAngle);
    }
    curAngle += rhythmUnitInDegrees;
  };
};

$.MiniRhythmRing.prototype.refreshPolygon = function() {
  var prevPos = null;
  var firstPos = null;
  this.ctx.clearRect(0, 0, MINI_CANVAS_DIMENSION, MINI_CANVAS_DIMENSION);
  for (var i = 0; i <= this.rhythmCells.length * 2; i++ ) {
    j = i % this.rhythmCells.length;
    if (i > this.rhythmCells.length && j > firstPos) break;
    if (this.superSizeMe) {
      var curPosition = this.$el.find(".med-cell[ord='" + j + "']").position();
    } else {
      var curPosition = this.$el.find(".mini-cell[ord='" + j + "']").position();
    }
    var curPos = [curPosition.left, curPosition.top];
    if (this.rhythmCells[j]) {
      if (prevPos) this.drawSide(curPos, prevPos);
      if (!firstPos) firstPos = j;
      prevPos = curPos.slice();
    }
  }
};

$.MiniRhythmRing.prototype.drawSide = function(curPos, prevPos) {
  this.ctx.beginPath();
  if (this.superSizeMe) {
    this.ctx.moveTo(prevPos[0] + MED_POLYGON_OFFSET,
      prevPos[1] + MED_CANVAS_DIMENSION);
    this.ctx.lineTo(curPos[0] + MED_POLYGON_OFFSET,
      curPos[1] + MED_CANVAS_DIMENSION);
    this.ctx.lineWidth = 1;
  } else {
    this.ctx.moveTo(prevPos[0] + MINI_POLYGON_OFFSET,
      prevPos[1] + MINI_POLYGON_OFFSET);
    this.ctx.lineTo(curPos[0] + MINI_POLYGON_OFFSET,
      curPos[1] + MINI_POLYGON_OFFSET);
    this.ctx.lineWidth = 1;
  }
  this.ctx.stroke();
};
