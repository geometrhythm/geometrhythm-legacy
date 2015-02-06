Geometrhythm.Views.RhythmsList = Backbone.CompositeView.extend({

  template: JST['rhythms/list'],

  events: {
    "click .rhythm:not('i')" : "selectRhythm",
    "change .creator" : "filterByCreator",
    "change .liker" : "filterByLiker",
    "change .rhythm-str" : "filterByRhythmStr",
    "change .rhythm-id" : "filterByRhythmId"
  },

  initialize: function(options) {
    this.potentialCreators = options.potentialCreators;
    this.potentialLikers = options.potentialLikers;
    this.creatorId = options.creator;
    this.likerId = options.liker;

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
    this.attachSubviews();
    this.$el.find('.mini-rhythm-ring').miniRhythmRing();
    console.log("ptntl creators: ");
    console.log(this.potentialCreators);
    console.log("ptntl likers: ");
    console.log(this.potentialLikers);
    return this;
  },

  addRhythmListItemView: function(rhythm) {
    var rhythmListItemView = new Geometrhythm.Views.RhythmListItemView({
      model: rhythm
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

  filterByCreator: function(event) {
    this.creatorId = $(event.currentTarget).val();
    if (this.creatorId === "") {
      this.creatorId = null;
      delete this.collection.filter.creator_id;
      delete this.potentialLikers.filter.creator_id;
    } else {
      this.collection.filter.creator_id = this.creatorId;
      this.potentialLikers.filter.creator_id = this.creatorId;
    }
    this.collection.fetchByFilter();
    this.potentialLikers.fetchByFilter();
    this.potentialCreators.fetchByFilter();
  },

  filterByLiker: function(event) {
    this.likerId = $(event.currentTarget).val()
    if (this.likerId === "") {
      this.likerId = null;
      delete this.collection.filter.liker_id;
      delete this.potentialCreators.filter.liker_id;
    } else {
      this.collection.filter.liker_id = this.likerId;
      this.potentialCreators.filter.liker_id = this.likerId;
    }
    this.collection.fetchByFilter();
    this.potentialCreators.fetchByFilter();
    this.potentialLikers.fetchByFilter();
  },

  filterByRhythmStr: function(event) {
    this.rhythmStr = $(event.currentTarget).val()
    if (this.rhythmStr === "") {
      this.rhythmStr = null;
      delete this.collection.filter.rhythm_str;
    } else {
      this.collection.filter.rhythm_str = this.rhythmStr;
    }
    this.collection.fetchByFilter();
    this.potentialCreators.fetchByFilter();
    this.potentialLikers.fetchByFilter();
  },

  selectRhythm: function(event){
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var selectedRhythm = this.collection.getOrFetch(id);
    this.model.set(selectedRhythm.attributes);
    $.cookie('_Geometrhythm_stored_rhythm', $(event.currentTarget).attr('rhythm-str'), { expires: 7, path: '/' });
    Backbone.history.navigate('/', {trigger: true})
  },

});
