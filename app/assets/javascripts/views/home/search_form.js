Carbnd.Views.HomeSearchForm = Backbone.CompositeView.extend({
  template: JST["home/search_form"],
  id: "home-search",

  events: {
    "submit form": "handleSearch"
  },

  handleSearch: function (event) {
    event.preventDefault();
    var formParams = $(event.target).serializeJSON();
    //TODO
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
