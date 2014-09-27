Carbnd.Views.SearchMap = Backbone.CompositeView.extend({
  template: JST["search/map"],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
