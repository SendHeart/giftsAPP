(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/lazy-load-custom/lazy-load-custom"],{2815:function(t,n,e){"use strict";e.r(n);var o=e("de63"),i=e("ced3");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("3f15");var u=e("2877"),c=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=c.exports},"3f15":function(t,n,e){"use strict";var o=e("fb84"),i=e.n(o);i.a},"749e":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){for(var t=["shuijiao","muwu","cbd"],n=[],e=0;e<200;e++)n.push({src:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/".concat(t[e%3],".jpg"),show:!1,loaded:!1});return{windowHeight:0,placeholderSrc:"../../../static/60x60.png",list:n,show:!1}},methods:{load:function(){var n=this;t.createSelectorQuery().selectAll(".lazy").boundingClientRect(function(t){t.forEach(function(t,e){t.top<=n.windowHeight&&(n.list[t.dataset.index].show=!0)})}).exec()},imageLoad:function(t){this.list[t.target.dataset.index].loaded=!0}},onLoad:function(){this.windowHeight=t.getSystemInfoSync().windowHeight},onShow:function(){var t=this;this.show||(this.show=!0,setTimeout(function(){t.load()},100))},onPageScroll:function(){this.load()}};n.default=e}).call(this,e("6e42")["default"])},"86d1":function(t,n,e){"use strict";(function(t){e("ee7a"),e("921b");o(e("66fd"));var n=o(e("2815"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},ced3:function(t,n,e){"use strict";e.r(n);var o=e("749e"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a},de63:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},fb84:function(t,n,e){}},[["86d1","common/runtime","common/vendor"]]]);