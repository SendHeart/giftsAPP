(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/API/fingerprint/fingerprint"],{"1c63":function(t,e,n){"use strict";n.r(e);var i=n("6dd4"),u=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=u.a},"2fe7":function(t,e,n){"use strict";(function(t){n("ee7a"),n("921b");i(n("66fd"));var e=i(n("6c4d"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"6c4d":function(t,e,n){"use strict";n.r(e);var i=n("97f5"),u=n("1c63");for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);var r=n("2877"),s=Object(r["a"])(u["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},"6dd4":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{title:"指纹",result:"",disabled:!0}},onLoad:function(){plus.fingerprint.isSupport()?plus.fingerprint.isKeyguardSecure()?plus.fingerprint.isEnrolledFingerprints()?(this.result="此设备支持指纹识别",this.disabled=!1):(this.result="此设备未录入指纹，请到设置中开启",this.disabled=!0):(this.result="此设备未设置密码锁屏，无法使用指纹识别",this.disabled=!0):(this.result="此设备不支持指纹识别",this.disabled=!0)},methods:{fingerprint:function(){plus.fingerprint.authenticate(function(){plus.nativeUI.closeWaiting(),plus.nativeUI.alert("指纹识别成功")},function(t){switch(t.code){case t.AUTHENTICATE_MISMATCH:plus.nativeUI.toast("指纹匹配失败，请重新输入");break;case t.AUTHENTICATE_OVERLIMIT:plus.nativeUI.closeWaiting(),plus.nativeUI.alert("指纹识别失败次数超出限制，请使用其它方式进行认证");break;case t.CANCEL:plus.nativeUI.toast("已取消识别");break;default:plus.nativeUI.closeWaiting(),plus.nativeUI.alert("指纹识别失败，请重试");break}}),"Android"==plus.os.name&&(plus.nativeUI.showWaiting("指纹识别中...").onclose=function(){plus.fingerprint.cancel()})}}};e.default=i},"97f5":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return u})}},[["2fe7","common/runtime","common/vendor"]]]);