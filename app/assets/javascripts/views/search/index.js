Carbnd.Views.SearchIndex = Backbone.CompositeView.extend({
  template: JST["search/index"],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
