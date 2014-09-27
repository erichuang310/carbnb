Carbnd.Views.LayoutsFlashMessage = Backbone.CompositeView.extend({
  template: JST["layouts/flash_message"],

  initialize: function (options) {
    this.messages = options.messages
  },

  render: function () {
    var renderedContent = this.template({ messages: this.messages });
    this.$el.html(renderedContent);

    return this;
  }
});
