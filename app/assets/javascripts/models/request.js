Carbnd.Models.Request = Backbone.Model.extend({
  urlRoot: "/api/requests",

  parse: function (response) {
    if(response.car_listing) {
      this.carListing = new Carbnd.Models.CarListing(response.car_listing);
      delete response.car_listing;
    }
    return response;
  }
});
