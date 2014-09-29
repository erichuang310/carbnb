Carbnd.Views.CarListingShow = Backbone.CompositeView.extend({
  template: JST["car_listings/show"],

  initialize: function () {
    this.addNavbar();
    this.addRequestForm();
    this.listenTo(this.model, "sync", this.render);
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("#navbar", navbarView);
  },

  addRequestForm: function () {
    var requestFormView = new Carbnd.Views.RequestForm({
      carListingId: this.model.id
    });
    this.addSubview("div#new-request", requestFormView);
  },

  render: function () {
    var renderedContent = this.template({
      carListing: this.model
    });
    this.$el.html(renderedContent);
    this.$("#navbar").css({ "background-color": "white" })
    if (this.model.get("imageUrls")) {
      this.$("header").css({ "background-image": "url(" + this.model.get("imageUrls")[0] + ")" })
    }
    this.attachSubviews();

    return this;
  }
});
