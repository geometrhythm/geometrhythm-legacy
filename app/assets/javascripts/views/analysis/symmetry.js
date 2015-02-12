Geometrhythm.Views.AnalysisSymmetry = Backbone.View.extend({

  template: JST['analysis/symmetry'],

  events: {
    // 'mousedown .symmetry-rhythm-ring' : 'rotateSymmetryRing',
    // 'mouseup' : 'endRotateSymmetryRing',
    'mouseover .symmetry-intercell' : 'showIntercellSymmetries',
    'mouseout .symmetry-intercell' : 'hideIntercellSymmetries',
    'mouseover .symmetry-cell' : 'showCellSymmetries',
    'mouseout .symmetry-cell' : 'hideCellSymmetries',
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
      this.$el.find('.symmetry-rhythm-ring').css('left',
        (window.innerWidth / 8));
      return this;
    }
  },

  // rotateSymmetryRing: function(event) {
  //   console.log("semi-victory");
  //   var that = this;
  //   this.deg = 0;
  //   this.rotatingSymmetryRing = setInterval(function(){
  //     that.deg += 1;
  //     that.deg = that.deg % 360;
  //     $(event.currentTarget).find('.symmetry-cell').css('transform',
  //       'translateX(17px) translateY(-141px) rotate(' + that.deg + 'deg)');
  //     console.log("over and over");
  //   }, 100)
  // },
  //
  // endRotateSymmetryRing: function() {
  //   clearInterval(this.rotatingSymmetryRing);
  // },

  showIntercellSymmetries: function(event) {
    console.log("");
    console.log("what about interonset?" + this.model.get("symmetries_by_interonset"));

    console.log("what about onset?" + this.model.get("symmetries_by_onset"));

    var symmetries = this.model.get("symmetries_by_interonset");
    var ord = parseInt($(event.currentTarget).attr('ord'));
    var len = this.model.get("rhythm_str").length
    console.log("just making sure we got the ord: " + ord);
    var antipode = (ord + (len/2)) % len;
    console.log("and what exactly is our antipode: " + antipode);

    console.log("okay wtf is this test returning? " + symmetries.indexOf(ord));
    if (symmetries.indexOf(ord) != -1 || symmetries.indexOf(antipode) != -1) {
      console.log("FOUND ORD IN THE LIST OF SYMMETRIES");
      var that = this;
      this.model.get("onset_indices").forEach(function(onsetIndex, fnIndex) {
        console.log("gonna maybe light up " + onsetIndex);
        // if (onsetIndex != ord
        //   && onsetIndex != (ord + (len/2)) % len) {
          that.$el.find('.symmetry-cell[ord="' + onsetIndex + '"]')
            .addClass('activated');
        // } else {
        //   console.log("only problem was, it was one of the two guys the line touches");
        // }
      })

    }
    //
    // })

  },

  hideIntercellSymmetries: function(event) {
    this.$el.find('.symmetry-cell').removeClass('activated');
  },

  showCellSymmetries: function(event) {
    var symmetries = this.model.get("symmetries_by_onset");

    console.log("");
    console.log("what about interonset?" + this.model.get("symmetries_by_interonset"));

    console.log("what about onset?" + this.model.get("symmetries_by_onset"));

    var ord = parseInt($(event.currentTarget).attr('ord'));
    var len = this.model.get("rhythm_str").length
    console.log("just making sure we got the ord: " + ord);
    var antipode = (ord + (len/2)) % len;
    console.log("and what exactly is our antipode: " + antipode);

    console.log("okay wtf is this test returning? " + symmetries.indexOf(ord));
    if (symmetries.indexOf(ord) != -1 || symmetries.indexOf(antipode) != -1) {
      console.log("FOUND ORD IN THE LIST OF SYMMETRIES");
      var that = this;
      this.model.get("onset_indices").forEach(function(onsetIndex, fnIndex) {
        console.log("gonna maybe light up " + onsetIndex);
        if (onsetIndex != ord
          && onsetIndex != antipode) {
          that.$el.find('.symmetry-cell[ord="' + onsetIndex + '"]')
            .addClass('activated');
        } else {
          console.log("only problem was, it was one of the two guys the line touches");
        }
      })

    }
  },

  hideCellSymmetries: function(event) {
    this.$el.find('.symmetry-cell').removeClass('activated');
  }
})
