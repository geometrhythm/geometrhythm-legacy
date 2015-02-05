Geometrhythm.Collections.Rhythms = Backbone.Collection.extend({
  url: '/api/rhythms',
  model: Geometrhythm.Models.Rhythm,

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

  // byCreator: function(creator_id) {
  //   var filtered = this.filter(function(rhythm) {
  //     return rhythm.get("creator_id") === creator_id;
  //     });
  //   return new Geometrhythm.Collections.Rhythms(filtered);
  // }

});

Geometrhythm.Collections.rhythms = new Geometrhythm.Collections.Rhythms();
Geometrhythm.Collections.rhythms.fetch();
