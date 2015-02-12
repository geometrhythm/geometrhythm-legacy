Geometrhythm.Views.Analysis = Backbone.CompositeView.extend({

  template: JST['rhythms/analysis'],

  events: {
    'mouseover .bb-analysis' : 'showDetailView',
    'click .details-link' : 'toggleDetails'
  },

  render: function() {
    if (this.model) {
      var content = this.template({
        rhythm: this.model,
      });

      this.$el.html(content);
      this.renderAnalysisBasicView(this.model);
      this.renderAnalysisIntervalView(this.model);
      this.renderAnalysisMeterView(this.model);
      this.renderAnalysisOnsetView(this.model);
      this.renderAnalysisEvennessView(this.model);
      this.renderAnalysisSymmetryView(this.model);
      //this.showDetailView();
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
    if (event && $(event.currentTarget).data('detailsviewname')) {
      var template = $(event.currentTarget).data('detailsviewname');
    } else if (event && $(event.currentTarget).data('associatedtemplate')) {
      var template = $(event.currentTarget).data('associatedtemplate');
    } else {
      var template = 'templateGeneral'
    }
    var view = new Geometrhythm.Views.AnalysisDetails({
      template: template,
      model: this.model
    })
    this.currentDetailView && this.currentDetailView.remove();
    this.currentDetailView = view;
    this.$('#bb-analysis-details').html(view.render().$el);
  },

  toggleDetails: function(event) {
    if (window[$(event.currentTarget).data('detailsname')]) {
      window[$(event.currentTarget).data('detailsname')] = false;
    } else {
      window[$(event.currentTarget).data('detailsname')] = true;
    }
    this.showDetailView(event);
  }
})
