Carbnd.Views.HomeIndex = Backbone.CompositeView.extend({
  template: JST["home/index"],
  className: "container-fluid",

  initialize: function () {
    console.log("adding home index")
    // this.addHeader();
    this.addIntroMessage();
    this.addDiscoveries();
    // this.addFooter();
  },

  addHeader: function () {
    var headerView = new Carbnd.Views.HomeHeader();
    this.addSubview("header", headerView);
  },

  addIntroMessage: function () {
    var messageView = new Carbnd.Views.LayoutsPanel({
      id: "message",
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
    this.attachSubviews();

    return this;
  }
});
