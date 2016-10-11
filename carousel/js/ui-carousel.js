(function(global){
  'use strict';

  // 1.1. 컴포넌프 분석
  // 애플리케이션 초기화
  // 해당 요소를 컴포넌트 화
  // 요소의 클래스 설정
  // 버튼을 동적으로 생성
  // 버튼 이벤트 핸들링
  // 핸들러 작성
  // 콘텐츠 래퍼 이동 기능
  // 1.2 기능 설계
  // 1.3 기능 구현
  // 1.4 테스트
  // 1.5 빌드


  // 모듈 내에서 사용할 공통 변수
  var carousel;
  var carousel_contents_wrapper;
  var cotent_height;
  var carousel_contents_total;

  // 애플리케이션 초기화
  function init(selector) {
    // 캐로셀 컴포넌트로 설정할 요소에 스타일 식별자 class 속성 설정
    carousel = query(selector);

    // 기존 carousel 참조 문서 객체의 class 속성 값을 메모리
    // 객체.속성 방식을 사용하여 메모리
    carousel.origin_class = carousel.getAttribute('class') || '';
    carousel.setAttribute('class', (carousel.origin_class+ 'ui-carousel').trim() );

    // WAI_ARIA 설정
    carousel.setAttribute('role', 'application');
    carousel.setAttribute('aria-label', 'UI Carousel Component');

    // ----------------------------------------------------------

    // 래핑 요소를 생성
    carousel_contents_wrapper = createNode('div');
    // 래핑 요소에 클래스 속성 설정
    carousel_contents_wrapper.setAttribute('class', 'ui__carousel-content-wrapper');
    // 래핑 요소에 WAI-ARIA 속성 설정
    carousel_contents_wrapper.setAttribute('role', 'group');
    // 캐로셀 콘텐츠 래핑
    var carousel_contents = makeArray( queryAll(selector + '> *') );
    carousel_contents_total = carousel_contents.length;
    carousel_contents.forEach(function(content, index) {
      // 자식 요소에 class 속성 설정
      content.setAttribute('class', '');
      // 자식 요소에 내부에서 제목 요소를 찾아 class 속성 설정
      var headline = query('h2', content);
      headline.setAttribute('class', '');
      // 래핑 요소에 자식 요소로 삽입
      carousel_contents_wrapper.appendChild(content);
    });
    // 캐로셀 컴포넌트의 첫번째 자식 요소로 삽입
    prependChild(carousel, carousel_contents_wrapper);

    // ----------------------------------------------------------

    // 콘텐츠 래퍼 문서 객체로부터 첫번째 자식 객체(콘텐트)를 변수에 참조
    var content = firstEl(carosel_contents_wrapper);
    // 콘텐트의 높이를 가져온다.
    content_height = removeUnit(css(content, 'height'));
    // 템플릿코드를 사용한 innerHTML을 활용한 예시
    var button_group_html_code = [
      '<div class="ui__carousel-navigation-buttons" role="group">',
        '<button aria-label="previous content" type="button" class="ui__carousel-navigation-prev-button">',
          '<span class="" aria-hidden="true"></span>',
        '</button>',
        '<button aria-label="next content" type="button" class="ui__carousel-navigation-next-button">',
          '<span class="" aria-hidden="true"></span>',
        '</button>',
      '</div>'
    ].join('');

    carousel.innerHTML += button_group_html_code;

    // 버튼에 이벤트 바인딩
    bindEvent();
  }

  // ----------------------------------------------------------
  // 버튼에 이벤트 바인딩
  function bindEvent() {
    var buttons = queryAll('.ui__carousel-navigation-buttons button', carousel);
    var len = buttons.length;
    while ( buttons[--len] ){
      buttons[len].onclick = movingCarouselContents;
    }
  }

  // ----------------------------------------------------------
  // 버튼에 연결된 함수
  function movingCarouselContents() {
    // 기능 구현
    // 어떤 버튼을 사용자가 클릭했는지 구분한다.
    var check_class = this.getAttribute('class');
    var carousel_contents_wrapper = prevEl(this.parentNode);
    var current_wrapper_top = removeUnit( css(carousel_contents_wrapper, 'top') );
    var changed_wrapper_top;

    // 콘텐츠 래퍼를 이동시켜 준다.
    if ( /prev/.test(check_class)) {
      changed_wrapper_top = current_wrapper_top + content_height;
      if ( changed_wrapper_top === content_height ) {
        changed_wrapper_top = -1 * ( content_height * (carousel_contents_total - 1 ));
      }
      css(carousel_contents_wrapper, 'top', changed_wrapper_top + 'px');
    } else {
      changed_wrapper_top = current__wrapper_top - conent_heigh;
      if ( changed_wrapper_top === -1 * (content_height * carousel_contents_total)) {
        changed_wrapper_top = 0;
      }
      csS(carousel_contents_wrapper, 'top', changed_wrapper_top + 'px');
    }
  }

  // 초기화 실행
  // init('.main-ad-area');

}(this));
