<template>
<view>
<view class="banner" @tap="bannerTapTag" :data-bannerlink="banner_link">
  <image :src="main_title_Bg" background-size="cover" mode="widthFix"></image>
</view>
<view class="wrap" style>
    <view v-for="(act_goods_list, index) in activityList.goods_list" :key="index">
      <view class="recomment-title" @tap="bannerTapTag" :data-bannerlink="act_goods_list.banner_link">
        <image :src="act_goods_list.banner_url" mode="widthFix"></image>
      </view>
      <view v-for="(item, index2) in act_goods_list.list" :key="index2" class="venues-item" @tap="showGoods" :data-object-id="item.id" :data-goods-id="item.id" :data-image="(item.activity_image?item.activity_image:item.image)" :hidden="(item.hidden==1?true:false)">
        <image class="mainpic" :src="(item.activity_image?item.activity_image:item.image)"></image>
        <image class="img-discount" :src="(item.discount<100?img_discount:'')"></image>
        <text class="goods_name">{{item.name}}</text>
        <view class="goods_prom">{{item.act_info?item.act_info:'高端大气'}}</view>
        <view class="price-now">￥{{item.sell_price}}</view>
      </view>
    </view>
</view>
<view class="footer" style @tap="bannerTapTag" :data-bannerlink="footer_link">
  <image :src="main_footer_Bg" mode="widthFix"></image>
</view>
<view class="sentbtn" :hidden="buttonhidden">
  <button @tap="qrcodeTapTag">分享给朋友</button>
  <button @tap="goBack">返回</button>
</view>
</view>
</template>

<script>
var util = require("../../utils/util.js"); //获取应用实例
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var appid = getApp().globalData.appid;
var secret = getApp().globalData.secret;
var page = 1;
var pagesize = 10;
var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
var navList2 = [{
  id: "activity_banner",
  title: "感恩节活动",
  value: "",
  img: "/uploads/activity_info/activity_banner.gif"
}, {
  id: "activity_footer",
  title: "活动说明",
  value: "",
  img: "/uploads/activity_info/activity_footer.png"
}, {
  id: "activity_sub1_banner",
  title: "活动商品列表1",
  value: "",
  img: "/uploads/activity_info/activity_1_banner.gif"
}, {
  id: "activity_sub2_banner",
  title: "活动商品列表2",
  value: "",
  img: "/uploads/activity_info/activity_2_banner.gif"
}, {
  id: "activity_sub3_banner",
  title: "活动商品列表3",
  value: "",
  img: "/uploads/activity_info/activity_3_banner.gif"
}, {
  id: "activity_sub4_banner",
  title: "活动商品列表4",
  value: "",
  img: "/uploads/activity_info/activity_4_banner.gif"
}, {
  id: "activity_sub5_banner",
  title: "活动商品列表5",
  value: "",
  img: "/uploads/activity_info/activity_5_banner.gif"
}, {
  id: "activity_sub6_banner",
  title: "活动商品列表6",
  value: "",
  img: "/uploads/activity_info/activity_6_banner.gif"
}, {
  id: "activity_sub7_banner",
  title: "活动商品列表7",
  value: "",
  img: "/uploads/activity_info/activity_7_banner.gif"
}, {
  id: "activity_sub8_banner",
  title: "活动商品列表8",
  value: "",
  img: "/uploads/activity_info/activity_8_banner.gif"
}];

export default {
  data() {
    return {
      title_name: '送心活动',
      title_logo: '/images/footer-icon-05.png',
      img_discount: '/images/discount.png',
      hidden: true,
      scrollTop: 0,
      scrollHeight: 0,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      main_title_Bg: null,
      banner_link: null,
      gifts_rcv: 0,
      gifts_snd: 0,
      note: '',
      username: null,
      token: null,
      carts: [],
      recommentList: [],
      activityList: [],
      minusStatuses: [],
      selectedAllStatus: true,
      total: '',
      startX: 0,
      itemLefts: [],
      showmorehidden: true,
      rshowmorehidden: true,
      all_rows: 0,
      rall_rows: 0,
      windowWidth: 0,
      windowHeight: 0,
      cartIds: null,
      amount: 0,
      nickname: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      shop_type: shop_type,
      navList2: navList2,
      buttonhidden: true,
      qr_type: "",
      share_activity_qrcode_cache: "",
      loadingHidden: false,
      act_id: "",
      act_title: "",
      main_footer_Bg: "",
      footer_link: "",
      page_type: "",
      order_no: "",
      coupons: "",
      receive: "",
      page: "",
      userInfo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var page_type = options.page_type ? options.page_type : '';
    var order_no = options.order_no ? options.order_no : '';
    var act_id = options.act_id ? options.act_id : '';
    var coupons = options.coupons ? options.coupons : '';
    var receive = options.receive ? options.receive : '';
    that.setData({
      act_id: act_id,
      page_type: page_type,
      order_no: order_no,
      coupons: coupons,
      receive: receive
    }); //that.setNavigation()

    console.log('activity page_type:', page_type, ' order_no:', order_no, ' receive:', receive, ' act_id:', act_id);

    if (page_type == 2) {
      //收到礼物
      if (receive == 1) {
        wx.navigateTo({
          url: '../order/receive/receive?order_no=' + order_no + '&receive=1'
        });
      }
    }

    that.get_activity_info();
  },
  onShow: function () {
    var that = this;
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
    var username = wx.getStorageSync('username');
    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '../../images/back.png'
      });
    }

    /*
	if (!username) {
	  wx.switchTab({
	    url: '../my/index'
	  });
	}
     wx.getSystemInfo({
       success: function (res) {
         let winHeight = res.windowHeight;
         that.setData({
           windowWidth: res.windowWidth,
           windowHeight: res.windowHeight,
           dkheight: winHeight - 60,
           scrollTop: that.data.scrollTop + 10
         })
       }
     }) 
    */

    this.setData({
      username: username
    });
    this.reloadData(username, token);
  },
  onShareAppMessage: function () {
    return {
      title: '送心礼物',
      desc: '开启礼物电商时代，200万人都在用的礼物小程序！',
      path: '/pages/hall/hall?refername=' + username
    };
  },
  methods: {
    /*
    setNavigation:function() {
      let startBarHeight = 20
      let navgationHeight = 44
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          console.log(res.model)
          if (res.model == 'iPhone X') {
            startBarHeight = 44
          }
          that.setData({
            startBarHeight: startBarHeight,
            navgationHeight: navgationHeight
          })
        }
      })
    },
    */
    goBack: function () {
      var pages = getCurrentPages();

      if (pages.length > 1) {
        wx.navigateBack({
          changed: true
        }); //返回上一页
      } else {
        wx.switchTab({
          url: '../hall/hall'
        });
      }
    },
    image_save: function (image_url, image_cache_name) {
      var that = this;
      console.log('activity imge save image url:', image_url, 'image_cache_name:', image_cache_name);
      wx.downloadFile({
        url: image_url,
        success: function (res) {
          if (res.statusCode === 200) {
            var img_tempFilePath = res.tempFilePath; // console.log('图片下载成功' + res.tempFilePath)
          } else {
            console.log('activity image_save 响应失败', res.statusCode);
          }
        }
      });
    },
    bannerTapTag: function (e) {
      var that = this;
      var banner_link = e.currentTarget.dataset.bannerlink;
      var nav_path = banner_link.split("/");
      console.log('bannerTapTag:', nav_path);

      if (nav_path[2] == 'hall' || nav_path[2] == 'wish' || nav_path[2] == 'index' || nav_path[2] == 'my') {
        var pagelist = getCurrentPages();
        var len = pagelist.length;
        var init = 0;
        var index = 0;

        for (var i = 0; i < len; i++) {
          if (pagelist[i].route.indexOf("hall/hall") >= 0) {
            //看路由里面是否有首页
            init = 1;
            index = i;
          }
        }

        if (init == 1) {
          wx.navigateBack({
            delta: len - i - 1
          });
        } else {
          /*
          wx.reLaunch({
            url: "/pages/hall/hall"//这个是默认的单页
          })
          */
          wx.switchTab({
            url: '/pages/hall/hall'
          });
        }
      } else {
        wx.navigateTo({
          url: banner_link + '&username=' + username + '&token=' + token
        });
      }
    },
    qrcodeTapTag: function (e) {
      var that = this;
      var qr_type = 'activityshare'; //

      var act_id = that.act_id;
      var act_title = that.act_title ? that.act_title : '送心活动';
      var page_type = '4'; //

      var share_activity_qrcode_cache = wx.getStorageSync('activity_qrcode_cache_' + act_id);
      that.setData({
        qr_type: qr_type,
        share_activity_qrcode_cache: share_activity_qrcode_cache
      }); //that.eventDraw()

      wx.navigateTo({
        url: '../member/share/share?qr_type=' + qr_type + '&act_id=' + act_id + '&act_title=' + act_title + '&share_activity_qrcode_cache=' + share_activity_qrcode_cache
      });
    },
    showGoods: function (e) {
      // 点击购物车某件商品跳转到商品详情
      var objectId = e.currentTarget.dataset.objectId;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_id = e.currentTarget.dataset.goodsId;
      var goods_name = e.currentTarget.dataset.goodsName;
      var goods_price = e.currentTarget.dataset.goodsPrice;
      var goods_info = e.currentTarget.dataset.goodsInfo;
      var goods_sale = e.currentTarget.dataset.sale;
      var image = e.currentTarget.dataset.image; //var carts = this.data.carts;

      var sku_id = objectId;
	  var show_goods_options = {
	  		  sku_id:objectId,
	  		  id:goods_id,
	  		  //goods_shape:goods_shape,
	  		 // goods_org:goods_org,
	  		  goods_info:goods_info,
	  		  goods_price:goods_price,
	  		  sale:goods_sale,
	  		  name:goods_name,
	  		  image:image,
	  		  token:token,
	  		  username:username
	  } ;
	  uni.setStorageSync('show_goods_options', show_goods_options);
      wx.navigateTo({
        url: '../details/details?sku_id=' + objectId + '&id=' + goods_id + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&image=' + image + '&token=' + token + '&username=' + username
      });
    },
    touchStart: function (e) {
      var startX = e.touches[0].clientX;
      this.setData({
        startX: startX,
        itemLefts: []
      });
    },
    touchMove: function (e) {
      var index = e.currentTarget.dataset.index;
      var movedX = e.touches[0].clientX;
      var distance = this.startX - movedX;
      var itemLefts = this.itemLefts;
      itemLefts[index] = -distance;
      this.setData({
        itemLefts: itemLefts
      });
    },
    touchEnd: function (e) {
      var index = e.currentTarget.dataset.index;
      var endX = e.changedTouches[0].clientX;
      var distance = this.startX - endX; // button width is 60

      var buttonWidth = 60;

      if (distance <= 0) {
        distance = 0;
      } else {
        if (distance >= buttonWidth) {
          distance = buttonWidth;
        } else if (distance >= buttonWidth / 2) {
          distance = buttonWidth;
        } else {
          distance = 0;
        }
      }

      var itemLefts = this.itemLefts;
      itemLefts[index] = -distance;
      this.setData({
        itemLefts: itemLefts
      });
    },
    reloadData: function (username, token) {
      // auto login
      var that = this;
      var minusStatuses = [];
      var page = that.page;
      var pagesize = that.pagesize;
      var shop_type = that.shop_type;
      var gifts_rcv = that.gifts_rcv;
      var gifts_send = that.gifts_send;
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      console.log("openid:" + openid + ' username:' + username); // 加载的使用进行网络访问，把需要的数据设置到data数据对象

      /*
      
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })
      */
    },
    onGotUserInfo: function (e) {
      console.log(e.detail.errMsg);
      console.log(e.detail.userInfo);
      console.log(e.detail.rawData);
    },
    get_activity_info: function () {
      var that = this;
      var activityList = that.activityList;
      var shop_type = that.shop_type;
      var act_id = that.act_id;
      var qr_type = 'activityshare';
      that.setData({
        loadingHidden: false
      }); //活动列表

      wx.request({
        url: weburl + '/api/client/get_activity_info',
        method: 'POST',
        data: {
          type: 1,
          //暂定
          shop_type: shop_type,
          act_id: act_id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var activityList_new = res.data.result;

          if (!activityList_new) {
            /*
             wx.showToast({
               title: '没有菜单项2',
               icon: 'loading',
               duration: 1500
             });
             */
            return;
          }

          that.setData({
            activityList: activityList_new,
            act_id: activityList_new['act_id'],
            act_title: activityList_new['act_title'],
            main_title_Bg: activityList_new['activity_banner_url'],
            //活动页banner图
            banner_link: activityList_new['activity_banner_link'],
            //活动页banner图跳转链接
            main_footer_Bg: activityList_new['activity_footer_url'],
            //活动页banner图
            footer_link: activityList_new['activity_footer_link'],
            //活动页banner图跳转链接
            buttonhidden: false
          });
          that.setData({
            loadingHidden: true
          });
          console.log('get_activity_info:', activityList_new, 'banner_link', that.banner_link);
          var share_activity_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&act_id=' + activityList_new['act_id'];
          that.image_save(share_activity_qrcode, 'activity_qrcode_cache_' + act_id);
        }
      });
    },
    //事件处理函数
    //页面滑动到底部
    bindDownLoad: function () {
      var that = this;
      that.setData({
        page: page++
      }); // this.loadgoods(reid,this.data.navLeftItems[this.data.curIndex]['id']);

      console.log("lower");
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
@import "./activity.css";
</style>