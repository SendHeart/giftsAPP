<template>
<view class="wrap__giftPanel" v-if="showGiftView">
	<view class="wrapgift-mask" @tap="close"></view>
	<scroll-view class="wrapgift-body">
		<view class="wrap_giftlist">
			<view class="gift-head" @tap.stop="close">
				<!--
				<view class="gift-menu">
					<text class="gm-item gm-item-on">分享</text>
				</view>
				-->
				<view class="gift-coins" >
					<text class="iconfont gc-coin" style="border-radius: 50%;border-style: fixed;" @tap.stop="close">&#xe69f;</text>
				</view>
			</view>
			
			<swiper class="gift-swiper" :indicator-dots="false" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#999">
				<swiper-item v-for="(item,index) in giftList" :key="index">
				<view class="gift__cells">
					<block v-for="(item2,index2) in item.nodes" :key="index2">
						<view class="giftitem" @tap="share_to(item2)">
							<view class="giftitem-rect">
								<image class="giftimg" :src="item2.image" mode="aspectFill" />
							</view>
							<text class="giftname">{{item2.name}}</text>
							<!--
							<text class="giftcoin">{{item2.coin}}优播币</text>
							-->
						</view>
					</block>
				</view>
				</swiper-item>
			</swiper>
		</view>
	</scroll-view>
	</view>
</template>

<script>
	const giftJson = require('./mock-gift.js')
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
	export default {
		data() {
			return {
				miniprogram_id:miniprogram_id,
				showGiftView: false,
				giftList: giftJson,
				share_goods_name: "送心礼物直播",
				share_live_image: "",
				shareImage:  weburl + '/uploads/activity_share.jpg',
				shop_type: shop_type,
				liveroom_name:'送心礼物直播',
				liveroom_logo: weburl + '/uploads/activity_share.jpg',
				liveroom_goods:'',
				is_hoster:'',
			}
		},
		beforeCreate() {
			// #ifdef APP-PLUS
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
				fontFamily: "nvueIcon",
				'src': "url('../../../static/fonts/iconfont.ttf')"
			});
			// #endif
		},
		methods: {
			show(options) {
				var options = options?JSON.parse(options):'{}'
				var index = options.index?options.index:0
				this.liveid = options.liveid?options.liveid:3989
				this.liveroom_name = options.liveroom_name?options.liveroom_name:this.liveroom_name,
				this.liveroom_desc = options.liveroom_desc?options.liveroom_desc:this.liveroom_desc,
				this.liveroom_logo = options.liveroom_logo?options.liveroom_logo:this.liveroom_logo,
				this.liveroom_goods = options.liveroom_goods?options.liveroom_goods:this.liveroom_goods
				this.liveroom_poster = options.liveroom_poster?options.liveroom_poster:this.liveroom_poster
				this.is_hoster = options.is_hoster?options.is_hoster:this.is_hoster
				this.showGiftView = true
				console.log('live share options:',options)
			},
			close() {
				this.showGiftView = false
			},
			
			share_to(e) {
				console.log('share_to:',e.share_name)
				var that = this
				var share_name = e.share_name
				switch (share_name) {
					case 'wxfriend':  //微信好友
						this.shareToWXminiProgram() ;
						break
					case 'wxcomm'://微信朋友圈
						this.shareToWXSenceTimeline() ;
						break
				}
			},
			shareToWXSenceTimeline: function () { //分享到朋友圈
				var that = this 
				var liveroom_logo = that.liveroom_logo
				var liveroom_name = that.liveroom_name
				var liveroom_desc = that.liveroom_desc
				liveroom_name = liveroom_desc?liveroom_desc:liveroom_name
				var liveid = that.liveid
				uni.navigateTo({
					url: '/pages/wish/wishshare/wishshare?liveid=' + liveid + '&liveroom_name=' + liveroom_name+ '&liveroom_logo=' + liveroom_logo
				});
				
				return 
				//#ifdef APP-PLUS
				uni.share({
				  provider: 'weixin',
				  type: 2,
				  //href: "http://uniapp.dcloud.io/",
				  //title: that.share_goods_name?that.share_goods_name:'送心礼物分享',
				  scene: 'WXSenceTimeline', //WXSceneSession分享到聊天界面  WXSenceTimeline分享到朋友圈  WXSceneFavorite分享到微信收藏
				  imageUrl: liveroom_logo,
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
				var liveid = this.liveid?this.liveid:0 
				var liveroom_name = this.liveroom_name?this.liveroom_name:'' ;
				var liveroom_logo = this.liveroom_logo?this.liveroom_logo:'' ;
				var liveroom_goods = this.liveroom_goods?this.liveroom_goods:'' ;
				var liveroom_poster = this.liveroom_poster?this.liveroom_poster:'' ;
				var liveroom_desc = this.liveroom_desc?this.liveroom_desc:'' ;
				
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				var miniprogram_id = this.miniprogram_id ;
				
				//#ifdef APP-PLUS
				if(plus.os.name === 'iOS'){
					uni.share({
					  provider: 'weixin',
					  type: 5,
					  scene: 'WXSceneSession',
					  title: liveroom_desc?liveroom_desc:liveroom_name,
					  imageUrl:  'https://sendheart.dreamer-inc.com/uploads/liveroom_share_logo.png',
					  miniProgram: {
					          id: miniprogram_id,  // gh_aefe7ce896f6
					          path: '/pages/hall/hall?liveid=' + liveid + '&live_goods=' + liveroom_goods + '&live_logo=' + liveroom_logo + '&live_poster=' + liveroom_poster + '&live_desc=' + liveroom_desc + '&refername=' + username,
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
					  title: liveroom_desc?liveroom_desc:liveroom_name,
					  imageUrl: liveroom_logo + '?x-oss-process=image/resize,w_200',
					  miniProgram: {
					          id: miniprogram_id,  // gh_aefe7ce896f6
					          path: '/pages/hall/hall?liveid=' + liveid + '&live_goods=' + liveroom_goods + '&live_logo=' + liveroom_logo + '&live_poster=' + liveroom_poster + '&live_desc=' + liveroom_desc + '&refername=' + username,
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
							    content: 'error:'+ JSON.stringify(err)
							}) 
					  }
					})
				}
				//#endif
			},
			
		}
	}
</script>

<style scoped>
.iconfont {
	font-family: nvueIcon;
}
.nlv_borT {
	border-color: #ebebeb; 
	border-style: solid; 
	border-top-width: 1upx; 
}
.wrapgift-mask {
	background-color: #000; 
	opacity: .1; 
	position: fixed; 
	left: 0; 
	right: 0; 
	top: 0; 
	bottom: 0; 
	z-index: 201910;
}
.wrapgift-body {
	overflow: hidden; 
	position: fixed; 
	bottom: 0; 
	left: 0; 
	right: 0; 
	z-index: 201911;
}
.gift-head {
	border-color: #FFFFFF; 
	border-style: solid; 
	border-bottom-width: 0upx;
	flex-direction: row; 
	justify-content: flex-end;
	align-items: center; 
	height: 100upx;
}
.gift-menu {
	flex:1; flex-direction: row;
}
.gm-item {
	color: #333; 
	font-size: 32upx; 
	margin-left: 40upx; 
	line-height: 100upx;
}
.gm-item-on {
	color: #fff; 
	border-color: #ff0f33; 
	border-style: solid; 
	border-bottom-width: 2px;
}
.gift-coins {
	color: #fff; font-size: 28upx; 
	flex-direction: row; 
	align-items: center; 
	padding-right: 30upx;
}
.gc-coin {
	color: #BBBBBB; 
	font-size: 15px;
}
.gc-num {
	color: #feb719; 
	font-size: 12px;
}.gc-recharge {
	color: #ff0f33;
	font-size:12px;
	margin-left: 30upx;
}
.wrap_giftlist {
	background-color: #FFFFFF; 
	border-top-left-radius: 12px; 
	border-top-right-radius: 12px; 
	height: 400upx; 
	position: relative;
}
.gift-swiper {
	flex: 1;
}
.gift__cells {
	flex-direction: row; 
	flex-wrap: wrap;
}
.giftitem {
	flex-direction: column; 
	align-items: center; 
	justify-content: center; 
	margin-top: 20upx; 
	width: 186upx;
}
.giftitem-rect {
	align-items: center; 
	justify-content: center; 
	height: 150upx; 
	width: 150upx; 
	position: relative;
}
.giftimg {
	height: 100upx; 
	width: 100upx;
	border-radius: 50%;
}
.giftname {
	color: #333; 
	font-size: 30upx;
}
.giftcoin {
	color: rgba(255,255,255,.3); 
	font-size: 22upx; 
	margin-top: 2px;
}
</style>
