<template>
	<view  class="jsfun-record" @tap="showPicker">
	 <slot></slot>
	 <!-- 遮罩层 -->
	 <view class="mask" @tap.stop="closePicker" v-if="isShow" @touchmove.stop.prevent="moveHandle"></view>
	 <!-- 多选控件 -->
	 <view class="conbox record" :class="{'pickerShow':isShow}" >
		

		
		<!-- 此处可放置倒计时，可根据需要自行添加 -->
		<view class="time"> 
			{{showRecordTime}}
		</view>
		<view class="c999"> 
			最短{{minTime}}秒，最长{{maxTime}}秒
		</view>
		<view class="record-box"  @touchstart="start" @longpress="record" @touchend="end"  @touchmove.stop.prevent="moveHandle">
			<span class="stop" @touchstart.stop="stopVoice" v-if="voicePath && playing==1"></span>
			<span class="paly" @touchstart.stop="playVoice" v-if="voicePath && playing==0"></span>
			<canvas class="canvas" canvas-id="canvas">
				<span class="recording"></span>
			</canvas>
			<span class="confirm" @touchstart.stop="okClick" v-if="voicePath"></span>
		</view>
		<view class="c666 fz32 domess">长按录音</view>
	 </view>
	</view>
</template>
<script>	
	const recorderManager = uni.getRecorderManager();//录音
	const innerAudioContext = uni.createInnerAudioContext();//播放
	export default {
		name: 'jsfun-record',
		props: {
			voicePath: { //默认地址
				type: String,
				default: '' 
			},
			maxTime: { // 录音最大时长，单位秒
				type: String,
				default: "60"
			},
			minTime: { // 录音最大时长，单位毫秒
				type:String ,
				default: "5"
			},
		},		
		data() {
			return {				
				isShow:false,	
				frame: 50, // 执行绘画的频率，单位毫秒
				recordTime:0,//录音时长
				isshowyuan:false,//是否显示圆圈
				playing:0,//是否播放中
			}
		},
		computed: {
			showRecordTime() {
				var strs = "";
				var m = Math.floor(this.recordTime/60);
				if(m<10) strs = "0"+m;
				
				var s = this.recordTime%60;
				strs += (s<10) ? ":0"+s : ":"+s;
								
				return strs
			}
		},
		watch: {
			//这里需要监听默认值的改变，重新初始化
		  //   defaultArr(val) {
				// console.log(val);
				// this.initValue();
		  //   }
		},
		onLoad() {		
			var _this = this;
			
			//获取录音权限
			uni.authorize({
				scope: 'scope.record',
				success() {
				}
			})
			
			//初始化
			this.initValue();			
			
		},
		onReady() {
			var _this = this;
			
			//录音停止事件
			recorderManager.onStop(function (res) {
				console.log('recorder stop' + JSON.stringify(res));
				_this.voicePath = res.tempFilePath;
			});	
			
							
			//根据canvas 动态中心点				
			var query = uni.createSelectorQuery();
			query.select(".canvas").boundingClientRect()
			query.exec(function(res){
				//这里原来使用比例计算发现有误差，所以采用下边的中心点计算
				//_this.bili = res[0].width / 100;
				
				_this.tempw = res[0].width;//使用canvas的宽度计算中心点的位置
				_this.temph = res[0].height;
			})
			//根据中心图片的大小计算圆环的大小
			var query = uni.createSelectorQuery();
			query.select(".recording").boundingClientRect()
			query.exec(function(res){
				_this.tempw1 = res[0].width;//使用点按图形的宽度计算圆环的宽高
			})
			
			
		},
		methods: {
			moveHandle(){
				return false;
			},
			//组件数据初始化  进入时、关闭时调用初始化
			initValue(){
				
			},	
			//显示组件
			showPicker(){
				setTimeout(() => {
				  this.isShow = true;
				}, 100);				
			},
			//关闭组件
			closePicker(){				
				this.isShow = false;
				//点遮罩 点取消关闭说明用户不想修改，所以这里对数据进行初始化
				this.initValue(); 
				this.stopVoice();
			},					
			//点击确定
			okClick(){
				// var data = {},list = {},textStr = "",indexStr = "";								
				this.$emit('okClick',this.voicePath)
				
				//确定后更新默认初始值,这样再次进入默认初值就是最后选择的
				// this.defaultArr = textStr;
				//关闭
				this.closePicker();
			},
			
			
			start: function() {
				this.stopVoice();
				this.voicePath = "";//音频地址				
				this.recordTime = 0;			
				//生成canvas对象
				this.canvasObj = uni.createCanvasContext('canvas');	
			},
			end: function() {
				let recordTime =  this.recordTime;
				
				clearInterval(this.timeObj); //清除计时器
				clearInterval(this.drawObj); //清除画布动画	
				this.recordTime = 0;//清除计时
				this.isshowyuan = false;//隐藏圆圈
				//清除canvas内容 方式一：不知道为啥 不起作用
				//this.canvasObj.clearRect(0,0,this.canvasObj.width,this.canvasObj.height);
				//清除canvas内容 方式二：填充canvas为白色
				this.canvasObj.setFillStyle('#fff')
				this.canvasObj.fillRect(0, 0, this.canvasObj.width,this.canvasObj.height)
				this.canvasObj.draw()
				 
				if(recordTime < this.minTime ){					
					if (recordTime<=0) { 
						//==点击事件==;
						return false;
					}					
					//==小于5秒==;
					uni.showToast({
						title:"不能小于"+this.minTime+"秒,请重新录制",
						icon:"none"
					})
					return false;
				} 		
						
						
				recorderManager.stop();	
			},
			record: function() {
				let _this = this;
				
				_this.isshowyuan = true			
				// 开始录音
                recorderManager.start();	
			
				_this.timeObj = setInterval(function() {	
					_this.recordTime ++;		
					if(_this.recordTime  == _this.maxTime) _this.end();
				},1000);
				
				//中心点坐标 这里如果直接除2发现位置有偏差，目前还没明白为什么要减1
				let pianyi = 0
				switch(uni.getSystemInfoSync().platform){
					case 'android': pianyi=0;break;
					case 'ios':pianyi=1;break;
					default:pianyi=1; break;
				}
				let centerX = _this.tempw/2 + pianyi;
				let centerY = _this.temph/2 + pianyi;
				let yuanhuanW = _this.tempw1/2+4;//圆环的半径  中间图片的宽度/2 + 4
				
				// 录音过程圆圈动画的背景园
				_this.canvasObj.beginPath();
				_this.canvasObj.setStrokeStyle("#fe3b54");
				_this.canvasObj.setGlobalAlpha(0.3)
				_this.canvasObj.setLineWidth(3);
				_this.canvasObj.arc(centerX,centerY, yuanhuanW , 0, 2 * Math.PI);				
				_this.canvasObj.stroke();
				_this.canvasObj.draw();
				
				// 录音过程圆圈动画
				let angle = -0.5;				
				_this.drawObj = setInterval(function() {
					_this.canvasObj.beginPath();
					_this.canvasObj.setStrokeStyle("#fe3b54");					
					_this.canvasObj.setGlobalAlpha(1)
					_this.canvasObj.setLineWidth(3);
					_this.canvasObj.arc(centerX,centerY, yuanhuanW , -0.5 * Math.PI, (angle += 2 / (_this.maxTime * 1000 / _this.frame)) * Math.PI, false);
					_this.canvasObj.stroke();
					_this.canvasObj.draw(true);
				}, _this.frame);
				
				
			},
			playVoice() {
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
					this.playing = 1;
				}
			},
			stopVoice() {
				innerAudioContext.stop();
				this.playing = 0;			
			},
			
			
		}
	}
</script>

<style lang="scss">
	.jsfun-record {

       .mask {
		  position: fixed;
		  z-index: 1000;
		  top: 0;
		  right: 0;
		  left: 0;
		  bottom: 0;
		  background: rgba(0, 0, 0, 0.6);
		}

        .conbox{
			transition: all .3s ease;
			transform: translateY(100%);
			&.pickerShow{
			   transform:translateY(0);
			} 
			
			position: fixed;
			z-index: 1000;
			right: 0;
			left: 0;
			bottom: 0;
			background: #fff;
		}
		
		.c666{color:#666;}
		.c999{color:#999;}
		.fz28{font-size: 28upx;}
		.fz32{font-size: 32upx;}
		
		
        .record{		
			text-align: center;
			
			.time {
				text-align: center;
				font-size: 60upx;
				color: #000;
				line-height: 100upx;
				margin-top:50upx;
			}
			.domess{margin-bottom:50upx;}
			
			
			.record-box {
				display: flex;
				flex-direction: row;
				justify-content: center;
			}
			canvas {
				margin:10upx 60upx;
				position: relative;
				width: 200upx;
				height: 200upx;
				z-index: 10;			
				.recording{
					position: absolute;
					top: 20upx;
					left: 20upx;
					width: 160upx;
					height: 160upx;
					border: 1px dashed #fe3b54;
					border-radius: 100upx;
					background:#fe3b54 url(../../static/jsfun-record/recording.png) no-repeat 50% 50%;
					background-size: 50% 50%;
					z-index: 100;
				}
			}
			
			.btncom{
				margin-top: 70upx;
				width: 80upx;
				height: 80upx;	
				border-radius: 80upx;
			}
			.stop{
				 @extend .btncom;
				background:url(../../static/jsfun-record/stop.png) no-repeat;
				background-size: 100% 100%;
			}
			.paly{
				 @extend .btncom;
				background:url(../../static/jsfun-record/play.png) no-repeat;
				background-size: 100% 100%;
			}			
			.confirm{
				 @extend .btncom;
				background:url(../../static/jsfun-record/confirm.png) no-repeat 100% 100%;
				background-size: 100% 100%;
			}
			
			
		} 

	}
</style>