(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/API/voice/voice"],{"1cfc":function(e,t,n){"use strict";n.r(t);var r=n("3109"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);t["default"]=o.a},3109:function(e,t,n){"use strict";(function(e,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("a34a")),a=i(n("80dc"));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,r,o,a,i){try{var c=e[a](i),u=c.value}catch(s){return void n(s)}c.done?t(u):Promise.resolve(u).then(r,o)}function u(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function i(e){c(a,r,o,i,u,"next",e)}function u(e){c(a,r,o,i,u,"throw",e)}i(void 0)})}}var s=n("717f"),l=null,f=null,d=null,p=null,m={data:function(){return{title:"start/stopRecord、play/stopVoice",recording:!1,playing:!1,hasRecord:!1,tempFilePath:"",recordTime:0,playTime:0,formatedRecordTime:"00:00:00",formatedPlayTime:"00:00:00"}},onUnload:function(){this.end()},onLoad:function(){var t=this;p=e.createInnerAudioContext(),p.onEnded(function(){clearInterval(l);var e=0;console.log(r("play voice finished"," at pages\\API\\voice\\voice.vue:91")),t.playing=!1,t.formatedPlayTime=s.formatTime(e),t.playTime=e}),d=e.getRecorderManager(),d.onStart(function(){console.log(r("recorder start"," at pages\\API\\voice\\voice.vue:98")),t.recording=!0,f=setInterval(function(){t.recordTime+=1,t.formatedRecordTime=s.formatTime(t.recordTime)},1e3)}),d.onStop(function(e){console.log(r("on stop"," at pages\\API\\voice\\voice.vue:107")),p.src=e.tempFilePath,t.hasRecord=!0,t.recording=!1})},methods:{startRecord:function(){var e=u(o.default.mark(function e(){var t;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.checkPermission();case 2:if(t=e.sent,1===t){e.next=5;break}return e.abrupt("return");case 5:d.start({format:"mp3"});case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),stopRecord:function(){d.stop(),clearInterval(f)},playVoice:function(){var e=this;console.log(r("play voice"," at pages\\API\\voice\\voice.vue:138")),this.playing=!0,l=setInterval(function(){e.playTime+=1,e.formatedPlayTime=s.formatTime(e.playTime)},1e3),p.play()},stopVoice:function(){clearInterval(l),this.playing=!1,this.formatedPlayTime=s.formatTime(0),this.playTime=0,p.stop()},end:function(){p.stop(),d.stop(),clearInterval(f),clearInterval(l),this.recording=!1,this.playing=!1,this.hasRecord=!1,this.playTime=0,this.recordTime=0,this.formatedRecordTime="00:00:00",this.formatedRecordTime="00:00:00"},clear:function(){this.end()},checkPermission:function(){var t=u(o.default.mark(function t(){var n;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!a.default.isIOS){t.next=6;break}return t.next=3,a.default.requestIOS("record");case 3:t.t0=t.sent,t.next=9;break;case 6:return t.next=8,a.default.requestAndroid("android.permission.RECORD_AUDIO");case 8:t.t0=t.sent;case 9:return n=t.t0,null===n||1===n?n=1:2===n?e.showModal({content:"系统麦克风已关闭",confirmText:"设置",success:function(e){e.confirm&&a.default.gotoiOSSetting()}}):e.showModal({content:"需要麦克风权限",confirmText:"设置",success:function(e){e.confirm&&a.default.gotoAppSetting()}}),t.abrupt("return",n);case 12:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}()}};t.default=m}).call(this,n("6e42")["default"],n("0de9")["default"])},8044:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o})},c279:function(e,t,n){},ceb7:function(e,t,n){"use strict";(function(e){n("ee7a"),n("921b");r(n("66fd"));var t=r(n("d8fa"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},d8fa:function(e,t,n){"use strict";n.r(t);var r=n("8044"),o=n("1cfc");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("fc6f");var i=n("2877"),c=Object(i["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=c.exports},fc6f:function(e,t,n){"use strict";var r=n("c279"),o=n.n(r);o.a}},[["ceb7","common/runtime","common/vendor"]]]);