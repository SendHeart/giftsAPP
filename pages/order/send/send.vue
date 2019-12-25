<template>
<view>
<!--
<template is="hall_title" data="{{title_name,title_logo,navgationHeight,startBarHeight}}" />
 -->
<view v-if="is_buymyself==0 && goodsshape!=5" class="subject" style>
  <text class="toptitle">{{goodsshape==5?goodsname+'已完成':'礼物已为您打好包'}}</text>
  <text>选择微信好友发送给对方</text> 
  <!-- 
 <text style="font-size:12px;">点击发送，送给对方</text>
 <view>
 <image src="../../../images/u214.svg"></image>
 </view>
 -->
</view>
<view v-if="is_buymyself==0 &&  goodsshape!=5 &&  goodsshape!=4" class="order-item">
  <view class="order-item-banner">
    <view>
      <image src="../../../static/images/gift.gif" style="width:378rpx;height:202rpx;" mode="aspectFill"></image>
    </view>
    <view class="userinfo">
      <image class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickname}}</text>
    </view>
    <view class="order_note">
      <!--<text>{{note_title}}</text> -->
      <text space="ensp">{{note}}</text>
    </view>
    <view v-for="(item, index) in orderskus" :key="index" class="gifts-item">
      <view @tap="showGoods" :data-sku-id="item.sku_id" :data-goods-id="item.goods_id" :data-goods-name="item.goods_name">
        <image class="gifts-image" :src="item.sku_image" mode="aspectFill"> </image>
      </view>
      <text class="carts-title">{{item.goods_name}} x{{item.sku_num}}</text>
    </view>
  </view>
  <view class="sentbtn">
    <button open-type="share" @tap="shareToWXminiProgram" :hidden="(send_status==0?false:true)">选择微信好友</button>
    <view :hidden="(send_status==0?true:false)">
      <form @submit="returnForm" report-submit="true">
        <button style="width:300rpx;" formType="submit">完成</button> <!--  bindtap="returnTapTag"  -->
      </form>
    </view>  
  </view>
</view>
</view>
</template>

<script>
 
var util = require("utils/util.js");
var appid = getApp().globalData.appid;
var secret = getApp().globalData.secret;
var weburl = getApp().globalData.weburl;
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
var shop_type = getApp().globalData.shop_type;
var miniprogram_id = getApp().globalData.miniprogram_id;
var navList2_init = [{
  id: "gift_logo",
  title: "送礼logo",
  value: "",
  img: "/uploads/gift_logo.png"
}, {
  id: "wishlist_logo",
  title: "心愿单logo",
  value: "",
  img: "/uploads/wishlist.png"
}];
var navList2 = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [];
import canvasdrawer from "../../../common/canvasdrawer/canvasdrawer";

export default {
  data() {
    return {
      title_name: '礼物送出',
      title_logo: '/static/images/footer-icon-05.png',
      gift_logo: weburl + "/uploads/gift_logo1.png",
      //默认
      shop_type: shop_type,
	  miniprogram_id:miniprogram_id,
      orders: [],
      orderskus: [],
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
      headimg: userInfo.avatarUrl,
      nickname: userInfo.nickname,
      goods_flag: 1,
      send_status: 1,
      navList2: navList2,
      is_buymyself: 0 //1自购礼品
      ,
      formID: "",
      loadingHidden: false,
      order_no: "",
      order_id: "",
      goodsshape: "",
      goodsname: "",
      username: "",
      token: "",
      order_price: "",
      sku_image: "",
      sku_share_image: "",
      shareimage_url: "",
      windowWidth: "",
      windowHeight: ""
    };
  },

  components: {
    canvasdrawer
  },
  props: {},
  onLoad: function (options) {
    // 订单状态，已下单为1，已付为2，已发货为3，已收货为4 5已经评价 6退款 7部分退款 8用户取消订单 9作废订单 10退款中
	var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
    var order_no = options.order_no;
    var receive = options.receive;
    var is_buymyself = options.is_buymyself ? options.is_buymyself : 0;
    var shop_type = that.shop_type;
    var share_order_wx_headimg = options.share_order_wx_headimg ? options.share_order_wx_headimg : '';
    var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
	that.setData({
      order_no: order_no,
      is_buymyself: is_buymyself
    }); //that.setNavigation()

    console.log('order send 礼品信息 options:', options);
    that.get_project_gift_para();

    if (receive == 1) {
      console.log('礼品接受处理:', options);
      wx.navigateBack();
      return;
    }

    if (!order_no) {
      console.log('礼品订单号为空:', options);
      wx.showToast({
        title: '礼品订单号为空' + options,
        icon: 'none',
        duration: 1500
      });
      setTimeout(function () {
        wx.navigateBack();
      }, 1500);
      return;
    } //再次确认订单状态

    var orders = options.orders ? JSON.parse(options.orders) : that.orders;
    var orderskus = that.orderskus;
    var note_title = that.note_title;
    var headimg = userInfo.avatarUrl;
    var nickname = userInfo.nickname;
    var note = that.note;
    var goodsshape = orders[0]['shape'];
    var order_id = orders[0]['id'];
    note = orders[0]['rcv_note']; //headimg = orders[0]['from_headimg']
    //nickname = orders[0]['from_nickname']

    console.log('orders:',orders); // order_sku 合并在一个对象中

    for (var i = 0; i < orders.length; i++) {
      for (var j = 0; j < orders[i]['order_sku'].length; j++) {
        orders[i]['order_sku'][j]['goods_name'] = orders[i]['order_sku'][j]['goods_name'].substring(0, 15);
        orderskus.push(orders[i]['order_sku'][j]);

        if (orders[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
          orders[i]['order_sku'][j]['sku_image'] = weburl + '/' + orders[i]['order_sku'][j]['sku_image'];
        }

        if (goodsshape == 5) {
          if (orders[i]['order_sku'][j]['sku_share_image'].indexOf("http") < 0) {
            orders[i]['order_sku'][j]['sku_share_image'] = weburl + '/' + orders[i]['order_sku'][j]['sku_share_image'];
          }
        }
      }
    }

    console.log('order send onload() order sku list:', orderskus); //console.log(orderskus);

    that.setData({
      order_no: order_no,
      order_id: order_id,
      orders: orders,
      orderskus: orderskus,
      goodsshape: goodsshape,
      goodsname: orders[0]['order_sku'][0]['goods_name'],
      note: note ? note : '',
      note_title: note_title,
      headimg: headimg,
      nickname: nickname,
      username: username,
      token: token,
      send_status: 0,
      goods_flag: orders[0]['order_sku'][0]['goods_flag'] ? orders[0]['order_sku'][0]['goods_flag'] : 0,
      order_price: orders[0]['order_price'],
      sku_image: orders[0]['order_sku'][0]['sku_image'] ? orders[0]['order_sku'][0]['sku_image'] : '',
      sku_share_image: orders[0]['order_sku'][0]['sku_share_image'] ? orders[0]['order_sku'][0]['sku_share_image'] : ''
    });

    if (orders[0]['shape'] != 5 && orders[0]['shape'] != 4) {
      // 5贺卡请柬 4互动卡 
      //获取带价格的分享图片  
      var navList2 = that.navList2;
      var imageUrl = navList2.length > 0 ? navList2[0]['img'] : that.gift_logo;
      console.log('获取带价格的分享图片 ');
      wx.request({
        url: weburl + '/api/client/get_text_watermark',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          order_no: order_no,
          text: that.order_price,
          image: imageUrl,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var watermark_info = res.data.result;

          if (watermark_info) {
            that.setData({
              shareimage_url: watermark_info.image
            });
          }

          console.log('order send onload() image with watermark:', that.shareimage_url);
        }
      });
    }

    if (is_buymyself == 1 || goodsshape == 5 || goodsshape == 4) {
      //自购礼品 5贺卡请柬 4互动卡
      console.log('自购礼品无需分享到微信 ');
      that.returnTapTag();
    }

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();
	var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
    that.userInfo = userInfo ;
	if (pages.length > 1) {
      that.setData({
        title_logo: '../../../images/back.png'
      });
    }
  },
  onShareAppMessage: function (options) {
    var that = this;
    var shop_type = that.shop_type;
    var order_no = that.order_no;
    var username = that.username;
    var goods_flag = that.goods_flag;
    var token = that.token;
    var goodsshape = that.goodsshape;
    var sku_share_image = that.orderskus[0]['sku_share_image'];
    var goods_name = that.orderskus[0]['goods_name'];
    var navList2 = that.navList2;
    var title = goodsshape == 5 ? '您收到一份来自' + that.nickname + '的' + goods_name + ',点击立即打开。' : '您收到一份来自' + that.nickname + '的礼物,点击立即打开。';
    var shareimage_url = that.shareimage_url; //带价格水印的图片

    var imageUrl = navList2.length > 0 ? navList2[0]['img'] : that.gift_logo;
    imageUrl = shareimage_url ? shareimage_url : imageUrl;

    if (goodsshape == 5) {
      imageUrl = sku_share_image;
    }

    console.log('开始送礼 options:', options, 'order_no:', order_no, 'sku_share_image:', sku_share_image, ' shareimage_url:', shareimage_url, ' imageUrl:', imageUrl, ' navList2:', navList2); //console.log(options);  

    if (!order_no) {
      console.log('礼品单号为空 send');
      return;
    }

    that.setData({
      send_status: 1
    });
    var shareObj = {
      title: title,
      // 默认是小程序的名称(可以写slogan等)
      desc: "开启礼物电商时代，200万人都在用的礼物小程序！",
      //path: '/pages/hall/hall?page_type=2&order_no=' + order_no + '&receive=1' + '&random=' + Math.random().toString(36).substr(2, 15),   // 默认是当前页面，必须是以‘/’开头的完整路径
      path: '/pages/order/receive/receive?page_type=2&order_no=' + order_no + '&receive=1' + '&goods_shape=' + goodsshape + '&goods_flag=' + goods_flag,
      imageUrl: imageUrl,
      success: function (res) {
        console.log('更新发送状态:', res);

        if (res.errMsg == 'shareAppMessage:ok') {// 转发成功之后的回调
          //微信已经取消回调服务
        }
      },
      fail: function (res) {
        console.log('转发失败之后', res);

        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 转发失败之后的回调
          wx.showToast({
            title: '用户取消转发',
            icon: 'success',
            duration: 1500
          }); // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          wx.showToast({
            title: '礼物发送失败',
            icon: 'loading',
            duration: 1500
          }); // 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function (res) {
        // 转发结束之后的回调（转发成不成功都会执行）
        console.log('转发结束:', res);
        wx.showToast({
          title: '礼物发送完成',
          icon: 'loading',
          duration: 1500
        });
      }
    };

    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log('礼物分享:', shareObj); //console.log(shareObj)
    } // 返回shareObj


    return shareObj;
  },
  methods: {
	shareToWXminiProgram: function () { //分享到微信小程序
		var that = this;
		var shop_type = that.shop_type;
		var order_no = that.order_no;
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
		var miniprogram_id = that.miniprogram_id;
		var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		var nickname = userInfo.nickname?userInfo.nickname:'朋友'
		var goods_flag = that.goods_flag;
		var goodsshape = that.goodsshape;
		var sku_share_image = that.orderskus[0]['sku_share_image'];
		var goods_name = that.orderskus[0]['goods_name'];
		var navList2 = that.navList2;
		var title = goodsshape == 5 ? '您收到一份来自' + nickname + '的' + goods_name + ',点击立即打开。' : '您收到一份来自' + that.nickname + '的礼物,点击立即打开。';
		var shareimage_url = that.shareimage_url; //带价格水印的图片
		var imageUrl = navList2.length > 0 ? navList2[0]['img'] : that.gift_logo;
		imageUrl = shareimage_url ? shareimage_url : imageUrl;
		
		if (goodsshape == 5) {
		  imageUrl = sku_share_image;
		}
		
		console.log('开始送礼 order_no:', order_no, 'sku_share_image:', sku_share_image, ' shareimage_url:', shareimage_url, ' imageUrl:', imageUrl, ' navList2:', navList2); //console.log(options);  
		
		if (!order_no) {
		  console.log('礼品单号为空 send');
		  return;
		}
		
		that.setData({
		  send_status: 1
		});
		 if (uni.getSystemInfoSync().platform == "ios") {
			uni.share({
			  provider: 'weixin',
			  type: 5,
			  title: title,
			  scene: 'WXSceneSession',
			  imageUrl: 'https://sendheart.dreamer-inc.com/uploads/gift_share_logo.png', //shareimage_url, 规避uni-app bug
			  miniProgram: {
			          id: miniprogram_id,  // gh_aefe7ce896f6
			          path: '/pages/order/receive/receive?page_type=2&order_no=' + order_no + '&receive=1' + '&goods_shape=' + goodsshape + '&goods_flag=' + goods_flag,
			          type: 0,
			          webUrl: 'http://uniapp.dcloud.io'
			      },
			  success: (ret) => {
			    console.log(ret)
				/*
			   uni.showModal({
			       title: '分享成功',
			       content: 'res:'+ JSON.stringify(res)
			   })
			   */
			  },
			  fail: (err) => {
			    console.log(err)
					var errMsg = err.errMsg
					if(errMsg.share.fail=='客户端未安装'){
						uni.showModal({
						    title: '分享失败',
						    content: '微信客户端未安装'
						}) 
					}else{
						uni.showModal({
						    title: '分享失败',
						    content: errMsg.share.fail
						}) 
					}
			  }
			})
		}else{
			uni.share({
			  provider: 'weixin',
			  type: 5,
			  title: title,
			  scene: 'WXSceneSession',
			  imageUrl: shareimage_url,
			  miniProgram: {
			          id: miniprogram_id,  // gh_aefe7ce896f6
			          path: '/pages/order/receive/receive?page_type=2&order_no=' + order_no + '&receive=1' + '&goods_shape=' + goodsshape + '&goods_flag=' + goods_flag,
			          type: 0,
			          webUrl: 'http://uniapp.dcloud.io'
			      },
			  success: (ret) => {
			    console.log(ret)
				/*
			   uni.showModal({
			       title: '分享成功',
			       content: 'res:'+ JSON.stringify(res)
			   })
			   */
			  },
			  fail: (err) => {
			    console.log(err)
					var errMsg = err.errMsg
					if(errMsg.share.fail=='客户端未安装'){
						uni.showModal({
						    title: '分享失败',
						    content: '微信客户端未安装'
						}) 
					}else{
						uni.showModal({
						    title: '分享失败',
						    content: errMsg.share.fail
						}) 
					}
			  }
			})
		}
		
		 
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
    returnForm: function (e) {
      var that = this;
      var formID = e.detail.formId;
      that.setData({
        formID: formID
      });
      console.log('send returnTapTag() fromID:', formID); //微信消息通知

      that.remindMessage();
      that.returnTapTag();
    },
    returnTapTag: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_flag = that.goods_flag;
      var order_no = that.order_no;
      var order_id = that.order_id;
      var order_note = that.note;
      var is_buymyself = that.is_buymyself;
      var goodsshape = that.goodsshape; //5贺卡请柬

      var order_bg = that.sku_image;
      var order_share_image = that.sku_share_image;
      var wx_headimg_cache = wx.getStorageSync('wx_headimg_cache');
      var headimg = wx_headimg_cache ? wx_headimg_cache : that.headimg;
      wx.request({
        //更新发送状态
        url: weburl + '/api/client/update_order_status',
        method: 'POST',
        data: {
          username: username,
          shop_type,
          shop_type,
          access_token: token,
          status_info: 'send',
          order_no: order_no,
          goods_flag: goods_flag,
          is_buymyself: is_buymyself
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('礼物发送状态更新完成:', res.data, ' is_buymyself:', is_buymyself); //自购礼品 接收处理

          if (is_buymyself == 1 && goodsshape != 5 && goodsshape != 4) {
            //5贺卡请柬 4互动卡
            console.log('order send returnTapTag() 自购礼品 自动接收处理');
            wx.navigateTo({
              url: '/pages/order/receive/receive?order_no=' + order_no + '&receive=1' + '&is_buymyself=' + is_buymyself
            });
          } else if (is_buymyself == 1 && (goodsshape == 5 || goodsshape == 4)) {
            //wx.hideLoading()
            console.log('order send returnTapTag() 贺卡请柬 互动卡 转分享页面');
            wx.showToast({
              title: ' 加载中',
              icon: 'loading',
              duration: 1000
            });
            wx.navigateTo({
              url: '/pages/wish/wishshare/wishshare?share_order_id=' + order_id + '&share_order_shape=' + goodsshape + '&share_order_note=' + order_note + '&share_order_bg=' + order_bg + '&share_order_image=' + order_share_image
            });
            
          } else {
			getApp().globalData.has_sent = 1 ;  //发送完成标志
			setTimeout(function () {
				wx.switchTab({
				  url: '../../index/index'
				});
			}, 300);
       
          }
        }
      });
    },

    /**
    * 触发微信提醒
    */
    remindMessage: function () {
      var that = this;
      var formId = that.formID;
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
      var order_no = that.order_no;
      var shop_type = that.shop_type;
      var msg_type = 1; //礼物接收通知

      wx.request({
        url: weburl + '/api/WXPay/sendMessage2Openid',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        data: {
          m_id: m_id,
          openid: openid,
          from_username: username,
          access_token: token,
          formId: formId,
          order_no: order_no,
          appid: getApp().globalData.appid,
          appsecret: getApp().globalData.secret,
          shop_type: shop_type,
          msg_type: msg_type
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('send remindMessage() 微信通知礼物接收:', res.data);
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
    get_project_gift_para: function () {
      var that = this;
      var navList_new = navList2;
      var shop_type = that.shop_type;
      var page = that.page;
      var pagesize = that.pagesize;
      console.log('send get_project_gift_para navList2:', navList2, 'length:', navList2.length);

      if (navList2.length == 0) {
        //项目列表
        wx.request({
          url: weburl + '/api/client/get_project_gift_para',
          method: 'POST',
          data: {
            type: 2,
            //暂定
            shop_type: shop_type
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log('get_project_gift_para:', res.data.result);
            navList_new = res.data.result;

            if (!navList_new) {
              /*
               wx.showToast({
                 title: '没有菜单项2',
                 icon: 'loading',
                 duration: 1500
               });
               */
              return;
            } else {
              that.setData({
                navList2: navList_new
              });
              console.log('send get_project_gift_para navList_new:', navList_new);
            }
          }
        });
      }

      setTimeout(function () {
        that.setData({
          loadingHidden: true
        });
      }, 1500);
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
@import "./send.css";
</style>