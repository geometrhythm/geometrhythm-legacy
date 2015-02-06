$.RhythmRing.prototype.initializeAudio = function() {
  this.busses = [];
  this.tempo = 125;
  this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
  $('audio').each(function(index) {
    this.busses.push($('audio')[index]);
  }.bind(this));
  this.playPos = -1;
  this.curBus = 0;
  this.paused = true;
};

$.RhythmRing.prototype.changeTempo = function(event) {
  this.tempo = parseInt($(event.currentTarget).val());
  this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
  clearInterval(this.playingRhythm);
  this.playRhythm();
}

$.RhythmRing.prototype.togglePlay = function() {
  if (this.paused) {
    this.paused = false;
    this.playRhythm();
    $('#play-pause').addClass("active").html('Pause');
  } else {
    this.paused = true;
    clearInterval(this.playingRhythm);
    $('#play-pause').removeClass("active").html('Play');
  }
}

$.RhythmRing.prototype.playRhythm = function() {
  this.playingRhythm = setInterval(function () {
    var fill = this.rhythmCells[this.playPos] ? '#333' : 'white';
    this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
      .css('background-color', fill);
    this.$el.find(".cell[ord='" + this.playPos + "']")
      .css('background-color', fill);

    this.playPos += this.playPos >= this.rhythmCells.length - 1 ? -(this.rhythmCells.length - 1) : 1
    if (this.playPos === this.rhythmCells.length - 1) {
      var that = this;
      var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
          return rhythm.get("rhythm_str") === that.rhythmAsStr();
        }
      );
      if (dbRhythm) {
        dbRhythm.set("play_count", dbRhythm.get("play_count") + 1);
        dbRhythm.save();
      }
    }

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
  }.bind(this), this.pulseDuration);
}

$.RhythmRing.prototype.manualOverrideRhythm = function(event) {
  console.log("hey");
  this.initializeRhythm($(event.currentTarget).val());
}
