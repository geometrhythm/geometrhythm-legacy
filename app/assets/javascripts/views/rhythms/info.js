Geometrhythm.Views.Info = Backbone.View.extend({
  templateShowYours: JST['info/show_yours'],
  templateShowAnothers: JST['info/show_anothers'],
  templateShowLoggedOut: JST['info/show_logged_out'],
  templateClaim: JST['info/claim'],
  templateSignUpToClaim: JST['info/sign_up_to_claim'],
  templateSplash: JST['info/splash'],

  initialize: function(options) {
    this.listenTo(this.model, 'sync add change', this.render);
    this.template = this[options.template];
  },

  events: {
    'click #sign-up-to-claim-rhythm' : 'signUpToClaimRhythm',
    'click #claim-rhythm' : 'claimRhythm',
    'click button.like' : 'likeThisRhythm',
    'submit form.suggest-name' : 'suggestName',
    'submit form.add-comment' : 'addComment',
    'submit form.add-meta-comment' : 'addMetaComment',
    'click span.view-creations' : 'viewCreations',
    'click span.view-likes' : 'viewLikes',
    'click span.name_deets_link' : 'expandNames',
    'click span.name_deets_collapse' : 'collapseNames',
    'click span.comment_deets_link' : 'expandComments',
    'click span.comment_deets_collapse' : 'collapseComments',
    'click span.like_deets_link' : 'expandLikes',
    'click span.like_deets_collapse' : 'collapseLikes',
    'click span.instruction_deets_link' : 'expandInstructions',
  },

  render: function(options) {
    var earliestNameId = null;
    var primaryName = null;
    var firstPassAdditionalNames = [];
    this.model.get("namings") && this.model.get("namings").forEach(function(naming) {
      if (earliestNameId == undefined || naming.name.id <= earliestNameId) {
        earliestNameId = naming.name.id;
        primaryName = naming.name.name;
      }
      firstPassAdditionalNames.push(naming)
    });
    var additionalNames = [];
    firstPassAdditionalNames.forEach(function(naming) {
      if (naming.name.name != primaryName) {
        additionalNames.push(naming)
      }
    })
    var content = this.template({
      rhythm: this.model,
      primaryName: primaryName,
      nameDeets: this.nameDeets,
      likeDeets: this.likeDeets,
      additionalNames: additionalNames,
      instructionDeets: this.instructionDeets,
      commentDeets: this.commentDeets
    });
    this.$el.html(content);
    return this;
  },

  signUpToClaimRhythm: function() {
    window.location.href = '/users/new'
  },

  claimRhythm: function() {
    var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        return rhythm.get("rhythm_str") === $('#current-rhythm').val();
      }
    );
    if (dbRhythm) {
      $('#cur-rhythm-id').attr('value', dbRhythm.id);
    } else {
      $('#cur-rhythm-id').attr('value', '');
    }

    this.model.save({
      creator_id: $('#cur-user-id').val(),
      rhythm_str: $('#current-rhythm').val()
    });
  },

  suggestName: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    var dbName = Geometrhythm.Collections.names.find( function(name){
        return name.get("name") === attrs["name"].name;
      }
    );
    if (!dbName) {
      var dbName = new Geometrhythm.Models.Name(attrs);
      var that = this;
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
  },

  addComment: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    var comment = new Geometrhythm.Models.Comment({
      commentable_id: $('#cur-rhythm-id').val(),
      commentable_type: 'Rhythm',
      user_id: $('#cur-user-id').val(),
      body: $(event.currentTarget).serializeJSON()["comment"].body
    });
    var that = this;
    comment.save({}, {
      success: function() {
        that.model.fetch();
      }
    });
  },

  addMetaComment: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    var comment = new Geometrhythm.Models.Comment({
      commentable_id: $(event.currentTarget).serializeJSON()["comment"].comment_id,
      commentable_type: 'Comment',
      user_id: $('#cur-user-id').val(),
      body: $(event.currentTarget).serializeJSON()["comment"].body
    });
    var that = this;
    comment.save({}, {
      success: function() {
        that.model.fetch();
      }
    });
  },

  likeThisRhythm: function() {
    var that = this;
    new Geometrhythm.Models.Like().save({
      rhythm_id: $('#cur-rhythm-id').val()
    },{
      success: function() {
        that.model.fetch();
      }
    });
  },

  viewCreations: function(event) {
    Backbone.history.navigate("/creations/" + $(event.currentTarget).attr("value"),
      {trigger: true});
  },

  viewLikes: function(event) {
    Backbone.history.navigate("/likes/" + $(event.currentTarget).attr("value"),
      {trigger: true});
  },

  expandNames: function() {
    this.nameDeets = true;
    this.render();
  },

  collapseNames: function() {
    this.nameDeets = false;
    this.render();
  },

  expandComments: function() {
    this.commentDeets = true;
    this.render();
  },

  collapseComments: function() {
    this.commentDeets = false;
    this.render();
  },

  expandLikes: function() {
    this.likeDeets = true;
    this.render();
  },

  collapseLikes: function() {
    this.likeDeets = false;
    this.render();
  },

  expandInstructions: function() {
    this.instructionDeets = true;
    this.render();
  },
});
