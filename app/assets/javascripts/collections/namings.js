Geometrhythm.Collections.Namings = Backbone.Collection.extend({
  url: '/api/namings',
  model: Geometrhythm.Models.Naming
});

Geometrhythm.Collections.namings = new Geometrhythm.Collections.Namings();
Geometrhythm.Collections.namings.fetch();
