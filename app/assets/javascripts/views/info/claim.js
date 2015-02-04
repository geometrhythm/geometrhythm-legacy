// Geometrhythm.Views.ClaimRhythm = Backbone.View.extend({
//   template: JST['info/claim'],
//
//   events: {
//     'click #claim-rhythm' : 'claimRhythm'
//   },
//
//   render: function() {
//     var content = this.template();
//     this.$el.html(content);
//     return this;
//   },
//
//   claimRhythm: function() {
//     var rhythmToClaim = new Geometrhythm.Models.Rhythm();
//     rhythmToClaim.set({
//       creator_id: $('#cur-user-id').val(),
//       rhythm_str: $('#current-rhythm').val()
//     });
//     rhythmToClaim.save();
//     Geometrhythm.Collections.rhythms.add(rhythmToClaim);
//   }
//
// });
