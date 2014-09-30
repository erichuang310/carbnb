Carbnd.Views.CarListingsIndex = Backbone.CompositeView.extend({
  template: JST["car_listings/index"],
  // className: "container-fluid",
  updateCarListings: function () {
    Carbnd.carListings.fetch({ data: Carbnd.searchParams })
  },

  initialize: function () {
    this.addNavbar();

    var token = PubSub.subscribe( 'carListings query params updated', this.updateCarListings );
    this.addMap();
    this.addSearch();

    this.listenTo(this.collection, "add", this.addCarListing);
    this.listenTo(this.collection, "remove", this.removeCarListing);

    var that = this;
    this.collection.each(function (carListing) {
      that.addCarListing(carListing);
    });
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("#nav", navbarView);
  },

  addMap: function () {
    var mapView = new Carbnd.Views.SearchMap();
    this.addSubview("#map-container", mapView);
  },

  addSearch: function () {
    var searchFormView = new Carbnd.Views.SearchForm();
    this.addSubview("#search", searchFormView);
  },

  addCarListing: function (carListing) {
    var carListingView = new Carbnd.Views.CarListingItem({ model: carListing });
    this.addSubview("#car-listings", carListingView);
    PubSub.publish('car-listings', carListingView);
  },

  removeCarListing: function (carListing) {
    var subview = _.find(
      this.subviews("#car-listings"),
      function (subview) {
        return subview.model === carListing;
      }
    );
    this.removeSubview("#car-listings", subview);
  },

  render: function () {
    var renderedContent = this.template({ carListings: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
