Carbnd.Views.CarListingPanel = Backbone.CompositeView.extend({
  template: JST["car_listings/panel"],

  render: function () {
    var renderedContent = this.template({
      carListing: this.model
    });
    this.$el.html(renderedContent);

    return this;
  }
})
