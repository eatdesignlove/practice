/* GEAR VR UI Swiper @eatdeisnglove 2016 */

(function(global){
  'use strict';

  // 공통 변수
  var swiper;

  // 1. Swiper 초기화
  function init (selector) {
    //1.1 스타일 식별자 속성 설정
    swiper = query(selector);

    //1.2 스와이퍼 컨트롤러 템플릿 
    var swiper_controller_code = [
      '<div class="swiper-controller">',
        '<button class="btn__prev hide"><span class="a11y-hidden">Swipe to Previous Content</span><span class="fa fa-angle-left"></span></button>',
        '<button class="btn__next"><span class="a11y-hidden">Next to Previous Content</span><span class="fa fa-angle-right"></span></button>',
      '</div>'
    ].join('');

    swiper.insertAdjacentHTML('afterbegin', swiper_controller_code); 
  
    
    // 1.3 버튼에 이벤트 바인딩
    bindEvent();
  }

  // 2. 이벤트 바인딩
  // - 2.1 컨트롤러 버튼 
  // - 2.2 탭 타이틀 버튼

  function bindEvent() {
    var buttons = queryAll('.swiper-controller button');
    var buttons_len = buttons.length;
    var tabs = queryAll('.swiper-tap a');
    var tabs_len = tabs.length;

    while (buttons[--buttons_len]) {
      buttons[buttons_len].onclick = movingTabView;
    }
    while (tabs[--tabs_len]) {
      // console.log(tabs[tabs_len]);
      tabs[tabs_len].onclick = movingTabView;
    }
  }

  // 3. 버튼에 연결될 함수
    // - 3.1 뷰 이동 함수
  function movingTabView(){ 
    // 뷰 이동 관련 변수
    var swiper = query('.ui-swiper');
    var siwper_container = query('.swipe-list');
    var check_class = this.getAttribute('class');
    var tabs = queryAll('.swiper-tap a');
    var tabs_len = tabs.length;
    var buttons = queryAll('.swiper-controller button');
    var buttons_len = buttons.length;

    if ( /prev/.test(check_class) ) {
      // 뷰 이동 처리
      css(siwper_container, 'transform', 'translateX(0%)');
      // 탭 활성화
      addClass(tabs[0], 'active');
      removeClass(tabs[1], 'active');
      // 버튼 활성화
      addClass(buttons[0], 'hide');      
      removeClass(buttons[1], 'hide');
      // 배경 처리
      removeClass(swiper, 'active');
    } else {
      // 뷰 이동 처리
      css(siwper_container, 'transform', 'translateX(-100%)');
      // 탭 활성화
      addClass(tabs[1], 'active');
      removeClass(tabs[0], 'active');
      // 버튼 활성화
      addClass(buttons[1], 'hide');      
      removeClass(buttons[0], 'hide');
      // 배경 처리
      addClass(swiper, 'active');
    };

    return false;
  }   

  init('.ui-swiper');

}(this));
