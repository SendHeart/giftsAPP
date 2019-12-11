<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border" >
                <text class="title">手机号：</text>
                <m-input type="text" focus clearable v-model="account" placeholder="请输入手机号"></m-input>
            </view>
			<view class="input-row border">
			    <text class="title">验证码：</text>
			    <m-input type="text" v-model="vcode" placeholder="请输入验证码"></m-input>
				<button class='cu-btn bg-green shadow' @tap="getcode">验证码</button>
			</view>
			<view class="input-row">
			    <text class="title">新密码：</text>
			    <m-input type="password" displayable v-model="password" placeholder="请输入新密码"></m-input>
			</view>
        </view>

        <view class="btn-row">
            <button type="warn" class="primary" @tap="findPassword">提交</button>
        </view>
    </view>
</template>

<script>
	var util = require("../../utils/util.js"); //获取应用实例
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';
	import md5 from '../../utils/md5.js';

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
                shop_type: shop_type,
				password:'',
				vcode:'',
				account:''
            }
        },
        methods: {
            findPassword() {
				/*
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
				
                uni.showToast({
                    icon: 'none',
                    title: '已发送重置邮件至注册邮箱，请注意查收。',
                    duration: 3000
                });
				*/
			   var that = this
			   var shop_type = this.shop_type ;
			   var mobile = this.account ;
			   var password = this.password ;
			   var vcode = this.vcode ;
			   var md5password = md5(password,md5_key,true)
			   console.log('get code phone no:',mobile);
			   if (!util.checkPhoneNumber(mobile)) {
			       uni.showToast({
			           icon: 'none',
			           title: '手机号格式错误'
			       });
			       return;
			   }
			   if (password.length < 6 ) {
			       uni.showToast({
			           icon: 'none',
			           title: '密码最短为 6 个字符'
			       });
			       return;
			   }
			   if (!this.vcode) {
			       uni.showToast({
			           icon: 'none',
			           title: '验证码不能为空'
			       });
			       return;
			   }
			   wx.request({
			         url: weburl + '/api/web/user/find_password/find_password_act',
			         method: 'POST',
			         data: { 
			           username: mobile,
			           shop_type:shop_type,
					   password:password,
					   md5password:md5password,
					   code:vcode,
			         },
			         header: {
			           'Content-Type': 'application/x-www-form-urlencoded',
			           'Accept': 'application/json'
			         },
			         success: function (res) {
			           console.log(res.data);
						if(res.data.status=='y'){
							uni.showToast({
								icon: 'none',
								title:'密码修改完成',
								duration:1500,
							});
							uni.reLaunch({
							    url: '../hall/hall',
							});
						}else{
							uni.showToast({
								icon: 'none',
								title:'密码修改失败'+res.data.info,
								duration:2000,
							});
						}
			         }
			       })
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
			          url: weburl + '/api/web/user/find_password/sms_send',
			          method: 'POST',
			          data: { 
			            mobile: phoneNo,
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
