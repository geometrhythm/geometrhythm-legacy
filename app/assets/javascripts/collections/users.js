Geometrhythm.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',
  model: Geometrhythm.Models.User,
  filter: {},

  fetchByFilter: function() {
    this.fetch({ data: this.filter });
  }

});

Geometrhythm.Collections.potentialCreators = new Geometrhythm.Collections.Users();
Geometrhythm.Collections.potentialCreators.fetch();

Geometrhythm.Collections.potentialLikers = new Geometrhythm.Collections.Users();
Geometrhythm.Collections.potentialLikers.fetch();
