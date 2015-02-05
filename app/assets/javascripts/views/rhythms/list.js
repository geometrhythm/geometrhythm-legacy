Geometrhythm.Views.RhythmsList = Backbone.CompositeView.extend({

  template: JST['rhythms/list'],

  events: {
    "click li.rhythm" : "selectRhythm",
    "change .creator" : "filterByCreator",
    "change .liker" : "filterByLiker"
  },

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addRhythmListItemView);
    this.listenTo(this.collection, 'remove', this.removeRhythmListItemView)

    this.users = options.users;
    this.likerId = options.liker;
    this.creatorId = options.creator;

    this.collection.each(function(rhythm) {
      if (!(this.likerId && this.likerId != rhythm.id)
        && !(this.creatorId && this.creatorId != rhythm.id)) {
        this.addRhythmListItemView(rhythm);
      }
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
    this.creatorId = $(event.currentTarget).val()
    var that = this;
    this.collection.each(function(rhythm) {
      if (rhythm.get("creator_id") != that.creatorId) {
        that.collection.remove(rhythm, {
          success: function() {
            that.collection.fetch();
          }
        });
        that.collection.fetch();
      }
    });
    this.render();
  },

  filterByLiker: function(event) {
    this.likerId = $(event.currentTarget).val()
    this.render();
  }

});
