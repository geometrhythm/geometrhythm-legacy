Geometrhythm.Views.Root = Backbone.CompositeView.extend({

  template: JST['root'],

  events: {
    'submit form' : 'submitForm',
    'plugin-change .well' : 'updateModel'
    // 'click .js-modal-open' : 'openModalForm',
    // 'click .js-modal-close' : 'closeModalForm'
  },

  initialize: function() {
    //this.listenTo(this.model, 'change:rhythm_str', this.renderInfoTeaseView)
    //this.renderInfoTeaseView();
    this.listenTo(this.model, 'change:rhythm_str', this.renderInfoTeaseView)
    //this.swapInfoTeaseView();
    //this.swapCredsFormView();
  },

  render: function() {
    //debugger
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  updateModel: function(event) {

    this.model.set("rhythm_str", $('#current-rhythm').val());
    //this.model.save();
    console.log($('#current-rhythm').val());
  },

  renderInfoTeaseView: function(event) {
    console.log('its a me mario');
    console.log($('#current-rhythm').val());
    //debugger
    var that = this;
    var maybeMatchingRhythm = Geometrhythm.Collections.rhythms
      .find( function(rhythm){
        // debugger
        //hey, i can also refer to my RhythmRing namespace over in here to get the str
        //rather than hide it in a field on the page...
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
  },

  // swapInfoTeaseView: function() {
  //   console.log("made it into swap info teast view");
  //   this.addSubview('#bb-info-tease', infoTeaseView);
  // },
  //
  // swapCredsFormView: function() {
  //   console.log("made it into swap form view");
  //   this.addSubview('#bb-creds-form', credsFormView);
  // }

});

// openModalForm: function(event) {
//   event.preventDefault();
//   $(".modal").addClass("is-open");
// },
//
// closeModalForm: function(event) {
//   event.preventDefault();
//   $(".modal").removeClass("is-open");
// },

// submitForm: function(event) {
//   event.preventDefault();
//   console.log("hey hey hey");
//
// },
