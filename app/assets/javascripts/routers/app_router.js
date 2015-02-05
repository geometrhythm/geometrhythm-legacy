Geometrhythm.Routers.App = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.activeRhythm = new Geometrhythm.Models.Rhythm();
    this.activeRhythm.set("rhythm_str", "x--x--x---x-x---");
    //Geometrhythm.Collections.rhythms.fetch();
  },

  routes: {
    "" : "root",
    "api/rhythms/:id" : "show",
    "rhythms" : "list"
  },

  root: function() {

    //var that = this;
    Geometrhythm.Collections.rhythms.fetch();
    var rootView = new Geometrhythm.Views.Root({
      model: this.activeRhythm,
      collection: Geometrhythm.Collections.rhythms
    });
    this._swapView(rootView);
  },

  // show: function(id) {
  //   var rhythm = Geometrhythm.Collections.rhythms.getOrFetch(id);
  //   var showView = new Geometrhythm.Views.RhythmShow({
  //     model: rhythm
  //   })
  //   this._swapView(showView);
  // },

  list: function() {
    Geometrhythm.Collections.rhythms.fetch();
    var listView = new Geometrhythm.Views.RhythmsList({
      collection: Geometrhythm.Collections.rhythms,
      model: this.activeRhythm
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
