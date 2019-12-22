(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"4db0":function(t,a,e){"use strict";e.r(a);var n=e("e4b5e"),u=e("aa1e");for(var c in u)"default"!==c&&function(t){e.d(a,t,function(){return u[t]})}(c);var o=e("2877"),r=Object(o["a"])(u["default"],n["a"],n["b"],!1,null,null,null);a["default"]=r.exports},aa1e:function(t,a,e){"use strict";e.r(a);var n=e("bdca"),u=e.n(n);for(var c in n)"default"!==c&&function(t){e.d(a,t,function(){return n[t]})}(c);a["default"]=u.a},bdca:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,e=this.bgImage,n="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(n="".concat(n,"background-image:url(").concat(e,");")),n}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};a.default=e}).call(this,e("6e42")["default"])},e4b5e:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},u=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return u})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("4db0"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
