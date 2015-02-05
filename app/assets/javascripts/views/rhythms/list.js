Geometrhythm.Views.RhythmsList = Backbone.CompositeView.extend({

  template: JST['rhythms/list'],
  events: {
    "click li.rhythm" : "selectRhythm",
    "change .portfolio" : "render", //it's overwriting the selector too, haha...
    "change .collection" : "render"
  },

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.users = options.users;
  },

  render: function() {
    // debugger
    var content = this.template({
      rhythms: this.collection,
      users: this.users,
      cur_rhythm: this.model
    })
    this.$el.html(content);
    return this;
  },

  selectRhythm: function(event){
    event.preventDefault();
    var id = $(event.currentTarget).data('id');
    var selectedRhythm = this.collection.getOrFetch(id);
    this.model.set(selectedRhythm.attributes);
    $.removeCookie('_Geometrhythm_stored_rhythm', { expires: 7, path: '/' });
    Backbone.history.navigate('/', {trigger: true})
  },

  // filterPortfolio: function(event) {
  //   console.log("what up portfolio filter");
  // },
  //
  // filterCollection: function(event) {
  //   console.log("what up collection filter");
  // }

});
