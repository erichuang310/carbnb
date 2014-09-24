window.Carbnd = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Carbnd.Routers.MainRouter ({ $rootEl: $("body") });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Carbnd.initialize();
});
