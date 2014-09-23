# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
#

`
$(function () {
  $('#login-modal').on('hidden.bs.modal', function (e) {
    $(".modal-body #flash-message").empty();
    $(".modal-body input[type=text]").val("");
    $(".modal-body input[type=password]").val("");
  });

  $('#signup-modal').on('hidden.bs.modal', function (e) {
    $(".modal-body #flash-message").empty();
    $(".modal-body input[type=text]").val("");
    $(".modal-body input[type=password]").val("");
  });

      $("#banner").typed({
        strings: [
          "BMW M3",
          "Honda Odyssey",
          "Nissan 370Z",
          "Lexus IS250",
          "Toyota Camry",
          "Tesla Model S"
        ],
        typeSpeed: 120,
        backSpeed: 70,
        loop: true
      });

});
`
