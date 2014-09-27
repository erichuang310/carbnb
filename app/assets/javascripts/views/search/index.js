Carbnd.Views.SearchIndex = Backbone.CompositeView.extend({
  template: JST["search/index"],
  id: "search-index",

  initialize: function () {
    // this.addNavbar();
    this.addMap();
    this.addSidebar();
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("#nav-bar", navbarView);
  },

  addMap: function () {
    var mapView = new Carbnd.Views.SearchMap();
    this.addSubview("#map", mapView)
  },

  addSidebar: function () {
    var sidebarView = new Carbnd.Views.SearchSidebar();
    this.addSubview("#sidebar", sidebarView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
