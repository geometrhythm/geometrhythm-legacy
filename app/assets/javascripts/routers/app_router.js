Geometrhythm.Routers.App = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    "" : "root",
    "api/rhythms/:id" : "show"
  },

  root: function() {
    //whatever the rhythm currently is that's being played with
    var rootView = new Geometrhythm.Views.Root({
      //model: whatever that rhythm is called
    });
    this._swapView(rootView)
  },

  show: function(id) {
    var rhythm = Geometrhythm.Collections.rhythms.getOrFetch(id);
  //  debugger
    var showView = new Geometrhythm.Views.RhythmShow({
      model: rhythm
    })
    this._swapView(showView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
