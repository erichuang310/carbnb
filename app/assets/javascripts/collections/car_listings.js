Carbnd.Models.CarListings = Backbone.Model.extend({
  model: Carbnd.Models.CarListing,
  url: "/api/car_listings",

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
