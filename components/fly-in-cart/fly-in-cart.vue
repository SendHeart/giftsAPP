<template>
	<view v-if="prizehidden" class="canvas" :style="'heigh:'+dkHeight+'px;'">
		<image style="width: 30px;height: 30px;" :style="'left:'+xt1+'px;top:'+yt1+'px;'" :src="imgUrl"></image>
		<image style="width: 30px;height: 30px;" :style="'left:'+xt2+'px;top:'+yt2+'px;'" :src="imgUrl2"></image>
		<image style="width: 30px;height: 30px;" :style="'left:'+xt3+'px;top:'+yt3+'px;'" :src="imgUrl3"></image>
	</view>
</template>
<script>
	//import $flyInData from '@/components/fly-in-cart/fly-in-cart.js'
	var lastFrameTime = 0
	var timer = null
	var ctx = null
	var factor = {
	  speed: .008, // 运动速度，值越小越慢
	  t: 0 //  贝塞尔函数系数
	}	
	var img_path = [
	      [{
	        x: 30,
	        y: 400
	      }, {
	        x: 70,
	        y: 300
	      }, {
	        x: -50,
	        y: 150
	      }, {
	        x: 30,
	        y: 0
	      }],
	      [{
	        x: 30,
	        y: 400
	      }, {
	        x: 30,
	        y: 300
	      }, {
	        x: 80,
	        y: 150
	      }, {
	        x: 30,
	        y: 0
	      }],
	      [{
	        x: 30,
	        y: 400
	      }, {
	        x: 0,
	        y: 90
	      }, {
	        x: 80,
	        y: 100
	      }, {
	        x: 30,
	        y: 0
	      }]
	]
	
	export default {
		data() {
			return {
				prizehidden: false,
				finger: {},
				busPos: {},
				windowWidth:600,
				windowHeight:800,
				dkHeight:800,
				imgUrl: '/static/images/heart1.png',
				imgUrl2: '/static/images/heart2.png',
				imgUrl3: '/static/images/heart4.png',
				xt1:0,
				yt1:0,
				xt2:0,
				yt2:0,
				xt3:0,
				yt3:0,
			}
		},
		props: {
		},
		created: function() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					let ww = res.windowWidth;//取窗口宽度
					let hh = res.windowHeight;//取窗口高度
					that.windowWidth = ww ;
					that.windowHeight = hh ;
					that.dkHeight = hh/2 ;
				}
			})
		},
		 onLoad: function () {
		    var that = this
			
		  },
		methods: {
			prizeShow: function() {
				//if(ctx==null) ctx = uni.createCanvasContext('mycanvas',this)
				if(this.prizehidden) return
				this.prizehidden = true
				this.startTimer()
			},
			
			 //不断绘制图片到cavans
			requestAnimationFrame: function() {
			    var that = this
			    var currTime = new Date().getTime();
			    //手机屏幕刷新率一般为60Hz，大概16ms刷新一次，这里为了使页面看上去更流畅自然,通过改变timedis的值可以控制动画的快慢
			    var timedis = 10 - (currTime - lastFrameTime)
			    var timeToCall = Math.max(0, timedis);
				//console.log('fly-in-cart.vue requestAnimationFrame 点赞曲线:', timeToCall);
				var id = setTimeout(function() {
				   that.drawImage(img_path)
				}, timeToCall);
				
			    lastFrameTime = currTime + timeToCall;
			    return id;
			},
			
			drawImage: function (data) {
				var that = this
				var p10 = data[0][0]; // 三阶贝塞尔曲线起点坐标值
			    var p11 = data[0][1]; // 三阶贝塞尔曲线第一个控制点坐标值
			    var p12 = data[0][2]; // 三阶贝塞尔曲线第二个控制点坐标值
			    var p13 = data[0][3]; // 三阶贝塞尔曲线终点坐标值
			
			    var p20 = data[1][0];
			    var p21 = data[1][1];
			    var p22 = data[1][2];
			    var p23 = data[1][3];
			
			    var p30 = data[2][0];
			    var p31 = data[2][1];
			    var p32 = data[2][2];
			    var p33 = data[2][3];
			
			    var t = factor.t;
			
			    /*计算多项式系数*/
			    var cx1 = 3 * (p11.x - p10.x);
			    var bx1 = 3 * (p12.x - p11.x) - cx1;
			    var ax1 = p13.x - p10.x - cx1 - bx1;
			
			    var cy1 = 3 * (p11.y - p10.y);
			    var by1 = 3 * (p12.y - p11.y) - cy1;
			    var ay1 = p13.y - p10.y - cy1 - by1;
			
			    /*计算xt yt坐标值 */
			    var xt1 = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p10.x;
			    var yt1 = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p10.y;
			
			    /** 计算多项式系数*/
			    var cx2 = 3 * (p21.x - p20.x);
			    var bx2 = 3 * (p22.x - p21.x) - cx2;
			    var ax2 = p23.x - p20.x - cx2 - bx2;
			
			    var cy2 = 3 * (p21.y - p20.y);
			    var by2 = 3 * (p22.y - p21.y) - cy2;
			    var ay2 = p23.y - p20.y - cy2 - by2;
			
			    /*计算xt yt坐标值*/
			    var xt2 = ax2 * (t * t * t) + bx2 * (t * t) + cx2 * t + p20.x;
			    var yt2 = ay2 * (t * t * t) + by2 * (t * t) + cy2 * t + p20.y;
			
			
			    /** 计算多项式系数*/
			    var cx3 = 3 * (p31.x - p30.x);
			    var bx3 = 3 * (p32.x - p31.x) - cx3;
			    var ax3 = p33.x - p30.x - cx3 - bx3;
			
			    var cy3 = 3 * (p31.y - p30.y);
			    var by3 = 3 * (p32.y - p31.y) - cy3;
			    var ay3 = p33.y - p30.y - cy3 - by3;
			
			    /*计算xt yt坐标值*/
			    var xt3 = ax3 * (t * t * t) + bx3 * (t * t) + cx3 * t + p30.x;
			    var yt3 = ay3 * (t * t * t) + by3 * (t * t) + cy3 * t + p30.y;
			
				factor.t += factor.speed;
				
				that.xt1 = xt1 
				that.yt1 = yt1
				that.xt2 = xt2
				that.yt2 = yt2
				that.xt3 = xt3
				that.yt3 = yt3
				
				//ctx.drawImage("/static/images/heart1.png", xt1, yt1, 30, 30);
				//ctx.drawImage("/static/images/heart2.png", xt2, yt2, 30, 30);
				//ctx.drawImage("/static/images/heart3.png", xt3, yt3, 30, 30);
				//ctx.draw();
				 
			   //console.log('fly-in-cart.vue drawImage 点赞曲线 xt1:', xt1,' yt1:',yt1);
			    if (factor.t > 1) {
			      factor.t = 0;
			      that.cancelTimer(timer, false)//传入true动画重复
			    } else {
			      timer = that.requestAnimationFrame()
			    }
			},
			startTimer: function () {
			    var that = this
				console.log('fly-in-cart.vue startTimer 点赞曲线 startTimer prizehidden:',that.prizehidden);
				that.drawImage(img_path)
			},
			  
			cancelTimer: function(timer, isrepeat="false") {
			      var that = this
			      //清除定时器
			      clearTimeout(timer)
			      if (isrepeat) {
			        that.startTimer()
			      } else {
					that.prizehidden = false
			        //如果不重复动画则将图片回到原始位置
			        //ctx.drawImage("/static/images/heart1.png", 30, 400, 30, 30);
			        //ctx.drawImage("/static/images/heart2.png", 30, 400, 30, 30);
			        //ctx.drawImage("/static/images/heart3.png", 30, 400, 30, 30);
			        //ctx.draw();
					console.log('fly-in-cart.vue startTimer 点赞曲线退出 cancelTimer prizehidden',that.prizehidden);
			      }
			},
		}
	}
</script>
<style>
	.canvas {
	  background-color: transparent;
	  width: 90px;
	  height: 430px;
	  position: fixed;
	  right: 20px;
	  bottom: 80px;
	  z-index:10001;
	}
	
</style>
