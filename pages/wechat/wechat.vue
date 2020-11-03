<template>
	<view :style="'heigth:'+style.pageHeight+'px;'">
		<view id="content" class="content" scroll-y >
			<view id="scrollview" v-for="(message,index) in messages" :key="index">
				<view class="m-item" :id="'message'+index" :data-msg_content="message.content">
					<view class="m-left" v-if="message.user=='home'">
						<image class="head_icon" src="/static/images/homeHL.png" ></image>
					</view>
					<view class="m-content">
						<view v-if="message.content!=''" class="m-content-head" :class="{'m-content-head-right':message.user=='customer'}">
							<view :id="'msg_content'+index" :class="'m-content-head-'+message.user" :data-msg_content='message.content'>							
							{{message.content}}
							</view>
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
	//import chatInput from '@/components/im-chat/chatinput.vue';
	//import messageShow from '@/components/im-chat/messageshow.vue';
	import mqtt_service from '@/utils/mqtt.js';
	//var mqtt_service = require('mqtt/dist/mqtt.min.js')
	import util from '@/utils/util.js';
	import {
		mapState
	} from 'vuex'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	//var mqtt_client ;
	var uploadurl = getApp().globalData.uploadurl
	var weburl = getApp().globalData.weburl
	var wssurl = getApp().globalData.wssurl
	var mqtturl = getApp().globalData.mqtturl
	var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : ''
	var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
	var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1'
	var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : ''
	var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : ''
	var user_group_id = uni.getStorageSync('useruser_group_idInfo') ? uni.getStorageSync('user_group_id') : '0'
	var shop_type = getApp().globalData.shop_type?getApp().globalData.shop_type:2
	var socketOpen = getApp().globalData.websocketOpen?getApp().globalData.websocketOpen:false;
	var socketTask = false
	var socketOnline = false
	var socketMsgQueue = []
	var socketRcvMsg = []
	var chat_messages = []
	var is_sending = false
	export default {
		data() {
			return {
				is_connect:false,				
				inputValue: '',
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
				message_len:0,
				messages: [{
					user: 'home',
					headimg:'',
					type: 'head', //input,content 
					content: '你好!',
					imageurl:'',
					goods_id:0,
					createtime:'',
					index:0,
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
					connectTimeout: 5 * 1000, //1000毫秒，两次重新连接之间的间隔
					resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
				},
				socktBtnTitle: '连接socket',
				socket_message: '',
			}
		},
		//mixins: [MescrollMixin],
		components: {			
			easyLoadimage,			
		},	
		computed: mapState(['user']),
		created: function () { 
			
		},
		mounted: function() {
			//this.isInit = true
			//this.mescroll.triggerDownScroll()
		},
		 
		onPageScroll:function({scrollTop}){
			var that = this
		 	that.scrollTop = scrollTop
		 	//console.log('wechat onPageScroll:'+that.scrollTop)
		},		 
		
		onLoad: function (options) { //
			var that = this
			var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : ''
			var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : ''
			var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
			that.mqtt_mid = m_id>0?m_id:that.mqtt_mid
			that.mqtt_goodsid = options.goods_id ? options.goods_id : that.mqtt_goodsid
			var mqtt_pub_title = that.mqtt_goodsid+'_'+that.mqtt_mid
			var current_date = util.formatTime(new Date())			
			
			that.goods_name = options.goods_name ? options.goods_name : ''
			that.goods_owner = options.goods_owner ? options.goods_owner : ''
			that.goods_shop_id = options.goods_shop_id ? options.goods_shop_id : 0
			
			that.qun_type = options.qun_type ? options.qun_type : '1'
			that.bar_title = that.goods_name?that.goods_name.substring(0,12):''
			that.frompage = options.frompage ? options.frompage : ''
			
			let is_refresh = options.is_refresh ? options.is_refresh : 0
			/*
			if(is_refresh == 1){
				that.messages=[]
				uni.redirectTo({
					url: '/pages/wechat/wechat?goods_id=' + that.mqtt_goodsid + '&goods_owner=' + that.goods_owner + '&goods_name=' + that.goods_name + '&goods_shop_id=' + that.goods_shop_id+ '&qun_type='+that.qun_type+'&is_refresh=0'
				})
			}			
			*/
			var screen_para=uni.getSystemInfoSync()
		    
			that.style.pageHeight = screen_para.windowHeight;
			that.style.contentViewHeight = that.style.pageHeight - 80
			console.log('wechat onload options:'+JSON.stringify(options)) 
		   
			if(that.qun_type=='1'){
				if(that.mqtt_goodsid == 0){
					that.goBack()
				}
			}
			uni.setNavigationBarTitle({
				title: that.bar_title+'_客户'
			})
		   //that.mqtt_pub_topic = 'SH_GDS01_' + that.mqtt_goodsid  //+'_'+ that.mqtt_mid
		   //that.mqtt_sub_topic = 'SH_GDS01_' + that.mqtt_goodsid  //+'_'+ that.mqtt_mid
		   //that.mqtt_connect()
		   //that.initSocketMessage()
		   /*
			
			*/
			if(that.mqtt_goodsid || that.goods_owner){
				console.log('wechat onload mqtt_pub_topic:'+that.mqtt_pub_topic+' mqtt_sub_topic:'+that.mqtt_sub_topic+' mqtt_goodsid:'+that.mqtt_goodsid)
				that.get_wechat_list()
			}
			 
			that.timer_heartbeat = setInterval(function () {
				that.heartbeat() //心跳
			}, 10*1000)
			that.timer_get_wechat = setInterval(function () {
				that.get_wechat_list()  //避免websocket遗漏
			}, 40*1000)
			 
		},
		methods: {	
			onBackPress(e) {
				var that = this
				var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : ''
				var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : ''
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
				var mqtt_pub_title = that.mqtt_goodsid+'_'+that.mqtt_mid
				var current_date = util.formatTime(new Date())
				clearInterval(that.timer_heartbeat)
				clearInterval(that.timer_get_wechat)
				
				//that.mqtt_unconnect()
				let websocket_end_message = {
					message_type: 2,  //商品服务群
					username: username,
					m_id:that.mqtt_mid,
					shop_type: shop_type,
					title: mqtt_pub_title,
					goods_id:that.mqtt_goodsid,
					content: 'Endding',
					imageurl:'',
					user:'customer',
					from_headimg:userInfo.avatarUrl,
					from_nickname:userInfo.nickname,
					from_username:username,
					createtime:current_date
				}
				let socket_message = JSON.stringify(websocket_end_message)
				socketMsgQueue.push(socket_message)
				that.sendSocketMessage()
				that.messages = []
				//socketOpen = false	
			}, 
			 
			heartbeat: function () {
				//心跳信息
				var that = this		
				var current_date = util.formatTime(new Date())
				 
				let websocket_heart_message = {
					message_type: 2,  //商品服务群
					username: username,
					m_id:that.mqtt_mid,
					shop_type: shop_type,
					//title: mqtt_pub_title,
					goods_id:that.mqtt_goodsid,
					//goods_owner:that.goods_owner,
					content: 'sh_gds_heartbeat',
					//imageurl:'',
					user:'customer',
					//from_headimg:userInfo.avatarUrl,
					//from_nickname:userInfo.nickname,
					//from_username:username,
					createtime:current_date
				}
				uni.sendSocketMessage({
					data: JSON.stringify(websocket_heart_message), //自身定义一个发送消息对象
					success: function(res) {									
						
						//console.log('chatroomservice WebSocket发送完成！socketMsgQueue:'+JSON.stringify(socketMsgQueue))
					},
					fail: function(error) {
						socketOpen = false;
						getApp().globalData.websocketOpen = socketOpen
						console.log('wechat WebSocket heart beat 发送失败！res:'+JSON.stringify(error))
						uni.showToast({
							title: '网络故障',
							icon: 'loading',
							duration: 1500
						})
						that.initSocketMessage()
						return
						
					}
				})
			},
			 
			initSocketMessage: function () {
				var that = this
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				var uid = username + '_' + shop_type+'_'+that.mqtt_goodsid
				var remindTitle = socketOpen ? '正在关闭' : '正在连接';
				var goods_id = that.mqtt_goodsid
				if (!socketOpen) {
					console.log('initSocketMessage socketOpen:'+socketOpen+' mqtturl:'+mqtturl+' wssurl:'+wssurl+' goods_id:'+goods_id+' socketMsgQueue:'+JSON.stringify(socketMsgQueue));
					socketTask = uni.connectSocket({
						url: mqtturl + '/wss',
					})
				
					uni.onSocketError(function (error) {
						socketOpen = false;
						getApp().globalData.websocketOpen = socketOpen
						console.log('wechat initSocketMessage onSocketError WebSocket连接打开失败，请检查！'+JSON.stringify(error));
						that.socktBtnTitle = '连接socket'
						uni.hideToast();
					})
					uni.onSocketOpen(function(res) {
						console.log('wechat WebSocket连接已打开', mqtturl + '/wss');
						uni.hideToast();
						that.socktBtnTitle = '断开socket'
						socketOpen = true	
						getApp().globalData.websocketOpen = socketOpen							
						uni.sendSocketMessage({
							data: uid
						})
						//that.sendSocketMessage()
						that.get_wechat_list()
					})	
					uni.onSocketMessage(function (res) {
						let username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
						let recv_message = res.data?JSON.parse(res.data, true):'';								 
						//console.log('wechat 收到服务器内容：' + res.data)
						if(recv_message['d']){						
							let reply_message = {
								user: recv_message['d']['user'],
								type:recv_message['d']['type']?recv_message['d']['type']:'text',
								content: recv_message['d']['content']?recv_message['d']['content']:'感谢您的支持',
								imageurl: recv_message['d']['imageurl']?recv_message['d']['imageurl']:'',
								hasSub: recv_message['d']['hasSub']?recv_message['d']['hasSub']:false,
								subcontent: recv_message?recv_message['d']['type']:'',
							}
							console.log('wechat 收到来自' + recv_message['d']['user'] + '的消息' + JSON.stringify(reply_message))
							if(reply_message['user']=='home'){
								socketRcvMsg = reply_message
								that.getSocketMessage(socketRcvMsg)
								//that.addMessage(reply_message['user'], reply_message['content'], reply_message['hasSub'],reply_message['type'],reply_message['subcontent'],reply_message['imageurl'])	
							}							
						}
					})
					uni.onSocketClose(function (res) {
						socketOpen = false
						getApp().globalData.websocketOpen = socketOpen
						console.log('wechat onSocketClose WebSocket 已关闭！');
						//uni.hideToast();
						//that.socktBtnTitle = '连接socket'
						that.initSocketMessage()
					})
				} 
			},
			
			sendSocketMessage: function () {
				var that = this
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
				var myDate = util.formatTime(new Date())
				//var message = that.socket_message
			 
				if (!socketOpen) {
					//console.log('wechat sendSocketMessage socketOpen:'+socketOpen);
					//socketMsgQueue.push(message);
					that.initSocketMessage();
				} else {
					if(socketMsgQueue.length > 0){
						if(is_sending){
							console.log('wechat sendSocketMessage 系统繁忙！is_sending:'+is_sending)
							//return
						}else{
							is_sending = true
						}
						
						let resend_msg = socketMsgQueue
						for (var i = 0; i < resend_msg.length; i++) {
							let socket_message = resend_msg[i]
							//console.log('wechat sendSocketMessage i:'+i+' socket_message:'+socket_message);
							uni.sendSocketMessage({
								data: socket_message, //自身定义一个发送消息对象
								success: function() {
									//console.log('wechat WebSocket发送完成！socket_message：'+socket_message)
									socketMsgQueue.splice(i, 1)
									if(socketMsgQueue.length == 0) is_sending = false
								},
								fail: function() {
									socketOpen = false;
									getApp().globalData.websocketOpen = socketOpen
									console.log('wechat WebSocket发送失败！')
									uni.showToast({
										title: '网络故障',
										icon: 'loading',
										duration: 1500
									})
									that.initSocketMessage()
									return
									//that.socktBtnTitle = '连接socket'
									//uni.hideToast();
								}
							})
						}
					}
				}
			},
			 
			/*
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
					console.log(mqtt_hosts, this.mqtt_options)
					this.mqtt_client = mqtt_service.connect(
						mqtt_hosts,
						this.mqtt_options
					)
			
					this.mqtt_client.on('connect', () => {
						uni.hideLoading()
						this.is_connect = true
						console.log('wechat 连接成功');
						this.mqtt_subscribe()
					})
					this.mqtt_client.on('message', (topic, message) => {						
						var recv_message = JSON.parse(message)
						var recv_content = JSON.parse(recv_message['d']['content'])
						var reply_message = {
							user: recv_content['user'],
							type:recv_message['d']['type']?recv_message['d']['type']:'text',
							content: recv_content['content']?recv_content['content']:'感谢您的支持',
							hasSub: recv_message['d']['hasSub']?recv_message['d']['hasSub']:false,
							subcontent: recv_message?recv_message['d']['type']:'',
						}
						console.log('wechat 收到来自' + topic + '的消息' + message.toString())
						if(recv_content['user']!='customer'){
							that.addMessage(recv_content['user'], reply_message['content'], reply_message['hasSub'],reply_message['type'],reply_message['subcontent'],recv_content['imageurl'])	
						}
					})
				}  
					
				this.mqtt_client.on('reconnect', error => {
					//uni.hideLoading();
					this.is_connect = false
					this.mqtt_unsubscribe()
					console.log('正在重连...')					
				})
				
				this.mqtt_client.on('error', error => {
					uni.hideLoading()
					this.is_connect = false
					console.log('连接失败');
				})
			},
			
			mqtt_subscribe: function() {
				// 判断是否已成功连接
				var that = this
				if (!that.is_connect) {
					uni.showToast({
					  title: '客户端未连接...',
					  icon: 'loading',
					  duration: 1000
					})
					that.is_connect = false
					return
				}
			
				that.mqtt_client.subscribe(that.mqtt_sub_topic, {
					qos: that.Qos
				}, error => {
					if (!error) {
						console.log('订阅成功:'+that.mqtt_sub_topic);
					}
				})
			},
			
			mqtt_publish: function() {
				var that = this
				// 判断是否已成功连接
				if (that.is_connect == false) {
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
							content:JSON.stringify(mqtt_pub_message),
							from_headimg:userInfo.avatarUrl,
							from_nickname:userInfo.nickname,
							from_username:username,
							index:i,
						}
					}
					that.mqtt_pub_content = JSON.stringify(mqtt_pub_content) 	
					var mqtt_opts = {
						qos: 0, 
						retain: false, 
						dup: false,
					}
					that.mqtt_client.publish(that.mqtt_pub_topic,that.mqtt_pub_content,mqtt_opts, error => {
						console.log(error || '消息发布成功:'+that.mqtt_pub_topic+' content:'+ that.mqtt_pub_content)
						 
						let pub_list  = JSON.parse(that.mqtt_pub_content) 
						let index = pub_list['d']['index']
						this.update_pub_list(index)
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
						//console.log(err || '取消订阅成功');
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
					console.log('当前未连接')
					
				} else {
					this.mqtt_client.end();
					this.mqtt_client = null
					console.log('断开连接');
				}
				this.is_connect = false
				return true
			},
			*/
		   		   
			update_goods_custservice: function() {
				var that = this;
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
				var shop_type = that.shop_type; 	
				var goods_id = that.mqtt_goodsid?that.mqtt_goodsid:0
				var goods_shop_id = that.goods_shop_id?that.goods_shop_id:0
				var goods_owner = that.goods_owner?that.goods_owner:''
				
				uni.request({
					url: weburl + '/api/mqttservice/update_goods_custservice',
					method: 'POST',
					data: {
						username: username,
						access_token: token,
						shop_type: shop_type,
						goods_id: goods_id,
						goods_owner:goods_owner,
						goods_shop_id:goods_shop_id,
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json'
					},
					success: function (res) {
						console.log('update_goods_custservice：'+ JSON.stringify(res.data.result))
					}
				})
			},
			
			goBack: function() {
				var that = this
				//that.mqtt_unconnect()
				if(that.frompage=='/pages/my/index' || that.frompage=='/pages/hall/hall' || that.frompage=='/pages/cart/cart'){
					uni.switchTab({
						url: that.frompage
					})
				} else {
					var pages = getCurrentPages();
					if (pages.length > 1) {
					  uni.navigateBack({
					    changed: true,
						data:1,
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
				if(that.inputValue == '') {
					return 
				} else if(!socketOpen){
					uni.showToast({
					  title: '系统繁忙,请稍候',
					  icon: 'loading',
					  duration: 2000
					})
					that.initSocketMessage()
					return
				}
				var inputmessage = {
					user:'customer',
					type: 'text',
					content: that.inputValue,
					imageurl: '',
					hasSub: false,
					subcontent: '',
				}
				console.log('getInputMessage inputmessage:'+JSON.stringify(inputmessage))
				that.getSocketMessage(inputmessage)
				/*
				if(!is_sending) {
					that.addMessage('customer', message.content, false)
					that.inputValue = ''
				}else{
					console.log('getInputMessage 系统繁忙 is_sending:'+is_sending+' socketMsgQueue:'+JSON.stringify(socketMsgQueue));
					uni.showToast({
					  title: '系统繁忙,请稍候',
					  icon: 'loading',
					  duration: 2000
					})
					that.sendSocketMessage()
				}
				*/
			},
			 
			getSocketMessage: function (Msginfo = {}) { //获取子组件的输入数据
				var that = this
				if(!Msginfo){
					return
				}  
				
				console.log('getSocketMessage Msginfo:'+JSON.stringify(Msginfo))
				if(!is_sending) {
					that.addMessage(Msginfo['user'], Msginfo['content'], Msginfo['hasSub'],Msginfo['type'],Msginfo['subcontent'],Msginfo['imageurl'])	
				} else {
					console.log('getSocketMessage 系统繁忙 is_sending:'+is_sending+' socketMsgQueue:'+JSON.stringify(socketMsgQueue));
					uni.showToast({
					  title: '系统繁忙,请稍候',
					  icon: 'loading',
					  duration: 2000
					})
					that.sendSocketMessage()
				}				
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
				var goods_owner = that.goods_owner
				var shop_type = that.shop_type
				var mqtt_pub_title = that.mqtt_goodsid+'_'+that.mqtt_mid
				var current_date = util.formatTime(new Date())
				var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : ''
				var avatarUrl = userInfo.avatarUrl				
				if(content!='') content = util.filterEmoji(content); //去除表情符
				let message = {
					user: user,
					avatarUrl:avatarUrl,
					type:type,
					content: content,
					hasSub: hasSub,
					subcontent: subcontent,
					imageurl:imageaddr,
				}
				
				let websocket_pub_message = {
					message_type: 2,  //商品服务群
					username: username,
					m_id:m_id,
					shop_type: shop_type,
					title: mqtt_pub_title,
					goods_id:goods_id,
					goods_owner:that.goods_owner,
					content_type:type,
					content: content,
					imageurl:imageurl,
					user:user,
					from_headimg:userInfo.avatarUrl,
					from_nickname:userInfo.nickname,
					from_username:username,
					createtime:current_date
				}
				chat_messages.push(message)
				//console.log('wechat addMessage messages len:'+that.messages.length+' info:'+JSON.stringify(that.messages))
				that.messsages = chat_messages
				setTimeout(function () {
					that.scrollToBottom()
				}, 300)
				if(user=='customer'){
					//that.mqtt_pub_list.push(message)
					if(is_sending ) {
						console.log('wechat addMessage() 系统繁忙 is_sending: '+is_sending)
						console.log('wechat addMessage socketMsgQueue:'+JSON.stringify(socketMsgQueue))
						return
					}else{
						let socket_message = JSON.stringify(websocket_pub_message)
						socketMsgQueue.push(socket_message);
						//that.mqtt_publish()
						that.sendSocketMessage()
						that.inputValue = ''
					}					
				}
				that.message_len++
				if(that.message_len == 1){
					//更新商品群状态信息
					that.update_goods_custservice()
				}
				
				/*
				if(this.is_connect == false){
					console.log('addMessage:当前未连接');
					return false
				}else{
					that.messages.push(message)					
					if(user=='customer'){
						//that.mqtt_pub_list.push(message)
						that.socket_message = JSON.stringify(message)
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
				}	
				*/
			},
			//查询历史记录
			get_wechat_list: function () { 
				var that = this
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
				var shop_type = that.shop_type; //var shape = 1
				var page = that.page==0?1:that.page;
				var pagesize = that.pagesize>0?that.pagesize:30			
				var goods_id = that.mqtt_goodsid;
				var goods_owner = that.goods_owner
				var m_id = that.mqtt_mid
				uni.request({
					url: weburl + '/api/mqttservice/get_wechat_list',
					method: 'POST',
					data: {
						username: username,
						access_token: token,
						m_id:m_id,
						goods_id:goods_id,
						goods_owner:goods_owner,
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
						//console.log('wechat get_wechat_list:'+JSON.stringify(wechat_list))
						
						if (wechat_list) {	
							var len = wechat_list.length
							chat_messages = []
							for (var i = len -1; i >= 0; i--) {
								 //console.log('i:'+i+' wechat info:'+ JSON.stringify(wechat_list[i]))
								 if(wechat_list[i]['content'][0]['content']!='' || wechat_list[i]['content'][0]['imageurl']!=''){
									 let message = {
									 	user: wechat_list[i]['user'],
									 	avatarUrl:wechat_list[i]['avatarUrl'],
									 	type:wechat_list[i]['type'],
									 	content: wechat_list[i]['content'][0]['content'],
									 	hasSub: wechat_list[i]['hasSub'],
									 	subcontent: wechat_list[i]['subcontent'],
									 	imageurl:wechat_list[i]['content'][0]['imageurl'],
									 }
									 chat_messages.push(message)
								 }
							}
							that.messages = chat_messages
							that.initSocketMessage()
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
					console.log('query len:',res[0].length+' messages len:'+chat_messages.length+' list:'+JSON.stringify(chat_messages))
					res[0].forEach(function (rect) {						
						let msg_content = rect.dataset.msg_content
						console.info('wechat scrollToBottom id:'+rect.id+' msg_content:'+msg_content)
						that.style.mitemHeight = that.style.mitemHeight + rect.height
					})
						
					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight ;
						//console.info('scrollToBottom scrollTop:'+that.scrollTop)					
						
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
				var goods_id = that.mqtt_goodsid;
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

	.message-content {
		flex: 1;
		border: solid 1upx #ddd;
		padding: 10upx !important;
		font-family: verdana !important;
		border-radius: 15upx;
	}
</style>
