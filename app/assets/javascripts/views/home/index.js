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
    this.addSubview("#navbar", navbarView);
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

  initParallax: function () {
    var $header = this.$("header");
    var headerSpeed = $header.data('speed');
    var $footer = this.$("footer");
    var footerSpeed = $footer.data('speed');
    var windowHeight = $(window).height();

    $(window).on("scroll", function (e) {
      var windowScrollTop = $(window).scrollTop();
      if (windowScrollTop < windowHeight) {
        var yPos = -(windowScrollTop / headerSpeed);
        var coords = '50% '+ yPos + 'px';
        $header.css({ backgroundPosition: coords });
      }
      if (windowScrollTop + windowHeight > $footer.offset().top) {
        console.log("footer");
        var yPos = -(windowScrollTop / footerSpeed + 220);
        var coords = '50% '+ yPos + 'px';
        $footer.css({ backgroundPosition: coords });
      }
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.initParallax();

    return this;
  }
});
