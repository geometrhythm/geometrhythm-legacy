LEFT_CLICK = 1;
RIGHT_CLICK = 3;

$.RhythmRing = function (el, ctx) {
  this.$el = $(el);
  this.ctx = $('#polygon-canvas')[0].getContext("2d");
  this.initializeAudio();
  this.initializeRhythm("x--x--x---x-x---");
  this.initializeEventHandlers();
  this.animating = false;
  this.grabbing = false;

  this.loopApplyUpdates(null,
    this.placeCell.bind(this), this.placeIntercell.bind(this), 0);
  this.refreshHandlesAndLabels();
  this.refreshPolygon();
};

$.RhythmRing.prototype.len = function() {
  return this.rhythmCells.length;
};

$.RhythmRing.prototype.initializeEventHandlers = function() {
  $('body').on('click', '#play-pause', this.togglePlay.bind(this));
  $('body').on('click', '#invert', this.invertRhythm.bind(this));
  $('body').on('change', '#input-tempo', this.changeTempo.bind(this));
  $('body').on('change', '#input-rhythm', this.manualOverrideRhythm.bind(this));

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

$.RhythmRing.prototype.initializeRhythm = function(rhythmText) {
  this.$el.find(':not(.polygon-canvas)').empty();
  this.rhythmCells = [];
  for (var i = 0; i < rhythmText.length; i++) {
    this.rhythmCells.push( rhythmText[i] === "x" ? true : false);
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
      .css('background-color', "black");
    this.$el.find(".cell-handle[ord='" + cellId + "']").addClass("onset");
  }
  this.refreshPolygon();
  if (!dontRefresh) {
    setTimeout(this.refreshHandlesAndLabels.bind(this), 0);
  }
}

$.RhythmRing.prototype.invertRhythm = function() {
  for (var i = 0; i < this.rhythmCells.length; i++) {
    this.toggleCell(i, true);
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
