(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-component-text-text"],{"0c92":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".text-box[data-v-073e173c]{margin-bottom:%?40?%;padding:%?40?% 0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;min-height:%?300?%;background-color:#fff;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center;font-size:%?30?%;color:#353535;line-height:1.8}",""])},"3a7f":function(t,e,n){"use strict";n.r(e);var i=n("5d03"),a=n("e2cb");for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n("aa73");var s=n("2877"),c=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,"073e173c",null);e["default"]=c.exports},"5d03":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("page-head",{attrs:{title:t.title}}),n("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[n("v-uni-view",{staticClass:"text-box",attrs:{"scroll-y":"true"}},[n("v-uni-text",[t._v(t._s(t.text))])],1),n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary",disabled:!t.canAdd},on:{click:function(e){e=t.$handleEvent(e),t.add(e)}}},[t._v("add line")]),n("v-uni-button",{attrs:{type:"warn",disabled:!t.canRemove},on:{click:function(e){e=t.$handleEvent(e),t.remove(e)}}},[t._v("remove line")])],1)],1)],1)},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"958e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{title:"text",texts:["HBuilder，200万开发者选择的IDE","MUI，轻巧、漂亮的前端开源框架","wap2app，M站快速转换原生体验的App","5+Runtime，为HTML5插上原生的翅膀","HBuilderX，轻巧、极速，极客编辑器","uni-app，终极跨平台方案","HBuilder，200万开发者选择的IDE","MUI，轻巧、漂亮的前端开源框架","wap2app，M站快速转换原生体验的App","5+Runtime，为HTML5插上原生的翅膀","HBuilderX，轻巧、极速，极客编辑器","uni-app，终极跨平台方案","......"],text:"",canAdd:!0,canRemove:!1,extraLine:[]}},methods:{add:function(t){this.extraLine.push(this.texts[this.extraLine.length%12]),this.text=this.extraLine.join("\n"),this.canAdd=this.extraLine.length<12,this.canRemove=this.extraLine.length>0},remove:function(t){this.extraLine.length>0&&(this.extraLine.pop(),this.text=this.extraLine.join("\n"),this.canAdd=this.extraLine.length<12,this.canRemove=this.extraLine.length>0)}}};e.default=i},aa73:function(t,e,n){"use strict";var i=n("dd2a"),a=n.n(i);a.a},dd2a:function(t,e,n){var i=n("0c92");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("6d46a258",i,!0,{sourceMap:!1,shadowMode:!1})},e2cb:function(t,e,n){"use strict";n.r(e);var i=n("958e"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e["default"]=a.a}}]);