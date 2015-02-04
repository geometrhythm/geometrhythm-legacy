Geometrhythm.Views.Root = Backbone.View.extend({

  template: JST['root'],

  events: {
    'submit form' : 'submitTest',
    'plugin-change .well' : 'updateModel'
  },

  initialize: function() {
    //this.listenTo(this.model, 'change:rhythm_str', this.renderInfoTeaseView)
    this.listenTo(this.model, 'change:rhythm_str', this.renderInfoTeaseView)
  },

  render: function() {
    //debugger
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  },

  //hey, i can also refer to my RhythmRing namespace over in here to get the str
  //rather than hide it in a field on the page...

  // submitTest: function(event) {
  //   event.preventDefault();
  //   console.log("hey hey hey");
  // },

  updateModel: function(event) {

    this.model.set("rhythm_str", $('#current-rhythm').val());
    //this.model.save();
    console.log($('#current-rhythm').val());
  },

  renderInfoTeaseView: function(event) {
    console.log('its a me mario');

    //debugger
    var that = this;
    var maybeMatchingRhythm = Geometrhythm.Collections.rhythms
      .find( function(rhythm){
        // debugger
        return rhythm.get("rhythm_str") === $('#current-rhythm').val();
      }
    );
    // debugger
    var content = "Hey, you've found a new one!"
    if (maybeMatchingRhythm) {
      content = "Already in db! id: " + maybeMatchingRhythm.id;
      //Backbone.history.navigate("/api/rhythms/" + id, { trigger: true });
      //JUST REFRESH THE SUBVIEW :)
    }

    $('#bb-info-tease').html(content);
  }

});
