Carbnd.Views.CarListingShow = Backbone.CompositeView.extend({
  template: JST["car_listings/show"],

  initialize: function () {
    this.addHeader();
    this.addRequestForm();
    this.listenTo(this.model, "sync", this.render);
  },

  addHeader: function () {
    var headerView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("header", headerView);
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
    this.attachSubviews();

    return this;
  }
});
