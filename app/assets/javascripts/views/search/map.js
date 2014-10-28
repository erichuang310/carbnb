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
    this.markers = {};
    this.infoWindow = undefined;
    this.activeMarker = undefined;

    PubSub.subscribe('add-car-listing', this.addCarListing.bind(this));
    PubSub.subscribe('remove-car-listing', this.removeCarListing.bind(this));
    PubSub.subscribe('car-listing-mouseover', this.highlightMarker.bind(this));
    PubSub.subscribe('car-listing-mouseout', this.unhighlightMarker.bind(this));
  },

  inactiveIcon: {
    path: fontawesome.markers.MAP_MARKER,
    fillColor: "grey",
    fillOpacity: 1,
    scale: 0.6,
    strokeWeight: 1.2,
    strokeColor: 'grey'
  },

  activeIcon: {
    path: fontawesome.markers.MAP_MARKER,
    fillColor: '#3FB8AF',
    fillOpacity: 1,
    scale: 0.6,
    strokeWeight: 1.2,
    strokeColor: 'grey'
  },

  addMap: function () {
    this.map = new google.maps.Map(this.$("#map-canvas")[0], this.mapOptions);

    google.maps.event.addListener(
      this.map,
      'click',
      this.deactivateActiveCarListing.bind(this)
    );

    google.maps.event.addListener(
      this.map,
      'idle',
      function () {
        this.setSearchParams();
        PubSub.publish('updated-car-listings-params', this);
      }.bind(this)
    );
  },

  setSearchParams:function () {
    var northEastPoint = this.map.getBounds().getNorthEast();
    var southWestPoint = this.map.getBounds().getSouthWest();

    Carbnd.searchParams.lat = this.map.center.lat();
    Carbnd.searchParams.lng = this.map.center.lng();
    Carbnd.searchParams.ne_lat = northEastPoint.lat();
    Carbnd.searchParams.sw_lat = southWestPoint.lat();
    Carbnd.searchParams.ne_lng = northEastPoint.lng();
    Carbnd.searchParams.sw_lng = southWestPoint.lng();
  },

  addCarListing: function (pubSubMsg, carListingView) {
    var carListingId = carListingView.model.id;
    var lat = carListingView.model.get("latitude");
    var lng = carListingView.model.get("longitude");
    var carListingContent = carListingView.$el.html();
    var latLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: this.inactiveIcon
    });

    google.maps.event.addListener(
      marker,
      'click', this.activateCarListing(carListingContent, marker).bind(this)
    );
    this.markers[carListingId] = marker;
  },

  removeCarListing: function (pubsubMsg, carListing) {
    var marker = this.markers[carListing.id];
    marker.setMap(null);
    delete this.markers[carListing.id]
  },

  activateCarListing: function (carListingContent, marker) {
    return function () {
      this.deactivateActiveCarListing();

      this.infoWindow = new google.maps.InfoWindow({
        content: carListingContent
      });

      var that = this;
      google.maps.event.addListener(
        that.infoWindow,
        'closeclick',
        function () {
          that.deactivateActiveCarListing();
        }
      );

      this.infoWindow.open(this.map, marker);
      marker.setIcon(this.activeIcon);
      this.activeMarker = marker;
    }.bind(this);
  },

  deactivateActiveCarListing: function () {
    if (this.infoWindow) {
      this.infoWindow.close();
      this.infoWindow = null;
    }
    if (this.activeMarker) {
      this.activeMarker.setIcon(this.inactiveIcon);
      this.activeMarker = null;
    }
  },

  highlightMarker: function (pubSubMsg, carListingView) {
    var carListingId = carListingView.model.id;
    var marker = this.markers[carListingId];
    marker.setIcon(this.activeIcon);
  },

  unhighlightMarker: function (pubSubMsg, carListingView) {
    var carListingId = carListingView.model.id;
    var marker = this.markers[carListingId];
    marker.setIcon(this.inactiveIcon);
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
