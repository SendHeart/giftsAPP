(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/nav-city-dropdown/nav-city-dropdown"],{"1df4":function(e,t,n){"use strict";(function(e){n("ee7a"),n("921b");a(n("66fd"));var t=a(n("85a7"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"28f8":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("a166"));function i(e){return e&&e.__esModule?e:{default:e}}var r=function(){return n.e("components/mpvue-picker/mpvuePicker").then(n.bind(null,"9f2d"))},o={components:{mpvuePicker:r},data:function(){return{title:"nav-city-dropdown",pickerSingleArray:[{label:"中国",value:1},{label:"俄罗斯",value:2},{label:"美国",value:3},{label:"日本",value:4}],themeColor:"#007AFF",mode:"",deepLength:1,pickerValueDefault:[0],pickerValueArray:[]}},onReady:function(){this.setStyle(0,"北京市")},methods:{onCancel:function(t){console.log(e(t," at pages\\template\\nav-city-dropdown\\nav-city-dropdown.vue:73"))},showSinglePicker:function(){this.pickerValueArray=a.default,this.mode="selector",this.deepLength=1,this.pickerValueDefault=[0],this.$refs.mpvuePicker.show()},onConfirm:function(t){console.log(e(t.label," at pages\\template\\nav-city-dropdown\\nav-city-dropdown.vue:84")),this.setStyle(0,t.label)},setStyle:function(e,t){var n=getCurrentPages(),a=n[n.length-1];t.length>3&&(t=t.substr(0,3)+"...");var i=a.$getAppWebview(),r=i.getStyle().titleNView;r.buttons[0].text=t,i.setStyle({titleNView:r})}},onBackPress:function(){if(this.$refs.mpvuePicker.showPicker)return this.$refs.mpvuePicker.pickerCancel(),!0},onUnload:function(){this.$refs.mpvuePicker.showPicker&&this.$refs.mpvuePicker.pickerCancel()},onNavigationBarButtonTap:function(e){0===e.index&&this.showSinglePicker()}};t.default=o}).call(this,n("0de9")["default"])},"3a3e":function(e,t,n){"use strict";n.r(t);var a=n("28f8"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=i.a},"85a7":function(e,t,n){"use strict";n.r(t);var a=n("a0fc"),i=n("3a3e");for(var r in i)"default"!==r&&function(e){n.d(t,e,function(){return i[e]})}(r);var o=n("2877"),u=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);t["default"]=u.exports},a0fc:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})}},[["1df4","common/runtime","common/vendor"]]]);