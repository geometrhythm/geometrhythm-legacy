$.RhythmRing = function (el, ctx) {
  this.$el = $(el);
  this.ctx = $('#polygon-canvas')[0].getContext("2d");
  this.initializeAudio();
  //this.audio = new $.RhythmRingAudio();
  this.initializeRhythm("x--x--x---x-x---");
  this.initializeEventHandlers();
  this.animating = false;
  this.grabbing = false;

  this.loopApplyUpdates(null,
    this.placeCell.bind(this), this.placeIntercell.bind(this), 0);
  this.refreshHandles();
  this.refreshPolygon();
};

$.RhythmRing.prototype.initializeAudio = function() {
  this.busses = [];
  this.tempo = 125;
  $('audio').each(function(index) {
    this.busses.push($('audio')[index]);
  }.bind(this));
  this.playPos = -1;
  this.curBus = 0;
  this.paused = true;
};

$.RhythmRing.prototype.pulseDuration = function() {
  return ( 1000 / ( this.tempo / 60 ) ) / 4;
};

$.RhythmRing.prototype.initializeEventHandlers = function() {
  $('body').on('click', 'button', this.togglePlay.bind(this));
  $('body').on('change', 'input', this.changeTempo.bind(this));
  this.$el.on('transitionend', '.intercell',
    this.cleanupMergedIntercell.bind(this));
  this.$el.on('transitionend', '.cell', this.endAnimation.bind(this));
  this.$el.on("mousedown", ".cell-handle", this.maybeToggle.bind(this));
  this.$el.on("mousedown", ".intercell", this.handleIntercellClick.bind(this));
  this.$el.on('dropout', '.cell', this.yankCellFromRing.bind(this));
  this.$el.on('dropover', '.intercell', this.squeezeCellIntoRing.bind(this));
  this.$el.on('dragstart', '.cell-handle', function(event) {
    $(event.currentTarget).css('opacity', 1);
    this.$el.find(".cell[ord='" + parseInt($(event.currentTarget).attr("ord")) + "']").css('opacity', 0);
  }.bind(this));
  this.$el.on('dragstop', '.cell-handle', function(event) {
    if ($(event.currentTarget).hasClass("grabbed") === true) {
       $(event.currentTarget).remove();
    } else {

    }
    this.grabbing = false;
  }.bind(this));
};

$.RhythmRing.prototype.changeTempo = function(event) {
  this.tempo = parseInt($(event.currentTarget).val());
}

$.RhythmRing.prototype.togglePlay = function() {
  if (this.paused) {
    this.paused = false;
    this.playRhythm();
    $('button').addClass("active").html('Pause');
  } else {
    this.paused = true;
    $('button').removeClass("active").html('Play');
  }
}

$.RhythmRing.prototype.endAnimation = function() {
  this.animating = false;
  this.refreshHandles();
};

$.RhythmRing.prototype.playRhythm = function() {
  if (this.paused) return;
  setTimeout(function() {
    var fill = this.rhythmCells[this.playPos] ? 'black' : 'white';
    this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
      .css('background-color', fill);
    this.$el.find(".cell[ord='" + this.playPos + "']")
      .css('background-color', fill);

    this.playPos += this.playPos >= this.len() - 1 ? -(this.len() - 1) : 1

    var fill = this.rhythmCells[this.playPos] ? 'orange' : 'cornsilk';
    this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
      .css('background-color', fill);
    this.$el.find(".cell[ord='" + this.playPos + "']")
      .css('background-color', fill);

    if (this.rhythmCells[this.playPos]) {
      this.busses[this.curBus].play();
      this.curBus += 1;
      if (this.curBus >= 4) {
        this.curBus = 0;
      }
    }
    this.playRhythm();
  }.bind(this), this.pulseDuration());
}

$.RhythmRing.prototype.len = function() {
  return this.rhythmCells.length;
};

$.RhythmRing.prototype.initializeRhythm = function(rhythmText) {
  this.$el.find(':not(.polygon-canvas)').empty();
  this.rhythmCells = [];
  for (var i = 0; i < rhythmText.length; i++) {
    this.rhythmCells.push( rhythmText[i] === "x" ? true : false);
  }
}

$.RhythmRing.prototype.placeCell = function(id, curAngle, visible) {
  var $newCell = $('<div class="cell">');
  $newCell.attr("ord", id);
  $newCell.css('transform',
    'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
  if (visible) $newCell.css('opacity', 1);
  $newCell.droppable();
  if (this.rhythmCells[id]) { $newCell.addClass("onset"); }
  this.$el.append($newCell);
};

$.RhythmRing.prototype.placeIntercell = function(id, curAngle) {
  var $newIntercell = $('<div class="intercell">');
  $newIntercell.attr('ord', id);
  //$newIntercell.css('opacity', 0);
  $newIntercell.css('transform',
    'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
  $newIntercell.droppable();
  this.$el.append($newIntercell);
};

$.RhythmRing.prototype.animatePolygon = function() {
  if (!this.animating) return;
  setTimeout(function() {
    this.refreshPolygon();
    this.animatePolygon();
  }.bind(this), 20);
};

$.RhythmRing.prototype.refreshPolygon = function() {
  var prevPos = null;
  var firstPos = null;
  this.ctx.clearRect(0, 0, 600, 600);
  for (var i = 0; i <= this.rhythmCells.length * 2; i++ ) {
    j = i % this.rhythmCells.length;
    if (i > this.rhythmCells.length && j > firstPos) break;
    var curPosition = $(".cell[ord='" + j + "']").position();
    var curPos = [curPosition.left, curPosition.top];
    if (this.rhythmCells[j]) {
      if (prevPos) this.drawSide(curPos, prevPos);
      if (!firstPos) firstPos = j;
      prevPos = curPos.slice();
    }
  }
};

$.RhythmRing.prototype.maybeToggle = function(event) {
  var clickedCellId = parseInt($(event.currentTarget).attr("ord"));
  if (event.which === 3) this.toggleCell(clickedCellId);
};

$.RhythmRing.prototype.toggleCell = function(cellId) {
  if (this.rhythmCells[cellId]) {
    this.rhythmCells[cellId] = false;
    this.$el.find(".cell[ord='" + cellId + "']").removeClass("onset")
      .css('background-color', "white");
    this.$el.find(".cell-handle[ord='" + cellId + "']").removeClass("onset");
  } else {
    this.rhythmCells[cellId] = true;
    this.$el.find(".cell[ord='" + cellId + "']").addClass("onset")
      .css('background-color', "black");
    this.$el.find(".cell-handle[ord='" + cellId + "']").addClass("onset");
  }
  this.refreshPolygon();
  setTimeout(this.refreshHandles.bind(this), 0);
}

$.RhythmRing.prototype.switchCellsAt = function (intercellId) {
  if (this.neighborCellsAreTheSame(intercellId)) return;
  this.clearHandles();
  if (intercellId === this.rhythmCells.length - 1) {
    this.prepFirstAndLastCellsForSwap();
  }
  this.switchCellsInArray(intercellId);
  setTimeout( function() {
    this.switchDisplayCells(intercellId);
  }.bind(this), 0);
  this.animating = true;
  this.animatePolygon();
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

$.RhythmRing.prototype.prepFirstAndLastCellsForSwap = function () {
  var lastIndex = this.rhythmCells.length - 1;
  this.$el.find(".cell[ord='0']").remove();
  this.$el.find(".cell[ord='" + lastIndex + "']").remove();
  this.placeCell(0, 359.9 + 45, true);
  this.placeCell(lastIndex, this.rhythmCellAngles[lastIndex] - 360, true);
};

$.RhythmRing.prototype.refreshHandles = function() {
  var curAngle = -90;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;
  var prevPos = null;
  for (var i = 0; i < this.rhythmCells.length; i++ ) {
    var curAngleInRadians = curAngle * (Math.PI / 180);
    var curPos = [130 + (148 * Math.cos(curAngleInRadians)),
      130 + (148 * Math.sin(curAngleInRadians))];
    this.placeHandle(i, curPos);
    curAngle += rhythmUnitInDegrees;
  }
  curAngleInRadians = -90 * (Math.PI / 180);
  var curPos = [130 + (148 * Math.cos(curAngleInRadians)),
    130 + (148 * Math.sin(curAngleInRadians))];
};

$.RhythmRing.prototype.placeHandle = function(id, curPos) {
  var $newHandle = $('<div class="cell-handle">')
    .draggable({revert: true, revertDuration: 100})
    .css("position", "absolute")
    .css("opacity", 0)
    .css("left", curPos[0]).css("top", curPos[1])
    .attr("ord", id);
  if (this.rhythmCells[id] === true ) { $newHandle.addClass("onset"); }
  this.$el.append($newHandle);
};

$.RhythmRing.prototype.clearHandles = function() {
  this.$el.find('.cell').css('opacity', 1);
  this.$el.find('.cell-handle:not(.ui-draggable-dragging)').remove();
};

$.RhythmRing.prototype.drawSide = function(curPos, prevPos) {
  this.ctx.beginPath();
  this.ctx.moveTo(prevPos[0] + 20, prevPos[1] + 20);
  this.ctx.lineTo(curPos[0] + 20, curPos[1] + 20);
  this.ctx.lineWidth = 2;
  this.ctx.stroke();
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
  if (!this.grabbing) {
    this.grabbing = true;
    setTimeout(function() {
      var id = parseInt($(event.currentTarget).attr("ord"));
      console.log("tried to yank from " + id);
      this.actionAt("delete", id);
      this.$el.find(".cell-handle").draggable("option", "disabled", true);
      this.$el.find(".cell-handle[ord='" + id + "']").addClass("grabbed")
        .css("opacity", 1)
        .css("background-color", "DodgerBlue")
        .draggable("option", "enabled", true)
        .draggable("option", "revert", false);
    }.bind(this), 0)
  }
};

$.RhythmRing.prototype.squeezeCellIntoRing = function(event) {
  setTimeout( function() {
    var id = parseInt($(event.currentTarget).attr("ord"));
    console.log("tried to squeeze at " + id);
    this.actionAt("expand", id)
  }.bind(this), 0);
};

$.RhythmRing.prototype.actionAt = function (action, id) {
  var options = this.actionOptions(action);
  this.clearHandles();
  options.beforeLoopFn && options.beforeLoopFn(id);
  setTimeout( function() {
    this.loopApplyUpdates(id, options.cellFn, options.intercellFn, 1);
    options.afterLoopFn && options.afterLoopFn(id);
    this.animating = true;
    this.animatePolygon();
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
  console.log("inserting at " + intercellId);
  this.rhythmCells.splice(intercellId + 1, 0, false);
  this.updateLaterIds(intercellId);
  this.placeIntercell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
  this.placeCell(intercellId + 1, this.rhythmIntercellAngles[intercellId], true);
};

//same as above "insertCellAt", just missing the last line...
$.RhythmRing.prototype.expandForCellAt = function (intercellId) {
  console.log("expanding at " + intercellId);
  this.rhythmCells.splice(intercellId + 1, 0, false);
  this.updateLaterIds(intercellId);
  this.placeIntercell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
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

$.fn.rhythmRing = function () {
  return this.each(function () {
    new $.RhythmRing(this);
  });
};

$(function() {
  $('.rhythm-ring').rhythmRing();
});
