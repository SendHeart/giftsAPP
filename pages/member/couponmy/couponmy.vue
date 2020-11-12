<template>
<view>
	<!--
	<scroll-view scroll-x class="bg-black nav text-center">
 	<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in navList_order" :key="index" @tap="onOrderTapTag" :data-id="index" :data-tab="item.id">
 		{{item.title}}
 	</view>
	</scroll-view>
	-->
	<view class="top-bar2">
	  <block v-for="(item, index) in navList_order" :key="index">
	    <view :id="'v_' + index" :data-id="index" :data-title="item.title" :data-tab="item.id" :class="'top-bar-item2 ' + (index == TabCur ? 'top-bar-active2' : '')" @click.stop="onOrderTapTag">
	      <view>{{item.title}}</view>
	    </view>
	  </block>
	</view>
	<view class="order-item-banner">
    <view v-for="(item, index) in coupons_list" :key="index" class="coupons" :style="'background-image:url(' + $1 + ');'" @tap="couponTapTag">
    <!-- 
      <view bindtap="couponTapTag">
        <image class="coupon-image" background-size="cover" src="{{item.image}}" mode="aspectFit"> </image>
      </view>
      -->
      <text class="coupon-name">{{item.name}}{{giftflag==0?'[未使用]':''}}{{giftflag==1?'[已使用]':''}}{{giftflag==2?'[已过期]':''}}</text>
      <text class="coupon-content">{{item.content}}</text>
      <text class="coupon-content">{{item.amount>0?'￥'+item.amount:''}}</text>
      <text class="coupon-footer">{{item.footer}}</text>
      <text class="coupon-dueday">{{item.start_time?'(有效期:'+item.start_time+'至':''}}{{item.end_time?item.end_time+')':''}}</text>
    </view>
     <button v-if="page_num>1" type="default" size="default" hover-class="none" class="morebtn" @tap="getMoreOrdersTapTag">更多({{page}}/{{page_num}})</button>
	</view>
</view>
</template>

<script>
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var util = require("utils/util.js");
var now = new Date().getTime();
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
var navList2 = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : [];
var navList_order = [{
  id: "avaliable",
  title: "未使用"
}, {
  id: "used",
  title: "已使用"
}, {
  id: "overdue",
  title: "已过期"
}];

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
      navList_order: navList_order,
      tab2: 'avaliable',
      activeIndex2: 0,
	  TabCur: 0,
	  scrollLeft: 0,
      orders: [],
      orderskus: [],
      openid: null,
      userInfo: {},
      page: 1,
      pagesize: 10,
      status: 0,
      all_rows: 0,
      page_num: 0,
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
      receive: 0,
      order_no: '',
      currenttime: now ? parseInt(now / 1000) : 0,
      startBarHeight: "",
      navgationHeight: "",
      coupons_list: [],
      navList2: "",
      loadingHidden: false,
      coupons_type: 0
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
    var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
    var red = options.red ? options.red : 0;
    console.log('查询我的优惠券 username:',username);
	if (!username) {
       uni.navigateTo({
        url: '/pages/login/login?frompage=/pages/member/couponmy/couponmy'
      })
      
    }else{
		if (red > 0) {
		  uni.setNavigationBarTitle({
		    title: '送心红包'
		  });
		  that.setData({
		    coupons_type: 2
		  });
		}
		
		that.query_coupon();
	}
    
    /*
    that.setNavigation()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        })
      }
    })  
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    */
  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '../../../images/back.png'
      });
    }
  },
  onShareAppMessage: function (options) {
    var that = this;
    var res;
    var order_no = that.order_no;
    var username = that.username;
    var token = that.token;
    var coupons_type = that.coupons_type;
    console.log('开始分享优惠券');
    console.log(options);
    var shareObj = {
      title: coupons_type == 1 ? "送心优惠券" : '送心红包',
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
    tabSelect(e) {
    	this.TabCur = e.currentTarget.dataset.id;
    	this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
    goBack: function () {
      var pages = getCurrentPages();
      if (pages.length > 1) {
        uni.navigateBack({
          changed: true
        }); //返回上一页
      } else {
        uni.switchTab({
          url: '../../hall/hall'
        });
      }
    },
    onOrderTapTag: function (e) {
	  this.TabCur = e.currentTarget.dataset.id;
	  this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
	  var tab = e.currentTarget.dataset.tab;
      var that = this;
      var tab = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var giftflag = that.giftflag;
      var coupons_list = that.coupons_list;

      if (tab == 'avaliable') {
        giftflag = 0;
      } else if (tab == 'used') {
        giftflag = 1;
      } else if (tab == 'overdue') {
        giftflag = 2;
      }

      that.setData({
        activeIndex2: index,
        tab2: tab,
        page: 1,
        page_num: 1,
        giftflag: giftflag,
        coupons_list: []
      });
      console.log('tab:' + tab, ' giftflag:', giftflag);
      that.query_coupon();
    },
    returnTapTag: function (e) {
      uni.switchTab({
        url: '../../hall/hall'
      })
    },
    couponTapTag: function (e) {
		/*
      uni.navigateTo({
        url: '../../list/list'
      })
	  */
	  uni.switchTab({
	    url: '../../hall/hall'
	  });
    },
	
	scroll: function (event) {
      //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
	  that.scrollTop =  event.detail.scrollTop
    },
    topLoad: function (event) {
      //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
      //page = 1;
	  this.scrollTop = 0 
      console.log("lower");
    },
	
	getMoreOrdersTapTag: function (e) {
		var that = this;
		var page = that.page + 1;
		var pagesize = that.pagesize;
		var all_rows = that.all_rows;

		if (page > that.page_num) {
			wx.showToast({
				title: '没有更多记录了',
				icon: 'none',
				duration: 1000
			})
			return
		}
		that.page = page
		that.query_coupon();
	},
	
    get_project_gift_para: function () {
		var that = this;
		var navList_new = that.navList2;
		var shop_type = that.shop_type;
		var page = that.page;
		var pagesize = that.pagesize;
		console.log('couponmy get_project_gift_para navList2:', navList2);

		if (!navList_new) {
        //项目列表
			uni.request({
				url: weburl + '/api/client/get_project_gift_para',
				method: 'POST',
				data: {
					type: 2,
					//暂定
					shop_type: shop_type
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
            '		Accept': 'application/json'
				},
				success: function (res) {
					console.log('get_project_gift_para:', res.data.result);
					navList_new = res.data.result;

					if (!navList_new) {
						return
					}
				}
			})
		}
		that.navList2 = navList_new      
		setTimeout(function () {
			that.loadingHidden = true
		},1500);
    },
	
	query_coupon: function () {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
		var coupons_status = that.tab2;
		var page = that.page;
		var pagesize = that.pagesize;
		var all_rows = that.all_rows;
		var page_num = that.page_num;
		var shop_type = that.shop_type;
		var coupons_type = that.coupons_type ? that.coupons_type : 1;
		uni.request({
			url: weburl + '/api/client/query_coupon',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				page: page,
				pagesize: pagesize,
				shop_type: shop_type,
				coupons_status: coupons_status,
				quan_type: coupons_type //1优惠券 2红包 3积分券
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				console.log('查询优惠券:', res.data.result)
				var coupons_list = res.data.result?res.data.result:''
				if (coupons_list=='') {					
					uni.showToast({
						title: res.data.info ? res.data.info : coupons_type == 1 ? '暂无优惠券' : '暂无红包',
						icon: 'none',
						duration: 1500
					});

					if (page == 1) {
						that.coupons_list = {},
						that.all_rows = 0
						that.page_num = 0					
					}
					return
				} else {
					all_rows = res.data.all_rows
					for (var i = 0; i < coupons_list.length; i++) {
						coupons_list[i]['start_time'] = util.getDateStr(coupons_list[i]['start_time'] * 1000, 0);
						coupons_list[i]['end_time'] = util.getDateStr(coupons_list[i]['end_time'] * 1000, 0);
					}

					if (page > 1 && coupons_list) {
					//向后合拼
						coupons_list = that.coupons_list.concat(coupons_list);
					}

					page_num = all_rows / pagesize + 0.5;
					that.coupons_list = coupons_list,
					that.page_num = page_num.toFixed(0)					
				}
			}
		})
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
@import "./couponmy.css";
</style>