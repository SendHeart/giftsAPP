<template>
<view v-if="popupVisible" class="popup-footer">
	<view class="pop__ui_panel">
		<view class="pop__ui_mask" @tap="close"></view>
		<view class="pop__ui_child anim-footer">
			<view class="cart-head" @tap.stop="close">
				<text class="pop__ui_head">共{{goods_num}}件商品</text>
				<text class="iconfont" style="margin-right:20rpx;width:60rpx;height:60rpx; color:#BBBBBB;font-size: 15px;border-radius: 50%;border:1rpx #333 solid;" @tap.stop="close">&#xe69f;</text>
			</view>
			<view class="pop__ui_body">
			<scroll-view class="wrap_carts" scroll-y @scroll="goods_scrolltoupper" :scroll-top="goods_scrollTop" @scrolltolower="getMoreGoodsTapTag">
				<block v-for="(goods,index) in venuesItems" :key="index">
						<view class="item" @tap="showGoods" :data-goods-id="goods.id" :data-goods-name="goods.name" :data-goods-org="goods.goods_org" :data-goods-shape="goods.shape" :data-goods-info="goods.act_info" :data-goods-price="goods.sell_price" :data-sale="goods.sale" :data-image="(goods.activity_image?goods.activity_image:goods.image)">
							<view class="gname">
								<view class="goods-no">{{goods.goodsno}}</view>
								<image class="gpic" :src="goods.image" mode="aspectFill" />
							</view>
							<view class="ginfo">
								<text class="name">{{goods.name}}</text>
								<text class="price">￥{{goods.sell_price}}</text>
							</view>
							<text class="gbtn" @tap="showGoods" :data-goods-id="goods.id" :data-goods-name="goods.name" :data-goods-org="goods.goods_org" :data-goods-shape="goods.shape" :data-goods-info="goods.act_info" :data-goods-price="goods.sell_price" :data-sale="goods.sale" :data-image="(goods.activity_image?goods.activity_image:goods.image)">{{is_hoster?'推荐':'去下单'}}</text>
						</view>
				</block>
			</scroll-view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	var weburl = getApp().globalData.weburl;
	var playerurl = getApp().globalData.playerurl;
	var appid = getApp().globalData.appid;
	var appsecret = getApp().globalData.secret;
	var user_type = getApp().globalData.user_type ? getApp().globalData.user_type : 0;
	var shop_type = getApp().globalData.shop_type;
	var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
	var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : 0;
	var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
	var userauth = uni.getStorageSync('userauth') ? uni.getStorageSync('userauth') : ''; 
	
	export default {
		data() {
			return {
				popupVisible: false,
				cartList: [],
				index:0,
				liveid:0,
				is_goods_loading:false,
				goods_page: 1,
				goods_pagesize: 20,
				goods_all_rows: 0,
				goods_num: 1,
				venuesItems: [],
				goods_scrollTop: 0,
				current_goods_scrollTop: 0,
				is_hoster: false,
				is_live:false,
			}
		},
		props: [
			'vlist',
		],
		onLoad(){
			var that = this
			uni.getSystemInfo({
				success: function (res) {
			      let winHeight = res.windowHeight;
			      let winWidth = res.windowWidth;
					that.dkheight = winHeight
					that.winHeight = winHeight
					that.winWidth = winHeight
			      console.log(winHeight);
			    }
			})
		},
		methods: {
			show(options) {
				var options = options?JSON.parse(options):'{}'
				var index = options.index?options.index:0
				this.liveid = options.liveid?options.liveid:3989
				this.live_goods = options?options.live_goods:{},
				this.is_hoster = options.is_hoster?options.is_hoster:this.is_hoster
				//this.cartList = this.vlist[index].cart
				this.popupVisible = true
				console.log('直播商品 options:', options);
				this.get_goods_list()
			},
			close() {
				this.popupVisible = false
			},
			getMoreGoodsTapTag() {
			  var that = this;
			  var goods_page = that.goods_page + 1;
			  var goods_all_rows = that.goods_all_rows;
			  var is_goods_loading = that.is_goods_loading;
			  if (is_goods_loading) return;
			
			  if (goods_page > goods_all_rows) {
			    that.setData({
			      loadingHidden: false,
			      loading_note: '已经到底了'
			    });
			    setTimeout(function () {
			      that.setData({
			        loadingHidden: true
			      });
			    }, 1000);
			    return;
			  }
			  that.goods_page = goods_page
			  that.get_goods_list();
			},
			// 获取滚动条当前位置 goods
			goods_scrolltoupper(e) {
			  if (e.detail.scrollTop > 100) {
				  this.floorstatus = true 
				  this.hidddensearch = false 
			   
			  } else {
				  this.floorstatus = false
				  this.hidddensearch = true 
			  }
			  this.current_goods_scrollTop = e.detail.scrollTop
			},
			goodslist() {
			  var that = this;
			  var live_goods = that.live_goods;
			  uni.navigateTo({
			    url: '../goods/list/list?live_goods=' + live_goods
			  });
			},
			live_refer_goods(goods_id) {
			  var that = this;
			  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			  var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
			  var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
			  var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : '';
			  var liveid = that.liveid;
			  if (!goods_id) return;
			  uni.request({
			    url: weburl + '/api/client/live_refer_goods',
			    method: 'POST',
			    data: {
			      username: username ? username : openid,
			      m_id: m_id,
			      liveid: liveid,
			      access_token: token,
			      goods_id: goods_id,
			      shop_type: shop_type
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      'Accept': 'application/json'
			    },
			    success: function (res) {
			      if (res.data.status == 'n') {
			        uni.showToast({
			          title: res.data.info ? res.data.info : '商品推荐失败',
			          icon: 'none',
			          duration: 2000
			        });
			      } else {
			        uni.showToast({
			          title: '商品推荐完成',
			          icon: 'none',
			          duration: 1500
			        });
			        console.log('商品推荐完成:', goods_id);
			      }
			    }
			  });
			},
			showGoods(e) {
			  var that = this;
			  var is_hoster = that.is_hoster; // 点击购物车某件商品跳转到商品详情
			  var objectId = e.currentTarget.dataset.objectId;
			  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			  var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
			  var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : '';
			  var liveid = that.liveid;
			  var goods_id = e.currentTarget.dataset.goodsId;
			  var goods_org = e.currentTarget.dataset.goodsOrg;
			  var goods_shape = e.currentTarget.dataset.goodsShape;
			  var goods_name = e.currentTarget.dataset.goodsName;
			  var goods_price = e.currentTarget.dataset.goodsPrice;
			  var goods_info = e.currentTarget.dataset.goodsInfo;
			  var goods_sale = e.currentTarget.dataset.sale;
			  var image = e.currentTarget.dataset.image ? e.currentTarget.dataset.image : '';
			  var sku_id = objectId;
			
			  if (is_hoster && goods_id > 0) {
			    //商品推荐
			    that.live_refer_goods(goods_id);
			  } else {
			    //商品详情
			   
			  }
			  uni.navigateTo({
			    url: '/pages/details/details?id=' + goods_id + '&goods_shape=' + goods_shape + '&goods_org=' + goods_org + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&name=' + goods_name + '&image=' + image + '&liveid=' + liveid
			  });
			},
			get_goods_list() {
			  //venuesList
			  var that = this;
			  var goods_page = that.goods_page;
			  var goods_pagesize = that.goods_pagesize;
			  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			  var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
			  var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
			  var live_goods = that.live_goods;
			  var live_adv_goods = [];
			  that.is_goods_loading = true
			   
			  uni.request({
			    url: weburl + '/api/client/get_goods_list',
			    method: 'POST',
			    data: {
			      live_goods: live_goods,
			      username: username,
			      access_token: token,
			      page: goods_page,
			      pagesize: goods_pagesize,
			      shop_type: shop_type
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      'Accept': 'application/json'
			    },
			    success: function (res) {
			      console.log('get_goods_list:', res.data)
			      var venuesItems = res.data.result;
			      var all_rows = res.data.all_rows;
			
			      if (!venuesItems) {
			        that.venuesItems = []
					that.goods_all_rows = 0
			        return;
			      }
			
			      for (var i = 0; i < venuesItems.length; i++) {
			        if (!venuesItems[i]['goodsno']) {
			          venuesItems[i]['goodsno'] = i + 1 + (goods_page-1)*goods_pagesize;
			        }
			
			        if (!venuesItems[i]['act_info']) {
			          venuesItems[i]['act_info'] = '';
			        }
			
			        if (!venuesItems[i]['goods_tag']) {
			          venuesItems[i]['goods_tag'] = '';
			        } else {
			          venuesItems[i]['goods_tag'] = venuesItems[i]['goods_tag'].substring(0, 10);
			        }
			
			        venuesItems[i]['image'] = venuesItems[i]['activity_image'] ? venuesItems[i]['activity_image'] : venuesItems[i]['image'];
			
			        if (venuesItems[i]['image'].indexOf("http") < 0) {
			          venuesItems[i]['image'] = weburl + '/' + venuesItems[i]['image'];
			        }
			      }
			
			      if (goods_page > 1 && venuesItems) {
			        //向后合拼
			        venuesItems = that.venuesItems.concat(venuesItems);
			      }
				  that.venuesItems = venuesItems
				  that.goods_all_rows = all_rows
				  that.goods_num = (all_rows - goods_page) * goods_pagesize + venuesItems.length
				  that.goods_page = goods_page
				  that.loadingHidden = true
				  that.is_goods_loading = false
			    }
			  });
			},
		}
	}
</script>

<style scoped>
.iconfont {
	font-family: nvueIcon;
}
.pop__ui_mask {
	background-color: #000; 
	opacity: .6; 
	position: fixed; 
	left: 0; 
	right: 0; 
	top: 0; 
	bottom: 0; 
	z-index: 1000;
}
.pop__ui_child {
	background-color: #fbfbfb; 
	border-top-left-radius: 12px;
	border-top-right-radius: 12px; 
	font-size: 14px; 
	overflow: hidden; 
	position: fixed; 
	bottom: 0; 
	left: 0; 
	right: 0; 
	z-index: 1001;
}
.pop__ui_head {
	border-style: solid; 
	border-color: #ebebeb; 
	border-bottom-width: 1upx; 
	font-size: 28upx; 
	font-weight: 700; 
	padding: 30upx; 
	text-align: left;
}
.wrap_carts {
	height: 650upx;
}
.item {
	flex-direction: row; 
	align-items: center; 
	padding: 30upx; 
	position: relative;
	height: 220rpx;
}
.gname{
	margin-left: 10rpx;
	width: 120rpx;
	height: 180rpx;
	flex-direction: column;
	justify-content:center;
}
.goods-no{
	  font-size: 18upx; 
	  height:50rpx;
	  line-height:50rpx;
	  width: 100rpx;
	  color: #999;
}
.gpic {
	margin-right: 30upx; 
	height: 100rpx; 
	width: 100rpx;
}
.ginfo {
	flex: 1;
}
.name {
	font-size: 25upx;
	overflow:hidden;
	text-overflow:ellipsis;  
	lines:2;
}
.price {
	color: #ff0f33; 
	font-size: 28upx; 
	margin-top: 15upx;
}
.gbtn {
	background-image: linear-gradient(to right, #ff540a, #ff0f33); 
	border-radius: 5upx; 
	color: #fff; 
	font-size: 28upx; 
	border-radius: 20rpx;
	padding: 12upx 25upx;
}
.cart-head {
	border-color: #FFFFFF; 
	border-style: solid; 
	border-bottom-width: 0upx;
	flex-direction: row; 
	justify-content: space-between;
	align-items: center; 
}
</style>
