Geometrhythm.Views.AnalysisDetails = Backbone.View.extend({

  templateGeneral: JST['analysis_details/generalDetails'],
  templateBasic: JST['analysis_details/basicDetails'],
  templateInterval: JST['analysis_details/intervalDetails'],
  templateMeter: JST['analysis_details/meterDetails'],
  templateOnset: JST['analysis_details/onsetDetails'],
  templateEvenness: JST['analysis_details/evennessDetails'],
  templateSymmetry: JST['analysis_details/symmetryDetails'],

  initialize: function(options) {
    this.template = this[options.template];
  },

  render: function() {
    if (this.model) {
      var content = this.template({
        rhythm: this.model,
      });
      this.$el.html(content);
    } else {
      this.$el.html("");
    }
    return this;
  },

});
