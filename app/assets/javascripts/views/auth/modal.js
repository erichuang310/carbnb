Carbnd.Views.AuthModal = Backbone.CompositeView.extend({
  loginTemplate: JST["auth/login_form"],
  signupTemplate: JST["auth/signup_form"],

  initialize: function (options) {
    this.type = options.type;
  },

  events: {
    "hidden.bs.modal": "hide",
    "submit #login-form": "handleLogin",
    "submit #signup-form": "handleSignup"
  },

  handleLogin: function (event) {
    event.preventDefault();
    var userParams = $(event.target).serializeJSON();
    var that = this;

    $.ajax({
      url: "/api/session",
      type: "POST",
      data: userParams,
      success: function (model, resp) {
        that.hide();
        that.loginCurrentUser(model);
      },
      error: function (model, resp) {
        that.addFlashErrors([model.responseJSON.message]);
      }
    });
  },

  handleSignup: function (event) {
    event.preventDefault();
    var userParams = $(event.target).serializeJSON();
    var user = new Carbnd.Models.User(userParams);
    var that = this;

    user.save({}, {
      success: function (model, resp) {
        that.hide();
        that.loginCurrentUser(model.attributes);
      },
      error: function (model, resp) {
        that.addFlashErrors(resp.responseJSON);
      }
    });
  },

  loginCurrentUser: function (user) {
    Carbnd.currentUser.set(user);
  },

  addFlashErrors: function (errors) {
    var flashMessageView = new Carbnd.Views.LayoutsFlashMessage({
      messages: errors
    })
    this.$("#flash-message").html(flashMessageView.render().$el);
    this.$("input[type=password]").val("");
  },

  hide: function () {

    this.$el.contents().modal("hide");
    this.$("#flash-message").empty();
    this.$("input[type=text]").val("");
    this.$("input[type=password]").val("");
  },

  render: function () {
    var template = this.type == "login" ? this.loginTemplate : this.signupTemplate;
    var renderedContent = template();
    this.$el.html(renderedContent);

    return this;
  }
});
