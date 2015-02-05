Geometrhythm.Views.RhythmsList = Backbone.CompositeView.extend({

  template: JST['rhythms/list'],

  events: {
    "click li.rhythm" : "selectRhythm",
    "change .creator" : "filterByCreator",
    "change .liker" : "filterByLiker",
    "change .rhythm-str" : "filterByRhythmStr",
    "change .rhythm-id" : "filterByRhythmId"
  },

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addRhythmListItemView);
    this.listenTo(this.collection, 'remove', this.removeRhythmListItemView)

    this.users = options.users;
    this.likerId = options.liker;
    this.creatorId = options.creator;

    this.collection.each(function(rhythm) {
      this.addRhythmListItemView(rhythm);
    }.bind(this))

  },

  render: function() {
    var content = this.template({
      rhythms: this.collection,
      users: this.users,
      cur_rhythm: this.model,
      liker: this.likerId,
      creator: this.creatorId
    })
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  selectRhythm: function(event){
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var selectedRhythm = this.collection.getOrFetch(id);
    this.model.set(selectedRhythm.attributes);
    $.cookie('_Geometrhythm_stored_rhythm', $(event.currentTarget).attr('rhythm-str'), { expires: 7, path: '/' });
    Backbone.history.navigate('/', {trigger: true})
  },

  addRhythmListItemView: function(rhythm) {
    var rhythmListItemView = new Geometrhythm.Views.RhythmListItemView({
      model: rhythm
    });
    this.addSubview('ol.subview-version', rhythmListItemView);
  },

  removeRhythmListItemView: function(rhythm) {
    var subviews = this.subviews('ol.subview-version');
    var subviewToRemove = _(subviews).find( function(sv){
      return sv.model.id == rhythm.id;
    });
    this.removeSubview('ol.subview-version', subviewToRemove);
  },

  filterByCreator: function(event) {
    if ($(event.currentTarget).val() === "") {
      this.creatorId = null;
      this.collection.filter.creator_id = null;
      this.collection.fetch();
    } else {
      this.creatorId = $(event.currentTarget).val();
      this.collection.filter.creator_id = this.creatorId;
      this.collection.fetchByFilter();
      debugger
    }

    // this.collection.fetch({ data: { creator_id: this.creatorId } });
  },

  filterByLiker: function(event) {
    this.likerId = $(event.currentTarget).val()
    this.collection.filter.liker_id = this.likerId;
    this.collection.fetchByFilter();
  },

  filterByRhythmStr: function(event) {
    console.log("filtering by rhythm str");
    this.rhythmStr = $(event.currentTarget).val()
    this.collection.filter.rhythm_str = this.rhythmStr;
    this.collection.fetchByFilter();
    debugger
  },

  filterByRhythmId: function(event) {
    console.log("filtering by rhythm id");
    this.filterId = $(event.currentTarget).val()
    this.collection.filter.id = this.filterId;
    this.collection.fetchByFilter();
    debugger
  },

});
