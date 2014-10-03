Carbnd.Views.LayoutsCarousel = Backbone.CompositeView.extend({
  template: JST["layouts/carousel"],

  render: function () {
    var renderedContent = this.template({
      carListing: this.model
    })
    this.$el.html(renderedContent);
    $('.carousel').carousel({
      interval: false
    })

    return this;
  }
})
