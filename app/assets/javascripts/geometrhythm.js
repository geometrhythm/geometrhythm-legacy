window.Geometrhythm = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#bb-core')
    new Geometrhythm.Routers.App({
      $rootEl: $rootEl
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Geometrhythm.initialize();
});
