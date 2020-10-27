<template>
	<view :style="'heigth:'+style.pageHeight+'px;'">
		<view id="content" class="content" scroll-y >
			<view id="scrollview" v-for="(message,index) in messages" :key="index">
				<view class="m-item" :id="'message'+index">
					<view class="m-left" v-if="message.user=='home'">
						<image class="head_icon" src="/static/images/homeHL.png" ></image>
					</view>
					<view class="m-content">
						<view v-if="message.content!=''" class="m-content-head" :class="{'m-content-head-right':message.user=='customer'}">
							<view  :class="'m-content-head-'+message.user">{{message.content}} </view>
						</view>
						<view v-if="message.imageurl!=''" class="m-content-head" :class="{'m-content-head-right':message.user=='customer'}" @tap="imgYu(message.imageurl)">
							<easy-loadimage class="m-image" mode="widthFix"
							    :scroll-top="scrollTop"
							    :image-src="message.imageurl" >
							</easy-loadimage>
						</view>
					</view>
					<view v-if="message.content!='' || message.imageurl!=''" class="m-right">
						<image class="head_icon" :src="message.avatarUrl" v-if="message.user=='customer'"></image>
					</view>
				</view>				
			</view>	
			<view style="height: 100px;"></view>>
		</view>
		<view class="foot">
			<view class="footer">
				<view class="footer-left">
					<view class="uni-icon uni-icon-mic" @tap="startRecognize"> </view>
				</view>
				<view class="footer-center">
					<input class="input-text" type="text" v-model="inputValue"></input>
				</view>
				<view class="footer-right" @tap="getInputMessage">
					<view id='msg-type' >发送</view>
				</view>
				<view class="footer-right-2"  @tap="upimg">
					<view class="uni-icon uni-icon-plus"></view>
				</view>
			</view>			 
		</view>
	</view>
</template>

<script>
	import mqtt_service from '@/utils/mqtt.js';
	import util from '@/utils/util.js';
	import {
		mapState
	} from 'vuex'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	//var mqtt_client ;
	//var mqtt_service = require('mqtt/dist/mqtt.min.js')
	var uploadurl = getApp().globalData.uploadurl;
	var weburl = getApp().globalData.weburl;
	var wssurl = getApp().globalData.wssurl;
	var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
	var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
	var user_group_id = uni.getStorageSync('useruser_group_idInfo') ? uni.getStorageSync('user_group_id') : '0'
	var shop_type = getApp().globalData.shop_type;
	var socketOpen = getApp().globalData.websocketOpen?getApp().globalData.websocketOpen:false;
	var socketMsgQueue = [];
	var sendMsgQueue = [];
	export default {
		data() {
			return {
				is_connect:false,
				inputValue: '',
				anData:{},
				animationData:{},
				showTow:false,
				frompage:'',
				shop_type: shop_type,
				uploadurl: uploadurl,
				page:0,
				pagesize:20,
				all_rows:0,
				img_arr: [],
				new_img_arr: [],
				upimg_url: [],
				formdata: '',
				nickname: userInfo.nickname ? userInfo.nickname : '匿名',
				avatarUrl: userInfo.avatarUrl,
				windowWidth: 0,
				windowHeight: 0,
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
					imageurl:'',
					goods_id:0,
					createtime:'',
				}],
				//cid:'',
				mqtt_server: {
					host: 'sendheart.dreamer-inc.com',
					port: '80',
					path: '/mqtt',
				},
				mqtt_goodsid:0,
				mqtt_mid:0,
				mqtt_pub_topic: '',
				mqtt_sub_topic: '',
				mqtt_pub_content:'',
				websocket_pub_message:'',
				mqtt_pub_list:[],
				Qos: 1,
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
					connectTimeout: 5 * 1000, //1000毫秒，两次重新连接之间的间隔
					resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
				},
				socktBtnTitle: '连接socket',
				socket_message: '',
			}
		},
		components: {			
			easyLoadimage,			
		},	
		computed: mapState(['user']),
		created: function () { 
			
		},
		mounted: function() {
			 
		},
		 
		onPageScroll:function({scrollTop}){
			var that = this
		 	that.scrollTop = scrollTop
		 	//console.log('wechat onPageScroll:'+that.scrollTop)
		},		 
		
		onLoad: function (options) { //
			var that = this;
			that.mqtt_goodsid = options.goods_id ? options.goods_id : that.mqtt_goodsid;
			that.mqtt_mid = options.m_id ? options.m_id : that.mqtt_mid;
			that.goods_name = options.goods_name ? options.goods_name : ''
			that.goods_owner = options.goods_owner ? options.goods_owner : ''
			that.from_username = options.from_username ? options.from_username : 0;
			that.qun_type = options.qun_type ? options.qun_type : '1'
			that.bar_title = that.goods_name?that.goods_name.substring(0,12):''
			that.frompage = options.frompage ? options.frompage : ''
			 
			var screen_para=uni.getSystemInfoSync()
			 
			that.style.pageHeight = screen_para.windowHeight;
			that.style.contentViewHeight = that.style.pageHeight - 80
			//console.log('wechat onload options:'+JSON.stringify(options)) 
			
			if(that.qun_type=='1'){
				if(that.mqtt_goodsid == 0){
					that.goBack()
				}
			}
			uni.setNavigationBarTitle({
				title: that.bar_title+'_群客服'
			})
		
			that.mqtt_pub_topic = 'SH_GDS01_' + that.mqtt_goodsid //+'_'+ that.mqtt_mid
			that.mqtt_sub_topic = 'SH_GDS01_' + that.mqtt_goodsid //+'_'+ that.mqtt_mid
			//that.mqtt_connect()
			that.initSocketMessage()
			console.log('chatroomservice onload mqtt_pub_topic:'+that.mqtt_pub_topic+' mqtt_sub_topic:'+that.mqtt_sub_topic)
			 
			if(that.mqtt_goodsid || that.goods_owner){
				that.get_wechat_list()
			}			 
		},
		methods: {	
			onBackPress(e) {
				var that = this
				that.mqtt_unsubscribe()
				that.mqtt_unconnect()
			}, 
			
			reSend: function () {
				//失败后重新发送
				var that = this; //失败重发			 
				var reSendMsgQueue = sendMsgQueue;
				for (var i = 0; i < reSendMsgQueue.length; i++) {
					uni.sendSocketMessage({
						data: reSendMsgQueue[i],
						success: function (res) {
							//console.log("sendSocketMessage 重发完成");
							//console.log(rcvnew);
							sendMsgQueue.splice(i, 1);
						},
						fail: function (res) {
							//console.log("sendSocketMessage 重发失败");
							uni.showToast({
								title: '网络故障',
								icon: 'loading',
								duration: 2000
							})
						}
					})
				}
			},
			 
			initSocketMessage: function () {
				var that = this
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				var uid = username + '_' + shop_type
				var remindTitle = socketOpen ? '正在关闭' : '正在连接';
				var goods_id = that.mqtt_goodsid
				if (!socketOpen) {
					console.log('initSocketMessage socketOpen:'+socketOpen+' wssurl:'+wssurl+' goods_id:'+goods_id);
					uni.connectSocket({
						url: wssurl + '/gcs',
						success:function() {
							uni.onSocketOpen(function(res) {
								console.log('WebSocket连接已打开', wssurl + '/wss');
								uni.hideToast();
								that.socktBtnTitle = '断开socket'
								socketOpen = true	
								getApp().globalData.websocketOpen = socketOpen							
								uni.sendSocketMessage({
									data: uid
								})
								if(socketMsgQueue.length > 0){
									for (var i = 0; i < socketMsgQueue.length; i++) {
										let socket_message = socketMsgQueue[i]
										console.log('initSocketMessage i:'+i+' socket_message:'+socket_message);
										uni.sendSocketMessage({
											data: socket_message, //自身定义一个发送消息对象
											success: function() {
												var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
												var response = res.data?JSON.parse(res.data.trim(), true):'';
												 
												//console.log('收到服务器内容：' + res.data.trim());
															 
												if (response.status == 'y') {
													var recv_message = response.result
													var recv_content = JSON.parse(recv_message['d']['content'])
													var reply_message = {
														user: recv_content['user'],
														type:recv_message['d']['type']?recv_message['d']['type']:'text',
														content: recv_content['content']?recv_content['content']:'感谢您的支持',
														hasSub: recv_message['d']['hasSub']?recv_message['d']['hasSub']:false,
														subcontent: recv_message?recv_message['d']['type']:'',
													}
													console.log('收到来自' + topic + '的消息' + message.toString())
													if(recv_content['user']!='customer'){
														that.addMessage(recv_content['user'], reply_message['content'], reply_message['hasSub'],reply_message['type'],reply_message['subcontent'],recv_content['imageurl'])	
													}
												}
											},
											fail: function() {
												socketOpen = false;
												getApp().globalData.websocketOpen = socketOpen
												console.log('WebSocket发送失败，请检查！');
												//that.socktBtnTitle = '连接socket'
												uni.hideToast();
											}
										})
									}
								}
							})
						},
					})
				} 
			},
			 
			sendSocketMessage: function () {
				var that = this;
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				var myDate = util.formatTime(new Date());
				var message = that.socket_message;
			 
				if (!socketOpen) {
					console.log('sendSocketMessage socketOpen:'+socketOpen+' message:'+ message);
					socketMsgQueue.push(message);
					that.initSocketMessage();
				} else {
					console.log('sendSocketMessage message:'+ message);
					uni.sendSocketMessage({
						data: message,
						success: function (res) {
							console.log("sendSocketMessage 完成"+res);
						},
						fail: function (res) {
							console.log("sendSocketMessage 通讯失败");
							uni.showToast({
								title: '网络故障',
								icon: 'loading',
								duration: 1500
							})
							
							socketOpen = false
							getApp().globalData.websocketOpen = socketOpen
							socketMsgQueue.push(message)
							that.initSocketMessage()
						}
					})
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
					uni.showLoading({
						title: '连接中···'
					})
					/*
					uni.showToast({
					  title: '连接中···',
					  icon: 'loading',
					  duration: 2000
					})
					*/
					console.log(mqtt_hosts, this.mqtt_options)
					this.mqtt_client = mqtt_service.connect(
						mqtt_hosts,
						this.mqtt_options
					)
			
					this.mqtt_client.on('connect', () => {
						uni.hideLoading()
						this.is_connect = true
						/*
						uni.showToast({
						  title: '连接成功',
						  icon: 'success',
						  duration: 2000
						})
						*/
						console.log('连接成功');
						this.mqtt_subscribe()
					})
					this.mqtt_client.on('message', (topic, message) => {						
						var recv_message = JSON.parse(message)
						var recv_content = JSON.parse(recv_message['d']['content'])
						var reply_message = {
							user: recv_content['user'],
							type:recv_message['d']['type']?recv_message['d']['type']:'text',
							content: recv_content['content']?recv_content['content']:'',
							imageurl:recv_content['imageurl']?recv_content['imageurl']:'图片',
							hasSub: recv_message['d']['hasSub']?recv_message['d']['hasSub']:false,
							subcontent: recv_message?recv_message['d']['subcontent']:'',
						}
						console.log('收到来自' + topic + '的消息:' + message+' 图片:'+recv_content['imageurl']);
						if(recv_content['user']!='home'){
							that.addMessage(recv_content['user'], reply_message['content'], reply_message['hasSub'],reply_message['type'],reply_message['subcontent'],recv_content['imageurl'])
						}						
					})
				}  
					
				this.mqtt_client.on('reconnect', error => {
					//uni.hideLoading();
					this.is_connect = false
					console.log('正在重连...')					
				})
				
				this.mqtt_client.on('error', error => {
					uni.hideLoading()
					this.is_connect = false
					/*
					uni.showToast({
					  title: '连接失败!',
					  icon: 'loading',
					  duration: 1000
					})
					*/
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
					this.is_connect = false
					return
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
						console.log('订阅成功'+this.mqtt_sub_topic);
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
				if (that.is_connect == false) {
					console.log('客户端未连接');
					return false
				}
				let mqtt_pub_list =  that.mqtt_pub_list
				let mqtt_pub_title = that.mqtt_goodsid+'_'+that.mqtt_mid
				for( let i=0 ; i<mqtt_pub_list.length;i++){		
					let mqtt_pub_message = mqtt_pub_list[i]
					mqtt_pub_message['goods_id'] = that.mqtt_goodsid
					var mqtt_pub_content = {
						d:{
							username:that.goods_owner,
							title:mqtt_pub_title,
							content:JSON.stringify(that.mqtt_pub_message),
							from_headimg:userInfo.avatarUrl,
							from_nickname:userInfo.nickname,
							from_username:username,
							index:i,
						}
					}
					that.mqtt_pub_content = JSON.stringify(mqtt_pub_content) 	
					var mqtt_opts = {
						qos: 1, 
						retain: false, 
						dup: false,
					}
					that.mqtt_client.publish(that.mqtt_pub_topic,that.mqtt_pub_content,mqtt_opts, error => {
						console.log(error || '消息发布成功:'+that.mqtt_pub_topic+' content:'+ that.mqtt_pub_content)
						 
						let pub_list  = JSON.parse(that.mqtt_pub_content) 
						let index = pub_list['d']['index']
						this.update_pub_list(index)
						
						/*
						uni.showToast({
						  title: '消息发布成功',
						  icon: 'loading',
						  duration: 1000
						});
						*/
					})
				}				
				return true 
			},
			
			mqtt_unsubscribe: function() {
				this.mqtt_client.unsubscribe(
					// topic, topic Array, topic Array-Onject
					// ['one', 'two', 'three'],
					this.mqtt_sub_topic,
					err => {
						console.log(err || '取消订阅成功');
						/*
						uni.showToast({
						  title: '取消订阅成功',
						  icon: 'loading',
						  duration: 1000
						});
						*/
					}
				);
			},
			
			mqtt_unconnect: function() {
				if(this.mqtt_client == null || this.mqtt_client.connented == false){
					console.log('当前未连接')
					
				} else {
					this.mqtt_client.end();
					this.mqtt_client = null
					/*
					uni.showToast({
					  title: '成功断开连接',
					  icon: 'loading',
					  duration: 1000
					})
					*/
					console.log('断开连接');
				}
				this.is_connect = false
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
			
			getInputMessage: function () { //获取子组件的输入数据
				var that = this
				if(that.inputValue == '') return 
				var message = {
					type: 'text',
					content: that.inputValue
				}
				console.log('getInputMessage message:'+message)
				that.addMessage('customer', message.content, false)
				that.inputValue = ''
				/*
				if(this.is_connect == false){
					console.log('getInputMessage:当前未连接');
					return false 
				}else{
					that.addMessage('home', message.content, false)
					that.inputValue = ''
				}	
				*/
			},
			 
			update_pub_list: function (index = 0) {
				var that = this					
				//if(index =='0') return 
				that.mqtt_pub_list.splice(index,1)	
				console.log('wechat update_pub_list() index: '+index+' pub_list:'+JSON.stringify(that.mqtt_pub_list))
			},
			 
			addMessage: function (user='', content='', hasSub='false', subcontent='',type='text',imageurl='',imageaddr='') {
				var that = this
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
				var m_id = that.mqtt_mid
				var goods_id = that.mqtt_goodsid
				var shop_type = that.shop_type
				var mqtt_pub_title = that.mqtt_goodsid+'_'+that.mqtt_mid
				var current_date = util.formatTime(new Date())
				var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
				var avatarUrl = userInfo.avatarUrl
				if(content!='') content = util.filterEmoji(content); //去除表情符
				var message = {
					user: user,
					avatarUrl:avatarUrl,
					type:type,
					content: content,
					hasSub: hasSub,
					subcontent: subcontent,
					imageurl:imageaddr?imageaddr:imageurl,
				}
			
				that.websocket_pub_message = {
					message_type: 2,  //商品服务群
					username: username,
					m_id:m_id,
					shop_type: shop_type,
					title: mqtt_pub_title,
					goods_id:that.mqtt_goodsid,
					content: content,
					imageurl:imageurl,
					user:user,
					from_headimg:userInfo.avatarUrl,
					from_nickname:userInfo.nickname,
					from_username:username,
					createtime:current_date
				}
				console.log('addMessage message:'+JSON.stringify(message))
				that.messages.push(message)
				if(user=='customer'){
					//that.mqtt_pub_list.push(message)
					that.socket_message = JSON.stringify(that.websocket_pub_message)
					//that.mqtt_publish()
					that.sendSocketMessage()
				}
				that.message_len++
				if(that.message_len == 1){
					//更新商品群状态信息
					that.update_goods_custservice()
				}
				//that.inputValue = ''
				setTimeout(function () {
					that.scrollToBottom()
				}, 300)
				
				//console.log('addMessage message:'+JSON.stringify(message))
				/*
				if(this.is_connect == false){
					console.log('addMessage:当前未连接');
					return false
				}else{
					that.messages.push(message)
					
					if(user=='home'){ 
						console.log('addMessage message:'+JSON.stringify(message)+' user:'+user)
						//that.mqtt_pub_list.push(message)
						that.socket_message = JSON.stringify(that.websocket_pub_message)
						//that.mqtt_publish()
						that.sendSocketMessage()
					}
					
					//that.inputValue = ''
					setTimeout(function () {
						that.scrollToBottom()
					}, 300)
				}
				*/
			},
			
			//查询历史记录
			get_wechat_list: function () { 
				var that = this;
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
				var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1'
				var shop_type = that.shop_type //var shape = 1
				var page = that.page==0?1:that.page
				var pagesize = that.pagesize>0?that.pagesize:30			
				var goods_id = that.mqtt_goodsid
				var goods_owner = that.goods_owner
				var m_id = that.mqtt_mid
				var from_username = that.from_username
				uni.request({
					url: weburl + '/api/mqttservice/get_wechat_list',
					method: 'POST',
					data: {
						username: username,
						access_token: token,
						m_id:m_id,
						goods_id:goods_id,
						goods_owner:goods_owner,
						from_username:from_username,
						page: page,
						pagesize: pagesize,
						shop_type: shop_type , 
						query_type:'APP' ,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json'
					},
					success: function (res) {
						var wechat_list = res.data.result;
						var all_rows = res.data.all_rows
						//console.log(wechat_list)
						
						if (wechat_list) {	
							var len = wechat_list.length		
							for (var i = len -1; i >= 0; i--) {
								 //console.log('i:'+i+' wechat info:'+ wechat_list[i])
								 if(wechat_list[i]['content'][0]['content']!='' || wechat_list[i]['content'][0]['imageurl']!=''){
									 var message = {
									 	user: wechat_list[i]['user'],
									 	avatarUrl:wechat_list[i]['avatarUrl'],
									 	type:wechat_list[i]['type'],
									 	content: wechat_list[i]['content'][0]['content'],
									 	hasSub: wechat_list[i]['hasSub'],
									 	subcontent: wechat_list[i]['subcontent'],
									 	imageurl:wechat_list[i]['content'][0]['imageurl'],
									 }
									 that.messages.push(message)
								 }
							}
						}
					}
				})
			},
			
			scrollToBottom: function () {
				var that = this					
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec(function (res) {
					that.style.mitemHeight = 0;
					//console.log('query:',JSON.stringify(res[0]))
					res[0].forEach(function (rect) {
						//console.info(rect.height);
						that.style.mitemHeight = that.style.mitemHeight + rect.height;
					})
						
					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight ;
						console.info('scrollToBottom scrollTop:'+that.scrollTop)					
						
						setTimeout(function () {
							uni.pageScrollTo({
								scrollTop:that.scrollTop, 
								duration: 100
							})
							//that.mescroll.scrollTo( that.scrollTop, 0)
						}, 100)
						 
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
			},
			
			startRecognize: function () {
				var options = {};
				var that = this;
				options.engine = 'iFly';
				that.inputValue = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.inputValue += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			},
		
			upimg: function () {
				var that = this
				var new_img_arr = that.new_img_arr
				var img_arr = that.img_arr
				if (that.is_connect == false) {
					return false
				}		
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					success: function (res) {
						that.new_img_arr = new_img_arr.concat(res.tempFilePaths)
						console.log('本次上传图片:', that.new_img_arr)
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function (image) {
								console.log('image width:'+image.width+' heigth:'+image.height);
								if(image.width<4096 && image.height<4096){
									that.upload()
								}else{
									uni.showToast({
									  title: '图片大小超过4096*4096',
									  icon: 'loading',
									  duration: 2000
									})
									that.new_img_arr=[]
								}
							}
						})						
					}
				});
			},
			
			cancel_upimg: function (e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				var img_tmp = [];
				var old_img_arr = that.img_arr;
				var j = 0;
				console.log('cancel_upimg:', old_img_arr.length, 'id:', id);
			
				for (var i = 0; i < old_img_arr.length; i++) {
					if (i != id) {
						img_tmp[j++] = old_img_arr[i];
					}
				}			
				that.img_arr = img_tmp
			},
			
			upload: function () {
				var that = this;
				var goods_id = that.mqt_goodsid;
				var new_img_addr = that.new_img_arr; //本次上传图片的手机端文件地址
				var new_img_url = []; //本次上传图片的服务端url
			
				for (var i = 0; i < new_img_addr.length; i++) {
					var count = new_img_addr.length;
					var filePath = new_img_addr[i]
					uni.uploadFile({
						url: uploadurl,
						filePath: filePath,
						name: 'wechat_upimg',
						//formData: adds,
						formData: {
							latitude: encodeURI(0.0),
							longitude: encodeURI(0.0),
							restaurant_id: encodeURI(0),
							city: encodeURI('杭州'),
							prov: encodeURI('浙江'),
							name: encodeURI(goods_id) // 名称
						},
						// HTTP 请求中其他额外的 form data
						success: function (res) {
							var retinfo = JSON.parse(res.data.trim());			
							if (retinfo['status'] == "y") {
								new_img_url.push(retinfo['result']['img_url']);
								that.new_img_url = new_img_url
								that.addMessage('customer', '', false,'','image',retinfo['result']['img_url'],filePath)
								count--;
								console.log('图片上传完成:', that.new_img_url, ' count:', count);
							}
						}
					})
				}
				that.new_img_arr=[]
			},
			
			imgYu: function (imageurl) {
				var imgList = [];
				imgList.push(imageurl);
				uni.previewImage({
					current: imageurl,
					urls: imgList // 需要预览的图片http链接列表
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex ;
		flex-direction:column ;
	}
	
	.m-item {
		display: flex;
		flex-direction: row;
		padding-top: 20upx;
	}
	
	.m-left {
		display: flex;
		flex-direction: row;
		width: 120upx;
		justify-content: center;
		align-items: flex-start;
	}
	
	.m-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		word-break: break-all;
	}
	
	.m-right {
		display: flex;
		width: 120upx;
		justify-content: center;
		align-items: flex-end;
	}
	
	.head_icon {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	
	.m-content-head {
		position: relative;
	}
	
	.m-content-head-right {
		display: flex;
		justify-content: flex-end;
	}
	
	.m-content-head-home {
		text-align: left;
		background: #1482d1;
		border: 1px #1482d1 solid;
		border-radius: 20upx;
		padding: 20upx;
		color: white;
	}
	
	.m-content-head-home:before {
		border: 15upx solid transparent;
		border-right: 15upx solid #1482d1;
		left: -26upx;
		width: 0;
		height: 0;
		position: relative;
		content: ' '
	}
	
	.m-content-head-customer {
		border: 1upx white solid;
		background: white;
		border-radius: 20upx;
		padding: 20upx;
	}
	
	.m-content-head-customer:after {
		border: 15upx solid transparent;
		border-left: 15upx solid white;
		top: 20upx;
		right: -26upx;
		width: 0;
		height: 0;
		position: relative;
		content: ' '
	}
	
	.m-image {
		width: 200rpx;
		border-radius: 15rpx;
	}
	
	.foot {
		position: fixed;
		width: 100%;
		bottom: 0;
	}
	
	.footer {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 80upx;
		min-height: 80upx;
		border-top: solid 1px #bbb;
		overflow: hidden;
		padding: 5upx;
		background-color: #fafafa;
	}
	
	.footer-left {
		width: 80upx;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.footer-right {
		width: 80upx;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #1482D1;
	}
	
	.footer-right-2 {
		width: 80upx;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #BBBBBB;
	}
	
	.footer-center {
		flex: 1;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.footer-center .input-text {
		flex: 1;
		background: #fff;
		border: solid 1upx #ddd;
		padding: 10upx !important;
		font-family: verdana !important;
		overflow: hidden;
		border-radius: 15upx;
	}

</style>
