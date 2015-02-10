Geometrhythm.Collections.Rhythms = Backbone.Collection.extend({
  url: '/api/rhythms',
  model: Geometrhythm.Models.Rhythm,
  filter: { },

  fetchByFilter: function(dontRemove) {
    var remove = dontRemove || false;
    this.fetch({ data: this.filter, remove: !(remove) });
  },

  parse: function(response) {
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.models;
  }
});

Geometrhythm.Collections.rhythms = new Geometrhythm.Collections.Rhythms();
