Carbnd.Views.LayoutsFlashMessage = Backbone.CompositeView.extend({
  template: JST["layouts/flash_message"],

  initialize: function (options) {
    this.messages = options.messages
    this.flashClass = options.flashClass;
  },

  render: function () {
    var renderedContent = this.template({
      messages: this.messages,
      flashClass: this.flashClass
    });
    this.$el.html(renderedContent);

    return this;
  }
});
