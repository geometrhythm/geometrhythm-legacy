Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    'plugin-change #bb-info' : 'updateModel',
    'click .analysis_collapse' : 'collapseAnalysis',
    'click .analysis_expand' : 'expandAnalysis'
  },

  initialize: function(options) {
    this.listenTo(this.model, 'sync change', this.renderInfoView);
    this.listenTo(this.model, 'sync change', this.renderAnalysisView);
    this.analysisDisplayed = options.analysisDisplayed;
    this.splashIt = options.splashIt;
    // console.log(this.analysisDisplayed);
  },

  render: function() {
    // console.log("RIGHT before using the template");
    // console.log(this.analysisDisplayed);
    // debugger
    var content = this.template({
      rhythm: this.model,
      analysisDisplayed: this.analysisDisplayed
    })
    this.$el.html(content);
    this.renderInterface();
    return this;
  },

  updateModel: function() {
    this.model.set("rhythm_str", $('#current-rhythm').val());

    var that = this;
    $.ajax({
      url: "api/rhythms/match",
      type: "GET",
      data: {
        rhythm_str: $('#current-rhythm').val()
      }, success: function (payload) {
        if (payload) {
          that.model.set(payload);
        } else {
          $.ajax({
            url: "api/rhythms/present",
            type: "GET",
            data: {
              rhythm: {
                rhythm_str: $('#current-rhythm').val()
              }
            }, success: function (payload) {
              that.model.set(payload);
              that.renderInfoView();
            }
          })
        }
        that.renderInfoView();
      }
    });
  },

  renderInfoView: function(event) {
    if (this.splashIt) {
      console.log("welcome to zombo com");
      var template = "templateSplash";
      if (this.almostUnsplash) {
        this.splashIt = false;
      } else {
        this.almostUnsplash = true;
      }
    } else {
      if (this.model && this.model.id != undefined) {
        $('#cur-rhythm-id').attr('value', this.model.id);
        if ($('#cur-user-id').val()
          && $('#cur-user-id').val() == this.model.get("creator_id")) {
          var template = "templateShowYours";
        } else if ($('#cur-user-id').val()
          && $('#cur-user-id').val() != this.model.get("creator_id")) {
          var template = "templateShowAnothers";
        } else {
          var template = "templateShowLoggedOut";
        }
      } else {
        if ($('#cur-user-id').val()) {
          var template = "templateClaim";
        } else {
          var template = "templateSignUpToClaim";
        }
      }
    }

    var view = new Geometrhythm.Views.Info({
      model: this.model,
      template: template
    })
    this.currentInfoView && this.currentInfoView.remove();
    this.currentInfoView = view;
    this.$('#bb-info').html(view.render().$el)
  },

  renderAnalysisView: function(event) {
    if (this.analysisDisplayed === false) { return; }
    var view = new Geometrhythm.Views.Analysis({
      model: this.model
    })
    this.currentAnalysisView && this.currentAnalysisView.remove();
    this.currentAnalysisView = view;
    this.$('#bb-analysis-main').html(view.render().$el)
    // debugger
    $('.syncopation').tooltip({
      items: '.syncopation',
      content: "<strong>metric syncopation</strong> the difference between the total metric weight of this rhythm's onsets and the maximum possible total metric weight of a rhythm with the same number of onsets and cells"
    });
    $('.irregularity').tooltip({
      items: '.irregularity',
      content: "<strong>irregularity</strong> an average of the edit distances between this rhythm and each perfectly even rhythm of this cell count oriented at the same initial onset (i.e. the rhythms which define the metrical hierarchy)"
    });
    $('.metrical-hierarchy').tooltip({
      items: '.metrical-hierarchy',
      content: "<strong>metrical hierarchy</strong> considers the rhythm in terms of its pulse count)"
    });
    // debugger
  },

  collapseAnalysis: function() {
    this.currentAnalysisView && this.currentAnalysisView.remove();
    this.$('#bb-analysis-main').empty();
    this.analysisDisplayed = false;
    this.renderInterface();
  },

  expandAnalysis: function() {
    this.analysisDisplayed = true;
    this.renderAnalysisView();
    this.renderInterface();
  },

  renderInterface: function() {
    var view = new Geometrhythm.Views.Interface({
      analysisDisplayed: this.analysisDisplayed
    })
    this.currentInterfaceView && this.currentInterfaceView.remove();
    this.currentInterfaceView = view;
    // debugger
    this.$('interface').html(view.render().$el)
  }

});
