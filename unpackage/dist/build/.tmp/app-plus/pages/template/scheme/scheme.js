(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/template/scheme/scheme"],{1215:function(e,n,t){"use strict";(function(e){t("ee7a"),t("921b");a(t("66fd"));var n=a(t("cee1"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},"32c3":function(e,n,t){"use strict";t.r(n);var a=t("ee2f"),i=t.n(a);for(var u in a)"default"!==u&&function(e){t.d(n,e,function(){return a[e]})}(u);n["default"]=i.a},"82c5":function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return a}),t.d(n,"b",function(){return i})},cee1:function(e,n,t){"use strict";t.r(n);var a=t("82c5"),i=t("32c3");for(var u in i)"default"!==u&&function(e){t.d(n,e,function(){return i[e]})}(u);t("fa32");var o=t("2877"),l=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);n["default"]=l.exports},ee2f:function(e,n,t){"use strict";(function(e,t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{}},methods:{openBrowser:function(e){plus.runtime.openURL(e)},openMarket:function(n){var t;t="Android"==plus.os.name?"market://details?id=io.dcloud.HelloH5":"itms-apps://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8","undefined"==typeof n?plus.runtime.openURL(t,function(n){console.log(e(n," at pages\\template\\scheme\\scheme.vue:61"))}):"Android"==plus.os.name?plus.runtime.openURL(t,function(e){plus.nativeUI.alert("本机没有安装应用宝")},n):plus.nativeUI.alert("仅Android手机才支持应用宝")},openTaobao:function(e){plus.runtime.openURL(e,function(e){t.showModal({content:"本机未检测到淘宝客户端，是否打开浏览器访问淘宝？",success:function(e){e.confirm&&plus.runtime.openURL("https://s.taobao.com/search?q=uni-app")}})})},openMap:function(){var n="";if("Android"==plus.os.name){var t=plus.runtime.isApplicationExist({pname:"com.baidu.BaiduMap",action:"baidumap://"}),a=plus.runtime.isApplicationExist({pname:"com.autonavi.minimap",action:"androidamap://"}),i="baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app",u="androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0";a&&t?plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"百度地图"},{title:"高德地图"}]},function(e){switch(e.index){case 1:plus.runtime.openURL(i);break;case 2:plus.runtime.openURL(u);break}}):a?plus.runtime.openURL(u):t?plus.runtime.openURL(i):(n="geo:39.96310,116.340698?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82",plus.runtime.openURL(n))}else plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"Apple地图"},{title:"百度地图"},{title:"高德地图"}]},function(t){switch(console.log(e("e.index: "+t.index," at pages\\template\\scheme\\scheme.vue:117")),t.index){case 1:n="http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=39.96310,116.340698&spn=0.008766,0.019441";break;case 2:n="baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app";break;case 3:n="iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0";break;default:break}""!=n&&plus.runtime.openURL(n,function(e){plus.nativeUI.alert("本机未安装指定的地图应用")})})},openQQ:function(e){plus.runtime.openURL("mqqwpa://im/chat?chat_type="+e.detail.value.qqNumType+"&uin="+e.detail.value.qqNum,function(e){plus.nativeUI.alert("本机没有安装QQ，无法启动")})}}};n.default=a}).call(this,t("0de9")["default"],t("6e42")["default"])},f252:function(e,n,t){},fa32:function(e,n,t){"use strict";var a=t("f252"),i=t.n(a);i.a}},[["1215","common/runtime","common/vendor"]]]);