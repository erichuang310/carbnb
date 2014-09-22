Carbnd.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "signup": "signup"
  },

  initialize: function ($el) {
    this.$el = $el;
  },

  swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$el.html(this._currentView.render().$el)
  }
});
