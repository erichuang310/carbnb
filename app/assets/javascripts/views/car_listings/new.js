Carbnd.Views.CarListingsNew = Backbone.CompositeView.extend({
  template: JST["car_listings/new"],
  className: "container-fluid",

  initialize: function () {
    this.title =  "List Your Car",
    this.body = "Carbnd lets you make money sharing out your ride."
    this.addPanel();
    this.addForm();
  },

  addPanel: function () {
    var layoutsPanelView = new Carbnd.Views.LayoutsPanel({
      title: this.title,
      body: this.body
    });
    this.addSubview("#splash-message", layoutsPanelView);
  },

  addForm: function () {
    var formView = new Carbnd.Views.CarListingsForm();
    this.addSubview("form", formView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
