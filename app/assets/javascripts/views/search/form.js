Carbnd.Views.SearchForm = Backbone.CompositeView.extend({
  template: JST["search/form"],

  initialize: function (options) {
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
