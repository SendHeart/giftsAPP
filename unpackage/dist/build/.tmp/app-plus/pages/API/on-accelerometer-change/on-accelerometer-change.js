(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/API/on-accelerometer-change/on-accelerometer-change"],{"1b8b":function(e,t,n){"use strict";var a=n("8ee5"),c=n.n(a);c.a},"4bfe":function(e,t,n){"use strict";n.r(t);var a=n("e33f"),c=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=c.a},"6c6a":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return c})},"8e2a":function(e,t,n){"use strict";n.r(t);var a=n("6c6a"),c=n("4bfe");for(var o in c)"default"!==o&&function(e){n.d(t,e,function(){return c[e]})}(o);n("1b8b");var u=n("2877"),r=Object(u["a"])(c["default"],a["a"],a["b"],!1,null,null,null);t["default"]=r.exports},"8ee5":function(e,t,n){},e33f:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{title:"onAccelerometerChange",value:""}},onUnload:function(){e.stopAccelerometer()},methods:{shake:function(){e.navigateTo({url:"/platforms/app-plus/shake/shake"})},watchAcce:function(){var t=this;e.onAccelerometerChange(function(e){t.value="监听设备的加速度变化:\nX轴："+e.x.toFixed(2)+"\nY轴："+e.y.toFixed(2)+"\nZ轴："+e.z.toFixed(2)})},stopAcce:function(){e.stopAccelerometer()}}};t.default=n}).call(this,n("6e42")["default"])},e615:function(e,t,n){"use strict";(function(e){n("ee7a"),n("921b");a(n("66fd"));var t=a(n("8e2a"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])}},[["e615","common/runtime","common/vendor"]]]);