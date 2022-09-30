"use strict";

function ibg() {
  var ibg = document.querySelectorAll(".ibg");

  for (var index = 0; index < ibg.length; index++) {
    if (ibg[index].querySelector('img')) {
      ibg[index].style.backgroundImage = 'url(' + ibg[index].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();
var headerBurger = document.querySelector(".header__burger");
var header = document.querySelector('.header');
var timeout = false;

if (headerBurger) {
  var menuContent = document.querySelector(".menu");
  headerBurger.addEventListener('click', function () {
    if (timeout) return;
    timeout = true;

    if (!headerBurger.classList.contains('active')) {
      document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + 'px';
    } else {
      document.body.style.paddingRight = '0px';
    }

    document.body.classList.toggle("lock");
    headerBurger.classList.toggle("active");
    header.classList.toggle('active');
    menuContent.classList.toggle("active");
    setTimeout(function () {
      timeout = false;
    }, 300);
  });
}