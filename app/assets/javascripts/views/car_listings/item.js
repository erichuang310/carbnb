Carbnd.Views.CarListingItem = Backbone.CompositeView.extend({
  template: JST["car_listings/item"],
  className: "car-listing-item col-xs-6",

  initialize: function () {
    this.addCarousel();
  },

  events: {
    "mouseover .car-listing-mouseover": "handleMouseOver",
    "mouseout .car-listing-mouseover": "handleMouseOut"
  },

  handleMouseOver: function () {
    PubSub.publish('car-listing-mouseover', this);
  },

  handleMouseOut: function () {
    PubSub.publish('car-listing-mouseout', this);
  },

  addCarousel: function () {
    var carouselView = new Carbnd.Views.LayoutsCarousel({
      model: this.model
    })
    this.addSubview(".carousel-container", carouselView);
  },

  render: function () {
    var renderedContent = this.template({ carListing: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
