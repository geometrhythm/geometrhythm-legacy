Geometrhythm.Views.Analysis = Backbone.CompositeView.extend({

  template: JST['rhythms/analysis'],

  events: {
    'mouseover .info-icon' : 'showDetailView'
  },

  render: function() {
    if (this.model) {
      var content = this.template({
        rhythm: this.model,
      });

      this.$el.html(content);
      // debugger
      this.renderAnalysisBasicView(this.model);
      this.renderAnalysisIntervalView(this.model);
      this.renderAnalysisMeterView(this.model);
      this.renderAnalysisOnsetView(this.model);
      this.renderAnalysisEvennessView(this.model);
      this.renderAnalysisSymmetryView(this.model);
    } else {
      this.$el.html("");
    }
    return this;
  },

  renderAnalysisBasicView: function(rhythm) {
    var view = new Geometrhythm.Views.AnalysisBasic({
      model: rhythm,
    });

    this.currentAnalysisBasicView && this.currentAnalysisBasicView.remove();
    this.currentAnalysisBasicView = view;
    this.$('#bb-analysis-basic').html(view.render().$el);
  },

  renderAnalysisIntervalView: function(rhythm) {
    var view = new Geometrhythm.Views.AnalysisInterval({
      model: rhythm
    });

    this.currentAnalysisIntervalView && this.currentAnalysisIntervalView.remove();
    this.currentAnalysisIntervalView = view;
    this.$('#bb-analysis-interval').html(view.render().$el);
  },

  renderAnalysisMeterView: function(rhythm) {
    var view = new Geometrhythm.Views.AnalysisMeter({
      model: rhythm
    });

    this.currentAnalysisMeterView && this.currentAnalysisMeterView.remove();
    this.currentAnalysisMeterView = view;
    this.$('#bb-analysis-meter').html(view.render().$el);
  },

  renderAnalysisOnsetView: function(rhythm) {
    var view = new Geometrhythm.Views.AnalysisOnset({
      model: rhythm
    });

    this.currentAnalysisOnsetView && this.currentAnalysisOnsetView.remove();
    this.currentAnalysisOnsetView = view;
    this.$('#bb-analysis-onset').html(view.render().$el);
  },

  renderAnalysisEvennessView: function(rhythm) {
    var view = new Geometrhythm.Views.AnalysisEvenness({
      model: rhythm
    });

    this.currentAnalysisEvennessView && this.currentAnalysisEvennessView.remove();
    this.currentAnalysisEvennessView = view;
    this.$('#bb-analysis-evenness').html(view.render().$el);
  },

  renderAnalysisSymmetryView: function(rhythm) {
    var view = new Geometrhythm.Views.AnalysisSymmetry({
      model: rhythm
    });

    this.currentAnalysisSymmetryView && this.currentAnalysisSymmetryView.remove();
    this.currentAnalysisSymmetryView = view;
    this.$('#bb-analysis-symmetry').html(view.render().$el);
  },

  showDetailView: function(event) {
    console.log("i'm back");
    // if ($(event.currentTarget).attr('detailsViewName') === 'basic') {
    //   // console.log("okay and i can use this");
    //   var template = $(event.currentTarget).attr('detailsViewName')
    // }

    // console.log("okay i can get this to work");
    // var view = "3";
    // console.log($(event.currentTarget).attr('detailsViewName'));
    // debugger
    var template = $(event.currentTarget).attr('detailsViewName');
    var view = new Geometrhythm.Views.AnalysisDetails({
      template: template,
      model: this.model
    })
    this.currentDetailView && this.currentDetailView.remove();
    this.currentDetailView = view;
    this.$('#bb-analysis-details').html(view.render().$el);
  }
})
