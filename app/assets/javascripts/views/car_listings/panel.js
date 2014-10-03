Carbnd.Views.CarListingPanel = Backbone.CompositeView.extend({
  template: JST["car_listings/panel"],

  render: function () {
    if (this.model.get("description").length > 130) {
      var carListingDescription =
        this.model.get("description").substring(0, 130) + "...";
    } else {
      var carListingDescription = this.model.get("description");
    }

    var renderedContent = this.template({
      carListing: this.model,
      carListingDescription: carListingDescription
    });
    this.$el.html(renderedContent);

    return this;
  }
})
