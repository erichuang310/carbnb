window.Carbnd = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Carbnd.Routers.MainRouter ({ $rootEl: $("#backbone-container") });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Carbnd.initialize();
});
