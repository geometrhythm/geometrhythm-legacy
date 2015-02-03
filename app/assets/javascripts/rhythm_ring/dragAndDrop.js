$.RhythmRing.prototype.hideCellItself = function(event) {
  this.$el.find(".cell[ord='" + parseInt($(event.currentTarget).attr("ord"))
    + "']").css('opacity', 0);
  $(event.currentTarget).css('opacity', 1);
};

//same as above "insertCellAt", just missing the last line...
$.RhythmRing.prototype.expandForCellAt = function (intercellId) {
  this.yankedId = intercellId + 1;
  this.rhythmCells.splice(intercellId + 1, 0, this.isGrabbedOnset);
  this.updateLaterIds(intercellId);
  this.placeIntercell(intercellId + 1, this.rhythmIntercellAngles[intercellId]);
  this.placeCell(intercellId + 1, this.rhythmIntercellAngles[intercellId],
    true, this.isGrabbedOnset);
};

$.RhythmRing.prototype.recollapse = function (event) {
  if (!this.grabbing || !this.squeezing) return;
  this.squeezing = false;
  if (this.animating) {
    this.markedForCollapseAt = this.yankedId;
  } else {
    this.actionAt("delete", this.yankedId);
  }
};

$.RhythmRing.prototype.yankCellFromRing = function(event) {
  if (!this.grabbing) {
    setTimeout(function() {
      this.grabbing = true;
      var id = parseInt($(event.currentTarget).attr("ord"));
      this.isGrabbedOnset = this.rhythmCells[id];
      this.actionAt("delete", id);
      this.yankedId = id;
      setTimeout(function() {
        this.$el.find(".cell-handle[ord='" + id + "']").addClass("grabbed")
        .css("opacity", 1)
        .draggable("option", "revert", false);
      }.bind(this), 0);
    }.bind(this), 0)
  }
};

$.RhythmRing.prototype.squeezeCellIntoRing = function(event) {
  if (!this.squeezing && this.grabbing) {
    this.squeezing = true;
    setTimeout( function() {
      $(event.target).css("background-color","#3e4b60");
      var id = parseInt($(event.target).attr("ord"));
      this.actionAt("expand", id)
    }.bind(this), 0);
  }
};

$.RhythmRing.prototype.letGoOfCell = function(event) {
  if ($(event.currentTarget).hasClass("grabbed") === true) {
    if (this.squeezing) {
      var curPosition = $(".cell[ord='" + this.yankedId + "']").position();
      var curPos = [curPosition.left, curPosition.top];
      $(event.currentTarget).animate({left: curPos[0], top: curPos[1], opacity: 0}, 100);
    } else {
      $(event.currentTarget).hide("puff");
    }
    this.$el.find(".cell").css('box-shadow', '').css('opacity', 1);
  }
  this.grabbing = false;
  this.squeezing = false;
};
