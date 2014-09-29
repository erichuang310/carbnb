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
    var lat = this.defaultLat;
    var lng = this.defaultLng;
    var that = this;

    geocoder.geocode( { 'address': searchParams.address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        delete searchParams.address
        lat = results[0].geometry.location.k;
        lng = results[0].geometry.location.B;
      }
      Carbnd.searchParams.left_border = lat - that.defaultLatRange;
      Carbnd.searchParams.right_border = lat + that.defaultLatRange;
      Carbnd.searchParams.top_border = lng + that.defaultLngRange;
      Carbnd.searchParams.bottom_border = lng - that.defaultLngRange;
      Backbone.history.navigate('#/car_listings');
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
