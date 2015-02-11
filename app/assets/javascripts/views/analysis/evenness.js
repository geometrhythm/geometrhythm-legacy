Geometrhythm.Views.AnalysisEvenness = Backbone.View.extend({

  template: JST['analysis/evenness'],

  initialize: function() {
    this.windowWidth = window.innerWidth/4;
  },

  render: function() {
    if (this.model.id === undefined) {
      this.$el.html("");
      return this;
    } else {
      var content = this.template({
        rhythm: this.model,
        windowWidth: this.windowWidth
      });
      this.$el.html(content);
      debugger
      this.canvas = this.$el.find('#evenness-canvas')
      this.ctx = this.canvas[0].getContext("2d");
      this.ctx.strokeStyle="#eee";
      this.ctx.lineWidth = 1;
      // this.ctx.shadowBlur=20;
      // this.ctx.shadowColor="#ff9800";
      this.ctx.beginPath();
      this.ctx.moveTo(0, 120);
      this.ctx.lineTo(this.windowWidth, 0);
      this.ctx.stroke();
      for (var i = 0; i < this.model.get("len"); i++) {
        this.ctx.beginPath();
        this.ctx.moveTo((i / this.model.get("len")) * this.windowWidth, 0);
        this.ctx.lineTo((i / this.model.get("len")) * this.windowWidth, 120);
        this.ctx.stroke();
      }

      for (var i = 0; i < this.model.get("onset_indices").length; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, (i / this.model.get("onset_indices").length) * 120);
        this.ctx.lineTo(this.windowWidth, (i / this.model.get("onset_indices").length) * 120);
        this.ctx.stroke();
      }


      return this;
    }
  }
})
