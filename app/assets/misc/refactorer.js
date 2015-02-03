$.RhythmRing.prototype.actionAt = function (action, id) {

  if (action === "delete") {
    var beforeLoopFn = this.deleteCellAtRefactored;
    var cellFn = this.updateCell;
    var intercellFn = this.updateIntercellOnDeletion;
    var afterLoopFn = this.updateLaterIntercellIds;
  } else if (action === "insert") {
    var beforeLoopFn = this.insertCellAtRefactored;
    var cellFn = this.updateCell;
    var intercellFn = this.updateIntercell;
  }

  this.clearDraggables();
  beforeLoopFn && beforeLoopFn(id);
  this.loopApplyUpdates(id, cellFn, intercellFn);
  afterLoopFn && afterLoopFn(id);
  setTimeout(this.refreshDraggables.bind(this), 501);
};



$.RhythmRing.prototype.clearDraggables = function() {
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove();
};

$.RhythmRing.prototype.updateLaterIntercellIds = function(id) {
  for (var i = id; i < this.rhythmCells.length; i++) {
    $(".intercell[ord='" + (i + 1) + "']").attr("ord", i);
  };
};

$.RhythmRing.prototype.loopApplyUpdates = function(id, cellFn, intercellFn) {
  this.rhythmCellAngles = [];
  this.rhythmIntercellAngles = [];

  var curAngle = 45;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;

  for (var i = 0; i < this.rhythmCells.length + 1; i++ ) {
    cellFn(i, curAngle);
    this.rhythmCellAngles.push(curAngle);
    curAngle += rhythmUnitInDegrees / 2;

    intercellFn(i, curAngle, id, rhythmUnitInDegrees);
    this.rhythmIntercellAngles.push(curAngle);
    curAngle += rhythmUnitInDegrees / 2;
  };
};

$.RhythmRing.prototype.updateCell = function(id, curAngle) {
  $(".cell[ord='" + id + "']").css('transform',
    'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
};

$.RhythmRing.prototype.updateIntercell = function(id, curAngle) {
  $(".intercell[ord='" + id + "']").css('transform',
    'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
};

$.RhythmRing.prototype.updateIntercellOnDeletion =
  function(id, curAngle, pivotId, rhythmUnitInDegrees) {
  if (id >= pivotId) {
    this.updateIntercell(id, curAngle - rhythmUnitInDegrees);
  } else {
    this.updateIntercell(id, curAngle);
  }
};

$.RhythmRing.prototype.deleteCellAtRefactored = function(cellId) {
  //temporarily clear away all of the un-animatible draggable cell handles
  //unless, that is, of course, they are the one currently being dragged!
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove();

  //remove the cell from the fundamental array and display
  this.rhythmCells.splice(cellId, 1);
  $(".cell[ord='" + cellId + "']").remove();
  $(".intercell[ord='" + cellId + "']").addClass("markedForRemoval");

  //update indices for cells after the removed one
  for (var i = cellId; i < this.rhythmCells.length; i++) {
    $(".cell[ord='" + (i + 1) + "']").attr("ord", i);
  }
};

$.RhythmRing.prototype.insertCellAtRefactored = function (intercellId) {

  //temporarily clear away all of the un-animatible draggable cell handles
  //unless, that is, of course, they are the one currently being dragged!
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove();

  //insert into the array here
  this.rhythmCells.splice(intercellId + 1, 0, false);

  //update indices of existing later cells and intercells
  for (var i = this.rhythmCells.length - 2; i > intercellId; i--) {
    $(".cell[ord='" + i + "']").attr("ord", i + 1);
    $(".intercell[ord='" + i + "']").attr("ord", i + 1);
  }

  //add the new intercell el (first, in order to appear underneath)
  var $newIntercell = $('<div class="intercell">');
  $newIntercell.attr("ord", intercellId + 1);
  $newIntercell.css('transform', //initial pos, will immediately rotate
    'translateX(32px) translateY(32px) rotate('
    + this.rhythmIntercellAngles[intercellId] + 'deg)');
  $newIntercell.droppable();
  this.$el.append($newIntercell);

  //add the new cell el
  var $newCell = $('<div class="cell">');
  $newCell.attr("ord", intercellId + 1);
  $newCell.droppable();
  $newCell.css('transform', //initial pos, will immediately rotate
    'translateX(25px) translateY(25px) rotate('
    + this.rhythmIntercellAngles[intercellId] + 'deg)');
  this.$el.append($newCell);
};
