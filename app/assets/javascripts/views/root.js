Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    'submit form' : 'submitForm',
    'plugin-change .well' : 'updateModel'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:rhythm_str', this.renderInfoTeaseView)
  },

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  updateModel: function(event) {
    this.model.set("rhythm_str", $('#current-rhythm').val());
  },

  renderInfoTeaseView: function(event) {
    var that = this;
    var maybeMatchingRhythm = Geometrhythm.Collections.rhythms
      .find( function(rhythm){
        return rhythm.get("rhythm_str") === $('#current-rhythm').val();
      }
    );
    var content = "Hey, you've found a new one!"
    if (maybeMatchingRhythm) {
      content = "Already in db! id: " + maybeMatchingRhythm.id;
    }
    $('#bb-info-tease').html(content);
  },

});
