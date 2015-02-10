Geometrhythm.Routers.App = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.activeRhythm = new Geometrhythm.Models.Rhythm();
  },

  routes: {
    "" : "root",
    "api/rhythms/:id" : "show",
    "rhythms" : "list",
    "likes/:id" : "likesOfUser",
    "creations/:id" : "creationsOfUser"
  },

  root: function() {
    if ($.cookie('_Geometrhythm_stored_rhythm')) {
      this.activeRhythm.set("rhythm_str", $.cookie('_Geometrhythm_stored_rhythm'));
      $('#current-rhythm').attr('value', $.cookie('_Geometrhythm_stored_rhythm'));
    } else {
      this.activeRhythm.set("rhythm_str", "x--x--x---x-x---");
      $('#current-rhythm').attr('value', "x--x--x---x-x---");
    }

    // console.log("here");
    // var dbRhythm = Geometrhythm.Collections.rhythms.find( function(rhythm){
    //     console.log("but never here?");
    //     return rhythm.get("rhythm_str") === $('#current-rhythm').val();
    //   }
    // );
    // if (dbRhythm) {
    //   $('#cur-rhythm-id').attr('value', dbRhythm.id);
    // } else {
    //   $('#cur-rhythm-id').attr('value', '');
    //   dbRhythm = new Geometrhythm.Models.Rhythm();
    // }

    var rootView = new Geometrhythm.Views.Root({
      model: this.activeRhythm,
    });
    this._swapView(rootView);
  },

  list: function() {
    Geometrhythm.Collections.rhythms.fetch( { data: { page: 1 } } );
    var listView = new Geometrhythm.Views.RhythmsList({
      collection: Geometrhythm.Collections.rhythms,
      potentialLikers: Geometrhythm.Collections.potentialLikers,
      potentialCreators: Geometrhythm.Collections.potentialCreators,
      model: this.activeRhythm
    });
    this._swapView(listView);
  },

  likesOfUser: function(id) {
    var likesCollection = new Geometrhythm.Collections.Rhythms();
    likesCollection.filter = {};
    likesCollection.filter.liker_id = id;
    likesCollection.fetchByFilter(); //would prefer to fetch only the first page here, too
    var listView = new Geometrhythm.Views.RhythmsList({
      collection: likesCollection,
      potentialLikers: Geometrhythm.Collections.potentialLikers,
      potentialCreators: Geometrhythm.Collections.potentialCreators,
      model: this.activeRhythm,
      liker: id
    });
    this._swapView(listView);
  },

  creationsOfUser: function(id) {
    var creationsCollection = new Geometrhythm.Collections.Rhythms();
    creationsCollection.filter = {};
    creationsCollection.filter.creator_id = id;
    creationsCollection.fetchByFilter(); //would prefer to fetch only the first page here, too
    var listView = new Geometrhythm.Views.RhythmsList({
      collection: creationsCollection,
      potentialLikers: Geometrhythm.Collections.potentialLikers,
      potentialCreators: Geometrhythm.Collections.potentialCreators,
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
