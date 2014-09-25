Carbnd.Views.LayoutsFooter = Backbone.CompositeView.extend({
  template: JST["layouts/footer"],
  tagName: "footer",
  id: "future-footer",
  className: "row",

  initialize: function (options) {
    this.$el.attr({
      id: options.id
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
