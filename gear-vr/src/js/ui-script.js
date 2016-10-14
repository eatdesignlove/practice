(function(global, TM){
  'use strict';

  // --------------------
  // ScrollTo. 
  // --------------------
  var gnb_btns = queryAll('.gnb a');
  var gnb_btns_len = gnb_btns.length;
  var btn_footer_scroll_top = queryAll('.btn__back-to-top')[0];
  var btn_scroll_edge = query('.btn__scroll-to-edge');

  // 이벤트 바인딩 실행
  bindEvent();

  // 이벤트 바인딩
  function bindEvent() {
    while ( gnb_btns[--gnb_btns_len] ) {
      gnb_btns[gnb_btns_len].onclick = scrollTo; 
    }
    btn_footer_scroll_top.onclick = scrollTo;
    btn_scroll_edge.onclick = scrollTo;
  }
  
  // 바인딩할 이벤트
  function scrollTo(e) {
    e.preventDefault();
    console.log(this);
    var selector = '.' + this.getAttribute('data-section-title');
    var scrollYPos;
    console.log(selector);

    if (selector === '.null') {
      scrollYPos = 0;
    } else {
      scrollYPos = getOffset(query(selector)).offsetTop;
    }

    TM.to(window, 2, {scrollTo:{y:scrollYPos, x:0}, ease:Power4.easeInOut})
  }

}(this, this.TweenMax));


(function(global, TM){
  'use strict';

  // --------------------
  // .dropdown-menu in footer
  // --------------------
  var dim = query('.dim');
  var btn_network_toggle = query(".btn__network-toggle");
  var list_network_toggle = query(".container__network-setting-list");
  
  // 조건처리하기 위해 ~를 사용
  btn_network_toggle.visible = false;

  // 이벤트 바인딩
  btn_network_toggle.onclick = toggleNetworkDropdown;

  // 바인딩할 함수
  function toggleNetworkDropdown() {
    if (btn_network_toggle.visible === false) {
      btn_network_toggle.visible = true;
      addClass(list_network_toggle, 'show');
      // addClass(dim, 'show');
    } else {
      btn_network_toggle.visible = false;
      removeClass(list_network_toggle, 'show');
      // removeClass(dim, 'show');
    }
    
  }


}(this, this.TweenMax));



(function(global){
  'use strict';

  // --------------------
  // A11y-Mode 
  // --------------------
  var a11y_contrast_color = query('.btn__a11y-color-contrast');
  var a11y_contrast_default = query('.btn__a11y-color-default');
  var a11y_target = [
    '.brand-logo',
    '.page-menu',
    '.page-menu-fixed',
    '.contianer__product-brand',
    '.gnb-menu li',
    '.gnb-menu li a',
    '.btn__scroll-to-edge',
    '.feature__title',
    '.feature__desc',
    '.list-title',
    '.list-desc',
    '.container__links a',
    '.btn__go-gallery',
    '.feature-specification h3',
    '.feature-specification p',
    '.btn__next',
    '.btn__prev',
    '.carousel-indicator button',
    '.feature-experiences .feature-list li',
    '.feture-vr-gallery li',
    '.page-footer',
    '.container__share a',
    '.container__sm-links a',
    '.container__add-links a',
    '.container__utility a',
    '.container__network-setting-list',
    '.btn__a11y-color-default',
    '.container__add-links button',
    '.copyright',
  ];
  var a11y_target_len, a11y_target_els, a11y_target_els_len;


  // 이벤트 바인딩
  bindEvent();

  function bindEvent() {
    a11y_contrast_color.onclick = changeA11yColorMode;
    a11y_contrast_default.onclick = changeA11yColorMode;
  }

  // 바인딩할 함수
  function changeA11yColorMode() {
    var mode_type = this.getAttribute('data-color-mode');
    a11y_target_len = a11y_target.length;
    console.log(mode_type);

    while ( a11y_target[--a11y_target_len] ) {
      a11y_target_els = queryAll(a11y_target[a11y_target_len]);
      a11y_target_els_len = a11y_target_els.length;
      // console.log(a11y_target_els, a11y_target_els_len);

      while( a11y_target_els[--a11y_target_els_len] ) {
        if ( mode_type === 'a11y') {
          addClass(a11y_target_els[a11y_target_els_len], 'a11y-color-mode');

        } else {
          removeClass(a11y_target_els[a11y_target_els_len], 'a11y-color-mode');

        }
      }
    }  
  }





}(this));



