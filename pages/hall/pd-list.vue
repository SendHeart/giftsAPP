<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view class="pd-list">
		<!--瀑布流列表-->
		<view v-if="activeIndex > 0" id="venues_box" class="venues-box">
		  <view class="box-left">
			  <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index"  @click="showGoods(item)" >
		        <view class="venues-item" :data-object-id="item.id" :data-goods-id="item.id" :data-goods-info="item.act_info" :data-goods-org="item.goods_org" :data-image="(item.activity_image?item.activity_image:item.image)" :data-goods-name="item.name" :data-sale="item.sale" :data-goods-price="item.sell_price" :hidden="(item.hidden==1?true:false)" v-if="index%2==0">
					<image class="image" lazy-load :src="item.image" style="width:355rpx;height:355rpx;" />
					<!--
					<image :hidden="!item.show" class="image" :class="{lazy:!item.show}" :data-index="index" @load="imageLoad" :src="item.show?item.image:''"  style="width:355rpx;height:355rpx;" />
					<image :hidden="item.show" class="image placeholder" :class="{loaded:item.loaded}" :src="default_img"  style="width:355rpx;height:355rpx;"  />
					-->
				  <view class="goods-tags">
		            <text v-if="item.goods_org==4" class="goods-org">京东物流</text>
		            <text v-if="item.discount<100" class="img-discount">可用券</text>
		          </view>
		          <text class="goods-name">{{item.name}}</text>
		          <view class="goods-prom">{{item.act_info?item.act_info:''}}</view>
		          <view class="goods-tags">
		            <text class="left-tag">{{item.sale>0?item.sale:'0'}}人已送</text>
		          </view>
		          <view class="price-list">
		            <view class="price-market">{{item.market_price>0?'￥'+item.market_price:''}}</view>
		            <view class="price-now">￥{{item.sell_price}}</view>
		          </view>
		        </view>
		      </view>
		  </view>
		
		  <view class="box-right">
			  <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index"  @click="showGoods(item)">
		        <view class="venues-item" :data-object-id="item.id" :data-goods-id="item.id" :data-goods-info="item.act_info" :data-goods-org="item.goods_org" :data-image="(item.activity_image?item.activity_image:item.image)" :data-goods-name="item.name" :data-sale="item.sale" :data-goods-price="item.sell_price" :hidden="(item.hidden==1?true:false)" v-if="index%2==1">
		          <!-- image class="mainpic" src="{{item.image}}" binderror="imageError" data-imageindex="{{index}}" -->
				  <image class="image" lazy-load :src="item.image" style="width:355rpx;height:355rpx;" />
					<!--
						<image :hidden="!item.show" class="image" :class="{lazy:!item.show}" :data-index="index" @load="imageLoad" :src="item.show?item.image:''"  style="width:355rpx;height:355rpx;" />
						<image :hidden="item.show"  class="image placeholder" :class="{loaded:item.loaded}" :src="default_img"  style="width:355rpx;height:355rpx;"  />  
					-->
				  <view class="goods-tags">
		            <text v-if="item.goods_org==4" class="goods-org">京东物流</text>
		            <text v-if="item.discount<100" class="img-discount">可用券</text>
		          </view>
		          <text class="goods-name">{{item.name}}</text>
		          <view class="goods-prom">{{item.act_info?item.act_info:''}}</view>
		          <view class="goods-tags">
		            <text class="left-tag">{{item.sale>0?item.sale:'0'}}人已送</text>
		          </view>
		          <view class="price-list">
		            <view class="price-market">{{item.market_price>0?'￥'+item.market_price:''}}</view>
		            <view class="price-now">￥{{item.sell_price}}</view>
		          </view>
		        </view>
		      </view>
		  </view>
		</view>
		<view v-if="activeIndex == 0">
			<view v-for="(item,index) in list" class="recomm-item" :key="index" @tap="showGoods(item)" :data-object-id="item.id" :data-goods-id="item.id" :data-goods-name="item.name" :data-goods-price="item.sell_price" :data-sale="item.sale" :data-goods-info="item.act_info" :hidden="(item.hidden==1?true:false)">
			   <image class="recomm-img" :src="item.image"></image>
			    <text style="font-size:12px;">{{item.name}}</text>
			    <view style="font-size:10px;color:gray;">{{item.act_info?item.act_info:''}}</view>  
			    <view class="goods-tags">
			      <text class="left-tag">{{item.sale>0?item.sale:'0'}}人已送</text>
			    </view>    
				<view class="price-list">
				  <view class="price-market">{{item.market_price>0?'￥'+item.market_price:''}}</view>
				  <view class="price-now">￥{{item.sell_price}}</view>
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
			},
			activeIndex: { // 当前tab的下标
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
			   var goods_info = e.act_info ; //currentTarget.dataset.goodsInfo;
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
			 
		}
	}
</script>

<style>
	@import "./hall.css";
</style>
