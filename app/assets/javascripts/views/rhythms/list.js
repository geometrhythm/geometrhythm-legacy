Geometrhythm.Views.RhythmsList = Backbone.View.extend({

  template: JST['rhythms/list'],
  events: {
    "click .rhythm": "selectRhythm"
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
    Backbone.history.navigate('/', {trigger: true})
  }

});
