!function(t){var e={};function n(a){if(e[a])return e[a].exports;var i=e[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(a,i,function(e){return t[e]}.bind(null,i));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=120)}({0:function(t,e){t.exports={}},1:function(t,e,n){"use strict";var a;Object.defineProperty(e,"__esModule",{value:!0}),e.weexPlus=e.default=void 0,a="function"==typeof getUni?getUni:function(){var t=function(t){return"function"==typeof t},e=/^\$|^on|^create|Sync$|Manager$|^pause/,n=["os","getCurrentSubNVue","getSubNVueById","stopRecord","stopVoice","stopBackgroundAudio","stopPullDownRefresh","hideKeyboard","hideToast","hideLoading","showNavigationBarLoading","hideNavigationBarLoading","canIUse","navigateBack","closeSocket","pageScrollTo","drawCanvas"],a=function(t){return!(e.test(t)&&"createBLEConnection"!==t||~n.indexOf(t))},o=function(e){return function(){for(var n=arguments.length,a=Array(n>1?n-1:0),i=1;i<n;i++)a[i-1]=arguments[i];var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t(o.success)||t(o.fail)||t(o.complete)?e.apply(void 0,[o].concat(a)):new Promise(function(t,n){e.apply(void 0,[Object.assign({},o,{success:t,fail:n})].concat(a)),Promise.prototype.finally=function(t){var e=this.constructor;return this.then(function(n){return e.resolve(t()).then(function(){return n})},function(n){return e.resolve(t()).then(function(){throw n})})}}).then(function(t){return[null,t]}).catch(function(t){return[t]})}},r=[],s=void 0;function u(t){r.forEach(function(e){return e({origin:s,data:t})})}var c=i.webview.currentWebview().id,l=new BroadcastChannel("UNI-APP-SUBNVUE");function p(t){t.$processed=!0;var e=i.webview.currentWebview().id===t.id,n="uniNView"===t.__uniapp_origin_type&&t.__uniapp_origin_id,a=t.id;if(t.postMessage=function(t){n?l.postMessage({data:t,to:e?n:a}):b({type:"UniAppSubNVue",data:t})},t.onMessage=function(t){r.push(t)},t.__uniapp_mask_id){s=t.__uniapp_host;var o=t.__uniapp_mask,u=i.webview.getWebviewById(t.__uniapp_mask_id);u=u.parent()||u;var c=t.show,p=t.hide,d=t.close,f=function(){u.setStyle({mask:"none"})};t.show=function(){u.setStyle({mask:o});for(var e=arguments.length,n=Array(e),a=0;a<e;a++)n[a]=arguments[a];return c.apply(t,n)},t.hide=function(){f();for(var e=arguments.length,n=Array(e),a=0;a<e;a++)n[a]=arguments[a];return p.apply(t,n)},t.close=function(){f();for(var e=arguments.length,n=Array(e),a=0;a<e;a++)n[a]=arguments[a];return d.apply(t,n)}}}function d(t){var e=i.webview.getWebviewById(t);return e&&!e.$processed&&p(e),e}l.onmessage=function(t){t.data.to===c&&u(t.data.data)};var f=weex.requireModule("plus"),h=weex.requireModule("globalEvent"),g=0,v={},m="__uniapp__service";h.addEventListener("plusMessage",function(t){"UniAppJsApi"===t.data.type?_(t.data.id,t.data.data):"UniAppSubNVue"===t.data.type?u(t.data.data,t.data.options):"onNavigationBarButtonTap"===t.data.type?"function"==typeof T&&T(t.data.data):"onNavigationBarSearchInputChanged"===t.data.type?"function"==typeof w&&w(t.data.data):"onNavigationBarSearchInputConfirmed"===t.data.type?"function"==typeof B&&B(t.data.data):"onNavigationBarSearchInputClicked"===t.data.type&&"function"==typeof k&&k(t.data.data)});var _=function(t,e){var n=v[t];n?(n(e),n.keepAlive||delete v[t]):console.error("callback["+t+"] is undefined")},y=function(e){var n,a,i=e.id,o=e.type,r=e.params;v[i]=(a=function(e){t(n)?n(e):n&&(~e.errMsg.indexOf(":ok")?t(n.success)&&n.success(e):~e.errMsg.indexOf(":fail")&&t(n.fail)&&n.fail(e),t(n.complete)&&n.complete(e))},(t(n=r)||n&&t(n.callback))&&(a.keepAlive=!0),a),f.postMessage({id:i,type:o,params:r},m)};function b(t){f.postMessage(t,m)}var S=function(t){return function(e){y({id:g++,type:t,params:e})}},T=void 0,w=void 0,B=void 0,k=void 0;function D(t){T=t}function C(t){w=t}function x(t){B=t}function I(t){k=t}function P(t){return weex.requireModule(t)}var R=weex.requireModule("dom"),N=weex.requireModule("globalEvent"),q=[];function $(t){"function"==typeof t&&(this.isUniAppReady?t():q.push(t))}N.addEventListener("plusMessage",function(t){"UniAppReady"===t.data.type&&($.isUniAppReady=!0,q.length&&(q.forEach(function(t){return t()}),q=[]))});var A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O=weex.requireModule("stream"),j="GET",M=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:j,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"application/x-www-form-urlencoded";return"object"===(void 0===t?"undefined":A(t))?"POST"===e.toUpperCase()&&"application/json"===n.toLowerCase()?JSON.stringify(t):Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&"):t},L=weex.requireModule("plusstorage"),V="__TYPE",E=weex.requireModule("clipboard"),F=function(){if("function"==typeof getUniEmitter)return getUniEmitter;var t={$on:function(){console.warn("uni.$on failed")},$off:function(){console.warn("uni.$off failed")},$once:function(){console.warn("uni.$once failed")},$emit:function(){console.warn("uni.$emit failed")}};return function(){return t}}();function U(t,e,n){return t[e].apply(t,n)}var H=Object.freeze({loadFontFace:function(e){var n=e.family,a=e.source,i=(e.desc,e.success),o=(e.fail,e.complete);R.addRule("fontFace",{fontFamily:n,src:a.replace(/"/g,"'")});var r={errMsg:"loadFontFace:ok",status:"loaded"};t(i)&&i(r),t(o)&&o(r)},ready:$,request:function(e){var n=e.url,a=e.data,i=e.header,o=e.method,r=void 0===o?"GET":o,s=e.dataType,u=void 0===s?"json":s,c=(e.responseType,e.success),l=e.fail,p=e.complete,d=!1,f=!1,h={};if(i)for(var g in i)f||"content-type"!==g.toLowerCase()?h[g]=i[g]:(f=!0,h["Content-Type"]=i[g]);return r===j&&a&&(n=n+(~n.indexOf("?")?"&"===n.substr(-1)||"?"===n.substr(-1)?"":"&":"?")+M(a)),O.fetch({url:n,method:r,headers:h,type:"json"===u?"json":"text",body:r!==j?M(a,r,h["Content-Type"]):""},function(e){var n=e.status,a=(e.ok,e.statusText,e.data),i=e.headers,o={};!n||-1===n||d?(o.errMsg="request:fail",t(l)&&l(o)):(o.data=a,o.statusCode=n,o.header=i,t(c)&&c(o)),t(p)&&p(o)}),{abort:function(){d=!0}}},getStorage:function(e){var n=e.key,a=(e.data,e.success),i=e.fail,o=e.complete;L.getItem(n+V,function(e){if("success"===e.result){var r=e.data;L.getItem(n,function(e){if("success"===e.result){var n=e.data;r&&n?("String"!==r&&(n=JSON.parse(n)),t(a)&&a({errMsg:"getStorage:ok",data:n})):(e.errMsg="setStorage:fail",t(i)&&i(e))}else e.errMsg="setStorage:fail",t(i)&&i(e);t(o)&&o(e)})}else e.errMsg="setStorage:fail",t(i)&&i(e),t(o)&&o(e)})},setStorage:function(e){var n=e.key,a=e.data,i=e.success,o=e.fail,r=e.complete,s="String";"object"===(void 0===a?"undefined":A(a))&&(s="Object",a=JSON.stringify(a)),L.setItem(n,a,function(e){"success"===e.result?L.setItem(n+V,s,function(e){"success"===e.result?t(i)&&i({errMsg:"setStorage:ok"}):(e.errMsg="setStorage:fail",t(o)&&o(e))}):(e.errMsg="setStorage:fail",t(o)&&o(e)),t(r)&&r(e)})},removeStorage:function(e){var n=e.key,a=(e.data,e.success),i=e.fail,o=e.complete;L.removeItem(n,function(e){"success"===e.result?t(a)&&a({errMsg:"removeStorage:ok"}):(e.errMsg="removeStorage:fail",t(i)&&i(e)),t(o)&&o(e)}),L.removeItem(n+V)},clearStorage:function(t){t.key,t.data,t.success,t.fail,t.complete},getClipboardData:function(e){var n=e.success,a=(e.fail,e.complete);E.getString(function(e){var i={errMsg:"getClipboardData:ok",data:e.data};t(n)&&n(i),t(a)&&a(i)})},setClipboardData:function(e){var n=e.data,a=e.success,i=(e.fail,e.complete),o={errMsg:"setClipboardData:ok"};E.setString(n),t(a)&&a(o),t(i)&&i(o)},onSubNVueMessage:u,getSubNVueById:d,getCurrentSubNVue:function(){return d(i.webview.currentWebview().id)},$on:function(){return U(F(),"$on",[].concat(Array.prototype.slice.call(arguments)))},$off:function(){return U(F(),"$off",[].concat(Array.prototype.slice.call(arguments)))},$once:function(){return U(F(),"$once",[].concat(Array.prototype.slice.call(arguments)))},$emit:function(){return U(F(),"$emit",[].concat(Array.prototype.slice.call(arguments)))}}),W={os:{nvue:!0}},J={};return"undefined"!=typeof Proxy?J=new Proxy({},{get:function(t,e){if("os"===e)return{nvue:!0};if("postMessage"===e)return b;if("requireNativePlugin"===e)return P;if("onNavigationBarButtonTap"===e)return D;if("onNavigationBarSearchInputChanged"===e)return C;if("onNavigationBarSearchInputConfirmed"===e)return x;if("onNavigationBarSearchInputClicked"===e)return I;var n=H[e];return n||(n=S(e)),a(e)?o(n):n}}):(Object.keys(W).forEach(function(t){J[t]=W[t]}),J.postMessage=b,J.requireNativePlugin=P,J.onNavigationBarButtonTap=D,J.onNavigationBarSearchInputChanged=C,J.onNavigationBarSearchInputConfirmed=x,J.onNavigationBarSearchInputClicked=I,Object.keys({uploadFile:!0,downloadFile:!0,chooseImage:!0,previewImage:!0,getImageInfo:!0,saveImageToPhotosAlbum:!0,chooseVideo:!0,saveVideoToPhotosAlbum:!0,saveFile:!0,getSavedFileList:!0,getSavedFileInfo:!0,removeSavedFile:!0,openDocument:!0,setStorage:!0,getStorage:!0,getStorageInfo:!0,removeStorage:!0,clearStorage:!0,getLocation:!0,chooseLocation:!0,openLocation:!0,getSystemInfo:!0,getNetworkType:!0,makePhoneCall:!0,scanCode:!0,setScreenBrightness:!0,getScreenBrightness:!0,setKeepScreenOn:!0,vibrateLong:!0,vibrateShort:!0,addPhoneContact:!0,showToast:!0,showLoading:!0,hideToast:!0,hideLoading:!0,showModal:!0,showActionSheet:!0,setNavigationBarTitle:!0,setNavigationBarColor:!0,navigateTo:!0,redirectTo:!0,reLaunch:!0,switchTab:!0,navigateBack:!0,getProvider:!0,login:!0,getUserInfo:!0,share:!0,requestPayment:!0,subscribePush:!0,unsubscribePush:!0,onPush:!0,offPush:!0}).forEach(function(t){var e=H[t];e||(e=S(t)),a(t)?J[t]=o(e):J[t]=e})),J};var i=new WeexPlus(weex);e.weexPlus=i;var o=a(weex,i,BroadcastChannel);e.default=o},10:function(t,e,n){"use strict";n.r(e);var a=n(11),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e.default=i.a},103:function(t,e,n){"use strict";n.r(e);var a=n(49),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e.default=i.a},104:function(t,e,n){"use strict";n.r(e);var a=n(50),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e.default=i.a},11:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"u-link",props:{href:{type:String,default:"mqqwpa://im/chat?chat_type=wpa&uin=1761624512&version=1&src_type=web&web_src=bjhuli.com"},text:{type:String,default:""},inWhiteList:{type:Boolean,default:!1}},methods:{openURL:function(){t.runtime.openURL(this.href)}}};e.default=n}).call(this,n(1).weexPlus)},12:function(t,e,n){"use strict";var a=function(){var t=this.$createElement;return(this._self._c||t)("u-text",{staticStyle:{textDecoration:"underline"},attrs:{href:this.href,inWhiteList:this.inWhiteList},on:{click:this.openURL}},[this._v(this._s(this.text))])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},120:function(t,e,n){"use strict";n.r(e);n(4),n(8);var a=n(20);a.default.mpType="page",a.default.route="pages/tabBar/API/API",a.default.el="#root",new Vue(a.default)},121:function(t,e,n){"use strict";n.r(e);var a=n(96),i=n(47);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);var r=n(2);var s=Object(r.a)(i.default,a.a,a.b,!1,null,null,"a2c1c318");(function(){this.options.style||(this.options.style={}),Vue.prototype.__merge_style&&Vue.prototype.__$appStyle__&&Vue.prototype.__merge_style(Vue.prototype.__$appStyle__,this.options.style),Vue.prototype.__merge_style?Vue.prototype.__merge_style(n(103).default,this.options.style):Object.assign(this.options.style,n(103).default)}).call(s),e.default=s.exports},14:function(t,e,n){"use strict";n.r(e);var a=n(12),i=n(10);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);var r=n(2);var s=Object(r.a)(i.default,a.a,a.b,!1,null,null,"35ad0917");(function(){this.options.style||(this.options.style={}),Vue.prototype.__merge_style&&Vue.prototype.__$appStyle__&&Vue.prototype.__merge_style(Vue.prototype.__$appStyle__,this.options.style)}).call(s),e.default=s.exports},2:function(t,e,n){"use strict";function a(t,e,n,a,i,o,r,s){var u,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),a&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),r?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=u):i&&(u=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(t,e){return u.call(e),l(t,e)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,u):[u]}return{exports:t,options:c}}n.d(e,"a",function(){return a})},20:function(t,e,n){"use strict";var a=n(90),i=n(45),o=n(2);var r=Object(o.a)(i.default,a.a,a.b,!1,null,null,"4e0d2c94");(function(){this.options.style||(this.options.style={}),Vue.prototype.__merge_style&&Vue.prototype.__$appStyle__&&Vue.prototype.__merge_style(Vue.prototype.__$appStyle__,this.options.style),Vue.prototype.__merge_style?Vue.prototype.__merge_style(n(104).default,this.options.style):Object.assign(this.options.style,n(104).default)}).call(r),e.default=r.exports},3:function(t,e,n){"use strict";n.r(e),e.default={appid:"__UNI__8B1760E"}},4:function(t,e,n){"use strict";(function(t,e){function a(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function u(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}var c=n(5).version,l="__DC_STAT_UUID",p="__DC_UUID_VALUE";function d(){var n="";if("n"===g()){try{n=t.runtime.getDCloudId()}catch(t){n=""}return n}try{n=e.getStorageSync(l)}catch(t){n=p}if(!n){n=Date.now()+""+Math.floor(1e7*Math.random());try{e.setStorageSync(l,n)}catch(t){e.setStorageSync(l,p)}}return n}var f,h=function(){return parseInt((new Date).getTime()/1e3)},g=function(){return"n"},v=function(){var t="";return"wx"!==g()&&"qq"!==g()||e.canIUse("getAccountInfoSync")&&(t=e.getAccountInfoSync().miniProgram.appId||""),t},m=function(){return"n"===g()?t.runtime.version:""},_=function(){var e="";return"n"===g()&&(e=t.runtime.channel),e},y=0,b=0,S=function(){return y=h(),"n"===g()&&e.setStorageSync("__page__residence__time",h()),y},T=0,w=0,B=function(){var t=(new Date).getTime();return T=t,w=0,t},k=function(){var t=(new Date).getTime();return w=t,t},D=function(t){var e=0;return 0!==T&&(e=w-T),e=(e=parseInt(e/1e3))<1?1:e,"app"===t?{residenceTime:e,overtime:e>300}:"page"===t?{residenceTime:e,overtime:e>1800}:{residenceTime:e}},C=function(t){var e=getCurrentPages(),n=e[e.length-1].$vm,a=t._query,i=a&&"{}"!==JSON.stringify(a)?"?"+JSON.stringify(a):"";return t._query="","bd"===g()?n.$mp&&n.$mp.page.is+i:n.$scope&&n.$scope.route+i||n.$mp&&n.$mp.page.route+i},x=function(t){return!!("page"===t.mpType||t.$mp&&"page"===t.$mp.mpType||"page"===t.$options.mpType)},I=n(6).default,P=n(3).default||n(3),R=e.getSystemInfoSync(),N=function(){function n(){r(this,n),this.self="",this._retry=0,this._platform="",this._query={},this._navigationBarTitle={config:"",page:"",report:"",lt:""},this._operatingTime=0,this._reportingRequestData={1:[],11:[]},this.__prevent_triggering=!1,this.__licationHide=!1,this.__licationShow=!1,this._lastPageRoute="",this.statData={uuid:d(),ut:g(),mpn:v(),ak:P.appid,usv:c,v:m(),ch:_(),cn:"",pn:"",ct:"",t:h(),tt:"",p:"android"===R.platform?"a":"i",brand:R.brand||"",md:R.model,sv:R.system.replace(/(Android|iOS)\s/,""),mpsdk:R.SDKVersion||"",mpv:R.version||"",lang:R.language,pr:R.pixelRatio,ww:R.windowWidth,wh:R.windowHeight,sw:R.screenWidth,sh:R.screenHeight}}return u(n,[{key:"_applicationShow",value:function(){if(this.__licationHide){if(k(),D("app").overtime){var t={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(t)}this.__licationHide=!1}}},{key:"_applicationHide",value:function(t,e){this.__licationHide=!0,k();var n=D();B();var a=C(this);this._sendHideRequest({urlref:a,urlref_ts:n.residenceTime},e)}},{key:"_pageShow",value:function(){var t,e,n=C(this),a=(t=getCurrentPages(),e=t[t.length-1].$vm,"bd"===g()?e.$mp&&e.$mp.page.is:e.$scope&&e.$scope.route||e.$mp&&e.$mp.page.route);if(this._navigationBarTitle.config=I&&I.pages[a]&&I.pages[a].titleNView&&I.pages[a].titleNView.titleText||I&&I.pages[a]&&I.pages[a].navigationBarTitleText||"",this.__licationShow)return B(),this.__licationShow=!1,void(this._lastPageRoute=n);if(k(),this._lastPageRoute=n,D("page").overtime){var i={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(i)}B()}},{key:"_pageHide",value:function(){if(!this.__licationHide){k();var t=D("page");return this._sendPageRequest({url:this._lastPageRoute,urlref:this._lastPageRoute,urlref_ts:t.residenceTime}),void(this._navigationBarTitle={config:"",page:"",report:"",lt:""})}}},{key:"_login",value:function(){this._sendEventRequest({key:"login"},0)}},{key:"_share",value:function(){this._sendEventRequest({key:"share"},0)}},{key:"_payment",value:function(t){this._sendEventRequest({key:t},0)}},{key:"_sendReportRequest",value:function(t){this._navigationBarTitle.lt="1";var n,a,i=t.query&&"{}"!==JSON.stringify(t.query)?"?"+JSON.stringify(t.query):"";this.statData.lt="1",this.statData.url=t.path+i||"",this.statData.t=h(),this.statData.sc=function(t){var n=g(),a="";return t||("wx"===n&&(a=e.getLaunchOptionsSync().scene),a)}(t.scene),this.statData.fvts=(n=e.getStorageSync("First__Visit__Time"),a=0,n?a=n:(a=h(),e.setStorageSync("First__Visit__Time",a),e.removeStorageSync("Last__Visit__Time")),a),this.statData.lvts=function(){var t=e.getStorageSync("Last__Visit__Time"),n=0;return n=t||"",e.setStorageSync("Last__Visit__Time",h()),n}(),this.statData.tvc=function(){var t=e.getStorageSync("Total__Visit__Count"),n=1;return t&&(n=t,n++),e.setStorageSync("Total__Visit__Count",n),n}(),"n"===g()?this.getProperty():this.getNetworkInfo()}},{key:"_sendPageRequest",value:function(t){var e=t.url,n=t.urlref,a=t.urlref_ts;this._navigationBarTitle.lt="11";var i={ak:this.statData.ak,uuid:this.statData.uuid,lt:"11",ut:this.statData.ut,url:e,tt:this.statData.tt,urlref:n,urlref_ts:a,ch:this.statData.ch,usv:this.statData.usv,t:h(),p:this.statData.p};this.request(i)}},{key:"_sendHideRequest",value:function(t,e){var n=t.urlref,a=t.urlref_ts,i={ak:this.statData.ak,uuid:this.statData.uuid,lt:"3",ut:this.statData.ut,urlref:n,urlref_ts:a,ch:this.statData.ch,usv:this.statData.usv,t:h(),p:this.statData.p};this.request(i,e)}},{key:"_sendEventRequest",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.key,n=void 0===e?"":e,a=t.value,i=void 0===a?"":a,o=this._lastPageRoute,r={ak:this.statData.ak,uuid:this.statData.uuid,lt:"21",ut:this.statData.ut,url:o,ch:this.statData.ch,e_n:n,e_v:"object"==typeof i?JSON.stringify(i):i.toString(),usv:this.statData.usv,t:h(),p:this.statData.p};this.request(r)}},{key:"getNetworkInfo",value:function(){var t=this;e.getNetworkType({success:function(e){t.statData.net=e.networkType,t.getLocation()}})}},{key:"getProperty",value:function(){var e=this;t.runtime.getProperty(t.runtime.appid,function(t){e.statData.v=t.version||"",e.getNetworkInfo()})}},{key:"getLocation",value:function(){var t=this;P.getLocation?e.getLocation({type:"wgs84",geocode:!0,success:function(e){e.address&&(t.statData.cn=e.address.country,t.statData.pn=e.address.province,t.statData.ct=e.address.city),t.statData.lat=e.latitude,t.statData.lng=e.longitude,t.request(t.statData)}}):(this.statData.lat=0,this.statData.lng=0,this.request(this.statData))}},{key:"request",value:function(t,n){var a=this,i=h(),o=this._navigationBarTitle;t.ttn=o.page,t.ttpj=o.config,t.ttc=o.report;var r=this._reportingRequestData;if("n"===g()&&(r=e.getStorageSync("__UNI__STAT__DATA")||{}),r[t.lt]||(r[t.lt]=[]),r[t.lt].push(t),"n"===g()&&e.setStorageSync("__UNI__STAT__DATA",r),b=h(),"n"===g()&&(y=e.getStorageSync("__page__residence__time")),!(b-y<10)||n){var s=this._reportingRequestData;"n"===g()&&(s=e.getStorageSync("__UNI__STAT__DATA")),S();var u=[],l=[],p=[],d=function(t){s[t].forEach(function(e){var n=function(t){var e="";for(var n in t)e+=n+"="+t[n]+"&";return e.substr(0,e.length-1)}(e);0===t?u.push(n):3===t?p.push(n):l.push(n)})};for(var f in s)d(f);u.push.apply(u,l.concat(p));var v={usv:c,t:i,requests:JSON.stringify(u)};this._reportingRequestData={},"n"===g()&&e.removeStorageSync("__UNI__STAT__DATA"),"h5"!==t.ut?"n"!==g()||"a"!==this.statData.p?this._sendRequest(v):setTimeout(function(){a._sendRequest(v)},200):this.imageRequest(v)}}},{key:"_sendRequest",value:function(t){var n=this;e.request({url:"https://tongji.dcloud.io/uni/stat",method:"POST",data:t,success:function(){},fail:function(e){++n._retry<3&&setTimeout(function(){n._sendRequest(t)},1e3)}})}},{key:"imageRequest",value:function(t){var e=new Image,n=function(t){var e=Object.keys(t).sort(),n={},a="";for(var i in e)n[e[i]]=t[e[i]],a+=e[i]+"="+t[e[i]]+"&";return{sign:"",options:a.substr(0,a.length-1)}}(function(t){var e={};for(var n in t)e[n]=encodeURIComponent(t[n]);return e}(t)).options;e.src="https://tongji.dcloud.io/uni/stat.gif?"+n}},{key:"sendEvent",value:function(t,e){var n,a;(a=e,(n=t)?"string"!=typeof n?(console.error("uni.report [eventName] 参数类型错误,只能为 String 类型"),1):n.length>255?(console.error("uni.report [eventName] 参数长度不能大于 255"),1):"string"!=typeof a&&"object"!=typeof a?(console.error("uni.report [options] 参数类型错误,只能为 String 或 Object 类型"),1):"string"==typeof a&&a.length>255?(console.error("uni.report [options] 参数长度不能大于 255"),1):"title"===n&&"string"!=typeof a?(console.error("uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型"),1):void 0:(console.error("uni.report 缺少 [eventName] 参数"),1))||("title"!==t?this._sendEventRequest({key:t,value:"object"==typeof e?JSON.stringify(e):e},1):this._navigationBarTitle.report=e)}}]),n}(),q=function(t){function n(){var t;return r(this,n),(t=a(this,i(n).call(this))).instance=null,"function"==typeof e.addInterceptor&&(t.addInterceptorInit(),t.interceptLogin(),t.interceptShare(!0),t.interceptRequestPayment()),t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(n,N),u(n,null,[{key:"getInstance",value:function(){return this.instance||(this.instance=new n),this.instance}}]),u(n,[{key:"addInterceptorInit",value:function(){var t=this;e.addInterceptor("setNavigationBarTitle",{invoke:function(e){t._navigationBarTitle.page=e.title}})}},{key:"interceptLogin",value:function(){var t=this;e.addInterceptor("login",{complete:function(){t._login()}})}},{key:"interceptShare",value:function(t){var n=this;t?e.addInterceptor("share",{success:function(){n._share()},fail:function(){n._share()}}):n._share()}},{key:"interceptRequestPayment",value:function(){var t=this;e.addInterceptor("requestPayment",{success:function(){t._payment("pay_success")},fail:function(){t._payment("pay_fail")}})}},{key:"report",value:function(t,e){this.self=e,S(),this.__licationShow=!0,this._sendReportRequest(t,!0)}},{key:"load",value:function(t,e){if(!e.$scope&&!e.$mp){var n=getCurrentPages();e.$scope=n[n.length-1]}this.self=e,this._query=t}},{key:"show",value:function(t){this.self=t,x(t)?this._pageShow(t):this._applicationShow(t)}},{key:"ready",value:function(t){}},{key:"hide",value:function(t){this.self=t,x(t)?this._pageHide(t):this._applicationHide(t,!0)}},{key:"error",value:function(t){this._platform;var e="";e=t.message?t.stack:JSON.stringify(t);var n={ak:this.statData.ak,uuid:this.statData.uuid,lt:"31",ut:this.statData.ut,ch:this.statData.ch,mpsdk:this.statData.mpsdk,mpv:this.statData.mpv,v:this.statData.v,em:e,usv:this.statData.usv,t:h(),p:this.statData.p};this.request(n)}}]),n}().getInstance(),$=!1,A={onLaunch:function(t){q.report(t,this)},onReady:function(){q.ready(this)},onLoad:function(t){if(q.load(t,this),this.$scope&&this.$scope.onShareAppMessage){var e=this.$scope.onShareAppMessage;this.$scope.onShareAppMessage=function(t){return q.interceptShare(!1),e.call(this,t)}}},onShow:function(){$=!1,q.show(this)},onHide:function(){$=!0,q.hide(this)},onUnload:function(){$?$=!1:q.hide(this)},onError:function(t){q.error(t)}};((f=n(7)).default||f).mixin(A),e.report=function(t,e){q.sendEvent(t,e)}}).call(this,n(1).weexPlus,n(1).default)},45:function(t,e,n){"use strict";var a=n(46),i=n.n(a);e.default=i.a},46:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n(14)),i=o(n(121));function o(t){return t&&t.__esModule?t:{default:t}}var r={components:{uLink:a.default,setTabBar:i.default},data:function(){return{showSetTabBarPage:!1,list:[{id:"page",name:"界面",open:!1,pages:[{name:"设置导航条",url:"set-navigation-bar-title"},{name:"原生子窗体",url:"subnvue"},{name:"页面跳转",url:"navigator"},{name:"设置TabBar",url:"set-tabbar"},{name:"下拉刷新",url:"pull-down-refresh"},{name:"创建动画",url:"animation"},{name:"创建绘画",url:"canvas"},{name:"节点信息",url:"get-node-info"},{name:"节点布局交互状态",url:"intersection-observer"},{name:"显示操作菜单",url:"action-sheet"},{name:"显示模态弹窗",url:"modal"},{name:"显示加载提示框",url:"show-loading"},{name:"显示消息提示框",url:"toast"}]},{id:"device",name:"设备",open:!1,pages:[{name:"获取手机网络状态",url:"get-network-type"},{name:"获取手机系统信息",url:"get-system-info"},{name:"打电话",url:"make-phone-call"},{name:"震动",url:"vibrate"},{name:"添加手机联系人",url:"add-phone-contact"},{name:"扫码",url:"scan-code"},{name:"剪贴板",url:"clipboard"},{name:"屏幕亮度",url:"brightness"},{name:"蓝牙",url:"bluetooth"},{name:"指纹",url:"fingerprint"},{name:"iBeacon",url:"ibeacon"},{name:"监听加速度传感器",url:"on-accelerometer-change"},{name:"监听罗盘数据",url:"on-compass-change"},{name:"监听距离传感器",url:"/platforms/app-plus/proximity/proximity"},{name:"监听方向传感器",url:"/platforms/app-plus/orientation/orientation"}]},{id:"network",name:"网络",open:!1,pages:[{name:"发起一个请求",url:"request"},{name:"上传文件",url:"upload-file"},{name:"下载文件",url:"download-file"}]},{id:"media",name:"媒体",open:!1,pages:[{name:"图片",url:"image"},{name:"录音",url:"voice"},{name:"背景音频",url:"background-audio"},{name:"视频",url:"video"},{name:"文件",url:"file"},{name:"保存媒体到本地",url:"save-media"}]},{id:"location",name:"位置",open:!1,pages:[{name:"获取当前位置",url:"get-location"},{name:"使用地图查看位置",url:"open-location"},{name:"使用地图选择位置",url:"choose-location"},{name:"地图控制",url:"map"},{name:"地图搜索",url:"map-search"}]},{id:"storage",name:"数据",open:!1,pages:[{name:"数据存储（key-value）",url:"storage"},{name:"SQLite",url:"sqlite"}]},{id:"login",name:"登录",open:!1,pages:[{name:"登录",url:"login"},{name:"获取用户信息",url:"get-user-info"}]},{id:"share",name:"分享",open:!1,pages:[{name:"分享",url:"share"}]},{id:"payment",name:"支付",open:!1,pages:[{name:"发起支付",url:"request-payment"}]},{id:"speech",name:"语音",open:!1,pages:[{name:"语音识别",url:"/platforms/app-plus/speech/speech"}]},{id:"push",name:"推送",open:!1,pages:[{name:"推送",url:"/platforms/app-plus/push/push"}]}],navigateFlag:!1}},onShareAppMessage:function(){return{title:"欢迎体验uni-app",path:"/pages/tabBar/API/API"}},onNavigationBarButtonTap:function(e){t.navigateTo({url:"/pages/about/about"})},onLoad:function(){},onReady:function(){},onShow:function(){this.navigateFlag=!1,this.leaveSetTabBarPage()},onHide:function(){this.leaveSetTabBarPage()},methods:{triggerCollapse:function(t){if(this.list[t].pages)for(var e=0;e<this.list.length;++e)this.list[e].open=t===e&&!this.list[t].open;else this.goDetailPage(this.list[t].url)},goDetailPage:function(e){if(!this.navigateFlag)if(this.navigateFlag=!0,"set-tabbar"!==e){var n=~e.indexOf("platform")?e:"/pages/API/"+e+"/"+e;t.navigateTo({url:n})}else this.showSetTabBarPage=!0},leaveSetTabBarPage:function(){var t=this;setTimeout(function(){t.navigateFlag=!1},200),this.showSetTabBarPage=!1}}};e.default=r}).call(this,n(1).default)},47:function(t,e,n){"use strict";n.r(e);var a=n(48),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e.default=i.a},48:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{title:"tababr",hasSetTabBarBadge:!1,hasShownTabBarRedDot:!1,hasCustomedStyle:!1,hasCustomedItem:!1,hasHiddenTabBar:!1}},destroyed:function(){if(this.hasSetTabBarBadge&&t.removeTabBarBadge({index:1}),this.hasShownTabBarRedDot&&t.hideTabBarRedDot({index:1}),this.hasHiddenTabBar&&t.showTabBar(),this.hasCustomedStyle&&t.setTabBarStyle({color:"#7A7E83",selectedColor:"#007AFF",backgroundColor:"#F8F8F8",borderStyle:"black"}),this.hasCustomedItem){t.setTabBarItem({index:1,text:"接口",iconPath:"/static/api.png",selectedIconPath:"/static/apiHL.png"})}},methods:{navigateBack:function(){this.$emit("unmount")},setTabBarBadge:function(){this.hasShownTabBarRedDot&&(t.hideTabBarRedDot({index:1}),this.hasShownTabBarRedDot=!this.hasShownTabBarRedDot),this.hasSetTabBarBadge?t.removeTabBarBadge({index:1}):t.setTabBarBadge({index:1,text:"1"}),this.hasSetTabBarBadge=!this.hasSetTabBarBadge},showTabBarRedDot:function(){this.hasSetTabBarBadge&&(t.removeTabBarBadge({index:1}),this.hasSetTabBarBadge=!this.hasSetTabBarBadge),this.hasShownTabBarRedDot?t.hideTabBarRedDot({index:1}):t.showTabBarRedDot({index:1}),this.hasShownTabBarRedDot=!this.hasShownTabBarRedDot},hideTabBar:function(){this.hasHiddenTabBar?t.showTabBar():t.hideTabBar(),this.hasHiddenTabBar=!this.hasHiddenTabBar},customStyle:function(){this.hasCustomedStyle?t.setTabBarStyle({color:"#7A7E83",selectedColor:"#007AFF",backgroundColor:"#F8F8F8",borderStyle:"black"}):t.setTabBarStyle({color:"#FFF",selectedColor:"#007AFF",backgroundColor:"#000000",borderStyle:"black"}),this.hasCustomedStyle=!this.hasCustomedStyle},customItem:function(){var e={index:1,text:"接口",iconPath:"/static/api.png",selectedIconPath:"/static/apiHL.png"};this.hasCustomedItem?t.setTabBarItem(e):(e.text="API",t.setTabBarItem(e)),this.hasCustomedItem=!this.hasCustomedItem}}};e.default=n}).call(this,n(1).default)},49:function(t,e){t.exports={button:{marginTop:"30rpx",marginLeft:0,marginRight:0},"btn-area":{paddingTop:"30rpx"}}},5:function(t){t.exports={_from:"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001",_id:"@dcloudio/uni-stat@2.0.0-v3-24020191018001",_inBundle:!1,_integrity:"sha512-nYBm5pRrYzrj2dKMqucWSF2PwInUMnn3MLHM/ik3gnLUEKSW61rzcY1RPlUwaH7c+Snm6N+bAJzmj3GvlrlVXA==",_location:"/@dcloudio/uni-stat",_phantomChildren:{},_requested:{type:"range",registry:!0,raw:"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001",name:"@dcloudio/uni-stat",escapedName:"@dcloudio%2funi-stat",scope:"@dcloudio",rawSpec:"^2.0.0-alpha-24420191128001",saveSpec:null,fetchSpec:"^2.0.0-alpha-24420191128001"},_requiredBy:["/","/@dcloudio/vue-cli-plugin-uni"],_resolved:"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-v3-24020191018001.tgz",_shasum:"6ef04326cc0b945726413eebe442ab8f47c7536c",_spec:"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001",_where:"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli",author:"",bugs:{url:"https://github.com/dcloudio/uni-app/issues"},bundleDependencies:!1,deprecated:!1,description:"",devDependencies:{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5",eslint:"^6.1.0",rollup:"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},files:["dist","package.json","LICENSE"],gitHead:"197e8df53cc9d4c3f6eb722b918ccf51672b5cfe",homepage:"https://github.com/dcloudio/uni-app#readme",license:"Apache-2.0",main:"dist/index.js",name:"@dcloudio/uni-stat",repository:{type:"git",url:"git+https://github.com/dcloudio/uni-app.git",directory:"packages/uni-stat"},scripts:{build:"NODE_ENV=production rollup -c rollup.config.js",dev:"NODE_ENV=development rollup -w -c rollup.config.js"},version:"2.0.0-v3-24020191018001"}},50:function(t,e){t.exports={"uni-icon":{fontFamily:"uniicons",fontWeight:"normal"},"uni-container":{paddingTop:"15",paddingRight:"15",paddingBottom:"15",paddingLeft:"15",backgroundColor:"#f8f8f8"},"uni-header-logo":{paddingTop:"15",paddingRight:"15",paddingBottom:"15",paddingLeft:"15",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"10rpx"},"uni-header-image":{width:"80",height:"80"},"uni-hello-text":{marginBottom:"20"},"hello-text":{color:"#7A7E83",fontSize:"14",lineHeight:"20"},"hello-link":{color:"#7A7E83",fontSize:"14",lineHeight:"20"},"uni-panel":{marginBottom:"12"},"uni-panel-h":{backgroundColor:"#ffffff",flexDirection:"row",alignItems:"center",paddingTop:"12",paddingRight:"12",paddingBottom:"12",paddingLeft:"12"},"uni-panel-h-on":{backgroundColor:"#f0f0f0"},"uni-panel-text":{flex:1,color:"#000000",fontSize:"14",fontWeight:"normal"},"uni-panel-icon":{marginLeft:"15",color:"#999999",fontSize:"14",fontWeight:"normal",transform:"rotate(0deg)",transitionDuration:0,transitionProperty:"transform"},"@TRANSITION":{"uni-panel-icon":{duration:0,property:"transform"}},"uni-panel-icon-on":{transform:"rotate(180deg)"},"uni-navigate-item":{flexDirection:"row",alignItems:"center",backgroundColor:"#FFFFFF",borderTopStyle:"solid",borderTopColor:"#f0f0f0",borderTopWidth:"1",paddingTop:"12",paddingRight:"12",paddingBottom:"12",paddingLeft:"12","backgroundColor:active":"#f8f8f8"},"uni-navigate-text":{flex:1,color:"#000000",fontSize:"14",fontWeight:"normal"},"uni-navigate-icon":{marginLeft:"15",color:"#999999",fontSize:"14",fontWeight:"normal"}}},6:function(t,e,n){"use strict";n.r(e),e.default={pages:{},globalStyle:{}}},7:function(t,e){t.exports=Vue},8:function(t,e,n){Vue.prototype.__$appStyle__={},Vue.prototype.__merge_style&&Vue.prototype.__merge_style(n(9).default,Vue.prototype.__$appStyle__)},9:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e.default=i.a},90:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("scroll-view",{staticStyle:{flexDirection:"column"},attrs:{scrollY:!0,enableBackToTop:!0,bubble:"true"}},[n("view",{staticClass:["uni-container"]},[t.showSetTabBarPage?[n("set-tab-bar",{on:{unmount:t.leaveSetTabBarPage}})]:[n("view",{staticClass:["uni-header-logo"]},[n("u-image",{staticClass:["uni-header-image"],attrs:{src:"/static/apiIndex.png"}})],1),n("view",{staticClass:["uni-hello-text"]},[n("u-text",{staticClass:["hello-text"]},[t._v("以下将演示uni-app接口能力，详细文档见：")]),n("u-link",{staticClass:["hello-link"],attrs:{href:"https://uniapp.dcloud.io/api/",text:"https://uniapp.dcloud.io/api/",inWhiteList:!0}})],1),t._l(t.list,function(e,a){return n("view",{key:e.id,staticClass:["uni-panel"]},[n("view",{staticClass:["uni-panel-h"],class:e.open?"uni-panel-h-on":"",on:{click:function(e){t.triggerCollapse(a)}}},[n("u-text",{staticClass:["uni-panel-text"]},[t._v(t._s(e.name))]),n("u-text",{staticClass:["uni-panel-icon","uni-icon"],class:e.open?"uni-panel-icon-on":""},[t._v("")])]),e.open?n("view",{staticClass:["uni-panel-c"]},t._l(e.pages,function(a,i){return n("view",{key:i,staticClass:["uni-navigate-item"],attrs:{url:e.url},on:{click:function(e){t.goDetailPage(a.url)}}},[n("u-text",{staticClass:["uni-navigate-text"]},[t._v(t._s(a.name?a.name:a))]),n("u-text",{staticClass:["uni-navigate-icon","uni-icon"]},[t._v("")])])}),0):t._e()])})]],2)])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},96:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:["uni-padding-wrap"]},[n("page-head",{attrs:{title:t.title}}),n("button",{staticClass:["button"],on:{click:t.setTabBarBadge}},[t._v(t._s(t.hasSetTabBarBadge?"移除tab徽标":"设置tab徽标"))]),n("button",{staticClass:["button"],on:{click:t.showTabBarRedDot}},[t._v(t._s(t.hasShownTabBarRedDot?"移除红点":"显示红点"))]),n("button",{staticClass:["button"],on:{click:t.customStyle}},[t._v(t._s(t.hasCustomedStyle?"移除自定义样式":"自定义Tab样式"))]),n("button",{staticClass:["button"],on:{click:t.customItem}},[t._v(t._s(t.hasCustomedItem?"移除自定义信息":"自定义Tab信息"))]),n("button",{staticClass:["button"],on:{click:t.hideTabBar}},[t._v(t._s(t.hasHiddenTabBar?"显示TabBar":"隐藏TabBar"))]),n("view",{staticClass:["btn-area"]},[n("button",{staticClass:["button"],attrs:{type:"primary"},on:{click:t.navigateBack}},[t._v("返回上一级")])],1)],1)},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}});