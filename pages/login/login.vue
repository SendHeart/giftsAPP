<template>
<view>
	<!--
	<uni-nav-bar :fixed="true" color="#1d1d1d" background-color="#1d1d1d" border="false" shadow="false" />
	<uni-nav-bar :fixed="true" color="#fff" background-color="#1d1d1d" border="false" shadow="false" left-icon="arrowleft" title="登录" @click-left="back" />
    -->
	<view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">手机号：</text>
                <m-input class="m-input" type="text" clearable focus v-model="account" :placeholder="username?username:'请输入手机号'"></m-input>
            </view>
            <view class="input-row" v-if="bypassword">
                <text class="title">密码：</text>
                <m-input type="password" displayable focus v-model="password" placeholder="请输入密码"></m-input>
            </view>
			
			<view class="input-row" v-if="!bypassword">
			    <text class="title">验证码：</text>
			    <m-input type="text" v-model="vcode" placeholder="请输入验证码"></m-input>
				<button class='cu-btn bg-green shadow'  @tap="getcode">验证码</button>
			</view>
        </view>
        <view class="btn-row">
            <button type="warn" class="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="action-row">
            <navigator url="../reg/reg">注册账号</navigator>
            <text>|</text>
            <navigator url="../pwd/pwd">忘记密码</navigator>
			<view  @tap="byscanface">
			<text>|</text>
			<text>刷脸</text> 
			</view>
			<view v-if="bypassword" @tap="bypasswd">
			<text>|</text>
			<text>验证码登录</text>
			</view> 
			<view v-if="!bypassword" @tap="bypasswd">
			<text>|</text>
			<text>密码登录</text> 
			</view>
        </view>
		<!--
        <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
            <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
                <image :src="provider.image" @tap="oauth(provider.value)"></image>
            </view>
        </view>
		-->
    </view>
</view>
</template>

<script>
	const lyBDFaceAuth = uni.requireNativePlugin('longyoung-BDFaceAuth');
	const lyBDFaceAuthIOS = uni.requireNativePlugin('longyoung-BDFaceAuth-iOS'); //ios
	var util = require("../../utils/util.js"); //获取应用实例
	var weburl = getApp().globalData.weburl;
	var shop_type = getApp().globalData.shop_type;
	var username = uni.getStorageSync('username');
	var md5_key = getApp().globalData.md5_key;
	var uploadurl = getApp().globalData.uploadurl;
	import permision from "@/common/permission.js"
	import uniIcons from '@/components/uni-icons/uni-icons.vue' ;
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue' ;
    import md5 from '../../utils/md5.js';
	import service from '../../service.js';
    import {
        mapState,
        mapMutations,
    } from 'vuex'
    import mInput from '../../components/m-input.vue'
	if(username){
		uni.navigateBack();
	}
	
    export default {
        components: {
            mInput,
			uniIcons,
			uniNavBar
        },
        data() {
            return {
				shop_type: shop_type,
				uploadurl: uploadurl,
				username:username,
                providerList: [],
                hasProvider: false,
				bypassword:true,
				byface:false,
                account: username,
                password: '',
                positionTop: 0,
				vcode:'',
				title: '',
				faceimage:'',
				faceimage64:'',
				faceurl:'',
				licenseIDStr: 'longyoung-face-android',
				
				face_items: [{
						value: 'Eye',
						name: '眨眨眼',
						checked: 'true'
					},
					{
						value: 'Mouth',
						name: '张张嘴',
						checked: 'true'
					},
					{
						value: 'HeadLeft',
						name: '向左转头',
						checked: 'true'
					},
					{
						value: 'HeadRight',
						name: '向右转头',
						checked: 'true'
					},
					{
						value: 'HeadLeftOrRight',
						name: '左右摇头',
						checked: 'true'
					},
					{
						value: 'HeadUp',
						name: '缓慢抬头',
						checked: 'true'
					},
					{
						value: 'HeadDown',
						name: '缓慢低头',
						checked: 'true'
					}
				],
				isLivenessRandom: 0,
				isSound: 1,
				txtColor: '#3987FD',
				bgColor: '#2F2F33',
				roundColor: '#3987FD',
				resultStr: "",
				imgBase64Str: ""
            }
        },
        computed: mapState(['forcedLogin']),
        methods: {
            ...mapMutations(['login']),
            initProvider() {
                const filters = ['weixin', 'qq', 'sinaweibo'];
                uni.getProvider({
                    service: 'oauth',
                    success: (res) => {
                        if (res.provider && res.provider.length) {
                            for (let i = 0; i < res.provider.length; i++) {
                                if (~filters.indexOf(res.provider[i])) {
                                    this.providerList.push({
                                        value: res.provider[i],
                                        image: '/static/' + res.provider[i] + '.png'
                                    });
                                }
                            }
                            this.hasProvider = true;
                        }
                    },
                    fail: (err) => {
                        console.error('获取服务供应商失败：' + JSON.stringify(err));
                    }
                });
            },
            initPosition() {
                /**
                 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
                 * 反向使用 top 进行定位，可以避免此问题。
                 */
                this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            },
            bindLogin() {
				var username = this.account?this.account:this.username
				this.byface = false
                if (!util.checkPhoneNumber(username)) {
                    uni.showToast({
                        icon: 'none',
                        title: '手机号格式错误:'+username
                    });
                    return;
                }
                if (this.password.length < 6 && this.bypassword) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
				if (!this.vcode && !this.bypassword) {
				    uni.showToast({
				        icon: 'none',
				        title: '验证码不能为空'
				    });
				    return;
				}
				this.my_login()
               /*
                const data = {
                    account: this.account,
                    password: this.password
                };
                const validUser = service.getUsers().some(function (user) {
                    return data.account === user.account && data.password === user.password;
                });
                if (validUser) {
                    this.toMain(this.account);
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '用户账号或密码不正确',
                    });
                }
				*/
            },
            oauth(value) {
                uni.login({
                    provider: value,
                    success: (res) => {
                        uni.getUserInfo({
                            provider: value,
                            success: (infoRes) => {
                                /**
                                 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                                 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                                 */
                                //this.toMain(infoRes.userInfo.nickName);
								this.my_login()
                            }
                        });
                    },
                    fail: (err) => {
                        console.error('授权登录失败：' + JSON.stringify(err));
                    }
                });
            },
			my_login() {
			  var that = this
			  var openid = uni.getStorageSync('openid');
			  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			  var user_phone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : '';
			  var user_name = uni.getStorageSync('user_name') ? uni.getStorageSync('user_name') : '';
			  var userInfo = uni.getStorageSync('userInfo');
			  var nickname = that.nickname?that.nickname:userInfo.nickname
			  var avatarUrl = that.avatarUrl?that.avatarUrl:userInfo.avatarUrl
			  var userauth = uni.getStorageSync('userauth');
			  var faceurl = that.faceurl ;
			  var faceimage64 = that.faceimage64 ;
			  var byface = that.byface ;
			  var bypassword = that.bypassword
			  var url = bypassword?weburl + '/api/web/user/login/user_login':weburl + '/api/web/user/login/user_xcx_login'
			  url = byface?weburl + '/api/web/user/login/user_xcx_login':url;
			  var clientinfo = '' ;
			  //#ifdef APP-PLUS
				clientinfo = plus.push.getClientInfo() ; //用户推送信息
			  //#endif
			  var username = that.account?that.account:that.username
			  var vcode = that.vcode
			  var password = that.password
			  var md5password = md5(that.password,md5_key,true)
			  var bypassword = that.bypassword
			  var login_type = bypassword?1:0
			  login_type = byface?2:login_type
			  uni.request({
			    url: url,
			    method: 'POST',
			    data: {
			      username: username,
				  password:	password,
				  md5password:md5password,
			      wx_nickname:nickname,
			      wx_headimg: avatarUrl,
			      user_phone: user_phone,
			      user_name: user_name,
			      login_type: login_type,
				  smscode:vcode,
				  faceimage64:faceimage64,
			      type: 8,
			      shop_type: shop_type,
				  clientinfo:JSON.stringify(clientinfo),
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      'Accept': 'application/json'
			    },
			    success: function (res) {
				  if(res.data.status == 'y'){
					  uni.showToast({
					  	 icon: 'none',
					  	 title:byface?'刷脸登录成功':'登录成功',
					  });
					  
					var member_info = res.data.result ;
					var userInfo = {
						nickname:member_info.wx_nickname,
						avatarUrl:member_info.wx_headimg,
					}
					var userauth = JSON.parse(res.data.result['userauth']) ;
					console.log('app login 用户基本信息:', res.data.result);
					uni.setStorageSync('clientinfo', clientinfo);
					uni.setStorageSync('userInfo', userInfo);
					uni.setStorageSync('username', res.data.result['username']);
					uni.setStorageSync('m_id', res.data.result['m_id']);
					uni.setStorageSync('user_phone', res.data.result['user_phone']);
					uni.setStorageSync('user_name', res.data.result['user_name']);
					uni.setStorageSync('user_gender', res.data.result['user_gender']);
					uni.setStorageSync('user_type', res.data.result['user_type']);
					uni.setStorageSync('user_level', res.data.result['user_level']);
					uni.setStorageSync('userauth', userauth);
					uni.reLaunch({
					    url: '../hall/hall',
					});
					    //uni.navigateBack();
					   //this.toMain(this.account);
					   
				  }else{
					   uni.showToast({
					       icon: 'none',
					       title: res.data.info?res.data.info:'用户账号或密码不正确',
					   });
				  }
			    }
			  });
			},
            toMain(userName) {
                this.login(userName);
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../main/main',
                    });
                } else {
                    uni.navigateBack();
                }
            },
			bypasswd() {
			    this.bypassword = !this.bypassword
			},
			byscanface() {
			    this.byface = true
				this.onScanFace()
			},
			
			getcode() {
				var that = this
				var shop_type = this.shop_type ;
				var phoneNo = this.account?this.account:this.username
				console.log('get code phone no:',phoneNo);
				if (!util.checkPhoneNumber(phoneNo)) {
				    uni.showToast({
				        icon: 'none',
				        title: '手机号格式错误'+phoneNo
				    });
				    return;
				}
			    wx.request({
			          url: weburl + '/api/web/user/login/login_sms_send',
			          method: 'POST',
			          data: { 
			            phoneNo: phoneNo,
			            shop_type:shop_type,
			          },
			          header: {
			            'Content-Type': 'application/x-www-form-urlencoded',
			            'Accept': 'application/json'
			          },
			          success: function (res) {
			            console.log(res.data);
						if(res.data.status=='y'){
							that.ret_info = res.data.data
							uni.showToast({
								 icon: 'none',
								 title:'验证码已发送',
								 duration:1500,
							});
						}else{
							uni.showToast({
								 icon: 'none',
								 title:'验证码获取失败'+res.data.info,
								  duration:2000,
							});
						}
						 
			          }
			        })
			},
			
			onBackPress(e) {  
				uni.reLaunch({
					url: '../hall/hall',
				});
				return true
			}, 
			
			onNavigationBarButtonTap(val) {
				var that = this
				if (val.index == 0) {
					  uni.reLaunch({
					      url: '../hall/hall',
					  });
				}
				if (val.index == 1) {
					that.byface = false
					that.onScanFace()
				}
			},
			
			back() {
				/*
				uni.navigateBack({
					delta: 2
				})
				*/
				uni.reLaunch({
				    url: '../hall/hall',
				});
			},
			
			// #ifdef APP-PLUS
			async facescan() {
				let status = await this.checkPermission();
				if (status !== 1) {
				    return;
				} 
			},
		
			async checkPermission(code) {
				let status_camera = permision.isIOS ? await permision.requestIOS('camera') :
					await permision.requestAndroid('android.permission.CAMERA');
				if (status_camera === null || status_camera === 1) {
					status_camera = 1;
				} else {
					uni.showModal({
						content: "需要相机权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				let status_WRITE_EXTERNAL_STORAGE =  permision.isIOS ? 1 :await permision.requestAndroid('android.permission.WRITE_EXTERNAL_STORAGE');
				if (status_WRITE_EXTERNAL_STORAGE === null || status_WRITE_EXTERNAL_STORAGE === 1) {
					status_WRITE_EXTERNAL_STORAGE = 1;
				} else {
					uni.showModal({
						content: "需要写数据权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				let status_READ_EXTERNAL_STORAGE =  permision.isIOS ? 1 :await permision.requestAndroid('android.permission.READ_EXTERNAL_STORAGE');
				if (status_READ_EXTERNAL_STORAGE === null || status_READ_EXTERNAL_STORAGE === 1) {
					status_READ_EXTERNAL_STORAGE = 1;
				} else {
					uni.showModal({
						content: "需要读数据权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				let status = (status_camera && status_WRITE_EXTERNAL_STORAGE && status_READ_EXTERNAL_STORAGE)?1:0
				return status;
			},
			
			// #endif
			  
			onScanFace:function () {
				var that  = this 
				var byface = that.byface
				
				var isLivenessRandom = that.byface?0:1
				console.error("tagg.onScanFace");
			 
				var ary = [];
				for (var i = 0; i < that.face_items.length; i++) {
					var face_items = that.face_items[i];
					if (face_items.checked) {
						ary[i] = face_items.value;
					}
				}
				var actionAry = byface?'':ary
			
				if (uni.getSystemInfoSync().platform == "android") {//安卓
					that.licenseIDStr = getApp().globalData.face_licenseIDAndroid;
					if(byface){
						lyBDFaceAuth.scanFace({
							licenseID:that.licenseIDStr?that.licenseIDStr:'sendheartAppFace-face-android',
							//actionAry:actionAry,//不传无动作
							//isLivenessRandom:isLivenessRandom,//不传默认有序，0有序，1随机
							isSound:1,//不传默认有声音，0无声，1有声
							txtColor: that.txtColor, //文字颜色
							bgColor: that.bgColor, //背景颜色，iOS设置无效，需要换图片facecover_new.png，路径 nativeplugins\longyoung-BDFaceAuth-iOS\ios\com.baidu.idl.face.faceSDK.bundle，具体看示例。
							roundColor: that.roundColor ,//圆的颜色
						}, result => {
								console.log('file://' + result.imgPath);
								that.faceimage = 'file://' + result.imgPath ;
								that.upload() ;
							});
					}else{
						lyBDFaceAuth.scanFace({
							licenseID:that.licenseIDStr?that.licenseIDStr:'sendheartAppFace-face-android',
							actionAry:actionAry,//不传无动作
							isLivenessRandom:isLivenessRandom,//不传默认有序，0有序，1随机
							isSound:1,//不传默认有声音，0无声，1有声
							txtColor: that.txtColor, //文字颜色
							bgColor: that.bgColor, //背景颜色，iOS设置无效，需要换图片facecover_new.png，路径 nativeplugins\longyoung-BDFaceAuth-iOS\ios\com.baidu.idl.face.faceSDK.bundle，具体看示例。
							roundColor: that.roundColor ,//圆的颜色
							}, result => {
								console.log('file://' + result.imgPath);
								that.faceimage = 'file://' + result.imgPath ;
								that.upload() ;
						});
					}
				}else if (uni.getSystemInfoSync().platform == "ios") {//苹果
					that.licenseIDStr = getApp().globalData.face_licenseIDIOS;
					if(byface){
						lyBDFaceAuth.scanFace({
							licenseID:that.licenseIDStr?that.licenseIDStr:'sendheartAppFace-face-ios',
							//actionAry:actionAry,//不传无动作
							//isLivenessRandom:isLivenessRandom,//不传默认有序，0有序，1随机
							isSound:1,//不传默认有声音，0无声，1有声
							txtColor: that.txtColor, //文字颜色
							bgColor: that.bgColor, //背景颜色，iOS设置无效，需要换图片facecover_new.png，路径 nativeplugins\longyoung-BDFaceAuth-iOS\ios\com.baidu.idl.face.faceSDK.bundle，具体看示例。
							roundColor: that.roundColor ,//圆的颜色
						}, result => {
								console.log('file://' + result.imgPath);
								that.faceimage = 'file://' + result.imgPath ;
								that.upload() ;
							});
					}else{
						lyBDFaceAuthIOS.scanFace({
							licenseID:that.licenseIDStr?that.licenseIDStr:'sendheartAppFace-face-ios',
							actionAry:actionAry,//不传无动作
							isLivenessRandom:isLivenessRandom,//不传默认有序，0有序，1随机
							isSound:1,//不传默认有声音，0无声，1有声
							txtColor: that.txtColor, //文字颜色
							bgColor: that.bgColor, //背景颜色，iOS设置无效，需要换图片facecover_new.png，路径 nativeplugins\longyoung-BDFaceAuth-iOS\ios\com.baidu.idl.face.faceSDK.bundle，具体看示例。
							roundColor: that.roundColor ,//圆的颜色
							}, result => {
								console.log('file://' + result.imgPath);
								that.faceimage = 'file://' + result.imgPath ;
								that.upload() ;
						});
					}
				}
				
				
			},
			
			upload: function () {
			  var that = this;
			  var faceimage = that.faceimage;
			  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			  var face  = 'face_'+username ;
			  var upload_type = that.byface?'face_login':'face_reg'
			  
			  if(upload_type=='face_login'){
				var bitmapFaceLogin= new plus.nativeObj.Bitmap("sendheart_face_login"); //
				  // 从本地加载Bitmap图片
				bitmapFaceLogin.load(faceimage, function() {
					//console.log('加载图片成功');
					var base4 = bitmapFaceLogin.toBase64Data();
					//that.resultStr = that.resultStr + "\n======base64字符串（太长，截取前100字符）：\n" + base4.substring(0, 100);
					that.faceimage64 = base4.replace(/[\r\n]/g, ""); //显示图片
					that.my_login() ;
				}, function(e) {
				  	//console.log('加载图片失败：' + JSON.stringify(e));
					uni.showToast({
						title: '加载图片失败！'+JSON.stringify(e),
						duration: 2000
					});
				});
				
			  }else{
			  	uni.uploadFile({
			  	  url: uploadurl,
			  	  filePath: faceimage,
			  	  name: 'wechat_upimg',
			  	  //formData: adds,
			  	  formData: {
			  	    latitude: encodeURI(0.0),
			  	    longitude: encodeURI(0.0),
			  	    type: encodeURI(upload_type),
			  	    city: encodeURI('杭州'),
			  	    prov: encodeURI('浙江'),
			  	    name: encodeURI(face) // 名称
			  				
			  	  },
			  	  // HTTP 请求中其他额外的 form data
			  	  success: function (res) {
			  	    var retinfo = JSON.parse(res.data.trim());
			  					  var byface = that.byface ;
			  	    if (retinfo['status'] == "y") {
			  	      //console.log('VIP刷脸图片上传完成');
						that.faceurl = retinfo['result']['img_url']
						that.update_userinfo();
			  	    }else{
			  			uni.showToast({
							title: '系统错误！'+retinfo['info'],
							duration: 2000
			  			});
			  		}
			  	  }
			  	});
			  }
			},
			
			update_userinfo: function () {
			  var that = this;
			  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '' ;
			  var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1' ;
			  var faceurl = that.faceurl? that.faceurl:'';
			  var shop_type = that.shop_type
			
			  uni.request({
			    url: weburl + '/api/client/update_name',
			    method: 'POST',
			    data: {
			      username: username,
			      access_token: token,
				  type:2,   //1获取手机号 2vip认证
				  shop_type: shop_type,
			      faceurl: faceurl,
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      'Accept': 'application/json'
			    },
			    success: function (res) {
					if (res.data.status == "y") {
						uni.showToast({
							title: 'VIP认证成功！',
							duration: 2000
						});
						uni.setStorageSync('user_level', res.data.result['user_level']);
						
						/*
						var member_info = res.data.result ;
						var userInfo = {
							nickname:member_info.wx_nickname,
							avatarUrl:member_info.wx_headimg,
						}
						  console.log('app login 用户基本信息:', res.data.result);
						  uni.setStorageSync('userInfo', userInfo);
						  uni.setStorageSync('username', res.data.result['username']);
						  uni.setStorageSync('m_id', res.data.result['m_id']);
						  uni.setStorageSync('user_phone', res.data.result['user_phone']);
						  uni.setStorageSync('user_name', res.data.result['user_name']);
						  uni.setStorageSync('user_gender', res.data.result['user_gender']);
						  uni.setStorageSync('user_type', res.data.result['user_type']);
						    
						  uni.reLaunch({
						      url: '../hall/hall',
						  });
						  */
					}else{
						uni.showToast({
							title: res.data.info?res.data.info:'VIP认证失败！',
							duration: 2000
						});
					}
			    }
			  });
			},
        },
        onReady() {
            this.initPosition();
            this.initProvider();
			this.username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '' ;
			 
			// #ifdef APP-PLUS
			this.facescan();
			//#endif
        }
    }
</script>

<style>
	page {
	  background: #1d1d1d;
	}
	
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
		font-size: 25rpx;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 10upx;
    }
	.action-row text {
	    color: #007aff;
	    padding: 0 10upx;
	}

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
	 
	
	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	

	
	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}
	
	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}
	
	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}
	
	.input-row .title {
		width: 30%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}
	
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}
	
	button.warn {
		background-color: #0faeff;
	}
	
	.cu-btn {
		width: 230upx;
		position: relative;
		border: 0upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		font-size: 28upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		text-decoration: none;
		overflow: visible;
		margin: 15upx 20upx auto;
		transform: translate(0upx, 0upx);
	}

	.cu-btn::after {
		display: none;
	}
	.bg-green {
		background-color: #39b54a;
		color: #ffffff;
	}
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
		  background-color: #1D1D1D;
	  }

</style>
