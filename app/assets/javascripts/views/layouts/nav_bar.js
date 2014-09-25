Carbnd.Views.LayoutsNavBar = Backbone.CompositeView.extend({
  template: JST["layouts/navbar"],
  tagName: "nav",

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
