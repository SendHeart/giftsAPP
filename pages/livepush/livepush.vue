<template>
    <view class="content">
		<view class="butlist">
			<view @tap.stop="back" class="buticon martp10">
				<image src="../../static/livepush/back2.png"></image>	
				<view class="mar10">结束</view>				
			</view>
			<view @tap.stop="switchCamera" class="buticon martp10">
				<image src="../../static/livepush/reversal.png"></image>	
				<view class="mar10">翻转</view>				
			</view>
			<view class="live-buticon" @tap.stop="startPusher">
				<image v-if="begin" src="../../static/images/liveplayer.png" class="live-player"></image>
				<image v-if="!begin" src="../../static/images/liveplayer_s.png" class="live-player">{{contTime}}</image>
				<!--
				<view class="x_f"></view>
				<view :class="begin==true?'givebegin':'give'" >{{contTime}}</view>
				-->
				<view class="pulse" v-if="begin"></view> 
			</view>
			<view class="buticon martp10" @click="danmuInfo">
				<image src="../../static/livepush/beautiful.png"></image>	
				<view class="mar10">查看</view>				
			</view>
			<view  class="buticon martp10"> 
				<picker :value="index" @change="bindPickerChange" :range="array" range-key='cont'>
					<image src="../../static/livepush/countdown.png"></image>	
					<view class="mar10" >倒计时</view>
				</picker>	
			</view>
		</view>
		 
		<uni-popup :show="danmuHidden" type="bottom" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">基本信息</view>
				<view class="uni-tip-content">
					<scroll-view scroll-y :style="'height:'+'100px'">
						<pd-list :list="danmuServ"></pd-list>
					</scroll-view>
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="danmuInfo">返回</view>
				</view>
			</view>
		</uni-popup>
    </view>
</template>

<script>
	//import lBarrage from '@/components/l-barrage/l-barrage.vue' ;
	import uniPopup from '@/components/uni-popup/uni-popup.vue' ;
	//import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
	import PdList from "./pd-list.vue";
	var dateUtils = require('../../common/util.js');
	var wssurl = getApp().globalData.wssurl;
	var weburl = getApp().globalData.weburl;
	var shop_type = getApp().globalData.shop_type;
	
    export default {
		data() {
			return {
			    begin:false,//开始录制
				complete:false,//录制完毕
				pause:false,//暂停推流
				currentWebview:null,
				pusher:null,
				pushurl:'',
				logininfokey:'',//登录验证加密串，
				homeworkcont:'',//作业信息
				jiexititle:'',//作业解析标题
				index: 0,//定时
				indextu:0,//是否开启定时
				contTime:'',
				liveid:'3954',
				live_status:0,
				danmuServ:[],
				danmuList:[],
				danmn_page: 1,
				danmu_pagesize: 20,
				danmu_pageoffset:0,
				danmuHidden: false,
				dkheight:500 ,
				live_member:0,
				live_focus:0,
				windowHeight:500,
				array: [{//话题标签
						"id": 1,
						"cont": "10秒",
						"time": 10
					}, {
						"id": 2,
						"cont": "20秒",
						"time": 20
					}, {
						"id": 3,
						"cont": "30秒",
						"time": 30
					}, {
						"id": 4,
						"cont": "40秒",
						"time": 40
					},{
						"id": 5,
						"cont": "50秒",
						"time": 50
					},
					{
						"id": 6,
						"cont": "60秒",
						"time": 60
					}],
			}
		},
		 
		onShow() {
			 uni.getNetworkType({
				success: function (res) {
					console.log(res.networkType);
					if(res.networkType != 'wifi'){
						uni.showModal({ //提醒用户更新
							title: '温馨提示',
							content: '当前非Wifi网络，请注意您的流量是否够用',
							success: (res) => {
								 
							}
						})
					}
				}
			})
			
			uni.onNetworkStatusChange(function (res) {
				console.log(res.isConnected);
				console.log(res.networkType);
				if(res.networkType != '4g' && res.networkType != 'wifi'){
					uni.showModal({ //提醒用户更新
						title: '温馨提示',
						content: '当前网络质量差，请切换为移动网络或Wifi网络',
						success: (res) => {
							 
						}
					})
				}
			});
			this.queryDanmu()
		},
		 onBackPress(){
				this.back()
			    console.log("BackButton Key pressed!" );
				return true;
		 },
        onLoad(res) {
			var that = this
			that.userInfo = uni.getStorageSync('userInfo');
			that.userauth = uni.getStorageSync('userauth') ? uni.getStorageSync('userauth') : '';
			that.pushurl = res.pushurl
			that.txSecret = res.txSecret?res.txSecret:''
			that.txTime = res.txTime?res.txTime:'' 
			that.liveid = res.liveid?res.liveid:0
			console.log('livepush pushurl:',that.pushurl,' txSecret:',that.txSecret,' txTime:',that.txTime,' liveid:',that.liveid)
			that.jiexititle=res.title
	        that.getwebview()//获取webview
        },
		methods: {
			onTap() {
				let val = this.userInfo.wx_nickname+'来了，请多关注';
				this.danmuServ.push(val);
				this.$refs.lBarrage.add(val);
			},
			onEnd() {
				console.log("一轮结束");
				this.$refs.lBarrage.start(this.danmuServ);
			},
			 
			danmuInfo() {
				console.log("danmuInfo:",JSON.stringify(this.danmuServ));
				var that = this
				//that.danmuHidden = !that.danmuHidden
				var content = '在线:'+that.live_member+' \t'
				content += '\t关注:' + that.live_focus + '\n'
				uni.showModal({
				    title: '直播间信息',
				    content: content,
				    success: function (res) {
					if (res.confirm) {
							console.log('用户点击确定');
				        } else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			
			//倒计时
			bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.index = e.target.value
				// this.indexs = e.target.value
				this.contTime=this.array[e.target.value].time
				uni.showToast({
					title: '请点击红色按钮，开始进入倒计时',
					icon:'none',
					duration: 4000,					 
				});
			},
			/**
			 * 返回
			 */
			back(){
				var that = this
				uni.showModal({
					title: '提示',
					content: '确认返回',
					success: function (res) {
						if (res.confirm) {
							setTimeout(()=>{
								 uni.reLaunch({
								 	url:'/pages/my/index'
								 })
							 },1000) 
							 that.live_status = 0
							 that.pusher.close();//暂停推流
							 that.update_liveroom()
							//this.currentWebview=null
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			/**
			 * 获取当前显示的webview
			 */
			getwebview(){
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				var getcurrentWebview = page.$getAppWebview();
				//console.log('pages:',this.pages,' page:',this.page)
				//console.log(this.page)
				console.log(JSON.stringify(page.$getAppWebview()))
				this.currentWebview=getcurrentWebview;
				// #endif
				this.plusReady()//创建LivePusher对象
			},

			/**
			 * 创建LivePusher对象 即推流对象
			 */ 
			plusReady(){				
				// 创建直播推流控件
				var live_push_url =  this.pushurl+'?txSecret='+this.txSecret+'&txTime='+this.txTime ;
				this.pusher =new plus.video.LivePusher('pusher',{
					url:live_push_url,
					mode: 'HD', //推流视频模式:SD(标清),HD(高清),FHD(超清)
					top:'0',
					left:'0px',
					width: '100%',
					height:  uni.getSystemInfoSync().windowHeight-50 + 'px',				
					position: 'static',//static静态布局模式，如果页面存在滚动条则随窗口内容滚动,absolute绝对布局模式，如果页面存在滚动条不随窗口内容滚动； 默认值为"static"
					beauty:'0',//美颜 0-off  1-on  
					whiteness:'0',//0、1、2、3、4、5，0不使用美白，值越大美白程度越大。
					aspect:'3:4',	//3:4   9:16				
 				});
				console.log('plusReady pusher:',JSON.stringify(this.pusher))
				console.log('plusReady currentWebview:',JSON.stringify(this.currentWebview))
				//将创建的对象 追加到webview中
				this.currentWebview.append(this.pusher);
				// 监听状态变化事件  
				this.pusher.addEventListener('statechange',(e)=>{
					console.log('statechange: ',JSON.stringify(e));
				}, false);
			},			
			//美颜
			beautiful(){
				console.log(JSON.stringify(this.pusher))
				//this.pusher.options.beauty=1
				//this.plusReady() //创建LivePusher对象
			},
			// 开始推流
			startPusher(){
				//判断是否倒计时开始
				var that = this
				if(that.contTime!=''){
					if(that.indextu!=1){
						that.conttimejs()
					}
				}else{
					that.beginlivepush()
				}
			},
			conttimejs(){
				var that = this
				if(that.contTime!=''){
					that.indextu=1;//开启计时
					if(that.contTime==1){
						console.log("开始")
						that.contTime=""
						that.beginlivepush()
						return false
					}
					that.contTime--
					setTimeout(()=>{
						that.conttimejs()
					},1000)
				}
			},
			beginlivepush() {
				var that = this 
				that.indextu=0;//关闭计时
				var live_push_url =  that.pushurl+'?txSecret='+that.txSecret+'&txTime='+that.txTime ;
				console.log('beginlivepush begin:',that.begin,' pause:',that.pause)
				if(that.begin==false){//未开启推流
					that.begin=true;//显示录制动画
					that.pause=false;//推流开关置为默认状态
					// 设置推流服务器  ***此处需要通过ajax向后端获取
					that.pusher.setOptions({
						'url': live_push_url ,//推流地址********************************* 此处设置推流地址
						'enable-camera': true,  
					});
					that.pusher.start();//推流开启
					uni.showToast({
						title: '开始录制',
						icon:'none',
						duration: 2000,					 
					});
					that.live_status = 1 //1在线
				}else{
					if(that.pause==true){//暂停推流状态
						that.begin=true;//显示录制动画
						that.pause=false;//推流开关置为默认状态
						that.pusher.resume();//恢复推流
						uni.showToast({
							title: '开始录制',
							icon:'none',
							duration: 2000,					 
						});
						that.live_status = 1 //1在线
					}else{
						that.begin=false;//关闭录制动画
						that.pause=true;//推流暂停
						that.live_status = 3 //3暂停
						that.pusher.pause();//暂停推流
						/*
						that.pusher.setStyles({
							'enable-camera': false,  
						});
						*/
						uni.showToast({
							title: '暂停录制',
							icon:'none',
							duration: 2000,					 
						});
						
						//提示是否上传
						//this.upload()
					}
				}
				that.update_liveroom()
			},
			/**
			 * 切换摄像头
			 */ 
			switchCamera() {
				this.pusher.switchCamera();
			},
			/**
			 * 完成录制
			 */
			upload(){
				 uni.showModal({
				 	title: '提示',
				 	content: '确定退出吗',
				 	success:(res)=> {
				 		if (res.confirm) {
				 			 console.log('用户点击完成');
							 this.pusher.pause();//暂停推流
							 this.endlivepush()
							/* setTimeout(()=>{
								 this.endlivepush()
							 },1000) */
				 		} else if (res.cancel) {
				 			console.log('用户点击取消');
				 		}
				 	}
				 });
			}, 
			//结束推流,此处需要调用后台接口向云服务商提交结束状态
			endlivepush(){
				var that = this
				uni.showToast({
					icon:'loading',
					title: '结束...',
					duration: 500
				});
				
				setTimeout(()=>{
					 that.live_status = 0
					 that.update_liveroom()
				 },300) 
			
				return false
			},
			 
			queryDanmu: function () {
			    var that = this
			    var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
			    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1'
			    var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : ''
			    var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : ''
			    var liveid = that.liveid
			
			  
			    uni.request({
			      url: weburl + '/api/client/query_liveroom_info',
			      method: 'POST',
			      data: {
			        username: username ? username : openid,
			        m_id: m_id,
			        liveid: liveid,
			        access_token: token,
			        shop_type: shop_type,
			      },
			      header: {
			        'Content-Type': 'application/x-www-form-urlencoded',
			        'Accept': 'application/json'
			      },
			      success: function (res) {
			        if (res.data.status == 'y') {
			          var result = res.data.result
					  that.live_member = result.live_member
					  that.live_focus = result.live_focus
			        }  
			      }
			    })
			    setTimeout(function () {
			      that.queryDanmu()
			    }, 1000 * 30)
			},
			update_liveroom: function () {
			 	var that = this
			 	var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
			 	var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1'
			 	var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : ''
			 	var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : ''
			 	var liveid = that.liveid
			 	var live_status = that.live_status
			 	var live_push_url =  that.pushurl+'?txSecret='+that.txSecret+'&txTime='+that.txTime ;
				
			 	uni.request({
			 	  url: weburl + '/api/client/update_liveroom',
			 	  method: 'POST',
			 	  data: {
			 	    username: username ? username : openid,
			 	    m_id: m_id,
			 	    liveid: liveid,
			 		live_status:live_status,
			 	    access_token: token,
			 	    shop_type: shop_type,
					live_push_url:live_push_url,
			 	  },
			 	  header: {
			 	    'Content-Type': 'application/x-www-form-urlencoded',
			 	    'Accept': 'application/json'
			 	  },
			 	  success: function (res) {
			 	    if (res.data.status == 'y') {
			 			console.log('update live room status :',res.data)
			 	    }  
			 	  }
			 	})
			 },
		},
		
		components:{
			//lBarrage,
			uniPopup,
			//MescrollUni,
			PdList,
		}
    }
</script>

<style>
	.content{
		background: #000;
		overflow: hidden;
	}
	.butlist{
		height: 50px;
		position: absolute;
		bottom: 0;
		display: flex;
		direction: row;
		width: 100%;
		justify-content: space-around;
	    padding-top: 2px;
		border-top: 1px solid #fff;
		font-size: 23rpx;
	}
	.buticon{
		height: 100upx;
		width: 100upx;
		color: #fff;
		position: relative;
		text-align: center;
	}
	.buticon image{
		height: 20px;
		width: 20px;
	}
	.buticon .mar10{
		margin-top: -10px;
	}
	.martp10{
		margin-top: 5px;
	}
	
	.live-buticon{
		height: 80upx;
		width: 80upx;
		color: #fff;
		position: relative;
		text-align: center;
	}
	.live-buticon image{
		height: 80upx;
		width: 80upx;
	}
	/*
	.give {
		width: 60upx;
		height: 60upx;
		background: #F44336;	
		border-radius: 50%;
		box-shadow: 0 0 22upx 0 rgb(252, 94, 20);
	 	position: absolute; 
		align-items: center;
		left:10.5upx;
		top:10.5upx; 
		font-size: 44upx;
		line-height: 60upx;
	}
	.givebegin {
		width: 60upx;
		height: 60upx;
		background: #F44336;	
		border-radius: 20%;
		box-shadow: 0 0 10upx 0 rgb(252, 94, 20);
	 	position: absolute; 
		left:11.3upx;
		top:11.8upx; 
	}
	.x_f{
		border: 6upx solid #F44336; 
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 28upx 0 rgb(251, 99, 24);
		width: 80upx;
		height: 80upx;
		position: absolute;
		text-align: center;
		top:0;
		left: 0;
	}
	*/
	.live-player {
		width: 50px;
		height: 50px;
		position: absolute;
		text-align: center;
		top:0;
		left: 0;
	}
	
	/* 产生动画（向外扩散变大）的圆圈  */
	.pulse {
		width: 120upx;
		height:120upx;
		position: absolute;
	    border: 12upx solid #F44336;
	    border-radius: 100%;
	    z-index: 1;
	    opacity: 0;
	    -webkit-animation: warn 2s ease-out;
	    animation: warn 2s ease-out;
	    -webkit-animation-iteration-count: infinite;
	    animation-iteration-count: infinite;
	    left: -30.8upx;
	    top: -30.8upx;
	}
		
	/* 提示窗口 */
		.uni-tip {
			position: relative;
			bottom:80px;
			padding: 15px;
			width: 100%;
			background: #fff;
			box-sizing: border-box;
			border-radius: 0px;
			margin-bottom: 0rpx;
			z-index:999;
		}
	
		.uni-tip-title {
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			padding: 15px;
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			margin-top: 10px;
			display: flex;
		}
	
		.uni-tip-button {
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
		.placeholder {
			opacity: 1;
			transition: opacity 0.4s linear;
		}
		
		.placeholder.loaded {
			opacity: 0;
		}
		
		.uni-media-list-logo {
			position: relative;
		}
		
		.uni-media-list-logo .image {
			position: absolute;
		}
	/**
	 * 动画
	 */
	@keyframes warn {
	0% {
		transform: scale(0);
		opacity: 0.0;
	}
	25% {
		transform: scale(0);
		opacity: 0.1;
	}
	50% {
		transform: scale(0.1);
		opacity: 0.3;
	}
	75% {
		transform: scale(0.5);
		opacity: 0.5;
	}
	100% {
		transform: scale(1);
		opacity: 0.0;
	}
}
	 
</style>
