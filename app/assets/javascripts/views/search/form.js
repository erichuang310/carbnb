Carbnd.Views.SearchForm = Backbone.CompositeView.extend({
  template: JST["search/form"],

  events: {
    "submit form": "handleFormSubmission"
  },

  handleFormSubmission: function (event) {
    event.preventDefault();
    var formParams = $(event.target).serializeJSON();
    console.log(formParams);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
