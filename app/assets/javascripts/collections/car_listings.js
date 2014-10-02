Carbnd.Collections.CarListings = Backbone.Collection.extend({
  model: Carbnd.Models.CarListing,
  url: function () {
    if (this.userId) {
      return "/api/" + userId + "car_listings"
    } else {
      return "/api/car_listings"
    }
  },

  initialize: function (models, options) {
    this.userId = options.userId
  },

  getOrFetch: function (id) {
    var carListings = this;
    var carListing = carListings.get(id);
    if (carListing) {
      carListing.fetch();
    } else {
      carListing = new Carbnd.Models.CarListing({ id: id });
      carListing.fetch({
        success: function () {
          carListings.add(carListing);
        }
      });
    }

    return carListing;
  }
});

Carbnd.carListings = new Carbnd.Collections.CarListings([], {});
Carbnd.currentUserCarListings = new Carbnd.Collections.CarListings([], {});
