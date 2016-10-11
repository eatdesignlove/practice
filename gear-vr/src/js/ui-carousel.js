/* UI Carousel @eatdeisnglove 2016 */

(function(global){
  'use strict';

  // 공통 변수
  var carousel;
  var carousel_contents_wrapper;
  var carousel_width;
  var carousel_content_total;

  // 1.캐로셀 초기화
  function init(selector) {
    // 스타일 식별자 속성 설정
    carousel = query(selector);

    // 기존 캐로셀 객체의 클래스값 메모리
    carousel.origin_class = carousel.getAttribute('class') || '';
    carousel.setAttribute('class', (carousel.origin_class+' ui-carousel').trim());
  
    // WAI-AIRA 설정
    carousel.setAttribute('role', 'application');
    carousel.setAttribute('aria-label', 'UI Carousel Component');

  // 2. 컨트롤러 버튼 템플릿코드
  var carousel_controller_code = [
    '<div class="carousel-controller">',
      '<button class="btn__prev"><span class="a11y-hidden">Swipe to Previous Content</span><span class="fa fa-angle-left"></span></button>',
      '<button class="btn__next"><span class="a11y-hidden">Next to Previous Content</span><span class="fa fa-angle-right"></span></button>',
    '</div>'
    ].join('');
  var carousel_indicator_code  = [
    '<ol class="carousel-indicator">',
      '<li><button class="text-hidden active" data-idx="1">1</button></li>',
      '<li><button class="text-hidden" data-idx="2">2</button></li>',
      '<li><button class="text-hidden" data-idx="3">3</button></li>',
      '<li><button class="text-hidden" data-idx="4">4</button></li>',
    '</ol>'      
  ].join('');

  carousel.insertAdjacentHTML('afterbegin', carousel_controller_code);  
  carousel.insertAdjacentHTML('beforeend', carousel_indicator_code);  

  // 3. 캐로셀 래핑 요소 설정
  carousel_contents_wrapper = query('.carousel-contents');
  carousel_contents_wrapper.setAttribute('role', 'group');
  
  // 4.버튼에 이벤트 바인딩
  bindEvent();

  // 5.인디케이터 초기설정
  activateIndicator(1);
  }

  // 이벤트 바인딩
  function bindEvent() {
    var buttons = queryAll('.carousel-controller button', carousel);
    var buttons_len = buttons.length;
    var indicators = queryAll('.carousel-indicator button', carousel);
    var indicators_len = indicators.length;
    var items = queryAll('.feature-experiences .feature-list li a');
    var items_len = items.length;

    while ( buttons[--buttons_len] ) {
      buttons[buttons_len].onclick = movingCarouselByButton;
    }
    while ( indicators[--indicators_len] ) {
      indicators[indicators_len].onclick = movingCarouselByIndicator;
    }
    while ( items[--items_len]) {
      // console.log(items)
      items[items_len].onclick = chageItem;
    }
  }

  // 버튼에 연결된 함수
  function movingCarouselByButton() {
    // 컨트롤러 버튼 구분
    var check_class = this.getAttribute('class');
    var carousel_contents_wrapper = query('.carousel-contents');
    var wrapper_width = parseInt(css(query('html'), 'width'));
    var carousel_contents = queryAll('.carousel-contents li');
    var len = queryAll('.carousel-contents li').length;
    var left = parseInt(css(carousel_contents_wrapper, 'left'));
    var right = parseInt(css(carousel_contents_wrapper, 'right')) + wrapper_width;
    var firstEl = carousel_contents[0];
    var lastEl = carousel_contents[len-1];
    var buttons = queryAll('.carousel-controller button', carousel);
    var buttons_len = buttons.length;
    // 래퍼 너비 설정
    // css(carousel_contents_wrapper, 'width', wrapper_width * len);
    
    //컨트롤러 버튼 제어
    while ( buttons[--buttons_len] ) {
      // console.log(buttons[buttons_len]); 
      buttons[buttons_len].setAttribute('disabled', 'true');

      setTimeout(function(){
        buttons_len = buttons.length;
        while ( buttons[--buttons_len] ) {
          buttons[buttons_len].disabled = false;
        }
      }, 500)
    }

    // 래퍼 이동
    if ( /prev/.test(check_class)) {
      if ( left === 0) {
        css(lastEl, 'left', '-100%')
        // console.log(-1 * (wrapper_width * len));
        setTimeout(function(){ 
          left = wrapper_width * -(len-1);
          // console.log(left);
          css(carousel_contents_wrapper, 'transition', 'none');
          css(lastEl, 'left', '300%')
          css(carousel_contents_wrapper, 'left', left +'px');

         }, 500)
      }
      left += wrapper_width;
      activateIndicator(right/wrapper_width - 1);
      // console.log(left, right)
    } else {
      // console.log('wrapper left:', left, wrapper_width *  -3);
      if ( left === wrapper_width  * -(len-1) ) {
        css(firstEl, 'left', '400%');
        setTimeout(function(){ 
          left = 0;
          // console.log(left);
          css(carousel_contents_wrapper, 'transition', 'none');
          css(firstEl, 'left', '0px')
          css(carousel_contents_wrapper, 'left', left +'px');

         }, 500)
      }
      left += (-wrapper_width);
      // console.log(left, right)
      activateIndicator(right/wrapper_width + 1);

      // console.log('next', left);
    }
    // console.log(left/wrapper_width, right/wrapper_width);
    css(carousel_contents_wrapper, 'transition', 'all 0.5s');
    css(carousel_contents_wrapper, 'left', left +'px');
  }

  function movingCarouselByIndicator() {
    var idx = parseInt(this.getAttribute('data-idx'));
    var wrapper_width = parseInt(css(query('html'), 'width'));

    console.log(this, idx);
    var left = (idx-1) * wrapper_width * -1;
    css(carousel_contents_wrapper, 'left', left +'px');
    
    activateIndicator(idx);
  }

  function activateIndicator(idx) {
    var indicators = queryAll('.carousel-indicator button', carousel);
    var indicators_len = indicators.length;
    // console.log(idx, indicators_len)

    while (indicators[--indicators_len]) {
      var index = parseInt(indicators[indicators_len].getAttribute('data-idx'));
      // console.log(idx, index, indicators_len);
      if ( index == idx ){
        addClass(indicators[indicators_len], 'active');
        // console.log('active ', indicators[indicators_len])
      } else {
        removeClass(indicators[indicators_len], 'active')
      }
      if ( idx == 0 ) {
        addClass(indicators[3], 'active');
      }
      if ( idx == 5 ) {
        addClass(indicators[0], 'active');
      }
    }
  }

  function chageItem() {
    // 변수 정의
    var list_idx = this.getAttribute('data-list-num');
    var desc_idx, item_idx;
    var carousel_contents = queryAll('.carousel-contents li');
    var carousel_contents_len = carousel_contents.length;
    var carousel_contents_idx = (carousel_contents_len + 1);

    var carousel_contents_desc = queryAll('.carousel-content-desc-wrapper');
    var carousel_contents_desc_len = carousel_contents_desc.length;

    var carousel_item_list = queryAll('.feature-experiences .feature-list li');
    var carousel_item_list_len = carousel_item_list.length;

    // 캐로셀 아이템 active처리
    while (carousel_item_list[--carousel_item_list_len]) {
      item_idx = carousel_item_list_len + 1;
      item_idx = '0' + item_idx;
      // console.log(item_idx);
      if ( list_idx === item_idx ) {
        addClass(carousel_item_list[carousel_item_list_len], 'active');
      } else {
        removeClass(carousel_item_list[carousel_item_list_len], 'active');
      }
    }

    // 캐로셀 데이터 변경
    while (carousel_contents[--carousel_contents_len]) {
      carousel_contents_idx += -1;
      css(carousel_contents[carousel_contents_len], 'background-image', 'url("dist/assets/img/gear-vr_territory_list' + list_idx + '_slide0' + carousel_contents_idx + '.jpg")')
    }

    // 캐로셀 desc에 active처리
    while (carousel_contents_desc[--carousel_contents_desc_len]) {
      // 아이템 리스트와 아이템 설명리스트의 인댁스 비교
      desc_idx = carousel_contents_desc[carousel_contents_desc_len].getAttribute('data-list-desc-idx');
      console.log(desc_idx, list_idx);
      
      if ( list_idx === desc_idx ) {
        addClass(carousel_contents_desc[carousel_contents_desc_len], 'active');
      } else {
        removeClass(carousel_contents_desc[carousel_contents_desc_len], 'active');
      }
    }

    return false;
  }

  // 초기화 실행
  init('.experience-carousel');

}(this));
