Carbnd.Views.AuthModal = Backbone.CompositeView.extend({
  loginTemplate: JST["auth/login_form"],
  signupTemplate: JST["auth/signup_form"],
  className: "modal fade",
  id: "future-modal",

  initialize: function (options) {
    this.type = options.type;
    this.$el.attr({
      id: this.type === "login" ? "login-modal": "signup-modal"
    })
  },

  events: {
    "hidden.bs.modal": "hide",
    "submit form": "handleFormSubmission"
  },

  handleFormSubmission: function (event) {
    event.preventDefault();
    var userParams = $(event.target).serializeJSON();

    var that = this;
    if (this.type === "signup") {
      var user = new Carbnd.Models.User(userParams);
      user.save({}, {
        success: function (model, resp) { that.hide(); },
        error: function (model, resp) { that.addFlashErrors(resp.responseJSON); }
      });
    } else if (this.type === "login") {
      $.ajax({
        url: "/api/session",
        type: "POST",
        data: userParams,
        success: function (model, resp) { that.hide(); },
        error: function (model, resp) { that.addFlashErrors(resp.responseJSON); }
      });
    }

  },

  addFlashErrors: function (errors) {
    var flashMessageView = new Carbnd.Views.FlashMessage({ messages: errors })
    this.$("#flash-message").html(flashMessageView.render().$el);
    this.$("input[type=password]").val("");
  },

  hide: function () {
    this.$el.modal("hide");
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
