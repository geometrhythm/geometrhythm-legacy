Geometrhythm.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',
  model: Geometrhythm.Models.User,

});

Geometrhythm.Collections.users = new Geometrhythm.Collections.Users();
Geometrhythm.Collections.users.fetch();
