Geometrhythm.Views.Analysis = Backbone.CompositeView.extend({

  template: JST['rhythms/analysis'],

  events: {
    // 'mouseover .bb-analysis' : 'showDetailView',
    'mouseover .analysis-title' : 'showDetailView',
    'click .details-link' : 'toggleDetails',
    'mouseover .tallness' : 'highlightTallness',
    'mouseout .tallness' : 'unHighlightTallness',
    'mouseover .contour-text' : 'highlightContour',
    'mouseout .contour-text' : 'unHighlightContour',
    'mouseover .flatness' : 'highlightFlatness',
    'mouseout .flatness' : 'unHighlightFlatness',
  },

  initialize: function() {
    this.canvas = $('body').find('#polygon-analysis-canvas')
    this.ctx = this.canvas[0].getContext("2d");
    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth = 3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";
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
      this.showDetailView();
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
  },

  highlightTallness: function() {
    $('.FIC_box').find('.FIC_sq[count="' + this.model.get("tallness") + '"]')
      .addClass("columnHovered");

    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";

    $(this.canvas).css('display','inline')
    var ord = this.model.get("tallness");
    var linesToDraw = this.model.get("full_intervals_onset_pairs")[ord];
    $('body').find(".FIC_sq[ord='" + ord + "']").addClass('columnHovered');
    this.ctx.clearRect(0,0,400,400);
    var that = this;
    linesToDraw.forEach( function(lineToDraw) {
      var posParse1 = $('body').find(".cell[ord='" + lineToDraw[0] + "']").position();
      var pos1 = [posParse1.left, posParse1.top];
      var posParse2 = $('body').find(".cell[ord='" + lineToDraw[1] + "']").position();
      var pos2 = [posParse2.left, posParse2.top];
      that.ctx.beginPath();
      that.ctx.moveTo(pos1[0] + 13, pos1[1] + 13);
      that.ctx.lineTo(pos2[0] + 13, pos2[1] + 13);
      that.ctx.stroke();
    })
  },

  unHighlightTallness: function() {
    // var maxCount = Math.max.apply(this.model.get("full_interval_content")
    $('.FIC_box').find('.FIC_sq').removeClass("columnHovered");
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  },

  highlightContour: function() {
    $('.contour').addClass('activated');
  },

  highlightContour: function() {
    $('.contour').removeClass('activated');
  },

  highlightFlatness: function() {

  },

  unHighlightFlatness: function() {
    
  }
})
