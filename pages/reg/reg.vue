<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
			<view class="input-row">
			    <text class="title">验证码：</text>
			    <m-input type="text" v-model="vcode" placeholder="请输入验证码"></m-input>
				<button class='cu-btn bg-green shadow'  @tap="getcode">验证码</button>
			</view>
			<!--
            <view class="input-row">
                <text class="title">邮箱：</text>
                <m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
			-->
        </view>
        <view class="btn-row">
            <button type="warn" class="primary" @tap="register">注册</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';
	import md5 from '../../utils/md5.js';
	var util = require("../../utils/util.js"); //获取应用实例
	var weburl = getApp().globalData.weburl;
	var shop_type = getApp().globalData.shop_type;
	var username = wx.getStorageSync('username');
	var md5_key = getApp().globalData.md5_key;

    export default {
        components: {
            mInput
        },
        data() {
            return {
                account: '',
                password: '',
                vcode: '',
				//email: '',
				shop_type:shop_type,
            }
        },
        methods: {
            register() {
                if (!util.checkPhoneNumber(this.account)) {
                    uni.showToast({
                        icon: 'none',
                        title: '手机号格式错误'
                    });
                    return;
                }
                if (this.password.length < 6 ) {
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
				/*
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }
				*/
              
				var url = weburl + '/api/web/user/login/user_xcx_login'
				var username = this.account
				var vcode = this.vcode
				var password = this.password
				var md5password = md5(this.password,md5_key,true)
				var login_type = 0
				wx.request({
				  url: url,
				  method: 'POST',
				  data: {
				    username: username,
					password:	password,
					md5password:md5password,
				    login_type: login_type,
					smscode:vcode,
				    type: 8,
				    shop_type: shop_type
				  },
				  header: {
				    'Content-Type': 'application/x-www-form-urlencoded',
				    'Accept': 'application/json'
				  },
					success: function (res) {
						if(res.data.status == 'y'){
							console.log('app login 用户基本信息:', res.data.result);
							uni.setStorageSync('username', res.data.result['username']);
							uni.setStorageSync('m_id', res.data.result['m_id']);
							uni.setStorageSync('user_phone', res.data.result['user_phone']);
							uni.setStorageSync('user_name', res.data.result['user_name']);
							uni.setStorageSync('user_gender', res.data.result['user_gender']);
							uni.setStorageSync('user_type', res.data.result['user_type']);
							uni.reLaunch({
								url: '../hall/hall',
							});		   
						}else{
							uni.showToast({
								icon: 'none',
								title: res.data.info?res.data.info:'用户账号或密码不正确',
							});
						}
					}
				});
				
				/*
				const data = {
				    account: this.account,
				    password: this.password,
					vcode: this.vcode,
				   // email: this.email
				}
				service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
                });
				*/
            },
			getcode() {
				var that = this
				var shop_type = this.shop_type ;
				var phoneNo = this.account ;
				console.log('get code phone no:',phoneNo);
				if (!util.checkPhoneNumber(phoneNo)) {
				    uni.showToast({
				        icon: 'none',
				        title: '手机号格式错误'
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
			}
        }
    }
</script>

<style>
	page {
	  background: #1d1d1d;
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
</style>
