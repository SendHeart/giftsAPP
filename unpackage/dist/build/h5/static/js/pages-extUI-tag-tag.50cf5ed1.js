(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-extUI-tag-tag"],{"03d1":function(t,e,i){"use strict";i.r(e);var a=i("7546"),n=i("e654");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("bcd0");var r=i("2877"),l=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"51a5915b",null);e["default"]=l.exports},"0574":function(t,e,i){"use strict";var a=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("b046")),s={components:{uniTag:n.default},data:function(){return{type:"default",inverted:!1}},methods:{setType:function(){var t=["default","primary","success","warning","error"],e=t.indexOf(this.type);t.splice(e,1);var i=Math.floor(4*Math.random());this.type=t[i]},setInverted:function(){this.inverted=!this.inverted}}};e.default=s},"37af":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniTag",props:{type:{type:String,default:"default"},size:{type:String,default:"normal"},text:{type:String,default:""},disabled:{type:[String,Boolean],defalut:!1},inverted:{type:[String,Boolean],defalut:!1},circle:{type:[String,Boolean],defalut:!1},mark:{type:[String,Boolean],defalut:!1}},methods:{onClick:function(){!0!==this.disabled&&"true"!==this.disabled&&this.$emit("click")}}};e.default=a},"37d7":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-tag[data-v-04ef1f08]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 %?32?%;height:%?60?%;line-height:calc(%?60?% - 2px);font-size:%?28?%;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:#333;border-radius:%?6?%;background-color:#f8f8f8;border:1px solid #f8f8f8}.uni-tag--circle[data-v-04ef1f08]{border-radius:%?30?%}.uni-tag--mark[data-v-04ef1f08]{border-radius:0 %?30?% %?30?% 0}.uni-tag--disabled[data-v-04ef1f08]{opacity:.5}.uni-tag--small[data-v-04ef1f08]{height:%?40?%;padding:0 %?16?%;line-height:calc(%?40?% - 2px);font-size:%?24?%}.uni-tag--primary[data-v-04ef1f08]{color:#fff;background-color:#007aff;border:1px solid #007aff}.uni-tag--primary.uni-tag--inverted[data-v-04ef1f08]{color:#007aff;background-color:#fff;border:1px solid #007aff}.uni-tag--success[data-v-04ef1f08]{color:#fff;background-color:#4cd964;border:1px solid #4cd964}.uni-tag--success.uni-tag--inverted[data-v-04ef1f08]{color:#4cd964;background-color:#fff;border:1px solid #4cd964}.uni-tag--warning[data-v-04ef1f08]{color:#fff;background-color:#f0ad4e;border:1px solid #f0ad4e}.uni-tag--warning.uni-tag--inverted[data-v-04ef1f08]{color:#f0ad4e;background-color:#fff;border:1px solid #f0ad4e}.uni-tag--error[data-v-04ef1f08]{color:#fff;background-color:#dd524d;border:1px solid #dd524d}.uni-tag--error.uni-tag--inverted[data-v-04ef1f08]{color:#dd524d;background-color:#fff;border:1px solid #dd524d}.uni-tag--inverted[data-v-04ef1f08]{color:#333;background-color:#fff;border:1px solid #f8f8f8}",""])},"3fb8":function(t,e,i){var a=i("37d7");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("4c27cfcf",a,!0,{sourceMap:!1,shadowMode:!1})},"50cb":function(t,e,i){"use strict";i.r(e);var a=i("37af"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},"5bfa":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.text?i("v-uni-view",{staticClass:"uni-tag",class:[!0===t.disabled||"true"===t.disabled?"uni-tag--disabled":"",!0===t.inverted||"true"===t.inverted?"uni-tag--inverted":"",!0===t.circle||"true"===t.circle?"uni-tag--circle":"",!0===t.mark||"true"===t.mark?"uni-tag--mark":"","uni-tag--"+t.size,"uni-tag--"+t.type],on:{click:function(e){e=t.$handleEvent(e),t.onClick()}}},[t._v(t._s(t.text))]):t._e()},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},7546:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"example-info"},[t._v("标签组件多用于商品分类、重点内容显示等场景。")]),i("v-uni-view",{staticClass:"example-title"},[t._v("实心标签")]),i("v-uni-view",{staticClass:"example-body"},[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"primary"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"success"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"warning"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"error"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("空心标签")]),i("v-uni-view",{staticClass:"example-body"},[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签",type:"primary"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签",type:"success"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签",type:"warning"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签",type:"error"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("圆角样式")]),i("v-uni-view",{staticClass:"example-body"},[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{circle:!0,text:"标签",type:"primary",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,circle:!0,text:"标签",type:"success",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{circle:!0,text:"标签",type:"warning"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,circle:!0,text:"标签",type:"error"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("标记样式")]),i("v-uni-view",{staticClass:"example-body"},[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{mark:!0,text:"标签",type:"primary",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{mark:!0,text:"标签",type:"success",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{mark:!0,text:"标签",type:"warning"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{mark:!0,circle:!0,text:"标签",type:"error"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("点击事件")]),i("v-uni-view",{staticClass:"example-body"},[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{type:t.type,text:"标签"},on:{click:function(e){e=t.$handleEvent(e),t.setType(e)}}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{circle:!0,inverted:t.inverted,text:"标签",type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.setInverted(e)}}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("小标签")]),i("v-uni-view",{staticClass:"example-body"},[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"primary",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"success",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,mark:!0,text:"标签",type:"warning",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,circle:!0,text:"标签",type:"error",size:"small"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("不可点击状态")]),i("v-uni-view",{staticClass:"example-body"},[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{disabled:!0,text:"标签"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{disabled:!0,text:"标签",type:"primary"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,disabled:!0,text:"标签",type:"error",size:"small"}})],1)],1)],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},a111:function(t,e,i){var a=i("f925");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("17e88e8d",a,!0,{sourceMap:!1,shadowMode:!1})},b046:function(t,e,i){"use strict";i.r(e);var a=i("5bfa"),n=i("50cb");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("b8d2");var r=i("2877"),l=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"04ef1f08",null);e["default"]=l.exports},b8d2:function(t,e,i){"use strict";var a=i("3fb8"),n=i.n(a);n.a},bcd0:function(t,e,i){"use strict";var a=i("a111"),n=i.n(a);n.a},e654:function(t,e,i){"use strict";i.r(e);var a=i("0574"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},f925:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'uni-page-body[data-v-51a5915b]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#efeff4}uni-view[data-v-51a5915b]{font-size:%?28?%;line-height:inherit}.example[data-v-51a5915b]{padding:0 %?30?% %?30?%}.example-title[data-v-51a5915b]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?32?%;color:#464e52;padding:%?30?% %?30?% %?30?% %?50?%;margin-top:%?20?%;position:relative;background-color:#fdfdfd;border-bottom:1px #f5f5f5 solid}.example-title__after[data-v-51a5915b]{position:relative;color:#031e3c}.example-title[data-v-51a5915b]:after{content:"";position:absolute;left:%?30?%;margin:auto;top:0;bottom:0;width:%?6?%;height:%?32?%;background-color:#ccc}.example .example-title[data-v-51a5915b]{margin:%?40?% 0}.example-body[data-v-51a5915b]{padding:%?30?%;background:#fff}.example-info[data-v-51a5915b]{padding:%?30?%;color:#3b4144;background:#fff}.example-body[data-v-51a5915b]{padding:%?20?% 0}.tag-view[data-v-51a5915b]{margin:%?10?% %?20?%;display:inline-block}body.?%PAGE?%[data-v-51a5915b]{background-color:#efeff4}',""])}}]);