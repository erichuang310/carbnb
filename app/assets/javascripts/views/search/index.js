Carbnd.Views.SearchIndex = Backbone.CompositeView.extend({
  template: JST["search/index"],
  id: "search-index",

  initialize: function () {
    this.addNavbar();
    this.addMap();
    this.addSidebar();
    window.h = this;
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar({ id: "navbar" });
    this.addSubview("#navbar", navbarView);
  },

  addMap: function () {
    var mapView = new Carbnd.Views.SearchMap({ id: "map" });
    this.addSubview("#map", mapView)
  },

  addSidebar: function () {
    var sidebarView = new Carbnd.Views.SearchSidebar({ id: "sidebar" });
    this.addSubview("#sidebar", sidebarView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
