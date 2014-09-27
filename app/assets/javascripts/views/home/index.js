Carbnd.Views.HomeIndex = Backbone.CompositeView.extend({
  template: JST["home/index"],

  initialize: function () {
    this.addHeader();
    this.addIntroMessage();
    this.addDiscoveries();
    this.addFooter();
  },

  addHeader: function () {
    var headerView = new Carbnd.Views.HomeHeader();
    this.addSubview("div#header", headerView);
  },

  addIntroMessage: function () {
    var messageView = new Carbnd.Views.LayoutsPanel({
      className: "text-center",
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
    this.addSubview("div#footer", footerView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
