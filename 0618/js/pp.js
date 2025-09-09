$(function () {
  // 햄버거 버튼 클릭 시 활성화
  $(".menu").click(function (e) {
    e.preventDefault();
    $(".menu-btn a").addClass("active");
    $(".menu-area").fadeIn(300).addClass("active");
    $(".menu").fadeOut(100);
  });

  // 닫기 버튼 클릭 시 비활성화
  $(".close").click(function (e) {
    e.preventDefault();
    $(".menu-btn a").removeClass("active");
    $(".menu-area").fadeOut(300).removeClass("active");
    $(".menu").fadeIn(100);
  });

  //mina-txt 애니메이션
  //.txt1, .txt2 .txt3에 적요할 랜덤한숫자를 발생시켜서 각 배열생성
  //sp1[0]"<span>밝</span>", sp1="<span>은</span>"..
  let sp1 = $(".s1 .main-txt .txt1 span");
  let sp2 = $(".s1 .main-txt .txt2 span");
  let sp3 = $(".s1 .main-txt .txt3 span");

  let ran1 = Array.from({ length: sp1.length }, (_, i) => i).sort(
    () => Math.random() - 0.25
  );

  //.txt1, .txt2 .txt3에 적용할 적용할 랜덤한 숫자를 발생시켜서 각 배열 생성
  //sp1 의 길이 만큼 ran1배열 생성, i는 ran1배열의 인덱스 번호
  //ran[i]에 MAth.random()-0.25로 발생한 숫자를 정렬해서 저장
  let ran2 = Array.from({ length: sp2.length }, (_, i) => i).sort(
    () => Math.random() - 0.25
  );

  let ran3 = Array.from({ length: sp3.length }, (_, i) => i).sort(
    () => Math.random() - 0.25
  );

  //ran1배열의 개수만큼 반복, 매개변수 : index, i

  //일정 시간 기다렸다가 {}안의 명령어 실행
  ran1.forEach((index, i) => {
    setTimeout(() => {
      $(sp1[index]).addClass("active");
    }, i * 200);
  });
  ran2.forEach((index, i) => {
    setTimeout(() => {
      $(sp2[index]).addClass("active");
    }, i * 500);
  });
  ran3.forEach((index, i) => {
    setTimeout(() => {
      $(sp3[index]).addClass("active");
    }, i * 300);
  });

  setTimeout(() => {
    $(".main-txt").addClass("active");
  }, 200);

  //메인 이미지(main-photo) 애니메이션
  gsap.set(".main-photo", {
    clipPath: "inset(0 40%)",
    scale: "0.9",
  });

  let photo = gsap.timeline({
    scrollTrigger: {
      trigger: ".s2",
      start: "top top",
      end: "bottom bottom",

      scrub: 1,
      //onUPdate메서드: 화면이 스크롤 될 때마다 호출됨
      pin: true,
      onUpdate: (self) => {
        //스크롤 진행률을 progress변수에 저장
        let progress = self.progress;
        //클래스명이 main-photo인 요소를 element변수에 저장
        let elemnet = $(".main-photo");
        //클래스명이 words인 요소를 words변수에 저장
        let words = $(".words");
        //만약 스크롤 진행률이 0.5보다 크면
        if (progress >= 0.5) {
          //만약 스크롤 진행률이 0.5보다 크면
          elemnet.addClass("active");
          //.main-photo에 active클래스 추가
          //.words에 active클래스 추가
          words.addClass("active");
          //스크롤진행률이 0.5보다 작으면
        } else {
          //.main-photo에서actoive클래스 제거
          elemnet.removeClass("active");
          //.words에서 active클래스 제거
          words.removeClass("active");
        }
      },
    },
  });

  //.main-photo의 왼쪽, 오른쪽 넓어지는 애니메이션 설정
  //duration:2 => 2초동안 애니메이션 실행
  //power2.inOut => 감속운동
  photo.to(".main-photo", {
    clipPath: "inset(0% 0%)",
    scale: "1",
    duration: 2,
    ease: "power2.inOut",
  });

  //아무 애니에니메이션 없이 2초동안 멈춤
  photo.to({}, { duration: 2 });

  let swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
  });

  //section4의 제목 애니메이션
  let title = gsap.timeline({
    scrollTrigger: {
      trigger: ".s4",
      start: "top 50%",
      end: "top 75%",
      scrub: 1,
      pin: false,
      pinSpacing: true,
    },
  });
  title.to(".s4 h2 span", { y: 0 }, { duration: 0.2 });

  //section5의 제목 애니메이션
  let title2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".s5",
      start: "top 50%",
      end: "top 75%",
      scrub: 1,
      pin: false,
      pinSpacing: true,
    },
  });
  title2.to(".s5 h2 span", { y: 0 }, { duration: 0.2 });

  let photo3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".skill-wrap",
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 1,
      duration: 8,
      ease: "sine.in",
    },
  });
  //"<"는 이전 애니메이션과 동시에 실행하라는 뜻
  photo3.to(".skill-img1", { scale: 1, duration: 4 });
  photo3.to(".skill-img1", { scale: 1.1, opacity: 0, duration: 4 }, "<");
  photo3.to(".skill-img2", { scale: 1, opacity: 1, duration: 4 }, "<");

  //skill bar
  //skillbar
  var Progress = function (element) {
    //this는 Progress를 가리킴
    //cancas의 2d 도화지 얻어와서 context변수에 저장
    this.context = element.getContext("2d");
    //cancas의 부모 요소의data-percent속성을 참조함.
    this.refElement = element.parentNode;
    //현재 로딩된percent의 초기값
    this.loaded = 0;
    //원형 그래프의 시작각도(4.72)
    this.start = 4.72;
    //canvas의 가로길이
    this.width = this.context.canvas.width;
    //cancas의 세로길이
    this.height = this.context.canvas.height;
    //this.refElement.dataset.percent:dara=percent의 값
    //parseInt:실수를 정수로 변환(소수점 버림)
    //목표 percent값을 total변수에 저장
    this.total = parseInt(this.refElement.dataset.percent, 10);
    //애니메이션 실행 시간을 저장하는 변수 선언 및 초기화
    this.timer = null;
    //현재 진행된 percent각도 계산용 변순 선언 및 초기화
    this.diff = 0;
    this.init();
  };
  //프로토타입 객체 생성
  Progress.prototype = {
    //prototype의 멤버 함수(초기화시키는 함수)
    init: function () {
      //this는 위에서 선언한Progess요소를 self변수에 저장
      var self = this;
      //10초 간격으로 업데이트 하면서 원형으로 그림
      self.timer = setInterval(function () {
        self.run();
      }, 10);
    },
    //prototype의 멤버 함수(canvas에 원형그리는 함수)
    run: function () {
      //this는 위에서 선언한 Progress요소를 self변수에 저장
      var self = this;
      //원형 각도 계산
      self.diff = ((self.loaded / 100) * Math.PI * 2 * 10).toFixed(2);
      //canvas영역의 모든 요소 지움
      self.context.clearRect(0, 0, self.width, self.height);
      //원형의 선 굵기
      self.context.lineWidth = 16;
      //percent글자색
      self.context.fillStyle = "#333";
      //원형의 선색
      self.context.strokeStyle = "#F6DC43";
      //percent 글자 가운데 정렬
      self.context.textAlign = "center";
      //percent 글자 출력
      self.context.fillText(
        self.loaded + "%",
        self.width * 0.5,
        self.height * 0.5 + 2,
        self.width
      );
      //원형 그리기 시작 (( 원형 모양 ))
      self.context.beginPath();
      //150:원형 가로위치, 75:원형 세로위치,50:원형크기
      //10:원형 그리는 속도
      self.context.arc(
        150,
        75,
        50,
        self.start,
        self.diff / 10 + self.start,
        false
      );
      //원형을 선으로 그림
      self.context.stroke();
      // 현재까지 로드된 항목 수가 총 항목 수보다 크거나 같으면
      if (self.loaded >= self.total) {
        // 타이머를 정지시켜 더 이상 실행되지 않도록 함
        clearInterval(self.timer);
      }
      // 로드된 항목 수를 1 증가시킴
      self.loaded++;
    },
  };
  //익명함수 선언, CircluarSkullBar(변수명), elements(매개 변수)
  //여러개의 원형을순차적으로 실행하기 위한 함수
  var CircularSkillBar = function (elements) {
    //문서에서 elements로 전달받은 모든요소(.bar)를 bars변수에 저장
    this.bars = document.querySelectorAll(elements);
    //bars배열의 개수가 0보다 크면 init()함수 호출(초기화)
    if (this.bars.length > 0) {
      this.init();
    }
  };
  //CircularskillBar에 속성 추가하기
  CircularSkillBar.prototype = {
    //init멤버함수에서는 10*100ms=1초 간격으로 progress()함수 호출
    init: function () {
      this.tick = 10;
      this.progress();
    },
    //progress멤버 함수에서는 skill 원형을 순차적으로 그림
    progress: function () {
      //this는 CircularSkillBar요소를 가리킴
      var self = this;
      //원형 요소의 인덱스 번호를 나타내는 변수 선언 및 초기화
      var index = 0;
      //첫번째 skill 원형(canvas 영역)부터 실행
      var firstCanvas = self.bars[0].querySelector("canvas");
      var firstProg = new Progress(firstCanvas);

      var timer = setInterval(function () {
        index++;

        //Progress프로토 타입으로 새로운 인스턴스 생성
        //firstProg: 인스턴스 이름

        if (index >= self.bars.length) {
          //타이머 중지
          clearInterval(timer);
          //힘수종룔
          return;
        }

        var canvas = self.bars[index].querySelector("canvas");
        //Progress프로토타입객체를 생성하여 prog인스턴스에 저장함
        var prog = new Progress(canvas);
        //만약 인덱스 번호가 canvas의 개수와 같아지면
        //다음 원형을 그릴 때 1초 간격으로 그림
      }, self.tick * 100);
    },
  };
  // [추가] 스킬바 애니메이션: 스킬 섹션(s5)에 들어올 때마다 바 애니메이션이 다시 실행되도록 하는 함수
  function runSkillBarAnimation() {
    // [추가] 기존 스킬바 애니메이션 초기화 (모든 bar-fill의 width를 0으로 리셋)
    $(".bar-fill").css("width", 0);
    // [추가] 각 스킬별로 목표 width까지 애니메이션으로 채워줌
    $(".bar-fill-html").animate({ width: "90%" }, 1200); // HTML/CSS
    $(".bar-fill-javascript").animate({ width: "60%" }, 1200); // Javascript
    $(".bar-fill-jquery").animate({ width: "70%" }, 1200); // JQuery
    $(".bar-fill-responsive").animate({ width: "90%" }, 1200); // Responsive Design
    $(".bar-fill-photoshop").animate({ width: "20%" }, 1200); // Photoshop
  }

  // [추가] ScrollTrigger로 s5(스킬) 섹션에 진입할 때마다 runSkillBarAnimation 함수가 실행됨
  // - onEnter: 아래로 스크롤해서 진입할 때
  // - onEnterBack: 위로 스크롤해서 다시 진입할 때
  ScrollTrigger.create({
    trigger: ".s5",
    start: "top 70%",
    onEnter: runSkillBarAnimation,
    onEnterBack: runSkillBarAnimation,
  });

  // 흐르는 글자애니메이션
  let $box = $(".s6 .flow-txt-wrap");
  let $flow = $(".s6 .flow-txt-wrap .flow-txt");
  let $txt = $(".s6 .flow-txt-wrap .flow-txt span");
  // 선언적 함수
  function flowTxt() {
    //$flow변수 영역을 비어줌
    $flow.empty();
    // span태그 안의 텍스트를 txtContent 변수에 저장
    let txtContent = $txt.text();
    // span태그 안의 텍스트를 div영역에 쓰기
    let $txtElement = $("<div>").text(txtContent);

    //ㅎglow글자 영역에 txtElement를 자식요소로 추가
    $flow.append($txtElement);
    //flow글자 영역에 txtElement를 복사해서 자식요소로 추가
    $flow.append($txtElement.clone());

    //$flow변수에 저장된 글자의 길이 /2한 값을 txtWidth변수에 저장
    let txtWidth = $flow.width() / 2;
    //글자가 움직이는 실행시간, 1초에 50px씩 왼쪽으로이동함.
    let time = (txtWidth / 50) * 1000;
    $flow.css("animation", "none");
    //글자ㅏ영역의 margin을 포함한 가로길이 설정
    $flow.outerWidth();
    //글자영역에 animation속성 지정
    $flow.css({
      // 띄어쓰기 애니메이션
      animation: "flowTxt " + time + "ms linear infinite forwards",
    });
  }
  //함수 호출
  flowTxt();

  // //email 애니메이션
  // setTimeout(function emailOpen() {
  //   $(".letter-image").addClass("active");
  //   //4초마다 active클래스 제거
  //   setTimeout(function emailClose() {
  //     $(".letter-image").removeClass("active");
  //     //재귀함수 (자기 자신을 다시 호출함)
  //     setTimeout(emailOpen, 3000);
  //     // 3초마다 애니메이션 되게 해주세요
  //   }, 3000);
  // }, 3000);

  //top버튼
  $(".top").click(function () {
    $("html, body").animate({ scrollTop: 0 });
  });
  $(".top").hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
      $(".top").fadeIn();
    } else {
      $(".top").fadeOut();
    }
    //화면이 맨 마지막으로 내려오면 top버튼은 footer위에 배치함
    let winBottom = $(document).height() - $(window).height();
    let footer = $("footer").outerHeight();
    if ($(window).scrollTop() > winBottom - footer) {
      $(".top").css({
        position: "absolute",
        bottom: footer + 100,
      });
    } else {
      $(".top").css({
        postition: "fixed",
        bottom: "20px",
      });
    }
  });
  // // .s3 섹션에서 .mine-photo 요소의 초기 상태 설정
  // gsap.set(".mine-photo", {
  //   xPercent: 15, // 요소를 가로 방향으로 15% 이동 (오른쪽으로 밀림)
  //   yPercent: -25, // 요소를 세로 방향으로 -25% 이동 (위쪽으로 올라감)
  //   clipPath: "circle(25% at center)", // 요소를 중심 기준으로 반지름 25%의 원형 클리핑 적용
  // });

  // // photo2라는 GSAP 타임라인 생성 (스크롤 트리거 포함)
  // let photo2 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".s3", // 스크롤 트리거가 작동할 요소 (.s3 섹션)
  //     start: "-20% top", // 트리거 시작 시점: .s3 요소의 -20% 지점이 뷰포트의 top과 닿을 때
  //     end: "bottom bottom", // 트리거 종료 시점: .s3 요소의 bottom이 뷰포트의 bottom과 닿을 때
  //     pin: true, // 스크롤 중 .s3 섹션을 고정
  //     scrub: 1, // 스크롤과 애니메이션 동기화 (값이 높을수록 부드럽게 반응)
  //     pinSpacing: true, // 고정 중인 영역 아래에 공간 확보
  //   },
  // });

  // // photo2 타임라인에 애니메이션 추가
  // photo2.to(".mine-photo", {
  //   xPercent: 0, // x축 위치 원래대로
  //   yPercent: 0, // y축 위치 원래대로
  //   duration: 1, // 애니메이션 지속 시간 (1초)
  //   ease: "linear", // 일정한 속도로 변화
  //   clipPath: "circle(100% at center)", // 클리핑을 전체 원형으로 확장 (요소 전체가 보이게 됨)
  // });

  // .mine-txt 요소 초기 상태 설정
  // gsap.set(".mine-txt", {
  //   xPercent: 10, // 오른쪽으로 10% 이동
  //   yPercent: -20, // 위로 20% 이동
  //   // clipPath는 없음 — 단순한 위치 이동만 설정
  // });

  // // txt라는 GSAP 타임라인 생성 (.mine-txt 요소용)
  // let txt = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".mine", // 스크롤 트리거가 작동할 요소 (.mine)
  //     start: "top 80%", // 트리거 시작: .mine의 top이 뷰포트의 80%에 닿을 때
  //     end: "bottom 60%", // 트리거 종료: .mine의 bottom이 뷰포트의 60%에 닿을 때
  //     pin: false, // 고정하지 않음
  //     scrub: 1, // 스크롤과 동기화된 애니메이션
  //     pinSpacing: true, // 고정이 없지만 기본 설정
  //   },
  // });

  // // txt 타임라인에 애니메이션 추가 (.mine-txt 위치 복귀)
  // txt.to(".mine-txt", {
  //   xPercent: 0, // x축 원래대로
  //   yPercent: 0, // y축 원래대로
  //   duration: 2, // 애니메이션 지속 시간 (2초)
  //   ease: "linear", // 일정한 속도
  // });        // 메뉴 클릭 시 해당 section으로 스크롤 이동 (메뉴는 닫히지 않음)
  $(function () {
    // PROFILE 버튼 클릭 시 서브메뉴 토글, 다른 서브메뉴 닫기
    // 1. PROFILE(메인) 버튼을 클릭하면 바로 아래의 .sub(Portfolio1~5) 메뉴가 펼쳐집니다.
    // 2. 이미 펼쳐진 상태에서 다시 클릭하면 .sub 메뉴가 닫힙니다.
    // 3. 다른 서브메뉴가 열려 있으면 모두 닫고, 현재 PROFILE의 .sub만 토글합니다.
    // 4. slideToggle(300)으로 부드러운 애니메이션 적용.
    $(".menu-area nav .profile-main").on("click", function (e) {
      e.preventDefault(); // a 태그의 기본 이동 막기
      var $sub = $(this).siblings(".sub"); // PROFILE 바로 아래의 .sub 선택
      $(".menu-area nav .sub").not($sub).slideUp(150); // 다른 모든 .sub 닫기
      $sub.stop(true, true).slideToggle(300); // 현재 .sub만 토글
    });
    // 메뉴 영역에서 .menu-link 클릭 시 항상 동작하도록 이벤트 위임
    $(document).on("click", ".menu-link", function (e) {
      // 🚀 SKILL 메뉴 클릭 시 → .s5(스킬)로 이동
      if ($(this).text().trim() === "SKILL") {
        e.preventDefault();
        var headerHeight = $(".header").outerHeight() || 0;
        var s5ExtraOffset = 20; // 필요시 조정
        if ($(".s5").length) {
          $("html, body").animate(
            {
              scrollTop: $(".s5").offset().top - headerHeight - s5ExtraOffset,
            },
            600
          );
        }
        return;
      }
      var $li = $(this).closest("li");
      var $sub = $li.children(".sub");

      $(".menu-link").removeClass("active");
      $(this).addClass("active");
      if ($li.parent().hasClass("sub")) {
        $li.parents("li").children(".menu-link").addClass("active");
      }

      if ($(this).attr("target") === "_blank") {
        return;
      }

      var target = $(this).attr("href");

      // 🚀 PROFILE(메인 메뉴) 클릭 시 → 포트폴리오(s4)로 이동
      if ($(this).hasClass("profile-main") || target === "#s3") {
        e.preventDefault();
        var headerHeight = $(".header").outerHeight() || 0;
        var s4ExtraOffset = 20; // 필요시 조정
        if ($(".s4").length) {
          $("html, body").animate(
            {
              scrollTop: $(".s4").offset().top - headerHeight - s4ExtraOffset,
            },
            600
          );
        }
        return;
      }

      // 🚀 일반 메뉴 (서브 없는 경우)만 스크롤 이동
      if (!$sub.length && target && $(target).length) {
        e.preventDefault();
        var headerHeight = $(".header").outerHeight() || 0;
        var extraOffset = $(target).data("offset") || 0;
        var scrollOffset = headerHeight + extraOffset;

        $("html, body").animate(
          {
            scrollTop: $(target).offset().top - scrollOffset,
          },
          600
        );
      }
    });

    // 메뉴 영역 밖 클릭 시 모든 sub 닫기
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".menu-area nav").length) {
        $(".menu-area nav .sub").slideUp(300);
      }
    });

    // 메뉴버튼 클릭 시 메뉴-area 보이기
    $(".menu-btn.menu").on("click", function () {
      $(".menu-area").show();
    });
    // 닫기버튼 클릭 시 메뉴-area 숨기기
    $(".menu-area .close").on("click", function () {
      $(".menu-area").hide();
    });
  });
});
