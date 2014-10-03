Carbnd.Views.SearchMap = Backbone.CompositeView.extend({
  template: JST["search/map"],
  id: "map-view",

  initialize: function (options) {
    this.mapOptions = {
      center: {
        lat: options.lat,
        lng: options.lng
      },
      zoom: 12
    };
    this.infoWindows = [];
    this.markers = [];
    this.initMarkers();

    PubSub.subscribe('car-listings', this.addCarListing.bind(this));
    PubSub.subscribe('remove-car-listing', this.removeCarListing.bind(this));
    PubSub.subscribe('car-listing-mouseover', this.stretchMarker.bind(this));
    PubSub.subscribe('car-listing-mouseout', this.shrinkMarker.bind(this));
  },

  initMarkers: function () {
    this.activeMarker = {
      path: fontawesome.markers.MAP_MARKER,
      fillColor: "#3FB8AF",
      fillOpacity: 1,
      scale: 0.6,
      strokeWeight: 1.2,
      strokeColor: 'grey'
    };
    this.inactiveMarker = {
      path: fontawesome.markers.MAP_MARKER,
      fillColor: '#3FB8AF',
      fillOpacity: 1,
      scale: 0.6,
      strokeWeight: 1.2,
      strokeColor: 'grey'
    }
  },

  addMap: function () {
    this.map = new google.maps.Map(this.$("#map-canvas")[0], this.mapOptions);
    google.maps.event.addListener(this.map, 'click', this.closeInfoWindows.bind(this));

    google.maps.event.addListener(this.map, 'idle', function () {
      var northEastPoint = this.map.getBounds().getNorthEast();
      var southWestPoint = this.map.getBounds().getSouthWest();
      var topBorder = northEastPoint.lat();
      var rightBorder = northEastPoint.lng();
      var bottomBorder = southWestPoint.lat();
      var leftBorder = southWestPoint.lng();

      Carbnd.searchParams.lat = this.map.center.lat();
      Carbnd.searchParams.lng = this.map.center.lng();
      Carbnd.searchParams.top_border = topBorder;
      Carbnd.searchParams.bottom_border = bottomBorder;
      Carbnd.searchParams.left_border = leftBorder;
      Carbnd.searchParams.right_border = rightBorder;

      PubSub.publish('carListings query params updated', this);
    }.bind(this));
  },

  getBounds:function () {
    var northEastPoint = this.map.getBounds().getNorthEast();
    var southWestPoint = this.map.getBounds().getSouthWest();
    var top_bound = northEastPoint.lat();
    var right_bound = northEastPoint.lng();
    var bottom_bound = southWestPoint.lat();
    var leftBound = southWestPoint.lng();
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
        icon: this.inactiveMarker
    });

    this.markers.push(marker);
    marker.carListingId = carListingView.model.id

    var infoWindow = new google.maps.InfoWindow({
      content: carListingContent
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

    marker.setIcon(this.activeMarker);
  },

  removeCarListing: function (pubsubMsg, carListing) {
    var marker = _.find(
      this.markers,
      function (marker) {
        return carListing.id === marker.carListingId;
      }
    );
    marker.setMap(null);

    var i = this.markers.indexOf(marker);
    if (i !== -1) {
    	this.markers.splice(i, 1);
    }
  },

  shrinkMarker: function (pubSubMsg, carListingView) {
    var marker = _.find(
      this.markers,
      function (marker) {
        return carListingView.model.id === marker.carListingId;
      }
    );

    marker.setIcon(this.inactiveMarker);
  },

  closeInfoWindows: function () {
    _(this.infoWindows).each(function (infoWindow) {
      infoWindow.close();
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    setTimeout(function() {
      this.addMap();
      google.maps.event.trigger(this.map, "resize");
    }.bind(this), 0)

    return this;
  }
});
