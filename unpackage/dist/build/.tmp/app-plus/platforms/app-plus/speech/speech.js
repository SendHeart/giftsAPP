(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["platforms/app-plus/speech/speech"],{"5a43":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return u})},"7a48":function(e,t,n){"use strict";(function(e,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=s(n("a34a")),a=s(n("80dc"));function s(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,r,u,a,s){try{var c=e[a](s),o=c.value}catch(i){return void n(i)}c.done?t(o):Promise.resolve(o).then(r,u)}function o(e){return function(){var t=this,n=arguments;return new Promise(function(r,u){var a=e.apply(t,n);function s(e){c(a,r,u,s,o,"next",e)}function o(e){c(a,r,u,s,o,"throw",e)}s(void 0)})}}var i={data:function(){return{title:"speech",value:""}},onUnload:function(){this.value=""},methods:{startRecognize:function(){var t=o(u.default.mark(function t(){var n,r,a;return u.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.checkPermission();case 2:if(n=t.sent,1===n){t.next=5;break}return t.abrupt("return");case 5:r={},a=this,r.engine="baidu",a.value="",plus.speech.startRecognize(r,function(t){console.log(e(t," at platforms\\app-plus\\speech\\speech.vue:42")),a.value+=t},function(t){console.log(e("语音识别失败："+t.message," at platforms\\app-plus\\speech\\speech.vue:45"))});case 10:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),startRecognizeEnglish:function(){var t=o(u.default.mark(function t(){var n,r,a;return u.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.checkPermission();case 2:if(n=t.sent,1===n){t.next=5;break}return t.abrupt("return");case 5:r={},a=this,r.engine="baidu",r.lang="en-us",a.value="",plus.speech.startRecognize(r,function(t){console.log(e(t," at platforms\\app-plus\\speech\\speech.vue:63")),a.value+=t},function(t){console.log(e("语音识别失败："+t.message," at platforms\\app-plus\\speech\\speech.vue:66"))});case 11:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),checkPermission:function(){var e=o(u.default.mark(function e(){var t;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!a.default.isIOS){e.next=6;break}return e.next=3,a.default.requestIOS("record");case 3:e.t0=e.sent,e.next=9;break;case 6:return e.next=8,a.default.requestAndroid("android.permission.RECORD_AUDIO");case 8:e.t0=e.sent;case 9:return t=e.t0,null===t||1===t?t=1:2===t?r.showModal({content:"系统麦克风已关闭",confirmText:"设置",success:function(e){e.confirm&&a.default.gotoiOSSetting()}}):r.showModal({content:"需要麦克风权限",confirmText:"设置",success:function(e){e.confirm&&a.default.gotoAppSetting()}}),e.abrupt("return",t);case 12:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}};t.default=i}).call(this,n("0de9")["default"],n("6e42")["default"])},8821:function(e,t,n){"use strict";(function(e){n("ee7a"),n("921b");r(n("66fd"));var t=r(n("aed0"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},aed0:function(e,t,n){"use strict";n.r(t);var r=n("5a43"),u=n("c818");for(var a in u)"default"!==a&&function(e){n.d(t,e,function(){return u[e]})}(a);var s=n("2877"),c=Object(s["a"])(u["default"],r["a"],r["b"],!1,null,null,null);t["default"]=c.exports},c818:function(e,t,n){"use strict";n.r(t);var r=n("7a48"),u=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);t["default"]=u.a}},[["8821","common/runtime","common/vendor"]]]);