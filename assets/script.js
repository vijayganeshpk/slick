(function () {
  'use strict';

  function setElementClass(selector, value, ignores) {
      var elements = document.querySelectorAll(selector);
      for (var num in elements) {
          if (elements.hasOwnProperty(num)) {
              var cls = elements[num].className;
              if (ignores === undefined || ignores.indexOf(cls) < 0) {
                  elements[num].className = value;
              }
          }
      }
  }
  var RSElem = (function () {
      function RSElem(selector, hi, lo) {
          this.selector = selector;
          this.hi = hi;
          this.lo = lo;
      }
      return RSElem;
  }());
  var WRS_ELEMENTS = [
      new RSElem(".pure-menu", "pure-menu pure-menu-horizontal", "pure-menu"),
      new RSElem(".navigation-header-subtitle", "pure-menu-list navigation-header-subtitle pull-end", "pure-menu-list navigation-header-subtitle"),
      new RSElem(".navigation-header", "navigation-header clearfix", "navigation-header"),
  ];
  function windowResized() {
      function resized() {
          var isWide = (document.documentElement.clientWidth >= 768);
          for (var _i = 0, WRS_ELEMENTS_1 = WRS_ELEMENTS; _i < WRS_ELEMENTS_1.length; _i++) {
              var elem = WRS_ELEMENTS_1[_i];
              setElementClass(elem.selector, isWide ? elem.hi : elem.lo);
          }
      }
      resized();
      window.addEventListener("resize", resized);
  }
  function backToTop() {
      var button = document.getElementById("btn-gototop");
      if (null === button) {
          return;
      }
      button.addEventListener("click", function () {
          function scroll() {
              var offset = window.pageYOffset;
              if (offset > 0) {
                  setTimeout(scroll, 8);
              }
              window.scroll(0, offset - 128);
          }
          scroll();
      });
  }
  document.addEventListener("DOMContentLoaded", function () {
      setElementClass("img", "pure-img");
      setElementClass("table", "pure-table", ["lntable"]);
      windowResized();
      backToTop();
  });

}());
