$.RhythmRing = function (el, ctx) {
  this.$el = $(el);
  this.ctx = $('#polygon-canvas')[0].getContext("2d");
  this.initializeAudio();
  //this.audio = new $.RhythmRingAudio();
  this.initializeRhythm("x--x--x---x-x---");
  this.initializeEventHandlers();
};

$.RhythmRing.prototype.initializeAudio = function() {
  this.samples = [];
  $('.slider').slider({
    min: 5,
    max: 250
  })
  $('audio').each(function(index) {
    this.samples.push($('audio')[index]);
  }.bind(this));
  this.playPos = 0;
  this.playRhythm();
};

$.RhythmRing.prototype.initializeEventHandlers = function() {
  this.$el.on('transitionend', '.intercell',
    this.cleanupMergedIntercell.bind(this));
  this.$el.on('transitionend', '.cell', function() {$('.cell').css('opacity', 0) });
  this.$el.on("mousedown", ".c-draggable", this.maybeToggle.bind(this));
  this.$el.on("mousedown", ".intercell", this.handleIntercellClick.bind(this));
  this.$el.on('dropout', '.cell', this.yankCellFromRing.bind(this));
  this.$el.on('dropover', '.intercell', this.squeezeCellIntoRing.bind(this));

  //this is only here to allow stopping dragging to delete it w/o killing the others since apparently suicide is impossible
  this.$el.on('dragstart', '.c-draggable', function(event) {
    $(event.currentTarget).attr("ord", -1)
    //$(event.currentTarget).prop("grabbed", true)
  }.bind(this));

  this.$el.on('dragstop', '.c-draggable', function(event) {
    this.$el.find('.c-draggable[ord="' + $(event.currentTarget).attr("ord") + '"]').remove();
    //well, and don't delete it if you never dragged it off the thing in the first place...!
    // if (flicking it away) {
    //   this.$el.find('.c-draggable[ord="' + $(event.currentTarget).attr("ord") + '"]').remove();
    // } else if (didnt really move it) {
    //
    // } else if (dropping it in a new spot) {
    //
    // }
  }.bind(this));
};

$.RhythmRing.prototype.playRhythm = function() {
  this.sampler = 0;
  setInterval(function() {
    var fill = this.rhythmCells[this.playPos] ? 'black' : 'white';
    this.$el.find(".c-draggable[ord='" + this.playPos + "']")
      .css('background-color', fill);

    this.playPos += this.playPos >= this.len() - 1 ? -(this.len() - 1) : 1

    this.$el.find(".c-draggable[ord='" + this.playPos + "']")
      .css('background-color', 'orange');

    if (this.rhythmCells[this.playPos]) {
      this.samples[this.sampler].play();
      this.sampler += 1;
      if (this.sampler >= 4) {
        this.sampler = 0;
      }
    }
  }.bind(this), 135);
}

$.RhythmRing.prototype.len = function() {
  return this.rhythmCells.length;
};

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
  $newCell.css('opacity', 1).css('transform',
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
    this.$el.find(".cell[ord='" + cellId + "']").removeClass("onset");
    this.$el.find(".c-draggable[ord='" + cellId + "']").removeClass("onset");
  } else {
    this.rhythmCells[cellId] = true;
    this.$el.find(".cell[ord='" + cellId + "']").addClass("onset");
    this.$el.find(".c-draggable[ord='" + cellId + "']").addClass("onset");
  }
  setTimeout(this.refreshDraggables.bind(this), 0);
}

$.RhythmRing.prototype.switchCellsAt = function (intercellId) {
  this.clearDraggables();
  if (intercellId === this.rhythmCells.length - 1) {
    this.prepFirstAndLastCellsForSwap();
  }
  this.switchCellsInArray(intercellId);
  setTimeout( function() {
    this.switchDisplayCells(intercellId);
  }.bind(this), 0);
  setTimeout(this.refreshDraggables.bind(this), 490);
};

$.RhythmRing.prototype.switchCellsInArray = function(intercellId) {
  nextId = intercellId === this.rhythmCells.length - 1 ? 0 : intercellId + 1
  var tmpCell = this.rhythmCells[intercellId];
  this.rhythmCells[intercellId] = this.rhythmCells[nextId];
  this.rhythmCells[nextId] = tmpCell;
};

$.RhythmRing.prototype.switchDisplayCells = function(intercellId) {
  nextId = intercellId === this.rhythmCells.length - 1 ? 0 : intercellId + 1
  setTimeout( function() {
    this.updateCellAngle(intercellId, this.rhythmCellAngles[nextId]).bind(this);
    this.updateCellAngle(nextId, this.rhythmCellAngles[intercellId]).bind(this);
    this.switchDisplayCellOrds(intercellId);
  }.bind(this), 0);
};

$.RhythmRing.prototype.switchDisplayCellOrds = function(intercellId) {
  nextId = intercellId === this.rhythmCells.length - 1 ? 0 : intercellId + 1
  this.$el.find(".cell[ord='" + intercellId + "']").attr("ord", "tmp");
  this.$el.find(".cell[ord='" + nextId + "']").attr("ord", intercellId);
  this.$el.find(".cell[ord='tmp']").attr("ord", nextId)
}

$.RhythmRing.prototype.prepFirstAndLastCellsForSwap = function () {
  var lastIndex = this.rhythmCells.length - 1;
  this.$el.find(".cell[ord='0']").remove();
  this.$el.find(".cell[ord='" + lastIndex + "']").remove();
  this.placeCell(0, 359.9 + 45);
  this.placeCell(lastIndex, this.rhythmCellAngles[lastIndex] - 360);
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

    this.placeDraggable(i, curPos);

    curAngle += rhythmUnitInDegrees;
  }

  curAngleInRadians = -90 * (Math.PI / 180);
  var curPos = [130 + (148 * Math.cos(curAngleInRadians)),
    130 + (148 * Math.sin(curAngleInRadians))];
  this.drawSide(curPos, prevPos)
};

$.RhythmRing.prototype.placeDraggable = function(id, curPos) {
  var $newDraggable = $('<div class="c-draggable">')
    .draggable().css("position", "absolute")
    .css("left", curPos[0]).css("top", curPos[1])
    .attr("ord", id);
  if (this.rhythmCells[id] === true ) { $newDraggable.addClass("onset"); }
  this.$el.append($newDraggable);
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
  setTimeout( function() {
    this.loopApplyUpdates(id, options.cellFn, options.intercellFn, 1);
    options.afterLoopFn && options.afterLoopFn(id);
    setTimeout(this.refreshDraggables.bind(this), 490);
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
  }
  options.cellFn = options.cellFn || this.updateCellAngle.bind(this);
  options.intercellFn = options.intercellFn || this.updateIntercellAngle.bind(this);

  return options;
};

$.RhythmRing.prototype.clearDraggables = function() {
  this.$el.find('.cell').css('opacity', 1);
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

$.RhythmRing.prototype.updateCellAngle = function(id, curAngle) {
  this.$el.find(".cell[ord='" + id + "']").css('transform',
    'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
};
//THESE TWO COULD BE DRIED OUT ONCE I'VE SETTLED ON HOW TO RENDER THEM HOPEFULLY CENTERED
$.RhythmRing.prototype.updateIntercellAngle = function(id, curAngle) {
  this.$el.find(".intercell[ord='" + id + "']").css('transform',
    'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
};
//I COULD MERGE THESE TWO BY HAVING IT DETECT IF IT'S A DELETION
$.RhythmRing.prototype.updateIntercellAngleOnDeletion =
  function(id, curAngle, pivotId, rhythmUnitInDegrees) {
  if (id >= pivotId) {
    this.updateIntercellAngle(id, curAngle - rhythmUnitInDegrees);
  } else {
    this.updateIntercellAngle(id, curAngle);
  }
};

$.RhythmRing.prototype.deleteCellAt = function(cellId) {
  this.rhythmCells.splice(cellId, 1);
  this.$el.find(".cell[ord='" + cellId + "']").remove();
  this.$el.find(".intercell[ord='" + cellId + "']").addClass("markedForRemoval");
  this.updateLaterIdsOfType(".cell", cellId);
};

$.RhythmRing.prototype.insertCellAt = function (intercellId) {
  this.rhythmCells.splice(intercellId + 1, 0, false);
  this.updateLaterIds(intercellId);
  this.placeIntercell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
  this.placeCell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
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

$.fn.rhythmRing = function () {
  return this.each(function () {
    new $.RhythmRing(this);
  });
};

$(function() {
  $('.rhythm-ring').rhythmRing();
});
