<template>
<view>
<view class="banner">
	<swiper class="swiper_box" :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,0.1)" indicator-active-color="rgba(0,0,0,0.3)" :vertical="vertical" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
		<swiper-item  v-for="(banner_list, index) in hall_banner" :key="index" @tap="bannerTapTag(banner_list)">
            <video v-if="banner_list.ext=='mp4'" id="myVideo" class="slide-image" :src="banner_list.img" controls autoplay custom-cache="false" objectFit="contain"> <!-- poster="{{goodscoverimg}}" -->
              <cover-view class="controls" mode="aspecFit">
              <cover-image class="img" :src="banner_list.pic" mode="aspectFill"></cover-image>
              </cover-view>
            </video>
            <image v-else :src="banner_list.img" class="slide-image"></image>
		</swiper-item>
	</swiper>
</view>
<view class="wrap">
  <view class="gifts-item-title">完成获得奖励</view>
	<swiper class="swiper_box" :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,0.1)" indicator-active-color="rgba(0,0,0,0.3)" :vertical="vertical" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
		<swiper-item v-for="(gifts_list, index) in gifts_list" :key="index">
            <view class="gifts-item">
            <image :src="gifts_list.img2" class="gifts-item-image" style mode="aspectFill"></image>
            <text class="gifts-item-text">{{gifts_list.note}}</text>
            </view>
		</swiper-item>
    </swiper>
</view>
<scroll-view class="container" scroll-y @scrolltolower="getMoreOrdersTapTag">
  <view v-for="(item, index) in task_list" :key="index" class="task-list">
    <view class="order-item-title">{{item.title}}</view>
    <view class="order-item-message">{{item.message_info.message?'  '+item.message_info.message:''}}</view>
    <view class="sentbtn">
    <text style="color:#E34C55" @tap="refer_detail" :data-refer-list="item.task_info.refer_list">{{item.task_info.task_status!=9?item.task_info.step_info:''}}</text>
    <button v-if="item.message_info.message_type==0 && item.task_info.task_status!=9" open-type="button" @tap="task_action">去送礼</button>
    <button v-if="item.task_info.task_status==9 && item.message_info.message_type!=10" open-type="button" @tap="refer_detail" style="background:#CCC;" :data-refer-list="item.task_info.refer_list">已完成</button>
    <button v-if="item.task_info.task_status!=9 && item.task_info.last_status!=9 && item.message_info.message_type!=0 && item.message_info.message_type!=10" style="background:#CCC" open-type="button" >未开始</button>
    <button v-if="item.task_info.task_status!=9 && item.task_info.last_status==9 && item.message_info.message_type!=0 && item.message_info.message_type!=10" open-type="share" @tap="shareToWXminiProgram" :data-msg-id="item.msg_id" :data-task-status="item.task_info.task_status">继续完成</button>
     <button v-if="item.task_info.task_status!=9 && item.message_info.message_type==10" open-type="button" @tap="query_pubcoupon" :data-coupon-id="item.message_info.coupon_id" :data-msg-id="item.msg_id" :data-task-status="item.task_info.task_status">领取奖励</button>
       <button v-if="item.task_info.task_status==9 && item.message_info.message_type==10" open-type="button" style="background:#CCC" :data-msg-id="item.msg_id" :data-task-status="item.task_info.task_status">已领取</button>
    </view>
</view>
<view class="sentbtn">
  <text @tap="goBack">查看更多好礼任务></text>
</view>
</scroll-view>
<view class="message" :hidden="messageHidden" @tap="messageConfirm" :style="'height:' + dkheight + 'px;'">
    <view class="t_w">
      <!--右上角图标开始-->
      <!-- 
      <view class="t_image"  bindtap="messageCandel">
        <image class="t_image1" src="{{resp_message.image}}"></image>
      </view>
      -->
      <!--右上角图标结束-->
      <!--弹出框开始-->
      <!-- 分享人列表 -->
      <view class="layerframe">
      <view class="red-item" :style="'background-image:url(' + message.image + '); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;'">
      <text class="red-title">已查看的好友</text>
          <view class="name-list" v-for="(refer_list, index) in refer_list" :key="index">
          <text class="red-name">{{refer_list.wx_nickname?refer_list.wx_nickname:''}}</text>
          <text class="red-dueday">{{refer_list.time?refer_list.time:''}}</text>
          </view>
          <!--确定开始-->
          <!-- 
          <view class="txtsure">
            <view class="txtsurebg" bindtap="messageCandel">
              <text class="txtsurename">确定</text>
            </view>        
          </view>
          -->
          <!--确定结束-->
      </view>
      </view>
    </view>
     <!--弹出框结束-->
</view>
</view>
</template>

<script>
var util = require("../../../utils/util.js"); //获取应用实例
var weburl = getApp().globalData.weburl;
var miniprogram_id = getApp().globalData.miniprogram_id;
var shop_type = getApp().globalData.shop_type;
var now = new Date().getTime();
var page = 1;
var pagesize = 10;
var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
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
}];
var navList2 = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : [{}];
var now = new Date().getTime();

export default {
  data() {
    return {
      currenttime: now ? parseInt(now) : 0,
      new_task_image: weburl + "/uploads/new_task_share.png",
	  miniprogram_id:miniprogram_id,
      //默认的新人送礼图片
      hidden: true,
      windowWidth: 0,
      windowHeight: 0,
      winHeight: 300,
      nickname: userInfo.nickname,
      avatarUrl: userInfo.avatarUrl,
      shop_type: shop_type,
      navList2: navList2,
      page: 1,
      pagesize: 10,
      status: 0,
      all_rows: 0,
      page_num: 0,
	  message:{},
      messageHidden: true,
      refer_list: "",
      hall_banner: navList2?navList2[8]:'',
      gifts_list: "",
      loadingHidden: false,
      qr_type: "",
      startX: "",
      itemLefts: [],
      task_list: "",
      msg_id: "",
      coupons_info: "",
      goods_id: "",
      act_id: "",
      page_type: "",
      order_no: "",
      coupons: "",
      receive: "",
      task: "",
      task_image: "",
      userInfo: "",
      dkheight: "",
      username: "",
      scrollTop: "",
      title_logo: "",
      send_status: 0,
	  indicatorDots: true,
	  vertical: false,
	  autoplay: true,
	  interval: 3000,
	  duration: 1000,
	  circular: true,
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
    var username = uni.getStorageSync('username');
	var username = uni.getStorageSync('username');
    var page_type = options.page_type ? options.page_type : '';
    var order_no = options.order_no ? options.order_no : '';
    var act_id = options.act_id ? options.act_id : '';
    var coupons = options.coupons ? options.coupons : '';
    var receive = options.receive ? options.receive : '';
    var task = options.task ? options.task : 0;
    var msg_id = options.msg_id ? options.msg_id : 0;
    var task_image = options.image ? options.image : '';
    var scene = decodeURIComponent(options.scene);
    that.get_project_gift_para();
    that.setData({
      act_id: act_id,
      page_type: page_type,
      order_no: order_no,
      coupons: coupons,
      receive: receive,
      task: task,
      msg_id: msg_id,
      task_image: task_image ? task_image : that.new_task_image
    }); //that.setNavigation()

    console.log('activity page_type:', page_type, ' order_no:', order_no, ' receive:', receive, ' act_id:', act_id, ' hall_banner:', that.hall_banner);

    if (!username) {
      /*
      wx.navigateTo({
        url: '/pages/login/login'
      })
      */
      wx.switchTab({
        url: '/pages/my/index'
      });
    } else {
      if (page_type == 2) {
        //收到礼物
        if (receive == 1) {
          wx.navigateTo({
            url: '../order/receive/receive?order_no=' + order_no + '&receive=1'
          });
        }
      }
	}
	that.get_member_messages();
    uni.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight;
        console.log('getSystemInfo:', winHeight);
        that.setData({
          dkheight: winHeight
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
    var username = uni.getStorageSync('username');
    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '../../images/back.png'
      });
    }
  },
  
  methods: {
	  shareAction() {
	  	uni.showActionSheet({
	  		//title:'分享',
	  		itemList: ['微信朋友圈', '微信小程序'],
	  		success: (e) => {
	  			console.log(e.tapIndex);
	  			switch (e.tapIndex) {
	  				case 0:
	  					this.shareToWXSenceTimeline() ;
	  					break;
	  				case 1:
	  					this.shareToWXminiProgram() ;
	  					break;
	  				default:
	  					break;
	  			}
	  		}
	  	})
	  },
	  shareToWXSenceTimeline: function () { //分享到朋友圈
	  	var that = this
		var nickname = that.nickname;
		var task = 1;
		var msg_id = that.msg_id;
		var shareImage = that.navList2.length == 0 ? that.new_task_image : that.navList2[9]['img'];
		var share_path = '/pages/hall/hall?task=' + task + '&msg_id=' + msg_id + '&refername=' + username + '&sharetime=' + currenttime
		var title = '好友' + nickname + '邀请你一起参与送心礼物任务~';
		var currenttime = that.currenttime;
		if(!shareImage) return ;
		//#ifdef APP-PLUS
	  	uni.share({
			provider: 'weixin',
			type: 2,
			//href: "http://uniapp.dcloud.io/",
			//title: title,
			scene: 'WXSenceTimeline', //WXSceneSession分享到聊天界面  WXSenceTimeline分享到朋友圈  WXSceneFavorite分享到微信收藏
			imageUrl: shareImage,
	  	  success: (res) => {
	  	    console.log(res)
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
		//#endif
	  },
	  shareToWXminiProgram: function () { //分享到微信小程序
		var that = this
	  	var share_goods_name = that.share_goods_name?that.share_goods_name:'送心礼物分享' ;
	  	var share_goods_image = that.share_goods_image?that.share_goods_image:'' ;
	  	var share_goods_id = that.share_goods_id?that.share_goods_id:0 ;
	  	var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
	  	var miniprogram_id = that.miniprogram_id ;
		var currenttime = that.currenttime;
		var nickname = that.nickname;
		var task = 1;
		var msg_id = that.msg_id;
		var shareImage = that.navList2.length == 0 ? that.new_task_image : that.navList2[9]['img'];
		var share_path = '/pages/hall/hall?task=' + task + '&msg_id=' + msg_id + '&refername=' + username + '&sharetime=' + currenttime
		var title = '好友' + nickname + '邀请你一起参与送心礼物任务~';
		if(!shareImage) return ;
		uni.share({
			provider: 'weixin',
			type: 5,
			scene: 'WXSceneSession',
			title: title,
			imageUrl: shareImage, //'https://sendheart.dreamer-inc.com/uploads/new_task_share.png',
			miniProgram: {
	  	          id: miniprogram_id,  // gh_aefe7ce896f6
	  	          path: '/pages/hall/hall?task=' + task + '&msg_id=' + msg_id + '&refername=' + username + '&sharetime=' + currenttime,
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
	   
	onShareApp: function (options) {
	    var that = this;
	    var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	    var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		var nickname = that.nickname;
	    var task = 1;
	    var msg_id = that.msg_id;
	    var currenttime = that.currenttime;
	    var desc = '新手任务免费得大礼';
	    var imageUrl = that.navList2.length == 0 ? that.new_task_image : that.navList2[9]['img'];
	    var title = '好友' + nickname + '邀请你一起参与送心礼物任务~';
	    console.log('开始分享送礼任务', options, ' task:', task, ' msg_id', msg_id);
		/*
	    var shareObj = {
	      title: title,
	      // 默认是小程序的名称(可以写slogan等)
	      desc: desc,
	      path: '/pages/hall/hall?task=' + task + '&msg_id=' + msg_id + '&refername=' + username + '&sharetime=' + currenttime,
	      // 默认是当前页面，必须是以‘/’开头的完整路径
	      imageUrl: imageUrl,
	      //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
	      success: function (res) {
	        console.log(res);
	  
	        if (res.errMsg == 'shareAppMessage:ok') {
	          // 转发成功之后的回调
	          that.setData({
	            send_status: 1
	          });
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
	      console.log('任务分享', shareObj);
	    } // 返回shareObj
	  
	    return shareObj;
		*/
	  },
    //确定按钮点击事件 
    messageConfirm: function () {
      var that = this;
      var messageHidden = that.messageHidden;
      that.setData({
        messageHidden: !messageHidden
      });
    },
    refer_detail: function (e) {
      var that = this;
      var messageHidden = that.messageHidden;
      var refer_list = e.currentTarget.dataset.referList;
      console.log('refer_detail refer list:', refer_list);

      if (refer_list) {
        for (var i = 0; i < refer_list.length; i++) {
          refer_list[i]['time'] = util.getDateStr(refer_list[i]['time'] * 1000, 0);
        }

        that.setData({
          refer_list: refer_list,
          messageHidden: !messageHidden
        });
        console.log('refer_detail message:', that.refer_list);
      }
    },
    goBack: function () {
      var pages = getCurrentPages();

      if (pages.length > 1) {
        wx.switchTab({
          url: '/pages/hall/hall'
        }); //wx.navigateBack({ changed: true });//返回上一页
      } else {
        wx.switchTab({
          url: '/pages/hall/hall'
        });
      }
    },
    get_project_gift_para: function () {
      var that = this;
      var navList_new = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [{}];
      var shop_type = that.shop_type;
      var hall_banner = that.hall_banner;
      var gifts_list = [];
      console.log('task get_project_gift_para navList2:', navList_new);

      if (navList_new.length == 0) {
        //项目列表
        wx.request({
          url: weburl + '/api/client/get_project_gift_para',
          method: 'POST',
          data: {
            type: 2,
            //暂定 1首页单图片 2首页轮播  
            shop_type: shop_type
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
			navList_new = res.data.result;
            console.log('get_project_gift_para navList_new:', navList_new);
            
            if (!navList_new) {
              return;
            } else {
              uni.setStorageSync('navList2', navList_new);
              that.setData({
                navList2: navList_new,
                hall_banner: navList_new[8] ? navList_new[8] : hall_banner,
                //首页banner图
                gifts_list: navList_new[9] ? that.gifts_list.push(navList_new[9]) : ''
              });
            }
          }
        });
      } else {
        gifts_list.push(navList_new[9]);
		that.navList2 = navList_new ;
		that.hall_banner = navList_new[8] ? navList_new[8] : hall_banner ;
		that.gifts_list = gifts_list
      }

      console.log('task get_project_gift_para gifts_list:', that.gifts_list,' hall_banner:',that.hall_banner);
      setTimeout(function () {
		  that.loadingHidden = true 
      }, 1500);
    },
    bannerTapTag: function (e) {
      var that = this;
      var banner_link = e.link;
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

      that.setData({
        qr_type: qr_type
      });
      wx.navigateTo({
        url: '../share/share?qr_type=' + qr_type + '&act_id=' + act_id + '&act_title=' + act_title
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
      var goods_sale = e.currentTarget.dataset.sale; //var carts = this.data.carts;

      var sku_id = objectId;
      wx.navigateTo({
        url: '../../details/details?sku_id=' + objectId + '&id=' + goods_id + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&token=' + token + '&username=' + username
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
    onGotUserInfo: function (e) {
      console.log(e.detail.errMsg);
      console.log(e.detail.userInfo);
      console.log(e.detail.rawData);
    },
    //获取消息
    get_member_messages: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      var page = that.page;
      var pagesize = that.pagesize;
      wx.request({
        url: weburl + '/api/client/get_member_messages',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          message_type: 6 //任务信息

        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var messages_all = res.data;
          var messages = messages_all['result'];
          console.log('task get_member_messages:', messages_all, 'messages:', messages);

          if (messages_all['status'] == 'y') {
            /*
            if (messages.length == 0) {//为空时虚拟一条送礼任务
              var message_info = {
                message_type: 0,
                message: '请完成一次送礼',
                image: that.data.new_task_image
              }
              var task_info = {
                step_no: 0,
                task_status: 0,
                step_info: '未开始'
              }
              var message_info2 = {
                message_type: 0,
                message: '把这个活动分享给5个好友，并且他们都点击查看了你的分享',
                image: that.data.new_task_image
              }
              var task_info2 = {
                step_no: 0,
                task_status: 0,
                step_info: '已完成(0/5)',
                refer_list:[],
              }
               
              var new_task = [
                {
                  addtime: util.getDateStr(that.data.currenttime, 0),
                  msg_id: 0,
                  msg_status: 0,
                  title: '任务一：',
                  type: 6, //送礼类型
                  message_info: message_info,
                  task_info: task_info,
                },
                {
                  addtime: util.getDateStr(that.data.currenttime, 0),
                  msg_id: 0,
                  msg_status: 0,
                  title: '任务二：',
                  type: 6, //送礼类型
                  message_info: message_info2,
                  task_info: task_info2,
                }
              ]
             
            }  
            */

            /*
            for (var i = 0; i < messages.length;i++){
              if(i>0){
              messages[i]['task_info']['last_status'] = messages[i-1]['task_info']['task_status'] 
              }else{
                messages[i]['task_info']['last_status'] = 9
                messages[i]['message_info']['message_type'] = messages[i]['task_info']['task_status'] != 9 ? 0 : messages[i]['message_info']['message_type']
              }
            }
            
            messages[0]['title'] = '任务一'
            messages[1]['title'] = '任务二'
            */
            that.setData({
              task_list: messages,
              msg_id: messages ? messages[1]['msg_id'] : 0
            });
            console.log('获取消息:', that.task_list);
          } else {
            wx.showToast({
              title: '暂无消息',
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    },
    task_action: function (e) {
      var that = this;
      var msg_id = 0;
      var task_status = 0;
      var image = that.new_task_image;

      if (task_status == 0 && msg_id == 0) {
        wx.navigateTo({
          url: '/pages/details/details?id=7482'
        });
      }
    },
    query_pubcoupon: function (e) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var shop_type = that.shop_type;
      var coupons_id = e.currentTarget.dataset.couponId;
      var msg_id = e.currentTarget.dataset.msgId;
      wx.request({
        url: weburl + '/api/client/query_pubcoupon',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          coupons_id: coupons_id,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var coupons_info = res.data.result;
          console.log('task query_pubcoupon:', res.data);

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

            var goods_id = coupons_info[0]['object_goods'].split(","); //多个goods_id

            that.setData({
              coupons_info: coupons_info,
              goods_id: goods_id[0] ? goods_id[0] : '7362',
              msg_id: msg_id
            });
            console.log('任务 查询红包信息 query_pubcoupon coupons_info:', coupons_info, 'coupons_info.length:', coupons_info.length);
            that.band_coupon();
          }
        }
      });
    },
    band_coupon: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var coupons_info = that.coupons_info;
      var coupons_json = JSON.stringify(coupons_info);
      var msg_id = that.msg_id;
      var goods_id = that.goods_id;
      console.log('领取红包 band_coupon coupons_info:', coupons_info);
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
          console.log('领取红包返回:', res.data);
          var coupons_update = res.data.result;

          if (!res.data.result) {
            wx.showToast({
              title: res.data.info ? res.data.info : '已被领取',
              icon: 'none',
              duration: 1500
            });
          } else {
            wx.showToast({
              title: '领取成功',
              icon: 'success',
              duration: 1500
            });
          }

          if (goods_id) {
            wx.navigateTo({
              url: '/pages/details/details?id=' + goods_id
            });
          } else {
            wx.switchTab({
              url: '/pages/hall/hall'
            });
          }
        }
      });
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
        });
        return;
      }

      that.setData({
        page: page
      });
      that.get_member_messages();
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
@import "./task.css";
</style>