$.RhythmRing = function (el, ctx) {
  this.$el = $(el);
  this.rhythmCells;
  this.rhythmCellAngles;
  this.rhythmIntercellAngles;

  //multiple channels required for samples not to mute each other
  this.samples = []
  $('audio').each(function(index) {
    this.samples.push($('audio')[index]);
  }.bind(this));

  this.ctx = $('#polygon-canvas')[0].getContext("2d");

  this.initializeRhythm("x--x--x---x-x---");

  ///CLICK HANDLERS/////
  this.$el.on('transitionend', '.intercell',
    this.cleanupMergedIntercell.bind(this));
  this.$el.on("mousedown", ".c-draggable", this.maybeToggle.bind(this));
  this.$el.on("mousedown", ".intercell", this.handleIntercellClick.bind(this));
  this.$el.on('dropout', '.cell', this.yankCellFromRing.bind(this));
  this.$el.on('dropover', '.intercell', this.squeezeCellIntoRing.bind(this));

  //this is only here to allow stopping dragging to delete it w/o killing the others since apparently suicide is impossible
  this.$el.on('dragstart', '.c-draggable', function(event) {
    $(event.currentTarget).attr("ord", -1) //doesn't have to be ord... could just be selected...
  }.bind(this));

  this.$el.on('dragstop', '.c-draggable', function(event) {
    //well, and don't delete it if you never dragged it off the thing in the first place...!
    this.$el.find('.c-draggable[ord="' + $(event.currentTarget).attr("ord") + '"]').remove();
  }.bind(this));

  this.playRhythm();
};

$.RhythmRing.prototype.playRhythm = function() {
  this.count = 0;
  this.sampler = 0;
  setInterval(function() {
    if (this.rhythmCells[this.count]) {
      $(".c-draggable[ord='" + this.count + "']").css('background-color', 'black');
    } else {
      $(".c-draggable[ord='" + this.count + "']").css('background-color', 'white');
    }

    if (this.count >= this.rhythmCells.length - 1) {
      this.count = 0;
    } else {
      this.count += 1;
    }

    $(".c-draggable[ord='" + this.count + "']").css('background-color', 'orange');

    if (this.rhythmCells[this.count]) {
      this.samples[this.sampler].play();
      this.sampler += 1;
      if (this.sampler >= 4) {
        this.sampler = 0;
      }
    }
  }.bind(this), 135);
}

$.RhythmRing.prototype.initializeRhythm = function(rhythmText) {
  this.$el.find(':not(.polygon-canvas)').empty();
  this.ctx.clearRect(0, 0, 600, 600);
  this.rhythmCells = [];
  for (var i = 0; i < rhythmText.length; i++) {
    this.rhythmCells.push( rhythmText[i] === "x" ? true : false);
  }
  this.loopApplyUpdates(null,
    this.placeCell.bind(this), this.placeIntercell.bind(this), 0);
  this.refreshDraggables();
  this.animatePolygon();
}

$.RhythmRing.prototype.placeCell = function(id, curAngle) {
  var $newCell = $('<div class="cell">');
  $newCell.attr("ord", id);
  $newCell.css('transform',
    'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
  $newCell.droppable();
  if (this.rhythmCells[id]) { $newCell.addClass("onset"); }
  this.$el.append($newCell);
};

$.RhythmRing.prototype.placeIntercell = function(id, curAngle) {
  var $newIntercell = $('<div class="intercell">');
  $newIntercell.attr('ord', id);
  $newIntercell.css('transform',
    'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
  $newIntercell.droppable();
  this.$el.append($newIntercell);
};

$.RhythmRing.prototype.animatePolygon = function() {
  setInterval(function() {
    var prevPos = null;
    this.ctx.clearRect(0, 0, 600, 600);
    for (var i = 0; i <= this.rhythmCells.length; i++ ) {
      var j = (i === this.rhythmCells.length ? 0 : i);
      var curPosition = $(".cell[ord='" + j + "']").position();
      var curPos = [curPosition.left, curPosition.top];
      if (this.rhythmCells[j]) {
        if (prevPos) this.drawSide(curPos, prevPos);
        prevPos = curPos.slice();
      }
    }
  }.bind(this), 50);
};

$.RhythmRing.prototype.cleanupMergedIntercell = function(event) {
  if ($(event.currentTarget).hasClass("markedForRemoval")) {
    $(event.currentTarget).remove();
  }
}

$.RhythmRing.prototype.maybeToggle = function(event) {
  var clickedCellId = parseInt($(event.currentTarget).attr("ord"));
  if (event.which === 3) this.toggleCell(clickedCellId);
};

$.RhythmRing.prototype.toggleCell = function(cellId) {
  if (this.rhythmCells[cellId]) {
    this.rhythmCells[cellId] = false;
    $(".cell[ord='" + cellId + "']").removeClass("onset");
    $(".c-draggable[ord='" + cellId + "']").removeClass("onset");
  } else {
    this.rhythmCells[cellId] = true;
    $(".cell[ord='" + cellId + "']").addClass("onset");
    $(".c-draggable[ord='" + cellId + "']").addClass("onset");
  }
  setTimeout(this.refreshDraggables.bind(this), 0);
}

$.RhythmRing.prototype.switchCellsAt = function (intercellId) {

  //temporarily clear away all of the un-animatible draggable cell handles
  //unless, that is, of course, they are the one currently being dragged!
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove();

  //account for wrapping from end to start of ring
  if (intercellId === this.rhythmCells.length - 1) {
    var nextIntercellId = 0;

    //delete cells at 0 and the last one
    $(".cell[ord='0']").remove();
    $(".cell[ord='" + intercellId + "']").remove();

    //immediately replace the cell at 0 w/ one at 359
    var $newCell = $('<div class="cell">');
    $newCell.attr("ord", 0);
    $newCell.droppable();
    $newCell.css('transform',
      'translateX(25px) translateY(25px) rotate('
      + (359.9 + 45) + 'deg)'); //don't forget to account for the 45deg offset!
    if (this.rhythmCells[0]) { $newCell.addClass("onset"); }
    this.$el.append($newCell);

    //...and the final cell w/ one just negative
    var $newCell = $('<div class="cell">');
    $newCell.droppable();
    $newCell.attr("ord", intercellId);
    $newCell.css('transform',
      'translateX(25px) translateY(25px) rotate('
      + ( this.rhythmCellAngles[intercellId] - 360 ) + 'deg)');
    if (this.rhythmCells[intercellId]) { $newCell.addClass("onset"); }
    this.$el.append($newCell);

  } else {
    var nextIntercellId = intercellId + 1;
  }

  //update the underlying array
  var tmpCell = this.rhythmCells[intercellId];
  this.rhythmCells[intercellId] = this.rhythmCells[nextIntercellId];
  this.rhythmCells[nextIntercellId] = tmpCell;

  //update the display after a frame to cause animations if it's a wrap case
  setTimeout( function() {
    $(".cell[ord='" + intercellId + "']").css('transform',
      'translateX(25px) translateY(25px) rotate('
      + this.rhythmCellAngles[nextIntercellId] + 'deg)')
      .attr("ord", "tmp");
    $(".cell[ord='" + nextIntercellId + "']").css('transform',
      'translateX(25px) translateY(25px) rotate('
      + this.rhythmCellAngles[intercellId] + 'deg)')
      .attr("ord", intercellId);
    $(".cell[ord='tmp']").attr("ord", nextIntercellId)
  }.bind(this), 0);

  setTimeout(this.refreshDraggables.bind(this), 501);
};

$.RhythmRing.prototype.drawSide = function(curPos, prevPos) {
  this.ctx.beginPath();
  this.ctx.moveTo(prevPos[0] + 20, prevPos[1] + 20);
  this.ctx.lineTo(curPos[0] + 20, curPos[1] + 20);
  this.ctx.lineWidth = 2;
  this.ctx.stroke();
};

$.RhythmRing.prototype.refreshDraggables = function() {
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove(); //cuz it triggers once for each el that finishes animating
  var curAngle = -90; //this way wants to start from far right edge of ring
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;

  var prevPos = null;
  this.ctx.clearRect(0, 0, 600, 600);
  for (var i = 0; i < this.rhythmCells.length; i++ ) {
    var curAngleInRadians = curAngle * (Math.PI / 180);
    var curPos = [130 + (148 * Math.cos(curAngleInRadians)),
      130 + (148 * Math.sin(curAngleInRadians))];

    //draw polygon
    if (this.rhythmCells[i]) {
      if (prevPos) this.drawSide(curPos, prevPos);
      prevPos = curPos.slice();
    }

    var $newDraggable = $('<div class="c-draggable">')
      .draggable().css("position", "absolute")
      .css("left", curPos[0]).css("top", curPos[1])
      .attr("ord", i);
    if (this.rhythmCells[i] === true ) { $newDraggable.addClass("onset"); }
    this.$el.append($newDraggable);
    curAngle += rhythmUnitInDegrees;
  }

  curAngleInRadians = -90 * (Math.PI / 180);
  var curPos = [130 + (148 * Math.cos(curAngleInRadians)),
    130 + (148 * Math.sin(curAngleInRadians))];
  this.drawSide(curPos, prevPos)
};

$.RhythmRing.prototype.handleIntercellClick = function(event) {
  var clickedIntercellId = parseInt($(event.currentTarget).attr("ord"));
  if (event.which === 1) {
    this.actionAt("insert", clickedIntercellId);
  } else if (event.which === 3) {
    this.switchCellsAt(clickedIntercellId);
  }
};

$.RhythmRing.prototype.yankCellFromRing = function(event) {
  setTimeout(function() {
    this.actionAt("delete", parseInt($(event.currentTarget).attr("ord")));
  }.bind(this), 0)
};

$.RhythmRing.prototype.squeezeCellIntoRing = function(event) {
  setTimeout( function() { this.actionAt("insert", clickedIntercellId) }.bind(this), 0);
};

$.RhythmRing.prototype.actionAt = function (action, id) {
  var options = this.actionOptions(action);
  this.clearDraggables();
  options.beforeLoopFn && options.beforeLoopFn(id);
  this.loopApplyUpdates(id, options.cellFn, options.intercellFn, 1);
  options.afterLoopFn && options.afterLoopFn(id);
  setTimeout(this.refreshDraggables.bind(this), 501);
};

$.RhythmRing.prototype.actionOptions = function(action, id) {
  var options = {};
  if (action === "delete") {
    options.beforeLoopFn = this.deleteCellAt.bind(this);
    options.intercellFn = this.updateIntercellOnDeletion.bind(this);
    options.afterLoopFn = function(id) { this.updateLaterIds(".intercell", id) }.bind(this);
  } else if (action === "insert") {
    options.beforeLoopFn = this.insertCellAt.bind(this);
  }
  options.cellFn = options.cellFn || this.updateCell;
  options.intercellFn = options.intercellFn || this.updateIntercell;

  return options;
}

$.RhythmRing.prototype.clearDraggables = function() {
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove();
};

$.RhythmRing.prototype.loopApplyUpdates = function(id, cellFn, intercellFn, maybeFinalPass) {
  this.rhythmCellAngles      = [];
  this.rhythmIntercellAngles = [];

  var curAngle = 45;
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

$.RhythmRing.prototype.updateCell = function(id, curAngle) {
  $(".cell[ord='" + id + "']").css('transform',
    'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
};
//THESE TWO COULD BE DRIED OUT ONCE I'VE SETTLED ON HOW TO RENDER THEM HOPEFULLY CENTERED
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

$.RhythmRing.prototype.deleteCellAt = function(cellId) {
  this.rhythmCells.splice(cellId, 1);
  $(".cell[ord='" + cellId + "']").remove();
  $(".intercell[ord='" + cellId + "']").addClass("markedForRemoval");
  this.updateLaterIds(".cell", cellId);
};

$.RhythmRing.prototype.insertCellAt = function (intercellId) {
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

$.RhythmRing.prototype.updateLaterIds = function(el, pivotId) {
  for (var i = pivotId; i < this.rhythmCells.length; i++) {
    $(el + "[ord='" + (i + 1) + "']").attr("ord", i);
  };
};

$.fn.rhythmRing = function () {
  return this.each(function () {
    new $.RhythmRing(this);
  });
};

$(function() {
  $('.rhythm-ring').rhythmRing();
});
