Carbnd.Views.CarListingShow = Backbone.CompositeView.extend({
  template: JST["car_listings/show"],

  initialize: function () {
    this.addNavbar();
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

  render: function () {
    var renderedContent = this.template({
      carListing: this.model
    });
    this.$el.html(renderedContent);
    // if (this.model.get("imageUrls")) {
    //   this.$("#car-listing-header").css({ "background-image": "url(" + this.model.get("imageUrls")[0] + ")" })
    // }
    console.log("rendering");

    this.attachSubviews();

    $(function(){
      [$("#car-listing-header")].forEach(function(obj){
        var $obj = $(obj);
        $(window).scroll(function() {
          var yPos = -(($(window).scrollTop()) / $obj.data('speed')) - 100;
          var coords = '50% '+ yPos + 'px';
          $(obj).css({ backgroundPosition: coords });
        });
      });
    });

    return this;
  }
});
