Carbnd.Views.CarListingShow = Backbone.CompositeView.extend({
  template: JST["car_listings/show"],

  render: function () {
    var renderedContent = this.template({
      carListing: this.model
    });
    this.$el.html(renderedContent);

    return this;
  }
});
