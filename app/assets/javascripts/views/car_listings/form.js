Carbnd.Views.CarListingsForm = Backbone.CompositeView.extend({
  template: JST["car_listings/form"],

  initialize: function () {
    this.cars = {};
    this.setupEdmundsApi();
  },

  events: {
    "change #car-listing-car-year": "getCarsByYear",
    "change #car-listing-car-make": "refreshCarModels",
    "submit": "handleFormSubmission"
  },

  setupEdmundsApi: function () {
    this.edmunds = new EDMUNDSAPI('j7n5jebq6a8ky3nh9j8gz7ng');
  },

  initCarYears: function () {
    var $carYearOptions = this.$("#car-listing-car-year");
    for (var year = 2000; year < 2016; year++ ) {
      $option = $("<option>");
      $option.attr("value", year);
      $option.html(year);
      $carYearOptions.append($option);
    }
  },

  getCarsByYear: function (event) {
    var year = $("#car-listing-car-year").val();
    var baseUrl = "/api/vehicle/v2/makes?";
    var options = {
      year: year,
      type: "used"
    };
    var that = this;
    this.edmunds.api(
      baseUrl,
      options,
      that.saveCars.bind(that),
      function (res) { console.log(res) }
    );
  },

  saveCars: function (res) {
    var that = this;
    _(res.makes).each(function (make) {
      that.cars[make.name] = [];
        _(make.models).each(function (model) {
          that.cars[make.name].push(model.name);
      })
    });
    this.refreshCarMakes();
  },

  refreshCarMakes: function (res) {
    var $carMakeOptions = this.$("#car-listing-car-make");
    $carMakeOptions.empty();
    var makes = Object.keys(this.cars);

    _(makes).each(function (make) {
      $option = $("<option>");
      $option.attr("value", make);
      $option.html(make);
      $carMakeOptions.append($option);
    });
    this.refreshCarModels();
  },

  refreshCarModels: function () {
    var $carModelOptions = this.$("#car-listing-car-model");
    $carModelOptions.empty();
    var make = this.$("#car-listing-car-make").val();
    var models = this.cars[make];

    _(models).each(function (model) {
      $option = $("<option>");
      $option.attr("value", model);
      $option.html(model);
      $carModelOptions.append($option);
    });
  },

  handleFormSubmission: function (event) {
    event.preventDefault();
    var formParams = $(event.target).serializeJSON();
    var carListing = new Carbnd.Models.CarListing(formParams);
    var that = this;
    carListing.save({}, {
      success: function (model, resp) {
        Backbone.history.navigate("#/car_listings/" + carListing.id)
      },
      error : function (model, resp) {
        if (resp.status !== 401) {
          that.addFlashErrors(resp.responseJSON);
        }
      }
    });
  },

  addFlashErrors: function (errors) {
    var flashMessageView = new Carbnd.Views.LayoutsFlashMessage({ messages: errors })
    this.$("#flash-message").html(flashMessageView.render().$el);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.initCarYears();
    this.getCarsByYear();

    return this;
  }
});
