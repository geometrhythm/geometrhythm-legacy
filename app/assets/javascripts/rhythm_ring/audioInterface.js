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
  $('body').on('click', 'a.browse', this.stopPlayingBecauseNavigatingAway.bind(this));
};

$.RhythmRing.prototype.stopPlayingBecauseNavigatingAway = function() {
  this.paused = true;
  clearInterval(this.curPlaying);
  $('#play-pause').removeClass("active").html('<i style="font-size: 12px" class="glyphicon glyphicon-play"></i>&nbsp;Play');
  Backbone.history.navigate("#/rhythms", { trigger: true} );
};

$.RhythmRing.prototype.changeTempo = function(event) {
  this.tempo = parseInt($(event.currentTarget).val());
  this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
  clearInterval(this.curPlaying);
  if (!this.paused) {
    this.playRhythm2();
  }
}

$.RhythmRing.prototype.togglePlay = function() {
  if (this.paused) {
    this.paused = false;
    this.playRhythm2();
    $('#play-pause').addClass("active").html('<i style="font-size: 12px" class="glyphicon glyphicon-pause"></i>&nbsp;Pause');
  } else {
    this.paused = true;
    clearInterval(this.curPlaying);
    $('#play-pause').removeClass("active").html('<i style="font-size: 12px" class="glyphicon glyphicon-play"></i>&nbsp;Play');
  }
}

$.RhythmRing.prototype.manualOverrideRhythm = function(event) {
  this.initializeRhythm($(event.currentTarget).val());
}

$.RhythmRing.prototype.playRhythm2 = function() {
  this.start = new Date().getTime();
  this.time = 0;
  this.loopDurationInSec = this.pulseDuration * this.rhythmCells.length / 1000;

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

  this.playingRhythm2 = function() {
    this.time += this.pulseDuration;
    var diff = (new Date().getTime() - this.start) - this.time;

    // if (this.playPos === 0) {
    //   var that = this;
    //   $('#bb-analysis-evenness').append("<div class='playcursor'>");
    //   $('.playcursor').css('transform', 'transition: transform 3s;');
    //   $('.playcursor').css('transform', 'left: 0px; top: 0px;');
    //   // ' + that.loopDurationInSec + '
    //   setTimeout(function(){
    //     console.log("lunbox");
    //     $('.playcursor').css('transform', 'left: 400px; top: -200px; transition: transform 3s;')
    //   }, 5)
    // }

    this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
      .removeClass('activated')
    this.$el.find(".cell[ord='" + this.playPos + "']")
      .removeClass('activated')

    this.playPos = (this.playPos + 1) % this.rhythmCells.length;

    this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
      .addClass('activated')
    this.$el.find(".cell[ord='" + this.playPos + "']")
      .addClass('activated')

    if (this.rhythmCells[this.playPos]) {
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
      // if ($('body').find(".TEDAS_sq[ord='" + this.playPos + "']")) {
      //   $('body').find(".AIC_sq[ord='" +
      //   $('body').find(".TEDAS_sq[ord='" + this.playPos + "']").attr('dur')
      //     + "']").addClass('activated')
      // }

      // $('body').find(".FIC_sq[ord='" + this.playPos + "']")
        // .addClass('activated')
    }

    if (this.rhythmCells[this.playPos]) {
      this.busses[this.curBus].volume = this.playPos === 0 ? 1 : 0.75
      this.busses[this.curBus].play();
      this.curBus += 1;
      if (this.curBus >= 4) {
        this.curBus = 0;
      }
    }

    this.curPlaying = setTimeout(this.playingRhythm2.bind(this), (this.pulseDuration - diff));
  }.bind(this);

  this.curPlaying = setTimeout(this.playingRhythm2.bind(this), (this.pulseDuration));
}
