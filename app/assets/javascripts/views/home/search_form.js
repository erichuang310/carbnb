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
        Carbnd.searchParams.sw_lng = results[0].geometry.bounds.getSouthWest().lng()
        Carbnd.searchParams.ne_lng = results[0].geometry.bounds.getNorthEast().lng()
        Carbnd.searchParams.ne_lat = results[0].geometry.bounds.getNorthEast().lat()
        Carbnd.searchParams.sw_lat = results[0].geometry.bounds.getSouthWest().lat()

        callback();
      }
    });
  },

  initDatePickers: function () {
    setTimeout( function () {
      $startDatePicker = this.$('input[name="start_date"]').datepicker({
        startDate: new Date(),
        autoclose: true
      });
      $endDatePicker = this.$('input[name="end_date"]').datepicker({
        startDate: new Date(),
        autoclose: true
      });
      $startDatePicker.on("changeDate", function (e) {
        $endDatePicker.datepicker("setStartDate", $startDatePicker.datepicker("getDate"))
      });
    }, 0);
  },

  initPopover: function () {
    this.$("#address")
          .popover({
            title: 'Pro Tip',
            content: "Fake listings only exists in SF.",
            placement: "top"
          })
          .blur(function () {
              $(this).popover('hide');
          });
  },


  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    setTimeout( function () {
      this.initDatePickers();
      this.initPopover();
    }.bind(this), 0)

    return this;
  }
});
