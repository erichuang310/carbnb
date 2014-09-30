Carbnd.Views.HomeSearchForm = Backbone.CompositeView.extend({
  template: JST['home/search_form'],

  events: {
    'submit form': 'handleSubmit'
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var formParams = $(event.currentTarget).serializeJSON();
    Carbnd.searchParams = formParams;
    Carbnd.searchParams.address = Carbnd.searchParams.address || 'San Francisco';
    this.geocodeAddress(function () {
      Backbone.history.navigate('#/car_listings');
    });
  },

  geocodeAddress: function (callback) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': Carbnd.searchParams.address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        Carbnd.searchParams.lat = results[0].geometry.location.lat();
        Carbnd.searchParams.lng = results[0].geometry.location.lng();
        Carbnd.searchParams.left_border = results[0].geometry.bounds.getSouthWest().lng()
        Carbnd.searchParams.right_border = results[0].geometry.bounds.getNorthEast().lng()
        Carbnd.searchParams.top_border = results[0].geometry.bounds.getNorthEast().lat()
        Carbnd.searchParams.bottom_border = results[0].geometry.bounds.getSouthWest().lat()
        callback();
      }
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.$('.date-picker').datepicker({ minDate: 0 });
    this.$('#address').geocomplete();

    return this;
  }
});
