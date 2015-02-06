Geometrhythm.Collections.Rhythms = Backbone.Collection.extend({
  url: '/api/rhythms',
  model: Geometrhythm.Models.Rhythm,
  filter: { page: 1 },

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
    this.fetch({ data: this.filter });
  },

  // parse: function(response) {
  //   this.page_number = parseInt(response.page_number);
  //   this.total_pages = parseInt(response.total_pages);
  //   // deal with any nested resources on response.models and return
  //   return response.models;
  // }

});

Geometrhythm.Collections.rhythms = new Geometrhythm.Collections.Rhythms();
Geometrhythm.Collections.rhythms.fetch();
