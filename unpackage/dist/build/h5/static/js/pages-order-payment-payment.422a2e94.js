(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-payment-payment"],{1326:function(e,t,a){"use strict";a.r(t);var o=a("6106"),r=a.n(o);for(var n in o)"default"!==n&&function(e){a.d(t,e,function(){return o[e]})}(n);t["default"]=r.a},3936:function(e,t,a){"use strict";var o=a("288e");a("3b2b");var r=o(a("768b")),n=o(a("795b"));a("28a5"),a("a481");var i=o(a("e814"));function s(e){var t=e.getFullYear(),a=e.getMonth()+1,o=e.getDate(),r=e.getHours(),n=e.getMinutes(),i=e.getSeconds();return[t,a,o].map(c).join("-")+" "+[r,n,i].map(c).join(":")}function d(e,t){var a,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;a=e?new Date(e):new Date,a.setDate(a.getDate()+t);var r=a.getFullYear(),n=a.getMonth()+1,i=a.getDate(),s=a.getHours(),d=a.getMinutes(),c=a.getSeconds();return n<10&&(n="0"+n),i<10&&(i="0"+i),s<10&&(s="0"+s),d<10&&(d="0"+d),c<10&&(c="0"+c),0==o?r+"-"+n+"-"+i:1==o?s+":"+d:2==o?s+":"+d+":"+c:r+"-"+n+"-"+i}function c(e){return e=e.toString(),e[1]?e:"0"+e}function l(e){var t,a=6e4,o=60*a,r=24*o,n=30*r,s=365*r,d=(new Date).getTime(),c=d-e;if(c<0)return"数据出错";var l=c/s,u=c/n,f=c/(7*r),p=c/r,g=c/o,m=c/a;return t=l>=1?(0,i.default)(l)+"年以前":u>=1?(0,i.default)(u)+"个月前":f>=1?(0,i.default)(f)+"星期前":p>=1?(0,i.default)(p)+"天前":g>=1?(0,i.default)(g)+"小时前":m>=5?(0,i.default)(m)+"分钟前":"刚刚发表",t}function u(e){if("string"==typeof e)return e=e.replace(/\ +/g,""),e=e.replace(/[\r\n]/g,""),e;console.log("去除回车换行空格失败！参数不是字符串类型")}function f(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=new Date(e.replace(/-/g,"/")),r=new Date(t.replace(/-/g,"/")),n=r.getTime()-o.getTime(),s=(0,i.default)(n/864e5);return 0==a?n:1==a?s:void 0}function p(e){var t=e.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,"");return t}function g(e,t){e=e.split("."),t=t.split(".");var a=Math.max(e.length,t.length);while(e.length<a)e.push("0");while(t.length<a)t.push("0");for(var o=0;o<a;o++){var r=(0,i.default)(e[o]),n=(0,i.default)(t[o]);if(r>n)return 1;if(r<n)return-1}return 0}function m(e){var t="tmp_base64src";return new n.default(function(a,o){if(wx.getFileSystemManager){var n=wx.getFileSystemManager(),i=/data:image\/(\w+);base64,(.*)/.exec(e)||[],s=(0,r.default)(i,3),d=s[1],c=s[2];d||o(new Error("ERROR_BASE64SRC_PARSE"));var l="".concat(wx.env.USER_DATA_PATH,"/").concat(t,".").concat(d),u=wx.base64ToArrayBuffer(c);n.writeFile({filePath:l,data:u,encoding:"binary",success:function(){a(l)},fail:function(){o(new Error("ERROR_BASE64SRC_WRITE"))}})}else o(new Error("微信版本过低"))})}function w(){var e="ios";try{var t=wx.getSystemInfoSync();e=t.platform}catch(a){}return e}function y(e,t){return Math.round(e/(e+t)*1e4)/100+"%"}function b(e){return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(e)}function x(e){return RegExp(/^1[34578]\d{9}$/).test(e)}a("6b54"),a("87b3"),e.exports={formatTime:s,getDateDiff:l,getDateStr:d,formatString:u,calDateDiff:f,compareVersion:g,filterEmoji:p,checkPhoneNumber:x,base64src:m,getPlatform:w,percentage:y,checkEmail:b}},"4e5e":function(e,t,a){"use strict";var o=a("8a3e"),r=a.n(o);r.a},5946:function(e,t,a){"use strict";a.r(t);var o=a("7bb7"),r=a("1326");for(var n in r)"default"!==n&&function(e){a.d(t,e,function(){return r[e]})}(n);a("4e5e");var i=a("2877"),s=Object(i["a"])(r["default"],o["a"],o["b"],!1,null,"dfe5a6ca",null);t["default"]=s.exports},6106:function(e,t,a){"use strict";var o=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("28a5");var r=o(a("a4bb"));a("ac6a");var n=o(a("bd86")),i=o(a("f499"));a("7f7f");a("3936");var s=getApp().globalData.weburl,d=getApp().globalData.shop_type,c=wx.getStorageSync("navList2")?wx.getStorageSync("navList2"):[],l={data:function(){return{title_name:"送出礼物",title_logo:"../../../images/footer-icon-05.png",orderNo:"",orders:[],totalFee:0,sku_id:"",navList2:c,page:1,pagesize:5,page_num:0,all_rows:0,shop_type:d,is_buymyself:0,startBarHeight:"",navgationHeight:"",loadingHidden:!1,username:"",token:"",received:"",dkheight:"",userInfo:"",send_status:0,goods_flag:"",order_price:"",address_userName:"",address_postalCode:"",address_provinceName:"",address_cityName:"",address_countyName:"",address_detailInfo:"",address_nationalCode:"",address_telNumber:"",receive_status:0}},components:{},props:{},onLoad:function(e){var t=this,a=e.orderNo,o=e.totalFee?e.totalFee:0,r=e.is_buymyself?e.is_buymyself:0,n=e.received?e.received:0,i=wx.getStorageSync("username")?wx.getStorageSync("username"):"",d=wx.getStorageSync("token")?wx.getStorageSync("token"):"1",c=t.shop_type;t.navList2;t.get_project_gift_para(),wx.request({url:s+"/api/client/query_order",method:"POST",data:{username:i,access_token:d,order_no:a,shop_type:c},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(e){console.log("payment onload:",e.data.result);var c=e.data.result,l=t.sku_id;if(c){var u=0;console.log("orderObjects:"+c,"totalFee:",o);for(var f=0;f<c.length;f++){c[f]["logo"].indexOf("http")<0&&(c[f]["logo"]=s+c[f]["logo"]);for(var p=0;p<c[f]["order_sku"].length;p++)c[f]["order_sku"][p]["sku_image"].indexOf("http")<0&&(c[f]["order_sku"][p]["sku_image"]=s+c[f]["order_sku"][p]["sku_image"]),l=""!=l?l+","+c[f]["order_sku"][p]["sku_id"]:c[f]["order_sku"][p]["sku_id"];u+=c[f]["order_price"]}o=100*u.toFixed(2),t.setData({orders:c,orderNo:a,username:i,token:d,totalFee:o||u,sku_id:l,is_buymyself:r,received:n}),(0==r&&0==n||0==o)&&t.pay()}else wx.showToast({title:e.data.info,icon:"loading",duration:1500})}}),wx.getSystemInfo({success:function(e){var a=e.windowHeight;console.log(a),t.setData({dkheight:a-.05*a-120})}})},onShow:function(){var e=this,t=getCurrentPages();t.length>1&&e.setData({title_logo:"../../../images/back.png"})},methods:{setNavigation:function(){var e=20,t=44,a=this;wx.getSystemInfo({success:function(o){console.log(o.model),"iPhone X"==o.model&&(e=44),a.setData({startBarHeight:e,navgationHeight:t})}})},formSubmit:function(e){var t=this,a=e.detail.formId,o=e.currentTarget.dataset.name;console.log("formSubmit() formID：",a," form name:",o),"pay"==o&&t.pay(),a&&t.submintFromId(a)},submintFromId:function(e){var t=this,a=(e=e,t.shop_type),o=wx.getStorageSync("username")?wx.getStorageSync("username"):"",r=wx.getStorageSync("token")?wx.getStorageSync("token"):"1";wx.request({url:s+"/api/client/save_member_formid",method:"POST",data:{username:o,access_token:r,formId:e,shop_type:a},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(e){console.log("submintFromId() update success: ",e.data)}})},goBack:function(){var e=getCurrentPages();e.length>1?wx.navigateBack({changed:!0}):wx.switchTab({url:"../../hall/hall"})},get_project_gift_para:function(){var e=this,t=e.navList2,a=e.shop_type,o=(e.page,e.pagesize,e.navList2);console.log("payment get_project_gift_para navList2:",o,"length:",o.length),0==o.length&&wx.request({url:s+"/api/client/get_project_gift_para",method:"POST",data:{type:2,shop_type:a},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(a){console.log("get_project_gift_para:",a.data.result),t=a.data.result,t&&(e.setData({navList2:t}),console.log("payment get_project_gift_para navList_new:",t))}}),setTimeout(function(){e.setData({loadingHidden:!0})},1500)},pay:function(){var e=this,t=wx.getStorageSync("openid")?wx.getStorageSync("openid"):"",a=e.totalFee,o=e.orderNo,r=e.orders,n=e.shop_type,d=e.is_buymyself,c=e.received;if(console.log("payment openId",t," totalFee:",a," is_buymyself:",d," received:",c),a<=0)return e.delete_cart(),void wx.navigateTo({url:"../send/send?order_no="+o+"&orders="+(0,i.default)(r)+"&is_buymyself="+d});1==d||1==c?wx.request({url:s+"/api/WXPay",data:{openid:t,body:"商城",tradeNo:e.orderNo,totalFee:e.totalFee,shop_type:n},method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(t){t.data.timeStamp?wx.requestPayment({timeStamp:t.data.timeStamp,nonceStr:t.data.nonceStr,package:t.data.package,signType:"MD5",paySign:t.data.paySign,success:function(t){console.log("支付成功:"+t),wx.showToast({title:"支付成功",icon:"success",duration:2e3}),1==c?wx.navigateTo({url:"/pages/lottery/lottery?lottery_type=0&order_no="+o}):(e.delete_cart(),e.returnTapTag())}}):(console.log("支付返回:"+res),wx.showToast({title:res.data?res.data:"支付返回",icon:"loading",duration:2e3}))},fail:function(e){console.log("发起支付失败",e)}}):(console.log("未支付送礼","orderNo:",e.orderNo," orders:",e.orders),e.delete_cart(),wx.navigateTo({url:"../send/send?order_no="+e.orderNo+"&orders="+(0,i.default)(e.orders)+"&is_buymyself="+d}))},returnTapTag:function(){var e=this,t=wx.getStorageSync("username")?wx.getStorageSync("username"):"",a=wx.getStorageSync("token")?wx.getStorageSync("token"):"1",o=(e.goods_flag,e.orderNo),r=e.is_buymyself;wx.request({url:s+"/api/client/query_order",method:"POST",data:{username:t,access_token:a,order_no:o,order_type:"send",shop_type:d},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(i){console.log("order payment returnTapTag()再次确认订单状态:",i.data);var c,l=i.data.result;return l?l[0]["gift_status"]>0?(console.log("order payment returnTapTag() 该订单已送出 orderObjects:",l),wx.showToast({title:"该订单已送出",icon:"none",duration:1500}),void setTimeout(function(){wx.navigateBack()},1500)):(e.setData({send_status:0,orders:l,goods_flag:l[0]["order_sku"][0]["goods_flag"],order_price:l[0]["order_price"]}),void wx.request({url:s+"/api/client/update_order_status",method:"POST",data:(c={username:t,shop_type:d},(0,n.default)(c,"shop_type",d),(0,n.default)(c,"access_token",a),(0,n.default)(c,"status_info","send"),(0,n.default)(c,"order_no",o),(0,n.default)(c,"goods_flag",e.goods_flag),(0,n.default)(c,"is_buymyself",r),c),header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(t){console.log("order payment returnTapTag() 礼物发送状态更新完成:",t.data," is_buymyself:",r),console.log("order payment returnTapTag() 自购礼品 自动接收处理"),e.receiveTapTag()}})):(console.log("order payment returnTapTag() 没有该订单 orderObjects:",l),wx.showToast({title:"没有该订单",icon:"none",duration:1500}),void setTimeout(function(){wx.navigateBack()},1500))}})},receiveTapTag:function(){var e=this,t=e.is_buymyself,a=1==t?"收货地址":"请确认",o=1==t?"详细地址":"确认接受吗";1==t?e.set_address():wx.showModal({title:a,content:o,success:function(t){t.confirm&&e.set_address()}})},set_address:function(){var e=this,t=e.shop_type,a=e.orderNo,o=e.goods_flag,r=wx.getStorageSync("openid")?wx.getStorageSync("openid"):"",n=(e.userInfo.nickName,e.userInfo.avatarUrl,e.address_userName),i=e.address_postalCode,d=e.address_provinceName,c=e.address_cityName,l=e.address_countyName,u=e.address_detailInfo,f=e.address_nationalCode,p=e.address_telNumber,g=e.is_buymyself;wx.getSetting({success:function(e){e.authSetting["scope.address"]||wx.authorize({scope:"scope.address",success:function(){}})}}),wx.chooseAddress({success:function(m){console.log("微信收货地址:"),console.log(m),n=m.userName,i=m.postalCode,d=m.provinceName,c=m.cityName,l=m.countyName,u=m.detailInfo,f=m.nationalCode,p=m.telNumber,e.setData({address_userName:n,address_postalCode:i,address_provinceName:d,address_cityName:c,address_countyName:l,address_detailInfo:u,address_nationalCode:f,address_telNumber:p}),console.log("收货地址选择 订单号 order receive chooseAddress:"+a+" openid:"+r),wx.request({url:s+"/api/client/update_order_status",method:"POST",data:{username:e.username,shop_type:t,openid:r,nickname:e.nickname,headimg:e.headimg,order_no:a,status_info:"receive",goods_flag:o,address_userName:n,address_postalCode:i,address_provinceName:d,address_cityName:c,address_countyName:l,address_detailInfo:u,address_nationalCode:f,address_telNumber:p},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(t){console.log("order receive set_address()礼物已接收:",t.data),"y"==t.data.status?(wx.showToast({title:"礼物已接收",icon:"success",duration:1500}),e.setData({receive_status:1}),3==o&&setTimeout(function(){wx.navigateTo({url:"/pages/member/task/task"})},200),1==g&&(console.log("自购礼物订单抽奖 to lottery order_no:",a),wx.navigateTo({url:"/pages/lottery/lottery?lottery_type=0&order_no="+a}))):(console.log("礼物接收失败 order_no:",a),wx.showToast({title:t.data.info?t.data.info:"礼物接收失败",icon:"loading",duration:1500}),e.setData({receive_status:0}))}})}})},delete_cart:function(){var e=this,t=wx.getStorageSync("username")?wx.getStorageSync("username"):"",a=wx.getStorageSync("token")?wx.getStorageSync("token"):"1",o=e.sku_id,r=e.shop_type;console.log("payment delete_cart sku_id:",o),wx.request({url:s+"/api/client/delete_cart",method:"POST",data:{username:t,access_token:a,sku_id:o,shop_type:r},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(e){console.log("payment delete_cart:",e.data.result)}})},setData:function(e){var t,a,o=this,n=[];(0,r.default)(e).forEach(function(r){n=r.split("."),t=e[r],a=o.$data,n.forEach(function(e,r){r+1==n.length?o.$set(a,e,t):a[e]||o.$set(a,e,{}),a=a[e]})})}}};t.default=l},"768b":function(e,t,a){"use strict";a.r(t);var o=a("a745"),r=a.n(o);function n(e){if(r()(e))return e}var i=a("5d73"),s=a.n(i);function d(e,t){var a=[],o=!0,r=!1,n=void 0;try{for(var i,d=s()(e);!(o=(i=d.next()).done);o=!0)if(a.push(i.value),t&&a.length===t)break}catch(c){r=!0,n=c}finally{try{o||null==d["return"]||d["return"]()}finally{if(r)throw n}}return a}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function l(e,t){return n(e)||d(e,t)||c()}a.d(t,"default",function(){return l})},"7bb7":function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[e._l(e.orders,function(t,o){return 1==e.is_buymyself||1==e.received?a("v-uni-view",{key:o,staticClass:"order-item"},[a("v-uni-view",{staticClass:"order-footer"},[a("v-uni-text",{staticClass:"paytips"},[e._v("实付金额")]),a("v-uni-text",[e._v("￥"+e._s(t.order_price))])],1)],1):e._e()}),1==e.is_buymyself||1==e.received?a("v-uni-form",{staticStyle:{width:"100%"},attrs:{"data-name":"pay","report-submit":"true"},on:{submit:function(t){t=e.$handleEvent(t),e.formSubmit(t)}}},[a("v-uni-button",{staticClass:"btnpay",attrs:{type:"primary",formType:"submit"}},[e._v("微信支付")])],1):e._e(),1==e.is_buymyself||1==e.received?a("v-uni-view",{staticClass:"pay_recomment",staticStyle:{"margin-top":"10rpx"}},[a("v-uni-image",{attrs:{src:e.navList2[6].img,"background-size":"cover",mode:"widthFix"}})],1):e._e()],2)},r=[];a.d(t,"a",function(){return o}),a.d(t,"b",function(){return r})},"8a3e":function(e,t,a){var o=a("d739");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var r=a("4f06").default;r("36c977e2",o,!0,{sourceMap:!1,shadowMode:!1})},d739:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,"uni-page-body[data-v-dfe5a6ca]{background:#f2f2f2;overflow-x:hidden;width:100%}[data-v-dfe5a6ca]::-webkit-scrollbar{width:0;height:0;color:rgba(0,0,0,0)}.startBar[data-v-dfe5a6ca]{height:%?75?%;background:#333;width:100%;position:fixed;top:0;padding:%?5?%;border-bottom:0 solid #f2f2f2;z-index:99}.top-title[data-v-dfe5a6ca]{height:%?75?%;background:#333;width:100%;position:fixed;top:0;padding:%?5?%;border-bottom:0 solid #f2f2f2;z-index:99}.top-title-item[data-v-dfe5a6ca]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;width:100%;color:#fff;text-align:center;line-height:%?75?%;font-size:%?48?%;padding:%?10?%}.top-title-item .title-image[data-v-dfe5a6ca]{width:%?70?%;height:%?70?%;margin-right:%?1?%;margin-top:%?0?%;margin-left:%?20?%}.order-item[data-v-dfe5a6ca]{width:100%;margin:%?10?% auto}.order-item uni-form[data-v-dfe5a6ca]{width:100%}.order-item[data-v-dfe5a6ca]:last-child{margin-bottom:0}.order-footer[data-v-dfe5a6ca]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;text-align:center;padding:%?30?% %?20?%;color:#444;font-size:%?48?%;font-weight:700}.paytips[data-v-dfe5a6ca]{display:block;font-size:%?26?%;font-weight:400;width:%?200?%;padding:%?10?% %?20?%;color:#666;background:#ddd;border-radius:%?25?%;margin:0 auto %?30?% auto}.btnpay[data-v-dfe5a6ca]{width:96%;height:%?100?%;font-size:%?36?%;line-height:%?100?%;margin:%?40?% auto}\r\n/*每行单元格*/.carts-item[data-v-dfe5a6ca]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:%?120?%;\r\n\t/*width属性解决标题文字太短而缩略图偏移*/width:100%;border-bottom:1px solid #f2f2f2;padding:%?20?% 0;margin-right:%?20?%}\r\n/*左部图片*/.carts-image[data-v-dfe5a6ca]{width:%?90?%;height:%?90?%;margin:0 20px}\r\n/**/.shop-text[data-v-dfe5a6ca]{margin-left:%?10?%;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;font-size:14px;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}\r\n/*logo部图片*/.logo-image[data-v-dfe5a6ca]{width:%?50?%;height:%?50?%}\r\n/*右部描述*/.carts-text[data-v-dfe5a6ca]{width:75%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}\r\n/*右上部分标题*/.carts-title[data-v-dfe5a6ca]{font-size:%?28?%;color:#444;line-height:%?30?%}\r\n/*右下部分价格与数量*/.carts-subtitle[data-v-dfe5a6ca]{font-size:%?24?%;color:#999;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.carts-more[data-v-dfe5a6ca]{height:%?40?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:left;-webkit-justify-content:left;-ms-flex-pack:left;justify-content:left; /*子项横轴上居中对齐*/bottom:0;border-top:1px solid #eee;border-bottom:1px solid #eee;background:#fff;padding:%?25?%;z-index:1}.select-and-amount[data-v-dfe5a6ca]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}\r\n/*地址*/.order-address[data-v-dfe5a6ca]{float:left;margin-left:%?10?%;color:#a9a9a9;font-size:14px;line-height:22px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}\r\n/*价格*/.order-price[data-v-dfe5a6ca]{float:right;color:#f60;font-size:14px;line-height:22px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}\r\n/*隐藏元素*/.hidden[data-v-dfe5a6ca]{display:none}.pay_recomment[data-v-dfe5a6ca]{width:100%;\r\n \r\n  /*margin-left: 15rpx;*/background-color:#f2f2f2;background-repeat:norepeat;-webkit-align-content:center;-ms-flex-line-pack:center;align-content:center;opacity:1;background-size:100% 80%}.pay_recomment uni-image[data-v-dfe5a6ca]{width:100%;height:%?300?%}body.?%PAGE?%[data-v-dfe5a6ca]{background:#f2f2f2}",""])}}]);