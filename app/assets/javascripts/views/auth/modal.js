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
    var user = new Carbnd.Models.User(userParams);

    var that = this;
    if (this.type === "login") {
      user.save({}, {
        success: function (model, resp, options) {
          that.hide();
        },
        error: function (model, resp, options) {
          var flashMessageView = new Carbnd.Views.FlashMessage({
            messages: resp.responseJSON
          })
          that.$("#flash-message").html(flashMessageView.render().$el);
          that.$("input[type=password]").val("");
        }
      });
    } else {
      //TODO
    }

  },

  render: function () {
    var template = this.type == "login" ? this.loginTemplate : this.signupTemplate;
    var renderedContent = template();
    this.$el.html(renderedContent);

    return this;
  },

  hide: function () {
    this.$el.modal("hide");
    this.$("#flash-message").empty();
    this.$("input[type=text]").val("");
    this.$("input[type=password]").val("");
  }



});
