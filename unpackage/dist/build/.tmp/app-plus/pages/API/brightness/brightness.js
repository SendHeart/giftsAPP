(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/API/brightness/brightness"],{"00fc":function(e,n,t){"use strict";(function(e){t("ee7a"),t("921b");s(t("66fd"));var n=s(t("53dc"));function s(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},"20db":function(e,n,t){"use strict";var s=t("fd3f"),c=t.n(s);c.a},3537:function(e,n,t){"use strict";t.r(n);var s=t("d920"),c=t.n(s);for(var r in s)"default"!==r&&function(e){t.d(n,e,function(){return s[e]})}(r);n["default"]=c.a},"53dc":function(e,n,t){"use strict";t.r(n);var s=t("c857"),c=t("3537");for(var r in c)"default"!==r&&function(e){t.d(n,e,function(){return c[e]})}(r);t("20db");var i=t("2877"),u=Object(i["a"])(c["default"],s["a"],s["b"],!1,null,null,null);n["default"]=u.exports},c857:function(e,n,t){"use strict";var s=function(){var e=this,n=e.$createElement;e._self._c},c=[];t.d(n,"a",function(){return s}),t.d(n,"b",function(){return c})},d920:function(e,n,t){"use strict";(function(e,t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s={data:function(){return{title:"brightness",screen:0,keepScreenOn:!0}},onLoad:function(){var n=this;e.getScreenBrightness({success:function(e){console.log(t(e," at pages\\API\\brightness\\brightness.vue:30")),n.screen=(100*e.value).toFixed(),console.log(t("屏幕亮度值："+n.screen," at pages\\API\\brightness\\brightness.vue:32"))},fail:function(e){console.log(t(e," at pages\\API\\brightness\\brightness.vue:35"))}})},methods:{sliderChange:function(n){var s=n.detail.value;this.screen!==s&&(console.log(t("当前数值："+n.detail.value," at pages\\API\\brightness\\brightness.vue:44")),e.setScreenBrightness({value:s/100,success:function(){console.log(t("success"," at pages\\API\\brightness\\brightness.vue:48"))},fail:function(e){console.log(t(e," at pages\\API\\brightness\\brightness.vue:51"))}}),this.screen=s)},keep:function(){e.setKeepScreenOn({keepScreenOn:this.keepScreenOn}),this.keepScreenOn=!this.keepScreenOn}}};n.default=s}).call(this,t("6e42")["default"],t("0de9")["default"])},fd3f:function(e,n,t){}},[["00fc","common/runtime","common/vendor"]]]);