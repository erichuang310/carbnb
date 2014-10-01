Carbnd.Views.RequestForm = Backbone.CompositeView.extend({
  template: JST["requests/form"],

  initialize: function (options) {
    this.carListing = options.carListing
  },

  events: {
    "submit form": "handleFormSubmission"
  },

  handleFormSubmission: function () {
    event.preventDefault();
    var formParams = $(event.target).serializeJSON();
    formParams.request.car_listing_id = this.carListing.id;
    var request = new Carbnd.Models.Request(formParams);

    var that = this;
    request.save({}, {
      success: function (model, resp) {
        debugger;
      },
      error : function (model, resp) {
        alert(resp.responseJSON)
      }
    });

  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
