Carbnd.Views.RequestsIndex = Backbone.CompositeView.extend({
  template: JST["requests/index"],

  initialize: function () {
    var that = this;
    this.collection.each(function (request) {
      that.addRequest(request);
    });
    // this.listenTo(this.collection, "change", this.handleRequestChange);
  },

  addRequest: function (request) {
    var requestView = new Carbnd.Views.RequestItem({ model: request });
    this.addSubview(".requests", requestView);
  },

  // handleRequestChange: function (request) {
  //   console.log("Handle the request change");
  //   var subview = _.find(
  //     this.subviews(".requests"),
  //     function (subview) {
  //       return subview.model === request;
  //     }
  //   );
  //   this.removeSubview(".requests", subview);
  // },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews;

    return this;
  }
});
