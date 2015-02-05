Geometrhythm.Routers.App = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.activeRhythm = new Geometrhythm.Models.Rhythm();

    if ($.cookie('_Geometrhythm_stored_rhythm')) {
      this.activeRhythm.set("rhythm_str", $.cookie('_Geometrhythm_stored_rhythm'));
    } else if ($('#current-rhythm').val()){
      this.activeRhythm.set("rhythm_str", $('#current-rhythm').val());
    } else {
      this.activeRhythm.set("rhythm_str", "x--x--x---x-x---");
    }

  },

  routes: {
    "" : "root",
    "api/rhythms/:id" : "show",
    "rhythms" : "list",
    "likes/:id" : "likesOfUser",
    "creations/:id" : "creationsOfUser"
  },

  root: function() {
    Geometrhythm.Collections.rhythms.fetch();
    var rootView = new Geometrhythm.Views.Root({
      model: this.activeRhythm,
      collection: Geometrhythm.Collections.rhythms
    });
    this._swapView(rootView);
  },

  list: function() {
    Geometrhythm.Collections.rhythms.fetch();
    var listView = new Geometrhythm.Views.RhythmsList({
      collection: Geometrhythm.Collections.rhythms,
      users: Geometrhythm.Collections.users,
      model: this.activeRhythm
    });
    this._swapView(listView);
  },

  likesOfUser: function(id) {
    Geometrhythm.Collections.rhythms.fetch();
    var listView = new Geometrhythm.Views.RhythmsList({
      collection: Geometrhythm.Collections.rhythms,
      users: Geometrhythm.Collections.users,
      model: this.activeRhythm,
      liker: id
    });
    this._swapView(listView);
  },

  creationsOfUser: function(id) {
    Geometrhythm.Collections.rhythms.fetch();
    var listView = new Geometrhythm.Views.RhythmsList({
      collection: Geometrhythm.Collections.rhythms,
      users: Geometrhythm.Collections.users,
      model: this.activeRhythm,
      creator: id
    });
    this._swapView(listView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
    $('.rhythm-ring').rhythmRing();
  }
});
