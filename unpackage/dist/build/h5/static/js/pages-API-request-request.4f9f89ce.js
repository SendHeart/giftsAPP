(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-request-request"],{5640:function(t,e,n){"use strict";n.r(e);var a=n("ba13"),u=n("64a3");for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);var r=n("2877"),s=Object(r["a"])(u["default"],a["a"],a["b"],!1,null,null,null);e["default"]=s.exports},"64a3":function(t,e,n){"use strict";n.r(e);var a=n("e0a3"),u=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=u.a},"768b":function(t,e,n){"use strict";n.r(e);var a=n("a745"),u=n.n(a);function i(t){if(u()(t))return t}var r=n("5d73"),s=n.n(r);function o(t,e){var n=[],a=!0,u=!1,i=void 0;try{for(var r,o=s()(t);!(a=(r=o.next()).done);a=!0)if(n.push(r.value),e&&n.length===e)break}catch(c){u=!0,i=c}finally{try{a||null==o["return"]||o["return"]()}finally{if(u)throw i}}return n}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function l(t,e){return i(t)||o(t,e)||c()}n.d(e,"default",function(){return l})},ba13:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("page-head",{attrs:{title:t.title}}),n("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[n("v-uni-view",{staticClass:"uni-hello-text"},[t._v("请点击按钮向服务器发起请求")]),n("v-uni-view",{staticClass:"uni-textarea uni-common-mt"},[n("v-uni-textarea",{attrs:{value:t.res}})],1),n("v-uni-view",{staticClass:"uni-btn-v uni-common-mt"},[n("v-uni-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){e=t.$handleEvent(e),t.sendRequest(e)}}},[t._v("发起请求（Callback）")]),n("v-uni-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){e=t.$handleEvent(e),t.sendRequest("promise")}}},[t._v("发起请求（Promise）")]),n("v-uni-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){e=t.$handleEvent(e),t.sendRequest("await")}}},[t._v("发起请求（Async/Await）")])],1)],1)],1)},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},e0a3:function(t,e,n){"use strict";var a=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=a(n("768b"));n("96cf");var i=a(n("3b8d")),r=a(n("f499")),s=a(n("0a0d")),o="https://unidemo.dcloud.net.cn/ajax/echo/text?name=uni-app",c=2e3,l={data:function(){return{title:"request",loading:!1,res:""}},methods:{sendRequest:function(t){switch(this.loading=!0,t){case"promise":this._requestPromise();break;case"await":this._requestAwait();break;default:this._request();break}},_request:function(){var t=this;uni.request({url:o,dataType:"text",data:{noncestr:(0,s.default)()},success:function(e){console.log("request success",e),uni.showToast({title:"请求成功"+e.statusCode,icon:"success",mask:!0,duration:c}),t.res="请求结果 : "+(0,r.default)(e)},fail:function(t){console.log("request fail",t),uni.showModal({content:t.errMsg,showCancel:!1})},complete:function(){t.loading=!1}})},_requestPromise:function(){var t=this;uni.request({url:o,dataType:"text",data:{noncestr:(0,s.default)()}}).then(function(e){console.log("request success",e[1]),uni.showToast({title:"请求成功",icon:"success",mask:!0,duration:c}),t.res="请求结果 : "+(0,r.default)(e[1]),t.loading=!1}).catch(function(e){console.log("request fail",e),uni.showModal({content:e.errMsg,showCancel:!1}),t.loading=!1})},_requestAwait:function(){var t=(0,i.default)(regeneratorRuntime.mark(function t(){var e,n,a,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,uni.request({url:o,dataType:"text",data:{noncestr:(0,s.default)()}});case 2:e=t.sent,n=(0,u.default)(e,2),a=n[0],i=n[1],a?(console.log("request fail",a),uni.showModal({content:a.errMsg,showCancel:!1})):(console.log("request success",i),uni.showToast({title:"请求成功",icon:"success",mask:!0,duration:c}),this.res="请求结果 : "+(0,r.default)(i)),this.loading=!1;case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}};e.default=l}}]);