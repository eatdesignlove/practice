/* DOMHelper.js */
(function(global){
  'use strict';

  //isType - 모든 데이터 유형을 올바르게 감지
  function isType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }

  // equal 느슨한 데이터 비교
  function equal(data1, data2) {
    return data1 == data2;
  }

  // strictEqual 엄격한 데이터 비교
  function strictEqual(data1, data2) {
    return data1 === data2;
  }

  // throwError 데이터 유형을 파악하여 다른 때 오류발생
  function throwError(type1, type2, err_msg) {
    err_msg = err_msg || '기본 오류 메시지';
    if ( isType(type1) !== type2 ) { throw new Error(err_msg); }
  }

  // prependChild - 첫 자식으로 추가
  function prependChild(parent_node, child_node) {
    parent_node.insertBefore(child_node, parent_node.firstChild);
  }

  // insertAfter - 특정 요소 뒤에 추가
  function insertAfter(target_node, insert_node) {
    var next_node = target_node.nextSibling;
    var parent_node = target_node.parentNode;
    if ( next_node === null ) {
      parent_node.appendChild(insert_node);
    } else {
      parent_node.insertBefore(insert_node ,next_node);
    }
  }

  // queryAll - 셀렉터를 이용해 요소 탐색
  function queryAll(selector_string, context) {
    throwError(selector_string, 'string', '첫번째 인자는 문자 유형이어야 합니다.');

    if (!context) { context = document; } 
    return context.querySelectorAll(selector_string);
  }

  // query - 셀렉터를 이용해 첫번째 요소 탐색
  function query(selector_string, context) {
    throwError(selector_string, 'string', '인자는 문자 유형이어야 합니다.');
    return queryAll(selector_string, context)[0];
  }

  // removeNode - 노드 제거
  function removeNode(node) {
    node.parentNoe.removeChild(node);
  }

  // createNode - 노드 생성(텍스트 추가 가능) 
  function createNode(el_name, text) {
  var el_node = document.createElement(el_name);
    if ( typeof text !== 'undefined' && typeof text === 'string' ) {
      var text_node = document.createTextNode(text);
      el_node.appendChild(text_node);
    }
    return el_node;
  }

  // camelCase - 전달된 텍스트를 카멜케이스화하여 반환
  function camelCase(text) {
    return text.replace(/(\s|-|_)./g, function($1){
      return $1.replace(/(\s|-|_)/g,'').toUpperCaes();
    });
  }

  // getStyle
  function getStyle(el, property, pseudo) {
    var value, el_style;

    if ( el.nodeType !== 1 ){
      console.log('첫번째 인자는 요소노드여야 합니다.');
    }
    throwError(property, 'string','두번째 인자는 문자열이어야 합니다.');
    if (pseudo && isType(pseudo) !== 'string' ) {
      console.log('세번째 인자는 문자열이어야 합니다.')
    }

    property = camelCase(property);
    if ( window.getComputedStyle ) {
      el_style = window.getComputedStyle(el, pseudo);
      if (pseudo && el_style.content === '' ) {
        return null; 
      }
      value = el_style[property];
    } else {
      value = el.currentStyle[property];
    }
    return value;
  }

  // setStyle
  function setStyle(el, property, value) {
    if ( el.nodeType !== 1 ) {
      errorMsg('첫번재 인자는 요소노드여야 합니다.')
    }
    throwError(property, 'string', '두번째 인자는 문자열이어야 합니다.');
    el.style[property] = value;
  }

  // css
  function css(el, property, value) {
    if ( !value ){
      return getStyle(el, property);
    } else {
      return setStyle(el, property, value);
    }
  }

  // errorMsg
  function errorMsg(message) {
    throwError(message, 'string', '오류 메시지는 문자열이어야 합니다.');
    throw new Error(message);
  }

  // isElNode
  function isElNode(node) {
    return node.nodeType === 1;
  }

  // isntElNode
  function isntEl(node) {
    return node.nodeType !== 1;
  }

  // isElName
  function isElName(node, name) {
    if (isntEl(node)) {errorMsg('첫번재 인자는 요소노드여야 합니다.')}
    throwError(name, 'string', '두번째 인자는 문자열이어야 합니다.'); 
    return (node.localName || node.nodeName.toLowerCase()) === name;
  }

  // isntElName
  function isntElName(node, name) {
    return !isElName(node, name);
  }

  // isTextNode
  function isTextNode(node) {
    return node.nodeType === 3;
  }

  // isntTextNode
  function isntTextNode(node) {
    return !isTextNode(node);
  }

  // prevEl - 이전 형제 요소를 찾는다.
  function prevEl(node) {
    if (isntEl(node)) { errorMsg('인자는 요소노드여야 합니다.') }
    if (node.previousElementSibling) {
      return node.previousElementSibling;
    } 
    else {
      do { node = node.previousSibling }
      while(node && !isElNode(node));
      return node;
    }
  }

  // nextEl - 다음 형제 요소 노드를 찾는다.
  function nextEl(node) {
    if (isntEl(node)) { errorMsg('인자는 요소노드여야 합니다.')}
    if (node.nextElementSibling) {
      return node.nextElementSibling;
    }
    else {
      do { node = node.nextSibling; } 
      while(node && !isElNode(node));
      return node;
    }
  }

  // firstEl - 첫번째 자식 요소 노드를 찾는다.
  function firstEl(node) {
    if ( isntEl(node)) { errorMsg('인자는 요소노드여야 합니다.')}
    if ( node.firstElementChild ) {
      return node.firstElementChild;
    }
    else {
      node = node.firstChild;
      return (node && instElNode(node)) ? nextEl(node) : node;
    }
  }

  // lastEl - 마지막 자식 요소 노드를 찾는다.
  function lastEl(node) {
    if ( instEl(node)) { errorMsg('인자는 요소노드여야 합니다.')}
    if ( node.lastElementChild ) {
      return node.lastElementChild;
    }
    else {
      node = lastChild;
      return (node && instElNode(NODE)) ? prevEl(node) : node;
    }
  }
 
  // getUnit - 단위 제거/가져오기/소유하고 있는지 확인
  // 함수도 객체. 프로퍼티로 단위값을 추가.
  function getUnit(value) {
    var i=0, l= getUnit.units.length, unit;
    for (; i < l; i++) {
      unit = getUnit.units[i];
      if (value.indexOf(unit) > -1 ) {
        return unit;
      }
    }
    return null;
  }
  getUnit.units = 'px rem em % vw vh vmin vmax'.split(' ');

  // removeUnit - 단위값을 제거
  function removeUnit(value) {
    removeUnit.unit = getUnit(value);
    return parseFloat(value, 10);
  }
  removeUnit.unit = null;

  // hasUnit - 단위값을 가지고 있는지 확인
  function hasUnit(value) {
  return !!getUnit(value);
}

  // makeArray - 유사배열을 배열화
  function makeArray(data) {
    var check_data = isType(data), result_arr = [], len = data.length;

    if ( check_data === 'array' ) {
      return data;
    }

    if ( len && check_data !== 'string'  ) {
      while ( len-- ) {
        result_arr.push( data[len] );
      }
    }
    return result_arr.reverse();
  }

  // 1.클로저를 사용하는 방법으로 문제 해걀
  function convertArray_wrapper() {
    var closureFn;
    if (Array.from) {
      closureFn = function(data) {
        return Array.from(data);
      }
    } else {
      closureFn = function(data) {
        return Array.prototype.slice.call(data);
      }
    }
    return closureFn;
  }
  var convertArray = convertArray_wrapper();

  // 2.약식패턴을 사용하여 클로저 처리하는 문제 해결방법
  var convertArray = (function(){
    if (Array.form) {
      return function(data){
        return Array.from(data); 
      }
    } else {
      return function(data) {
        return Array.prototype.slice.call(data);
      }
    }

  }())


  function addClass(node, name) {
    if ( isntEl(node)) { errorMsg('첫번째 인자는 요소노드여야 합니다.')}
    throwError(name, 'string', '두번째 인자는 문자열이어야 합니다.');
    if (node.classList) {
      return node.classList.add(name);
    }
    else {
      var className = node.getAttribute('class');
      name = className +' '+ name
      return node.setAttribute('class', name);  
    }
  } 

  function removeClass(node, name) {
    if ( isntEl(node)) { errorMsg('첫번째 인자는 요소노드여야 합니다.')}
    throwError(name, 'string', '두번째 인자는 문자열이어야 합니다.');

    if (node.classList) {
      return node.classList.remove(name);
    }
    else {
      var className = node.getAttribute('class');
      var names = className.split(' ');
      var classValues = [];
      for (var i=0; i < names.length; i++) {
        if ( names[i] !== name ) {
          classValues.push(names[i])
        }
      }
      names = classValues.join(' ')
      return node.setAttribute('class', names)
    }
  }

  function hasClass(node, name) {
    var result;

    if (node.classList) {
      var l = node.classList;
      for (var i = 0; i < l.length ; i++) {
        if (l[i] === name) { result = true; }
      }
    } else {
      var className = node.getAttribute('class');
      var names = className.split(' ');
      for (var i=0; i < names.length; i++) {
        if ( names[i] === name ) { result = true; }
      }
    }
    return (result === true) ? true : false;
  }

  // cleanWhiteSpace
  function cleanWhiteSpace(el) {
      el = el || document;
      var current_node = el.firstChild;
      while( current_node ) {
        if ( current_node.nodeType === 3 && !/\S/.test(current_node.nodeValue) ) {
            removeNode(current_node);
        } else if ( current_node.nodeType === 1 ) {
            cleanWhiteSpace(current_node);
        }
        current_node = current_node.nextSibling;
      }
  }

  // getOffset
  function getOffset(el) {
    var elLeft = 0;
    var elTop = 0;
    if (el.offsetParent) {
      do {
        elLeft += el.offsetLeft;
        elTop  += el.offsetTop;
      } while ( el = el.offsetParent);
      return {
        offsetLeft: elLeft,
        offsetTop : elTop
      }
    }
  }


  // DOM Traversing
  global.queryAll         = queryAll;
  global.query            = query;
  global.nextEl           = nextEl;
  global.prevEl           = prevEl;
  global.firstEl          = firstEl;
  global.lastEl           = lastEl;
  
  // Node Manipulating
  global.createNode       = createNode;
  global.removeNode       = removeNode;
  global.insertAfter      = insertAfter;
  global.prependChild     = prependChild;
  global.getOffset        = getOffset;

  // CSS & Attributes
  global.addClass         = addClass;
  global.removeClass      = removeClass;
  global.hasClass         = hasClass;
  global.css              = css;
  global.hasUnit          = hasUnit;
  global.getUnit          = getUnit;
  global.removeUnit       = removeUnit;
  

  global.makeArray        = makeArray;
  global.cleanWhiteSpace  = cleanWhiteSpace;

}(this))
