Carbnd.Views.LayoutsFooter = Backbone.CompositeView.extend({
  template: JST["layouts/footer"],
  tagName: "footer",

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
