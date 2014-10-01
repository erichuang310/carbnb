Carbnd.Views.RequestItem = Backbone.CompositeView.extend({
  template: JST["requests/item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  events: {
    "click button": "updateRequest"
  },

  updateRequest: function (event) {
    console.log("WTF");
    var status = $(event.currentTarget).data("status");
    // console.log(status);
    this.model.set({ status: status });
    this.model.save({}, {
      success: function (model, resp) {
        console.log("Success");
      },
      error: function (model, resp) {
        console.log("Error");
      }
    });
  },


  render: function () {
    var renderedContent = this.template({
      request: this.model
    });
    this.$el.html(renderedContent);

    return this;
  }
});
