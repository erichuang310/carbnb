Carbnd.Views.HomeHeader = Backbone.CompositeView.extend({
  template: JST["home/header"],
  id: "home",
  tagName: "header",
  className: "row",

  events: {
    "click a.login": "showLoginModal",
    "click a.signup": "showSignupModal"
  },

  initialize: function () {
    this.addSearchForm();
    this.addLoginModal();
    this.addSignupModal();
  },

  addSearchForm: function () {
    var searchFormView = new Carbnd.Views.HomeSearchForm();
    this.addSubview("#search-form", searchFormView);
  },

  addLoginModal: function () {
    var loginModalView = new Carbnd.Views.AuthModal({
      type: "login"
    });
    this.addSubview("#auth-modal-0", loginModalView);
  },

  addSignupModal: function () {
    var signupModalView = new Carbnd.Views.AuthModal({
      type: "signup"
    });
    this.addSubview("#auth-modal-1", signupModalView);
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
    this.attachSubviews();

    return this;
  }
});
