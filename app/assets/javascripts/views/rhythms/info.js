Geometrhythm.Views.Info = Backbone.View.extend({
  templateShowYours: JST['info/show_yours'],
  templateShowAnothers: JST['info/show_anothers'],
  templateShowLoggedOut: JST['info/show_logged_out'],
  templateClaim: JST['info/claim'],
  templateSignUpToClaim: JST['info/sign_up_to_claim'],

  // initialize: function(options) {
  //   this.template = this[options.template];
  // },

  initialize: function() {
    this.listenTo(this.model, 'sync change:likers change:play_count', this.render)
  },

  events: {
    'click #sign-up-to-claim-rhythm' : 'signUpToClaimRhythm',
    'click #claim-rhythm' : 'claimRhythm',
    'submit form.suggest-name' : 'suggestName'
  },

  render: function(options) {
    this.template = this[options.template] || this.template;
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  },

  signUpToClaimRhythm: function() {
    // window.storedRhythm = $('#current-rhythm').val();
    // //see root.js too... wish i could get to the session from here!
    window.location.href = '/users/new'

  },

  claimRhythm: function() {
    var rhythmToClaim = new Geometrhythm.Models.Rhythm();
    rhythmToClaim.set({
      creator_id: $('#cur-user-id').val(),
      rhythm_str: $('#current-rhythm').val()
    });
    rhythmToClaim.save();
    Geometrhythm.Collections.rhythms.add(rhythmToClaim);
  },

  suggestName: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    var dbName = Geometrhythm.Collections.names.find( function(name){
        //debugger
        return name.get("name") === attrs["name"].name;
      }
    );

    if (!dbName) {
      var dbName = new Geometrhythm.Models.Name(attrs);
      var that = this;
      //debugger
      dbName.save({}, {
        success: function() {
          that.saveNaming(dbName);
        }
      });
    } else {
      this.saveNaming(dbName);
    }
  },

  saveNaming: function(dbName) {
    var naming = new Geometrhythm.Models.Naming({
      rhythm_id: $('#cur-rhythm-id').val(),
      namer_id: $('#cur-user-id').val(),
      name_id: dbName.id
    });
    var that = this;
    naming.save({}, {
      success: function() {
        that.model.fetch();
      }
    });
  }

});
