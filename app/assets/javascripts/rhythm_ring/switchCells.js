$.RhythmRing.prototype.switchCellsAt = function (intercellId) {
  if (this.neighborCellsAreTheSame(intercellId)) return;
  this.clearHandles();
  if (intercellId === this.rhythmCells.length - 1) {
    this.prepFirstAndLastCellsForSwitch();
  }
  this.switchCellsInArray(intercellId);
  setTimeout( function() {
    this.switchDisplayCells(intercellId);
    this.animating = true;
    this.animatePolygon();
  }.bind(this), 0);
};

$.RhythmRing.prototype.neighborCellsAreTheSame = function(id) {
  return this.rhythmCells[id] === this.rhythmCells[this.nextCellId(id)];
};

$.RhythmRing.prototype.nextCellId = function(id) {
  return (id === this.rhythmCells.length - 1 ? 0 : id + 1);
};

$.RhythmRing.prototype.switchCellsInArray = function(intercellId) {
  var nextId = this.nextCellId(intercellId);
  var tmpCell = this.rhythmCells[intercellId];
  this.rhythmCells[intercellId] = this.rhythmCells[nextId];
  this.rhythmCells[nextId] = tmpCell;
};

$.RhythmRing.prototype.switchDisplayCells = function(intercellId) {
  var nextId = this.nextCellId(intercellId);
  setTimeout( function() {
    this.updateCellAngle(intercellId, this.rhythmCellAngles[nextId]);
    this.updateCellAngle(nextId, this.rhythmCellAngles[intercellId]);
    this.switchDisplayCellOrds(intercellId);
  }.bind(this), 0);
};

$.RhythmRing.prototype.switchDisplayCellOrds = function(intercellId) {
  var nextId = this.nextCellId(intercellId);
  this.$el.find(".cell[ord='" + intercellId + "']").attr("ord", "tmp");
  this.$el.find(".cell[ord='" + nextId + "']").attr("ord", intercellId);
  this.$el.find(".cell[ord='tmp']").attr("ord", nextId)
}

$.RhythmRing.prototype.prepFirstAndLastCellsForSwitch = function () {
  var lastIndex = this.rhythmCells.length - 1;
  this.$el.find(".cell[ord='0']").remove();
  this.$el.find(".cell[ord='" + lastIndex + "']").remove();
  this.placeCell(0, 359.9 + CSS_EL_ANGLE_OFFSET);
  this.placeCell(lastIndex, this.rhythmCellAngles[lastIndex] - 360);
};
