(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{2528:function(e,t,n){"use strict";n.r(t);var o=n("dee7"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=a.a},"2de1":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},"3e02":function(e,t,n){},"4a8e":function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("66fd"));function r(e){return e&&e.__esModule?e:{default:e}}n("d75c");var u="https://sendheart.dreamer-inc.com",l="wss://sendheart.dreamer-inc.com",i={onLaunch:function(){console.log(e("App Launch"," at App.vue:10"));var t=this,n=t.$options.globalData.weburl,r=t.$options.globalData.appid,u=t.$options.globalData.secret,l=t.$options.globalData.shop_type,i=(t.$options.globalData.face_licenseIDAndroid,t.$options.globalData.face_licenseIDIOS,o.getStorageSync("username")?o.getStorageSync("username"):""),c=o.getStorageSync("token")?o.getStorageSync("token"):"1",s="";s=plus.push.getClientInfo(),plus.screen.lockOrientation("portrait-primary");var p=n+"/api/app_client/appupdate";o.request({url:p,method:"POST",data:{username:i,access_token:c,shop_type:l,appid:plus.runtime.appid,version:plus.runtime.version,imei:plus.device.imei,platform:plus.os.name,clientinfo:JSON.stringify(s),type:0},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(t){console.log(e("success",t," at App.vue:46"));var n=t.data.result;if(t.data.status="1"==n.update_status){var a=n.pkgUrl;o.showModal({title:"更新提示",content:n.note?n.note:"是否选择更新",success:function(e){e.confirm&&plus.runtime.openURL(a)}})}else o.request({url:p,method:"POST",data:{username:i,access_token:c,shop_type:l,appid:plus.runtime.appid,version:plus.runtime.version,imei:plus.device.imei,platform:plus.os.name,clientinfo:JSON.stringify(s),type:1},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(t){var n=t.data.result;if(t.data.status="1"==n.update_status){var a=n.wgtUrl;o.downloadFile({url:a,success:function(t){200===t.statusCode&&plus.runtime.install(t.tempFilePath,{force:!1},function(){console.log(e("install success..."," at App.vue:92")),plus.runtime.restart()},function(t){console.error(e("install fail..."," at App.vue:95"))})}})}}})}});var d=weex.requireModule("dom");if(d.addRule("fontFace",{fontFamily:"uniicons",src:"url('./static/uni.ttf')"}),"ANDROID"==plus.os.name.toUpperCase()){var f=plus.android.runtimeMainActivity();plus.runtime.quit=function(){f.moveTaskToBack(!1)}}else plus.runtime.quit();plus.push.addEventListener("click",function(e){var t=e.payload;t&&("string"===typeof t&&(t=JSON.parse(t)),"object"===typeof t&&t.url&&setTimeout(function(e){o.navigateTo({url:t.url})},1e3))},!1),plus.push.addEventListener("receive",function(t){if("iOS"!=plus.os.name&&plus.push.createMessage(t.title,t.payload),t.payload)if(typeof t.payload==string)try{JSON.parse(t.payload)}catch(n){wx.showToast({title:"获取消息:"+n,icon:"loading",duration:2e3}),console.log(e(n," at App.vue:180"))}else typeof t.payload==object&&plus.push.createMessage(t.title,t.content)},!1),wx.setStorageSync("appid",r),wx.setStorageSync("appsecret",u),o.getSystemInfo({success:function(e){a.default.prototype.StatusBar=e.statusBarHeight,"android"==e.platform?a.default.prototype.CustomBar=e.statusBarHeight+50:a.default.prototype.CustomBar=e.statusBarHeight+45}}),a.default.prototype.ColorList=[{title:"嫣红",name:"red",color:"#e54d42"},{title:"桔橙",name:"orange",color:"#f37b1d"},{title:"明黄",name:"yellow",color:"#fbbd08"},{title:"橄榄",name:"olive",color:"#8dc63f"},{title:"森绿",name:"green",color:"#39b54a"},{title:"天青",name:"cyan",color:"#1cbbb4"},{title:"海蓝",name:"blue",color:"#0081ff"},{title:"姹紫",name:"purple",color:"#6739b6"},{title:"木槿",name:"mauve",color:"#9c26b0"},{title:"桃粉",name:"pink",color:"#e03997"},{title:"棕褐",name:"brown",color:"#a5673f"},{title:"玄灰",name:"grey",color:"#8799a3"},{title:"草灰",name:"gray",color:"#aaaaaa"},{title:"墨黑",name:"black",color:"#333333"},{title:"雅白",name:"white",color:"#ffffff"}]},onShow:function(){console.log(e("App Show"," at App.vue:294"));plus.push.getClientInfo()},onHide:function(){console.log(e("App Hide"," at App.vue:300"))},globalData:{test:"",appid:"wx986f630cc3d1a7fc",secret:"add3c71b7907a7ce99722d0e9cbac7f1",md5_key:"9666f44dd87410cf85949f3a053dc14a",miniprogram_id:"gh_89f1da9a2991",weburl:u,wssurl:l,uploadurl:"https://sendheart.dreamer-inc.com/api/upload/index4",httpserviceurl:"https://sendheart.dreamer-inc.com/api/upload/http_service",mapkey:"SSPBZ-ALR32-4BWUC-CLUXY-HAFM3-3ABQF",mapkey2:"BJFBZ-ZFTHW-Y2HRO-RL2UZ-M6EC3-GMF4U",openid:null,username:null,is_task:0,is_receive:0,has_sent:0,wish_id:0,order_no:"",order_id:"",goods_flag:0,code:null,shop_type:2,messageflag:0,hall_gotop:0,from_page:null,user_type:0,navList2:[]}};t.default=i}).call(this,n("0de9")["default"],n("6e42")["default"])},9918:function(e,t,n){"use strict";(function(e){n("ee7a"),n("921b");var t=r(n("66fd")),o=r(n("cd24")),a=r(n("c53f"));function r(e){return e&&e.__esModule?e:{default:e}}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){l(e,t,n[t])})}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(){return n.e("components/page-head").then(n.bind(null,"3419"))},c=function(){return n.e("components/page-foot").then(n.bind(null,"402e"))},s=function(){return n.e("components/uLink").then(n.bind(null,"b2eb"))},p=function(){return n.e("colorui/components/cu-custom").then(n.bind(null,"4db0"))};t.default.component("cu-custom",p),t.default.config.productionTip=!1,t.default.prototype.$store=a.default,t.default.prototype.$backgroundAudioData={playing:!1,playTime:0,formatedPlayTime:"00:00:00"},t.default.component("page-head",i),t.default.component("page-foot",c),t.default.component("uLink",s),o.default.mpType="app";var d=new t.default(u({store:a.default},o.default));e(d).$mount()}).call(this,n("6e42")["createApp"])},cd24:function(e,t,n){"use strict";n.r(t);var o=n("ec33");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("fa00");var r,u,l=n("2877"),i=Object(l["a"])(o["default"],r,u,!1,null,null,null);t["default"]=i.exports},d75c:function(e,t,n){"use strict";n.r(t);var o=n("2de1"),a=n("2528");for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);var u=n("2877"),l=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=l.exports},dee7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{wxToastConfig:""}},components:{},props:{},methods:{setData:function(e){var t,n,o=this,a=[];Object.keys(e).forEach(function(r){a=r.split("."),t=e[r],n=o.$data,a.forEach(function(e,r){r+1==a.length?o.$set(n,e,t):n[e]||o.$set(n,e,{}),n=n[e]})})}}};t.default=o},ec33:function(e,t,n){"use strict";n.r(t);var o=n("4a8e"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=a.a},fa00:function(e,t,n){"use strict";var o=n("3e02"),a=n.n(o);a.a}},[["9918","common/runtime","common/vendor"]]]);