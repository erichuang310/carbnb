Carbnd.Views.DashboardIndex = Backbone.CompositeView.extend({
  template: JST["dashboard/index"],

  initialize: function (options) {
    this.addNavbar();
    this.carListings = options.carListings;
    this.requests = options.requests;
    this.listenTo(this.carListings, "sync", this.addCarListingPanels);
    this.listenTo(this.requests, "sync", this.addRequestPanels);
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("#nav", navbarView);
  },

  addCarListingPanels: function () {
    var that = this;
    this.carListings.each( function (carListing) {
      var carListingPanelView = new Carbnd.Views.CarListingPanel({
        model: carListing
      });
      that.addSubview("#dashboard-car-listings", carListingPanelView);
    });
  },

  addRequestPanels: function () {
    var that = this;
    this.requests.each( function (request) {
      var requestPanelView = new Carbnd.Views.RequestPanel({
        model: request
      });
      that.addSubview("#dashboard-requests", requestPanelView);
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
})
