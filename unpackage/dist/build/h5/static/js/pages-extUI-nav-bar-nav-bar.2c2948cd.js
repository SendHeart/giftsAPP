(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-extUI-nav-bar-nav-bar"],{"0a93":function(t,e,i){"use strict";i.r(e);var n=i("1d97"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},"0d03":function(t,e,i){var n=i("73a8");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("0b6a2c5c",n,!0,{sourceMap:!1,shadowMode:!1})},"0fa6":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-status-bar",style:{height:t.statusBarHeight}},[t._t("default")],2)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"121b":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-navbar"},[i("v-uni-view",{staticClass:"uni-navbar__content",class:{"uni-navbar--fixed":t.fixed,"uni-navbar--shadow":t.border,"uni-navbar--border":t.border},style:{"background-color":t.backgroundColor}},[t.statusBar?i("uni-status-bar"):t._e(),i("v-uni-view",{staticClass:"uni-navbar__header uni-navbar__content_view",style:{color:t.color}},[i("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__content_view",on:{click:function(e){e=t.$handleEvent(e),t.onClickLeft(e)}}},[t.leftIcon.length?i("v-uni-view",{staticClass:"uni-navbar__content_view"},[i("uni-icons",{attrs:{type:t.leftIcon,color:t.color,size:"24"}})],1):t._e(),t.leftText.length?i("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view",class:{"uni-navbar-btn-icon-left":!t.leftIcon.length}},[t._v(t._s(t.leftText))]):t._e(),t._t("left")],2),i("v-uni-view",{staticClass:"uni-navbar__header-container uni-navbar__content_view"},[t.title.length?i("v-uni-view",{staticClass:"uni-navbar__header-container-inner uni-navbar__content_view"},[t._v(t._s(t.title))]):t._e(),t._t("default")],2),i("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__content_view",class:t.title.length?"uni-navbar__header-btns-right":"",on:{click:function(e){e=t.$handleEvent(e),t.onClickRight(e)}}},[t.rightIcon.length?i("v-uni-view",{staticClass:"uni-navbar__content_view"},[i("uni-icons",{attrs:{type:t.rightIcon,color:t.color,size:"24"}})],1):t._e(),t.rightText.length&&!t.rightIcon.length?i("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view"},[t._v(t._s(t.rightText))]):t._e(),t._t("right")],2)],1)],1),t.fixed?i("v-uni-view",{staticClass:"uni-navbar__placeholder"},[t.statusBar?i("uni-status-bar"):t._e(),i("v-uni-view",{staticClass:"uni-navbar__placeholder-view"})],1):t._e()],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"15bc":function(t,e,i){"use strict";var n=i("0d03"),a=i.n(n);a.a},"1d97":function(t,e,i){"use strict";var n=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("8125")),o=n(i("f9e2")),r={name:"UniNavBar",components:{uniStatusBar:a.default,uniIcons:o.default},props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[String,Boolean],default:!0},border:{type:[String,Boolean],default:!0}},methods:{onClickLeft:function(){this.$emit("click-left")},onClickRight:function(){this.$emit("click-right")}}};e.default=r},"232c":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'uni-page-body[data-v-5cec9791]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#efeff4}uni-view[data-v-5cec9791]{font-size:%?28?%;line-height:inherit}.example[data-v-5cec9791]{padding:0 %?30?% %?30?%}.example-title[data-v-5cec9791]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?32?%;color:#464e52;padding:%?30?% %?30?% %?30?% %?50?%;margin-top:%?20?%;position:relative;background-color:#fdfdfd;border-bottom:1px #f5f5f5 solid}.example-title__after[data-v-5cec9791]{position:relative;color:#031e3c}.example-title[data-v-5cec9791]:after{content:"";position:absolute;left:%?30?%;margin:auto;top:0;bottom:0;width:%?6?%;height:%?32?%;background-color:#ccc}.example .example-title[data-v-5cec9791]{margin:%?40?% 0}.example-body[data-v-5cec9791]{padding:%?30?%;background:#fff}.example-info[data-v-5cec9791]{padding:%?30?%;color:#3b4144;background:#fff}.city[data-v-5cec9791]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:100%;margin-left:8px;white-space:nowrap}.input-view[data-v-5cec9791]{width:92%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background-color:#e7e7e7;height:30px;border-radius:15px;padding:0 4%;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;margin:7px 0;line-height:30px;background:#f5f5f5}.input-view .uni-icon[data-v-5cec9791]{line-height:30px!important}.input-view .input[data-v-5cec9791]{height:30px;line-height:30px;width:94%;padding:0 3%}.example-body[data-v-5cec9791]{padding:%?30?% 0}body.?%PAGE?%[data-v-5cec9791]{background-color:#efeff4}',""])},"480f":function(t,e,i){"use strict";i.r(e);var n=i("d7b8"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},"56c6":function(t,e,i){"use strict";var n=i("9a4c"),a=i.n(n);a.a},"70e5":function(t,e,i){"use strict";var n=i("8dfa"),a=i.n(n);a.a},"73a8":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'.uni-navbar__content[data-v-6df6c6e6]{display:block;position:relative;width:100%;background-color:#fff;overflow:hidden}.uni-navbar__content .uni-navbar__content_view[data-v-6df6c6e6]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.uni-navbar__header[data-v-6df6c6e6]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;width:100%;height:44px;line-height:44px;font-size:16px}.uni-navbar__header-btns[data-v-6df6c6e6]{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:%?120?%;padding:0 %?12?%}.uni-navbar__header-btns[data-v-6df6c6e6]:first-child{padding-left:0}.uni-navbar__header-btns[data-v-6df6c6e6]:last-child{width:%?60?%}.uni-navbar__header-btns-right[data-v-6df6c6e6]:last-child{width:%?120?%;text-align:right;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.uni-navbar__header-container[data-v-6df6c6e6]{width:100%;margin:0 %?10?%}.uni-navbar__header-container-inner[data-v-6df6c6e6]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:%?30?%}.uni-navbar__placeholder-view[data-v-6df6c6e6]{height:44px}.uni-navbar--fixed[data-v-6df6c6e6]{position:fixed;z-index:998}.uni-navbar--shadow[data-v-6df6c6e6]{-webkit-box-shadow:0 1px 6px #ccc;box-shadow:0 1px 6px #ccc}.uni-navbar--border[data-v-6df6c6e6]:after{position:absolute;z-index:3;bottom:0;left:0;right:0;height:1px;content:"";-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5);background-color:#e5e5e5}',""])},8125:function(t,e,i){"use strict";i.r(e);var n=i("0fa6"),a=i("b0df");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("56c6");var r=i("2877"),l=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"5203e3ef",null);e["default"]=l.exports},83789:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-status-bar[data-v-5203e3ef]{display:block;width:100%;height:20px;height:0}",""])},"8dfa":function(t,e,i){var n=i("232c");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("4d494fa9",n,!0,{sourceMap:!1,shadowMode:!1})},"95e3":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("uni-nav-bar",{attrs:{"status-bar":!0,"left-icon":"arrowleft","left-text":"返回",title:"标题"},on:{"click-left":function(e){e=t.$handleEvent(e),t.back(e)}}}),i("v-uni-view",{staticClass:"example-info"},[t._v("本导航栏为自定义组件，并非原生导航栏。除非原生导航栏无法满足需求，否则不推荐使用自定义导航栏组件。具体参考https://ask.dcloud.net.cn/article/34921")]),i("v-uni-view",{staticClass:"example-title"},[t._v("基本用法")]),i("v-uni-view",{staticClass:"example-body"},[i("uni-nav-bar",{attrs:{"left-icon":"arrowleft",title:"标题"},on:{"click-left":function(e){e=t.$handleEvent(e),t.back(e)}}})],1),i("v-uni-view",{staticClass:"example-title"},[t._v("左右显示文字")]),i("v-uni-view",{staticClass:"example-body"},[i("uni-nav-bar",{attrs:{"left-icon":"arrowleft","right-text":"菜单","left-text":"返回",title:"标题"},on:{"click-left":function(e){e=t.$handleEvent(e),t.back(e)}}})],1),i("v-uni-view",{staticClass:"example-title"},[t._v("插入slot")]),i("v-uni-view",{staticClass:"example-body"},[i("uni-nav-bar",{attrs:{fixed:!1,color:"#333333","background-color":"#FFFFFF","right-icon":"scan"},on:{"click-left":function(e){e=t.$handleEvent(e),t.showCity(e)},"click-right":function(e){e=t.$handleEvent(e),t.scan(e)}}},[i("template",{attrs:{slot:"left"},slot:"left"},[i("v-uni-view",{staticClass:"city"},[i("v-uni-view",[t._v(t._s(t.city))]),i("uni-icons",{attrs:{type:"arrowdown",color:"#333333",size:"22"}})],1)],1),i("v-uni-view",{staticClass:"input-view"},[i("uni-icons",{attrs:{type:"search",size:"22",color:"#666666"}}),i("v-uni-input",{staticClass:"input",attrs:{"confirm-type":"search",type:"text",placeholder:"输入搜索关键词"},on:{confirm:function(e){e=t.$handleEvent(e),t.confirm(e)}}})],1)],2)],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"9a4c":function(t,e,i){var n=i("83789");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("31311ab8",n,!0,{sourceMap:!1,shadowMode:!1})},b0df:function(t,e,i){"use strict";i.r(e);var n=i("be73"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},be73:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=uni.getSystemInfoSync().statusBarHeight+"px",a={name:"UniStatusBar",data:function(){return{statusBarHeight:n}}};e.default=a},d7b8:function(t,e,i){"use strict";var n=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("f9e2")),o=n(i("daa9")),r={components:{uniIcons:a.default,uniNavBar:o.default},data:function(){return{city:"北京"}},methods:{back:function(){uni.navigateBack({delta:1})},showMenu:function(){uni.showToast({title:"菜单"})},clickLeft:function(){uni.showToast({title:"左侧按钮"})},search:function(){uni.showToast({title:"搜索"})},showCity:function(){uni.showToast({title:"选择城市"})},scan:function(){uni.showToast({title:"扫码"})},confirm:function(){uni.showToast({title:"搜索"})}},onPullDownRefresh:function(){console.log("onPullDownRefresh"),setTimeout(function(){uni.stopPullDownRefresh(),console.log("stopPullDownRefresh")},1e3)}};e.default=r},daa9:function(t,e,i){"use strict";i.r(e);var n=i("121b"),a=i("0a93");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("15bc");var r=i("2877"),l=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"6df6c6e6",null);e["default"]=l.exports},f823:function(t,e,i){"use strict";i.r(e);var n=i("95e3"),a=i("480f");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("70e5");var r=i("2877"),l=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"5cec9791",null);e["default"]=l.exports}}]);