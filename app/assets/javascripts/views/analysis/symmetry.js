Geometrhythm.Views.AnalysisSymmetry = Backbone.View.extend({

  template: JST['analysis/symmetry'],

  events: {
    'mousedown .symmetry-rhythm-ring' : 'rotateSymmetryRing',
    'mouseup' : 'endRotateSymmetryRing',
  },

  render: function() {
    if (this.model.id === undefined) {
      this.$el.html("");
      return this;
    } else {
      var content = this.template({
        rhythm: this.model,
      });
      this.$el.html(content);
      this.$el.find('.symmetry-rhythm-ring').symmetryRhythmRing();
      return this;
    }
  },

  rotateSymmetryRing: function(event) {
    console.log("semi-victory");
    var that = this;
    this.deg = 0;
    this.rotatingSymmetryRing = setInterval(function(){
      that.deg += 1;
      that.deg = that.deg % 360;
      $(event.currentTarget).find('.symmetry-cell').css('transform',
        'translateX(17px) translateY(-141px) rotate(' + that.deg + 'deg)');
      console.log("over and over");
    }, 100)
  },

  endRotateSymmetryRing: function() {
    clearInterval(this.rotatingSymmetryRing);
  }
})
