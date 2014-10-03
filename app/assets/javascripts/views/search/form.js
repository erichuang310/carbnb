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
    Carbnd.searchParams.rate_min = this.$("#rate-min").html().trim().substring(1)
    Carbnd.searchParams.rate_max = this.$("#rate-max").html().trim().substring(1)
    Carbnd.carListings.fetch({ data: Carbnd.searchParams });
    PubSub.publish('carListings query params updated', this);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    setTimeout(function () {
      this.$('.date-picker').datepicker({
        startDate: new Date(),
        autoclose: true
      });
      this.$('#address').geocomplete();
    }, 0);

    return this;
  }
});
