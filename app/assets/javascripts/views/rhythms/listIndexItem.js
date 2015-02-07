Geometrhythm.Views.RhythmListItemView = Backbone.CompositeView.extend({

  template: JST['rhythms/listIndexItem'],

  events: {
    "click .rhythm i" : "togglePlay",
    "click .key-rhythm i" : "togglePlay",
    "click .rhythm button" : "likeIt",
    "click .key-rhythm button" : "likeIt",
  },

  initialize: function(options) {
    this.superSizeMe = options.superSizeMe;
    // debugger
    this.busses = [];
    this.tempo = 125;
    this.pulseDuration = ( 1000 / ( this.tempo / 60 ) ) / 4;
    $('audio').each(function(index) {
      this.busses.push($('audio')[index]);
    }.bind(this));
    this.playPos = -1;
    this.curBus = 0;
    Geometrhythm.curPlayingRhythm = null;
  },

  render: function() {
    var yetUnliked = false;
    if ( _(this.model.get("likers")).pluck("id").indexOf(parseInt($('#cur-user-id').val())) == -1 ) {
      yetUnliked = true;
    }
    var loggedIn = false;
    if ($('#cur-user-id').length > 0) {
      loggedIn = true;
    }
    // debugger
    // console.log(loggedIn);
    var content = this.template({
      rhythm: this.model,
      yetUnliked: yetUnliked,
      loggedIn: loggedIn,
      superSizeMe: this.superSizeMe
    })
    this.$el.html(content);
    if (this.superSizeMe) {
      this.rhythmStr = this.$el.find('.key-rhythm').attr('rhythm-str');
    } else {
      this.rhythmStr = this.$el.find('.rhythm').attr('rhythm-str');
    }
    this.rhythmCells = [];
    for (var i = 0; i < this.rhythmStr.length; i++) {
      this.rhythmCells.push( this.rhythmStr[i] === "x" ? true : false);
    }
    // debugger
    return this;
  },

  togglePlay: function(event) {
    event.stopPropagation();
    //console.log("hehe it worked");
    if (Geometrhythm.curPlayingRhythm !== $(event.currentTarget).attr('rhythm-str')) { //(Geometrhythm.curPlayingRhythm = null)
      Geometrhythm.curPlayingRhythm = $(event.currentTarget).attr('rhythm-str');
      this.playRhythm();
      // debugger
      $(event.currentTarget).removeClass('glyphicon-play').addClass('glyphicon-pause');
      //  $('#play-pause').addClass("active").html('Pause');
    } else { //if (Geometrhythm.curPlayingRhythm === $(event.currentTarget).attr('rhythm-str'))
      Geometrhythm.curPlayingRhythm = null;
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
      if (Geometrhythm.curPlayingRhythm === this.rhythmStr) {
        var fill = this.rhythmCells[this.playPos] ? '#333' : 'white';

        this.$el.find(".mini-cell[ord='" + this.playPos + "']")
          .css('background-color', fill);
        this.$el.find(".med-cell[ord='" + this.playPos + "']")
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
        this.$el.find(".med-cell[ord='" + this.playPos + "']")
            .css('background-color', fill);

        if (this.rhythmCells[this.playPos]) {
          this.busses[this.curBus].play();
          this.curBus += 1;
          if (this.curBus >= 4) {
            this.curBus = 0;
          }
        }
      } else {
        // console.log("wow ok you can turn yourself off");
        clearInterval(this.playingRhythm);
        this.$el.find('i').removeClass('glyphicon-pause').addClass('glyphicon-play');
      }
      // debugger

    }.bind(this), this.pulseDuration);
  },

  likeIt: function(event) {
    // var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
    //     return rhythm.get("rhythm_str") === $('#current-rhythm').val();
    //   }
    // );
    // if (dbRhythm) {
    //   $('#cur-rhythm-id').attr('value', dbRhythm.id);
    // } else {
    //   $('#cur-rhythm-id').attr('value', '');
    // }
    event.stopPropagation();
    var that = this;
    new Geometrhythm.Models.Like().save({rhythm_id: this.model.id});
  },

});
