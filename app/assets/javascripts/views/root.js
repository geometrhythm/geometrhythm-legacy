Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    //'submit form' : 'submitForm',
    'plugin-change #bb-info' : 'updateModel',
    // 'click button.like' : 'likeThisRhythm',

    // 'click .navbar-brand' : 'visitList'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change:rhythm_str', this.renderInfoView);
    this.listenTo(this.model, 'change:id', this.renderInfoView);
    this.listenTo(this.collection, 'sync', this.renderInfoView); //OKAY BIG EXPERIMENT
    // this.updateModel();
    // this.wtfStoreRhythmId();
    //this.renderInfoView();
    // debugger
    this.listenTo(this.model, 'change:rhythm_str', this.renderAnalysisView);
    this.listenTo(this.model, 'change:id', this.renderAnalysisView);
    this.listenTo(this.collection, 'sync', this.renderAnalysisView);

    setTimeout(this.renderInfoView, 0);
  },

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    // this.$el.find('#clockwise').popover();
    return this;
  },

  // wtfStoreRhythmId: function() {
  //   var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
  //       return rhythm.get("rhythm_str") === $('#current-rhythm').val();
  //     }
  //   );
  //   if (dbRhythm) {
  //     $('#cur-rhythm-id').attr('value', dbRhythm.id);
  //   } else {
  //     $('#cur-rhythm-id').attr('value', '');
  //   }
  //   debugger
  // },

  updateModel: function() {
    // debugger
    this.model.set("rhythm_str", $('#current-rhythm').val());
    var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        return rhythm.get("rhythm_str") === $('#current-rhythm').val();
      }
    );
    if (dbRhythm) {
      $('#cur-rhythm-id').attr('value', dbRhythm.id);
    } else {
      $('#cur-rhythm-id').attr('value', '');
    }
  },

  renderInfoView: function(event) {
    var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        return rhythm.get("rhythm_str") == $('#current-rhythm').val();
      }
    );

    if (dbRhythm) {
      $('#cur-rhythm-id').attr('value', dbRhythm.id);
      if ($('#cur-user-id').val()
        && $('#cur-user-id').val() == dbRhythm.get("creator_id")) {
        var template = "templateShowYours";
      } else if ($('#cur-user-id').val()
        && $('#cur-user-id').val() != dbRhythm.get("creator_id")) {
        var template = "templateShowAnothers";
      } else {
        var template = "templateShowLoggedOut";
      }
    } else {
      dbRhythm = new Geometrhythm.Models.Rhythm({rhythm_str: $('#current-rhythm').val()});
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
      model: dbRhythm,
      template: template
    })
    this.currentInfoView && this.currentInfoView.remove();
    this.currentInfoView = view;
    this.$('#bb-info').html(view.render().$el)
  },

  renderAnalysisView: function(event) {
    var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        return rhythm.get("rhythm_str") == $('#current-rhythm').val();
      }
    );

    if (!dbRhythm) {
      dbRhythm = new Geometrhythm.Models.Rhythm({rhythm_str: $('#current-rhythm').val()});
    }

    var view = new Geometrhythm.Views.Analysis({
      model: dbRhythm,
    });

    this.currentAnalysisView && this.currentAnalysisView.remove();
    this.currentAnalysisView = view;
    this.$('#bb-analysis').html(view.render().$el);
  },

  // visitList: function() {
  //   Backbone.history.navigate("/rhythms", {trigger: true})
  // }
});
