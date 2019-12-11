<template>
<view>
	<uni-nav-bar :fixed="true" color="#fff" background-color="#1d1d1d"></uni-nav-bar>
	<view class="userinfo_my" :hidden="!shareflag" :style="'background-image: url(' + wish_banner + ');background-size:cover;'">
		<text class="userinfo-nickname" style="margin-top:20rpx;">我的心愿单</text>
		<view class="banner" :hidden="!shareflag">
			<form @submit="formSubmit" data-name="onShareAppMessage" report-submit="true" v-if="carts.length>0">
				<button @tap="shareToWXminiProgram" formType="submit" class="btnshare">
					<image class="shareto" src="../../static/images/shareto.png"></image>分享
				</button>
			</form>
			<form @submit="formSubmit" data-name="addWish" report-submit="true">
				<button formType="submit" class="btnadd"></button>
			</form>
		</view>
	</view>

	<view scroll-y="true" :style="'margin-bottom:50rpx;height:100%;'" >
	<view class="container">  
    <view class="venues_box">
		<block v-for="(item, index) in carts" :key="index">
			<view class="venues_item">
				<navigator :url="'/pages/details/details?id=' + item.goods_id + '&image=' + (item.activity_image?item.activity_image:item.image) + '&info=' + item.act_info + '&name=' + item.name + '&gov_price=' + item.gov_price + '&goods_price=' + item.sell_price + '&sale=' + item.sale" hover-class="none">
					<image class="mainpic" :src="(item.activity_image?item.activity_image:item.image)"></image>
				</navigator>
				<text class="goods_name">{{item.name}}</text>
				<view class="goods_sku">
					<view v-for="(sku_value, index2) in item['value']" :key="index2">
						<text>{{sku_value['type']==2?sku_value['note']+' ':sku_value['value']+' '}}</text>
        </view>
      </view>
			
      <view class="price-list">
        <view class="price-market">{{item.market_price>0?'￥'+item.market_price:''}}</view>
      	<view class="price-now">￥{{item.sell_price}}</view>
      </view>
      <view class="goods_bottom">
        <view>已收到:{{item.sale?item.sale:0}}件</view>
        <view :hidden="!shareflag">
        <image :data-index="index" :data-object-id="item.objectId" @tap="deleteTapTag" style="width:40rpx;height:40rpx;" src="../../static/images/icon_delete.png"></image>
        </view>
      </view>
      <view style="text-align:right;margin-top:-50rpx;margin-right:10rpx" :hidden="shareflag">
        <button :data-index="index" :data-object-id="item.objectId" type="warn" size="mini" hover-class="button-hover" class="button" @tap="sendGoodsTapTag" style="margin-top:10px;">送Ta</button>
      </view>
      </view>
      </block>
    </view>
	</view>
</view>
<!-- 
<button wx:if="{{!userInfo}}" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo" type="warn" class="logout">授权登录</button>
<button wx:if="{{!userInfo}}" bindtap="login" type="warn" class="logout">登录</button>
-->
</view>
</template>

<script>
 
var util = require("utils/util.js"); //获取应用实例
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var from_page = getApp().globalData.from_page;
var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
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
}, {
  id: "trans_gift_logo",
  title: "转送礼logo",
  value: "",
  img: "/uploads/gift_logo.png"
}, {
  id: "hall_banner",
  title: "首页banner",
  value: "",
  img: "/uploads/songxin_banner.png"
}, {
  id: "wish_banner",
  title: "心愿单banner",
  value: "",
  img: "/uploads/wish_banner.png"
}, {
  id: "wechat_gb",
  title: "背景",
  value: "",
  img: "/uploads/wechat_share.png"
}];
var navList2 = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [];

export default {
  data() {
    return {
      title_name: '心愿单',
      title_logo: '/static/images/footer-icon-05.png',
      this_page: '/pages/wish/wish',
	  miniprogram_id:miniprogram_id,
      all_rows: 0,
      venuesItems: [],
      search_goodsname: null,
      userInfo: userInfo,
	  dkheight:200,
      keyword: '',
      page: 1,
      pagesize: 20,
      page_num: 0,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      loadingHidden: true,
      // loading
      hidden: true,
      scrollTop: 0,
      scrollHeight: 0,
	  toView:0,
      showmorehidden: true,
      rshowmorehidden: true,
      shareflag: true,
      nickname: userInfo.nickname,
      avatarUrl: userInfo.avatarUrl,
      wish_id: '',
      wish_nickname: null,
      wish_headimg: null,
      navList2: navList2,
      painting: {},
      shareImage: '',
      showSharePic: true,
      shop_type: shop_type,
      wish_banner: '',
      navList2_init: navList2_init,
      carts: "",
      minusStatuses: ""
    };
  },

  components: {
	  uniIcons,
	  uniNavBar,
  },
  props: {},
  onLoad: function (options) {
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var wish_id = options.wish_id ? options.wish_id : '';
    var from_page = options.from_page;
	uni.getSystemInfo({
	  success: function (res) {
	    let winHeight = res.windowHeight; //console.log(winHeight);
	    that.setData({
	      dkheight: winHeight - winHeight * 0.05 - 20
	    });
	  }
	});
    getApp().globalData.wish_id = wish_id;
    that.setData({
      wish_id: wish_id
    }); //that.setNavigation()

    /*
    if (from_page){
      that.setData({
        from_page: from_page,
        title_logo: '../../../images/back.png'
      })
    }
    */

    console.log('onLoad', that.wish_id, ' from_page:', from_page);
    that.get_project_gift_para();
  },
  onShow: function () {
    //调用应用实例的方法获取全局数据
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var wish_id = getApp().globalData.wish_id;
    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '/static/images/back.png'
      });
    }

    that.setData({
      wish_id: wish_id
    });

    if (!username) {
      //登录

      /*
		wx.switchTab({
		  url: '/pages/my/index'
		});
        */
	   wx.navigateTo({
	     url: '/pages/login/login?frompage=/pages/wish/wish'
	   })
    
    } else {
      that.query_wish_cart();
    }

    console.log('onShow', getApp().globalData.wish_id);
  },
  onShareAppMessage: function (options) {
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
    var title = userInfo.nickname + '的心愿单,快打开看看吧~';
    var imageUrl = that.navList2[1]['img'];
    var shareObj = {
      title: title,
      // 默认是小程序的名称(可以写slogan等)
      desc: "我的心愿单",
      path: '/pages/wish/wish?wish_id=' + username,
      // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: imageUrl,
      //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        console.log(res);

        if (res.errMsg == 'shareAppMessage:ok') {// 转发成功之后的回调
          // that.shareTapTag()
        }
      },
      fail: function (res) {
        console.log(res);

        if (res.errMsg == 'shareAppMessage:fail cancel') {// 转发失败之后的回调
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {// 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function () {// 转发结束之后的回调（转发成不成功都会执行）
      }
    };

    if (options.from === 'button') {
      // 来自页面内转发按钮
      // shareBtn
      // 此处可以修改 shareObj 中的内容
      //var orderno = order_no.split(','); //有可能一份礼物包括多个订单号 按店铺拆单的情况
      console.log('心愿单分享:');
      console.log(shareObj);
    } // 返回shareObj


    return shareObj;
  },
  onPullDownRefresh: function () {
    //下拉刷新
    wx.stopPullDownRefresh();
  },
  methods: {
    formSubmit: function (e) {
      var that = this;
      var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name;
      console.log('formSubmit() formID：', formId, ' form name:', form_name);

      if (form_name == 'addWish') {
        that.addWishTapTag();
      } else if (form_name == 'goBack') {
        that.goBack();
      }

      if (formId) that.submintFromId(formId);
    },
    //提交formId，让服务器保存到数据库里
    submintFromId: function (formId) {
      var that = this;
      var formId = formId;
      var shop_type = that.shop_type;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      wx.request({
        url: weburl + '/api/client/save_member_formid',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          formId: formId,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('submintFromId() update success: ', res.data);
        }
      });
    },
	shareToWXminiProgram: function () { //分享到微信小程序
		var that = this ;
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
		var title = userInfo.nickname + '的心愿单,快打开看看吧~';
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var miniprogram_id = this.miniprogram_id ;
		var imageUrl = that.navList2[1]['img'];
		uni.share({
		  provider: 'weixin',
		  type: 5,
		  title: title,
		  imageUrl: imageUrl,
		  miniProgram: {
		          id: miniprogram_id,  // gh_aefe7ce896f6
		           path: '/pages/wish/wish?wish_id=' + username,
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
				uni.showModal({
				    title: '分享失败',
				    content: 'error:'+ JSON.stringify(err)
				}) 
		  }
		})
	},
    goBack: function () {
      var that = this;
      var from_page = that.from_page;
      var pages = getCurrentPages();

      if (pages.length > 1) {
        wx.navigateBack({
          changed: true
        }); //返回上一页
      } else {
        if (from_page) {
          wx.navigateTo({
            url: from_page
          });
        } else {
          wx.switchTab({
            url: '../hall/hall'
          });
        }
      }
    },
    //事件处理函数
    swiperchange: function (e) {//console.log(e.detail.current)
    },
    //事件处理函数
    login: function () {
      /*
      wx.switchTab({
        url: '../my/index'
      })
      */
      wx.navigateTo({
        url: '../login/login'
      });
    },
    // 点击获取对应分类的数据
    shareTapTag: function () {
      var that = this;
      var shareflag = false;
      that.setData({
        shareflag: shareflag
      });
      console.log('share wish:', shareflag);
    },
    addWishTapTag: function (e) {
      var that = this;
      wx.navigateTo({
        url: '../list/list'
      });
    },
    searchTapTag: function (e) {
      var that = this;
      console.log('搜索关键字：' + that.search_goodsname);
      that.query_wish_cart();
    },
    sendGoodsTapTag: function (e) {
      var that = this;
      var username = wx.getStorageSync('username');
      var index = parseInt(e.currentTarget.dataset.index);
      var sku_id = that.carts[index]['id'];

      if (sku_id) {
        that.insertCart(sku_id, username, 0);
      } else {
        wx.showToast({
          title: '该礼物无货',
          icon: 'loading',
          duration: 1500
        });
      }
    },
    insertCart: function (sku_id, username, wishflag) {
      var that = this;
      var shop_type = that.shop_type; // 加入购物车

      var title = wishflag == 1 ? '确认要加入心愿单吗' : '确认要购买送出吗';
      wx.showModal({
        title: '提示',
        content: title,
        success: function (res) {
          if (res.confirm) {
            // 加入购物车
            var that = this;
            wx.request({
              url: weburl + '/api/client/add_cart',
              method: 'POST',
              data: {
                username: username,
                access_token: "1",
                sku_id: sku_id,
                wishflag: wishflag,
                shop_type: shop_type
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                console.log(res.data.result);
                var title = wishflag == 1 ? '加入心愿单完成' : '加入购物车完成';
                wx.showToast({
                  title: title,
                  duration: 1500
                });

                if (wishflag == 1) {
                  wx.navigateTo({
                    url: '../wish/wish'
                  });
                } else {
                  wx.switchTab({
                    url: '../hall/hall'
                  });
                }
              }
            });
          }
        }
      });
    },
    deleteTapTag: function (e) {
      var that = this;
      var shop_type = that.shop_type;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var index = parseInt(e.currentTarget.dataset.index);
      var carts = that.carts;
      var sku_id = that.carts[index]['id']; // 购物车单个删除

      var objectId = e.currentTarget.dataset.objectId;
      console.log(objectId);
	  wx.request({
	    url: weburl + '/api/client/delete_cart',
	    method: 'POST',
	    data: {
	      username: username,
	      access_token: token,
	      sku_id: sku_id,
	      wishflag: 1,
	      shop_type: shop_type
	    },
	    header: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	      'Accept': 'application/json'
	    },
	    success: function (res) {
	      console.log(res.data.result);
	      var new_carts = [];
	      var j = 0;
	  
	      for (var i = 0; i < carts.length; i++) {
	        if (i != index) {
	          //剔除删除产品
	          new_carts[j++] = carts[i];
	        }
	      }
	  
	      if (new_carts.length == 0) {
	        var all_rows = 0;
	        var showmorehidden = true;
	      } else {
	        var all_rows = new_carts.length;
	        var showmorehidden = false;
	      }
	  
	      that.setData({
	        carts: new_carts,
	        all_rows: all_rows,
	        showmorehidden: showmorehidden
	      });
	    }
	  });
	  /*
      wx.showModal({
        title: '确定移除心愿单吗？',
        content: '',
        success: function (res) {
          if (res.confirm) {
            // 从网络上将它删除
            // 购物车单个删除
            
          }
        }
      });
	  */
    },
    onGotUserInfo: function (e) {
      console.log(e.detail.errMsg);
      console.log(e.detail.userInfo);
      console.log(e.detail.rawData);
    },
    get_project_gift_para: function () {
      var that = this;
      var navList_new = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [{}];
      var shop_type = that.shop_type;
      console.log('wish get_project_gift_para navList2:', navList2, navList2.length);

      if (navList2.length == 0) {
        //项目列表
        wx.request({
          url: weburl + '/api/client/get_project_gift_para',
          method: 'POST',
          data: {
            type: 2,
            //暂定
            shop_type: shop_type,
			query_type:'APP',
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
                navList2: navList_new,
                wish_banner: navList_new[4]['img']
              });
            }
          }
        });
      } else {
        that.setData({
          navList2: navList_new,
          wish_banner: navList_new[4]['img']
        });
      }

      setTimeout(function () {
        that.setData({
          loadingHidden: true
        });
      }, 1500);
    },
    // 定位数据  
    scroll: function (event) {
      var that = this;
      that.setData({
        scrollTop: event.detail.scrollTop
      });
    },
    query_wish_cart: function () {
      var that = this;
      var shop_type = that.shop_type;
      var minusStatuses = [];
      var page = that.page;
      var pagesize = that.pagesize;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var wish_id = getApp().globalData.wish_id;
      console.log('query_wish_cart:', wish_id);
      wx.request({
        url: weburl + '/api/client/query_cart',
        method: 'POST',
        data: {
          username: wish_id ? wish_id : username,
          access_token: token,
          page: page,
          pagesize: pagesize,
          wishflag: 1,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var carts = [];
          console.log('share wish id:', wish_id, ' result:', res.data);
          if (!res.data.result) return;
          var cartlist = res.data.result.list;
          var showmorehidden = that.showmorehidden;
          var index = 0;

          for (var key in cartlist) {
            for (var i = 0; i < cartlist[key]['sku_list'].length; i++) {
              if (cartlist[key]['sku_list'][i]['image'].indexOf("http") < 0) {
                cartlist[key]['sku_list'][i]['image'] = weburl + '/' + cartlist[key]['sku_list'][i]['image'];
              }

              cartlist[key]['sku_list'][i]['short_name'] = cartlist[key]['sku_list'][i]['name'].substr(0, 10) + '...';
              cartlist[key]['sku_list'][i]['selected'] = '';
              cartlist[key]['sku_list'][i]['shop_id'] = key;
              cartlist[key]['sku_list'][i]['objectId'] = cartlist[key]['sku_list'][i]['id'];

              if (index > 1) {
                cartlist[key]['sku_list'][i]['hidden'] = 1;
              }

              carts[index] = cartlist[key]['sku_list'][i];
              minusStatuses[index] = cartlist[key]['sku_list'][i]['num'] <= 1 ? 'disabled' : 'normal';
              index++;
            }
          }

          var page_num = that.page_num;
          var pagesize = that.pagesize;
          page_num = carts.length / pagesize + 0.5;
          that.setData({
            carts: carts,
            minusStatuses: minusStatuses,
            showmorehidden: showmorehidden,
            all_rows: carts.length,
            page_num: page_num.toFixed(0)
          });

          if (wish_id) {
            wx.request({
              url: weburl + '/api/client/get_name',
              method: 'POST',
              data: {
                username: wish_id,
                shop_type: shop_type,
                access_token: token
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                var user_info = res.data.result;
                that.setData({
                  wish_nickname: user_info['wx_nickname'],
                  wish_headimg: user_info['wx_headimg'],
                  wish_id: ''
                });
                getApp().globalData.wish_id = '';
                that.shareTapTag();
              }
            });
          } else {
            that.setData({
              shareflag: true
            });
          }
        }
      });
    },
    ShareWechat: function () {
      var that = this;
      wx.navigateTo({
        url: '../wish/wishshare/wishshare'
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
@import "./wish.css";
</style>