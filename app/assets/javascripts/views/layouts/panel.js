Carbnd.Views.LayoutsPanel = Backbone.CompositeView.extend({
  template: JST["layouts/panel"],
  tagName: "div",
  id: "future-id",
  className: "row text-center",

  initialize: function (options) {
    this.title = options.title;
    this.body = options.body;
    this.$el.attr({
      id: this.id
    })
  },

  render: function () {
    var renderedContent = this.template({
      title: this.title,
      body: this.body
    });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
