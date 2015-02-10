Geometrhythm.Views.AnalysisBasic = Backbone.CompositeView.extend({

  template: JST['analysis/basic'],

  render: function() {
    if (this.model && this.model.id) {
      var windowWidth = $('#bb-analysis-basic').attr('width');
      var len = this.model.get("len")
      // console.log(len);
      var content = this.template({
        rhythm: this.model,
        windowWidth: windowWidth,
        len: len
      });
      this.$el.html(content);
    } else {
      this.$el.html("");
    }
    return this;
  }
})
