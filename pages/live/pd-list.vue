<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view class="pd-list">
		<view class="venues_box">
			<view class="box-left">	
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="showGoods(item)">
					<view class="venues_item" v-if="index%2==0"> 
							<image class="image" lazy-load :src="item.live_poster" style="width:355rpx;height:355rpx;" mode="aspectFill" />
							<text class="goods_name">{{item.shop_name}}</text>
							<view class="goods_prom">{{item.live_desc?item.live_desc:''}}</view>
							<view class="goods_bottom">
								 <view class="goods_tag">
									<text>{{item.live_focus_members>0?'人气值:'+item.live_focus_members:'人气值:1'}} </text>
								</view>
							</view>
					</view>
				</view>
			</view>
			<view class="box-right" v-if="list.length>1">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="showGoods(item)">
					<view class="venues_item" v-if="index%2==1"> 
						<!-- <navigator :url="'/pages/details/details?id=' + item.id + '&activity_image=' + item.activity_image + '&image=' + item.image + '&info=' + item.act_info + '&name=' + item.name + '&gov_price=' + item.gov_price + '&goods_price=' + item.sell_price + '&goods_marketprice=' + item.market_price + '&sale=' + item.sale + '&goods_info=' + item.act_info + '&goods_org=' + item.goods_org + '&goods_tag=' + item.goods_tag + '&goods_shape=' + item.shape+ '&card_type=' + item.card_type" hover-class="none"> -->
							<image class="image" lazy-load :src="item.live_poster" style="width:355rpx;height:355rpx;" mode="aspectFill" />
							<text class="goods_name">{{item.shop_name}}</text>
						<!-- </navigator> -->
						<view class="goods_prom">{{item.live_desc?item.live_desc:''}}</view>
						<view class="goods_bottom">
							<view class="goods_tag">
								<text>{{item.live_focus_members>0?'人气值:'+item.live_focus_members:'人气值:1'}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var weburl = getApp().globalData.weburl;
	var shop_type = getApp().globalData.shop_type;
	export default {
		data() {
		  return {
			  windowHeight: "",
			  windowWidth: "",
			  dkheight: "",
			  list_len:0,
			  is_live_loading:false,
			  
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
		mounted() {
			 console.log('onLoad live pd-list:', this.list);
		},
		onLoad: function (options) {
		  var that = this;
		  var username = options.username ? options.username : uni.getStorageSync('username');
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
			/*
			showGoods: function (e) {
			  var that = this;
			  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			  var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
			  var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
			  var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : '';
			  var liveid = e.liveid?e.liveid:0 ; //currentTarget.dataset.goodsId;
			  var live_goods = e.live_goods ; //currentTarget.dataset.goodsOrg;
			  var shop_name = e.shop_name ; //currentTarget.dataset.goodsShape;
			  var live_poster = e.live_poster ; //currentTarget.dataset.goodsName;
			  var live_desc = e.live_desc ; //.dataset.goodsPrice;
			  var logo = e.logo ; //currentTarget.dataset.goodsInfo;
			  var live_status = e.live_status
			  var is_live = e.live_status==1?true:false
			  
			  var is_live_loading = that.is_live_loading;
			  //var liveid = that.liveid;
			
			  //console.log('query_liveroom_info 获取直播间信息 is_live_loading:',is_live_loading)
			  if (is_live_loading) {
				console.log('query_liveroom_info 正在加载 is_live_loading:',is_live_loading)
			    return;
			  }
			  that.is_live_loading = true
			  
			  uni.request({
			    url: weburl + '/api/client/get_liveroom_list',
			    method: 'POST',
			    data: {
			      username: username,
			      access_token: token,
			      liveid: liveid,
			      shop_type: shop_type
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      'Accept': 'application/json'
			    },
			    success: function (res) {
					that.is_live_loading = false
					if (res.data.status == 'y') {
						var liveinfo = res.data.result;
						that.live_status = liveinfo[0]['live_status']
						console.log('onLoad live showGoods  liveinfo:',liveinfo);
						uni.navigateTo({
						  url: '/pages/uLive/subnvue/live?index=0&liveid='+liveid+'&live_goods='+live_goods+'&live_name='+shop_name+'&live_poster='+live_poster+'&live_desc='+live_desc+'&live_logo='+logo+'&live_status='+live_status
						});
					}else{
						return
					}
			
				},
			    fail: function (e) {
					that.videourl = that.liveurl
			    }
			  });
			},
			*/
			
			 showGoods: function (e) {
			   var objectId = e.id ; //currentTarget.dataset.objectId;
			   var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			   var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
			   var liveid = e.liveid?e.liveid:0 ; //currentTarget.dataset.goodsId;
			   var live_goods = e.live_goods ; //currentTarget.dataset.goodsOrg;
			   var shop_name = e.shop_name ; //currentTarget.dataset.goodsShape;
			   var live_poster = e.live_poster ; //currentTarget.dataset.goodsName;
			   var live_desc = e.live_desc ; //.dataset.goodsPrice;
			   var logo = e.logo ; //currentTarget.dataset.goodsInfo;
			   var live_status = e.live_status
			   var is_live = e.live_status==1?true:false
			   console.log('onLoad live showGoods e:', e,' is_live:',is_live);
			   uni.navigateTo({
			     url: '/pages/uLive/subnvue/live?index=0&liveid='+liveid+'&live_goods='+live_goods+'&live_name='+shop_name+'&live_poster='+live_poster+'&live_desc='+live_desc+'&live_logo='+logo+'&live_status='+live_status
			   });
			 },
			
		}
	}
</script>

<style>
	@import "./live.css";
</style>
