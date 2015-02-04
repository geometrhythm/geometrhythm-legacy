Geometrhythm.Routers.App = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    //Geometrhythm.Collections.rhythms.fetch();
  },

  routes: {
    "" : "root",
    //"api/rhythms/:id" : "show"
    "api/rhythms" : "list"
  },

  root: function() {
    var activeRhythm = new Geometrhythm.Models.Rhythm();
    activeRhythm.set("rhythm_str", "x--x--x---x-x---");
    var that = this;
    Geometrhythm.Collections.rhythms.fetch();
    var rootView = new Geometrhythm.Views.Root({
      model: activeRhythm,
      collection: Geometrhythm.Collections.rhythms
    });
    that._swapView(rootView);
  },

  // show: function(id) {
  //   var rhythm = Geometrhythm.Collections.rhythms.getOrFetch(id);
  //   var showView = new Geometrhythm.Views.RhythmShow({
  //     model: rhythm
  //   })
  //   this._swapView(showView);
  // },
  
  list: function() {

  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
