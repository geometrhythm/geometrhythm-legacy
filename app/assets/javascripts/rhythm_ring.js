LEFT_CLICK = 1;
RIGHT_CLICK = 3;

$.RhythmRing = function (el, ctx) {
  this.$el = $(el);
  this.ctx = $('#polygon-canvas')[0].getContext("2d");
  this.initializeAudio();
  this.initializeRhythm($('#current-rhythm').val());
  this.initializeEventHandlers();
  this.animating = false;
  this.grabbing = false;
  this.loopApplyUpdates(null,
    this.placeCell.bind(this), this.placeIntercell.bind(this), 0);
  this.refreshHandlesAndLabels();
  this.refreshPolygon();
  $('#bb-info').trigger('plugin-change');
};

$.RhythmRing.prototype.refreshWell = function() {
  $('#current-rhythm').attr('value', this.rhythmAsStr());
  var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
      return rhythm.get("rhythm_str") === $('#current-rhythm').val();
    }
  );
  if (dbRhythm) {
    $('#cur-rhythm-id').attr('value', dbRhythm.id);
  } else {
    $('#cur-rhythm-id').attr('value', '');
  }
  $.cookie('_Geometrhythm_stored_rhythm', this.rhythmAsStr(), { expires: 7, path: '/' });
  $('#bb-info').trigger('plugin-change');
}

$.RhythmRing.prototype.len = function() {
  return this.rhythmCells.length;
};

$.RhythmRing.prototype.rhythmAsStr = function() {
  var str = "";
  for ( var i = 0; i < this.rhythmCells.length; i++ ) {
    if (this.rhythmCells[i]) {
      str += "x";
    } else {
      str += "-";
    }
  };
  return str;
}

$.RhythmRing.prototype.initializeEventHandlers = function() {
  $('body').on('click', '#play-pause', this.togglePlay.bind(this));
  $('body').on('click', '#invert', this.invertRhythm.bind(this));
  $('body').on('click', '#reverse', this.reverseRhythm.bind(this));
  $('body').on('mousedown', '#clockwise', this.rotateRhythmClockwise.bind(this));
  $('body').on('mousedown', '#c-clockwise', this.rotateRhythmCounterClockwise.bind(this));
  $('body').on('change', '#input-tempo', this.changeTempo.bind(this));
  $('body').on('change', '#input-rhythm', this.manualOverrideRhythm.bind(this));
  $('body').on('dbl-click', '#clockwise', this.rotateRhythmClockwise.bind(this));

  this.$el.on('transitionend', '.intercell',
    this.cleanupMergedIntercell.bind(this));
  this.$el.on('transitionend', '.cell', this.endAnimation.bind(this));
  this.$el.on("mousedown", ".cell-handle", this.maybeToggle.bind(this));
  this.$el.on("mousedown", ".intercell", this.handleIntercellClick.bind(this));
  this.$el.on('dropout', '.cell', this.yankCellFromRing.bind(this));
  this.$el.on('dragstart', '.cell-handle', this.hideCellItself.bind(this));
  this.$el.on('dragstop', '.cell-handle', this.letGoOfCell.bind(this));
  this.$el.on('mouseover', '.cell-handle', this.highlightCell.bind(this));
  this.$el.on('mouseleave', '.cell-handle', this.highlightOffCell.bind(this));
  this.$el.on('transitionend', '.cell-label', this.maybeRemoveLabel.bind(this));
};

$.RhythmRing.prototype.initializeRhythm = function(rhythmStr) {
  this.$el.find(':not(.polygon-canvas)').empty();
  this.rhythmCells = [];
  for (var i = 0; i < rhythmStr.length; i++) {
    this.rhythmCells.push( rhythmStr[i] === "x" ? true : false);
  }
}

$.RhythmRing.prototype.highlightCell = function(event) {
  if (this.grabbing) {
    this.$el.find(".grabbed").css('box-shadow', '0px 0px 5px DodgerBlue');
  } else {
    this.$el.find(".cell[ord='"
      + parseInt($(event.currentTarget).attr("ord")) + "']")
    .css('box-shadow', '0px 0px 5px DodgerBlue');
  }
};

$.RhythmRing.prototype.highlightOffCell = function(event) {
  this.$el.find(".cell[ord='" + parseInt($(event.currentTarget).attr("ord"))
    + "']").css('box-shadow', '');
}

$.RhythmRing.prototype.maybeToggle = function(event) {
  if (event.which === RIGHT_CLICK) {
    var clickedCellId = parseInt($(event.currentTarget).attr("ord"));
    this.toggleCell(clickedCellId);
  }
};

$.RhythmRing.prototype.toggleCell = function(cellId, dontRefresh) {
  if (this.rhythmCells[cellId]) {
    this.rhythmCells[cellId] = false;
    this.$el.find(".cell[ord='" + cellId + "']").removeClass("onset")
      .css('background-color', "white");
    this.$el.find(".cell-handle[ord='" + cellId + "']").removeClass("onset");
  } else {
    this.rhythmCells[cellId] = true;
    this.$el.find(".cell[ord='" + cellId + "']").addClass("onset")
      .css('background-color', "#333");
    this.$el.find(".cell-handle[ord='" + cellId + "']").addClass("onset");
  }
  this.refreshPolygon();
  if (!dontRefresh) {
    this.refreshWell();
    setTimeout(this.refreshHandlesAndLabels.bind(this), 0);
  }
}

$.RhythmRing.prototype.invertRhythm = function() {
  for (var i = 0; i < this.rhythmCells.length; i++) {
    this.toggleCell(i, true);
  }
  this.refreshWell();
}

$.RhythmRing.prototype.reverseRhythm = function() {
  var tempRhythmCells = this.rhythmCells.slice(0);
  for (var i = 0; i < this.rhythmCells.length; i++) {
    if (this.rhythmCells[i] != tempRhythmCells[(this.rhythmCells.length - i) - 1]) {
      this.toggleCell(i, true);
    }
  }
  this.rotateRhythmClockwiseByCell();
  this.refreshWell();
};

$.RhythmRing.prototype.rotateRhythmClockwise = function(event) {
  if (event.which === LEFT_CLICK ) {
    this.rotateRhythmClockwiseByCell();
  } else if (event.which === RIGHT_CLICK ) {
    this.rotateRhythmClockwiseByOnset();
  }
  this.refreshWell();
};

$.RhythmRing.prototype.rotateRhythmClockwiseByCell = function() {
  var tempCell = this.rhythmCells[this.rhythmCells.length - 1];
  for (var i = this.rhythmCells.length - 1; i > 0; i--) {
    if (this.rhythmCells[i] != this.rhythmCells[i - 1]) {
      this.toggleCell(i, true);
    }
  }
  if (this.rhythmCells[0] != tempCell) {
    this.toggleCell(0, true);
  }
};

$.RhythmRing.prototype.rotateRhythmClockwiseByOnset = function() {
  var lastOnsetDiff = null;
  for (var i = this.rhythmCells.length - 1; i > 0; i--) {
    if ( this.rhythmCells[i] ) {
      lastOnsetDiff = this.rhythmCells.length - i;
      break;
    }
  }
  var tempCells = this.rhythmCells.slice(0)
  for (var i = this.rhythmCells.length - 1; i >= 0; i--) {
    var thisIndex = i - lastOnsetDiff;
    if (thisIndex < 0 ) thisIndex += this.rhythmCells.length;
    if (this.rhythmCells[i] != tempCells[thisIndex]) {
      this.toggleCell(i, true);
    }
  }
};

$.RhythmRing.prototype.rotateRhythmCounterClockwise = function() {
  if (event.which === LEFT_CLICK ) {
    this.rotateRhythmCounterClockwiseByCell();
  } else if (event.which === RIGHT_CLICK ) {
    this.rotateRhythmCounterClockwiseByOnset();
  }
  this.refreshWell();
}

$.RhythmRing.prototype.rotateRhythmCounterClockwiseByCell = function() {
  var tempCell = this.rhythmCells[0];
  for (var i = 0; i < this.rhythmCells.length - 1; i++) {
    if (this.rhythmCells[i] != this.rhythmCells[i + 1]) {
      this.toggleCell(i, true);
    }
  }
  if (this.rhythmCells[this.rhythmCells.length - 1] != tempCell) {
    this.toggleCell(this.rhythmCells.length - 1, true);
  }
};

$.RhythmRing.prototype.rotateRhythmCounterClockwiseByOnset = function() {
  var firstOnsetDiff = null;
  for (var i = 1; i < this.rhythmCells.length - 1; i++) {
    if ( this.rhythmCells[i] ) {
      firstOnsetDiff = i;
      break;
    }
  }
  var tempCells = this.rhythmCells.slice(0);
  for (var i = 0; i < this.rhythmCells.length; i++) {
    var thisIndex = i + firstOnsetDiff;
    if (thisIndex >= this.rhythmCells.length ) thisIndex -= this.rhythmCells.length;
    if (this.rhythmCells[i] != tempCells[thisIndex]) {
      this.toggleCell(i, true);
    }
  }
};

$.fn.rhythmRing = function () {
  return this.each(function () {
    new $.RhythmRing(this);
  });
};
