Carbnd.Views.LayoutsCarousel = Backbone.CompositeView.extend({
  template: JST["layouts/carousel"],

  initCarousel: function () {
    $('.carousel').carousel({
      interval: false
    })
  },

  render: function () {
    var renderedContent = this.template({
      carListing: this.model
    });
    this.$el.html(renderedContent);

    return this;
  }
})
