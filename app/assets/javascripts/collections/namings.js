Geometrhythm.Collections.Namings = Backbone.Collection.extend({
  url: '/api/naming',
  model: Geometrhythm.Models.Naming
});

Geometrhythm.Collections.namings = new Geometrhythm.Collections.Names();
Geometrhythm.Collections.namings.fetch();
