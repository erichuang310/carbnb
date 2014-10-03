Carbnd.Views.RequestPanel = Backbone.CompositeView.extend({
  template: JST["requests/panel"],


  events: {
    "click button": "updateRequest"
  },

  updateRequest: function (event) {
    var status = $(event.currentTarget).data("status");
    this.model.set({ status: status });
    this.model.save({}, {
      success: function (model, resp) {
      },
      error: function (model, resp) {
      }
    });
  },

  render: function () {
    var leaserId = this.model.carListing.get("leaser_id");
    var currentUserIsLeaser =
      leaserId && leaserId == Carbnd.currentUser.id ? true : false;

    var renderedContent = this.template({
      request: this.model,
      actions: currentUserIsLeaser
    });
    this.$el.html(renderedContent);

    return this;
  }
})
