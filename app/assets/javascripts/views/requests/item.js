Carbnd.Views.RequestItem = Backbone.CompositeView.extend({
  template: JST["requests/item"],
  className:"list-group-item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var renderedContent = this.template({
      request: this.model
    });
    this.$el.html(renderedContent);

    return this;
  }
});
