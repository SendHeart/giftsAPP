(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/API/intersection-observer/intersection-observer"],{3610:function(e,t,n){"use strict";var r=n("7d94"),a=n.n(r);a.a},"7d94":function(e,t,n){},a43f:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=null,r={data:function(){return{appear:!1,title:"intersectionObserver"}},onReady:function(){var t=this;n=e.createIntersectionObserver(this),n.relativeTo(".scroll-view").observe(".ball",function(e){e.intersectionRatio>0&&!t.appear?t.appear=!0:!e.intersectionRatio>0&&t.appear&&(t.appear=!1)})},onUnload:function(){n&&n.disconnect()}};t.default=r}).call(this,n("6e42")["default"])},bdfc:function(e,t,n){"use strict";n.r(t);var r=n("d45f"),a=n("e15d");for(var c in a)"default"!==c&&function(e){n.d(t,e,function(){return a[e]})}(c);n("3610");var i=n("2877"),o=Object(i["a"])(a["default"],r["a"],r["b"],!1,null,null,null);t["default"]=o.exports},d45f:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},e15d:function(e,t,n){"use strict";n.r(t);var r=n("a43f"),a=n.n(r);for(var c in r)"default"!==c&&function(e){n.d(t,e,function(){return r[e]})}(c);t["default"]=a.a},fcc8:function(e,t,n){"use strict";(function(e){n("ee7a"),n("921b");r(n("66fd"));var t=r(n("bdfc"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])}},[["fcc8","common/runtime","common/vendor"]]]);