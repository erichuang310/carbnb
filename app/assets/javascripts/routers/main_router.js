Carbnd.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "homeIndex",
    "new_car_listing": "carListingsNew",
    "car_listings/:id": "carListingShow",
    "search": "searchIndex"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  homeIndex: function () {
    var homeIndexView = new Carbnd.Views.HomeIndex();
    this._swapView(homeIndexView);
  },

  carListingsNew: function () {
    var carListingsNewView = new Carbnd.Views.CarListingsNew();
    this._swapView(carListingsNewView);
  },

  carListingShow: function (id) {
    var carListing = Carbnd.carListings.getOrFetch(id);
    var carListingShowView = new Carbnd.Views.CarListingShow({
      model: carListing
    });
    this._swapView(carListingShowView);
  },

  searchIndex: function () {
    var searchIndexView = Carbnd.Views.SearchIndex();
    this._swapView(searchIndexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el)
  }
});
