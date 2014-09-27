Carbnd.Views.SearchMap = Backbone.CompositeView.extend({
  template: JST["search/map"],

  initialize: function () {
    this.mapOptions = {
      center: { lat: 37.7658465 , lng: -122.4422514 },
      zoom: 12
    };
    this.infoWindows = [];
    this.markers = [];

    PubSub.subscribe('car-listings', this.addCarListing.bind(this));
    PubSub.subscribe('car-listing-mouseover', this.stretchMarker.bind(this));
    PubSub.subscribe('car-listing-mouseout', this.shrinkMarker.bind(this));
  },

  addMap: function () {
    this.map = new google.maps.Map(this.$("#map-canvas")[0], this.mapOptions);
    google.maps.event.addListener(this.map, 'click', this.closeInfoWindows.bind(this));

    google.maps.event.addListener(this.map, 'idle', function () {
      var northEastPoint = this.map.getBounds().getNorthEast();
      var southWestPoint = this.map.getBounds().getSouthWest();
      var topBound = northEastPoint.lat();
      var rightBound = northEastPoint.lng();
      var bottomBound = southWestPoint.lat();
      var leftBound = southWestPoint.lng();
      console.log("Map settled. Here are the coords:");
      console.log("Top     = " + topBound);
      console.log("Right   = " + rightBound);
      console.log("Bottom  = " + bottomBound);
      console.log("Left    = " + leftBound);
    }.bind(this));
  },

  addCarListing: function (pubSubMsg, carListingView) {
    var lat = carListingView.model.get("latitude");
    var lng = carListingView.model.get("longitude");
    var carListingContent = carListingView.$el.html();

    var latLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: carListingView.model.get("title"),
        icon: {
            path: fontawesome.markers.CAR,
            scale: 0.3,
            strokeWeight: 0.2,
            strokeColor: 'black',
            strokeOpacity: 1,
            fillColor: carListingView.model.get("car_color"),
            fillOpacity: 0.8,
        },
    });

    this.markers.push(marker);
    marker.carListingId = carListingView.model.id

    var infoWindow = new google.maps.InfoWindow({
      content: carListingContent,
      maxWidth: 200
    });

    this.infoWindows.push(infoWindow);
    google.maps.event.addListener(marker, 'click', function() {
      this.closeInfoWindows();
      infoWindow.open(this.map, marker);
    }.bind(this));
  },

  stretchMarker: function (pubSubMsg, carListingView) {
    var marker = _.find(
      this.markers,
      function (marker) {
        return carListingView.model.id === marker.carListingId;
      }
    );
    marker.setIcon({
          path: fontawesome.markers.CAR,
          scale: 0.5,
          strokeWeight: 0.2,
          strokeColor: 'black',
          strokeOpacity: 1,
          fillColor: carListingView.model.get("car_color"),
          fillOpacity: 0.8,
    });
  },

  shrinkMarker: function (pubSubMsg, carListingView) {
    var marker = _.find(
      this.markers,
      function (marker) {
        return carListingView.model.id === marker.carListingId;
      }
    );
    marker.setIcon({
          path: fontawesome.markers.CAR,
          scale: 0.3,
          strokeWeight: 0.2,
          strokeColor: 'black',
          strokeOpacity: 1,
          fillColor: carListingView.model.get("car_color"),
          fillOpacity: 0.8,
    });
  },


  closeInfoWindows: function () {
    _(this.infoWindows).each(function (infoWindow) {
      infoWindow.close();
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.addMap();

    return this;
  }
});
