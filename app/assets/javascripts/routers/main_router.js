Carbnd.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "homeIndex"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  homeIndex: function () {
    var homeIndexView = new Carbnd.Views.HomeIndex();
    this._swapView(homeIndexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el)
  }
});
