Carbnd.Views.HomeIndex = Backbone.CompositeView.extend({
  template: JST["home/index"],

  initialize: function () {
    this.addNavbar();
    this.addSearchForm();
    this.addIntroMessage();
    this.addDiscoveries();
    // this.addFooterMessage();
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

  addFooterMessage: function () {
    var messageView = new Carbnd.Views.LayoutsPanel({
      className: "col-xs-8 col-xs-offset-2 text-center",
      title: "About Us",
      body: "Carbnd is evolving the way we own cars. By connecting drivers and \
            unused cars, we enable car owners to give back to the community. \
            Since our founding in 2014, Carbnd has been rapidly expanding through \
            all the major cities in the US. We are dedicated to building the community."
    });
    this.addSubview("div#footer-message", messageView);
  },

  addFooter: function () {
    var footerView = new Carbnd.Views.LayoutsFooter();
    this.addSubview("footer", footerView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();


    $(function(){
      [$("footer"), $("header")].forEach(function(obj){
        var $obj = $(obj);
        $(window).scroll(function() {
          var yPos = -(($(window).scrollTop()) / $obj.data('speed')) - 20;
          var coords = '50% '+ yPos + 'px';
          $(obj).css({ backgroundPosition: coords });
        });
      });
    });

    return this;
  }
});
