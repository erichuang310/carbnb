Carbnd.Views.LayoutsUserUl = Backbone.CompositeView.extend({
  template: JST["layouts/user_ul"],
  tagName: "ul",
  className: "nav navbar-nav navbar-right",

  initialize: function () {
    this.listenTo(Carbnd.currentUser, "change", this.render);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
