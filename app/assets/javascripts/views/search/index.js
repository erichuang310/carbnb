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
  },

  addMap: function () {
    this.map = new google.maps.Map(this.$("#map-canvas")[0], this.mapOptions);
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
