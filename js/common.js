
window.addEventListener("DOMContentLoaded", function () {
  if ($(window).width() > 900) {
    $('.hamburger').hide();
    $('.nav_items').show();
  } else {
    $('.hamburger').show();
    $('.nav_items').hide();
  }
});


$(window).resize(function () {
  if ($(window).width() > 900) {
    $('.hamburger').hide();
    $('.nav_items').show();
  } else {
    $('.hamburger').show();
    $('.nav_items').hide();
  }
});

$(document).ready(function () {
  $('.hamburger').click(function () {
    if ($('.nav_items').is(':visible')) {
      $('.nav_items').slideUp();
    } else {
      $('.nav_items').slideDown();
    }
  });
});