(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/hall/pd-list"],{"148a":function(e,t,o){"use strict";o.r(t);var n=o("a4b6"),a=o("daf2");for(var i in a)"default"!==i&&function(e){o.d(t,e,function(){return a[e]})}(i);o("9b61");var s=o("2877"),r=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports},"8e7b":function(e,t,o){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{windowHeight:"",windowWidth:"",dkheight:""}},props:{list:{type:Array,default:function(){return[]}}},onLoad:function(t){console.log(e("onLoad list:",this.list," at pages\\hall\\pd-list.vue:78"));var n=this;t.username?t.username:wx.getStorageSync("username"),t.token?t.token:wx.getStorageSync("token");o.getSystemInfo({success:function(e){n.setData({platform:e.platform,windowHeight:e.windowHeight,windowWidth:e.windowWidth,dkheight:e.windowHeight-60})}})},methods:{showGoods:function(e){var t=e.id,n=wx.getStorageSync("username")?wx.getStorageSync("username"):"",a=wx.getStorageSync("token")?wx.getStorageSync("token"):"1",i=e.goods_id?e.goods_id:e.id,s=e.goods_org,r=e.shape,d=e.name,u=e.sell_price,g=e.act_info,l=e.sale,c=e.image?e.image:"",f=e.activity_image?e.activity_image:"";c=c||(f||""),getApp().globalData.hall_gotop=0;var p={sku_id:t,id:i,goods_shape:r,goods_org:s,goods_info:g,goods_price:u,sale:l,name:d,image:c,token:a,username:n};o.setStorageSync("show_goods_options",p),wx.navigateTo({url:"/pages/details/details?sku_id="+t+"&id="+i+"&goods_shape="+r+"&goods_org="+s+"&goods_info="+g+"&goods_price="+u+"&sale="+l+"&name="+d+"&image="+c+"&token="+a+"&username="+n})}}};t.default=n}).call(this,o("0de9")["default"],o("6e42")["default"])},"9b61":function(e,t,o){"use strict";var n=o("b987"),a=o.n(n);a.a},a4b6:function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},a=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return a})},b987:function(e,t,o){},daf2:function(e,t,o){"use strict";o.r(t);var n=o("8e7b"),a=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,function(){return n[e]})}(i);t["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/hall/pd-list-create-component',
    {
        'pages/hall/pd-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("148a"))
        })
    },
    [['pages/hall/pd-list-create-component']]
]);