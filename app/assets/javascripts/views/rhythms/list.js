Geometrhythm.Views.RhythmsList = Backbone.CompositeView.extend({

  template: JST['rhythms/list'],

  events: {
    "click .rhythm:not('i')" : "selectRhythm",
    "click .key-rhythm:not('i')" : "selectRhythm",
    "change .creator" : "filterByCreator",
    "change .liker" : "filterByLiker",
    "change .rhythm-str" : "filterByRhythmStr",
    "click #return-to-root" : "returnToRoot"
  },

  initialize: function(options) {
    this.potentialCreators = options.potentialCreators;
    this.potentialLikers = options.potentialLikers;
    this.creatorId = options.creator;
    this.likerId = options.liker;
    this.rootLink = $('.navbar-brand');

    // this.addRhythmListItemView(this.model); should only do this if there's no filter!

    this.collection.each(function(rhythm) {
      this.addRhythmListItemView(rhythm);
    }.bind(this))

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.potentialCreators, 'sync', this.render);
    this.listenTo(this.potentialLikers, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addRhythmListItemView);
    this.listenTo(this.collection, 'remove', this.removeRhythmListItemView)

  },

  render: function() {
    var content = this.template({
      rhythms: this.collection,
      potentialCreators: this.potentialCreators,
      potentialLikers: this.potentialLikers,
      cur_rhythm: this.model,
      liker: this.likerId,
      creator: this.creatorId,
      rhythm_str: this.rhythmStr
    })
    this.$el.html(content);
    this.listenForScroll();
    this.attachSubviews();

    if (this.subviews('div.subview-version').length == 0) {
      this.$el.find('div.subview-version').append("No rhythms matched these constraints.")
    }

    this.$el.find('.mini-rhythm-ring').miniRhythmRing();
    this.$el.find('.medium-rhythm-ring').miniRhythmRing(true);

    // console.log("");
    // console.log("collection: " + this.collection.length);
    // console.log("");
    // console.log("ptntl creators: " + this.potentialCreators.length);
    // console.log("creators filter: ");
    // console.log(this.potentialCreators.filter);
    // console.log("");
    // console.log("ptntl likers: " + this.potentialLikers.length);
    // console.log("likers filter: ");
    // console.log(this.potentialLikers.filter);

    return this;
  },

  addRhythmListItemView: function(rhythm) {
    var superSizeMe = false;
    if (this.subviews('div.subview-version').length == 0) { superSizeMe = true }
    var rhythmListItemView = new Geometrhythm.Views.RhythmListItemView({
      model: rhythm,
      superSizeMe: superSizeMe
    });
    this.addSubview('div.subview-version', rhythmListItemView);
  },

  removeRhythmListItemView: function(rhythm) {
    var subviews = this.subviews('div.subview-version');
    var subviewToRemove = _(subviews).find( function(sv){
      return sv.model.id == rhythm.id;
    });
    this.removeSubview('div.subview-version', subviewToRemove);
  },

  // filterByCreator: function(event) {
  //   this.creatorId = $(event.currentTarget).val();
  //   if (this.creatorId === "") {
  //     this.creatorId = null;
  //     delete this.collection.filter.creator_id;
  //     delete this.potentialLikers.filter.creator_id;
  //     this.potentialLikers.fetch();
  //   } else {
  //     this.collection.filter.creator_id = this.creatorId;
  //     this.potentialLikers.filter.creator_id = this.creatorId;
  //     this.potentialLikers.fetchByFilter();
  //   }
  //   this.collection.fetchByFilter();
  //   // this.potentialCreators.fetchByFilter();
  // },

  // filterByLiker: function(event) {
  //   this.likerId = $(event.currentTarget).val()
  //   if (this.likerId === "") {
  //     this.likerId = null;
  //     delete this.collection.filter.liker_id;
  //     delete this.potentialCreators.filter.liker_id;
  //     this.potentialCreators.fetch();
  //   } else {
  //     this.collection.filter.liker_id = this.likerId;
  //     this.potentialCreators.filter.liker_id = this.likerId;
  //     this.potentialCreators.fetchByFilter();
  //   }
  //   this.collection.fetchByFilter();
  //   // this.potentialLikers.fetchByFilter();
  // },

  // filterByRhythmStr: function(event) {
  //   this.rhythmStr = $(event.currentTarget).val()
  //   if (this.rhythmStr === "") {
  //     this.rhythmStr = null;
  //     delete this.collection.filter.rhythm_str;
  //   } else {
  //     this.collection.filter.rhythm_str = this.rhythmStr;
  //   }
  //   this.collection.fetchByFilter();
  // },

  selectRhythm: function(event){
    event.preventDefault();
    Backbone.View.prototype.remove.call(this)
    $.cookie('_Geometrhythm_stored_rhythm', $(event.currentTarget).attr('rhythm-str'), { expires: 7, path: '/' });
    Backbone.history.navigate('/', { trigger: true } )
  },

  listenForScroll: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (view.collection.page_number < view.collection.total_pages) {
        view.collection.filter.page = view.collection.page_number + 1;
        view.collection.fetchByFilter(true); // here's the "dontRemove part, my attempt to replicate the commented out below but including my filters"
        // view.collection.fetch({
        //   data: { page: view.collection.page_number + 1 },
        //   remove: false
        // });
      }
    }
  },

  returnToRoot: function() {
    Backbone.history.navigate("/", {trigger: true})
  }

});
