Carbnd.Collections.Requests = Backbone.Collection.extend({
  model: Carbnd.Models.Request,
  url: function () {
    if (this.userId) {
      return "/api/" + userId + "requests"
    } else {
      return "/api/requests"
    }
  },

  initialize: function (models, options) {
    this.userId = options.userId
    this.carListing = options.carListing
  }
});

Carbnd.currentUserRequests = new Carbnd.Collections.Requests([], {});
