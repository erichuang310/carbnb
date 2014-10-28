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
    PubSub.publish('updated-car-listings-params', this);
  },

  initDatePickers: function () {
    setTimeout( function () {
      $startDatePicker = $('input[name="start_date"]').datepicker({
        startDate: new Date(),
        autoclose: true
      });
      $endDatePicker = $('input[name="end_date"]').datepicker({
        startDate: new Date(),
        autoclose: true
      });
      $startDatePicker.on("changeDate", function (e) {
        $endDatePicker.datepicker("setStartDate", $startDatePicker.datepicker("getDate"))
      });
    }, 0);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.initDatePickers();
    return this;
  }
});
