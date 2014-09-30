Carbnd.Views.HomeIndex = Backbone.CompositeView.extend({
  template: JST["home/index"],

  initialize: function () {
    this.addNavbar();
    this.addSearchForm();
    this.addIntroMessage();
    this.addDiscoveries();
    this.addFooter();
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("nav", navbarView);
  },

  addSearchForm: function () {
    var searchFormView = new Carbnd.Views.HomeSearchForm();
    this.addSubview("#home-search", searchFormView);
  },

  addIntroMessage: function () {
    var messageView = new Carbnd.Views.LayoutsPanel({
      title: "Vroom Vroom",
      body: "Discover automotives that enthusiasts \
            <font color=\"red\"><strong>love</strong></font>."
    });
    this.addSubview("div#intro-message", messageView);
  },

  addDiscoveries: function () {
    var discoveriesView = new Carbnd.Views.HomeDiscoveries();
    this.addSubview("div#discoveries", discoveriesView);
  },

  addFooter: function () {
    var footerView = new Carbnd.Views.LayoutsFooter();
    this.addSubview("footer", footerView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.$("header").css({ "background-image": "url(/assets/bmw_m3_front.jpg)" })
    this.attachSubviews();

    return this;
  }
});
