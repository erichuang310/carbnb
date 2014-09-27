Carbnd.Views.HomeHeader = Backbone.CompositeView.extend({
  template: JST["home/header"],
  tagName: "header",

  initialize: function () {
    this.addNavbar();
    this.addSearchForm();
  },

  addNavbar: function () {
    var navBarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("div#navbar", navBarView);
  },

  addSearchForm: function () {
    console.log("wtf");
    var searchFormView = new Carbnd.Views.HomeSearchForm();
    this.addSubview("div#home-search", searchFormView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
