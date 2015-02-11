Geometrhythm.Views.AnalysisDetails = Backbone.View.extend({

  templateBasic: JST['analysis_details/basicDetails'],
  // templateShowAnothers: JST['info/show_anothers'],
  // templateShowLoggedOut: JST['info/show_logged_out'],
  // templateClaim: JST['info/claim'],
  // templateSignUpToClaim: JST['info/sign_up_to_claim'],
  // templateSplash: JST['info/splash'],
  //
  // template: JST['analysis_details/basic'],
  initialize: function(options) {
    this.template = this[options.template];
    debugger
  },

  render: function() {
    console.log("woot wot made it");
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
