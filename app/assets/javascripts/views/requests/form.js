Carbnd.Views.RequestForm = Backbone.CompositeView.extend({
  template: JST["requests/form"],
  className: "fixed col-xs-3",
  id: "new-request",

  initialize: function (options) {
    this.carListingId = options.carListingId
  },

  events: {
    "submit form": "handleFormSubmission"
  },

  handleFormSubmission: function () {
    event.preventDefault();
    var formParams = $(event.target).serializeJSON();
    formParams.request.car_listing_id = this.carListingId
    var request = new Carbnd.Models.Request(formParams);

    var that = this;
    request.save({}, {
      success: function (model, resp) {
        alert("worked");
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
