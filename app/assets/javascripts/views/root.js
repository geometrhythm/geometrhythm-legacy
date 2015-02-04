Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    'submit form' : 'submitForm',
    'plugin-change .well' : 'updateModel'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change:rhythm_str', this.renderInfoTeaseView);
    this.listenTo(this.collection, 'sync add', this.renderInfoTeaseView);
    setTimeout(this.renderInfoTeaseView, 0);
    if (window.storedRhythm) {
      console.log("hello");
      console.log(window.storedRhythm);
      $('#current-rhythm').attr("value", window.storedRhythm);
    }
  },

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  },

  updateModel: function(event) {
    this.model.set("rhythm_str", $('#current-rhythm').val());
  },

  renderInfoTeaseView: function(event) {
    console.log($('#current-rhythm').val());
    //debugger
    var maybeMatchingRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
        //debugger
        return rhythm.get("rhythm_str") === $('#current-rhythm').val();
      }
    );
    //debugger
    if (maybeMatchingRhythm) {
      console.log($('#cur-user-id').val());
      console.log(maybeMatchingRhythm.get("creator_id"));
      if ($('#cur-user-id').val()
        && $('#cur-user-id').val() == maybeMatchingRhythm.get("creator_id")) {
        console.log("woo hoo, made it in here!");
        var view = new Geometrhythm.Views.ShowYourRhythmsInfo({
          model: maybeMatchingRhythm
        });
      } else if ($('#cur-user-id').val()
        && $('#cur-user-id').val() != maybeMatchingRhythm.get("creator_id")) {
        var view = new Geometrhythm.Views.ShowAnothersRhythmsInfo({
          model: maybeMatchingRhythm
        });
      } else {
        var view = new Geometrhythm.Views.ShowRhythmsInfoLoggedOut({
          model: maybeMatchingRhythm
        });
      }
    } else {
      if ($('#cur-user-id').val()) {
        var view = new Geometrhythm.Views.ClaimRhythm();
      } else {
        var view = new Geometrhythm.Views.SignUpToClaimRhythm();
      }
    }
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$('#bb-info').html(view.render().$el)
  }

});
