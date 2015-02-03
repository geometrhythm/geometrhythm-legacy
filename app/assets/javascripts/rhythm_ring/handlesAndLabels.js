$.RhythmRing.prototype.maybeRemoveLabel = function(event) {
  if ($(event.currentTarget).hasClass("markedForRemoval")) {
    $(event.currentTarget).remove();
  }
};

$.RhythmRing.prototype.refreshHandlesAndLabels = function() {
  this.clearLabels();
  var curAngle = -90;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;
  var prevPos = null;
  for (var i = 0; i < this.rhythmCells.length; i++ ) {
    var curAngleInRadians = curAngle * (Math.PI / 180);
    this.placeHandle(i, this.handlePos(curAngleInRadians));
    this.placeLabel(i, this.labelPos(curAngleInRadians));
    curAngle += rhythmUnitInDegrees;
  }
};

$.RhythmRing.prototype.handlePos = function(curAngleInRadians) {
  return [139 + (152 * Math.cos(curAngleInRadians)),
    139 + (152 * Math.sin(curAngleInRadians))];
};

$.RhythmRing.prototype.labelPos = function(curAngleInRadians) {
  return [142 + (175 * Math.cos(curAngleInRadians)),
    136 + (175 * Math.sin(curAngleInRadians))];
};

$.RhythmRing.prototype.placeLabel = function(id, labelPos) {
  var $newLabel = $('<div class="cell-label">')
    .html("" + (id + 1))
    .css("left", labelPos[0]).css("top", labelPos[1])
    .attr("ord", id);
  setTimeout(function() { $newLabel.css('opacity', 1)}, 0);
  this.$el.append($newLabel);
};

$.RhythmRing.prototype.placeHandle = function(id, curPos) {
  var $newHandle = $('<div class="cell-handle">')
    .draggable({revert: true, revertDuration: 100})
    .css("position", "absolute")
    .css("opacity", 0) //switch back to zero when repositioned right
    .css("left", curPos[0]).css("top", curPos[1])
    .attr("ord", id);
  if (this.rhythmCells[id] === true ) { $newHandle.addClass("onset"); }
  this.$el.append($newHandle);
};

$.RhythmRing.prototype.clearHandles = function() {
  this.$el.find('.cell').css('opacity', 1);
  this.$el.find('.cell-handle:not(.ui-draggable-dragging)').remove();
};

$.RhythmRing.prototype.clearLabels = function() {
  this.$el.find('.cell-label').css('opacity', 0).addClass("markedForRemoval");
};
