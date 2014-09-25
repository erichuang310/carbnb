Carbnd.Views.HomeIndex = Backbone.CompositeView.extend({
  template: JST["home/index"],
  className: "container-fluid",

  initialize: function () {
    this.addHeader();
    this.addMessage();
    this.addDiscoveries();
    this.addFooter();
  },

  addHeader: function () {
    var headerView = new Carbnd.Views.HomeHeader();
    this.addSubview("header", headerView);
  },

  addMessage: function () {
    var messageView = new Carbnd.Views.LayoutsPanel({
      title: "Vroom Vroom",
      body: "Discover automotives that enthusiasts <font color=\"red\">love</font>."
    });
    this.addSubview("section#message", messageView);
  },

  addDiscoveries: function () {
    var discoveriesView = new Carbnd.Views.HomeDiscoveries();
    this.addSubview("section#discoveries", discoveriesView);
  },

  addFooter: function () {
    var footerView = new Carbnd.Views.LayoutsFooter({ id: "home" });
    this.addSubview("footer", footerView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
