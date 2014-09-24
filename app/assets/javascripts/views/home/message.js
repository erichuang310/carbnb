Carbnd.Views.HomeMessage = Backbone.CompositeView.extend({
  template: JST["home/message"],
  tagName: "section",
  className: "row",
  id: "message",

  render: function () {
    var renderedContent = this.template({
      title: "Vroom Vroom",
      body: "Discover automotives that enthusiasts <font color=\"red\">love</font>."
    });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }

});
