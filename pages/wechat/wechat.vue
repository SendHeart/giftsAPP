<template>
	<view>
		<view class="content" id="content" :style="{height:style.contentViewHeight+'px'}">
			<scroll-view id="scrollview" scroll-y="true" :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true" :scroll-top="scrollTop">  
				<message-show v-for="(message,index) in messages" :key="index" v-bind:message="message" :id="index"></message-show>
			</scroll-view>
		</view>
		<view class="foot">
			<chat-input @send-message="getInputMessage"></chat-input>
		</view>
	</view>
</template>

<script>
	import chatInput from '@/components/im-chat/chatinput.vue';
	import messageShow from '@/components/im-chat/messageshow.vue';
	import mqtt_service from '@/utils/mqtt.js';
	import util from '@/utils/util.js';
	var mqtt_client ;
	var weburl = getApp().globalData.weburl;
	var shop_type = getApp().globalData.shop_type;
	var wssurl = getApp().globalData.wssurl;
	var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
	var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
	var user_group_id = uni.getStorageSync('useruser_group_idInfo') ? uni.getStorageSync('user_group_id') : '0'
	
	export default {
		data() {
			return {
				frompage:'',
				nickname: userInfo.nickname ? userInfo.nickname : '匿名',
				avatarUrl: userInfo.avatarUrl,
				windowWidth: 0,
				windowHeight: 0,
				screenWidth:0,
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
				},
				scrollTop: 0,
				messages: [{
					user: 'home',
					headimg:'',
					type: 'head', //input,content 
					content: '你好!',
					goods_id:0,
				}],
				cid:'',
				mqtt_server: {
					host: 'sendheart.dreamer-inc.com',
					port: '80',
					path: '/mqtt',
				},
				mqtt_pub_topic: '',
				mqtt_sub_topic: '',
				mqtt_pub_content:'',
				mqtt_pub_message:'',
				Qos: 0,
				mqtt_sendmessage: '',
				mqtt_time:0,
				mqtt_receiveMessage: '',
				mqtt_client: null,
				//MQTT连接的配置
				mqtt_options: {
					wsOptions: {},
					protocolVersion: 4, //MQTT连接协议版本
					clientId: '',
					keepalive: 60,
					clean: false,
					username: '',
					password: '',
					reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
					connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
					resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
				},
			}
		},
		components: {
			chatInput,
			messageShow
		},
		created: function () { 
			var that = this
			//const res = uni.getSystemInfoSync();
			//this.style.pageHeight = res.windowHeight;
			//this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
			
		},
		onLoad: function (options) { //
			var that = this;
			that.goods_id = options.goods_id ? options.goods_id : 0;
			that.goods_name = options.goods_name ? options.goods_name : ''
			that.goods_owner = options.goods_owner ? options.goods_owner : ''
			that.qun_type = options.qun_type ? options.qun_type : '1'
			that.bar_title = that.goods_name?that.goods_name.substring(0,12):''
			that.frompage = options.frompage ? options.frompage : ''
			var footer_height = 0 
			uni.getSystemInfo({
				success: function (res) {
					that.winHeight = res.windowHeight
					that.winWidth = res.windowWidth
					that.platform = res.platform
					that.dkheight = res.winHeight
					that.style.pageHeight = res.windowHeight;
				}
			})
			
			let query = wx.createSelectorQuery().select('.foot').boundingClientRect(function (res) {  
				footer_height = res.height
			});
			that.style.contentViewHeight = that.style.pageHeight - footer_height - 100
			
			if(that.qun_type=='1'){
				if(that.goods_id == 0){
					that.goBack()
				}
			}
			uni.setNavigationBarTitle({
				title: that.bar_title+'_服务群'
			})
			that.mqtt_pub_topic = 'SH_GDS01_' + that.goods_id 
			that.mqtt_sub_topic = 'SH_GDS02_' + that.goods_id 
			that.mqtt_connect()
		},
		methods: {
			onBackPress(e) {
				var that = this
				if(this.mqtt_client != null && this.mqtt_client.connented != false){
					that.mqtt_unconnect()
				}
			}, 
			mqtt_connect: function(type = 0) {
				var that = this
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
				var current_time = new Date().getTime()
				var mqtt_goods_qun_clientid = username+'_'+current_time //uni.getStorageSync('mqtt_goods_qun_clientid') ? uni.getStorageSync('mqtt_goods_qun_clientid') : 
				//uni.setStorageSync('mqtt_goods_qun_clientid', mqtt_goods_qun_clientid);
				that.mqtt_options.clientId = mqtt_goods_qun_clientid ;
				var mqtt_hosts = ''
				//#ifdef H5
				mqtt_hosts = 'ws://' + this.mqtt_server.host + ':' + this.mqtt_server.port + this.mqtt_server.path
				//#endif
				// #ifdef MP-WEIXIN 
				mqtt_hosts = 'wxs://' + this.mqtt_server.host + this.mqtt_server.path
				//#endif
				//#ifdef APP-PLUS
				mqtt_hosts = 'wx://' + this.mqtt_server.host + ':' + this.mqtt_server.port + this.mqtt_server.path
				//#endif
			
				if (this.mqtt_client == null || this.mqtt_client.connented == false) {
					uni.showToast({
					  title: '连接中···',
					  icon: 'loading',
					  duration: 1000
					});
					console.log(mqtt_hosts, this.mqtt_options)
					this.mqtt_client = mqtt_service.connect(
						mqtt_hosts,
						this.mqtt_options
					)
			
					this.mqtt_client.on('connect', () => {
						//uni.hideLoading();
						console.log('连接成功');
						this.mqtt_subscribe()
					})
					this.mqtt_client.on('message', (topic, message) => {
						console.log('收到来自' + topic + '的消息' + message.toString());
						//this.receiveMessage = message	
						that.addMessage('home', message, false)
					})
				}  
					
				this.mqtt_client.on('reconnect', error => {
					//uni.hideLoading();
					console.log('正在重连...');
				})
				
				this.mqtt_client.on('error', error => {
					//uni.hideLoading();
					uni.showToast({
					  title: '连接失败!',
					  icon: 'loading',
					  duration: 1000
					})
					console.log('连接失败');
				})
			},
			
			mqtt_subscribe: function() {
				// 判断是否已成功连接
				if (!this.mqtt_client || !this.mqtt_client.connected) {
					uni.showToast({
					  title: '客户端未连接...',
					  icon: 'loading',
					  duration: 1000
					})
					return;
				}
			
				this.mqtt_client.subscribe(this.mqtt_sub_topic, {
					qos: this.Qos
				}, error => {
					if (!error) {
						/*
						uni.showToast({
						  title: '订阅成功',
						  icon: 'loading',
						  duration: 1000
						});
						*/
						console.log('订阅成功');
					}
				})
			
				/* //订阅多个主题
				this.client.subscribe(['one', 'two', 'three'], { qos: 1 }, err => {
					console.log(err || '订阅成功');
					this.show(err || '订阅成功');
				});
			
				    // 订阅不同 qos 的不同主题
				this.client.subscribe(
				[
					{ hello: 1 },
					{ 'one/two/three': 2 },
					{ '#': 0 }
				],
				(err) => {
					this.show();console.log(err || '订阅成功')
				},
				)			
				}); 
				*/
			},
			
			mqtt_publish: function() {
				var that = this
				// 判断是否已成功连接
				if (!that.mqtt_client || !that.mqtt_client.connected) {
					uni.showToast({
					  title: '客户端未连接',
					  icon: 'loading',
					  duration: 1000
					})
					return false
				}
			
				that.mqtt_pub_message['goods_id'] = that.goods_id
				var mqtt_pub_content = {
					d:{
						username:that.goods_owner,
						title:that.goods_id,
						content:JSON.stringify(that.mqtt_pub_message),
						from_headimg:userInfo.avatarUrl,
						from_nickname:userInfo.nickname,
						from_username:username
					}
				}
				that.mqtt_pub_content = JSON.stringify(mqtt_pub_content) 
				
				if (that.mqtt_pub_content != '') {
					/*
					var content = {
						message_type: '20',  //MQTT 客服咨询消息
						message: '订单ID:'+order_id+' 发起咨询【请及时回复】',
						order_no:order_no,
						order_id:order_id,
					}
					*/
					
					that.mqtt_client.publish(that.mqtt_pub_topic,that.mqtt_pub_content, error => {
						console.log(error || '消息发布成功:'+that.mqtt_pub_topic);
						/*
						uni.showToast({
						  title: '消息发布成功',
						  icon: 'loading',
						  duration: 1000
						});
						*/
					})
				} else {
					uni.showToast({
					  title: '发布消息为空',
					  icon: 'loading',
					  duration: 1000
					});
				}
				return true ;
			},
			
			mqtt_unsubscribe: function() {
				this.mqtt_client.unsubscribe(
					// topic, topic Array, topic Array-Onject
					// ['one', 'two', 'three'],
					this.mqtt_sub_topic,
					err => {
						console.log(err || '取消订阅成功');
						uni.showToast({
						  title: '取消订阅成功',
						  icon: 'loading',
						  duration: 1000
						});
					}
				);
			},
			mqtt_unconnect: function() {
				if(this.mqtt_client == null || this.mqtt_client.connented == false){
					console.log('当前未连接');
				} else {
					this.mqtt_client.end();
					this.mqtt_client = null
					uni.showToast({
					  title: '成功断开连接',
					  icon: 'loading',
					  duration: 1000
					});
					console.log('断开连接');
				}
				return true
			},
			
			goBack: function() {
				var that = this
				that.mqtt_unconnect()
				if(that.frompage=='/pages/my/index' || that.frompage=='/pages/hall/hall' || that.frompage=='/pages/cart/cart'){
					uni.switchTab({
						url: that.frompage
					})
				} else {
					var pages = getCurrentPages();
					if (pages.length > 1) {
					  uni.navigateBack({
					    changed: true
					  }) //返回上一页
					} else {
						uni.switchTab({
							url: '/pages/hall/hall'
						})
					}
				}
			},
			
			getInputMessage: function (message) { //获取子组件的输入数据
				var that = this
				console.log(message);
				that.addMessage('customer', message.content, false)
				message.content = util.filterEmoji(message.content);
				let count = 0 ;
				if(that.mqtt_client != null && that.mqtt_client.connented != false) {
					 that.mqtt_pub_message = message
					 that.mqtt_publish()					
					 //that.toRobot(message.content);					 
				} else {
					setTimeout(function () {
						that.getInputMessage(message)
					}, 500)					
				}
			},
			
			addMessage: function (user, content, hasSub, subcontent) {
				var that = this
				var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
				var avatarUrl = userInfo.avatarUrl
				var messages = {
					user: user,
					avatarUrl:avatarUrl,
					content: content,
					hasSub: hasSub,
					subcontent: subcontent,
				}
				that.messages.push(messages)
				setTimeout(function () {
					that.scrollToBottom()
				}, 300)
				
			},
			
			scrollToBottom: function () {
				var that = this
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#content').boundingClientRect();
				query.exec(function (res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function (rect) {
						// console.info(rect.height);
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					})

					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				})
			},
			toRobot: function (info) {
				// this.addMessage('home', info, false);
				var apiUrl = 'http://www.tuling123.com/openapi/api';
				uni.request({
					url: apiUrl,
					data: {
						"key": 'acfbca724ea1b5db96d2eef88ce677dc',
						"info": info,
						"userid": 'uni-test'
					},
					success: (res) => {
						this.addMessage('home', res.data.text, false);
						//this.scrollToBottom();
						console.log('request success:' + res.data.text);
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						})
					}
				});
			}
		}
	}
</script>

<style>
	.uni-column {
	}
	.content {
		display: flex;
		flex: 1;
	}
	.foot {
		position: fixed;
		width: 100%;
		height: 90px;
		min-height: 90px;
		padding-bottom: 5rpx;
		left: 0px;
		bottom: 0;
		overflow: hidden;
		opacity: 1;
	}
</style>
