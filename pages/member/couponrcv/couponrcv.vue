<template>
<view>
<view class="subject" style>
  <!-- margin-top:{{navgationHeight+startBarHeight}}px -->
  <text class="toptitle" v-if="receive_status==0">恭喜，您收到{{coupons_type==1?'一张优惠券':'一个红包'}}</text>
  <text class="toptitle" v-if="receive_status==1" style="color:#999;">{{coupons_type==1?'优惠券已领取':'红包已领取'}}</text>
  <text v-if="receive_status==0">点击领取，获得{{coupons_type==1?'优惠券':'红包'}}</text>
  <!-- <text wx:if='{{receive_status==1}}'>点击回赠，也给Ta送一个礼物吧</text> -->
</view>
 
<view class="order-item">
  <view class="order-item-banner">
    <view class="gifts-item" :style="'background-image:url(' + $1 + ');background-size: 100% 100%;'">
      <text v-if="coupons_info[0].type==1" class="coupon-name">{{coupons_info[0].name}}</text>
      <text class="coupon-content">{{coupons_info[0].content}}</text>
      <text v-if="coupons_type==2" class="coupon-content">￥{{coupons_info[0].amount}}元</text>
      <text v-if="coupons_type==3" class="coupon-content">积分:{{coupons_info[0].amount}}</text>
      <text class="coupon-footer">{{coupons_info[0].footer}}</text>
      <text class="coupon-dueday">{{coupons_info[0].start_time?'(有效期:'+coupons_info[0].start_time+'至':''}}{{coupons_info[0].end_time?coupons_info[0].end_time+')':''}}</text>
    </view>
    <view class="sentbtn">
      <button class="button" :data-coupons="coupons" @tap="receiveTapTag" :hidden="(receive_status==1 || overtime_status==1?true:flase)">领取</button>
      <button class="button" @tap="query_pubcoupon" :hidden="(overtime_status==0?true:false)">请刷新重试</button>
      <view style="width:100%; display: flex;flex-direction: column;text-align:center;" v-if="receive_status==0">
        <view @tap="returnTapTag" style="margin-top:40rpx;">
          <text style="color:#E34C55;font-size:28rpx;">暂不领取，看看其他内容</text>
        </view>
      </view>   
    </view>
  </view>
</view>
</view>
</template>

<script>
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var util = require("../../../utils/util.js");
var now = new Date().getTime();

export default {
  data() {
    return {
      title_name: '收到优惠券',
      title_logo: '../../../images/footer-icon-05.png',
      coupon_img: weburl + '/uploads/coupon_bg.png',
      coupon_footer: '',
      //
      coupon_content: '',
      //
      shop_type: shop_type,
      orders: [],
      orderskus: [],
      openid: null,
      userInfo: {},
      page: 1,
      pagesize: 10,
      status: 0,
      all_rows: 0,
      giftflag: 0,
      scrollTop: 0,
      scrollHeight: 0,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 2000,
      note_title: 'Hi~:',
      note: '',
      headimg: '',
      nickname: '',
      receive_status: 0,
      overtime_status: 0,
      receive: 0,
      order_no: '',
      currenttime: now ? parseInt(now / 1000) : 0,
      startBarHeight: "",
      navgationHeight: "",
      coupons_info: "",
      coupons_id: "",
      coupons_flag: "",
      coupons_type: "",
      msg_id: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // 订单状态，已下单为1，已付为2，已发货为3，已收货为4 5已经评价 6退款 7部分退款 8用户取消订单 9作废订单 10退款中
    console.log('收到的优惠券:', options);
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : ''; //var options = util.formatString(options)
    //var coupons = options.coupons ? options.coupons:''
    //coupons = util.formatString(coupons)

    var receive = options.receive; //var coupons_info = coupons?JSON.parse(coupons):[{}]

    var coupons_id = options.coupons_id ? options.coupons_id : 0;
    var msg_id = options.msg_id ? options.msg_id : 0;
    var coupons_flag = options.coupons_flag ? options.coupons_flag : '999999999999';
    var coupons_type = options.coupons_type ? options.coupons_type : '1';
    var headimg = that.headimg;
    var nickname = that.nickname;

    if (!username) {
      /*
      wx.navigateTo({
        url: '../login/login'
      })
      */
      wx.switchTab({
        url: '/pages/hall/hall'
      });
    }

    that.setData({
      coupons_id: coupons_id,
      coupons_flag: coupons_flag,
      receive: receive,
      coupons_type: coupons_type,
      msg_id: msg_id
    });
    that.query_pubcoupon();
  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '/static/images/back.png'
      });
    }
  },
  onShareAppMessage: function (options) {
    var that = this;
    var res;
    var order_no = that.order_no;
    var username = that.username;
    var token = that.token;
    console.log('开始分享优惠券');
    console.log(options);
    var shareObj = {
      title: "优惠券",
      // 默认是小程序的名称(可以写slogan等)
      path: '/pages/hall/hall',
      // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: '',
      //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        console.log(res);

        if (res.errMsg == 'shareAppMessage:ok') {// 转发成功之后的回调       
        }
      },
      fail: function () {
        console.log(res);

        if (res.errMsg == 'shareAppMessage:fail cancel') {// 转发失败之后的回调
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {// 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function () {// 转发结束之后的回调（转发成不成功都会执行）
      }
    };

    if (options.from === 'button') {} // 来自页面内转发按钮
    // shareBtn
    // 此处可以修改 shareObj 中的内容
    // var orderno = order_no.split(','); //有可能一份礼物包括多个订单号 按店铺拆单的情况
    // shareObj.path = '/pages/order/send/send?order_no=' +'&receive=';
    // 返回shareObj


    return shareObj;
  },
  methods: {
    setNavigation: function () {
      let startBarHeight = 20;
      let navgationHeight = 44;
      let that = this;
      wx.getSystemInfo({
        success: function (res) {
          console.log(res.model);

          if (res.model == 'iPhone X') {
            startBarHeight = 44;
          }

          that.setData({
            startBarHeight: startBarHeight,
            navgationHeight: navgationHeight
          });
        }
      });
    },
    goBack: function () {
      var pages = getCurrentPages();

      if (pages.length > 1) {
        wx.navigateBack({
          changed: true
        }); //返回上一页
      } else {
        wx.switchTab({
          url: '../../hall/hall'
        });
      }
    },
    returnTapTag: function (e) {
      wx.switchTab({
        url: '../../hall/hall'
      });
    },
    receiveTapTag: function (e) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var order_no = that.orderNo;
      var openid = that.openid;
      var nickname = that.userInfo.nickName;
      var headimg = that.userInfo.avatarUrl;
      wx.showModal({
        title: '请确认',
        content: '确认接受吗?',
        success: function (res) {
          if (res.confirm) {
            that.band_coupon();
          }
        }
      });
    },
    scroll: function (event) {
      //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
      this.setData({
        scrollTop: event.detail.scrollTop
      });
    },
    topLoad: function (event) {
      //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
      //page = 1;
      this.setData({
        //list: [],
        scrollTop: 0
      }); //loadMore(this);

      console.log("lower");
    },
    band_coupon: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var coupons_info = that.coupons_info;
      var coupons_json = JSON.stringify(coupons_info);
      var receive = that.receive;
      var msg_id = that.msg_id;
      console.log('接收优惠券 coupons_info:', coupons_info);
      wx.request({
        url: weburl + '/api/client/band_coupon',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          coupons: coupons_json,
          coupon_type: 'receive',
          msg_id: msg_id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('接收优惠券返回:', res.data.result);
          var coupons_update = res.data.result;

          if (!res.data.result) {
            wx.showToast({
              title: res.data.info ? res.data.info : '已被领取',
              icon: 'none',
              duration: 1500
            });
            setTimeout(function () {
              //wx.navigateBack()
              wx.switchTab({
                url: '../../hall/hall'
              });
            }, 1500);
          } else {
            wx.showToast({
              title: '领取成功',
              icon: 'success',
              duration: 1500
            });
            setTimeout(function () {
              //wx.navigateBack()
              wx.switchTab({
                url: '../../hall/hall'
              });
            }, 1500);
          }
        }
      });
    },
    overtimeData: function () {
      var that = this;
      var coupons_info = that.coupons_info;
      console.log('超时处理 coupons_info:', coupons_info);

      if (!coupons_info) {
        that.setData({
          overtime_status: 1 //超时标志

        });
      }
    },
    query_pubcoupon: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var shop_type = that.shop_type;
      var coupons_id = that.coupons_id;
      var coupons_flag = that.coupons_flag;
      var coupons_type = that.coupons_type;
      setTimeout(function () {
        //3秒超时
        that.overtimeData();
      }, 3000);
      wx.request({
        url: weburl + '/api/client/query_pubcoupon',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          coupons_flag: coupons_flag,
          coupons_id: coupons_id,
          shop_type: shop_type,
          coupons_type: coupons_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var coupons_info = res.data.result;
          console.log('query_pubcoupon:', res.data);

          if (res.data.status == 'n') {
            wx.showToast({
              title: res.data.info ? res.data.info : '已过期',
              icon: 'none',
              duration: 2000
            });
          } else {
            for (var i = 0; i < coupons_info.length; i++) {
              coupons_info[i]['start_time'] = util.getDateStr(coupons_info[i]['start_time'] * 1000, 0);
              coupons_info[i]['end_time'] = util.getDateStr(coupons_info[i]['end_time'] * 1000, 0);
            }

            that.setData({
              coupons_info: coupons_info
            });
            console.log('查询优惠券发行信息 query_pubcoupon coupons_info:', coupons_info, 'coupons_info.length:', coupons_info.length);
          }
        }
      });
    },
    showGoods: function (e) {
      var skuId = e.currentTarget.dataset.skuId;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_id = e.currentTarget.dataset.goodsId;
      var goods_name = e.currentTarget.dataset.goodsName;
      console.log('showGoods');
      console.log(goods_name + ' ' + goods_id);
      wx.navigateTo({
        url: '../../details/details?sku_id=' + skuId + '&goods_name=' + goods_name + '&id=' + goods_id + '&token=' + token + '&username=' + username
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
@import "./couponrcv.css";
</style>