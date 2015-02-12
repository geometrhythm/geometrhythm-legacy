SYMMETRY_POLYGON_OFFSET = 7;
SYMMETRY_CANVAS_DIM = 150;

$.SymmetryRhythmRing = function (el) {
  this.$el = $(el);
  // this.superSizeMe = superSizeMe;
  // debugger
  // if (this.superSizeMe) {
  //   this.ctx = this.$el.find('.medium-polygon-canvas')[0].getContext("2d");
  // } else {
    this.ctx = this.$el.find('.symmetry-polygon-canvas')[0].getContext("2d");
  // }
  this.rhythmStr = this.$el.attr("rhythm-str");
  // debugger
  this.initializeRhythm(this.rhythmStr);
  this.refreshPolygon();
};

$.fn.symmetryRhythmRing = function () {
  return this.each(function () {
    new $.SymmetryRhythmRing(this);
  });
};

$.SymmetryRhythmRing.prototype.initializeRhythm = function(rhythm) {
  this.rhythmCells = [];
  for (var i = 0; i < this.rhythmStr.length; i++) {
    this.rhythmCells.push( this.rhythmStr[i] === "x" ? true : false);
  }
  this.loopApplyUpdates();
};

$.SymmetryRhythmRing.prototype.placeCell = function(i, curAngle) {
  var $newCell = $('<div class="symmetry-cell">');
  $newCell.css('transform',
    'translateX(17px) translateY(-141px) rotate(' + curAngle + 'deg)');
  $newCell.attr('ord', i);
  if (this.rhythmCells[i]) { $newCell.addClass("onset"); }
  this.$el.append($newCell);

};

// $.SymmetryRhythmRing.prototype.placeMedCell = function(i, curAngle) {
//   var $newCell = $('<div class="med-cell">');
//   $newCell.css('transform',
//     'translateX(21px) translateY(-182px) rotate(' + curAngle + 'deg)');
//   $newCell.attr('ord', i);
//   if (this.rhythmCells[i]) { $newCell.addClass("onset"); }
//   this.$el.append($newCell);
// };

$.SymmetryRhythmRing.prototype.loopApplyUpdates = function() {
  var curAngle = 45;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;
  for (var i = 0; i < this.rhythmCells.length; i++ ) {
    // if (this.superSizeMe) {
    //   this.placeMedCell(i, curAngle);
    // } else {
      this.placeCell(i, curAngle);
    // }
    curAngle += rhythmUnitInDegrees;
  };
};

$.SymmetryRhythmRing.prototype.refreshPolygon = function() {
  var prevPos = null;
  var firstPos = null;
  this.ctx.clearRect(0, 0, SYMMETRY_CANVAS_DIM, SYMMETRY_CANVAS_DIM);
  for (var i = 0; i <= this.rhythmCells.length * 2; i++ ) {
    j = i % this.rhythmCells.length;
    if (i > this.rhythmCells.length && j > firstPos) break;
    //debugger
    // if (this.superSizeMe) {
    //   var curPosition = this.$el.find(".med-cell[ord='" + j + "']").position();
    // } else {
      var curPosition = this.$el.find(".symmetry-cell[ord='" + j + "']").position();
    // }
    // if (!curPosition) { curPosition = $(".cell-handle.grabbed").position(); }
    var curPos = [curPosition.left, curPosition.top];
    if (this.rhythmCells[j]) {
      if (prevPos) this.drawSide(curPos, prevPos);
      if (!firstPos) firstPos = j;
      prevPos = curPos.slice();
    }
  }
};

$.SymmetryRhythmRing.prototype.drawSide = function(curPos, prevPos) {
  this.ctx.strokeStyle = '#888';
  this.ctx.beginPath();
  // if (this.superSizeMe) {
  //   this.ctx.moveTo(prevPos[0] + MED_POLYGON_OFFSET, prevPos[1] + MED_CANVAS_DIMENSION);
  //   this.ctx.lineTo(curPos[0] + MED_POLYGON_OFFSET, curPos[1] + MED_CANVAS_DIMENSION);
  //   this.ctx.lineWidth = 1;
  // } else {

    this.ctx.moveTo(prevPos[0] + SYMMETRY_POLYGON_OFFSET, prevPos[1] + SYMMETRY_POLYGON_OFFSET);
    this.ctx.lineTo(curPos[0] + SYMMETRY_POLYGON_OFFSET, curPos[1] + SYMMETRY_POLYGON_OFFSET);
    this.ctx.lineWidth = 1;
  // }
  this.ctx.stroke();
};
