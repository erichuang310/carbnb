Carbnd.Views.SearchSidebar = Backbone.CompositeView.extend({
  template: JST["search/sidebar"],

  initialize: function (options) {
    this.addSearchForm();
    this.addCarListings();
  },

  addSearchForm: function () {
    var searchFormView = new Carbnd.Views.SearchForm();
    this.addSubview("#search-form", searchFormView);
  },

  addCarListings: function () {
    Carbnd.carListings.fetch();
    var carListingsView = new Carbnd.Views.CarListingsIndex({
      collection: Carbnd.carListings
    });
    this.addSubview("#car-listings", carListingsView)
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
