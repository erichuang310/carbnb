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
        that.$("#flash-message").empty();
        that.addFlashMessage(resp.responseJSON, "alert-success");
        that.$("input[type=submit]").val("Requested!")
        that.$("input[type=submit]").css("color", "green");
      },
      error : function (model, resp) {
        that.addFlashMessage(resp.responseJSON, "alert-danger");
      }
    });
  },

  addFlashMessage: function (errors, flashClass) {
    var flashMessageView = new Carbnd.Views.LayoutsFlashMessage({
      messages: errors,
      flashClass: flashClass
    })
    this.$("#flash-message").html(flashMessageView.render().$el);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
});
