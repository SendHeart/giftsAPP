(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/extUI/segmented-control/segmented-control"],{1526:function(t,e,n){"use strict";var u=n("8dbf"),o=n.n(u);o.a},"3d31":function(t,e,n){"use strict";var u=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return u}),n.d(e,"b",function(){return o})},7025:function(t,e,n){"use strict";(function(t){n("ee7a"),n("921b");u(n("66fd"));var e=u(n("d379"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"8dbf":function(t,e,n){},"9a04":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=function(){return n.e("components/uni-segmented-control/uni-segmented-control").then(n.bind(null,"5336"))},o={components:{uniSegmentedControl:u},data:function(){return{items:["选项卡1","选项卡2","选项卡3"],styles:[{value:"button",text:"按钮",checked:!0},{value:"text",text:"文字"}],colors:["#007aff","#4cd964","#dd524d"],current:0,colorIndex:0,activeColor:"#007aff",styleType:"button"}},methods:{onClickItem:function(t){this.current!==t&&(this.current=t)},styleChange:function(t){this.styleType!==t.target.value&&(this.styleType=t.target.value)},colorChange:function(t){this.styleType!==t.target.value&&(this.activeColor=t.target.value)}}};e.default=o},d379:function(t,e,n){"use strict";n.r(e);var u=n("3d31"),o=n("f3ba");for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n("1526");var a=n("2877"),c=Object(a["a"])(o["default"],u["a"],u["b"],!1,null,null,null);e["default"]=c.exports},f3ba:function(t,e,n){"use strict";n.r(e);var u=n("9a04"),o=n.n(u);for(var r in u)"default"!==r&&function(t){n.d(e,t,function(){return u[t]})}(r);e["default"]=o.a}},[["7025","common/runtime","common/vendor"]]]);