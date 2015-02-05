Geometrhythm.Views.RhythmsList = Backbone.View.extend({

  template: JST['rhythms/list'],
  events: {
    "click li.rhythm" : "selectRhythm",
    // "change input.portfolio" : "filterPortfolio",
    // "change input.collection" : "filterCollection"
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    var content = this.template({
      rhythms: this.collection
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
