Carbnd.Views.LayoutsNavbar = Backbone.CompositeView.extend({
  template: JST["layouts/navbar"],

  initialize: function () {
    this.addLoginModal();
    this.addSignupModal();
  },

  events: {
    "click a.login": "showLoginModal",
    "click a.signup": "showSignupModal"
  },

  addLoginModal: function () {
    var loginModalView = new Carbnd.Views.AuthModal({ type: "login" });
    this.addSubview("#login", loginModalView);
  },

  addSignupModal: function () {
    var signupModalView = new Carbnd.Views.AuthModal({ type: "signup" });
    this.addSubview("#signup", signupModalView);
  },

  showLoginModal: function (event) {
    event.preventDefault();
    this.$("#login-modal").modal("show");
  },

  showSignupModal: function (event) {
    event.preventDefault();
    this.$("#signup-modal").modal("show");
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});
