Carbnd.Views.SearchIndex = Backbone.View.extend({
  template: JST["search/index"],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
