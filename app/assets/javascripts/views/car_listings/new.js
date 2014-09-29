Carbnd.Views.CarListingsNew = Backbone.CompositeView.extend({
  template: JST["car_listings/new"],

  initialize: function () {
    this.panelTitle =  "List Your Car",
    this.panelBody = "Carbnd lets you make money sharing out your ride."
    this.addNavbar();
    this.addPanel();
    this.addForm();
    this.addFooter();
  },

  addNavbar: function () {
    var navbarView = new Carbnd.Views.LayoutsNavbar();
    this.addSubview("nav", navbarView);
  },

  addPanel: function () {
    var layoutsPanelView = new Carbnd.Views.LayoutsPanel({
      className: "text-center",
      title: this.panelTitle,
      body: this.panelBody
    });
    this.addSubview("#splash-message", layoutsPanelView);
  },

  addForm: function () {
    var formView = new Carbnd.Views.CarListingsForm();
    this.addSubview("#new-car-listing", formView);
  },

  addFooter: function () {
    var footerView = new Carbnd.Views.LayoutsFooter({ id: "car-listing-new" });
    this.addSubview("footer", footerView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
