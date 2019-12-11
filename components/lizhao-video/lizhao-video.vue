<template>
	<view>
		<video :src="src" :controls="false" :show-play-btn="false" 
			:style="{ height: height,width: width }" :loop="false"
			:enable-progress-gesture="false" @click="clickVideo" :objectFit="short?'':'fill'"
			:id="`video_${src}`" ref="`video_${src}`" muted="true" class="video" @timeupdate="timeupdate">
		</video>
		<cover-view class="progressBar" :style="{ width: barWidth }"></cover-view>
		<cover-image class="controls-play img" @click="play" src="../../static/play.png"></cover-image>
		<cover-image class="controls-pause img" @click="pause" src="../../static/pause.png"></cover-image>
	</view>
</template>

<script>
	export default{ 
		props:{
			src:{
				type:String,
				default:''
			},
			play:{
				type:Boolean,
				default:false
			},
			short:{
				type:Boolean,
				default:false
			},
			height:{
				type:String,
				default:''
			},
			width:{
				type:String,
				default:''
			},
			duration:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				time:0
			}
		},
		methods:{
			timeupdate(event){
				if(this.time>=this.duration) this.time=0
				this.time = this.time + 0.25 
			},
			clickVideo(){
				//this.$emit('click')
				console.log('click video:',this.play)
				if(!this.play){
					this.videoCtx.play();
				}else{
					this.videoCtx.pause();
				}
			},
			videoPlay(){
				if(this.play){
					this.videoCtx = uni.createVideoContext(`video_${this.src}`,this);
					this.videoCtx.play();
				}else{
					this.videoCtx = uni.createVideoContext(`video_${this.src}`,this);
					this.videoCtx.pause();
				}
			}
		},
		watch:{
			play(newVal,oldVal){
				this.videoPlay()
			}
		},
		computed:{
			barWidth(){
				let width = this.time/this.duration*parseInt(this.width)
				return `${width}px`
			}
		}
	}
</script>

<style>
	.video{
		width: 100%;
		height: 100%;
	}
	.progressBar{
		border-radius: 2upx;
		height: 4upx;
		background-color: #fff;
		z-index: 999999;
		position: absolute;
		bottom: 0upx;
		//#ifndef APP-PLUS-NVUE
		animation: flicker 4s linear infinite;
		animation-direction:alternate;
		//#endif
	}
	//#ifndef APP-PLUS-NVUE
	@keyframes flicker {
		0% { box-shadow:0 0 0 #FFFFFF; }
	     /** 暂停效果 */
		10% { box-shadow:0 0 2upx #FFFFFF; }
	    50% { box-shadow:0 0 10upx #FFFFFF; }
	    60% { box-shadow:0 0 12upx #FFFFFF; }
	    90% { box-shadow:0 0 18upx #FFFFFF; }
	    100% { box-shadow:0 0 20upx #FFFFFF; }
	
	}
	//#endif
	.img {
	        position: absolute;
	        width: 100rpx;
	        height: 100rpx;
	        top: 50%;
	        margin-top: -50rpx;
	}
	
	.controls-play {
	        left: 50rpx;
	}
	
	.controls-pause {
	        right: 50rpx;
	}

</style>
