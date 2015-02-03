CSS_EL_ANGLE_OFFSET = 45;

$.RhythmRing.prototype.placeCell = function(id, curAngle, temp, isGrabbedOnset) {
  var $newCell = $('<div class="cell">');
  $newCell.attr("ord", id);
  $newCell.css('transform',
    'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
  $newCell.droppable();
  if (temp) $newCell.css('opacity', 0.5);
  if (this.rhythmCells[id] || isGrabbedOnset) { $newCell.addClass("onset"); }
  this.$el.append($newCell);
};

$.RhythmRing.prototype.placeIntercell = function(id, curAngle) {
  var $newIntercell = $('<div class="intercell">');
  $newIntercell.attr('ord', id);
  $newIntercell.css('opacity', 0);
  $newIntercell.css('transform',
    'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
  $newIntercell.droppable({ tolerance: "touch",
    over: this.squeezeCellIntoRing.bind(this),
    out: this.recollapse.bind(this)
  });
  this.$el.append($newIntercell);
};

$.RhythmRing.prototype.handleIntercellClick = function(event) {
  var clickedIntercellId = parseInt($(event.currentTarget).attr("ord"));
  if (event.which === LEFT_CLICK) {
    this.actionAt("insert", clickedIntercellId);
  } else if (event.which === RIGHT_CLICK) {
    this.switchCellsAt(clickedIntercellId);
  }
};

$.RhythmRing.prototype.actionAt = function (action, id) {
  var options = this.actionOptions(action);
  this.clearHandles();
  this.clearLabels();
  options.beforeLoopFn && options.beforeLoopFn(id);
  setTimeout( function() {
    this.loopApplyUpdates(id, options.cellFn, options.intercellFn, 1);
    options.afterLoopFn && options.afterLoopFn(id);
    this.animating = true;
    this.animatePolygon();
    this.refreshWell();
  }.bind(this), 0);
};

$.RhythmRing.prototype.actionOptions = function(action, id) {
  var options = {};
  if (action === "delete") {
    options.beforeLoopFn = this.deleteCellAt.bind(this);
    options.intercellFn = this.updateIntercellAngleOnDeletion.bind(this);
    options.afterLoopFn = function(id) {
      this.updateLaterIdsOfType(".intercell", id)
    }.bind(this);
  } else if (action === "insert") {
    options.beforeLoopFn = this.insertCellAt.bind(this);
  } else if (action === "expand") {
    options.beforeLoopFn = this.expandForCellAt.bind(this);
  }
  options.cellFn = options.cellFn || this.updateCellAngle.bind(this);
  options.intercellFn = options.intercellFn || this.updateIntercellAngle.bind(this);

  return options;
};

$.RhythmRing.prototype.loopApplyUpdates =
  function(id, cellFn, intercellFn, maybeFinalPass) {

  this.rhythmCellAngles      = [];
  this.rhythmIntercellAngles = [];

  var curAngle = CSS_EL_ANGLE_OFFSET;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;

  for (var i = 0; i < this.rhythmCells.length + maybeFinalPass; i++ ) {
    cellFn(i, curAngle);
    this.rhythmCellAngles.push(curAngle);
    curAngle += rhythmUnitInDegrees / 2;

    intercellFn(i, curAngle, id, rhythmUnitInDegrees);
    this.rhythmIntercellAngles.push(curAngle);
    curAngle += rhythmUnitInDegrees / 2;
  };
};

$.RhythmRing.prototype.updateCellAngle = function(id, curAngle) {
  this.$el.find(".cell[ord='" + id + "']").css('transform',
    'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
};

$.RhythmRing.prototype.updateIntercellAngle = function(id, curAngle) {
  this.$el.find(".intercell[ord='" + id + "']").css('transform',
    'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
};

$.RhythmRing.prototype.updateIntercellAngleOnDeletion =
  function(id, curAngle, pivotId, rhythmUnitInDegrees) {
  if (id >= pivotId) {
    this.updateIntercellAngle(id, curAngle - rhythmUnitInDegrees);
  } else {
    this.updateIntercellAngle(id, curAngle);
  }
};

$.RhythmRing.prototype.updateLaterIdsOfType = function(el, pivotId) {
  for (var i = pivotId; i < this.rhythmCells.length; i++) {
    this.$el.find(el + "[ord='" + (i + 1) + "']").attr("ord", i);
  };
};

$.RhythmRing.prototype.updateLaterIds = function(id) {
  for (var i = this.rhythmCells.length - 2; i > id; i--) {
    this.$el.find(".cell[ord='" + i + "']").attr("ord", i + 1);
    this.$el.find(".intercell[ord='" + i + "']").attr("ord", i + 1);
  }
};

$.RhythmRing.prototype.cleanupMergedIntercell = function(event) {
  if ($(event.currentTarget).hasClass("markedForRemoval")) {
    $(event.currentTarget).remove();
  }
}

$.RhythmRing.prototype.deleteCellAt = function(cellId) {
  this.rhythmCells.splice(cellId, 1);
  this.$el.find(".cell[ord='" + cellId + "']").remove();
  this.$el.find(".intercell[ord='" + cellId + "']").addClass("markedForRemoval")
  this.updateLaterIdsOfType(".cell", cellId);
};

$.RhythmRing.prototype.insertCellAt = function (intercellId) {
  this.rhythmCells.splice(intercellId + 1, 0, false);
  this.updateLaterIds(intercellId);
  this.placeIntercell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
  this.placeCell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
};
