Carbnd.Views.CarListingShow = Backbone.CompositeView.extend({
  template: JST["car_listings/show"],

  initialize: function () {
    this.addNavbar();
    this.addFooter();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.addRequestSidebar);
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("#navbar", navbarView);
  },

  addRequestForm: function () {
    var requestFormView = new Carbnd.Views.RequestForm({
      carListing: this.model
    });
    this.addSubview("#request-sidebar", requestFormView);
  },

  addRequestsIndex: function () {
    var requestsIndexView = new Carbnd.Views.RequestsIndex({
      collection: this.model.requests()
    });
    this.addSubview("#request-sidebar", requestsIndexView);
  },

  addRequestSidebar: function () {
    if (this.model.get("leaser_id") == Carbnd.currentUser.get("id")) {
      this.addRequestsIndex();
      console.log("rendering index");
    } else {
      this.addRequestForm();
      console.log("rendering form");
    }
  },

  addFooter: function () {
    var footerView = new Carbnd.Views.LayoutsFooter();
    this.addSubview("footer", footerView);
  },

  initParallax: function () {
    var $header = this.$("header");
    var headerHeight = $header.height();
    var headerSpeed = $header.data('speed');
    var $footer = this.$("footer");
    var footerSpeed = $footer.data('speed');
    var $requestSidebar = $("#request-sidebar");
    var windowHeight = $(window).height();

    $(window).on("scroll", function (e) {
      var windowScrollTop = $(window).scrollTop();

      if (windowScrollTop < headerHeight) {
        var yPos = -(windowScrollTop / headerSpeed);
        var coords = '50% '+ yPos + 'px';
        $header.css({ backgroundPosition: coords });
      }
      if (windowScrollTop + windowHeight > $footer.offset().top) {
        var yPos = -(windowScrollTop / footerSpeed);
        var coords = '50% '+ yPos + 'px';
        $footer.css({ backgroundPosition: coords });
      }
      if (windowScrollTop > 300) {
        $requestSidebar.addClass("affix-top");
      } else {
        $requestSidebar.removeClass("affix-top");
      }
    });
  },


  render: function () {
    var renderedContent = this.template({
      carListing: this.model
    });
    this.$el.html(renderedContent);
    if (this.model.get("imageUrls")) {
      this.$("#car-listing-header").css({ "background-image": "url(" + this.model.get("imageUrls")[0] + ")" })
    }

    this.attachSubviews();
    this.initParallax();

    return this;
  }
});
