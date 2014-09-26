Carbnd.Views.SearchIndex = Backbone.CompositeView.extend({
  template: JST["search/index"],
  id: "search-index",

  initialize: function () {
    this.addNavbar();
    this.addSidebar();
    this.mapOptions = {
      center: { lat: 37.7658465 , lng: -122.4422514},
      zoom: 12
    };
    this.infoWindows = [];

    var mapMarkerSubscriber = function(msg, carListingView){
      this.addMarker(carListingView);
    }.bind(this);

    var token = PubSub.subscribe('car-listings', mapMarkerSubscriber);
  },

  addMap: function () {
    this.map = new google.maps.Map(this.$("#map-canvas")[0], this.mapOptions);
    var that = this;
    google.maps.event.addListener(this.map, 'click', this.closeInfoWindows);

    google.maps.event.addListener(this.map, 'idle', function () {
      console.log(this.map.getBounds().getNorthEast());
      console.log(this.map.getBounds().getSouthWest());
    }.bind(this));

    window.WTF = this.map;
  },

  addMarker: function (carListingView) {
    var latLng = new google.maps.LatLng(
      carListingView.model.get("latitude"),
      carListingView.model.get("longitude")
    );

    var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: "omgWTFbbq"
    });

    var contentString = carListingView.$el.html();

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });

    this.infoWindows.push(infowindow);
    google.maps.event.addListener(marker, 'click', function() {
      this.closeInfoWindows();
      infowindow.open(this.map,marker);
    }.bind(this));
  },

  closeInfoWindows: function () {
    _(this.infoWindows).each(function (infoWindow) {
      infoWindow.close();
    });
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("#nav-bar", navbarView);
  },

  addSidebar: function () {
    var sidebarView = new Carbnd.Views.SearchSidebar();
    this.addSubview("#sidebar", sidebarView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.addMap();

    return this;
  }
});
