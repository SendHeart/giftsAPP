(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"27a8":function(e,t,i){var n=i("c060");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("0f7caa97",n,!0,{sourceMap:!1,shadowMode:!1})},"71be":function(e,t,i){"use strict";var n=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i("f499")),a=n(i("cebc")),s=n(i("b934")),r=(n(i("aca9")),i("2f62")),c=n(i("60fa")),l=i("3936"),d=getApp().globalData.weburl,u=getApp().globalData.shop_type,p=wx.getStorageSync("username"),b=getApp().globalData.md5_key;p&&uni.navigateBack();var f={components:{mInput:c.default},data:function(){return{providerList:[],hasProvider:!1,bypassword:!0,account:"",password:"",positionTop:0,vcode:"",shop_type:u}},computed:(0,r.mapState)(["forcedLogin"]),methods:(0,a.default)({},(0,r.mapMutations)(["login"]),{initProvider:function(){var e=this,t=["weixin","qq","sinaweibo"];uni.getProvider({service:"oauth",success:function(i){if(i.provider&&i.provider.length){for(var n=0;n<i.provider.length;n++)~t.indexOf(i.provider[n])&&e.providerList.push({value:i.provider[n],image:"/static/"+i.provider[n]+".png"});e.hasProvider=!0}},fail:function(e){console.error("获取服务供应商失败："+(0,o.default)(e))}})},initPosition:function(){this.positionTop=uni.getSystemInfoSync().windowHeight-100},bindLogin:function(){l.checkPhoneNumber(this.account)?this.password.length<6&&this.bypassword?uni.showToast({icon:"none",title:"密码最短为 6 个字符"}):this.vcode||this.bypassword?this.my_login():uni.showToast({icon:"none",title:"验证码不能为空"}):uni.showToast({icon:"none",title:"手机号格式错误"})},oauth:function(e){var t=this;uni.login({provider:e,success:function(i){uni.getUserInfo({provider:e,success:function(e){t.my_login()}})},fail:function(e){console.error("授权登录失败："+(0,o.default)(e))}})},my_login:function(){wx.getStorageSync("openid");var e=wx.getStorageSync("username")?wx.getStorageSync("username"):"",t=wx.getStorageSync("user_phone")?wx.getStorageSync("user_phone"):"",i=wx.getStorageSync("user_name")?wx.getStorageSync("user_name"):"",n=wx.getStorageSync("userInfo"),o=this.bypassword?d+"/api/web/user/login/user_login":d+"/api/web/user/login/user_xcx_login",a=(e=this.account,this.vcode),r=this.password,c=(0,s.default)(this.password,b,!0),l=this.bypassword,p=l?1:0;wx.request({url:o,method:"POST",data:{username:e,password:r,md5password:c,wx_nickname:n.nickName,wx_headimg:n.avatarUrl,user_phone:t,user_name:i,login_type:p,smscode:a,type:8,shop_type:u},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(e){"y"==e.data.status?(uni.reLaunch({url:"../hall/hall"}),console.log("app login 用户基本信息:",e.data.result),uni.setStorageSync("username",e.data.result["username"]),uni.setStorageSync("m_id",e.data.result["m_id"]),uni.setStorageSync("user_phone",e.data.result["user_phone"]),uni.setStorageSync("user_name",e.data.result["user_name"]),uni.setStorageSync("user_gender",e.data.result["user_gender"]),uni.setStorageSync("user_type",e.data.result["user_type"])):uni.showToast({icon:"none",title:e.data.info?e.data.info:"用户账号或密码不正确"})}})},toMain:function(e){this.login(e),this.forcedLogin?uni.reLaunch({url:"../main/main"}):uni.navigateBack()},bypasswd:function(){this.bypassword=!this.bypassword},getcode:function(){var e=this,t=this.shop_type,i=this.account;console.log("get code phone no:",i),l.checkPhoneNumber(i)?wx.request({url:d+"/api/web/user/login/login_sms_send",method:"POST",data:{phoneNo:i,shop_type:t},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(t){console.log(t.data),"y"==t.data.status?(e.ret_info=t.data.data,uni.showToast({icon:"none",title:"验证码已发送",duration:1500})):uni.showToast({icon:"none",title:"验证码获取失败"+t.data.info,duration:2e3})}}):uni.showToast({icon:"none",title:"手机号格式错误"})}}),onReady:function(){this.initPosition(),this.initProvider()}};t.default=f},"7e69":function(e,t,i){"use strict";i.r(t);var n=i("71be"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t["default"]=o.a},"8f7b":function(e,t,i){"use strict";i.r(t);var n=i("bc19"),o=i("7e69");for(var a in o)"default"!==a&&function(e){i.d(t,e,function(){return o[e]})}(a);i("a0d8");var s=i("2877"),r=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,"621be354",null);t["default"]=r.exports},a0d8:function(e,t,i){"use strict";var n=i("27a8"),o=i.n(n);o.a},bc19:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"input-group"},[i("v-uni-view",{staticClass:"input-row border"},[i("v-uni-text",{staticClass:"title"},[e._v("手机号：")]),i("m-input",{staticClass:"m-input",attrs:{type:"text",clearable:"",focus:"",placeholder:"请输入手机号"},model:{value:e.account,callback:function(t){e.account=t},expression:"account"}})],1),e.bypassword?i("v-uni-view",{staticClass:"input-row"},[i("v-uni-text",{staticClass:"title"},[e._v("密码：")]),i("m-input",{attrs:{type:"password",displayable:"",placeholder:"请输入密码"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1):e._e(),e.bypassword?e._e():i("v-uni-view",{staticClass:"input-row"},[i("v-uni-text",{staticClass:"title"},[e._v("验证码：")]),i("m-input",{attrs:{type:"text",placeholder:"请输入验证码"},model:{value:e.vcode,callback:function(t){e.vcode=t},expression:"vcode"}}),i("v-uni-button",{staticClass:"cu-btn bg-green shadow",on:{click:function(t){t=e.$handleEvent(t),e.getcode(t)}}},[e._v("验证码")])],1)],1),i("v-uni-view",{staticClass:"btn-row"},[i("v-uni-button",{staticClass:"primary",attrs:{type:"warn"},on:{click:function(t){t=e.$handleEvent(t),e.bindLogin(t)}}},[e._v("登录")])],1),i("v-uni-view",{staticClass:"action-row"},[i("v-uni-navigator",{attrs:{url:"../pwd/pwd"}},[e._v("忘记密码")]),e.bypassword?i("v-uni-view",{on:{click:function(t){t=e.$handleEvent(t),e.bypasswd(t)}}},[i("v-uni-text",[e._v("|")]),i("v-uni-text",[e._v("验证码登录")])],1):e._e(),e.bypassword?e._e():i("v-uni-view",{on:{click:function(t){t=e.$handleEvent(t),e.bypasswd(t)}}},[i("v-uni-text",[e._v("|")]),i("v-uni-text",[e._v("密码登录")])],1)],1)],1)},o=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return o})},c060:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,'.action-row[data-v-621be354]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:%?25?%}.action-row uni-navigator[data-v-621be354]{color:#007aff;padding:0 %?10?%}.action-row uni-text[data-v-621be354]{color:#007aff;padding:0 %?10?%}.oauth-row[data-v-621be354]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:absolute;top:0;left:0;width:100%}.oauth-image[data-v-621be354]{width:%?100?%;height:%?100?%;border:%?1?% solid #ddd;border-radius:%?100?%;margin:0 %?40?%;background-color:#fff}.oauth-image uni-image[data-v-621be354]{width:%?60?%;height:%?60?%;margin:%?20?%}swan-template[data-v-621be354]{width:100%;min-height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}\n\n    /* 原生组件模式下需要注意组件外部样式 */custom-component[data-v-621be354]{width:100%;min-height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}\n\n    /* 原生组件模式下需要注意组件外部样式 */m-input[data-v-621be354]{width:100%;min-height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.content[data-v-621be354]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background-color:#efeff4;padding:%?20?%}.input-group[data-v-621be354]{background-color:#fff;margin-top:%?40?%;position:relative}.input-group[data-v-621be354]:before{position:absolute;right:0;top:0;left:0;height:%?1?%;content:"";-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.input-group[data-v-621be354]:after{position:absolute;right:0;bottom:0;left:0;height:%?1?%;content:"";-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.input-row[data-v-621be354]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;position:relative}.input-row .title[data-v-621be354]{width:30%;height:%?50?%;min-height:%?50?%;padding:%?15?% 0;padding-left:%?30?%;line-height:%?50?%}.input-row.border[data-v-621be354]:after{position:absolute;right:0;bottom:0;left:%?15?%;height:%?1?%;content:"";-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.btn-row[data-v-621be354]{margin-top:%?50?%;padding:%?20?%}uni-button.warn[data-v-621be354]{background-color:#0faeff}.cu-btn[data-v-621be354]{width:%?230?%;position:relative;border:%?0?%;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:%?28?%;height:%?50?%;line-height:%?50?%;text-align:center;text-decoration:none;overflow:visible;margin:%?15?% %?20?% auto;-webkit-transform:translate(%?0?%,%?0?%);-ms-transform:translate(%?0?%,%?0?%);transform:translate(%?0?%,%?0?%)}.cu-btn[data-v-621be354]:after{display:none}.bg-green[data-v-621be354]{background-color:#39b54a;color:#fff}',""])}}]);