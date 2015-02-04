Geometrhythm.Views.Root = Backbone.View.extend({

  template: JST['root'],

  events: {
    'submit form' : 'submitTest'
  },

  render: function() {
    //debugger
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  },

  submitTest: function(event) {
    event.preventDefault();
    console.log("hey hey hey");
  }

});
