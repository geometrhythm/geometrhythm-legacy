Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    'submit form' : 'submitForm',
    'plugin-change #bb-info' : 'updateModel',
    'click button.like' : 'likeThisRhythm'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change:rhythm_str', this.renderInfoView2);
    // this.listenTo(this.collection, 'sync add', this.renderInfoView2);
    setTimeout(this.renderInfoView2, 0);
  },

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    //this.rhythmRing = this.$('.rhythm-ring').rhythmRing(); <<-- I SHOULD DO THIS
      //INSTEAD OF OF THE ON DOC READY THIGN AT THE BOTTOM OF RHYTHM_RING.JS
      //THIS WAY I'LL ACTUALLY HAVE ACCESS TO ALL OF THE IVARS OF THE RHYTHMRING INSTANCE!
    return this;
  },

  updateModel: function(event) {
    this.model.set("rhythm_str", $('#current-rhythm').val());

    var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        return rhythm.get("rhythm_str") === $('#current-rhythm').val();
      }
    );

    //debugger

    if (dbRhythm) {
      $('#cur-rhythm-id').val(dbRhythm.id)
    } else {
      $('#cur-rhythm-id').val("")
    }
  },

  renderInfoView2: function(event) {
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
    var view = new Geometrhythm.Views.Info({
      model: dbRhythm
    })
    console.log("Well I made it this far 2");
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$('#bb-info').html(view.render({template: template}).$el)
  },

  // renderInfoView: function(event) {
  //   var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
  //       return rhythm.get("rhythm_str") === $('#current-rhythm').val();
  //     }
  //   );
  //
  //    //dbRhythm && dbRhythm.fetch();
  //
  //   if (dbRhythm) {
  //
  //     if ($('#cur-user-id').val()
  //       && $('#cur-user-id').val() == dbRhythm.get("creator_id")) {
  //       var view = new Geometrhythm.Views.ShowYourRhythmsInfo({
  //         model: dbRhythm
  //       });
  //
  //     } else if ($('#cur-user-id').val()
  //       && $('#cur-user-id').val() != dbRhythm.get("creator_id")) {
  //       var view = new Geometrhythm.Views.ShowAnothersRhythmsInfo({
  //         model: dbRhythm
  //       });
  //
  //     } else {
  //       var view = new Geometrhythm.Views.ShowRhythmsInfoLoggedOut({
  //         model: dbRhythm
  //       });
  //     }
  //
  //   } else {
  //
  //     if ($('#cur-user-id').val()) {
  //       var view = new Geometrhythm.Views.ClaimRhythm();
  //     } else {
  //       var view = new Geometrhythm.Views.SignUpToClaimRhythm();
  //     }
  //
  //   }
  //
  //   console.log("Well I made it this far");
  //   this.currentView && this.currentView.remove();
  //   this.currentView = view;
  //   this.$('#bb-info').html(view.render().$el)
  //
  // },

  likeThisRhythm: function() {
    var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        return rhythm.get("rhythm_str") === $('#current-rhythm').val();
      }
    );

    //debugger

    if (dbRhythm) {
      $('#cur-rhythm-id').val(dbRhythm.id)
    } else {
      $('#cur-rhythm-id').val("")
    }

    var that = this;
    console.log("DOM steez");
    console.log($('#cur-rhythm-id').val());
    // console.log("BB steez"); //of course this doesn't work, it's ACTIVERHYTHM, not an actual DB one...
    //debugger
    // console.log(this.model.id);
    new Geometrhythm.Models.Like().save({
      rhythm_id: $('#cur-rhythm-id').val()
    }, {
      success: function() {
        // that.renderInfoView();
        var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
            return rhythm.get("rhythm_str") === $('#current-rhythm').val();
          });
        dbRhythm.fetch();
      },
      error: function () {
        console.log("Something went wrong!");
      }
    });
    // },
    // { success: function() {
    //   console.log("I'm supposed to re-render");
    //   that.model.fetch({ success: function() {
    //     that.renderInfoView();
    //   }});
    // }}
    // );
    //that.model.fetch();

  }

});
