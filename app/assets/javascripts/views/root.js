Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    'plugin-change #bb-info' : 'updateModel',
    'click .analysis_collapse' : 'collapseAnalysis'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync change', this.renderInfoView);
    this.listenTo(this.model, 'sync change', this.renderAnalysisView);
  },

  render: function() {
    var content = this.template({
      rhythm: this.model,
      analysisDisplayed: this.analaysisDisplayed
    })
    this.$el.html(content);
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
              // that.renderAnalysisView();
            }
          })
        }
        that.renderInfoView();
        // that.renderAnalysisView();
      }
    });
  },

  renderInfoView: function(event) {
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

    if ($.cookie('_Geometrhythm_stored_rhythm') === undefined ) {
      var template = "templateSplash";
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
    var view = new Geometrhythm.Views.Analysis({
      model: this.model
    })
    this.currentAnalysisView && this.currentAnalysisView.remove();
    this.currentAnalysisView = view;
    this.$('#bb-analysis-main').html(view.render().$el)
    // debugger //WE HAVE IT HERE!
  },

  collapseAnalysis: function() {
    console.log("made it here");
    this.currentAnalysisView && this.currentAnalysisView.remove();
    this.$('#bb-analysis-main').empty();
    this.analysisDisplayed = false;
  }

});
