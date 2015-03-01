$.RhythmRing.prototype.initializeAudio = function() {
  this.busses = [];
  this.tempo = 125;
  this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
  this.loadAudios();
  this.playPos = -1;
  this.curBus = 0;
  this.paused = true;
  $('body').on('click', '.browse',
    this.stopPlayingBecauseNavigatingAway.bind(this));
};

$.RhythmRing.prototype.loadAudios = function() {
  var fileType = window.safari ? "mp3" : "wav"
  $('audio.audio-' + fileType).each(function(index) {
    this.busses.push($('audio.audio-' + fileType)[index]);
  }.bind(this));
}

$.RhythmRing.prototype.stopPlayingBecauseNavigatingAway = function(event) {
  event.preventDefault();
  this.paused = true;
  clearInterval(this.curPlaying);
  $('#play-pause').removeClass("active")
    .html('<i style="font-size: 12px" class="glyphicon glyphicon-play"></i>&nbsp;Play');
  Backbone.history.navigate("#/rhythms", { trigger: true} );
};

$.RhythmRing.prototype.changeTempo = function(event) {
  this.tempo = parseInt($(event.currentTarget).val());
  this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
  clearInterval(this.curPlaying);
  if (!this.paused) {
    this.playRhythm();
  }
}

$.RhythmRing.prototype.togglePlay = function() {
  if (this.paused) {
    this.paused = false;
    this.playRhythm();
    $('#play-pause').addClass("active")
      .html('<i style="font-size: 12px" class="glyphicon glyphicon-pause"></i>&nbsp;Pause');
  } else {
    this.paused = true;
    clearInterval(this.curPlaying);
    $('#play-pause').removeClass("active")
      .html('<i style="font-size: 12px" class="glyphicon glyphicon-play"></i>&nbsp;Play');
  }
}

$.RhythmRing.prototype.manualOverrideRhythm = function(event) {
  this.initializeRhythm($(event.currentTarget).val());
}

$.RhythmRing.prototype.playRhythm = function() {
  this.start = new Date().getTime();
  this.time = 0;
  this.loopDurationInSec = this.pulseDuration * this.rhythmCells.length / 1000;
  this.updatePlayCount();

  this.playingRhythm = function() {
    this.time += this.pulseDuration;
    var diff = (new Date().getTime() - this.start) - this.time;
    this.deactivatePrevious();
    this.playPos = (this.playPos + 1) % this.rhythmCells.length;
    this.activateNext();
    if (this.rhythmCells[this.playPos]) {
      this.activateOnsets();
      this.playSample();
    }
    this.curPlaying = setTimeout(this.playingRhythm.bind(this),
                                  (this.pulseDuration - diff));
  }.bind(this);
  this.curPlaying = setTimeout(this.playingRhythm.bind(this),
                                (this.pulseDuration));
}

$.RhythmRing.prototype.deactivatePrevious = function () {
  this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
    .removeClass('activated');
  this.$el.find(".cell[ord='" + this.playPos + "']")
    .removeClass('activated');
}

$.RhythmRing.prototype.activateNext = function () {
  this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
    .addClass('activated')
  this.$el.find(".cell[ord='" + this.playPos + "']")
    .addClass('activated')
}

$.RhythmRing.prototype.playSample = function () {
  this.busses[this.curBus].volume = this.playPos === 0 ? 1 : 0.75
  this.busses[this.curBus].play();
  this.curBus += 1;
  if (this.curBus >= 4) {
    this.curBus = 0;
  }
}

$.RhythmRing.prototype.activateOnsets = function () {
  $('.TEDAS_sq').removeClass('activated');
  $('.AIC_sq').removeClass('activated')
  $('body').find(".TEDAS_sq[ord='" + this.playPos + "']")
    .addClass('activated');
  $('body').find(".AIC_sq[ord='" + this.playPos + "']")
    .addClass('activated');
  $('.MH_sq.onset').removeClass('activated');
  $('body').find(".MH_sq.onset[ord='" + this.playPos + "']")
    .addClass('activated');
  $('.symmetry-cell').removeClass('activatedForPlaying');
  $('body').find(".symmetry-cell[ord='" + this.playPos + "']")
    .addClass('activatedForPlaying');
  $('.evenness-point').removeClass('activatedForPlaying');
    $('body').find(".evenness-point[ord='" + this.playPos + "']")
      .addClass('activatedForPlaying');
}

$.RhythmRing.prototype.updatePlayCount = function () {
  $.ajax({
    url: "api/rhythms/match",
    type: "GET",
    data: {
      rhythm_str: $('#current-rhythm').val()
    }, success: function(payload) {
      if (payload) {
        $.ajax({
          url: "api/rhythms/" + payload.id,
          type: "PATCH",
          data: {
            rhythm: {
              play_count: payload.play_count + 1
            }
          }
        });
      }
    }
  });
}
