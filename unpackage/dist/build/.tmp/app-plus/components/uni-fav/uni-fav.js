(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-fav/uni-fav"],{"187f8":function(e,t,n){"use strict";var o=n("ef9a"),c=n.n(o);c.a},6773:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return n.e("components/uni-icons/uni-icons").then(n.bind(null,"f9e2"))},c={name:"UniFav",components:{uniIcons:o},props:{star:{type:[Boolean,String],default:!0},bgColor:{type:String,default:"#eeeeee"},fgColor:{type:String,default:"#666666"},bgColorChecked:{type:String,default:"#007aff"},fgColorChecked:{type:String,default:"#FFFFFF"},circle:{type:[Boolean,String],default:!1},checked:{type:Boolean,default:!1},contentText:{type:Object,default:function(){return{contentDefault:"收藏",contentFav:"已收藏"}}}},watch:{checked:function(){e.report&&(this.checked?e.report("收藏","收藏"):e.report("取消收藏","取消收藏"))}},methods:{onClick:function(){this.$emit("click")}}};t.default=c}).call(this,n("6e42")["default"])},"7f2e":function(e,t,n){"use strict";n.r(t);var o=n("debc"),c=n("c36b");for(var u in c)"default"!==u&&function(e){n.d(t,e,function(){return c[e]})}(u);n("187f8");var r=n("2877"),a=Object(r["a"])(c["default"],o["a"],o["b"],!1,null,null,null);t["default"]=a.exports},c36b:function(e,t,n){"use strict";n.r(t);var o=n("6773"),c=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=c.a},debc:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return c})},ef9a:function(e,t,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-fav/uni-fav-create-component',
    {
        'components/uni-fav/uni-fav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("7f2e"))
        })
    },
    [['components/uni-fav/uni-fav-create-component']]
]);
