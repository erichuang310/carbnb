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
    this.$("header").css({ "background-image": "url(/assets/lotus_front_side.jpg)" })
    this.attachSubviews();

    return this;
  }
});
