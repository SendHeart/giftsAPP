<template>
	<view class="pd-list">
		<view v-if="list && list.length>0" class="venues_box" >
			<view class="box-left">	
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="showGoods(item)">
					<view class="venues_item" v-if="index%2==0"> 
							<image class="image" :lazy-load="true"  :src="item.image" style="width:355rpx;height:355rpx;" mode="aspectFill" />
							
							<!--
							<easy-loadimage class="image" style="width:355rpx;height:355rpx;" mode="aspectFill"
							    :scroll-top="scrollTop"
							    :image-src="item.image">
							</easy-loadimage>
							
							<image :hidden="!item.show" class="image" :class="{lazy:!item.show}" :data-index="index" @load="imageLoad" :src="item.show?item.image:''"  style="width:355rpx;height:355rpx;" />
							<image :hidden="item.show" class="image placeholder" :class="{loaded:item.loaded}" :src="default_img"  style="width:355rpx;height:355rpx;"  />
							-->
							<view class="goods-tags">
								<text v-if="item.shape!=5 && item.shape!=4 && item.goods_org==4" class="goods-org">极速达</text>
								<text v-if="item.discount<100" class="img-discount">可用券</text>
							</view>
							<text class="goods_name">{{item.name}}</text>
							<view class="goods_prom">{{item.act_info?item.act_info:''}}</view>
							<view class="goods-tags">
								<text class="left-tag">{{item.sale>0?item.sale:'0'}}人已购</text>
							</view>
							<view class="goods_bottom">
								<!--
								<view v-if="item.shape!=4&&item.shape!=5" class="goods_tag">
									<text space="ensp">{{item.goods_tag}}</text>
								</view>
								-->
								<view class="price-list">
									<view class="price-market">{{item.market_price>0?'￥'+item.market_price:''}}</view>
									<view class="price-now"><text class="sfont">会员价</text>￥{{item.sell_price}}</view>
								</view>
							</view>
					</view>
				</view>
			</view>
			<view class="box-right" v-if="list.length>1">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="showGoods(item)">
					<view class="venues_item" v-if="index%2==1"> 
						<!-- <navigator :url="'/pages/details/details?id=' + item.id + '&activity_image=' + item.activity_image + '&image=' + item.image + '&info=' + item.act_info + '&name=' + item.name + '&gov_price=' + item.gov_price + '&goods_price=' + item.sell_price + '&goods_marketprice=' + item.market_price + '&sale=' + item.sale + '&goods_info=' + item.act_info + '&goods_org=' + item.goods_org + '&goods_tag=' + item.goods_tag + '&goods_shape=' + item.shape+ '&card_type=' + item.card_type" hover-class="none"> -->
							<image class="image" lazy-load :src="item.image" style="width:355rpx;height:355rpx;" mode="aspectFill" />
							
							<!--
							<easy-loadimage class="image" style="width:355rpx;height:355rpx;" mode="aspectFill"
							    :scroll-top="scrollTop"
							    :image-src="item.image">
							</easy-loadimage>							
							<image :hidden="!item.show" class="image" :class="{lazy:!item.show}" :data-index="index" @load="imageLoad" :src="item.show?item.image:''"  style="width:355rpx;height:355rpx;" />
							<image :hidden="item.show" class="image placeholder" :class="{loaded:item.loaded}" :src="default_img"  style="width:355rpx;height:355rpx;"  />
							-->
							<view class="goods-tags">
								<text v-if="item.shape!=5 && item.shape!=4 && item.goods_org==4" class="goods-org">极速达</text>
								<text v-if="item.discount<100" class="img-discount">可用券</text>
							</view>
							<text class="goods_name">{{item.name}}</text>
						<!-- </navigator> -->
						<view class="goods_prom">{{item.act_info?item.act_info:''}}</view>
						<view class="goods-tags">
							<text class="left-tag">{{item.sale>0?item.sale:'0'}}人已购</text>
						</view>
						<view class="goods_bottom">
							<!--
							<view v-if="item.shape!=4&&item.shape!=5" class="goods_tag">
								<text space="ensp">{{item.goods_tag}} </text>
							</view>
							-->
							<view class="price-list">
								<view class="price-market">{{item.market_price>0?'￥'+item.market_price:''}}</view>
								<view class="price-now"><text class="sfont">会员价</text>￥{{item.sell_price}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--
		<scroll-view  class="container"  :style="'height:' + dkheight + 'px;'"  scroll-y="true"  :scroll-top="list.scrollTop" @scrolltoupper="scrolltoupper" @scroll="scroll"  @scrolltolower="getMoreGoodsTapTag"> 
			<view class="goTop" @tap.stop="goTop">
				<uni-icon style="margin-top:-20rpx;" class="Hui-iconfont iconv-uparrow"></uni-icon>
				<view class style="margin-top:-5rpx;font-size:22rpx;">TOP</view>
			</view>
		</scroll-view>
		-->
	</view>
</template>

<script>
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	
	export default {
		data() {
		  return {
			  windowHeight: "",
			  windowWidth: "",
			  dkheight: "",
		  };
		},
		components:{
			easyLoadimage
		},
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			},
			scrollTop: {
				type: Number,
				default(){
					return 0
				}
			},
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
			showGoods: function (e) {
				var objectId = e.id ; //currentTarget.dataset.objectId;
				var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
				var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
				var goods_id = e.goods_id?e.goods_id:e.id ; //currentTarget.dataset.goodsId;
				var goods_org = e.goods_org ; //currentTarget.dataset.goodsOrg;
				var goods_shape = e.shape ; //currentTarget.dataset.goodsShape;
				var goods_name = e.name ; //currentTarget.dataset.goodsName;
				var goods_price = e.sell_price ; //.dataset.goodsPrice;
				var goods_info = e.atc_info ; //currentTarget.dataset.goodsInfo;
				var goods_sale = e.sale ; //currentTarget.dataset.sale;
				var image = e.image?e.image:'' ; //currentTarget.dataset.image ? e.currentTarget.dataset.image : ''; //var carts = this.data.carts
				var activity_image = e.activity_image?e.activity_image:''
				var sku_id = objectId;
				image = image?image:activity_image?activity_image:'' ;
				getApp().globalData.hall_gotop = 0;
				var show_goods_options = {
			   		  sku_id:objectId,
			   		  id:goods_id,
			   		  goods_shape:goods_shape,
			   		  goods_org:goods_org,
			   		  goods_info:goods_info,
			   		  goods_price:goods_price,
			   		  sale:goods_sale,
			   		  name:goods_name,
			   		  image:image,
			   		  token:token,
			   		  username:username
				} ;
				uni.setStorageSync('show_goods_options', show_goods_options);
				uni.navigateTo({
					url: '/pages/details/details?sku_id=' + objectId + '&id=' + goods_id + '&goods_shape=' + goods_shape + '&goods_org=' + goods_org + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&name=' + goods_name + '&image=' + image + '&token=' + token + '&username=' + username
				});
			 },
			 /*
			 // 获取滚动条当前位置
			 scrolltoupper: function (e) {
			   var that = this;
			   var scrollTop = e.detail.scrollTop
			 
			   if ( scrollTop > 100) {
			     this.setData({
			       floorstatus: true
			     });
			 
			     if (that.platform == 'ios') {
			 		
			     }
			   } else {
			     this.setData({
			       floorstatus: false
			     });
			   } 
			    
			 },
			 scroll: function(e) {
			 	var that = this
			 	var activeIndex = that.activeIndex ;
			 	var old_scrollTop = that.venuesList[activeIndex].scrollTop  ;//that.old.scrollTop
			 	var current_scrollTop = e.detail.scrollTop
			 	that.venuesList[activeIndex].scrollTop = current_scrollTop ; //that.old.scrollTop
			 	
			 	if(current_scrollTop > old_scrollTop +60) {
			 		that.getMoreGoodsTapTag() ;
			 	}
			 	//that.load() ;
			 },
			 */
			 //回到顶部
			 /*
			 goTop: function (e) {
			   // 一键回到顶部
			   var that = this;
			   var activeIndex = that.activeIndex
			   that.page = 1
			   that.pageoffset = that.venuesList[activeIndex].pageoffset 
			   that.venuesList[activeIndex].scrollTop = 0 ;
			   that.venuesList[activeIndex].venuesItems = [] ;
			   that.get_goods_list();
			   //console.log('goTop:', that.scrollTop);  
			   // 解决view层不同步的问题
			  
			   that.$nextTick(function() {
			   	that.venuesList[activeIndex].scrollTop = 0
			   });
			   //that.venuesList[activeIndex].scrollTop = that.old.scrollTop
			 },
			 */
		}
	}
</script>

<style>
	@import "./list.css";
</style>
