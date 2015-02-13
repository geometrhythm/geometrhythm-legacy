Geometrhythm.Views.Analysis = Backbone.CompositeView.extend({

  template: JST['rhythms/analysis'],

  events: {
    // 'mouseover .bb-analysis' : 'showDetailView',
    'click .analysis-title' : 'showDetailView',
    'click .details-link' : 'toggleDetails',
    'click .general-link' : 'showDetailView',
    'mouseover .a-t-basic' : 'highlightBasicTitle',
    'mouseout .a-t-basic' : 'unHighlightBasicTitle',
    'mouseover .a-t-interval' : 'highlightIntervalTitle',
    'mouseout .a-t-interval' : 'unHighlightIntervalTitle',
    'mouseover .a-t-meter' : 'highlightMeterTitle',
    'mouseout .a-t-meter' : 'unHighlightMeterTitle',
    'mouseover .a-t-evenness' : 'highlightEvennessTitle',
    'mouseout .a-t-evenness' : 'unHighlightEvennessTitle',
    'mouseover .a-t-symmetry' : 'highlightSymmetryTitle',
    'mouseout .a-t-symmetry' : 'unHighlightSymmetryTitle',
    'mouseover .a-t-onset' : 'highlightOnsetTitle',
    'mouseout .a-t-onset' : 'unHighlightOnsetTitle',

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
    'mouseover .cE' : 'highlightContourEl',
    'mouseout .cE' : 'unHighlightContourEl',

    //FIC listeners
    'mouseover .iV' : 'highlightIntervalVectorEl',
    'mouseout .iV' : 'unHighlightIntervalVectorEl',
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
    'mouseover .kind-of-evenness' : 'highlightAllDiffs',
    'mouseout .kind-of-evenness' : 'unHighlightAllDiffs',

    //Meter listeners
    'mouseover .offbeat' : 'highlightOffbeat',
    'mouseout .offbeat' : 'unHighlightOffbeat',
    'mouseover .strongbeatedness' : 'highlightStrongbeatedness',
    'mouseout .strongbeatedness' : 'unHighlightStrongbeatedness',
    'mouseover .anacrusis' : 'highlightAnacrusis',
    'mouseout .anacrusis' : 'unHighlightAnacrusis',
    'mouseover .closure' : 'highlightClosure',
    'mouseout .closure' : 'unHighlightClosure',
    'mouseover .mH' : 'highlightMetricHierarchyFactor',
    'mouseout .mH' : 'unHighlightMetricHierarchyFactor',

    //Onset listeners
    'mouseover .onset-ddc' : 'highlightAllOnsetDDCs',
    'mouseout .onset-ddc' : 'unHighlightAllOnsetDDCs',
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

  toggleDetails: function(event) {
    if (Geometrhythm[$(event.currentTarget).data('detailsname')]) {
      Geometrhythm[$(event.currentTarget).data('detailsname')] = false;
    } else {
      Geometrhythm[$(event.currentTarget).data('detailsname')] = true;
    }
    console.log("what's going on HERE?");
    console.log($(event.currentTarget).data('detailsname'));
    console.log(Geometrhythm[$(event.currentTarget).data('detailsname')]);
    this.showDetailView(event);
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
    // console.log(template);
    var view = new Geometrhythm.Views.AnalysisDetails({
      template: template,
      model: this.model
    });
    // console.log("and here's the view one moment later");
    // console.log(view.render().$el);
    this.currentDetailView && this.currentDetailView.remove();
    this.currentDetailView = view;
    this.$('#bb-analysis-details').html(view.render().$el);
    $('#bb-analysis-details').html(view.render().$el);
    //console.log(this.$('#bb-analysis-details').html());
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
    var ord = parseInt($('.TEDAS_box').find('.TEDAS_sq[idx="' +
      parseInt($(event.currentTarget).attr('ord')) + '"]').attr('ord'));

    var dur = parseInt($('.TEDAS_box').find('.TEDAS_sq[idx="' +
      parseInt($(event.currentTarget).attr('ord')) + '"]').attr('dur'));
      // debugger
    this.ctx.clearRect(0,0,400,400);
    var posParse1 = $('body').find(".cell[ord='" + (ord) + "']").position();
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

    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";

    $(this.canvas).css('display','inline');
    var ord = parseInt($('.TEDAS_box').find('.TEDAS_sq[idx="' +
      parseInt($(event.currentTarget).attr('ord')) + '"]').attr('ord'));

    var dur = parseInt($('.TEDAS_box').find('.TEDAS_sq[idx="' +
      parseInt($(event.currentTarget).attr('ord')) + '"]').attr('dur'));
      // debugger
    this.ctx.clearRect(0,0,400,400);
    var posParse1 = $('body').find(".cell[ord='" + (ord) + "']").position();
    var pos1 = [posParse1.left, posParse1.top];
    var posParse2 = $('body').find(".cell[ord='" + ((ord + dur) % $('#current-rhythm').val().length) + "']").position();
    var pos2 = [posParse2.left, posParse2.top];
    this.ctx.beginPath();
    this.ctx.moveTo(pos1[0] + 13, pos1[1] + 13);
    this.ctx.lineTo(pos2[0] + 13, pos2[1] + 13);
    this.ctx.stroke();
  },

  unHighlightBoxNotation: function(event) {
    $('.TEDAS_sq').removeClass('activatedHoverStyle');
    $('.box-notation-words').removeClass('activated');

    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  },

  highlightNPVI: function() {
    // console.log("welcoem grh");
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
    // console.log("welcoem grh");
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
  },

  highlightBasicTitle: function() {
    // console.log("I DONT FUCKING HAVE TIME FOR THIS BULLSHIT RIGHT NOW");
    $('body').find('.a-t-basic').addClass("highlighted");
  },

  unHighlightBasicTitle: function() {
    $('body').find('.a-t-basic').removeClass("highlighted");
  },

  highlightIntervalTitle: function() {
    // console.log("I DONT FUCKING HAVE TIME FOR THIS BULLSHIT RIGHT NOW");
    $('body').find('.a-t-interval').addClass("highlighted");
  },

  unHighlightIntervalTitle: function() {
    $('body').find('.a-t-interval').removeClass("highlighted");
  },

  highlightMeterTitle: function() {
    // console.log("I DONT FUCKING HAVE TIME FOR THIS BULLSHIT RIGHT NOW");
    $('body').find('.a-t-meter').addClass("highlighted");
  },

  unHighlightMeterTitle: function() {
    $('body').find('.a-t-meter').removeClass("highlighted");
  },

  highlightEvennessTitle: function() {
    // console.log("I DONT FUCKING HAVE TIME FOR THIS BULLSHIT RIGHT NOW");
    $('body').find('.a-t-evenness').addClass("highlighted");
  },

  unHighlightEvennessTitle: function() {
    $('body').find('.a-t-evenness').removeClass("highlighted");
  },

  highlightSymmetryTitle: function() {
    // console.log("I DONT FUCKING HAVE TIME FOR THIS BULLSHIT RIGHT NOW");
    $('body').find('.a-t-symmetry').addClass("highlighted");
  },

  unHighlightSymmetryTitle: function() {
    $('body').find('.a-t-symmetry').removeClass("highlighted");
  },

  highlightOnsetTitle: function() {
    // console.log("I DONT FUCKING HAVE TIME FOR THIS BULLSHIT RIGHT NOW");
    $('body').find('.a-t-onset').addClass("highlighted");
  },

  unHighlightOnsetTitle: function() {
    $('body').find('.a-t-onset').removeClass("highlighted");
  },

  highlightContourEl: function(event) {
    var ord = parseInt($(event.currentTarget).attr('ord'));
    $('.TEDAS_box').find('.contour').addClass('visibled');
    $('.TEDAS_box').find('.contour[idx="' + ord + '"]').addClass('activated');
    // if (this.model.get("rhythm_str")[ord] === 'x') {
    //   $('.TEDAS_box').find('.TEDAS_sq[ord="' + parseInt($(event.currentTarget).attr('ord')) + '"]').addClass('activatedHoverStyle');
    // }
    // $('.box-notation-words').addClass('activated');
  },

  unHighlightContourEl: function(event) {
    $('.TEDAS_box').find('.contour').removeClass('activated').removeClass('visibled');
    // $('.TEDAS_sq').removeClass('activatedHoverStyle');
    // $('.box-notation-words').removeClass('activated');
  },

  highlightIntervalVectorEl: function(event) {
    var ord = parseInt($(event.currentTarget).attr('ord'));
    $('.FIC_box').find('.FIC_sq[ord="' + ord + '"]')
      .addClass("columnHovered");

    this.ctx.strokeStyle="#ff9800";
    this.ctx.lineWidth=3;
    this.ctx.shadowBlur=20;
    this.ctx.shadowColor="#ff9800";

    $(this.canvas).css('display','inline')
    // var ord = $('.FIC_box').find('.FIC_sq[ord="' + this.model.get("tallness") + '"]').attr('ord');
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

  unHighlightIntervalVectorEl: function(event) {
    $('.FIC_box').find('.FIC_sq').removeClass("columnHovered");
    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  },

  highlightOffbeat: function() {
    $('body').find(".MH_sq[count='1']").addClass('columnHovered');
  },

  unHighlightOffbeat: function() {
    $('body').find(".MH_sq[count='1']").removeClass('columnHovered');
  },

  highlightOffbeatness: function() {
    $('body').find(".MH_sq[count='1']").addClass('columnHovered');
  },

  unHighlightOffbeatness: function() {
    $('body').find(".MH_sq[count='1']").removeClass('columnHovered');
  },

  highlightStrongbeatedness: function() {
    var that = this;
    // console.log(this.factors(this.model.get("len")).sort().reverse().slice(0,2));
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

  factors: function(n) {
    var output = [];
    for (var i = n; i > 1; i--) {
      if (n % i == 0) {
        output.push(i);
      }
    }

    return output;
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
    $('body').find(".MH_sq[ord='" + this.model.get("closure_index") + "']").addClass('columnHovered');
  },

  unHighlightClosure: function() {
    $('body').find(".MH_sq[ord='" + this.model.get("closure_index") + "']").removeClass('columnHovered');
  },

  highlightMetricHierarchyFactor: function(event) {
    var ord = $(event.currentTarget).attr('ord');
    if (ord === '0') {
      $('body').find(".MH_sq[ord='0']").addClass('columnHovered');
      $('body').find(".cell[ord='0']")
        .css('box-shadow', '0px 0px 10px #ff9800');
      return;
    }
    var that = this;
    var linesToDraw = [];
    var alreadyHighlighted = false;
    this.factors(ord).forEach(function(factor) {
      if (alreadyHighlighted) { return; }
      if (that.model.get("len") % factor === 0) {
        alreadyHighlighted = true;
        for (var i = 0; i < that.model.get("len"); i++) {
          if (i % factor === 0) {
            linesToDraw.push(i);
            $('body').find(".MH_sq[ord='" + i + "']").addClass('columnHovered');
            $('body').find(".cell[ord='" + i + "']")
              .css('box-shadow', '0px 0px 10px #ff9800');
          }
        }
      }
    });

    $(this.canvas).css('display','inline')
    // var ord = $(event.currentTarget).attr('ord');
    // var linesToDraw = this.model.get("full_intervals_onset_pairs")[ord];
    // $('body').find(".FIC_sq[ord='" + ord + "']").addClass('columnHovered');
    this.ctx.clearRect(0,0,400,400);
    // var that = this;
    linesToDraw.forEach(function(lineToDraw, index) {
      var posParse1 = $('body').find(".cell[ord='" + lineToDraw + "']").position();
      var pos1 = [posParse1.left, posParse1.top];
      if (index === linesToDraw.length - 1) {
        var posParse2 = $('body').find(".cell[ord='" + linesToDraw[0] + "']").position();
      } else {
        var posParse2 = $('body').find(".cell[ord='" + linesToDraw[index + 1] + "']").position();
      }
      var pos2 = [posParse2.left, posParse2.top];

      // debugger
      if (that.model.get("rhythm_str")[lineToDraw] === "x") {
        that.ctx.strokeStyle="#ff9800";
        // that.ctx.shadowColor="#ff9800";
      } else {
        that.ctx.strokeStyle="rgb(235,198,143)";
        // that.ctx.shadowColor="#fff8dc";
      }

      that.ctx.beginPath();
      that.ctx.moveTo(pos1[0] + 13, pos1[1] + 13);
      that.ctx.lineTo(pos2[0] + 13, pos2[1] + 13);
      that.ctx.stroke();
    })
  },

  unHighlightMetricHierarchyFactor: function(event) {
    $('body').find(".cell")
      .css('box-shadow', '');
    $('body').find(".MH_sq").removeClass('columnHovered');

    this.ctx.clearRect(0,0,400,400);
    $(this.canvas).css('display','none')
  },

  highlightAllDiffs: function() {
    //$('evenness-point').addClass("activatedForPlaying");
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
      $newPoint.addClass('activatedForPlaying');
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

    for (var i = 0; i <= this.model.get("onset_indices").length; i++) {
      this.ctx2.beginPath();
      this.ctx2.fillStyle="#ff9800";
      this.ctx2.arc((i / this.model.get("onset_indices").length) * this.windowWidth,
        120.0 - ((i / this.model.get("onset_indices").length) * 120.0),
        4, 0, 2*Math.PI);
      this.ctx2.fill();
    }

    this.ctx2.strokeStyle="#5DA2D6";
    this.ctx2.lineWidth=2;
    this.ctx2.shadowBlur=0;

    for (var i = 0; i < this.model.get("onset_indices").length; i++ ) {
      // console.log("supposedly drew the line for " + i);
      // $('body').find(".cell[ord='" + i + "']")
      //   .css('box-shadow', '0px 0px 10px #ff9800');

      this.ctx2.beginPath();
      this.ctx2.moveTo(
        -20 + (this.windowWidth / 25) + ((this.model.get("onset_indices")[i] / this.model.get("len")) * this.windowWidth),
        120.0 - ((i / this.model.get("onset_indices").length) * 120.0)
      );

      this.ctx2.lineTo(
        (i / this.model.get("onset_indices").length) * this.windowWidth,
        120.0 - ((i / this.model.get("onset_indices").length) * 120.0)
      );
      this.ctx2.stroke();
      // debugger
    }

    // var ord = $(event.currentTarget).attr('idx');


  },

  unHighlightAllDiffs: function() {
    this.ctx2.clearRect(0,0,400,400);
    $('evenness-point').removeClass("activatedForPlaying");
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

  highlightAllOnsetDDCs: function() {
    $('.AIC_sq').addClass('columnHovered');
  },

  unHighlightAllOnsetDDCs: function() {
    $('.AIC_sq').removeClass('columnHovered');
  }

})
