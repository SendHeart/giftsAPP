(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/API/login/login"],{"02f3":function(e,n,t){"use strict";(function(e){t("ee7a"),t("921b");o(t("66fd"));var n=o(t("33a7"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},2213:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return a})},"33a7":function(e,n,t){"use strict";t.r(n);var o=t("2213"),a=t("48af");for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);t("43ba");var r=t("2877"),u=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=u.exports},"43ba":function(e,n,t){"use strict";var o=t("4f66"),a=t.n(o);a.a},"48af":function(e,n,t){"use strict";t.r(n);var o=t("b487"),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n["default"]=a.a},"4f66":function(e,n,t){},b487:function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=t("2f62");function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){r(e,n,t[n])})}return e}function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u={data:function(){return{title:"login",providerList:[]}},computed:i({},(0,a.mapState)(["hasLogin"])),onLoad:function(){var n=this;e.getProvider({service:"oauth",success:function(e){n.providerList=e.provider.map(function(e){var n="";switch(e){case"weixin":n="微信登录";break;case"qq":n="QQ登录";break;case"sinaweibo":n="新浪微博登录";break;case"xiaomi":n="小米登录";break;case"alipay":n="支付宝登录";break;case"baidu":n="百度登录";break;case"toutiao":n="头条登录";break}return{name:n,id:e}})},fail:function(e){console.log(o("获取登录通道失败",e," at pages\\API\\login\\login.vue:85"))}})},methods:i({},(0,a.mapMutations)(["login"]),{tologin:function(n){var t=this;e.login({provider:n.id,success:function(e){console.log(o("login success:",e," at pages\\API\\login\\login.vue:98")),t.login(n.id)},fail:function(e){console.log(o("login fail:",e," at pages\\API\\login\\login.vue:103"))}})}})};n.default=u}).call(this,t("6e42")["default"],t("0de9")["default"])}},[["02f3","common/runtime","common/vendor"]]]);