<template>
<view style="background-color: #fff;height: 100%;">
<!--index.wxml-->
<view class="container" :style="'height:' + windowHeight + 'px;'">
	<view class="share-goods">
		<view class="share-buttons">
			<view v-if="share_order_shape==5||share_order_shape==4" class="btncard" @tap="goBack">
				<image class="shareto" src="/static/images/home-white.png"></image>
				返回
			</view>
			<view class="btnshare" @tap="reloadData">
				<image class="shareto" src="/static/images/refresh.png"></image>
			</view>
		</view>
	</view>
	<!--
	<image :src="shareImage" class="share-image" style="margin-top:20rpx;" mode="aspectFit" @tap.stop="(share_order_shape!=5 && share_order_shape!=4)?'sharegoods':''"></image>
	<canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"></canvasdrawer>
	<image :src="shareImage" class="share-image" style="margin-top:20rpx;" mode="aspectFit" @tap.stop="(share_order_shape!=5 && share_order_shape!=4)?'sharegoods':''"></image>
	<posters-layer  class="share-image" :postersData="painting" @success="onSuccessCreatePosters" @error="onPostersError"></posters-layer>
	<image :hidden="isPainting" :src="shareImage" :style="{width: width + 'px', height: height + 'px'}" mode="aspectFit" @tap.stop="(share_order_shape!=5 && share_order_shape!=4)?'sharegoods':''"></image>
	-->
	
	<view style="text-align: center;"  @tap.stop="(share_order_shape!=5 && share_order_shape!=4)?'sharegoods':''">
		<canvas canvas-id="canvasdrawer" :style="{width: width + 'px', height: height + 'px'}" style="margin:0 auto; background-color: #1d1d1d;"></canvas>
	</view>
	<view v-if="share_order_shape==5||share_order_shape==4" class="share-play-rec" @tap="play_rec">
		<image src="/static/images/notification.png" style="width:70rpx;height:70rpx;" :mode="((share_order_shape==5||share_order_shape==4)?'aspectFit':'')"></image>
	</view>
	
	<!-- 
	<view  hidden="{{!notehidden}}" style='margin:10rpx;font-size:26rpx;color:#999;height:120rpx;' >{{share_goods_title?'分享语: '+share_goods_title:'分享语为空'}}</view>
	-->
	
  <view class="sentbtn2" v-if="share_art_id==0  && share_live_id==0 && share_order_shape!=5 && share_order_shape!=4" @tap="sharegoods">
    <button >修改留言</button>
  </view>
  <view class="sentbtn">
    <form @submit="formSubmit" data-name="eventSave" report-submit="true">
      <button formType="submit" style="width:200rpx;" type="warn">保存到相册</button> <!-- bindtap="eventSave"  -->
    </form>
    <view v-if="share_order_shape==5" style="width:100%;">
      <button type="primary" @touchstart="startRecode" @touchend="endRecode" class="sec-btn" style="background: #fff;">
      <image class="icon-recorder" src="/static/images/record.png"></image>
    </button>
  </view>
    <form @submit="formSubmit" data-name="onShare" report-submit="true">
      <button formType="submit" style="width:200rpx;" >立即分享</button>
    </form>
  </view>
</view>
	<uni-popup :show="!notehidden" :type="share_type" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">
			编辑分享语
			</view>
			<view class="uni-tip-content">
				 <view :style="'height:' + (share_order_shape==5?dkheight-330:dkheight-430) + 'px;'">
				<view class="note">
				 <textarea style="margin-top:10rpx;font-size:26rpx;color:#333;text-align: left;" @blur="bindTextAreaBlur" :placeholder="(share_order_shape==5?share_order_note:share_goods_title)" :maxlength="(share_order_shape==5?200:100)"></textarea>
				 </view>
				</view>
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @tap="shareCandel">取消</view>
				<view class="uni-tip-button" @tap="shareConfirm">确定</view>
			</view>
		</view>
	</uni-popup>
	<!-- 底部分享弹窗 -->
	<uni-popup ref="share" :type="share_type" :custom="true" >
		<view class="uni-share">
			<view class="uni-share-title">分享到</view>
			<view class="uni-share-content">
				<view v-for="(item, index) in shareInfo" :key="index" class="uni-share-content-box" @tap="share_to(item)">
					<view class="uni-share-content-image">
						<image :src="item.icon" class="image" />
					</view>
					<view class="uni-share-content-text">{{ item.text }}</view>
				</view>
			</view>
			<view class="uni-share-btn" @click="share_cancel('share')">取消分享</view>
		</view>
	</uni-popup>
</view>
</template>

<script>
const CACHE_KEYS = 'canvasdrawer_pic_cache';
var util = require("utils/util.js"); //获取应用实例
import uniPopup from '@/components/uni-popup/uni-popup.vue'
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var miniprogram_id = getApp().globalData.miniprogram_id;

var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
var appid = getApp().globalData.appid;
var secret = getApp().globalData.secret;
var uploadurl = getApp().globalData.uploadurl;
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
  id: "wechat_share",
  title: "背景",
  value: "",
  img: "/uploads/wechat_share.png"
}];
var navList2 = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : [];
var userauth = uni.getStorageSync('userauth') ? uni.getStorageSync('userauth') : {};
const recorderManager = uni.getRecorderManager();
const myaudio = uni.createInnerAudioContext();
const options = {
  duration: 180 * 1000,
  //指定录音的时长，单位 ms
  sampleRate: 16000,
  //采样率
  numberOfChannels: 1,
  //录音通道数
  encodeBitRate: 96000,
  //编码码率
  format: 'mp3',
  //音频格式，有效值 aac/mp3
  frameSize: 50 //指定帧大小，单位 KB

};
//import canvasdrawer from "../../../common/canvasdrawer/canvasdrawer";
//import postersLayer from '../../../components/posters-layer/index';

export default {
  data() {
    return {
		postersData: {},
		posterImg: {},
      title_name: '分享',
      title_logo: '/static/images/footer-icon-05.png',
      share_goods_bg: weburl + '/uploads/share_goods_bg.png', //'/static/images/share_goods_bg.png',
      activity_share_image: weburl + '/uploads/activity_share.jpg',
      activity_avatarUrl: weburl + '/uploads/avatar.png',
      share_goods_avatarUrl:  userInfo.avatarUrl? userInfo.avatarUrl:'/static/images/my.png',
      nickname: userInfo.nickname,
      avatarUrl: userInfo.avatarUrl,
	  miniprogram_id:miniprogram_id,
      painting: {},
	  paintingData: { views: [] },
	  imageList: [],
	  tempFileList: [],
	  isPainting: false,
	  ctx: null,
	  cache: {},
      shareImage: '',
      shop_type: shop_type,
      wechat_share: '',
      start_time: util.getDateStr(new Date(), 0),
      overtime_status: 0,
      notehidden: true,
      hidden_share: true,
	  width: 100,
	  height: 100,
      windowHeight: 900,
      windowWidth: 500,
      background: '#f2f2f2',
      recordingTimeqwe: "",
      navList2: "",
      shutRecordingdis: "",
      openRecordingdis: "",
      new_rec_url: "",
      order_voice: "",
      voice_url: "",
      card_register_info: "",
      card_name_info: "",
      card_love_info: "",
      card_cele_info: "",
      card_template: "",
      card_color: "",
      card_type: "",
      dkheight: "",
      m_id: "",
      task: "",
      task_image: "",
      msg_id: "",
      activity_id: "",
      activity_image: "",
      activity_name: "",
      activity_headimg: "",
      share_art_id: "",
      share_art_cat_id: "",
      share_art_title: "",
      share_art_image: "",
      share_art_wx_headimg: "",
      share_goods_id: "",
      share_goods_price: "",
      share_goods_name: "",
      share_goods_org: "",
      share_goods_shape: "",
      share_goods_image: "",
      share_goods_image2: "",
      share_goods_wx_headimg: "",
      share_goods_title: "",
      share_goods_desc: "",
      share_goods_qrcode_cache: "",
      share_order_shape: "",
      share_order_id: "",
      share_order_note: "",
      share_order_bg: "",
      share_order_image: "",
      share_order_wx_headimg: "",
	  share_live_id: "0",
	  share_live_logo: "",
	  share_live_name: "",
	  share_live_wx_headimg: "",
      loadingHidden: false,
      send_status: 0,
	  isSaveImageToPhotosAlbum:false,
	  userauth:userauth,
	  userauth_shoper:0,
	  share_type:"bottom",
	  shareInfo: [{
	  		text: '微信好友',
	  		icon: '/static/images/wx_logo.png',
	  		name: 'wxfriend'
	  	},
		{
			text: '微信朋友圈',
			icon: '/static/images/wx2_logo.png',
			name: 'wxcomm'
		},
		{
			text: 'APP推送',
			icon: '/static/images/phone.png',
			name: 'appshare'
		}
		/*
	  	{
	  		text: '支付宝',
	  		icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
	  		name: 'wx'
	  	},
	  	{
	  		text: 'QQ',
	  		icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
	  		name: 'qq'
	  	},
	  	{
	  		text: '新浪',
	  		icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
	  		name: 'sina'
	  	},
	  	{
	  		text: '百度',
	  		icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
	  		name: 'copy'
	  	},
	  	{
	  		text: '其他',
	  		icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
	  		name: 'more'
	  	}
		*/
	  ]
    };
  },

  components: {
    //canvasdrawer,
	uniPopup,
	//postersLayer,
  },
  props: {},

	onLoad(options) {
		var that = this;
		console.log('options:',options)
		var is_back = options.is_back ? options.is_back : 0;
		if (is_back == 1) options = uni.getStorageSync('wishshare_options');
		var share_order_id = options.share_order_id ? options.share_order_id : 0;
		var share_order_shape = options.share_order_shape ? options.share_order_shape : 1;
		var card_type = options.card_type ? options.card_type : 0;
		var userauth = uni.getStorageSync('userauth') ? uni.getStorageSync('userauth') : '';
		var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		that.userauth_shoper = userauth.shoper ;
		that.avatarUrl = userInfo.avatarUrl ;
		that.share_goods_avatarUrl =  userInfo.avatarUrl? userInfo.avatarUrl:'/static/images/my.png',
		uni.setStorageSync('wishshare_options', options)
		that.get_project_gift_para();
		console.log(' wishshare onload() 订单 share_order_id:', share_order_id,' share_order_shape:',share_order_shape,' options:',options); // 存储地址字段
		if (share_order_id > 0 && (parseInt(share_order_shape) == 5 || parseInt(share_order_shape) == 4)) {
			var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
			var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
			uni.request({
				url: weburl + '/api/client/query_order',
				method: 'POST',
				data: {
					username: username ? username : openid,
					access_token: token,
					order_id: share_order_id,
					shop_type: shop_type
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				success: function (res) {
					var orderObjects = res.data.result;
					console.log(' wishshare onload() 订单查询:', orderObjects); // 存储地址字段
						for (var i = 0; i < orderObjects.length; i++) {
							if (orderObjects[i]['logo'].indexOf("http") < 0) {
								orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo'];
							}
							orderObjects[i]['logo'] = orderObjects[i]['logo'].replace('http:', 'https:');
							for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
								if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
									orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
								}
								orderObjects[i]['order_sku'][j]['sku_image'] = orderObjects[i]['order_sku'][j]['sku_image'].replace('http:', 'https:');
							}
						}

						if ((orderObjects[0]['shape'] == 5 || orderObjects[0]['shape'] == 4) && orderObjects[0]['m_desc']) {
							//console.log(' wishshare onload() 互动卡订单 m_desc:', orderObjects[0]['m_desc'])
							var m_desc = JSON.parse(orderObjects[0]['m_desc']);
							var voice_url = m_desc['voice'];

							if (voice_url) {
								uni.downloadFile({
									url: voice_url,
							//音频文件url                  
									success: res => {
										if (res.statusCode === 200) {
											console.log('录音文件下载完成', res.tempFilePath);
											that.order_voice = res.tempFilePath
											that.voice_url = voice_url
										}
									}
								});
							}
							//var card_register_info = m_desc['card_register_info']

							that.card_register_inf = m_desc['card_register_info'] ? m_desc['card_register_info'] : ''
							that.card_name_info = m_desc['card_name_info'] ? m_desc['card_name_info'] : ''
							that.card_love_info = m_desc['card_love_info'] ? m_desc['card_love_info'] : ''
							that.card_cele_info = m_desc['card_cele_info'] ? m_desc['card_cele_info'] : ''
							that.card_template = m_desc['card_template'] ? m_desc['card_template'] : ''
							that.card_color = m_desc['color'] ? m_desc['color'] : '#333'
							that.card_type = m_desc['card_template'] ? m_desc['card_template'][0]['type'] : card_type
		   
							uni.setNavigationBarTitle({
								title: '互动分享'
							})
						}
						console.log('card card_template:', that.card_template, ' card_love_info:', that.card_love_info);
					}
				})
			}

			uni.getSystemInfo({
				success: function (res) {
					console.log('wishshare getSystemInfo:', res)
					that.windowHeight = res.windowHeight ? res.windowHeight : that.windowHeight
					that.windowWidth = res.windowWidth ? res.windowWidth : that.windowWidth
					that.dkheight = res.windowHeight - 10
				}
			});
			setTimeout(function () {
				that.reloadData();
		}, 1000);
	},

  onShow: function () {
    var that = this;
  },
  onShareAppMessage: function (options) {
    var that = this;
    var res;
    var m_id = that.m_id;
    var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
    var nickname = that.nickname;
    var msg_id = that.msg_id;
    var task = that.task;
    var start_time = that.start_time;
    var activity_id = that.activity_id ? that.activity_id : 0;
    var activity_image = that.activity_image ? that.activity_image : that.activity_share_image;
    var activity_name = that.activity_name ? that.activity_name : '我的位置';
    var title = '收到' + nickname + '的送礼分享~';
    var imageUrl = that.task_image ? that.task_image : that.wechat_share;
    var desc = '送心礼物分享';
    var share_goods_id = that.share_goods_id ? that.share_goods_id : 0;
    var share_goods_image = that.share_goods_image2 ? that.share_goods_image2 : '';
    var share_goods_wx_headimg = that.share_goods_wx_headimg ? that.share_goods_wx_headimg : that.share_goods_avatarUrl;
    var share_goods_shape = that.share_goods_shape ? that.share_goods_shape : '1';
    var share_goods_org = that.share_goods_org ? that.share_goods_org : '1'; //5虚拟商品 1自营商品

    var share_goods_default_title = '';

    if (share_goods_shape == 5) {
      share_goods_default_title = '平安是福';
    } else if (share_goods_shape == 4) {
      share_goods_default_title = '一起来吧';
    } else {
      share_goods_default_title = '这个礼物真不错，来看看吧，要是你能送我就更好了~';
    }

    var share_goods_title = that.share_goods_title ? that.share_goods_title : share_goods_default_title;
    var share_goods_desc = that.share_goods_desc ? that.share_goods_desc : '送礼就是送心~';
    var share_art_id = that.share_art_id;
    var share_art_cat_id = that.share_art_cat_id;
    var share_art_image = that.share_art_image;
    var share_art_title = that.share_art_title;
    var share_order_id = that.share_order_id;
    var share_order_image = that.share_order_image;
    var share_order_shape = that.share_order_shape;
    var share_order_note = that.share_order_note;
    console.log('开始分享送礼任务', options);
    var shareObj = {
      title: title,
      // 默认是小程序的名称(可以写slogan等)
      desc: desc,
      path: '/pages/hall/hall?task=' + task + '&msg_id=' + msg_id + '&refername=' + username + '&sharetime=' + start_time,
      // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: activity_id > 0 ? activity_image : imageUrl,
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
      if (activity_id > 0) {
        shareObj['desc'] = '我的位置';
        shareObj['title'] = nickname + ':' + share_goods_title ? share_goods_title : activity_name + '~';
        shareObj['imageUrl'] = activity_image;
        shareObj['path'] = '/pages/member/mylocation/mylocation?username=' + username + '&activity_id=' + activity_id;
      }

      if (share_goods_id > 0) {
        shareObj['desc'] = share_goods_desc;
        shareObj['title'] = share_goods_title;
        shareObj['imageUrl'] = share_goods_image;
        shareObj['path'] = '/pages/details/details?id=' + share_goods_id + '&image=' + share_goods_image + '&mid=' + m_id;
      }

      if (share_art_id > 0) {
        shareObj['title'] = share_art_title;
        shareObj['imageUrl'] = share_art_image;
        shareObj['path'] = '/pages/my/index?art_id=' + share_art_id + '&art_cat_id=' + share_art_cat_id + '&mid=' + m_id;
      }

      if (share_order_shape == 4) {
        if (that.card_register_info) {
          shareObj['title'] = that.card_register_info['card_register_title'] ? that.card_register_info['card_register_title'] : '';
        } else if (that.card_name_info) {
          shareObj['title'] = that.card_name_info['card_name_name'] ? that.card_name_info['card_name_name'] + '的名片' : '';
        } else if (that.card_cele_info) {
          shareObj['title'] = that.card_cele_info['card_cele_title'] ? that.card_cele_info['card_cele_title'] + '的祝福' : '祝福';
        } else if (that.card_love_info) {
          shareObj['title'] = that.card_love_info['card_love_title'] ? that.card_love_info['card_love_title'] + '的爱心' : '爱心';
        }

        shareObj['imageUrl'] = that.shareImage; //share_order_image

        shareObj['path'] = '/pages/order/receive/receive?receive=1&order_id=' + share_order_id + '&order_shape=' + share_order_shape + '&mid=' + m_id;
      }

      if (share_order_shape == 5) {
        shareObj['title'] = share_order_note;
        shareObj['imageUrl'] = that.shareImage; //share_order_image
        shareObj['path'] = '/pages/order/receive/receive?receive=1&order_id=' + share_order_id + '&order_shape=' + share_order_shape + '&mid=' + m_id;
      }

      console.log('送心分享', shareObj);
    } // 返回shareObj


    return shareObj;
  },
  onReady: function () {
  	uni.removeStorageSync('CACHE_KEYS');
	var that = this 
  	this.cache = uni.getStorageSync('CACHE_KEYS') || {};
  	this.ctx = uni.createCanvasContext('canvasdrawer',that);
	this.ctx.setFillStyle('white') ;
  },
 
  methods: {
	shareAction() {
		if(!this.isSaveImageToPhotosAlbum){
			this.eventSave();
		}
		var itemList = ['微信朋友圈', '微信小程序', 'APP推送']
		uni.showActionSheet({
			//title:'分享',
			itemList: itemList,
			success: (e) => {
				console.log(e.tapIndex);
				switch (e.tapIndex) {
					case 0:
						this.shareToWXSenceTimeline() ;
						break;
					case 1:
						this.shareToWXminiProgram() ;
						break;
					case 2:
						this.shareToAppPush() ;
						break;	
					default:
						break;
				}
				/*
				uni.showToast({
					title:"点击了第" + e.tapIndex + "个选项",
					icon:"none"
				})*/
			}
		})
	},
	shareToWXSenceTimeline: function () { //分享到朋友圈
		var shareImage = this.shareImage
		if(!shareImage) return ;
		//#ifdef APP-PLUS
		uni.share({
		  provider: 'weixin',
		  type: 2,
		  //href: "http://uniapp.dcloud.io/",
		  //title: that.share_goods_name?that.share_goods_name:'送心礼物分享',
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
		var share_goods_name = this.share_goods_name?this.share_goods_name:'送心礼物分享' ;
		var share_goods_image = this.share_goods_image?this.share_goods_image:'' ;
		var share_goods_id = this.share_goods_id?this.share_goods_id:0 ;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var miniprogram_id = this.miniprogram_id ;
		var shareImage = this.shareImage ;
		share_goods_image = share_goods_image?share_goods_image:shareImage
		//#ifdef APP-PLUS
		if(plus.os.name === 'iOS'){
			uni.share({
			  provider: 'weixin',
			  type: 5,
			  scene: 'WXSceneSession',
			  title: share_goods_name,
			  imageUrl:  share_goods_image, //'https://sendheart.dreamer-inc.com/uploads/goods_share_logo.png',
			  miniProgram: {
			          id: miniprogram_id,  // gh_aefe7ce896f6
			          path: 'pages/details/details?id='+share_goods_id+'&refername='+username,
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
		}else{
			uni.share({
			  provider: 'weixin',
			  type: 5,
			  scene: 'WXSceneSession',
			  title: share_goods_name,
			  imageUrl: share_goods_image + '?x-oss-process=image/resize,w_200',
			  miniProgram: {
			          id: miniprogram_id,  // gh_aefe7ce896f6
			          path: 'pages/details/details?id='+share_goods_id+'&refername='+username,
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
		}
		//#endif
	},
	
	shareToAppPush: function () { //APP推送
	 	var share_goods_name = this.share_goods_name?this.share_goods_name:'送心礼物分享' ;
		var share_goods_price = this.share_goods_price?this.share_goods_price:0
	 	var share_goods_id = this.share_goods_id?this.share_goods_id:0 ;
		var share_goods_org = this.share_goods_org? this.share_goods_org:4 ;
		var share_goods_shape = this.share_goods_shape? this.share_goods_shape:1 ;
		var share_goods_image = this.share_goods_image?this.share_goods_image:'';
		var share_live_id = this.share_live_id?this.share_live_id:0 ;
		var share_live_name = this.share_live_name?this.share_live_name:'' ;
	 	var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var share_goods_title = this.share_goods_title
		var payload = '/pages/details/details?id=' + share_goods_id ;
		if(share_live_id>0) {
			payload = '/pages/uLive/subnvue/live?liveid=' + share_live_id ;
			share_goods_name = share_live_name
			share_goods_title = share_live_name
		}
		//+ '&goods_shape=' + share_goods_shape + '&goods_org=' + share_goods_org + '&goods_price=' + share_goods_price + '&name=' + share_goods_name + '&image=' + share_goods_image + '&token=' + token + '&username=' + username 
		uni.request({
		  url: weburl + '/api/app_client/app_push',
		  method: 'POST',
		  data: {
		    username: username,
		    access_token: token,
			title:share_goods_name,
			cid:'',
			content:share_goods_title,
		    payload: payload,
		    shop_type: shop_type
		  },
		  header: {
		    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		    'Accept': 'application/json'
		  },
		  success: function (res) {
		    console.log('shareToAppPush() : ', res.data);
			 if(res.data.status == 'y'){
				 uni.showToast({
				   title: 'APP推送完成'+share_goods_title+' '+share_live_id,
				   icon: 'none',
				   duration: 1000
				 });
			}else{
				uni.showToast({
				  title: res.data.info? res.data.info:'APP推送失败',
				  icon: 'success',
				  duration: 1000
				});
			}
			
		  }
		});
	 },
    //录音计时器
    recordingTimer: function () {
      var that = this; //将计时器赋值给setInter

      that.setInter = setInterval(function () {
        var time = that.recordingTimeqwe + 1;
        that.setData({
          recordingTimeqwe: time
        });
      }, 1000);
    },
	share_cancel:function(type) {
		this.$refs[type].close()
	},
	share_to(e) {
		console.log('share_to:',e.text,e.name)
		var that = this
		var share_name = e.name
		switch (share_name) {
			case 'wxfriend':  //微信好友
				this.shareToWXminiProgram() ;
				break
			case 'wxcomm'://微信朋友圈
				this.shareToWXSenceTimeline() ;
				break
			case 'appshare'://微信朋友圈
				this.shareToAppPush() ;
				break	
		}
	},
    formSubmit: function (e) {
      var that = this;
      var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name;
      console.log('formSubmit() formID：', formId, ' form name:', form_name);

      if (form_name == 'eventSave') {
        that.eventSave();
      }else if(form_name == 'onShare'){
		 // that.shareAction();
		 that.share_type="bottom" ;
		 that.$refs['share'].open()
	  }

      if (formId) that.submintFromId(formId);
    },
    //提交formId，让服务器保存到数据库里
    submintFromId: function (formId) {
      var that = this;
      var formId = formId;
      var shop_type = that.shop_type;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      uni.request({
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
    goBack: function () {
      var that = this;
      var pages = getCurrentPages();

      if (pages.length > 1 && that.share_order_shape != 5 && that.share_order_shape != 4) {
        uni.navigateBack({
          changed: true
        }); //返回上一页
      } else if (that.share_order_shape == 5 || that.share_order_shape == 4) {
        uni.switchTab({
          url: '../../index/index'
        });
      } else {
        uni.switchTab({
          url: '../../hall/hall'
        });
      }
    },
    get_project_gift_para: function () {
      var that = this;
      var navList_new = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : [{}];
      var shop_type = that.shop_type;
      console.log('wishshare get_project_gift_para navList2:', navList2);

      if (navList2.length == 0) {
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
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log('get_project_gift_para:', res.data.result);
            var navList_new = res.data.result;

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
                wechat_share: navList_new[5]['img']
              });
            }
          }
        });
      } else {
        that.setData({
          navList2: navList_new,
          wechat_share: navList_new[5]['img']
        });
      }
    },
    startRecode: function () {
      var that = this;
      uni.getSetting({
        success(res) {
          var authMap = res.authSetting;
          var length = Object.keys(authMap).length;
          console.log("authMap info 长度:" + length, authMap);

          if (authMap.hasOwnProperty('scope.record')) {
            if (!res.authSetting['scope.record']) {
              uni.showModal({
                title: '用户未授权',
                content: '请授权录音权限',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定授权录音权限');
                    uni.openSetting({
                      success: function success(res) {
                        console.log('openSetting success', res.authSetting);
                      }
                    });
                  }
                }
              });
            }
          }
        }

      });
      that.setData({
        shutRecordingdis: "block",
        openRecordingdis: "none"
      });
      uni.showLoading({
        title: '录音中'
      }); //开始录音计时   

      that.recordingTimer(); //开始录音

      recorderManager.start(options);
      recorderManager.onStart(() => {
        console.log('开始录音');
      }); //错误回调

      recorderManager.onError(res => {
        console.log('错误回调:', res);
      });
    },
    endRecode: function () {
      //结束录音 
      var that = this;
      var goods_id = that.share_goods_id;
      recorderManager.stop();
      recorderManager.onStop(res => {
        console.log('停止录音', res.tempFilePath);
        that.setData({
          shutRecordingdis: "none",
          openRecordingdis: "block"
        });
        that.current_voice = res.tempFilePath, uni.hideLoading(); //结束录音计时  

        clearInterval(that.setInter);
        myaudio.src = res.tempFilePath;
        myaudio.autoplay = true;
        that.save_recorder(res.tempFilePath);
      });
    },
    save_recorder: function (voice) {
      var that = this;
      var goods_id = that.share_goods_id;
      var urls = uploadurl;
      uni.uploadFile({
        url: uploadurl,
        filePath: voice,
        name: 'wechat_upimg',
        formData: {
          latitude: encodeURI(0.0),
          longitude: encodeURI(0.0),
          restaurant_id: encodeURI(0),
          city: encodeURI('杭州'),
          prov: encodeURI('浙江'),
          name: encodeURI(goods_id) // 名称

        },
        success: function (res) {
          var retinfo = JSON.parse(res.data.trim());
          var new_rec_url = '';

          if (retinfo['status'] == "y") {
            new_rec_url = retinfo['result']['img_url'];
            that.setData({
              new_rec_url: new_rec_url
            }); //wx.setStorageSync('cardvoice', new_rec_url)
            //wx.setStorageSync('cardvoicetime', that.data.recordingTimeqwe)

            /*
            wx.showToast({
              title: '录音上传完成',
              icon: 'none',
              duration: 1000,
            })
            */

            console.log('录音上传完成', voice, new_rec_url);
            that.update_order_note();
          } else {
            uni.showToast({
              title: '录音上传返回失败',
              icon: 'none',
              duration: 1000
            });
            console.log('录音上传返回失败', voice, new_rec_url);
          }
        }
      });
    },
    play_rec: function () {
      var that = this;
      var goods_id = that.share_goods_id;
      var order_voice = that.order_voice;
      var voice_url = that.voice_url;

      if (that.current_voice) {
        myaudio.src = that.current_voice;
        myaudio.play();
      } else if (order_voice) {
        myaudio.src = order_voice;
        myaudio.play();
      } else if (voice_url) {
        uni.downloadFile({
          url: new_rec_url,
          //音频文件url                  
          success: res => {
            if (res.statusCode === 200) {
              myaudio.src = res.tempFilePath;
              myaudio.play();
              console.log('录音播放完成', res.tempFilePath);
            }
          }
        });
      } else {
        uni.showToast({
          title: '暂无录音',
          icon: 'none',
          duration: 1000
        });
      }
    },
    update_order_note: function () {
      var that = this;
      var username =uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var share_order_id = that.share_order_id;
      var share_order_note = that.share_order_note;
      var share_order_shape = that.share_order_shape;
      var new_rec_url = that.new_rec_url ? that.new_rec_url : that.voice_url;
      var cardvoicetime = that.recordingTimeqwe ? that.recordingTimeqwe : that.cardvoicetime;
      uni.request({
        url: weburl + '/api/client/update_order_note',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          order_id: share_order_id,
          rcv_note: share_order_note,
          order_shape: share_order_shape,
          order_voice: new_rec_url,
          order_voicetime: cardvoicetime
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('wishshare 修改订单信息完成:', res.data.result);
          var order_data = res.data.result;

          if (res.data.status == 'n') {
            uni.showToast({
              title: res.data.info,
              icon: 'none',
              duration: 2000
            });
          }
        }
      });
    },
    reloadData: function () {
      var that = this;
      var options = uni.getStorageSync('wishshare_options');
      var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : 0;
      var task = options.task ? options.task : 0;
      var task_image = options.image ? options.image : '';
      var msg_id = options.msg_id ? options.msg_id : '';
      var activity_id = options.activity_id ? options.activity_id : 0;
      var activity_name = options.activity_name ? options.activity_name : 0;
      var activity_image = options.activity_image ? options.activity_image : '';
      var activity_headimg = options.activity_headimg ? options.activity_headimg : that.activity_avatarUrl;
      var share_activity_title = options.share_activity_title ? options.share_activity_title : '这个地方真不错~';
      var share_goods_id = options.share_goods_id ? options.share_goods_id : 0;
      var share_goods_name = options.share_goods_name ? options.share_goods_name : '';
      var share_goods_org = options.share_goods_org ? options.share_goods_org : '1'; //5虚拟商品 1自营商品
	  var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
      var share_goods_shape = options.share_goods_shape ? options.share_goods_shape : '1'; //5贺卡请柬 4互动卡 1普通商品
	  var qr_type  = 'wishshare';
      var share_goods_price = options.share_goods_price ? options.share_goods_price : 0;
      var share_goods_image = options.share_goods_image ? options.share_goods_image : '';
      var share_goods_image2 = options.share_goods_image2 ? options.share_goods_image2 : '';
      var share_goods_qrcode_cache = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&share_goods_id=' + share_goods_id + '&m_id=' + m_id;;
      var share_goods_wx_headimg = options.share_goods_wx_headimg ? options.share_goods_wx_headimg : that.share_goods_avatarUrl;
      var share_goods_default_title = '';
		that.image_save(share_goods_wx_headimg,'share_goods_wx_headimg')
		that.image_save(share_goods_image,'share_goods_image')
      if (share_goods_shape == 5) {
        share_goods_default_title = '平安是福';
      } else if (share_goods_shape == 4) {
        share_goods_default_title = '一起来吧';
      } else {
        share_goods_default_title = '这个礼物真不错，来看看吧，要是你能送我就更好了~';
      }

      var share_goods_title = options.share_goods_title ? options.share_goods_title : share_goods_default_title;
      var share_goods_desc = options.share_goods_desc ? options.share_goods_desc : '送礼就是送心~';
      var share_art_id = options.share_art_id ? options.share_art_id : 0;
      var share_art_cat_id = options.share_art_cat_id ? options.share_art_cat_id : 0;
      var share_art_title = options.share_art_title ? options.share_art_title : '';
      var share_art_image = options.share_art_image ? options.share_art_image : '';
      var share_art_wx_headimg = options.share_art_wx_headimg ? options.share_art_wx_headimg : '';
      var share_order_id = options.share_order_id ? options.share_order_id : 0;
      var share_order_note = options.share_order_note ? options.share_order_note : '';
      var share_order_shape = options.share_order_shape ? options.share_order_shape : '1';
      var share_order_bg = options.share_order_bg ? options.share_order_bg : '';
      var share_order_image = options.share_order_image ? options.share_order_image : '';
      var share_order_wx_headimg = options.share_order_wx_headimg ? options.share_order_wx_headimg : that.avatarUrl;
      
	  var share_live_id = options.liveid ? options.liveid : '0'
	  var share_live_name = options.liveroom_name ? options.liveroom_name : ''
	  var share_live_logo = options.liveroom_logo ? options.liveroom_logo : ''
	  var share_live_wx_headimg = options.share_live_wx_headimg ? options.share_live_wx_headimg : '';
	  console.log('wish/wishshare reloadData() options:', options, 'share_order_wx_headimg:', share_order_wx_headimg, ' share_goods_wx_headimg:', that.share_goods_wx_headimg, 'share_goods_id:', share_goods_id, '');
		if(share_order_wx_headimg){
			if (share_order_wx_headimg.indexOf("https://wx.qlogo.cn") >= 0) {
			  share_order_wx_headimg = share_order_wx_headimg.replace('https://wx.qlogo.cn', weburl + '/qlogo');
			} 
		}
     
	  //var cardvoice = wx.getStorageSync('cardvoice')
      //var cardvoicetime = wx.getStorageSync('cardvoicetime')
		that.m_id = m_id
		that.task = task
		that.task_image = task_image
		that.msg_id = msg_id
		that.activity_id = activity_id
		that.activity_name = activity_name
		that.activity_image = activity_image
		that.activity_headimg = activity_headimg
		that.share_art_id = share_art_id
		that.share_art_cat_id = share_art_cat_id
		that.share_art_title = share_art_title
		that.share_art_image = share_art_image
		that.share_art_wx_headimg = share_art_wx_headimg
		that.share_goods_id = share_goods_id
		that.share_goods_price = share_goods_price
		that.share_goods_name = share_goods_name
		that.share_goods_org = share_goods_org
		that.share_goods_shape = share_goods_shape
		that.share_goods_image = share_goods_image
		that.share_goods_image2 = share_goods_image2
		that.share_goods_title = activity_id > 0 ? share_activity_title : share_goods_title
		that.share_goods_wx_headimg = share_goods_wx_headimg
		that.share_goods_desc = share_goods_desc
		that.share_goods_qrcode_cache = share_goods_qrcode_cache
		that.qr_type = qr_type
	    that.share_order_shape = share_order_shape
		that.share_order_id = share_order_id
		that.share_order_note = share_order_note
		that.share_order_bg = share_order_bg
		that.share_order_image = share_order_image
		that.share_order_wx_headimg = share_order_wx_headimg
		that.nickname = userInfo.nickname
		that.share_live_id = share_live_id 
		that.share_live_name = share_live_name 
		that.share_live_logo = share_live_logo 
	  
      if (activity_name) {
        var title_len = activity_name.length;

        if (title_len > 13) {
          uni.setNavigationBarTitle({
            title: activity_name.substring(0, 10) + '...'
          });
        } else {
          uni.setNavigationBarTitle({
            title: activity_name
          });
        }
      }
		setTimeout(function () {
		  that.share_image_creat();
		}, 300);
       
    },
    bindTextAreaBlur: function (e) {
      var that = this;
      var share_order_shape = that.share_order_shape;

      if (share_order_shape == 5 || share_order_shape == 4) {
		  that.share_order_note = e.detail.value 
      } else {
		  that.share_goods_title =  e.detail.value
      }
    },
    sharegoods: function () {
      var that = this;
	  var share_order_shape = that.share_order_shape + 0;
      if (share_order_shape == 4) return;
	  that.share_type = 'center' ;
	  that.notehidden = !that.notehidden ;
   
    },
    share_image_creat: function () {
      var that = this;
      var share_order_shape = that.share_order_shape + 0;
      var activity_id = that.activity_id + 0;
      var share_goods_id = that.share_goods_id + 0;
	  var share_live_id = that.share_live_id + 0;
      uni.showToast({
        title: share_order_shape == 5 || share_order_shape == 4 ? "加载中" : "开始生成海报",
        icon: 'loading',
        duration: 1500
      });
      console.log('share_image_creat share_goods_id:', share_goods_id, ' share_live_id:', share_live_id);

      if (share_goods_id > 0 || activity_id > 0 || share_order_shape > 0|| share_live_id > 0) {
        that.eventDraw();
        that.setData({
          loadingHidden: false
        });
      } else {
        setTimeout(function () {
          that.setData({
            loadingHidden: true
          });
          that.share_image_creat();
        }, 1200);
      }
    },
    //确定按钮点击事件 
    shareConfirm: function () {
      var that = this;
      that.setData({
        notehidden: !that.notehidden,
        hidden_share: !that.hidden_share
      });
      that.share_image_creat();
      that.get_project_gift_para();
    },
    //取消按钮点击事件  
    shareCandel: function () {
      var that = this;
      that.setData({
        notehidden: !that.notehidden
      });
    },
	image_save: function (image_url, image_cache_name) {
	  var that = this;
	  console.log('imge save image url:', image_url, 'image_cache_name:', image_cache_name);
	  uni.downloadFile({
	  	url: image_url,
	  	success: (res) => {
	  		console.log('wish/wishshare image_save() downloadFile success image_url: ',image_url,' res is', res)
	  		var img_tempFilePath = res.tempFilePath;
			/*
			uni.saveFile({
				tempFilePath: img_tempFilePath,
				success: (res) => {
					//this.savedFilePath = res.savedFilePath;
					uni.setStorageSync(image_cache_name, res.savedFilePath);
				},
				fail: (res) => {
					 
				}
			})
			*/
			return img_tempFilePath
	  	},
	  	fail: (err) => {
	  		console.log('downloadFile fail, err is:', err)
	  	}
	  })
	},
	
	eventDraw: function () {
		var that = this;
		var m_id = that.m_id;
		var wechat_share = that.wechat_share ? that.wechat_share : that.task_image;
		var shop_type = that.shop_type;
		var qr_type = that.qr_type?that.qr_type:'wishshare';
		var task = that.task;
		var msg_id = that.msg_id;
		var activity_id = that.activity_id ? that.activity_id : 0;
		var activity_image = that.activity_image ? that.activity_image : that.activity_share_image;
		var activity_name = that.activity_name;
		var share_activity_title = that.share_activity_title;
		var share_goods_id = that.share_goods_id ? that.share_goods_id : 0;
		var share_goods_bg = that.share_goods_bg;
		var share_goods_name = that.share_goods_name ? that.share_goods_name : '';
		var share_goods_price = that.share_goods_price ? that.share_goods_price : 0;
		var share_goods_image = that.share_goods_image ? that.share_goods_image : '';
		var share_goods_qrcode = that.share_goods_qrcode_cache ? that.share_goods_qrcode_cache : weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&share_goods_id=' + share_goods_id + '&m_id=' + m_id;
		var share_goods_wx_headimg = that.share_goods_wx_headimg!='undefined'&&that.share_goods_wx_headimg ? that.share_goods_wx_headimg:that.share_goods_avatarUrl; // 
		var share_goods_title = that.share_goods_title;
		var share_goods_desc = that.share_goods_desc;
		var nickname = that.nickname?that.nickname:'朋友';
		var share_art_id = that.share_art_id ? that.share_art_id : 0;
		var share_art_cat_id = that.share_art_cat_id ? that.share_art_cat_id : 0;
		var share_art_title = that.share_art_title ? that.share_art_title : '';
		var share_art_image = that.share_art_image ? that.share_art_image : '';
		var share_art_wx_headimg = that.share_art_wx_headimg ? that.share_art_wx_headimg : that.avatarUrl;
		var share_art_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&share_art_id=' + share_art_id + '&share_art_cat_id=' + share_art_cat_id + '&m_id=' + m_id;
		var share_order_id = that.share_order_id ? that.share_order_id : 0;
		var share_order_note = that.share_order_note?that.share_order_note:share_goods_title;
		var share_order_shape = that.share_order_shape;
		var share_order_bg = that.share_order_bg;
		var card_register_info = that.card_register_info; //shape:4 互动卡 

		var card_name_info = that.card_name_info; //shape:4 互动卡 名片内容

		var card_love_info = that.card_love_info; //shape:4 互动卡 爱心卡内容

		var card_cele_info = that.card_cele_info; //shape:5 贺卡请柬 

		var card_template = that.card_template; //shape:4 互动卡 名片模板

		var card_type = that.card_type ? that.card_type : 0; //var card_color = that.data.card_color //贺卡请柬文字颜色

		var share_order_wx_headimg = that.share_order_wx_headimg;
		var share_order_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&share_order_id=' + share_order_id + '&share_order_shape=' + share_order_shape + '&m_id=' + m_id;
	
		var share_live_id = that.share_live_id
		var share_live_name = that.share_live_name
		var share_live_logo = that.share_live_logo
		var share_live_wx_headimg = that.share_live_wx_headimg ? that.share_live_wx_headimg : that.avatarUrl;
		var share_live_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&share_live_id=' + share_live_id + '&m_id=' + m_id;
			
		/*
	  wx.showLoading({
        title: '生成中' //mask: true
      });
	   */
      console.log('wishshare eventDraw share_order_shape:', share_order_shape, ' card_name_info:', card_name_info,' share_live_id:',share_live_id);

      if (activity_id > 0) {
        console.log('activity_id:', activity_id);
        that.painting = {
            width: 500,
            height: 700,
            windowHeight: that.windowHeight,
            windowWidth: that.windowWidth,
            clear: true,
            background: 'white',
            views: [{
              type: 'image',
              url: that.activity_headimg,
              top: 8,
              left: 10,
              width: 50,
              height: 50,
              radius: 25
            }, {
              type: 'text',
              content: nickname + '在' + activity_name,
              fontSize: 16,
              color: '#999',
              textAlign: 'left',
              top: 20,
              left: 70,
              bolder: true
            }, {
              type: 'image',
              url: activity_image,
              top: 70,
              left: 0,
              width: 700,
              height: 400
            }, {
              type: 'text',
              content: '长按识别二维码查看具体位置',
              fontSize: 18,
              color: '#333',
              textAlign: 'left',
              top: 480,
              left: 125 //lineHeight: 20,
              //MaxLineNumber: 2,
              //breakWord: true,
              //width: 700

            }, {
              type: 'image',
              url: weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&activity_id=' + activity_id,
              top: 520,
              left: 180,
              width: 125,
              height: 125
            }]
          }
      } else if (share_goods_id) {
        console.log('wish/wishshare eventDraw() share_goods_id:'+ share_goods_id+' share_goods_wx_headimg:'+share_goods_wx_headimg+' share_goods_qrcode:'+share_goods_qrcode+' share_goods_image:'+share_goods_image)
		that.painting = {
            width: 360,
            height: 600,
            //windowHeight: 550,
            //windowWidth: 1000,
            clear: true,
            background: '#fff',
            views: [
			  {
              type: 'image',
              url: share_goods_bg,
              top: 0,
              left: 0,
              width: 360,
              height: 600
            }, 
			{
              type: 'image',
              url: share_goods_wx_headimg,
              top: 30,
              left: 20,
              width: 32,
              height: 32,
              radius: 16
            },
			{
              type: 'text',
              content: '来自' + nickname + '的分享',
              fontSize: 18,
              color: '#333',
              textAlign: 'left',
              top: 40,
              left: 60,
              bolder: false
            }, {
              type: 'image',
              url: share_goods_image,
              top: 80,
              left: 60,
              width: 240,
              height: share_goods_price > 0 ? 234 : 240
            }, {
              type: 'text',
              content: share_goods_name,
              fontSize: 14,
              color: '#333',
              textAlign: 'left',
              top: share_goods_price > 0 ?320 : 350,
              left: 56,
              bolder: true,
              lineHeight: 25,
              MaxLineNumber: 2,
              breakWord: true,
              width: 240
            }, {
              type: 'text',
              content: share_goods_price > 0 ? '￥' + share_goods_price : '',
              fontSize: 16,
              color: '#444444',
              textAlign: 'left',
              top: share_goods_price > 0 ? 370 : 400,
              left: 56,
              lineHeight: 25
            }, {
              type: 'text',
              content: 'Ta说:',
              fontSize: 16,
              color: '#444',
              textAlign: 'left',
              top: share_goods_price > 0 ? 400 : 400,
              left: 56,
			  lineHeight: 20,
			  MaxLineNumber: 2,
			  breakWord: true,
              bolder: true
            }, {
              type: 'text',
              content: share_order_note,
              fontSize: 13,
              color: '#666',
              textAlign: 'left',
              top: share_goods_price > 0 ? 430 : 430,
              left: 56,
              lineHeight: 25,
              MaxLineNumber: 2,
              breakWord: true,
              width: 254
            }, {
              type: 'rect',
              top: 480,
              left: 56,
              background: '#eeeeee',
              width: 280,
              height: 1
            }, {
              type: 'text',
              content: '长按识别二维码查看详情',
              fontSize: 16,
              color: '#333',
              textAlign: 'left',
              top: 490,
              left: 56,
              breakWord: false,
              bolder: true
            }, {
              type: 'text',
              content: '送心礼物，开启礼物社交时代!',
              fontSize: 13,
              color: '#999',
              textAlign: 'left',
              top: 520,
              left: 56,
              breakWord: false
            }, {
              type: 'image',
              url: share_goods_qrcode,
              top: 485,
              left: 260,
              width: 60,
              height: 60
            }]
		}
        
      } else if (share_order_shape == 4 && card_register_info && share_goods_id == 0) {
        //互动卡
        console.log('share_order_shape:', share_order_shape);
        var views_width = 370;
        var views_height = 500;
        var views = [{
          type: 'image',
          url: share_order_bg,
          top: 5,
          left: 5,
          width: views_width,
          height: views_height
        }];

        for (var i = 0; i < card_template.length; i++) {
          var view_item = {};
          view_item['top'] = card_template[i]['y'] * views_height;
          view_item['left'] = card_template[i]['x'] * views_width;
          view_item['width'] = card_template[i]['width'] * views_width;
          view_item['height'] = card_template[i]['height'] * views_height;
          view_item['lineHeight'] = card_template[i]['height'] * views_height;

          if (card_template[i]['viewType'] == 1) {
            if (card_template[i]['typeId'] == 'card_register_adv') {
              view_item['type'] = 'image';
              view_item['url'] = card_register_info['card_register_adv'] ? card_register_info['card_register_adv'] : '';
              view_item['roundedRect'] = 10;
            }

            if (card_template[i]['typeId'] == 'card_register_logo' && card_register_info['has_shlogo']) {
              view_item['type'] = 'image';
              view_item['url'] = share_order_qrcode ? share_order_qrcode : '';
              view_item['width'] = 70;
              view_item['height'] = 70;
              view_item['radius'] = 35;
            }
          } else {
            view_item['type'] = 'text';
            view_item['fontSize'] = card_template[i]['styleSheet']['fontSize'];
            view_item['fontSize'] = parseInt(view_item['fontSize']) + 1;
            view_item['color'] = card_template[i]['color'] ? card_template[i]['color'] : '#333';
            view_item['textAlign'] = 'left';
            view_item['breakWord'] = false;

            if (card_template[i]['typeId'] == 'card_register_title') {
              view_item['content'] = card_register_info['card_register_title'] ? card_register_info['card_register_title'].trim() : '';
              view_item['left'] = view_item['left'];
            } else if (card_template[i]['typeId'] == 'card_register_content') {
              //console.log('share_order_shape', share_order_shape,' card_register_content:',card_register_info)
              view_item['MaxLineNumber'] = 6;
              view_item['breakWord'] = true;
              view_item['lineHeight'] = 32; //view_item['width'] = views_width

              view_item['content'] = card_register_info['card_register_content'] ? card_register_info['card_register_content'] : '';
            } else if (card_template[i]['typeId'] == 'card_register_ownername') {
              view_item['content'] = card_register_info['card_register_ownername'] ? '发起人:' + card_register_info['card_register_ownername'] : '';
            } else if (card_template[i]['typeId'] == 'card_register_ownerwechat') {
              view_item['content'] = card_register_info['card_register_ownerwechat'] ? '微信:' + card_register_info['card_register_ownerwechat'] : '';
            } else if (card_template[i]['typeId'] == 'card_register_addr') {
              view_item['MaxLineNumber'] = 2;
              view_item['breakWord'] = true;
              view_item['lineHeight'] = 25;
              view_item['content'] = card_register_info['card_register_addr'] ? '地址:' + card_register_info['card_register_addr'] : '';
            } else if (card_template[i]['typeId'] == 'card_register_lim') {
              view_item['content'] = card_register_info['card_register_lim'] > 0 ? '人数:' + card_register_info['card_register_lim'] : '人数:不限制';
            } else if (card_template[i]['typeId'] == 'card_register_fee') {
              view_item['content'] = card_register_info['card_register_fee'] > 0 ? '费用:￥' + card_register_info['card_register_fee'] : '费用:免费';
            } else if (card_template[i]['typeId'] == 'register_start_date' && card_register_info['has_registerdue']) {
              view_item['content'] = card_register_info['register_start_date'] ? '注册：' + card_register_info['register_start_date'] + ' ' : '';
            } else if (card_template[i]['typeId'] == 'register_start_time' && card_register_info['has_registerdue']) {
              view_item['content'] = card_register_info['register_start_time'] ? card_register_info['register_start_time'] : '';
            } else if (card_template[i]['typeId'] == 'register_end_date' && card_register_info['has_registerdue']) {
              view_item['content'] = card_register_info['register_end_date'] ? card_register_info['register_end_date'] : '';
            } else if (card_template[i]['typeId'] == 'register_end_time' && card_register_info['has_registerdue']) {
              view_item['content'] = card_register_info['register_end_time'] ? card_register_info['register_end_time'] : '';
            } else if (card_template[i]['typeId'] == 'action_start_date' && card_register_info['has_actiondue']) {
              view_item['content'] = card_register_info['action_start_date'] ? '活动：' + card_register_info['action_start_date'] + ' ' : '';
            } else if (card_template[i]['typeId'] == 'action_start_time' && card_register_info['has_actiondue']) {
              view_item['content'] = card_register_info['action_start_time'] ? card_register_info['action_start_time'] : '';
            } else if (card_template[i]['typeId'] == 'action_end_date' && card_register_info['has_actiondue']) {
              view_item['content'] = card_register_info['action_end_date'] ? card_register_info['action_end_date'] : '';
            } else if (card_template[i]['typeId'] == 'action_end_time' && card_register_info['has_actiondue']) {
              view_item['content'] = card_register_info['action_end_time'] ? card_register_info['action_end_time'] : '';
            } //view_item['fontSize'] = view_item['fontSize'] < 15 ? 15 : view_item['fontSize']
          }

          views = views.concat(view_item);
        }

        that.setData({
          painting: {
            width: views_width,
            height: views_height,
            windowHeight: that.windowHeight,
            windowWidth: that.windowWidth,
            clear: true,
            background: 'white',
            views: views
          }
        });
      } else if (share_order_shape == 4 && card_name_info && share_goods_id == 0) {
        //互动卡 名片
        var views_width = 370;
        var views_height = 200;
        /*
        wx.getImageInfo({
          src: share_order_bg,
          success: function (res) {
            views_width = res.width
            views_height = res.height  
          }
        })  
        */

        var views = [
			/*{
          type: 'image',
          url: share_goods_bg,
          top: 0,
          left: 10,
          width: views_width,
          height: views_height
        }, */{
          type: 'image',
          url: share_order_bg,
          top: 5,
          left: 5,
          width: views_width - 10,
          height: views_height - 10
        }];

        for (var i = 0; i < card_template.length; i++) {
          var view_item = {};
          view_item['top'] = card_template[i]['y'] * views_height;
          view_item['left'] = card_template[i]['x'] * views_width;
          view_item['width'] = card_template[i]['width'] * views_width;
          view_item['height'] = card_template[i]['height'] * views_height;
          view_item['lineHeight'] = card_template[i]['height'] * views_height;

          if (card_template[i]['viewType'] == 1) {
            if (card_template[i]['typeId'] == 'card_logo' && card_name_info['card_name_logo_image']) {
              view_item['type'] = 'image';
              view_item['url'] = card_name_info['card_name_logo_image'] ? card_name_info['card_name_logo_image'] : '';
              view_item['width'] = 60;
              view_item['height'] = 60;
            }

            if (card_template[i]['typeId'] == 'card_qrcode' && card_name_info['has_shlogo']) {
              view_item['type'] = 'image';
              view_item['url'] = share_order_qrcode ? share_order_qrcode : '';
              view_item['width'] = 40;
              view_item['height'] = 40;
              view_item['radius'] = 20;
            }
          } else {
            view_item['type'] = 'text';
            view_item['fontSize'] = card_template[i]['styleSheet']['fontSize'];
            view_item['fontSize'] = parseInt(view_item['fontSize']) + 0;
            view_item['color'] = card_template[i]['color'] ? card_template[i]['color'] : '#333';
            view_item['textAlign'] = 'left';
            view_item['breakWord'] = false;

            if (card_template[i]['typeId'] == 'card_name') {
              view_item['content'] = card_name_info['card_name_name'] ? card_name_info['card_name_name'].trim() : '';
              view_item['left'] = view_item['left']; //+ 5 * (10 - view_item['content'].length)

              
            } else if (card_template[i]['typeId'] == 'card_title') {
              view_item['content'] = card_name_info['card_name_title'] ? card_name_info['card_name_title'] : '';
            } else if (card_template[i]['typeId'] == 'card_phone') {
              view_item['content'] = card_name_info['card_name_phone'] ? card_name_info['card_name_phone'] : '';
            } else if (card_template[i]['typeId'] == 'card_tel') {
              view_item['content'] = card_name_info['card_name_tel'] ? card_name_info['card_name_tel'] : '';
            } else if (card_template[i]['typeId'] == 'card_email') {
              view_item['content'] = card_name_info['card_name_email'] ? card_name_info['card_name_email'] : '';
            } else if (card_template[i]['typeId'] == 'card_weburl') {
              view_item['content'] = card_name_info['card_name_website'] ? card_name_info['card_name_website'] : '';
            } else if (card_template[i]['typeId'] == 'card_publicwechat') {
              view_item['content'] = card_name_info['card_name_publicwechat'] ? card_name_info['card_name_publicwechat'] : '';
            } else if (card_template[i]['typeId'] == 'card_companyname') {
              view_item['content'] = card_name_info['card_name_company'] ? card_name_info['card_name_company'] : '';
            } else if (card_template[i]['typeId'] == 'card_addr') {
              view_item['MaxLineNumber'] = 2;
              view_item['breakWord'] = true;
              view_item['lineHeight'] = 25;
              view_item['content'] = card_name_info['card_name_addr'] ? card_name_info['card_name_addr'] : '';
            }
          }

          views = views.concat(view_item);
        }
		that.painting = {
            width: views_width,
            height: views_height,
            windowHeight: that.windowHeight,
            windowWidth: that.windowWidth,
            clear: true,
            background: 'white',
            views: views
		}
		console.log('名片 share_order_shape views:',views);
      } else if (share_order_shape == 4 && card_love_info && share_goods_id == 0) {
        //互动卡 爱心卡
        var views_width = 500;
        var views_height = 700;
        console.log('share_order_shape:', share_order_shape, ' card_template:', card_template, 'share_order_bg:', share_order_bg);
        var views = [{
          type: 'image',
          url: share_order_bg,
          top: 5,
          left: 5,
          width: views_width,
          height: views_height
        }];

        for (var i = 0; i < card_template.length; i++) {
          var view_item = {};
          view_item['top'] = card_template[i]['y'] * views_height;
          view_item['left'] = card_template[i]['x'] * views_width;
          view_item['width'] = card_template[i]['width'] * views_width;
          view_item['height'] = card_template[i]['height'] * views_height;
          view_item['lineHeight'] = card_template[i]['height'] * views_height;

          if (card_template[i]['viewType'] == 1) {
            if (card_template[i]['typeId'] == 'card_love_logo' && card_love_info['card_love_logo']) {
              view_item['type'] = 'image';
              view_item['url'] = card_love_info['card_love_logo'] ? card_love_info['card_love_logo'] : ''; //view_item['width'] = 80
              //view_item['height'] = 80
            }

            if (card_template[i]['typeId'] == 'card_love_qrcode' && card_love_info['has_shlogo']) {
              view_item['type'] = 'image';
              view_item['url'] = share_order_qrcode ? share_order_qrcode : '';
              view_item['width'] = 70;
              view_item['height'] = 70;
              view_item['radius'] = 35;
            }
          } else {
            view_item['type'] = 'text';
            view_item['fontSize'] = card_template[i]['styleSheet']['fontSize'];
            view_item['fontSize'] = parseInt(view_item['fontSize']) + 8;
            view_item['color'] = card_template[i]['color'] ? card_template[i]['color'] : '#333';
            view_item['textAlign'] = 'left';
            view_item['breakWord'] = false;

            if (card_template[i]['typeId'] == 'card_love_title') {
              view_item['content'] = card_love_info['card_love_title'] ? card_love_info['card_love_title'].trim() : '';
              view_item['left'] = view_item['left']; //+ 5 * (10 - view_item['content'].length)

              console.log('share_order_shape length:');
            } else if (card_template[i]['typeId'] == 'card_love_related') {
              view_item['content'] = card_love_info['card_love_related'] ? card_love_info['card_love_related'] : '';
            } else if (card_template[i]['typeId'] == 'card_love_phone') {
              view_item['content'] = card_love_info['card_love_phone'] ? '电话:' + card_love_info['card_love_phone'] : '';
            } else if (card_template[i]['typeId'] == 'card_love_addr') {
              view_item['MaxLineNumber'] = 2;
              view_item['breakWord'] = true;
              view_item['lineHeight'] = 25;
              view_item['content'] = card_love_info['card_love_addr'] ? '地址:' + card_love_info['card_love_addr'] : '';
            } else if (card_template[i]['typeId'] == 'card_love_content') {
              view_item['MaxLineNumber'] = 6;
              view_item['breakWord'] = true;
              view_item['lineHeight'] = 30;
              view_item['content'] = card_love_info['card_love_content'] ? card_love_info['card_love_content'] : '';
            }
          }

          views = views.concat(view_item);
        }

        that.setData({
          painting: {
            width: views_width,
            height: views_height,
            windowHeight: that.windowHeight,
            windowWidth: that.windowWidth,
            clear: true,
            background: 'white',
            views: views
          }
        });
      } else if ((share_order_shape == 5 || card_type == 10) && share_goods_id == 0) {
        //贺卡请柬
        console.log('share_order_shape:', share_order_shape, ' card_template:', card_template); //var views_width = that.data.windowWidth

        var views_width = 500;
        var views_height = 700;
        /*
        wx.getImageInfo({
          src: share_order_bg,
          success: function (res) {
            views_width = res.width
            views_height = res.height  
          }
        })  
        */

        var views = [{
          type: 'image',
          url: share_order_bg,
          top: 5,
          left: 5,
          width: views_width,
          height: views_height
        }];

        for (var i = 0; i < card_template.length; i++) {
          var view_item = {};
          view_item['top'] = card_template[i]['y'] * views_height;
          view_item['left'] = card_template[i]['x'] * views_width;
          view_item['width'] = card_template[i]['width'] * views_width;
          view_item['height'] = card_template[i]['height'] * views_height;
          view_item['lineHeight'] = card_template[i]['height'] * views_height;

          if (card_template[i]['viewType'] == 1) {
            if (card_template[i]['typeId'] == 'card_cele_logo') {
              view_item['type'] = 'image';
              view_item['url'] = card_cele_info['card_cele_logo'] ? card_cele_info['card_cele_logo'] : '';
              view_item['roundedRect'] = 10;
            }

            if (card_template[i]['typeId'] == 'card_cele_qrcode' && card_cele_info['has_shlogo']) {
              view_item['type'] = 'image';
              view_item['url'] = share_order_qrcode ? share_order_qrcode : '';
              view_item['width'] = 80;
              view_item['height'] = 80;
              view_item['radius'] = 40;
            }
          } else {
            view_item['type'] = 'text';
            view_item['textAlign'] = 'left';
            view_item['fontSize'] = card_template[i]['styleSheet']['fontSize'];
            view_item['fontSize'] = parseInt(view_item['fontSize']) + 8;
            view_item['color'] = card_template[i]['color'] ? card_template[i]['color'] : '#333';
            view_item['breakWord'] = false;

            if (card_template[i]['typeId'] == 'card_cele_title') {
              view_item['textAlign'] = 'right';
              view_item['content'] = card_cele_info['card_cele_title'] ? card_cele_info['card_cele_title'].trim() : ''; //view_item['left'] = view_item['left']  //+ 5 * (10 - view_item['content'].length)
            } else if (card_template[i]['typeId'] == 'card_cele_content') {
              view_item['MaxLineNumber'] = 6;
              view_item['breakWord'] = true;
              view_item['lineHeight'] = 25;
              view_item['content'] = card_cele_info['card_cele_content'] ? card_cele_info['card_cele_content'] : '';
            }

            console.log('share_order_shape card cele card_template:', card_template[i]);
          }

          views = views.concat(view_item);
        }

        that.setData({
          painting: {
            width: views_width,
            height: views_height,
            windowHeight: that.windowHeight,
            windowWidth: that.windowWidth,
            clear: true,
            background: 'white',
            views: views
          }
        });
      } else if (share_art_id > 0) {
        console.log('share_art_id:', share_art_id);
        that.setData({
          painting: {
            width: 520,
            height: 680,
            windowHeight: that.windowHeight,
            windowWidth: that.windowWidth,
            clear: true,
            background: 'white',
            views: [{
              type: 'image',
              url: share_art_wx_headimg,
              top: 45,
              left: 30,
              width: 50,
              height: 50,
              borderRadius: 25
            }, {
              type: 'text',
              content: '来自' + nickname + '的分享',
              fontSize: 18,
              color: '#333',
              textAlign: 'left',
              top: 60,
              left: 90,
              bolder: false
            }, {
              type: 'image',
              url: share_art_image,
              top: 120,
              left: 85,
              width: 350,
              height: 350
            }, {
              type: 'text',
              content: share_art_title,
              fontSize: 20,
              color: '#999',
              textAlign: 'left',
              top: 500,
              left: 85,
              bolder: true,
              lineHeight: 25,
              MaxLineNumber: 2,
              breakWord: true,
              width: 350
            }, {
              type: 'rect',
              top: 540,
              left: 85,
              background: '#eeeeee',
              width: 350,
              height: 1
            }, {
              type: 'text',
              content: '长按识别二维码查看详情',
              fontSize: 18,
              color: '#333',
              textAlign: 'left',
              top: 590,
              left: 85,
              breakWord: false,
              bolder: true
            }, {
              type: 'image',
              url: share_art_qrcode,
              top: 550,
              left: 330,
              width: 90,
              height: 90
            }]
          }
        })
	  } else if (share_live_id > 0) {
		  console.log('share_live_id:', share_live_id);
		  that.setData({
		    painting: {
		      width: 360,
		      height: 510,
		      windowHeight: that.windowHeight,
		      windowWidth: that.windowWidth,
		      clear: true,
		      background: 'white',
		      views: [
			  {
				type: 'image',
				url: share_goods_bg,
				top: 0,
				left: 0,
				width: 360,
				height: 510
			  }, {
		        type: 'image',
		        url: share_live_logo,
				top: 80,
				left: 60,
				width: 240,
		        height: 240
		      },  {
              type: 'text',
              content: share_live_name,
              fontSize: 14,
              color: '#333',
              textAlign: 'left',
              top: 350,
              left: 56,
              bolder: true,
              lineHeight: 25,
              MaxLineNumber: 2,
              breakWord: true,
              width: 240
            },  {
              type: 'rect',
              top: 400,
              left: 56,
              background: '#eeeeee',
              width: 280,
              height: 1
            }, {
              type: 'text',
              content: '长按识别二维码查看详情',
              fontSize: 16,
              color: '#333',
              textAlign: 'left',
              top: 410,
              left: 56,
              breakWord: false,
              bolder: true
            }, {
              type: 'text',
              content: '送心礼物，开启礼物社交时代!',
              fontSize: 13,
              color: '#999',
              textAlign: 'left',
              top: 440,
              left: 56,
              breakWord: false
            }, {
              type: 'image',
              url: share_live_qrcode,
              top: 405,
              left: 260,
              width: 60,
              height: 60
            }]
		    }
		  });
      } else {
        console.log('其他 else');
        that.setData({
          painting: {
            width: 375,
            height: 667,
            windowHeight: that.windowHeight,
            windowWidth: that.windowWidth,
            background: 'white',
            clear: true,
            views: [{
          type: 'image',
          url: share_goods_bg,
          top: 0,
          left: 10,
          width: 375,
          height: 667
        }, {
              type: 'image',
              url: wechat_share,
              top: 10,
              left: 10,
              width: 365,
              height: 657
            },
            /*
            {
             type: 'image',
             url: weburl+'/uploads/gift_logo.png',
             top: 27.5,
             left: 29,
             width: 55,
             height: 55
            },
                       {
             type: 'text',
             content: '您的好友【kuckboy】',
             fontSize: 16,
             color: '#402D16',
             textAlign: 'left',
             top: 33,
             left: 96,
             bolder: true
            },
            */
            {
              type: 'image',
              url: weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&task=' + task + '&msg_id=' + msg_id,
              top: 480,
              left: 130,
              width: 110,
              height: 125
            }, {
              type: 'text',
              content: '长按识别二维码，进入送心小程序',
              fontSize: 12,
              color: '#FFF',
              textAlign: 'left',
              top: 620,
              left: 95,
              lineHeight: 30,
              MaxLineNumber: 2,
              breakWord: true //width: 150

            }]
          }
        });
      }

      console.log('二维码 paint:', that.painting);
      that.setData({
        loadingHidden: false
      });
	  /*
	  wx.navigateTo({
	  	url: '/pages/API/canvas/canvas?posterData=' + JSON.stringify(that.painting) 
	  });
	   
	 */
	  that.paintingData = that.painting;
	 // that.ctx && that.ctx.clearActions();
	  if (!that.isPainting) {
	      if (that.paintingData.width && that.paintingData.height) {
	          that.isPainting = true;
			  that.reset() ;
	          try {
	              that.readyPigment();
	          }
	          catch(err) {
				  console.log('err:',err)
	  		uni.showModal({
	  			title: '系统错误',
	  			content: JSON.stringify(err.TypeError)
	  			}) 
	          }
	      }
	  }
	
    },
	
    eventSave: function () {
		/*
      wx.getSetting({
        success(res) {
          var authMap = res.authSetting;
          var length = Object.keys(authMap).length;
          console.log("authMap info 长度:" + length, authMap);

          if (authMap.hasOwnProperty('scope.writePhotosAlbum')) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.showModal({
                title: '用户未授权',
                content: '请授权保存相册权限',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定授权保存相册权限');
                    wx.openSetting({
                      success: function success(res) {
                        console.log('openSetting success', res.authSetting);
                      }
                    });
                  }
                }
              });
            }
          }
        }

      });
	  */
      uni.saveImageToPhotosAlbum({
        filePath: this.shareImage,
        success(res) {
          uni.showToast({
            title: '图片已保存到相册，赶紧晒一下吧~',
            icon: 'none',
            duration: 1500
          });
		  this.isSaveImageToPhotosAlbum = true;
        }

      });
    },
	/*
    eventGetImage: function (event) {
		let that = this
      //console.log(event)
      console.log('wishshare 画布eventGetImage:', event);
      const {
        tempFilePath,
        errMsg
      } = event;
	 
	  that.shareImage = tempFilePath
      if (errMsg === 'canvasdrawer:ok') {  
        //wx.hideLoading();
      }
    },
	*/
	readyPigment: function () {
	    const { width, height, views, background, radius = 0 } = this.paintingData;
	    this.width = width;
	    this.height = height;
		//const { width, height, views, background, radius = 0 } = this.posterData;
		 
		for (let i = 0; i < views.length; i++) {
			//console.log('wish/wishshare readyPigment()  views:',views[i],' i:',i) ;
		    if (views[i].type === 'image') {
		        //let _img = views[i].url;
		        let _views = views[i];
		        let drawData = {};
				 
		        drawData = {
		            ..._views,
		        }
				//console.log('wish/wishshare readyPigment() drawData:',drawData,' i:',i) ;
		        this.drawImage(drawData);
				
		    } else if (views[i].type === 'text') {
				 this.drawText(views[i]);
		    } else if (views[i].type === 'rect') {
		        this.drawRect(views[i]);
		    } else if (views[i].type === 'round') {
		        this.drawRound(views[i]);
		    }
		}
		
		this.ctx.draw(true, () => {
		    this.toTempFilePath();
		})
		 
	  // this.getImageList(views)
	},
	toTempFilePath: function() {
		let that = this
		 setTimeout(function() {
			uni.canvasToTempFilePath({
				canvasId: 'canvasdrawer',
				success: function(res) {
				//console.log(res.tempFilePath)
					that.shareImage = res.tempFilePath
					that.isPainting = false
					//wx.hideLoading();
				 /*
				uni.showModal({
				    title: '临时保存',
				    content: 'draw isPainting:'+ that.isPainting
				}) 
				 */
				},
				fail: function(err) {
					/*
					uni.showModal({
						title: '临时保存失败',
						content: 'draw error:'+ JSON.stringify(err)
					}) 
					*/
					//wx.hideLoading();
					console.error('toTempFilePath error:'+JSON.stringify(err))
				}
			},this)
		}, 2000);
 
		
	},
	getImageList: function (views) {
	    const imageList = [];
	    for (let i = 0; i < views.length; i++) {
	        if (views[i].type === 'image') {
				imageList.push(views[i].url);
				//console.log(' views image:',views[i])
	        }
	    }
	    this.imageList = imageList;
		this.downLoadImages(0);
	},
	downLoadImages: function (index) {
	    const imageList = this.imageList;
	    const tempFileList = this.tempFileList;
	    if (index < imageList.length) {
	        this.getImageInfo(imageList[index]).then(imgInfo => {
				tempFileList.push(imgInfo)
				console.log('wish/wishshare downLoadImages() 图片临时文件imgInfo:',imgInfo)
				this.tempFileList = tempFileList;
				this.downLoadImages(index + 1);
	        })
	    } else {
			console.log('图片临时文件tempFileList:',tempFileList,' image list:',imageList)
	        this.startPainting();
	    }
	},
	tailorImageDraw: function (view, imgInfo) {
	    // _views.tailor == 'center'
	    let px = 1;
	    let wMultiple = (view.width * px) / imgInfo.originWidth;
	    let hMultiple = (view.height * px) / imgInfo.originHeight;
	    let sizeNormal = false;
	    if (wMultiple <= 1 && hMultiple <= 1) {
	        let multiple = wMultiple > hMultiple ? wMultiple : hMultiple;
	        // let tempW = imgInfo.originWidth * multiple;
	        // let tempH = imgInfo.originHeight * multiple;
	        let tempW = (view.width * px) / multiple;
	        let tempH = (view.height * px) / multiple;
	        let sx = (imgInfo.originWidth - tempW) / 2;
	        let sy = (imgInfo.originHeight - tempH) / 2;
	        let ex = sx + tempW;
	        let ey = sy + tempH;
	        view['sx'] = sx || 0;
	        view['sy'] = sy || 0;
	        view['ex'] = ex || 0;
	        view['ey'] = ey || 0;
	        sizeNormal = true;
	    }
	    const data = {
	        ...view,
	        ow: imgInfo.originWidth,
	        oh: imgInfo.originHeight
	    };
	    // console.log(JSON.stringify(data));
	    if (!sizeNormal) {
	        delete data.tailor;
	    }
	    // this.drawImage(data);
	    return data;
	},
 
	startPainting: function () {
	    const { tempFileList, paintingData: { views } } = this;
	    for (let i = 0, imageIndex = 0; i < views.length; i++) {
	        if (views[i].type === 'image') {
	            let _img = tempFileList[imageIndex];
	            let _views = views[i];
	            let drawData = {};
	            if (_views.tailor) {
	                _views = this.tailorImageDraw(_views, _img);
	            }
				if(_img) _views['url'] = _img.localPath ;
	            drawData = {
	                ..._views,
	               // url: _img.localPath
	            };
				if(_views['url']) this.drawImage(drawData);
	            // if (_views.radius) {
	            //     this.drawRoundRect(drawData);
	            // }
	            // else {
	            // }
	            imageIndex++;
				
	        } else if (views[i].type === 'text') {
				 this.drawText(views[i]);
	        } else if (views[i].type === 'rect') {
	            this.drawRect(views[i]);
	        }
	        else if (views[i].type === 'round') {
	            this.drawRound(views[i]);
	        }
	    }
		 
	    this.ctx.draw(true, () => {
	        uni.setStorageSync('CACHE_KEYS', this.cache);
	        this.saveImageToLocal();
	    })
	 
	},
	 
	_drawRadiusRect: function (params) {
	    const {
	        top = 0,
	        left = 0,
	        width = 0,
	        height = 0,
	        radius = 0,
			background='#fff',
	     } = params;
	    let x = left;
	    let y = top;
	    let w = width;
	    let h = height;
	    let bgc = background;
	    let r = radius;
	    // let br = radius;
	    this.ctx.beginPath();
	    this.ctx.moveTo(x + r, y);    // 移动到左上角的点
	    this.ctx.lineTo(x + w - r, y);
	    this.ctx.arc(x + w - r, y + r, r, 2 * Math.PI * (3 / 4), 2 * Math.PI * (4 / 4));
	    this.ctx.lineTo(x + w, y + h - r);
	    this.ctx.arc(x + w - r, y + h - r, r, 0, 2 * Math.PI * (1 / 4));
	    this.ctx.lineTo(x + r, y + h);
	    this.ctx.arc(x + r, y + h - r, r, 2 * Math.PI * (1 / 4), 2 * Math.PI * (2 / 4));
	    this.ctx.lineTo((x), (y + r));
	    this.ctx.arc(x + r, y + r, r, 2 * Math.PI * (2 / 4), 2 * Math.PI * (3 / 4));
	
	    // this.ctx.moveTo(x + r, y);
	    // this.ctx.arcTo(x + w, y, x + w, y + h, r);
	    // this.ctx.arcTo(x + w, y + h, x, y + h, r);
	    // this.ctx.arcTo(x, y + h, x, y, r);
	    // this.ctx.arcTo(x, y, x + w, y, r);
	},
	drawImage: function (params) {
	    const {
	        type = '',
	        background,
	        top = 0,
	        left = 0,
	        width = 0,
	        height = 0,
	        radius = 0,
	        url = '',
	        sx = 0,
	        sy = 0,
	        ex = 0,
	        ey = 0
	    } = params;
		//console.log('wishshare drawImage params:',params);
		 
	    let x = left;
	    let y = top;
	    let w = width;
	    let h = height;
	    let r = radius;
	    this.ctx.save();
	    if (radius) {
	        this.ctx.beginPath();
	        // if (radius === parseInt(width / 2)) {
	        //     console.log('圆');
	        //     this.ctx.beginPath();
	        //     this.ctx.arc(left + radius, top + radius, radius, 0, 2 * Math.PI);
	        //     this.ctx.setFillStyle(params.background || '#ffffff')
	        //     this.ctx.fill()
	        //     this.ctx.clip();
	        //     this.ctx.drawImage(url, x, y, w, h);
	        // }
	        // else {
	        // }
	        this._drawRadiusRect(params);
	        this.ctx.fill();
	        this.ctx.clip();
	    }
	    if ('tailor' in params) {
			if(url){
				 this.ctx.drawImage(url, sx, sy, ex, ey, left, top, width, height);
			}else{
				uni.showModal({
				    title: 'tailor图片文件不存在',
				    content: 'draw url:'+ url
				}) 
			}
	    } else {
			if(url){
				 this.ctx.drawImage(url, left, top, width, height);
				 console.log('wish/wishshare drawImage() url:',url, left, top, width, height);
			}else{
				uni.showModal({
				    title: '图片文件不存在',
				    content: 'draw url:'+ url
				}) 
			}
	       
	    }
	    this.ctx.restore();
	},
	
	drawText: function (params) {
	    let {
	        MaxLineNumber = 2,
	        breakWord = false,
	        color = 'black',
	        content = '',
	        fontSize = 16,
	        top = 0,
	        left = 0,
	        lineHeight = 20,
	        textAlign = 'left',
	        width,
	        bolder = false,
	        textDecoration = 'none'
	    } = params;
	    if (bolder) {
	        top -= 0.3;
	    }
	    // this.ctx.save();
	    // this.ctx.beginPath();
	    // this.ctx.stroke();
	    let _setStyle = () => {
	        // this.ctx.save();
	        this.ctx.closePath();
	        this.ctx.beginPath();
	        this.ctx.setTextBaseline('top');
	        this.ctx.setFillStyle(color);
	        this.ctx.setFontSize(fontSize);
	        this.ctx.setTextAlign(textAlign);
	    }
	    _setStyle();
	    if (!breakWord) {
	        this.ctx.fillText(content, left, top);
	        this.drawTextLine(left, top, textDecoration, color, fontSize, content);
	    } else {
	        let fillText = '';
	        let fillTop = top;
	        let lineNum = 1;
			let len = 0;  
	        for (let i = 0; i < content.length; i++) {
				len += content[i].match(/[^\x00-\xff]/ig)?2:1   //计算汉字和字母的宽度
	            fillText += [content[i]];
	            // _setStyle();
	            if ((len+3)*uni.upx2px(fontSize) > width) { //uni-app APP端measureText bug 规避 measureText方法好像已经取消了 this.ctx.measureText(fillText).width> width || 
	                if (lineNum === MaxLineNumber) {
	                    if (i !== content.length) {
	                        fillText = fillText.substring(0, fillText.length - 1) + '...';
	                        // _setStyle();
	                        this.ctx.fillText(fillText, left, fillTop);
	                        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
	                        fillText = '';
	                        break;
	                    }
	                }
	                // _setStyle();
	                this.ctx.fillText(fillText, left, fillTop);
	                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
	                fillText = '';
					len = 0 ;
	                fillTop += lineHeight;
	                lineNum++;
	            }
	        }
	        // _setStyle();
	        this.ctx.fillText(fillText, left, fillTop);
	        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
	    }
	    // this.ctx.draw();
	    if (bolder) {
	        this.drawText({
	            ...params,
	            left: left - 0.3,
	            top: top,
	            bolder: false,
	            textDecoration: 'none'
	        });
	    }
	},
	drawTextLine: function (left, top, textDecoration, color, fontSize, content) {
		var len = content.match(/[^\x00-\xff]/ig)?2:1   //计算汉字和字母的宽度
		var content_width = (len+3)*uni.upx2px(fontSize)
	    if (textDecoration === 'underline') {
	        this.drawRect({
	            background: color,
	            top: top + fontSize * 1.2,
	            left: left - 1,
	            width: content_width + 2,
	            height: 1
	        });
	    } else if (textDecoration === 'line-through') {
	        this.drawRect({
	            background: color,
	            top: top + fontSize * 0.6,
	            left: left - 1,
	            width: content_width + 2,
	            height: 1
	        });
	    }
	},
	reset: function() {
		this.ctx.beginPath()
		this.ctx.setFillStyle('#000000')
		this.ctx.setStrokeStyle('#000000')
		this.ctx.setFontSize(10)
		this.ctx.setGlobalAlpha(1)
		this.ctx.setShadow(0, 0, 0, 'rgba(0, 0, 0, 0)')
		this.ctx.setLineCap('butt')
		this.ctx.setLineJoin('miter')
		this.ctx.setLineWidth(1)
		this.ctx.setMiterLimit(10)
		this.ctx.draw()
		
		this.ctx.setFillStyle('#000000')
		this.ctx.setStrokeStyle('#000000')
		this.ctx.setGlobalAlpha(1)
	},
	drawRect: function (params) {
	    // console.log(params)
	    const { background, top = 0, left = 0, width = 0, height = 0 } = params
	    this.ctx.save();
	    this.ctx.setFillStyle(background);
	    if (params.radius) {
	        this._drawRadiusRect(params);
	        this.ctx.fill();
	    }
	    else {
	        this.ctx.setFillStyle(background);
	        this.ctx.fillRect(left, top, width, height);
	    }
	    this.ctx.restore();
	},
	getImageInfo: function (url) {
	    return new Promise((resolve, reject) => {
	        /* 获得要在画布上绘制的图片 */
	        if (this.cache[url]) {
	            resolve(this.cache[url]);
	        } else {
	            const objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
	            if (objExp.test(url)) {
	                uni.getImageInfo({
	                    src: url,
	                    complete: res => {
	                        if (res.errMsg === 'getImageInfo:ok') {
	                            const img = {
	                                url,
	                                originWidth: res.width,
	                                originHeight: res.height,
	                                localPath: url //res.path
	                            };
	                            this.cache[url] = img;
								/*
								uni.showModal({
								    title: '图片保存本地',
								    content: 'saveImageToLocal'+res.width
								});
								*/
	                            // console.log(res);
	                            // resolve(res.path)
	                            resolve(img);
	                        } else {
	                            reject(new Error('getImageInfo fail'));
	                        }
	                    }
	                });
	            } else {
	                this.cache[url] = {
	                    url,
	                    originWidth: 0,
	                    originHeight: 0,
	                    localPath: url
	                };
	                resolve(url);
	            }
	        }
	    })
	},
	saveImageToLocal: function () {
	    const { width, height } = this;
		uni.canvasToTempFilePath({
		    x: 0,
		    y: 0,
		    width,
		    height,
		    canvasId: 'canvasdrawer',
		    success: res => {
		        if (res.errMsg === 'canvasToTempFilePath:ok') {
		            this.isPainting = false;
		            this.imageList = [];
		            this.tempFileList = [];
					this.shareImage = res.tempFilePath ;
					uni.hideLoading();
					/*
		            this.$emit('success', {
		                width,
		                height,
		                path: res.tempFilePath
		            });
					*/
				   /*
				   uni.showModal({
				       title: '图片保存本地完成',
				       content: 'isPainting:'+this.isPainting+' shareImage:'+this.shareImage
				   });
				   */
		        }
		    },
			fail: err => {
				uni.hideLoading();
				uni.showModal({
				    title: '图片保存本地失败',
				    content: 'saveImageToLocal'+err
				});
				
			}
		}, this);   
		/*
		setTimeout(function() {
			           
		}, 2000);
		*/
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
@import "./wishshare.css";
</style>