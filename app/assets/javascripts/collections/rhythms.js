Geometrhythm.Collections.Rhythms = Backbone.Collection.extend({
  url: '/api/rhythms',
  model: Geometrhythm.Models.Rhythm,
  filter: {},

  getOrFetch: function(id) {
    var model = this.get(id);
    var rhythms = this;
    if (!model) {
      model = new Geometrhythm.Models.Rhythm( { id: id } );
      model.fetch({
        success: function() {
          rhythms.add(model);
        }
      });
    } else {
      model.fetch();
    }

    return model;
  },

  fetchByFilter: function() {
    // debugger
    this.fetch({ data: this.filter });
  }

});

Geometrhythm.Collections.rhythms = new Geometrhythm.Collections.Rhythms();
Geometrhythm.Collections.rhythms.fetch();
