Carbnd.Views.CarListingItem = Backbone.CompositeView.extend({
  template: JST["car_listings/item"],
  className: "car-listing-item col-xs-6",

  render: function () {
    var renderedContent = this.template({ carListing: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
