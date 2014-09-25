Carbnd.Views.LayoutsPanel = Backbone.CompositeView.extend({
  template: JST["layouts/panel"],
  tagName: "section",
  className: "row text-center",

  initialize: function (options) {
    this.title = options.title;
    this.body = options.body;
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
