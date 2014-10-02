Carbnd.Views.RequestPanel = Backbone.CompositeView.extend({
  template: JST["requests/panel"],

  render: function () {
    var renderedContent = this.template({
      request: this.model
    });
    this.$el.html(renderedContent);

    return this;
  }
})
