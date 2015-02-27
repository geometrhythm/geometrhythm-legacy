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

  //needs refactoring
  render: function() {
    var yetUnliked = false;
    if ( _(this.model.get("likers")).pluck("id")
      .indexOf(parseInt($('#cur-user-id')
      .val())) == -1 ) {
      yetUnliked = true;
    }
    var loggedIn = false;
    if ($('#cur-user-id').length > 0) {
      loggedIn = true;
    }
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
    return this;
  },

  togglePlay: function(event) {
    event.stopPropagation();
    if (Geometrhythm.curPlayingRhythm !==
      $(event.currentTarget).attr('rhythm-str')) {
      Geometrhythm.curPlayingRhythm =
        $(event.currentTarget).attr('rhythm-str');
      this.playRhythm();
      $(event.currentTarget).removeClass('glyphicon-play')
        .addClass('glyphicon-pause');
    } else {
      Geometrhythm.curPlayingRhythm = null;
      clearInterval(Geometrhythm.playingRhythm);
      $(event.currentTarget).removeClass('glyphicon-pause')
        .addClass('glyphicon-play');
    }
  },

  //old version of function; needs to be updated with version used on front page
  playRhythm: function() {
    Geometrhythm.playingRhythm = setInterval(function () {
      if (Geometrhythm.curPlayingRhythm === this.rhythmStr) {
        var fill = this.rhythmCells[this.playPos] ? '#456B87' : 'white';
        this.$el.find(".mini-cell[ord='" + this.playPos + "']")
          .css('background-color', fill);
        this.$el.find(".med-cell[ord='" + this.playPos + "']")
          .css('background-color', fill);
        if (this.playPos >= this.rhythmCells.length - 1) {
          this.playPos += -(this.rhythmCells.length - 1)
        } else {
          this.playPos += 1
        }
        var fill = this.rhythmCells[this.playPos] ? '#f60' : 'rgb(235,198,143)';
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
        clearInterval(Geometrhythm.playingRhythm);
        this.$el.find('i').removeClass('glyphicon-pause')
          .addClass('glyphicon-play');
      }

    }.bind(this), this.pulseDuration);
  },

  likeIt: function(event) {
    event.stopPropagation();
    var that = this;
    new Geometrhythm.Models.Like().save( { rhythm_id: this.model.id } );
  },

});
