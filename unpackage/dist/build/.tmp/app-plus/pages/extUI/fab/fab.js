(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/extUI/fab/fab"],{1075:function(t,e,n){"use strict";n.r(e);var o=n("2ebf"),a=n("9187");for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);n("263b");var i=n("2877"),r=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},2274:function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){return n.e("components/uni-fab/uni-fab").then(n.bind(null,"56c5"))},c={components:{uniFab:a},data:function(){return{title:"uni-fab",directionStr:"垂直",horizontal:"left",vertical:"bottom",direction:"horizontal",pattern:{color:"#7A7E83",backgroundColor:"#fff",selectedColor:"#007AFF",buttonColor:"#007AFF"},content:[{iconPath:"/static/component.png",selectedIconPath:"/static/componentHL.png",text:"组件",active:!1},{iconPath:"/static/api.png",selectedIconPath:"/static/apiHL.png",text:"API",active:!1},{iconPath:"/static/template.png",selectedIconPath:"/static/templateHL.png",text:"模版",active:!1}]}},onBackPress:function(){return!!this.$refs.fab.isShow&&(this.$refs.fab.close(),!0)},methods:{trigger:function(e){console.log(t(e," at pages\\extUI\\fab\\fab.vue:63")),this.content[e.index].active=!e.item.active,o.showModal({title:"提示",content:"您".concat(this.content[e.index].active?"选中了":"取消了").concat(e.item.text),success:function(e){e.confirm?console.log(t("用户点击确定"," at pages\\extUI\\fab\\fab.vue:70")):e.cancel&&console.log(t("用户点击取消"," at pages\\extUI\\fab\\fab.vue:72"))}})},switchBtn:function(t,e){0===t?(this.direction="horizontal"===this.direction?"vertical":"horizontal",this.directionStr="horizontal"===this.direction?"垂直":"水平"):(this.horizontal=t,this.vertical=e),this.$forceUpdate()}}};e.default=c}).call(this,n("0de9")["default"],n("6e42")["default"])},"263b":function(t,e,n){"use strict";var o=n("cad8"),a=n.n(o);a.a},"2ebf":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},"5c0a":function(t,e,n){"use strict";(function(t){n("ee7a"),n("921b");o(n("66fd"));var e=o(n("1075"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},9187:function(t,e,n){"use strict";n.r(e);var o=n("2274"),a=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);e["default"]=a.a},cad8:function(t,e,n){}},[["5c0a","common/runtime","common/vendor"]]]);