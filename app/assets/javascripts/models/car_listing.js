Carbnd.Models.CarListing = Backbone.Model.extend({
  urlRoot: "/api/car_listings",

  requests: function () {
    if(!this._requests) {
      this._requests = new Carbnd.Collections.Requests([], { carListing: this });
    }

    return this._requests;
  },

  parse: function (response) {
    var carListing = this;

    if(response.requests) {
      this.requests().set(response.requests, { parse: true });
      this.requests().each( function (request) {
        request.carListing = carListing;
      });
      delete response.requests;
    }

    return response;
  }
})
