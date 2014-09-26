Carbnd.Views.CarListingsIndex = Backbone.CompositeView.extend({
  template: JST["car_listings/index"],

  initialize: function () {
    this.listenTo(this.collection, "add", this.addCarListing);
    this.listenTo(this.collection, "remove", this.removeCarListing);

    var that = this;
    this.collection.each(function (carListing) {
      that.addCarListing(carListing);
    });
  },

  addCarListing: function (carListing) {
    var carListingView = new Carbnd.Views.CarListingItem({ model: carListing });
    this.addSubview("#car-listing-items", carListingView);
    PubSub.publish('car-listings', carListingView);
  },

  removeCarListing: function (carListing) {
    var subview = _.find(
      this.subviews("#car-listing-items"),
      function (subview) {
        return subview.model === carListing;
      }
    );
    this.removeSubview("#car-listing-items", subview);
  },

  render: function () {
    var renderedContent = this.template({ carListings: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
