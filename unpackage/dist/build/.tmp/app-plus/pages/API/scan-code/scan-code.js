(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/API/scan-code/scan-code"],{"0c11":function(e,t,n){"use strict";n.r(t);var r=n("e423"),u=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);t["default"]=u.a},"27e7":function(e,t,n){"use strict";var r=n("702e"),u=n.n(r);u.a},"5b14":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return u})},"702e":function(e,t,n){},a4dd:function(e,t,n){"use strict";(function(e){n("ee7a"),n("921b");r(n("66fd"));var t=r(n("c4a5"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},c4a5:function(e,t,n){"use strict";n.r(t);var r=n("5b14"),u=n("0c11");for(var a in u)"default"!==a&&function(e){n.d(t,e,function(){return u[e]})}(a);n("27e7");var c=n("2877"),i=Object(c["a"])(u["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports},e423:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("a34a")),u=a(n("80dc"));function a(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,r,u,a,c){try{var i=e[a](c),o=i.value}catch(s){return void n(s)}i.done?t(o):Promise.resolve(o).then(r,u)}function i(e){return function(){var t=this,n=arguments;return new Promise(function(r,u){var a=e.apply(t,n);function i(e){c(a,r,u,i,o,"next",e)}function o(e){c(a,r,u,i,o,"throw",e)}i(void 0)})}}var o={data:function(){return{title:"scanCode",result:""}},methods:{scan:function(){var t=i(r.default.mark(function t(){var n,u=this;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.checkPermission();case 2:if(n=t.sent,1===n){t.next=5;break}return t.abrupt("return");case 5:e.scanCode({success:function(e){u.result=e.result},fail:function(e){}});case 6:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),checkPermission:function(){var t=i(r.default.mark(function t(n){var a;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!u.default.isIOS){t.next=6;break}return t.next=3,u.default.requestIOS("camera");case 3:t.t0=t.sent,t.next=9;break;case 6:return t.next=8,u.default.requestAndroid("android.permission.CAMERA");case 8:t.t0=t.sent;case 9:return a=t.t0,null===a||1===a?a=1:e.showModal({content:"需要相机权限",confirmText:"设置",success:function(e){e.confirm&&u.default.gotoAppSetting()}}),t.abrupt("return",a);case 12:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}()}};t.default=o}).call(this,n("6e42")["default"])}},[["a4dd","common/runtime","common/vendor"]]]);