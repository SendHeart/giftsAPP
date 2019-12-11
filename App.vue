<script>
	var wxToast = require("./toast/toast.vue");
	const weburl = 'https://sendheart.dreamer-inc.com';
	const wssurl = 'wss://sendheart.dreamer-inc.com';
	const face_licenseIDAndroid = 'sendheartAppFace-face-android' //百度人脸识别 licenseID
	const face_licenseIDIOS = 'sendheartAppFace-face-ios' //百度人脸识别 licenseID
	import Vue from 'vue'
    export default {
        onLaunch: function() {
            console.log('App Launch');
			var that = this//调用API从本地缓存中获取数据
			var weburl = that.$options.globalData.weburl
			var appid = that.$options.globalData.appid;
			var appsecret = that.$options.globalData.secret;
			var face_licenseIDAndroid = that.$options.globalData.face_licenseIDAndroid;
			var face_licenseIDIOS = that.$options.globalData.face_licenseIDIOS;
            // #ifdef APP-PLUS
            // 锁定屏幕方向
            plus.screen.lockOrientation('portrait-primary'); //锁定
            // 检测升级 整包升级
			var update_server = weburl+'/api/app_client/appupdate' ;
            uni.request({
                url: update_server, //检查更新的服务器地址
				method: 'POST',
                data: {
                    appid: plus.runtime.appid,
                    version: plus.runtime.version,
                    imei: plus.device.imei,
					platform:plus.os.name,
					type:0 , //0 整包升级
                },
				header: {
				  'Content-Type': 'application/x-www-form-urlencoded',
				  'Accept': 'application/json'
				},
                success: (res) => {
                    console.log('success', res);
					let ret = res.data.result ;
                    if (res.data.status='y' && ret.update_status=='1') {  //res.statusCode == 200 && 
                       // let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
                       let openUrl = ret.pkgUrl ;
						// 提醒用户更新
                        uni.showModal({
                            title: '更新提示',
                            content: ret.note ? ret.note : '是否选择更新',
                            success: (showResult) => {
                                if (showResult.confirm) {
                                    plus.runtime.openURL(openUrl);
                                }
                            }
                        })
                    }
                }
            })
			//检查wgt升级包
			uni.request({
				url: update_server, //检查更新的服务器地址
				method: 'POST',
				data: {
					appid: plus.runtime.appid,
					version: plus.runtime.version,
					imei: plus.device.imei,
					platform:plus.os.name,
					type:1 , //1 wgt包升级
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}, 
				success: (res) => {  
			        let ret = res.data.result ;
					if (res.data.status='y' && ret.update_status=='1') { 
						let wgtUrl = ret.wgtUrl
			            uni.downloadFile({  
			                url: wgtUrl,  
			                success: (downloadResult) => {  
			                    if (downloadResult.statusCode === 200) {  
			                        plus.runtime.install(downloadResult.tempFilePath, {  
			                            force: false  
			                        }, function() {  
			                            console.log('install success...');  
			                            plus.runtime.restart();  
			                        }, function(e) {  
			                            console.error('install fail...');  
									});  
								}  
							}  
						});  
					}  
				}  
			});  

            var domModule = weex.requireModule('dom');
            domModule.addRule('fontFace', {
                'fontFamily': "uniicons",
                'src': "url('./static/uni.ttf')"
            });
			let main = plus.android.runtimeMainActivity();
			//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
			plus.runtime.quit = function(){  
				main.moveTaskToBack(false);  
			};
			/*
			//重写toast方法如果内容为 ‘再按一次退出应用’ 就隐藏应用，其他正常toast  
			plus.nativeUI.toast = (function(str){  
			 if(str == '再按一次退出应用'){  
				main.moveTaskToBack(false);  
				return false;  
				}else{  
					uni.showToast({  
						title:str,  
						icon:'none',  
					})  
				}  
			});
			*/ 
            // #endif
			
			wx.setStorageSync('appid', appid);
			wx.setStorageSync('appsecret', appsecret);
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        },
		globalData: {
			test: '',
			appid: 'wx986f630cc3d1a7fc',
			//  小程序开发账号  wxe59fb5712b45adb7
			secret: 'add3c71b7907a7ce99722d0e9cbac7f1',
			//   9666f44dd87410cf85949f3a053dc14a
			md5_key:'9666f44dd87410cf85949f3a053dc14a',
			miniprogram_id:'gh_89f1da9a2991', //微信小程序原始ID
			weburl: weburl,
			//https://xcx.itoldfarmer.com
			wssurl: wssurl,
			uploadurl: 'https://sendheart.dreamer-inc.com/api/upload/index4',
			httpserviceurl: 'https://sendheart.dreamer-inc.com/api/upload/http_service',
			mapkey: 'SSPBZ-ALR32-4BWUC-CLUXY-HAFM3-3ABQF',
			mapkey2: 'BJFBZ-ZFTHW-Y2HRO-RL2UZ-M6EC3-GMF4U',
			openid: null,
			username: null,
			is_task: 0,
			is_receive: 0,
			has_sent: 0,
			wish_id: 0,
			order_no: '',
			order_id: '',
			goods_flag: 0,
			code: null,
			shop_type: 2,
			//礼物类应用
			messageflag: 0,
			//0任务 1系统消息 gotop
			hall_gotop: 0,
			//1 gotop 
			from_page: null,
			user_type: 0,
			navList2: [],
		}
    }
</script>

<style>
	 
	/* #ifndef APP-PLUS-NVUE */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
    @import './common/uni.css';
	
    page {
        background-color: #F4F5F6;
        height: 100%;
        font-size: 28upx;
        line-height: 1.8;
    }

    .uni-header-logo {
        padding: 30upx;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10upx;
    }

    .uni-header-image {
        width: 100px;
        height: 100px;
    }

    .uni-hello-text {
        color: #7A7E83;
    }

    .uni-hello-addfile {
        text-align: center;
        line-height: 300upx;
        background-color: #FFF;
        padding: 50upx;
        margin-top: 10px;
        font-size: 38upx;
        color: #808080;
    }

  /* #endif*/

  
</style>
