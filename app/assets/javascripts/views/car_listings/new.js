Carbnd.Views.CarListingsNew = Backbone.CompositeView.extend({
  template: JST["car_listings/new"],
  className: "container-fluid",

  initialize: function () {
    this.title =  "List Your Car",
    this.body = "Carbnd lets you make money sharing out your ride."
    this.addHeader();
    this.addPanel();
    this.addForm();
    this.addFooter();
  },

  addHeader: function () {
    var headerView = new Carbnd.Views.LayoutsNavBar();
    this.addSubview("header", headerView);
  },

  addPanel: function () {
    var layoutsPanelView = new Carbnd.Views.LayoutsPanel({
      id: "new-car-listing",
      title: this.title,
      body: this.body
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
