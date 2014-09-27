Carbnd.Views.CarListingItem = Backbone.CompositeView.extend({
  template: JST["car_listings/item"],
  className: "car-listing-item col-xs-6",

  events: {
    "mouseover .car-listing-mouseover": "handleMouseOver",
    "mouseout .car-listing-mouseover": "handleMouseOut"
  },

  handleMouseOver: function () {
    PubSub.publish('car-listing-mouseover', this);
  },

  handleMouseOut: function () {
    console.log("Handling Mouse Out");
    PubSub.publish('car-listing-mouseout', this);
  },

  render: function () {
    var renderedContent = this.template({ carListing: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
