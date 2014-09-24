Carbnd.Views.HomeFooter = Backbone.CompositeView.extend({
  template: JST["home/footer"],
  tagName: "footer",
  id: "home",
  className: "row",

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
