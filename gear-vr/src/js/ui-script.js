(function(global, TM){
  'use strict';

  // --------------------
  // ScrollTo. 
  // --------------------
  var gnb_btns = queryAll('.gnb a');
  var gnb_btns_len = gnb_btns.length;
  var footer_scroll_top = queryAll('.btn__back-to-top')[0]
  // console.log(gnb_btns);

  // 이벤트 바인딩 실행
  bindEvent();

  // 이벤트 바인딩
  function bindEvent() {
    while ( gnb_btns[--gnb_btns_len] ) {
      gnb_btns[gnb_btns_len].onclick = scrollTo; 
    }

    footer_scroll_top.onclick = scrollTo;
  }
  
  // 바인딩할 이벤트
  function scrollTo(e) {
    e.preventDefault();
    // console.log(this);
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


