Geometrhythm.Views.AnalysisMeter = Backbone.View.extend({

  template: JST['analysis/meter'],

  events: {
    'mouseover .MH_sq' : 'highlightOnset',
    'mouseout .MH_sq' : 'unHighlightOnset',
    'mouseover .offbeatness' : 'highlightOffbeatness',
    'mouseout .offbeatness' : 'unHighlightOffbeatness',
    'mouseover .strongbeatedness' : 'highlightStrongbeatedness',
    'mouseout .strongbeatedness' : 'unHighlightStrongbeatedness',
    'mouseover .anacrusis' : 'highlightAnacrusis',
    'mouseout .anacrusis' : 'unHighlightAnacrusis',
    'mouseover .closure' : 'highlightClosure',
    'mouseout .closure' : 'unHighlightClosure',
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
      $('body').find(".MH_sq[ord='0']").addClass('columnHovered');
      $('body').find(".cell[ord='0']")
        .css('box-shadow', '0px 0px 10px #ff9800');
      return;
    }
    var that = this;
    var alreadyHighlighted = false;
    this.factors(ord).forEach(function(factor) {
      if (alreadyHighlighted) { return; }
      if (that.model.get("len") % factor === 0) {
        alreadyHighlighted = true;
        for (var i = 0; i < that.model.get("len"); i++) {
          if (i % factor === 0) {
            $('body').find(".MH_sq[ord='" + i + "']").addClass('columnHovered');
            $('body').find(".cell[ord='" + i + "']")
              .css('box-shadow', '0px 0px 10px #ff9800');
          }
        }
      }
    });
  },

  unHighlightOnset: function(event) {
    // var ord = $(event.currentTarget).attr('ord');
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
  },

  highlightOffbeatness: function() {
    $('body').find(".MH_sq[count='1']").addClass('columnHovered');
    // console.log("in herhhrhehreh");
  },

  unHighlightOffbeatness: function() {
    $('body').find(".MH_sq[count='1']").removeClass('columnHovered');
  },

  highlightStrongbeatedness: function() {
    var that = this;
    console.log(this.factors(this.model.get("len")).sort().reverse().slice(0,2));
    this.factors(this.model.get("len")).sort().reverse().slice(0,2)
      .forEach(function(factor) {
        for (var i = 0; i < that.model.get("len"); i++) {
          if (i % factor === 0) {
            $('body').find(".MH_sq[ord='" + i + "']").addClass('columnHovered');
            $('body').find(".cell[ord='" + i + "']")
              .css('box-shadow', '0px 0px 10px #ff9800');
          }
        }
      }
    );
  },

  unHighlightStrongbeatedness: function() {
    $('body').find(".cell")
      .css('box-shadow', '');
    $('body').find(".MH_sq").removeClass('columnHovered');
  },

  highlightAnacrusis: function() {
    $('body').find(".cell[ord='0']")
      .css('box-shadow', '0px 0px 10px #ff9800');
    $('body').find(".MH_sq[ord='0']").addClass('columnHovered');
  },

  unHighlightAnacrusis: function() {
    $('body').find(".cell[ord='0']")
      .css('box-shadow', '');
    $('body').find(".MH_sq[ord='0']").removeClass('columnHovered');
  },

  highlightClosure: function() {

  },

  unHighlightClosure: function() {

  },

})
