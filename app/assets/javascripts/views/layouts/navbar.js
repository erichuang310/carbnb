Carbnd.Views.LayoutsNavbar = Backbone.CompositeView.extend({
  template: JST["layouts/navbar"],

  initialize: function () {
    this.addUsersUl();
    this.addLoginModal();
    this.addSignupModal();
  },

  events: {
    "click a.login": "showLoginModal",
    "click a.signup": "showSignupModal",
    "click a.logout": "logoutCurrentUser"
  },

  addUsersUl: function () {
    var userUlView = new Carbnd.Views.LayoutsUserUl();
    this.addSubview("#navbar-user-collapse", userUlView);
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

  logoutCurrentUser: function (user) {
    $.ajax({
      url: "/api/session",
      type: "DELETE",
      success: function (model, resp) {
        Carbnd.currentUser.clear();
      }
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }
});
