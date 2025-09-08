$(function () {
  $("nav").mouseenter(function () {
    $(".sub").show();
    $(".sub-bg").stop().fadeIn(0);
    $(".sub-bg-wrap").stop(true, true).fadeIn(0);
  });

  // 메뉴 닫기: .sub-bg에서 마우스가 벗어날 때
  $("nav").mouseleave(function () {
    $(".sub").hide();
    $(".sub-bg").stop().fadeOut(0);
    $(".sub-bg-wrap").stop(true, true).fadeOut(0);
  });

  let currentIndex = 0;
  const $slides = $(".slide a");
  const slideCount = $slides.length;
  const startDelay = 3000;
  const slideDelay = 5000;

  $slides.eq(0).addClass("active");

  function fadeSlideShow() {
    setInterval(function () {
      $slides.eq(currentIndex).removeClass("active");
      currentIndex = (currentIndex + 1) % slideCount;
      $slides.eq(currentIndex).addClass("active");
    }, slideDelay);
  }

  setTimeout(fadeSlideShow, startDelay);

  let swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  //play 버튼
  let sw = 0;
  $(".play-pause").click(function () {
    if (sw == 0) {
      sw = 1;
      $(".play").show();
      $(".pause").hide();
      swiper.autoplay.stop();
    } else {
      sw = 0;
      $(".play").hide();
      $(".pause").show();
      swiper.autoplay.start();
    }
  });
  //scrollTrigger
  ScrollTrigger.create({
    trigger: "section",
    start: "top +=100",
    end: "+=2600 bottom",
    pin: ".left-con",
    markers: false,
  });
});
