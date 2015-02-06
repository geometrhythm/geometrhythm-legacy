Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    'submit form' : 'submitForm',
    'plugin-change #bb-info' : 'updateModel',
    'click button.like' : 'likeThisRhythm'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change:rhythm_str', this.renderInfoView);
    this.listenTo(this.collection, 'sync', this.renderInfoView);
    // this.updateModel();
    // this.wtfStoreRhythmId();
    setTimeout(this.renderInfoView, 0);
  },

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
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
    if ($.cookie('_Geometrhythm_stored_rhythm') === undefined ) {
      var template = "templateSplash";
      dbRhythm = new Geometrhythm.Models.Rhythm({rhythm_str: $('#current-rhythm').val()});
    } else {
      var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
          return rhythm.get("rhythm_str") === $('#current-rhythm').val();
        }
      );
      if (dbRhythm) {
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
    }


      var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
          return rhythm.get("rhythm_str") === $('#current-rhythm').val();
        }
      );
      if (dbRhythm) {
        $('#cur-rhythm-id').attr('value', dbRhythm.id);
      } else {
        $('#cur-rhythm-id').attr('value', '');
      }
      debugger


    var view = new Geometrhythm.Views.Info({
      model: dbRhythm,
      template: template
    })
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$('#bb-info').html(view.render().$el)
  },

  likeThisRhythm: function() {
    var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        return rhythm.get("rhythm_str") === $('#current-rhythm').val();
      }
    );
    if (dbRhythm) {
      $('#cur-rhythm-id').attr('value', dbRhythm.id);
    } else {
      $('#cur-rhythm-id').attr('value', '');
    }

    var that = this;
    new Geometrhythm.Models.Like().save({
      rhythm_id: $('#cur-rhythm-id').val()
    }, {
      success: function() {
        var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
            return rhythm.get("rhythm_str") === $('#current-rhythm').val();
          });
        dbRhythm.fetch();
      }
    });
  }
});
