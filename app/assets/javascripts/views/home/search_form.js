Carbnd.Views.HomeSearchForm = Backbone.CompositeView.extend({
  template: JST["home/search_form"],

  initialize: function () {
    this.defaultLat = 37.7749295;             // San Francisco
    this.defaultLng = -122.41941550000001;    // San Francisco
    this.defaultLatRange = 0.8;
    this.defaultLngRange = 0.8;
  },

  events: {
    "submit form": "handleSubmit"
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var formParams = $(event.target).serializeJSON();
    this.processParams(formParams);
  },

  processParams: function codeAddress(searchParams) {
    Carbnd.searchParams = {};
    Carbnd.searchParams.start_date = searchParams.start_date;
    Carbnd.searchParams.end_date = searchParams.end_date;
    var geocoder = new google.maps.Geocoder();
    Carbnd.searchParams.lat = this.defaultLat;
    Carbnd.searchParams.lng = this.defaultLng;
    var that = this;

    geocoder.geocode( { 'address': searchParams.address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        delete searchParams.address
        Carbnd.searchParams.lat = results[0].geometry.location.lat();
        Carbnd.searchParams.lng = results[0].geometry.location.lng();
      }
      Carbnd.searchParams.left_border = results[0].geometry.bounds.getSouthWest().lng()
      Carbnd.searchParams.right_border = results[0].geometry.bounds.getNorthEast().lng()
      Carbnd.searchParams.top_border = results[0].geometry.bounds.getNorthEast().lat()
      Carbnd.searchParams.bottom_border = results[0].geometry.bounds.getSouthWest().lat()



      Backbone.history.navigate('#/car_listings');
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    setTimeout(function () {
      $(".date-picker").datepicker({ minDate: 0 });
      $("#address").geocomplete();
    }, 0);

    return this;
  }
});
