(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-list-list"],{3169:function(e,t,a){var i=a("8794");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=a("4f06").default;s("7f2de57f",i,!0,{sourceMap:!1,shadowMode:!1})},"620b":function(e,t,a){"use strict";a.r(t);var i=a("c7ae"),s=a("eb41");for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);a("bb6c");var o=a("2877"),d=Object(o["a"])(s["default"],i["a"],i["b"],!1,null,"ae1e01a8",null);t["default"]=d.exports},8794:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,"/*page background*/uni-page-body[data-v-ae1e01a8]{background:#eee}\r\n/*that means a record*/.item[data-v-ae1e01a8]{margin-bottom:%?20?%;background:#fff;padding:%?20?%}\r\n/*姓名与手机号码*/.item .header[data-v-ae1e01a8]{font-size:%?36?%;color:#333;line-height:%?72?%}.item .header uni-text[data-v-ae1e01a8]{margin-right:%?40?%}.item .summary[data-v-ae1e01a8]{color:#999;font-size:%?32?%;line-height:%?60?%}.item .footer[data-v-ae1e01a8]{border-top:1px solid #ccc;font-size:%?30?%;color:#999;padding-left:%?10?%;padding-top:%?10?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}\r\n/*设为默认地址*/.set-default[data-v-ae1e01a8]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.set-default uni-text[data-v-ae1e01a8]{margin-left:%?10?%}\r\n/*编辑与删除操作*/.item .footer .operation[data-v-ae1e01a8]{width:%?280?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.item .footer .operation .container[data-v-ae1e01a8]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.item .footer .operation .container uni-image[data-v-ae1e01a8]{width:%?60?%;height:%?60?%}.item .footer .operation .container uni-text[data-v-ae1e01a8]{margin-left:%?10?%}\r\n/*地址列表包装容器*/.address-list[data-v-ae1e01a8]{margin-bottom:56px}\r\n/*添加地址按钮*/.address-add[data-v-ae1e01a8]{position:fixed;bottom:0;width:100%}body.?%PAGE?%[data-v-ae1e01a8]{background:#eee}",""])},bb6c:function(e,t,a){"use strict";var i=a("3169"),s=a.n(i);s.a},c7ae:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("v-uni-view",{staticClass:"address-list"},e._l(e.addressObjects,function(t,i){return a("v-uni-view",{key:i,staticClass:"item"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-text",{staticClass:"realname"},[e._v(e._s(t.full_name))]),a("v-uni-text",{staticClass:"mobile"},[e._v(e._s(t.tel))])],1),a("v-uni-view",{staticClass:"summary"},[e._v(e._s(t.prov_str)+e._s(t.city_str)+e._s(t.area_str)+e._s(t.town_str)+e._s(t.address))]),a("v-uni-view",{staticClass:"footer"},[a("v-uni-view",{staticClass:"set-default",attrs:{"data-index":i},on:{click:function(t){t=e.$handleEvent(t),e.setDefault(t)}}},[a("v-uni-icon",{attrs:{type:1==t.is_default?"success_circle":"circle"}}),a("v-uni-text",[e._v("默认地址")])],1),a("v-uni-view",{staticClass:"operation"},[a("v-uni-view",{staticClass:"container",attrs:{"data-index":i},on:{click:function(t){t=e.$handleEvent(t),e.edit(t)}}},[a("v-uni-image",{attrs:{src:"../../../static/images/icon_edit.png"}}),a("v-uni-text",[e._v("编辑")])],1),a("v-uni-view",{staticClass:"container",attrs:{"data-index":i},on:{click:function(t){t=e.$handleEvent(t),e.deleteFun(t)}}},[a("v-uni-image",{attrs:{src:"../../../static/images/icon_delete.png"}}),a("v-uni-text",[e._v("删除")])],1)],1)],1)],1)}),1),a("v-uni-button",{staticClass:"address-add",attrs:{type:"warn"},on:{click:function(t){t=e.$handleEvent(t),e.add(t)}}},[e._v("添加地址")])],1)},s=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return s})},eb41:function(e,t,a){"use strict";a.r(t);var i=a("edd3"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);t["default"]=s.a},edd3:function(e,t,a){"use strict";var i=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("28a5");var s=i(a("a4bb"));a("ac6a");var n=i(a("e814")),o=getApp().globalData.weburl,d={data:function(){return{username:null,token:null,addressIndex:null,addressObjects:"",is_buymyself:0,is_activity:0}},components:{},props:{},onLoad:function(e){var t=this;t.is_buymyself=e.is_buymyself?e.is_buymyself:0,t.is_activity=e.is_activity?e.is_activity:0,console.log("address list onload options:",e)},onShow:function(){var e=this,t=wx.getStorageSync("username")?wx.getStorageSync("username"):"",a=wx.getStorageSync("token")?wx.getStorageSync("token"):"1";e.setData({username:t,token:a}),t?this.loadData(t,a):wx.navigateTo({url:"../../login/login?goods_id="+this.goodsid+"&is_permission=1"})},methods:{add:function(){var e=this.is_buymyself,t=this.is_activity;wx.navigateTo({url:"../add/add?is_buymyself="+e+"&is_activity="+t})},setDefault:function(e){for(var t=this,a=t.username,i=t.token,s=(0,n.default)(e.currentTarget.dataset.index),d=t.addressObjects,r=0;r<d.length;r++)d[r]["is_default"]=r==s?1:0;t.setData({addressObjects:d}),wx.request({url:o+"/api/client/update_member_address",method:"POST",data:{username:a,id:d[s]["id"],access_token:i,full_name:d[s]["full_name"],prov:d[s]["prov"],city:d[s]["city"],area:d[s]["area"],town:d[s]["town"],address:d[s]["address"],tel:d[s]["tel"],is_default:d[s]["is_default"]},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(e){console.log(e.data.result),wx.showToast({title:"设置成功",icon:"success",duration:2e3})}})},edit:function(e){var t=(0,n.default)(e.currentTarget.dataset.index),a=this.addressObjects[t]["id"];wx.navigateTo({url:"../add/add?objectId="+a})},deleteFun:function(e){var t=this,a=t.username,i=t.token,s=(0,n.default)(e.currentTarget.dataset.index),d=t.addressObjects[s];wx.showModal({title:"确认",content:"要删除这个地址吗？",success:function(e){e.confirm&&wx.request({url:o+"/api/client/delete_member_address",method:"POST",data:{username:a,address_id:d["id"],access_token:i},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(e){console.log(e.data.result);for(var a=t.addressObjects,i=[],n=0,o=0;o<a.length;o++)o!=s&&(i[n++]=a[o]);t.setData({addressObjects:i}),wx.showToast({title:"删除成功",icon:"success",duration:2e3})}})}})},loadData:function(e,t){var a=this;wx.request({url:o+"/api/client/get_member_address",method:"POST",data:{username:e,token:t},header:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},success:function(e){for(var t=e.data.result,i=0;i<t.length;i++)1==t[i]["is_default"]&&a.setData({addressIndex:i});a.setData({addressObjects:t})}})},setData:function(e){var t,a,i=this,n=[];(0,s.default)(e).forEach(function(s){n=s.split("."),t=e[s],a=i.$data,n.forEach(function(e,s){s+1==n.length?i.$set(a,e,t):a[e]||i.$set(a,e,{}),a=a[e]})})}}};t.default=d}}]);