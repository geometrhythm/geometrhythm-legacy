Geometrhythm.Collections.Names = Backbone.Collection.extend({
  url: '/api/names',
  model: Geometrhythm.Models.Name
});

Geometrhythm.Collections.names = new Geometrhythm.Collections.Names();
Geometrhythm.Collections.names.fetch();
