Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    //'submit form' : 'submitForm',
    'plugin-change #bb-info' : 'updateModel',
    // 'click button.like' : 'likeThisRhythm',

    // 'click .navbar-brand' : 'visitList'
  },

  initialize: function() {
    // debugger
    // this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model, 'change:rhythm_str', this.renderInfoView);
    this.listenTo(this.model, 'change sync', this.renderInfoView);
    // this.listenTo(this.model, 'change:id', this.renderInfoView);
    // this.listenTo(this.collection, 'sync', this.renderInfoView); //OKAY BIG EXPERIMENT
    // this.updateModel();
    // this.wtfStoreRhythmId();
    //this.renderInfoView();
    // debugger
    // this.listenTo(this.model, 'change:rhythm_str', this.renderAnalysisView);
    this.listenTo(this.model, 'change sync', this.renderAnalysisView);
    // this.listenTo(this.collection, 'sync', this.renderAnalysisView);

    // setTimeout(this.renderInfoView, 0);
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
    // console.log("update model is firing");
    // console.log("rhythm's id:");
    // console.log(this.model.get("id"));
    // console.log("rhythm's creator id:");
    // console.log(this.model.get("creator_id"));
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

    // custom API route (BB)
    // send it rhythm_str
    // get back id if there's a match
    var that = this;
    $.ajax({
      url: "api/rhythms/match",
      type: "GET",
      data: {
        rhythm_str: $('#current-rhythm').val()
      }, success: function (payload) {
        // debugger
        if (payload) {
          that.model.set(payload);

        } else {
          // console.log("created a rhythm for the dummy user so you can see some charts");
          // that.model = new Geometrhythm.Models.Rhythm({
          //   rhythm_str: $('#current-rhythm').val(),
          //   creator_id: 2
          // });
          // that.model.save();
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
              that.renderAnalysisView();
            }
          })
        }
        that.renderInfoView();
        that.renderAnalysisView();
        // debugger
        // $('#cur-rhythm-id').attr('value', payload.id);

        // console.log("success");
        // this.model.fetch();
      }//, error: function() {
      //   $('#cur-rhythm-id').attr('value', '');
      //   console.log("sumthin gieth rogn");
      // }
    });
    // `create` action should `render json: @widget`
    // this gives the client access to the `id` attribute issued by
    // the server.
    // console.log("issued id: " + widgetData.id);
//   }
// });

    // $.ajax(
    //   dataType:
    //   method:
    //   success: set the model to what i get back if not nil
    // )
  },

  renderInfoView: function(event) {
    // var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
    //     return rhythm.get("rhythm_str") == $('#current-rhythm').val();
    //   }
    // );
    //
    // debugger
    // template = "templateSignUpToClaim"
    // debugger
    if (this.model && this.model.id != undefined) { //2 is the dummy user so charts can show
      // console.log("went in here");
      // console.log(this.model.id);
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
      // console.log("MODEL NOT FOUND YAY");
      // this.model = new Geometrhythm.Models.Rhythm({
      //   rhythm_str: $('#current-rhythm').val(),
      //   creator_id: 2
      // });
      // this.model.save();
      if ($('#cur-user-id').val()) {
        var template = "templateClaim";
      } else {
        var template = "templateSignUpToClaim";
      }
    }

    if ($.cookie('_Geometrhythm_stored_rhythm') === undefined ) {
      var template = "templateSplash";
    }
    // this.model.fetch();
    var view = new Geometrhythm.Views.Info({
      // model: dbRhythm,
      model: this.model,
      template: template
    })
    this.currentInfoView && this.currentInfoView.remove();
    this.currentInfoView = view;
    this.$('#bb-info').html(view.render().$el)
  },

  renderAnalysisView: function(event) {
    // var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
    //     return rhythm.get("rhythm_str") == $('#current-rhythm').val();
    //   }
    // );
    //
    // if (!dbRhythm) {
    //   dbRhythm = new Geometrhythm.Models.Rhythm({rhythm_str: $('#current-rhythm').val()});
    // }
    // debugger


    // if (this.model.id == undefined) {
    //   console.log("okay it went down this way in render analysis view");
    //   this.model = new Geometrhythm.Models.Rhythm({
    //     rhythm_str: $('#current-rhythm').val(),
    //     creator_id: 2
    //   });
    //   this.model.save();
    // }

    var view = new Geometrhythm.Views.Analysis({
      // model: dbRhythm,
      model: this.model
    });

    this.currentAnalysisView && this.currentAnalysisView.remove();
    this.currentAnalysisView = view;
    this.$('#bb-analysis').html(view.render().$el);
  },

  // visitList: function() {
  //   Backbone.history.navigate("/rhythms", {trigger: true})
  // }
});
