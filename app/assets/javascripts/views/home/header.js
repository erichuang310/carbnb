Carbnd.Views.HomeHeader = Backbone.CompositeView.extend({
  template: JST["home/header"],
  id: "home",
  tagName: "header",
  className: "row",

  initialize: function () {
    this.addNavbar();
    this.addSearchForm();
  },

  addNavbar: function () {
    var navBarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("nav#home-nav", navBarView);
  },

  addSearchForm: function () {
    var searchFormView = new Carbnd.Views.HomeSearchForm();
    this.addSubview("#search-form", searchFormView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
