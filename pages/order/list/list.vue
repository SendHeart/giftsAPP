<template>
<view>
<!--   
<view class="banner"> 
 <template is="nav_order" data="{{navList_order, activeIndex2}}"/>
</view>
 -->
<view>
  <view class="order-summary">
    <view class="order-title">
      <text>{{card_register_info['card_register_title']}}</text>
    </view>
     <view class="order-owner" style="font-size:28rpx;">
      <!--text>发起人：</text -->
      <image :src="owner_headimg" style="width:50rpx;height:50rpx;border-radius:50%;margin-right:20rpx;"></image>
      <text space="ensp">{{card_register_ownername?' '+card_register_ownername:owner_nickname}}</text>
      <text space="ensp">{{carder_register_ownwechat?' 微信：'+carder_register_ownwechat:''}}</text>
    </view>
    <view :hidden="(card_type==1?false:true)" class="order-dueday" style="font-size:28rpx;">
      <text>时间：</text>
      <text space="ensp">{{card_register_info['register_start_date']}} {{card_register_info['register_start_time']}}</text>
      <text space="ensp">~~{{card_register_info['register_end_date']}} {{card_register_info['register_end_time']}}</text>
    </view>
    <view :hidden="(card_type==2?false:true)" class="order-dueday" style="font-size:28rpx;">
      <text>名片内容：</text>
      <text space="ensp">{{card_name_info['card_name_name']}} {{card_name_info['card_name_title']?'('+card_name_info['card_name_title']+')':''}}</text>
    </view>
    <view :hidden="(card_type==4?false:true)" class="order-dueday" style="font-size:28rpx;">
      <text space="ensp">{{card_love_info['card_love_title']}}</text>
      <text space="ensp">{{card_love_info['card_love_related']?'联系人:'+card_love_info['card_love_related']:''}}{{card_love_info['card_love_phone']?'   手机:'+card_love_info['card_love_phone']:''}}</text>
    </view>
    <view class="order-statistic" style="font-size:28rpx;">
      <text>{{card_type==1?'参与人数：':'数量:'}}</text>
      <text space="ensp">{{all_rows}}</text>
      <text :hidden="(card_type==1?false:true)" space="ensp">/{{card_register_info['card_register_lim']}}</text>
    </view>
  </view>
	<view style="margin-top:180rpx;">
    <view v-for="(mapping, index) in orders" :key="index" class="order-list">
      <view class="order-image">
        <image :src="mapping.from_headimg" mode="aspectFill"></image>
      </view>
      <view style="width:30%;font-size:25rpx; display:-webkit-box;overflow: hidden;text-overflow: ellipsis;">{{mapping.name?mapping.name:mapping.from_nickname}}</view>
      <view :hidden="(card_type==1?false:true)" style="width:35%;font-size:25rpx;">{{mapping.phone_enc?' 手机:'+mapping.phone_enc:''}}</view>
      <view :hidden="(card_type==1?false:true)" style="width:20%;font-size:25rpx;">{{mapping.register_time}}</view>
      <view :hidden="(card_type==2||card_type==4||card_type==10?false:true)" style="width:20%;font-size:25rpx;">{{mapping.addtime}}</view>
      <view :hidden="(card_type==4?false:true)" style="width:15%;font-size:25rpx;margin:0 auto;" @tap="gotoMap" :data-latitude="mapping.latitude" :data-longitude="mapping.longitude">
       <image style="width:50rpx;height:50rpx;" src="/static/images/map.png" mode="aspectFill"></image>
      </view>
      <view style="width:5%;font-size:25rpx;margin:0 auto;" @tap="memberinfo" :data-order-id="mapping.order_id" :data-inter-id="mapping.id" :data-phone="mapping.phone" :data-sex="mapping.sex" :data-name="mapping.name" :data-note="mapping.note">
       <image style="width:35rpx;height:35rpx;" src="/static/images/bottom-comment.png" mode="aspectFill"></image>
      </view>
    </view>
	</view>
</view>
<view>
  <modal class="modalbox" title :hidden="modalHiddenMember" confirm-text="返回" no-cancel @confirm="modalBindconfirmMember">
    <view :hidden="(name?false:true)" class="order-member-info" style="font-size:28rpx;">
      <text>姓名：</text>
      <text space="ensp">{{name}}</text>
    </view>
    <view :hidden="(phone?false:true)" class="order-member-info" style="font-size:28rpx;" @click.stop="callphone" :data-phone="phone">
      <text>手机:</text>
      <text space="ensp">{{phone}}</text>
      <image style="margin-left:20rpx;margin-top:15rpx;width:20rpx;height:20rpx;" src="/static/images/acontact.png"></image>
    </view>
    <view :hidden="(sex>0?false:true)" class="order-member-info" style="font-size:28rpx;">
      <text>性别：</text>
      <text space="ensp">{{sex==1?'男':'女'}}</text>
    </view>
    <view :hidden="(note?false:true)" class="order-member-info" style="font-size:28rpx;">
      <text>留言：</text>
    </view>
     <view :hidden="(note?false:true)" class="order-member-info" style="font-size:28rpx;">
      <text space="ensp">{{note?note:''}}</text>
    </view>
  </modal>
</view>

<view class="sentbtn" :hidden="hiddenmore">
  <button @tap="getMoreOrdersTapTag">加载更多</button>
</view>
</view>
</template>

<script>
var util = require("utils/util.js");
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var navList_order = [{
  id: "send",
  title: "我送出的"
}, {
  id: "receive",
  title: "我收到的"
}];

export default {
  data() {
    return {
      orders: [],
      page: 1,
      pagesize: 20,
      status: 0,
      navList_order: navList_order,
      tab2: 'send',
      activeIndex2: 0,
      all_rows: 0,
      hiddenmore: true,
      shop_type: shop_type,
      modalHiddenMember: true,
      name: "",
      phone: "",
      sex: "",
      note: "",
      giftflag: "",
      order_id: "",
      receive: "",
      order_shape: "",
      card_type: "",
      order_voice: "",
      voice_url: "",
      inter_order: "",
      owner_headimg: "",
      owner_nickname: "",
      receive_status: "",
      order_m_id: "",
      card_register_info: "",
      card_name_info: "",
      card_love_info: "",
      card_cele_info: "",
      card_template: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // 订单状态，已下单为1，已付为2，已发货为3，已收货为4 5已经评价 6退款 7部分退款 8用户取消订单 9作废订单 10退款中
    var that = this;
    var order_id = options.order_id ? options.order_id : '';
    var receive = options.receive ? options.receive : 0;
    var order_shape = options.order_shape ? options.order_shape : 4;
    var card_type = options.card_type ? options.card_type : 0;
    console.log('order list onLoad:', options);
    that.setData({
      order_id: order_id,
      receive: receive,
      order_shape: order_shape,
      card_type: card_type
    });
    that.reloadData();
    that.query_interaction_info(order_id);
  },
  onShow: function () {//
  },
  methods: {
    callphone: function (e) {
      var that = this;
      var phone = e.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone
      });
    },
    memberinfo: function (e) {
      var that = this;
      var name = e.currentTarget.dataset.name;
      var phone = e.currentTarget.dataset.phone;
      var sex = e.currentTarget.dataset.sex;
      var note = e.currentTarget.dataset.note;
      that.setData({
        modalHiddenMember: !that.modalHiddenMember,
        name: name,
        phone: phone,
        sex: sex,
        note: note
      });
    },
    modalBindconfirmMember: function () {
      var that = this;
      that.setData({
        modalHiddenMember: !that.modalHiddenMember
      });
    },
    goBack: function () {
      wx.switchTab({
        url: '../hall/hall'
      });
    },
    onOrderTapTag: function (e) {
      var that = this;
      var tab = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var giftflag = that.giftflag;

      if (tab == 'send') {
        giftflag = 0;
      } else {
        giftflag = 1;
      }

      that.setData({
        activeIndex2: index,
        tab2: tab,
        page: 1,
        giftflag: giftflag
      });
      console.log('tab:' + tab);
      that.reloadData();
    },
    getMoreOrdersTapTag: function (e) {
      var that = this;
      var page = that.page + 1;
      var all_rows = that.all_rows;

      if (page > all_rows) {
        wx.showToast({
          title: '没有更多的数据',
          icon: 'loading',
          duration: 1000
        });
        that.setData({
          hiddenmore: true
        });
        return;
      }

      that.setData({
        page: page
      });
      that.reloadData();
    },
    sendAginTapTag: function (e) {
      var that = this;
      wx.navigateTo({
        url: '../../list/list'
      });
    },
    detailTapTag: function (e) {
      var that = this;
      var order_object = e.currentTarget.dataset.orderObject;
      var order_id = order_object['id'];
      console.log('订单ID:' + order_id);
      wx.navigateTo({
        url: '../orderdetail/orderdetail?order_id=' + order_id + '&order_object=' + JSON.stringify(order_object)
      });
    },
    gotoMap: function (e) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var longitude = e.currentTarget.dataset.longitude;
      var latitude = e.currentTarget.dataset.latitude;
      console.log('order list 爱心卡 gotoMap:', e);
      wx.navigateTo({
        url: '/pages/member/map/map?lat=' + longitude + '&lng=' + longitude + '&title=位置详情'
      });
    },
    reloadData: function () {
      var that = this; //var order_type= that.data.tab2;

      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var receive = that.receive ? that.receive : 0;
      var order_shape = that.order_shape ? that.order_shape : 4;
      var card_type = that.card_type;
      var order_id = that.order_id ? that.order_id : '';
      var page = that.page;
      var pagesize = that.pagesize;
      console.log('reloadData shop_type:', that.shop_type); //从服务器获取订单列表

      wx.request({
        url: weburl + '/api/client/query_order_interaction',
        method: 'POST',
        data: {
          username: username ? username : openid,
          m_id: m_id,
          access_token: token,
          order_id: order_id,
          shop_type: shop_type,
          order_shape: order_shape,
          receive: receive,
          page: page,
          pagesize: pagesize
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('order list reloadData query_order_interaction:', res.data.result);
          var orderObjects = res.data.result;
          var all_rows = res.data.all_rows;

          if (!res.data.result) {
            wx.showToast({
              title: '没有查到信息',
              icon: 'none',
              duration: 2000
            });

            if (page == 1) {
              that.setData({
                orders: [],
                all_rows: 0,
                hiddenmore: true
              });
            } else {
              that.setData({
                hiddenmore: true
              });
            }
          } else {
            for (var i = 0; i < orderObjects.length; i++) {
              var m_desc = orderObjects[i]['m_desc'];

              if (orderObjects[i]['from_headimg'].indexOf("https://wx.qlogo.cn") >= 0) {
                orderObjects[i]['from_headimg'] = orderObjects[i]['from_headimg'] ? orderObjects[i]['from_headimg'].replace('https://wx.qlogo.cn', weburl + '/qlogo') : '';
              }

              orderObjects[i]['register_time'] = orderObjects[i]['register_time'] ? util.getDateDiff(orderObjects[i]['register_time'] * 1000) : '';
              orderObjects[i]['addtime'] = orderObjects[i]['addtime'] ? util.getDateDiff(orderObjects[i]['addtime'] * 1000) : '';
              orderObjects[i]['phone_enc'] = orderObjects[i]['phone'] ? orderObjects[i]['phone'].substring(0, 3) + '****' + orderObjects[i]['phone'].substring(7, 11) : '';

              if (m_desc) {
                var desc_note = JSON.parse(m_desc);
                orderObjects[i]['note'] = desc_note['note'];
              }
            }

            console.log('order list reloadData orderObjects:', orderObjects);

            if (page > 1 && orderObjects) {
              //向后合拼
              orderObjects = that.orders.concat(orderObjects);
            }

            that.setData({
              orders: orderObjects,
              all_rows: all_rows,
              hiddenmore: false
            });
          }
        }
      });
    },
    query_interaction_info: function (order_id) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var order_id = that.order_id;
      var headimg = that.headimg;
      var nickname = that.nickname;
      var shop_type = that.shop_type;
      var card_register_info = '';
      var card_name_info = '';
      var card_love_info = '';
      var card_cele_info = '';
      var card_template = '';
      var card_type = 0;
      var card_register_ownername = '';
      var card_register_ownerwechat = ''; //从服务器获取互动订单详情

      wx.request({
        url: weburl + '/api/client/query_order',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          order_id: order_id,
          order_type: 'receive',
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(' order receive reloadData() 互动订单查询:', res.data.result, ' order_id:', order_id);
          var orderObjects = res.data.result;
          var all_rows = res.data.all_rows ? res.data.all_rows : 0;
          var receive_status = that.receive_status;
          var order_m_id = 0;

          if (!res.data.result) {
            wx.showToast({
              title: '暂无信息',
              icon: 'loading',
              duration: 1500
            });
            that.setData({
              orders: [],
              all_rows: 0,
              hiddenmore: true
            });
          } else {
            // 存储地址字段
            for (var i = 0; i < orderObjects.length; i++) {
              if (orderObjects[i]['logo'].indexOf("http") < 0) {
                orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo'];
              }

              for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
                if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
                  orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
                }
              }

              var owner_headimg = orderObjects[i]['from_headimg'];
              var owner_nickname = orderObjects[i]['from_nickname'];
            }

            receive_status = orderObjects[0]['gift_status'] == 2 ? 1 : 0;
            order_m_id = orderObjects[0]['m_id'] ? orderObjects[0]['m_id'] : 0;

            if ((orderObjects[0]['shape'] == 5 || orderObjects[0]['shape'] == 4) && orderObjects[0]['m_desc']) {
              var m_desc = JSON.parse(orderObjects[0]['m_desc']);
              var voice_url = m_desc['voice'];
              card_register_info = m_desc['card_register_info'] ? m_desc['card_register_info'] : '';
              card_name_info = m_desc['card_name_info'] ? m_desc['card_name_info'] : '';
              card_love_info = m_desc['card_love_info'] ? m_desc['card_love_info'] : '';
              card_cele_info = m_desc['card_cele_info'] ? m_desc['card_cele_info'] : '';
              card_template = m_desc['card_template'] ? m_desc['card_template'] : '';
              card_type = m_desc['card_register_info'] ? 1 : 0;
              card_type = m_desc['card_template'] ? m_desc['card_template'][0]['type'] : card_type;
              card_register_ownerwechat = card_register_info['card_register_ownerwechat'] ? card_register_info['card_register_ownerwechat'] : '';
              card_register_ownername = card_register_info['card_register_ownername'] ? card_register_info['card_register_ownername'] : '';

              if (voice_url) {
                wx.downloadFile({
                  url: voice_url,
                  //音频文件url                  
                  success: res => {
                    if (res.statusCode === 200) {
                      console.log('录音文件下载完成', res.tempFilePath);
                      that.setData({
                        order_voice: res.tempFilePath,
                        voice_url: voice_url
                      });
                    }
                  }
                });
              }
            }

            that.setData({
              inter_order: orderObjects,
              owner_headimg: owner_headimg,
              owner_nickname: owner_nickname,
              receive_status: receive_status,
              order_m_id: order_m_id,
              card_register_info: card_register_info,
              card_name_info: card_name_info,
              card_love_info: card_love_info,
              card_cele_info: card_cele_info,
              card_template: card_template,
              card_type: card_type
            });
            console.log('order list inter order  card_type:', that.card_type, ' card_cele_info:', that.card_cele_info);
          }
        }
      });
    },
    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }

          data = data[key2];
        });
      });
    }
  }
};
</script>
<style>
@import "./list.css";
</style>