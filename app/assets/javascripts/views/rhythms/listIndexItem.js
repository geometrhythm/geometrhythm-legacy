Geometrhythm.Views.RhythmListItemView = Backbone.CompositeView.extend({

  template: JST['rhythms/listIndexItem'],

  events: {
    "click .rhythm i" : "togglePlay",
  },

  initialize: function() {
    this.busses = [];
    this.tempo = 125;
    this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
    $('audio').each(function(index) {
      this.busses.push($('audio')[index]);
    }.bind(this));
    this.playPos = -1;
    this.curBus = 0;
    window.curPlayingRhythm = null;
  },

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    this.rhythmStr = this.$el.find('.rhythm').attr('rhythm-str');
    this.rhythmCells = [];
    for (var i = 0; i < this.rhythmStr.length; i++) {
      this.rhythmCells.push( this.rhythmStr[i] === "x" ? true : false);
    }
    return this;
  },

  togglePlay: function(event) {
    event.stopPropagation();
    //console.log("hehe it worked");
    if (window.curPlayingRhythm !== $(event.currentTarget).attr('rhythm-str')) { //(window.curPlayingRhythm = null)
      window.curPlayingRhythm = $(event.currentTarget).attr('rhythm-str');
      this.playRhythm();
      // debugger
      $(event.currentTarget).removeClass('glyphicon-play').addClass('glyphicon-pause');
      //  $('#play-pause').addClass("active").html('Pause');
    } else { //if (window.curPlayingRhythm === $(event.currentTarget).attr('rhythm-str'))
      window.curPlayingRhythm = null;
      clearInterval(this.playingRhythm);
      $(event.currentTarget).removeClass('glyphicon-pause').addClass('glyphicon-play');
      //  $('#play-pause').removeClass("active").html('Play');
    }
    // else {
    //
    // }
  },

  playRhythm: function() {
    this.playingRhythm = setInterval(function () {
      if (window.curPlayingRhythm === this.rhythmStr) {
        var fill = this.rhythmCells[this.playPos] ? 'black' : 'white';

        this.$el.find(".mini-cell[ord='" + this.playPos + "']")
          .css('background-color', fill);

        this.playPos += this.playPos >= this.rhythmCells.length - 1 ? -(this.rhythmCells.length - 1) : 1
        // if (this.playPos === this.rhythmCells.length - 1) {
        //   var that = this;
        //   var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        //       return rhythm.get("rhythm_str") === that.rhythmAsStr();
        //     }
        //   );
        //   if (dbRhythm) {
        //     dbRhythm.set("play_count", dbRhythm.get("play_count") + 1);
        //     dbRhythm.save();
        //   }
        // }

        var fill = this.rhythmCells[this.playPos] ? 'orange' : 'cornsilk';

        this.$el.find(".mini-cell[ord='" + this.playPos + "']")
          .css('background-color', fill);

        if (this.rhythmCells[this.playPos]) {
          this.busses[this.curBus].play();
          this.curBus += 1;
          if (this.curBus >= 4) {
            this.curBus = 0;
          }
        }
      } else {
        console.log("wow ok you can turn yourself off");
        clearInterval(this.playingRhythm);
        this.$el.find('i').removeClass('glyphicon-pause').addClass('glyphicon-play');
      }
      // debugger

    }.bind(this), this.pulseDuration);
  }

});
