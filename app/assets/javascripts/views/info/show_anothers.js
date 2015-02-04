Geometrhythm.Views.ShowAnothersRhythmsInfo = Backbone.View.extend({
  template: JST['info/show_anothers'],

  // events: {
  //   'click button.like' : 'likeThisRhythm'
  // },

  initialize: function() {
    this.listenTo(this.model, 'sync change:likers change:play_count', this.render)
  },

  render: function() {
    var content = this.template({
      rhythm: this.model
    })
    this.$el.html(content);
    return this;
  },
  //
  // likeThisRhythm: function() {
  //   var that = this;
  //   new Geometrhythm.Models.Like().save({
  //     rhythm_id: $('#cur-rhythm-id').val()
  //   }, { success: function() {
  //     console.log("I'm supposed to re-render");
  //     that.render();
  //   }});
  // }

});
