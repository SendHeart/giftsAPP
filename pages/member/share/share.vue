<template>
<view>
<view :hidden="!hiddenqrcode" class="gifts-item">
  <!--
  <import src="../../common/hall_title.wxml" />
  <text class="desc" style=''>  
	  {{act_title==''?'开启礼物电商时代，200万人都在用的礼物小程序':act_title}}
  </text>
   <text>长按点击保存</text>
   -->
  <image class="share-image" :src="share_qrcode_image" mode="widthFix" @longtap="saveImg"></image>
  <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"></canvasdrawer>
</view>
<view class="sentbtn">
    <button @tap="shareAction">分享</button>
    <button @tap="eventSave">保存</button>
</view>
<!-- 底部分享弹窗 -->
	<uni-popup :show="sharehidden" :type="share_type" :custom="true" >
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

var util = require("utils/util.js");
import uniPopup from '@/components/uni-popup/uni-popup.vue'
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
var appid = getApp().globalData.appid;
var secret = getApp().globalData.secret;
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
var weburl = getApp().globalData.weburl;
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
      title_name: '二维码',
      title_logo: '/static/images/footer-icon-05.png',
	  shareImage:weburl+'/uploads/sendheart_appdown.png',
	  appdown_url:weburl + '/hall/appdown/index.html',
      weburl: weburl,
      appid: appid,
      secret: secret,
      openid: openid,
      shop_type: shop_type,
      hiddenqrcode: true,
      coupon_img: weburl + '/uploads/coupon_bg.jpg',
      //
      wechat_share: '',
      //优惠券分享背景
      navList2: navList2,
      qr_type: "",
      share_qrcode: "",
      painting: {},
      share_qrcode_image: "",
      username: "",
      act_id: "",
      act_title: "",
      coupons: "",
      coupons_json: "",
      coupons_name: "",
      coupons_id: "",
      coupons_type: "",
      coupons_flag: "",
      share_activity_qrcode_cache: "",
      share_coupon_qrcode_cache: "",
      share_member_qrcode_cache: "",
      windowHeight: "",
      windowWidth: "",
      dkheight: "",
      loadingHidden: false,
	  sharehidden:false,
	  share_type:"bottom",
	  miniprogram_id:miniprogram_id,
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
	  ]
    };
	},

	components: {
		canvasdrawer,
		uniPopup
	},
	props: {},
	
	onLoad: function (options) {
		var that = this;
		console.log('share options:', options);
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
		var hiddenqrcode = that.hiddenqrcode;
		var appid = that.appid;
		var secret = that.secret;
		var qr_type = options.qr_type ? options.qr_type : '';
		var act_id = options.act_id ? options.act_id : '';
		var act_title = options.act_title ? options.act_title : '';
		var coupons_json = options.coupons ? options.coupons : '';
		console.log('share coupons_json:', coupons_json);
		var coupons = coupons_json ? JSON.parse(coupons_json) : [{}];
		var coupons_name = coupons_json ? coupons['name'] : '';
		var coupons_id = coupons_json ? coupons['id'] : 0;
		var coupons_type = coupons_json ? coupons['type'] : 1;
		var coupons_flag = coupons_json ? coupons['flag'] : 0; //var share_activity_qrcode_cache = options.share_activity_qrcode_cache ? options.share_activity_qrcode_cache : ''
		//var share_coupon_qrcode_cache = options.share_coupon_qrcode_cache ? options.share_coupon_qrcode_cache : ''
		//var share_member_qrcode_cache = options.share_member_qrcode_cache ? options.share_member_qrcode_cache : ''

		var share_coupon_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&coupons_flag=' + coupons_flag + '&coupons_type=' + coupons_type + '&coupons_id=' + coupons_id + '&coupons=' + coupons_json;
		var share_activity_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&act_id=' + act_id;
		var share_member_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type;
		/*
		if (qr_type == 'membershare') {//that.image_save(share_member_qrcode, 'member_qrcode_cache_' + m_id)
		} else if (act_id) {//that.image_save(share_activity_qrcode, 'activity_qrcode_cache_' + act_id)
		}
		*/
		that.username = username
		that.appid = appid
		that.secret = secret
		that.qr_type = qr_type
		that.act_id = act_id
		that.act_title = act_title
		that.coupons = coupons
		that.coupons_json = coupons_json
		that.hiddenqrcode = true
		that.coupons_name = coupons_name
		that.coupons_id = coupons_id
		that.coupons_type = coupons_type
		that.coupons_flag = coupons_flag
		that.share_activity_qrcode_cache = share_activity_qrcode
		that.share_coupon_qrcode_cache = share_coupon_qrcode
		that.share_member_qrcode_cache = share_activity_qrcode
		that.isSaveImageToPhotosAlbum =false
		uni.getSystemInfo({
			success: function (res) {
		// console.log(res.model);
				if (res.model == 'iPhone X') {
					startBarHeight = 44;
				}
				that.windowHeight = res.windowHeight
				that.windowWidth = res.windowWidth
				that.dkheight = res.windowHeight - 10       
			}
		})
		that.get_project_gift_para();
    
		wx.showLoading({
			title: '开始生成分享码' //mask: true
		});
	 
		setTimeout(function () {
			that.loadingHidden = true  
			that.eventDraw();
		}, 2000); // that.eventDraw()
	},
	
	onShow: function () {
		var that = this;
		var pages = getCurrentPages();

		if (pages.length > 1) {
			that.title_logo = '../../../images/back.png'
		}
	},
	
	methods: {
	  /*
	shareToWeixin: function (scene) {
		uni.share({
		  provider: 'weixin',
		  type: 2,
		  title: '送心礼物分享',
		  scene: scene, //WXSceneSession分享到聊天界面  WXSenceTimeline分享到朋友圈  WXSceneFavorite分享到微信收藏
		  imageUrl: res.tempFilePaths[0],
		  success: (res) => {
		    console.log(res)
		    uni.showToast({
		      title: '分享成功！'
		    })
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
	*/
   share_cancel:function(type) {
	this.sharehidden = false
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
   			this.shareToAppPush()() ;
   			break	
   	}
   },
	shareAction() {
		var that = this 
		var itemList = ['微信朋友圈', '微信小程序']
		that.share_type="bottom" ;
		that.sharehidden = true
	},
	shareToWXSenceTimeline: function () { //分享到朋友圈
		var shareImage = this.shareImage
		var appdown_url = this.appdown_url
		if(!shareImage) return ;
		//#ifdef APP-PLUS
		uni.share({
		  provider: 'weixin',
		  type: 0,
		  href: appdown_url,
		  title: '送心礼物',
		  scene: 'WXSenceTimeline', //WXSceneSession分享到聊天界面  WXSenceTimeline分享到朋友圈  WXSceneFavorite分享到微信收藏
		  imageUrl: shareImage,
		  success: (res) => {
		    console.log(res)
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
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var miniprogram_id = that.miniprogram_id ;
		var shareImage = that.shareImage ;
		//#ifdef APP-PLUS
		if(plus.os.name === 'iOS'){
			uni.share({
			  provider: 'weixin',
			  type: 5,
			  scene: 'WXSceneSession',
			  title: '送心礼物',
			  imageUrl:  'https://sendheart.dreamer-inc.com/uploads/sendheart_appdown.png',
			  miniProgram: {
			          id: miniprogram_id,  // gh_aefe7ce896f6
			          path: 'pages/hall/hall?refername='+username,
			          type: 0,
			          webUrl: 'http://uniapp.dcloud.io'
			      },
			  success: (ret) => {
			    console.log(ret)
			
			  },
			  fail: (err) => {
			    console.log(err)
					uni.showModal({
					    title: '分享失败',
					    content: 'error:'+ JSON.stringify(err)+' miniprogram_id:'+miniprogram_id
					}) 
			  }
			})
		}else{
			uni.share({
			  provider: 'weixin',
			  type: 5,
			  scene: 'WXSceneSession',
			  title: '送心礼物',
			  imageUrl: shareImage + '?x-oss-process=image/resize,w_200',
			  miniProgram: {
			          id: miniprogram_id,  // gh_aefe7ce896f6
			          path: 'pages/hall/hall?refername='+username,
			          type: 0,
			          webUrl: 'http://uniapp.dcloud.io'
			      },
			  success: (ret) => {
			    console.log(ret)
			  },
			  fail: (err) => {
			    console.log(err)
					uni.showModal({
					    title: '分享失败',
					    content: 'error:'+ JSON.stringify(err)+' miniprogram_id:'+miniprogram_id
					}) 
			  }
			})
		}
		//#endif
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
        url: '../../my/index'
      });
    },
    image_save: function (image_url, image_cache_name) {
      var that = this;
      console.log('membershare imge save image url:', image_url, 'image_cache_name:', image_cache_name);
      wx.downloadFile({
        url: image_url,
        success: function (res) {
          if (res.statusCode === 200) {
            var img_tempFilePath = res.tempFilePath; // console.log('图片下载成功' + res.tempFilePath)
            
          } else {
            console.log('membershare image_save 响应失败', res.statusCode);
          }
        }
      });
    },
    get_project_gift_para: function () {
      var that = this;
      var page = that.page;
      var pagesize = that.pagesize;
      var navList_new = that.navList2;
      var shop_type = that.shop_type;
      console.log('share get_project_gift_para navList2:', navList2);

      if (!navList_new) {
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
            }
          }
        });
      }

      that.setData({
        navList2: navList_new //wechat_share: navList_new[6]['img2'],
        //coupon_img: navList_new[7]['img'],

      });
    },
    eventDraw: function () {
	// #ifdef APP-PLUS 
		var fontSize = 30
	// #endif 
	// #ifndef APP-PLUS 
		var fontSize = 20 
	// #endif 
      var that = this;
      var qrcode_width = 200;
      var qrcode_height = 230;
      var qrcode_left = 100;
      var qrtitle_left = 120;
      var qrcode_top = 60;
      var wechat_share = that.wechat_share;
      var shop_type = that.shop_type;
      var qr_type = that.qr_type ? that.qr_type : 'couponshare'; //

      var act_id = that.act_id ? that.act_id : ''; //

      var act_title = that.act_title ? that.act_title : '开启礼物电商时代'; //

      var coupons = that.coupons;
      var coupons_json = that.coupons_json;
      var coupons_id = that.coupons_id;
      var coupons_type = that.coupons_type;
      var coupons_flag = that.coupons_flag;
      var coupons_name = that.coupons_name;
      var share_activity_qrcode = that.share_activity_qrcode_cache ? that.share_activity_qrcode_cache : weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&coupons_flag=' + coupons_flag + '&coupons_type=' + coupons_type + '&coupons_id=' + coupons_id + '&coupons=' + coupons_json + '&act_id=' + act_id;
      var share_coupon_qrcode = that.share_coupon_qrcode_cache ? that.share_coupon_qrcode_cache : weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&coupons_flag=' + coupons_flag + '&coupons_type=' + coupons_type + '&coupons_id=' + coupons_id + '&coupons=' + coupons_json;
      var share_member_qrcode = that.share_member_qrcode_cache ? that.share_member_qrcode_cache : weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type;
      var share_qrcode = '';
      var qrtitle_len = act_title.length; //计算文字居中
	  var qrtitle_width = 0 ;
	  let len = 0; 
	 
		for (let i = 0; i < qrtitle_len; i++) {
			 len += act_title[i].match(/[^\x00-\xff]/ig)?2:1  
		}
      qrtitle_width = len*uni.upx2px(fontSize) > that.windowWidth?that.windowWidth:len*uni.upx2px(fontSize)
	  qrtitle_left = (that.windowWidth - qrtitle_width) / 2;
      /*画布宽度默认400*/

      if (act_id) {
        share_qrcode = share_activity_qrcode;
      } else if (coupons_id) {
        share_qrcode = share_coupon_qrcode;
		qrtitle_left = qrtitle_left;
		qrcode_width = 230;
		qrcode_height = 230;
		qrcode_left = 85;
		qrcode_top = 90;
      } else if (qr_type == 'membershare') {
        share_qrcode = share_member_qrcode;
        qrtitle_left = qrtitle_left;
        qrcode_width = 230;
        qrcode_height = 230;
        qrcode_left = 85;
        qrcode_top = 90;
      }

      console.log('member share eventDraw() title len:', act_title,' len:',len,qrtitle_left,that.windowWidth );
      that.setData({
        qr_type: qr_type,
        share_qrcode: share_qrcode
      });
      /*
      wx.showLoading({
        title: '生成优惠券扫码图片',
        mask: true
      })
      */

      console.log('扫码图片信息:', coupons, 'qr_type:', qr_type, 'windowWidth:', that.windowWidth, ' windowHeight', that.windowHeight);
      that.setData({
        painting: {
          width: 400,
          height: 350,
          windowHeight: that.windowHeight ? that.windowHeight : 400,
          windowWidth: that.windowWidth ? that.windowWidth : 200,
          clear: true,
          background: 'white',
          views: [{
            type: 'text',
            content: act_title,
            fontSize: fontSize,
            color: '#333',
            textAlign: 'left',
            top: 20,
            left: qrtitle_left,
            lineHeight: 30,
            MaxLineNumber: 2,
            breakWord: true,
            width:  that.windowWidth
          }, {
            type: 'image',
            url: share_qrcode,
            top: qrcode_top,
            left: qrcode_left,
            width: qrcode_width,
            height: qrcode_height
          }]
        }
      });
      console.log('二维码 paint:', that.painting);
    },
    eventSave: function () {
      wx.saveImageToPhotosAlbum({
        filePath: this.share_qrcode_image,
        success(res) {
          wx.showToast({
            title: '图片已保存到相册，赶紧晒一下吧~',
            icon: 'none',
            duration: 1500
          });
        }

      });
    },
    eventGetImage: function (event) {
      console.log('member share eventGetImage:', event);
      const {
        tempFilePath,
        errMsg
      } = event;

      if (errMsg === 'canvasdrawer:ok') {
        this.setData({
          share_qrcode_image: tempFilePath
        });
        wx.hideLoading();
      }
    },
    //保存图片
    saveImg: function (e) {
      var that = this;
      wx.showModal({
        title: '请确认',
        content: '保存相册',
        success: function (res) {
          if (res.confirm) {
            that.eventSave();
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
@import "./share.css";
</style>