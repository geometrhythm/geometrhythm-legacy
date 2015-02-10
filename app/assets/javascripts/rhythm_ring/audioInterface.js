$.RhythmRing.prototype.initializeAudio = function() {
  this.busses = [];
  this.tempo = 125;
  this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
  $('audio').each(function(index) {
    this.busses.push($('audio')[index]);
    // this.busses[index].volume = 0.75;
  }.bind(this));
  this.playPos = -1;
  this.curBus = 0;
  this.paused = true;
};

$.RhythmRing.prototype.changeTempo = function(event) {
  this.tempo = parseInt($(event.currentTarget).val());
  this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
  // clearInterval(this.playingRhythm);
  clearInterval(this.curPlaying);
  // this.playRhythm();
  this.playRhythm2();
}

$.RhythmRing.prototype.togglePlay = function() {
  if (this.paused) {
    this.paused = false;
    // this.playRhythm();
    this.playRhythm2();
    $('#play-pause').addClass("active").html('<i style="font-size: 12px" class="glyphicon glyphicon-pause"></i>&nbsp;Pause');
  } else {
    this.paused = true;
    // clearInterval(this.playingRhythm);
    clearInterval(this.curPlaying);
    $('#play-pause').removeClass("active").html('<i style="font-size: 12px" class="glyphicon glyphicon-play"></i>&nbsp;Play');
  }
}

// $.RhythmRing.prototype.playRhythm = function() {
//   this.playingRhythm = setInterval(function () {
//
//
//     var fill = this.rhythmCells[this.playPos] ? '#333' : 'white';
//     this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
//       .css('background-color', fill);
//     this.$el.find(".cell[ord='" + this.playPos + "']")
//       .css('background-color', fill);
//
//     this.playPos += this.playPos >= this.rhythmCells.length - 1 ? -(this.rhythmCells.length - 1) : 1
//     if (this.playPos === this.rhythmCells.length - 1) {
//       var that = this;
//       var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
//           return rhythm.get("rhythm_str") === that.rhythmAsStr();
//         }
//       );
//       if (dbRhythm) {
//         dbRhythm.set("play_count", dbRhythm.get("play_count") + 1);
//         dbRhythm.save();
//       }
//     }
//
//     var fill = this.rhythmCells[this.playPos] ? 'orange' : 'cornsilk';
//     if (this.playPos === 0 && this.rhythmCells[this.playPos]) fill = 'DodgerBlue';
//     this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
//       .css('background-color', fill);
//     this.$el.find(".cell[ord='" + this.playPos + "']")
//       .css('background-color', fill);
//
//     if (this.rhythmCells[this.playPos]) {
//       this.busses[this.curBus].volume = this.playPos === 0 ? 1 : 0.75
//       this.busses[this.curBus].play();
//       this.curBus += 1;
//       if (this.curBus >= 4) {
//         this.curBus = 0;
//       }
//     }
//   }.bind(this), this.pulseDuration);
// }
//
$.RhythmRing.prototype.manualOverrideRhythm = function(event) {
  // console.log("hey");
  this.initializeRhythm($(event.currentTarget).val());
}


$.RhythmRing.prototype.playRhythm2 = function() {
  this.start = new Date().getTime();
  this.time = 0;
  this.elapsed = '0.0';

  this.playingRhythm2 = function() {
    // console.log("woot");
    this.time += this.pulseDuration;
    this.elapsed = Math.floor(this.time / 100) / 10;
    if(Math.round(this.elapsed) == this.elapsed) { this.elapsed += '.0'; }
    // document.title = this.elapsed;
    var diff = (new Date().getTime() - this.start) - this.time;

    var fill = this.rhythmCells[this.playPos] ? '#333' : 'white';
    this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
      .css('background-color', fill);
    this.$el.find(".cell[ord='" + this.playPos + "']")
      .css('background-color', fill);

    this.playPos += this.playPos >= this.rhythmCells.length - 1 ? -(this.rhythmCells.length - 1) : 1
    if (this.playPos === this.rhythmCells.length - 1) {
      // var that = this;
      // console.log("this as rhythm_str: " + this.rhythmAsStr());
      // console.log(Geometrhythm.Collections.rhythms);
      // var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
      //   console.log(rhythm.get("rhythm_str"));
      //     return rhythm.get("rhythm_str") === that.rhythmAsStr();
      //   }
      // );
      // if (dbRhythm) {
      //   dbRhythm.set("play_count", dbRhythm.get("play_count") + 1);
      //   dbRhythm.save();
      // }
      var that = this;
      $.ajax({
        url: "api/rhythms/match",
        type: "GET",
        data: {
          rhythm_str: $('#current-rhythm').val()
        }, success: function(payload) {
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
      });
    }

    var fill = this.rhythmCells[this.playPos] ? 'orange' : 'cornsilk';
    if (this.playPos === 0 && this.rhythmCells[this.playPos]) fill = 'DodgerBlue';
    this.$el.find(".cell-handle[ord='" + this.playPos + "']:not('.grabbed')")
      .css('background-color', fill);
    this.$el.find(".cell[ord='" + this.playPos + "']")
      .css('background-color', fill);
    if (this.rhythmCells[this.playPos]) {
      $('.TEDAS_sq').css('background-color', '#6da2d1')
      $('body').find(".TEDAS_sq[ord='" + this.playPos + "']")
        .css('background-color', 'DodgerBlue');
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
