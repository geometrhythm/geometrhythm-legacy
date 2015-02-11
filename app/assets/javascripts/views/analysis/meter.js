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
      var widthPercentageUnit = 85 / len; //85 so it doesn't take up the whole thing


      var content = this.template({
        rhythm: this.model,
        // windowWidth: windowWidth,
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
    // console.log("me me me");
    // console.log($(event.currentTarget).attr('ord'));
    var ord = $(event.currentTarget).attr('ord');
    $('body').find(".cell[ord='" + ord + "']")
      .css('box-shadow', '0px 0px 10px #ff9800');
      console.log(this.$el);
      // debugger

    $('body').find(".MH_sq[ord='" + ord + "']").addClass('columnHovered')
    //  debugger
  },

  unHighlightOnset: function(event) {
    var ord = $(event.currentTarget).attr('ord');
    $('body').find(".cell[ord='" + ord + "']")
      .css('box-shadow', '');
       $('body').find(".MH_sq[ord='" + ord + "']").removeClass('columnHovered');
  }

})
