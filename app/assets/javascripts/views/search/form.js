Carbnd.Views.SearchForm = Backbone.CompositeView.extend({
  template: JST["search/form"],

  events: {
    "change form": "handleFormSubmission"
  },

  handleFormSubmission: function (event) {
    event.preventDefault();
    var formParams = $(event.currentTarget).serializeJSON();
    Carbnd.searchParams.start_date = formParams.start_date;
    Carbnd.searchParams.end_date = formParams.end_date;
    Carbnd.searchParams.car_type = formParams.car_type;
    Carbnd.searchParams.rate_min = formParams.rate_min;
    Carbnd.searchParams.rate_max = formParams.rate_max;
    Carbnd.carListings.fetch({ data: Carbnd.searchParams });
    PubSub.publish('carListings query params updated', this);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
