window.Carbnd = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Carbnd.Routers.MainRouter ({
      $rootEl: $("#content")
    });
    Backbone.history.start();
  }
};
