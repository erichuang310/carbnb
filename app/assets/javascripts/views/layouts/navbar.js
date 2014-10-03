Carbnd.Views.LayoutsNavbar = Backbone.CompositeView.extend({
  template: JST["layouts/navbar"],

  initialize: function () {
    this.addUsersUl();
    this.addLoginModal();
    this.addSignupModal();
  },

  events: {
    "click a.guest-login": "loginGuest",
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

  fillInput: function (string, element, callback){
    (function writer(i){
      if(string.length <= i++) {
        element.value = string;
        return;
      }
      element.value = string.substring(0, i);
      if ( element.value[element.value.length - 1] != " " ) element.focus();
      var rand = Math.floor(Math.random() * (100)) + 15;
      setTimeout( function () {
        writer(i);
        if (i === string.length - 1) {
          callback();
        }
      }, rand);
    }) (0)
  },

  loginGuest: function () {
    this.showLoginModal();
    var guestEmail = "guest@gmail.com";
    var password = "123123";
    var that = this;

    setTimeout(function () {
      that.fillEmail(guestEmail, function () {
        that.fillPassword(password, function () {
          that.submitForm();
        });
      });
    }, 1000);

  },

  fillEmail: function (guestEmail, callback) {
    this.fillInput(guestEmail, this.$("#user_email")[0], callback);
  },

  fillPassword: function (password, callback) {
    this.fillInput(password, this.$("#user_password")[0], callback);
  },

  submitForm: function () {
    this.$("#login-form").submit();
  },

  showLoginModal: function (event) {
    this.$("#login-modal").modal("show");
  },

  showSignupModal: function (event) {
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
