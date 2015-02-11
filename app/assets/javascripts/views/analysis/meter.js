Geometrhythm.Views.AnalysisMeter = Backbone.View.extend({

  template: JST['analysis/meter'],

  events: {
    'mouseover .MH_sq' : 'highlightOnset',
    'mouseout .MH_sq' : 'unHighlightOnset'
  },

  render: function() {
    if (this.model) {
      var len = this.model.get("len");
      var max_height = Math.max.apply(null, this.model.get("metric_hierarchy"))
      var heightPixelsUnit = 120 / max_height;
      var widthPercentageUnit = 85 / len;
      var content = this.template({
        rhythm: this.model,
        widthPercentageUnit: widthPercentageUnit,
        heightPixelsUnit: heightPixelsUnit,
        len: len,
        max_height: max_height
      });
      this.$el.html(content)
    } else {
      this.$el.html("");
    }
    return this;
  },

  highlightOnset: function(event) {
    var ord = $(event.currentTarget).attr('ord');
    if (ord === '0') {
      console.log("heyo");
      $('body').find(".MH_sq[ord='0']").addClass('columnHovered');
      $('body').find(".cell[ord='0']")
        .css('box-shadow', '0px 0px 10px #ff9800');
      return;
    }
    var that = this;
    var alreadyHighlighted = false;
    this.factors(ord).forEach(function(factor) {
      if (alreadyHighlighted) { return; }
      console.log("trying a factor: " + factor);
      if (that.model.get("len") % factor === 0) {
        alreadyHighlighted = true;
        console.log("this is a factor of len, so now going to highlight some guys");
        for (var i = 0; i < that.model.get("len"); i++) {
          console.log("trying " + i);
          if (i % factor === 0) {
            console.log("and " + factor + " is a factor of " + i + " so we're highlighting " + i);
            $('body').find(".MH_sq[ord='" + i + "']").addClass('columnHovered');
            $('body').find(".cell[ord='" + i + "']")
              .css('box-shadow', '0px 0px 10px #ff9800');
          }
        }
      }
    });
  },

  unHighlightOnset: function(event) {
    var ord = $(event.currentTarget).attr('ord');
    $('body').find(".cell")
      .css('box-shadow', '');
    $('body').find(".MH_sq").removeClass('columnHovered');
  },

  factors: function(n) {
    var output = [];
    for (var i = n; i > 1; i--) {
      if (n % i == 0) {
        output.push(i);
      }
    }

    return output;
  }

})
