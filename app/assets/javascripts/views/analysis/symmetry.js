Geometrhythm.Views.AnalysisSymmetry = Backbone.View.extend({

  template: JST['analysis/symmetry'],

  events: {
    'mouseover .symmetry-intercell' : 'showIntercellSymmetries',
    'mouseout .symmetry-intercell' : 'hideIntercellSymmetries',
    'mouseover .symmetry-cell' : 'showCellSymmetries',
    'mouseout .symmetry-cell' : 'hideCellSymmetries',
  },

  render: function() {
    if (this.model) {
      var content = this.template({
        rhythm: this.model,
      });
      this.$el.html(content);
      this.$el.find('.symmetry-rhythm-ring').symmetryRhythmRing(
        this.model.get("symmetries_by_onset"),
        this.model.get("symmetries_by_interonset")
      );
      this.$el.find('.symmetry-rhythm-ring').css('left',
        (window.innerWidth / 8));
    } else {
      this.$el.html("");

    }
    return this;
  },

  showIntercellSymmetries: function(event) {
    var symmetries = this.model.get("symmetries_by_interonset");
    var other_symmetries = this.model.get("symmetries_by_onset");
    var ord = parseInt($(event.currentTarget).attr('ord'));
    var len = this.model.get("rhythm_str").length
    var antipode =  Math.floor((ord + (len/2)) % len);
    if (len % 2 == 0) {
      if (symmetries.indexOf(ord) != -1 || symmetries.indexOf(antipode) != -1) {
        var that = this;
        this.model.get("onset_indices").forEach(function(onsetIndex, fnIndex) {
            that.$el.find('.symmetry-cell[ord="' + onsetIndex + '"]')
              .addClass('activated');
        })

      }
    } else {
      if (symmetries.indexOf(ord) != -1 || other_symmetries.indexOf(antipode) != -1) {
        var that = this;
        this.model.get("onset_indices").forEach(function(onsetIndex, fnIndex) {
          that.$el.find('.symmetry-cell[ord="' + onsetIndex + '"]')
            .addClass('activated');
        })
      }
    }
  },

  hideIntercellSymmetries: function(event) {
    this.$el.find('.symmetry-cell').removeClass('activated');
  },

  showCellSymmetries: function(event) {
    var symmetries = this.model.get("symmetries_by_onset");
    var other_symmetries = this.model.get("symmetries_by_interonset");
    var ord = parseInt($(event.currentTarget).attr('ord'));
    var len = this.model.get("rhythm_str").length
    var antipode = Math.floor((ord + (len/2)) % len);
    if (len % 2 == 0) {
      if (symmetries.indexOf(ord) != -1 || symmetries.indexOf(antipode) != -1) {
        var that = this;
        this.model.get("onset_indices").forEach(function(onsetIndex, fnIndex) {
          if (onsetIndex != ord
            && onsetIndex != antipode) {
            that.$el.find('.symmetry-cell[ord="' + onsetIndex + '"]')
              .addClass('activated');
          } else {
          }
        })
      }
    } else {
      if (symmetries.indexOf(ord) != -1 || other_symmetries.indexOf(antipode) != -1) {
        var that = this;
        this.model.get("onset_indices").forEach(function(onsetIndex, fnIndex) {
          that.$el.find('.symmetry-cell[ord="' + onsetIndex + '"]')
            .addClass('activated');
        })
      }
    }
  },

  hideCellSymmetries: function(event) {
    this.$el.find('.symmetry-cell').removeClass('activated');
  }
})
