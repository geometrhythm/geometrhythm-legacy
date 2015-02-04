Geometrhythm.Views.SignUpToClaimRhythm = Backbone.View.extend({
  template: JST['info/sign_up_to_claim'],

  events: {
    'click #sign-up-to-claim-rhythm' : 'signUpToClaimRhythm'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  signUpToClaimRhythm: function() {
    window.storedRhythm = $('#current-rhythm').val();
    //see root.js too... wish i could get to the session from here!
    window.location.href = '/users/new'
  }

});
