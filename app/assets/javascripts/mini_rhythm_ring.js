$.MiniRhythmRing = function (el, ctx) {
  this.$el = $(el);
  this.rhythmStr = this.$el.attr("rhythm-str");
  // console.log(this.rhythmStr);
  // this.ctx = $('#polygon-canvas')[0].getContext("2d");
  this.initializeRhythm(this.rhythmStr);
  // this.loopApplyUpdates(null,
  //   this.placeCell.bind(this), this.placeIntercell.bind(this), 0);
  // this.refreshHandlesAndLabels();
  // this.refreshPolygon();
};

$.fn.miniRhythmRing = function () {
  return this.each(function () {
    new $.MiniRhythmRing(this);
  });
};

$.MiniRhythmRing.prototype.initializeRhythm = function(rhythm) {
  this.rhythmCells = [];
  for (var i = 0; i < this.rhythmStr.length; i++) {
    this.rhythmCells.push( this.rhythmStr[i] === "x" ? true : false);
  }
  this.loopApplyUpdates();
};

// $(function () {
//   $('.mini-rhythm-ring').miniRhythmRing();
//   debugger
//   console.log("this happened");
// });


///////


CSS_EL_ANGLE_OFFSET = 45;

$.MiniRhythmRing.prototype.placeCell = function(i, curAngle) {
  var $newCell = $('<div class="mini-cell">');
  // $newCell.attr("ord", id);
  $newCell.css('transform',
    'translateX(9px) translateY(9px) rotate(' + curAngle + 'deg)');
  // $newCell.droppable();
  // if (temp) $newCell.css('opacity', 0.5);
  if (this.rhythmCells[i]) { $newCell.addClass("onset"); }
  this.$el.append($newCell);

};

// $.MiniRhythmRing.prototype.placeIntercell = function(id, curAngle) {
//   var $newIntercell = $('<div class="intercell">');
//   $newIntercell.attr('ord', id);
//   $newIntercell.css('opacity', 0);
//   $newIntercell.css('transform',
//     'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
//   $newIntercell.droppable({ tolerance: "touch",
//     over: this.squeezeCellIntoRing.bind(this),
//     out: this.recollapse.bind(this)
//   });
//   this.$el.append($newIntercell);
// };

// $.MiniRhythmRing.prototype.handleIntercellClick = function(event) {
//   var clickedIntercellId = parseInt($(event.currentTarget).attr("ord"));
//   if (event.which === LEFT_CLICK) {
//     this.actionAt("insert", clickedIntercellId);
//   } else if (event.which === RIGHT_CLICK) {
//     this.switchCellsAt(clickedIntercellId);
//   }
// };

// $.MiniRhythmRing.prototype.actionAt = function (action, id) {
//   var options = this.actionOptions(action);
//   this.clearHandles();
//   this.clearLabels();
//   options.beforeLoopFn && options.beforeLoopFn(id);
//   setTimeout( function() {
//     this.loopApplyUpdates(id, options.cellFn, options.intercellFn, 1);
//     options.afterLoopFn && options.afterLoopFn(id);
//     this.animating = true;
//     this.animatePolygon();
//     this.refreshWell();
//   }.bind(this), 0);
// };

// $.MiniRhythmRing.prototype.actionOptions = function(action, id) {
//   var options = {};
//   if (action === "delete") {
//     options.beforeLoopFn = this.deleteCellAt.bind(this);
//     options.intercellFn = this.updateIntercellAngleOnDeletion.bind(this);
//     options.afterLoopFn = function(id) {
//       this.updateLaterIdsOfType(".intercell", id)
//     }.bind(this);
//   } else if (action === "insert") {
//     options.beforeLoopFn = this.insertCellAt.bind(this);
//   } else if (action === "expand") {
//     options.beforeLoopFn = this.expandForCellAt.bind(this);
//   }
//   options.cellFn = options.cellFn || this.updateCellAngle.bind(this);
//   options.intercellFn = options.intercellFn || this.updateIntercellAngle.bind(this);
//
//   return options;
// };

$.MiniRhythmRing.prototype.loopApplyUpdates = function() {

  //this.rhythmCellAngles      = [];
  // this.rhythmIntercellAngles = [];

  var curAngle = CSS_EL_ANGLE_OFFSET;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;

  for (var i = 0; i < this.rhythmCells.length; i++ ) {
    //cellFn(i, curAngle);
    //this.rhythmCellAngles.push(curAngle);
    this.placeCell(i, curAngle);
    curAngle += rhythmUnitInDegrees;

    // intercellFn(i, curAngle, id, rhythmUnitInDegrees);
    // this.rhythmIntercellAngles.push(curAngle);
    // curAngle += rhythmUnitInDegrees / 2;
  };
};

// $.MiniRhythmRing.prototype.updateCellAngle = function(id, curAngle) {
//   this.$el.find(".cell[ord='" + id + "']").css('transform',
//     'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
// };
//
// $.MiniRhythmRing.prototype.updateIntercellAngle = function(id, curAngle) {
//   this.$el.find(".intercell[ord='" + id + "']").css('transform',
//     'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
// };

// $.MiniRhythmRing.prototype.updateIntercellAngleOnDeletion =
//   function(id, curAngle, pivotId, rhythmUnitInDegrees) {
//   if (id >= pivotId) {
//     this.updateIntercellAngle(id, curAngle - rhythmUnitInDegrees);
//   } else {
//     this.updateIntercellAngle(id, curAngle);
//   }
// };
//
// $.MiniRhythmRing.prototype.updateLaterIdsOfType = function(el, pivotId) {
//   for (var i = pivotId; i < this.rhythmCells.length; i++) {
//     this.$el.find(el + "[ord='" + (i + 1) + "']").attr("ord", i);
//   };
// };
//
// $.MiniRhythmRing.prototype.updateLaterIds = function(id) {
//   for (var i = this.rhythmCells.length - 2; i > id; i--) {
//     this.$el.find(".cell[ord='" + i + "']").attr("ord", i + 1);
//     this.$el.find(".intercell[ord='" + i + "']").attr("ord", i + 1);
//   }
// };
//
// $.MiniRhythmRing.prototype.cleanupMergedIntercell = function(event) {
//   if ($(event.currentTarget).hasClass("markedForRemoval")) {
//     $(event.currentTarget).remove();
//   }
// }

// $.MiniRhythmRing.prototype.deleteCellAt = function(cellId) {
//   this.rhythmCells.splice(cellId, 1);
//   this.$el.find(".cell[ord='" + cellId + "']").remove();
//   this.$el.find(".intercell[ord='" + cellId + "']").addClass("markedForRemoval")
//   this.updateLaterIdsOfType(".cell", cellId);
// };
//
// $.MiniRhythmRing.prototype.insertCellAt = function (intercellId) {
//   this.rhythmCells.splice(intercellId + 1, 0, false);
//   this.updateLaterIds(intercellId);
//   this.placeIntercell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
//   this.placeCell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
// };
