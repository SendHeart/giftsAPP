<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view class="pd-list">
	<view class="uni-padding-wrap">
		<view class="uni-comment">
			<view class="uni-comment-list" v-for="(item,index) in list" :key="index">
				<view class="uni-comment-face">
					<image src="item.image" mode="widthFix"></image>
				</view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>{{item.m_id}}</text>
					</view>
					<view class="uni-comment-content">
						{{item.content}}
					</view>
					<view class="uni-comment-date">
						<text>{{item.addtimestr}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
	</view>
</template>

<script>
	export default {
		data() {
		  return {
			  windowHeight: "",
			  windowWidth: "",
			  dkheight: "",
		  };
		},
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			}
		},
		onLoad: function (options) {
		  console.log('onLoad list:', this.list);
		  var that = this;
		  var username = options.username ? options.username : wx.getStorageSync('username');
		  var token = options.token ? options.token : wx.getStorageSync('token');
		  uni.getSystemInfo({
		    success: function (res) {
		      that.setData({
		        platform: res.platform,
		        windowHeight: res.windowHeight,
		        windowWidth: res.windowWidth,
		        dkheight: res.windowHeight - 60
		      });
		    }
		  });
		},
		
		methods: {
			 
		}
	}
</script>

<style>
	 
</style>
