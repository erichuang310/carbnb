Carbnd.Views.CarListingsForm = Backbone.CompositeView.extend({
  template: JST["car_listings/form"],

  initialize: function () {
    this.setupEdmundsApi();
  },

  events: {
    "change #car-year": "requestCarModels"
  },

  setupEdmundsApi: function () {
    this.edmunds = new EDMUNDSAPI('j7n5jebq6a8ky3nh9j8gz7ng');
  },

  requestCarModels: function (event) {
    console.log("sds");
    var year = $(event.target).val();
    var baseUrl = "/api/vehicle/v2/makes?"
    console.log(year);
    var options = {
      state: "used",
      year: year
    }
    var that = this;
    this.edmunds.api(baseUrl, options, that.handleYearChange.bind(that), function (res) { console.log(res) } );
  },

  handleYearChange: function (res) {
    console.log("Handling year change");
    var $carMakeOptions = this.$("#car-makes");
    $carMakeOptions.empty();

    var makes = _(res.makes).pluck("name");
    _(makes).each(function (make) {
      console.log(make);
      $option = $("<option>");
      $option.attr("value", make);
      $option.html(make);
      $carMakeOptions.append($option);
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});

//
//
//
// <script>
//     window.sdkAsyncInit = function() {
//       // Instantiate the SDK
//       var res = new EDMUNDSAPI('j7n5jebq6a8ky3nh9j8gz7ng');
//       // Optional parameters
//       var options = {};
//       // Callback function to be called when the API response is returned
//       function success(res) {
//         var makes = _(res.makes).pluck("name");
//         _(makes).each(function (make) {
//           $option = $("<option>");
//           $options.attr("value", make);
//           $options.html(make);
//           console.log(make);
//         });
//       }
//       // Oops, Houston we have a problem!
//       function fail(data) {
//         console.log(data);
//       }
//       // Fire the API call
//       res.api('/api/vehicle/v2/makes', options, success, fail);
//       // Additional initialization code such as
//       // adding Event Listeners goes here
//     };
//   // Load the SDK asynchronously
//   (function(d, s, id){
//     var js, sdkjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "/assets/edmunds.api.sdk.js";
//     sdkjs.parentNode.insertBefore(js, sdkjs);
//   }(document, 'script', 'edmunds-jssdk'));
//   </script>
