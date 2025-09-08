function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", function () {
  const btn = document.querySelector(".scroll-to-top");
  if (window.scrollY > 300) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

function iconHeaderBop() {
  const target = document.querySelector(".icon-header-bottom");
  const footer = document.getElementById("footer");

  // 애니메이션 클래스 추가 (필요 시 CSS 정의 필요)
  target.classList.add("slide-down");

  // 애니메이션 끝난 후 footer로 부드럽게 스크롤
  setTimeout(() => {
    footer.scrollIntoView({ behavior: "smooth" });
  }, 500); // slide-down 애니메이션 시간과 맞추세요
}

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    // 기본 슬라이드 설정
    slidesPerView: 1,
    spaceBetween: 10,

    // 페이지네이션 설정
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // 클릭 가능하도록
    },

    // 반응형 설정
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });
});
