(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-extUI-fab-fab"],{"051a":function(t,e,i){var n=i("dd8d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("7e561f76",n,!0,{sourceMap:!1,shadowMode:!1})},"0942":function(t,e,i){"use strict";var n=i("051a"),o=i.n(n);o.a},1075:function(t,e,i){"use strict";i.r(e);var n=i("85f0"),o=i("9187");for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);i("19cb");var c=i("2877"),r=Object(c["a"])(o["default"],n["a"],n["b"],!1,null,"6e7c7680",null);e["default"]=r.exports},"19cb":function(t,e,i){"use strict";var n=i("82bf"),o=i.n(n);o.a},"56c5":function(t,e,i){"use strict";i.r(e);var n=i("d8e0"),o=i("f3ae");for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);i("0942");var c=i("2877"),r=Object(c["a"])(o["default"],n["a"],n["b"],!1,null,"5887dedc",null);e["default"]=r.exports},"81e2":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'uni-page-body[data-v-6e7c7680]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#efeff4}uni-view[data-v-6e7c7680]{font-size:%?28?%;line-height:inherit}.example[data-v-6e7c7680]{padding:0 %?30?% %?30?%}.example-title[data-v-6e7c7680]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?32?%;color:#464e52;padding:%?30?% %?30?% %?30?% %?50?%;margin-top:%?20?%;position:relative;background-color:#fdfdfd;border-bottom:1px #f5f5f5 solid}.example-title__after[data-v-6e7c7680]{position:relative;color:#031e3c}.example-title[data-v-6e7c7680]:after{content:"";position:absolute;left:%?30?%;margin:auto;top:0;bottom:0;width:%?6?%;height:%?32?%;background-color:#ccc}.example .example-title[data-v-6e7c7680]{margin:%?40?% 0}.example-body[data-v-6e7c7680]{padding:%?30?%;background:#fff}.example-info[data-v-6e7c7680]{padding:%?30?%;color:#3b4144;background:#fff}.uni-padding-wrap[data-v-6e7c7680]{padding-top:%?200?%}.btn[data-v-6e7c7680]{margin:%?30?%}body.?%PAGE?%[data-v-6e7c7680]{background-color:#efeff4}',""])},"82bf":function(t,e,i){var n=i("81e2");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("426de537",n,!0,{sourceMap:!1,shadowMode:!1})},"85f0":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"uni-padding-wrap"},[i("v-uni-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.switchBtn(0)}}},[t._v("切换菜单("+t._s(t.directionStr)+"显示)")]),i("v-uni-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.switchBtn("left","bottom")}}},[t._v("左下角显示")]),i("v-uni-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.switchBtn("right","bottom")}}},[t._v("右下角显示")]),i("v-uni-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.switchBtn("left","top")}}},[t._v("左上角显示")]),i("v-uni-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.switchBtn("right","top")}}},[t._v("右上角显示")])],1),i("uni-fab",{ref:"fab",attrs:{pattern:t.pattern,content:t.content,horizontal:t.horizontal,vertical:t.vertical,direction:t.direction},on:{trigger:function(e){e=t.$handleEvent(e),t.trigger(e)}}})],1)},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})},9187:function(t,e,i){"use strict";i.r(e);var n=i("b42c"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=o.a},b42c:function(t,e,i){"use strict";var n=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("56c5")),a={components:{uniFab:o.default},data:function(){return{title:"uni-fab",directionStr:"垂直",horizontal:"left",vertical:"bottom",direction:"horizontal",pattern:{color:"#7A7E83",backgroundColor:"#fff",selectedColor:"#007AFF",buttonColor:"#007AFF"},content:[{iconPath:"/static/component.png",selectedIconPath:"/static/componentHL.png",text:"组件",active:!1},{iconPath:"/static/api.png",selectedIconPath:"/static/apiHL.png",text:"API",active:!1},{iconPath:"/static/template.png",selectedIconPath:"/static/templateHL.png",text:"模版",active:!1}]}},onBackPress:function(){return!!this.$refs.fab.isShow&&(this.$refs.fab.close(),!0)},methods:{trigger:function(t){console.log(t),this.content[t.index].active=!t.item.active,uni.showModal({title:"提示",content:"您".concat(this.content[t.index].active?"选中了":"取消了").concat(t.item.text),success:function(t){t.confirm?console.log("用户点击确定"):t.cancel&&console.log("用户点击取消")}})},switchBtn:function(t,e){0===t?(this.direction="horizontal"===this.direction?"vertical":"horizontal",this.directionStr="horizontal"===this.direction?"垂直":"水平"):(this.horizontal=t,this.vertical=e),this.$forceUpdate()}}};e.default=a},bcc9:function(t,e,i){"use strict";var n=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("5176")),a={name:"UniFab",props:{pattern:{type:Object,default:function(){return{}}},horizontal:{type:String,default:"left"},vertical:{type:String,default:"bottom"},direction:{type:String,default:"horizontal"},content:{type:Array,default:function(){return[]}},show:{type:Boolean,default:!1}},data:function(){return{fabShow:!1,flug:!0,isShow:!1,styles:{color:"#3c3e49",selectedColor:"#007AFF",backgroundColor:"#fff",buttonColor:"#3c3e49"}}},computed:{contentWidth:function(t){return uni.upx2px(110*(this.content.length+1)+20)+"px"},contentWidthMin:function(){return uni.upx2px(110)+"px"},boxWidth:function(){return this.getPosition(3,"horizontal")},boxHeight:function(){return this.getPosition(3,"vertical")},leftBottom:function(){return this.getPosition(0,"left","bottom")},rightBottom:function(){return this.getPosition(0,"right","bottom")},leftTop:function(){return this.getPosition(0,"left","top")},rightTop:function(){return this.getPosition(0,"right","top")},flexDirectionStart:function(){return this.getPosition(1,"vertical","top")},flexDirectionEnd:function(){return this.getPosition(1,"vertical","bottom")},horizontalLeft:function(){return this.getPosition(2,"horizontal","left")},horizontalRight:function(){return this.getPosition(2,"horizontal","right")}},watch:{pattern:function(t,e){this.styles=(0,o.default)({},this.styles,t)}},created:function(){this.isShow=this.show,0===this.top&&(this.fabShow=!0),this.styles=(0,o.default)({},this.styles,this.pattern)},methods:{_onClick:function(){this.isShow=!this.isShow},open:function(){this.isShow=!0},close:function(){this.isShow=!1},_onItemClick:function(t,e){this.$emit("trigger",{index:t,item:e})},getPosition:function(t,e,i){return 0===t?this.horizontal===e&&this.vertical===i:1===t?this.direction===e&&this.vertical===i:2===t?this.direction===e&&this.horizontal===i:this.isShow&&this.direction===e?this.contentWidth:this.contentWidthMin}}};e.default=a},d8e0:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"fab-box fab",class:{leftBottom:t.leftBottom,rightBottom:t.rightBottom,leftTop:t.leftTop,rightTop:t.rightTop}},[i("v-uni-view",{staticClass:"fab-circle",class:{left:"left"===t.horizontal&&"horizontal"===t.direction,top:"top"===t.vertical&&"vertical"===t.direction,bottom:"bottom"===t.vertical&&"vertical"===t.direction,right:"right"===t.horizontal&&"horizontal"===t.direction},style:{"background-color":t.styles.buttonColor},on:{click:function(e){e=t.$handleEvent(e),t._onClick(e)}}},[i("v-uni-text",{staticClass:"uni-icon uni-icon-plusempty",class:{active:t.isShow}})],1),i("v-uni-view",{staticClass:"fab-content",class:{left:"left"===t.horizontal,right:"right"===t.horizontal,flexDirection:"vertical"===t.direction,flexDirectionStart:t.flexDirectionStart,flexDirectionEnd:t.flexDirectionEnd},style:{width:t.boxWidth,height:t.boxHeight,background:t.styles.backgroundColor}},[t.flexDirectionStart||t.horizontalLeft?i("v-uni-view",{staticClass:"fab-item first"}):t._e(),t._l(t.content,function(e,n){return i("v-uni-view",{key:n,staticClass:"fab-item",class:{active:t.isShow},style:{color:e.active?t.styles.selectedColor:t.styles.color},on:{click:function(i){i=t.$handleEvent(i),t._onItemClick(n,e)}}},[i("v-uni-image",{staticClass:"content-image",attrs:{src:e.active?e.selectedIconPath:e.iconPath,mode:"widthFix"}}),i("v-uni-text",{staticClass:"text"},[t._v(t._s(e.text))])],1)}),t.flexDirectionEnd||t.horizontalRight?i("v-uni-view",{staticClass:"fab-item first"}):t._e()],2)],1)],1)},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})},dd8d:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@font-face{font-family:uniicons;font-weight:400;font-style:normal;src:url(https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf) format("truetype")}.uni-icon[data-v-5887dedc]{font-family:uniicons;font-size:24px;font-weight:400;font-style:normal;line-height:1;display:inline-block;text-decoration:none;-webkit-font-smoothing:antialiased}.uni-icon-plusempty[data-v-5887dedc]:before{content:"\\E468"}.fab-box[data-v-5887dedc]{position:fixed;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;z-index:2}.fab-box.top[data-v-5887dedc]{width:%?60?%;height:%?60?%;right:%?30?%;bottom:%?60?%;border:1px #5989b9 solid;background:#69c;border-radius:%?10?%;color:#fff;-webkit-transition:all .3;-o-transition:all .3;transition:all .3;opacity:0}.fab-box.active[data-v-5887dedc]{opacity:1}.fab-box.fab[data-v-5887dedc]{z-index:10}.fab-box.fab.leftBottom[data-v-5887dedc]{left:%?30?%;bottom:%?60?%}.fab-box.fab.leftTop[data-v-5887dedc]{left:%?30?%;top:%?80?%;\n\ttop:calc(%?80?% + var(--window-top))\n\t}.fab-box.fab.rightBottom[data-v-5887dedc]{right:%?30?%;bottom:%?60?%}.fab-box.fab.rightTop[data-v-5887dedc]{right:%?30?%;top:%?80?%;\n\ttop:calc(%?80?% + var(--window-top))\n\t}.fab-circle[data-v-5887dedc]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:absolute;width:%?110?%;height:%?110?%;background:#3c3e49;\n\t/* background: #5989b9; */border-radius:50%;-webkit-box-shadow:0 0 5px 2px rgba(0,0,0,.2);box-shadow:0 0 5px 2px rgba(0,0,0,.2);z-index:11}.fab-circle.left[data-v-5887dedc]{left:0}.fab-circle.right[data-v-5887dedc]{right:0}.fab-circle.top[data-v-5887dedc]{top:0}.fab-circle.bottom[data-v-5887dedc]{bottom:0}.fab-circle .uni-icon-plusempty[data-v-5887dedc]{color:#fff;font-size:%?80?%;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s;font-weight:700}.fab-circle .uni-icon-plusempty.active[data-v-5887dedc]{-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg);font-size:%?80?%}.fab-content[data-v-5887dedc]{background:#69c;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-radius:%?100?%;overflow:hidden;-webkit-box-shadow:0 0 5px 2px rgba(0,0,0,.1);box-shadow:0 0 5px 2px rgba(0,0,0,.1);-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s;width:%?110?%}.fab-content.left[data-v-5887dedc]{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.fab-content.right[data-v-5887dedc]{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.fab-content.flexDirection[data-v-5887dedc]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.fab-content.flexDirectionStart[data-v-5887dedc]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.fab-content.flexDirectionEnd[data-v-5887dedc]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.fab-content .fab-item[data-v-5887dedc]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:%?110?%;height:%?110?%;font-size:%?24?%;color:#fff;opacity:0;-webkit-transition:opacity .2s;-o-transition:opacity .2s;transition:opacity .2s}.fab-content .fab-item.active[data-v-5887dedc]{opacity:1}.fab-content .fab-item .content-image[data-v-5887dedc]{width:%?50?%;height:%?50?%;margin-bottom:%?5?%}.fab-content .fab-item.first[data-v-5887dedc]{width:%?110?%}',""])},f3ae:function(t,e,i){"use strict";i.r(e);var n=i("bcc9"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=o.a}}]);