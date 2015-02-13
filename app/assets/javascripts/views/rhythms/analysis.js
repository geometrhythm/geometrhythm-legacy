Geometrhythm.Views.Analysis = Backbone.CompositeView.extend({

  template: JST['rhythms/analysis'],

  events: {
    // 'mouseover .bb-analysis' : 'showDetailView',
    'mouseover .analysis-title' : 'showDetailView',
    'click .details-link' : 'toggleDetails',

    //TEDAS listeners
    'mouseover .contour-text' : 'highlightContour',
    'mouseout .contour-text' : 'unHighlightContour',
    'mouseover .aI' : 'highlightAdjacentInterval',
    'mouseout .aI' : 'unHighlightAdjacentInterval',
    'mouseover .durational-pattern-words' : 'highlightEntireTEDAS',
    'mouseout .durational-pattern-words' : 'unHighlightEntireTEDAS',
    'mouseover .box-notation-words' : 'highlightEntireTEDAS',
    'mouseout .box-notation-words' : 'unHighlightEntireTEDAS',
    'mouseover .bN' : 'highlightBoxNotation',
    'mouseout .bN' : 'unHighlightBoxNotation',

    //FIC listeners
    'mouseover .tallness' : 'highlightTallness',
    'mouseout .tallness' : 'unHighlightTallness',
    'mouseover .flatness' : 'highlightFlatness',
    'mouseout .flatness' : 'unHighlightFlatness',
    'mouseover .distinct-durations' : 'highlightDistinctDurations',
    'mouseout .distinct-durations' : 'unHighlightDistinctDurations',
    'mouseover .full-histogram' : 'highlightFullHistogram',
    'mouseout .full-histogram' : 'unHighlightFullHistogram',
    'mouseover .has-intervals' : 'highlightHasIntervals',
    'mouseout .has-intervals' : 'unHighlightHasIntervals',
    'mouseover .deepness' : 'highlightDeepness',
    'mouseout .deepness' : 'unHighlightDeepness',
    'mouseover .fH' : 'highlightFullHistogramColumn',
    'mouseout .fH' : 'unHighlightFullHistogramColumn',

    //Evenness listeners
    'mouseover .npvi' : 'highlightNPVI',
    'mouseout .npvi' : 'unHighlightNPVI',

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
      .addClass("semiHovered");

    this.ctx.strokeStyle="#5DA2D6";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#5DA2D6";

    $(this.canvas).css('display','inline')
    var ord = $('.FIC_box').find('.FIC_sq[count="' + this.model.get("tallness") + '"]').attr('ord');
    var linesToDraw = this.model.get("full_intervals_onset_pairs")[ord];
    // $('body').find(".FIC_sq[ord='" + ord + "']").addClass('columnHovered');
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
    $('.FIC_box').find('.FIC_sq').removeClass("semiHovered");
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  },

  highlightContour: function() {
    $('.contour').addClass('activated');
  },

  unHighlightContour: function() {
    $('.contour').removeClass('activated');
  },

  highlightFlatness: function() {
    if (this.model.get("flat?")) {
      $('.FIC_box').find('.top-shelf').addClass('columnHovered');
    } else {
      $('.FIC_box').find('.top-shelf').addClass('semiHovered');
    }
  },

  unHighlightFlatness: function() {
    $('.FIC_box').find('.top-shelf').removeClass('columnHovered').removeClass('semiHovered');
  },

  highlightDistinctDurations: function() {
    $('.FIC_box').find('.FIC_sq[v_ord="0"]').addClass('semiHovered');
  },

  unHighlightDistinctDurations: function() {
    $('.FIC_box').find('.FIC_sq[v_ord="0"]').removeClass('semiHovered');
  },

  highlightFullHistogram: function() {
    $('.FIC_sq').addClass('semiHovered');
  },

  unHighlightFullHistogram: function() {
    $('.FIC_sq').removeClass('semiHovered');
  },

  highlightHasIntervals: function() {
    if (this.model.get("has_all_intervals?")) {
      $('.FIC_box').find('.FIC_sq[v_ord="0"]').addClass('columnHovered');
    } else {
      $('.FIC_sq_secret').css('visibility','visible');
    }
  },

  unHighlightHasIntervals: function() {
    if (this.model.get("has_all_intervals?")) {
      $('.FIC_box').find('.FIC_sq[v_ord="0"]').removeClass('columnHovered');
    } else {
      $('.FIC_sq_secret').css('visibility','hidden');
    }
  },

  highlightDeepness: function() {
    if (this.model.get("deep?")) {
      $('.FIC_box').find('.top-shelf').addClass('columnHovered');
    } else {
      $('.FIC_box').find('.top-shelf').addClass('semiHovered');
    }
  },

  unHighlightDeepness: function() {
    $('.FIC_box').find('.top-shelf').removeClass('semiHovered').removeClass('columnHovered');
  },

  highlightAdjacentInterval: function(event) {
    $('.TEDAS_box').find('.TEDAS_sq[idx="' +
      parseInt($(event.currentTarget).attr('ord')) + '"]')
      .addClass('activatedHoverStyle');
    $('.durational-pattern-words').addClass('activated');

    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";

    $(this.canvas).css('display','inline');
    var ord = $('.TEDAS_box').find('.TEDAS_sq[idx="' +
      parseInt($(event.currentTarget).attr('ord')) + '"]').attr('ord');
    var dur = $('.TEDAS_box').find('.TEDAS_sq[idx="' +
      parseInt($(event.currentTarget).attr('ord')) + '"]').attr('dur');
    this.ctx.clearRect(0,0,400,400);
    var posParse1 = $('body').find(".cell[ord='" + ord + "']").position();
    var pos1 = [posParse1.left, posParse1.top];
    var posParse2 = $('body').find(".cell[ord='" + ((ord + dur) % $('#current-rhythm').val().length) + "']").position();
    var pos2 = [posParse2.left, posParse2.top];
    this.ctx.beginPath();
    this.ctx.moveTo(pos1[0] + 13, pos1[1] + 13);
    this.ctx.lineTo(pos2[0] + 13, pos2[1] + 13);
    this.ctx.stroke();
  },

  unHighlightAdjacentInterval: function(event) {
    $('.TEDAS_box').find('.TEDAS_sq[idx="'
      + parseInt($(event.currentTarget).attr('ord')) + '"]')
      .removeClass('activatedHoverStyle');
    $('.durational-pattern-words').removeClass('activated');
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  },

  highlightEntireTEDAS: function() {
    $('.TEDAS_sq').addClass('activatedHoverStyle');
  },

  unHighlightEntireTEDAS: function() {
    $('.TEDAS_sq').removeClass('activatedHoverStyle');
  },

  highlightBoxNotation: function(event) {
    var ord = parseInt($(event.currentTarget).attr('ord'));
    if (this.model.get("rhythm_str")[ord] === 'x') {
      $('.TEDAS_box').find('.TEDAS_sq[ord="' + parseInt($(event.currentTarget).attr('ord')) + '"]').addClass('activatedHoverStyle');
    }
    $('.box-notation-words').addClass('activated');
  },

  unHighlightBoxNotation: function(event) {
    $('.TEDAS_sq').removeClass('activatedHoverStyle');
    $('.box-notation-words').removeClass('activated');
  },

  highlightNPVI: function() {
    console.log("welcoem grh");
    this.windowWidth = window.innerWidth/4;
    // if (this.model.id === undefined) {
    //   this.$el.html("");
    //   return this;
    // } else {
      // var content = this.template({
      //   rhythm: this.model,
      //   windowWidth: this.windowWidth
      // });
      // this.$el.html(content);
    this.canvas2 = $('body').find('#evenness-canvas');
    // debugger
    this.$el = $('#bb-analysis-evenness div');
    this.ctx2 = this.canvas2[0].getContext("2d");
    this.ctx2.strokeStyle="#eee";
    this.ctx2.lineWidth = 1;

    //line of evenness
    this.ctx2.beginPath();
    this.ctx2.moveTo(0, 120);
    this.ctx2.lineTo(this.windowWidth, 0);
    this.ctx2.stroke();

    //columns
    for (var i = 0; i < this.model.get("len"); i++) {
      this.ctx2.beginPath();
      this.ctx2.moveTo((i / this.model.get("len")) * this.windowWidth, 0);
      this.ctx2.lineTo((i / this.model.get("len")) * this.windowWidth, 120);
      this.ctx2.stroke();
    }

    //rows
    for (var i = 0; i < this.model.get("onset_indices").length; i++) {
      this.ctx2.beginPath();
      this.ctx2.moveTo(0, (i / this.model.get("onset_indices").length) * 120.0);
      this.ctx2.lineTo(this.windowWidth, (i / this.model.get("onset_indices").length) * 120.0);
      this.ctx2.stroke();
    }

    //onset points
    for (var i = 0; i < this.model.get("onset_indices").length; i++) {
      var $newPoint = $('<span class="evenness-point">&#149;</span>');
      $newPoint.css('left', (this.windowWidth / 25) + ((this.model.get("onset_indices")[i] / this.model.get("len")) * this.windowWidth))
        .css('top', 150.0 - ((i) * (120.0 / this.model.get("onset_indices").length)))
      $newPoint.attr('ord', this.model.get("onset_indices")[i]);
      this.$el.append($newPoint);

    }

    // area of nPVI
    var curPosLeft = 0;
    var curPosTop = 120;

    this.ctx2.beginPath();
    this.ctx2.moveTo(curPosLeft, curPosTop);
    for (var i = 0; i <= this.model.get("onset_indices").length; i++) {
      // this.ctx2.beginPath()
      if (i === this.model.get("onset_indices").length) {
        var nextPosLeft = this.windowWidth;
        var nextPosTop = 0;
      } else {
        var nextPosLeft = ((this.model.get("onset_indices")[i] / this.model.get("len")) * this.windowWidth);
        var nextPosTop = 120.0 - (i * (120.0 / this.model.get("onset_indices").length));
      }
      this.ctx2.lineTo(nextPosLeft, nextPosTop)

      var curPosLeft = nextPosLeft;
      var curPosTop = nextPosTop;

    }
    this.ctx2.closePath();
    this.ctx2.lineWidth = 1;
    this.ctx2.fillStyle="#ff9800";
    this.ctx2.fill();
    this.ctx2.strokeStyle = '#eee';
    this.ctx2.stroke();

    // return this;

  },

  unHighlightNPVI: function() {
    console.log("welcoem grh");
    this.windowWidth = window.innerWidth/4;
    // if (this.model.id === undefined) {
    //   this.$el.html("");
    //   return this;
    // } else {
      // var content = this.template({
      //   rhythm: this.model,
      //   windowWidth: this.windowWidth
      // });
      // this.$el.html(content);
    this.canvas2 = $('body').find('#evenness-canvas');
    // debugger
    this.$el = $('#bb-analysis-evenness div');
    this.ctx2 = this.canvas2[0].getContext("2d");
    this.ctx2.strokeStyle="#eee";
    this.ctx2.lineWidth = 1;

    //line of evenness
    this.ctx2.beginPath();
    this.ctx2.moveTo(0, 120);
    this.ctx2.lineTo(this.windowWidth, 0);
    this.ctx2.stroke();

    //columns
    for (var i = 0; i < this.model.get("len"); i++) {
      this.ctx2.beginPath();
      this.ctx2.moveTo((i / this.model.get("len")) * this.windowWidth, 0);
      this.ctx2.lineTo((i / this.model.get("len")) * this.windowWidth, 120);
      this.ctx2.stroke();
    }

    //rows
    for (var i = 0; i < this.model.get("onset_indices").length; i++) {
      this.ctx2.beginPath();
      this.ctx2.moveTo(0, (i / this.model.get("onset_indices").length) * 120.0);
      this.ctx2.lineTo(this.windowWidth, (i / this.model.get("onset_indices").length) * 120.0);
      this.ctx2.stroke();
    }

    //onset points
    for (var i = 0; i < this.model.get("onset_indices").length; i++) {
      var $newPoint = $('<span class="evenness-point">&#149;</span>');
      $newPoint.css('left', (this.windowWidth / 25) + ((this.model.get("onset_indices")[i] / this.model.get("len")) * this.windowWidth))
        .css('top', 150.0 - ((i) * (120.0 / this.model.get("onset_indices").length)))
      $newPoint.attr('ord', this.model.get("onset_indices")[i]);
      this.$el.append($newPoint);

    }

    // area of nPVI
    var curPosLeft = 0;
    var curPosTop = 120;

    this.ctx2.beginPath();
    this.ctx2.moveTo(curPosLeft, curPosTop);
    for (var i = 0; i <= this.model.get("onset_indices").length; i++) {
      // this.ctx2.beginPath()
      if (i === this.model.get("onset_indices").length) {
        var nextPosLeft = this.windowWidth;
        var nextPosTop = 0;
      } else {
        var nextPosLeft = ((this.model.get("onset_indices")[i] / this.model.get("len")) * this.windowWidth);
        var nextPosTop = 120.0 - (i * (120.0 / this.model.get("onset_indices").length));
      }
      this.ctx2.lineTo(nextPosLeft, nextPosTop)

      var curPosLeft = nextPosLeft;
      var curPosTop = nextPosTop;

    }
    this.ctx2.closePath();
    this.ctx2.lineWidth = 1;
    this.ctx2.fillStyle="#456B87";
    this.ctx2.fill();
    this.ctx2.strokeStyle = '#eee';
    this.ctx2.stroke();

  },

  highlightFullHistogramColumn: function(event) {
    $('.FIC_box').find('.FIC_sq[ord="' + $(event.currentTarget).attr("ord") + '"]')
      .addClass("columnHovered");
  },

  highlightFullHistogramColumn: function(event) {
    $('.FIC_box').find('.FIC_sq[ord="' + $(event.currentTarget).attr("ord") + '"]')
      .removeClass("columnHovered");
  }

})
