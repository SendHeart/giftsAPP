<template>
<view>
	<view class="search">
		<view class="wx-input">
			<input :value="keyword" placeholder="搜索关键词"  @input='search_goodsnameTapTag'  maxlength='10' confirm-type="search" @tap.stop="orderSearch"/>
			<image @tap.stop='orderSearch' src="../../../static/images/search-btn.png"></image>
	    </view>
	</view>
	<view class="top-bar2">
	  <block v-for="(item, index) in navList_order" :key="index">
	    <view :id="'v_' + index" :data-id="index" :data-title="item.title" :data-tab="item.id" :class="'top-bar-item2 ' + (index == TabCur ? 'top-bar-active2' : '')" @click.stop="onOrderTapTag">
	      <view>{{item.title}}</view>
	    </view>
	  </block>
	</view>
	
	<mescroll-uni top="170" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"  @emptyclick="emptyClick" @scroll="scroll" @topclick="goTop" @init="mescrollInit">
		<view v-if="tab2=='order_manager'" class="order-item" :style="'width:' + windowWidth" v-for="(item, index) in orders" :key="index" @tap="detailTapTag(item)">
		  <!-- 厂家logo缩略图 -->
		  <view class="shop-text" :style="'width:' + windowWidth">
		    <text>礼物号: {{item.order_no}}</text>
		    <text v-if="item.gift_status==2 && giftflag ==0" class="status2">对方已接受</text>
		    <text v-if="item.gift_status==1 && giftflag ==0" class="status">对方未接受</text>
		    <text v-if="giftflag==0 && item.status == 8" class="status2">已取消</text>
		    <text v-if="item.status==10 && giftflag ==0" class="status" >退款中</text>
			<text v-if="item.gift_status==2 && giftflag ==0 && item.status == 2 && item.shape == 1" class="status smallbtn" @tap.stop="update_order(item)"  >发货</text>
		    <text v-if="item.gift_status==2 && item.status == 3" class="status2"  @tap.stop="update_order(item)">已发货</text>
		  </view>
		
		  <view v-for="(mapping, index2) in item['order_sku']" :key="index2" class="carts-item" >
		    <view>
		      <!-- 缩略图 -->
		      <image class="carts-image" :src="mapping.sku_image" mode="aspectFill"></image>
		    </view>
		    <view class="carts-text">
		      <!-- 商品标题 -->
		      <text class="carts-title">{{mapping.goods_name}}</text>
		      <view class="carts-sku"> 
		          <view v-for="(sku_value, index3) in mapping['sku_value']" :key="index3">
		            <text>{{sku_value['name']?sku_value['name']+':':''}}{{sku_value['type']==2?sku_value['note']+' ':(sku_value['value']?sku_value['value']+' ':'')}}
		            </text>
		          </view>
		        </view>
		      <view class="carts-subtitle">
		        <text>x{{mapping.sku_num}}</text>
		          <text v-if="item.status==2 && giftflag==1 && item.gift_status==2 && mapping.status==1" class="recyclestatus">已回收</text>
		      </view>
		    </view>
		  </view>
		  <view class="order-footer">
		    <view style="width:70%">
		      <text style="width:20%">共:{{item.order_sku_num}}件{{item.buy_num>1?' (份数:'+item.buy_num+')':''}}</text>
		      <text style="color:#e34c55;">￥{{item.order_price}}</text>
		    </view>
		  </view>
		</view>
		
		<view v-if="tab2=='goods_manager'" class="order-item" :style="'width:' + windowWidth" v-for="(item, index) in goods" :key="index"  @click="update_goods(item)">
		  <!-- 厂家logo缩略图 -->
		  <view class="shop-text" :style="'width:' + windowWidth">
				<text>商品ID: {{item.id}}</text>
				<text v-if="item.status==2 && giftflag ==1" class="status2">已下架</text>
		  </view>
			<view  class="carts-item" >
				<view>
				  <!-- 缩略图 -->
				  <image class="carts-image" :src="(item.spec_value[0]&&item.spec_value[0].type==2)?item.spec_value[0].value:item.image" mode="aspectFill"></image>
				</view>
				<view class="carts-text">
				  <!-- 商品标题 -->
					<text class="carts-title">{{item.name}}</text>
					<view class="carts-sku"> 
						<view v-for="(sku_value, index4) in item['spec_value']" :key="index4">
							<text>{{sku_value?sku_value['name']+':':''}}{{sku_value['type']==2?sku_value['note']+' ':sku_value['value']+' '}}</text>
							<text v-if="sku_value['type']==1">{{sku_value?sku_value['value']:''}}</text>
							<image v-if="sku_value['type']==2" :src="sku_value['value']?sku_value['value']:''" style="width:30rpx;height:30rpx;"> </image> 
							<text v-if="sku_value['type']==2">{{sku_value?sku_value['note']:''}} </text>
						</view>
						</view>
					</view>
				</view>
				<view class="order-footer">
					<view style="width:70%">
						<text style="width:20%">销量:{{item.sale}}</text>
					</view>
				</view>
			</view>
	</mescroll-uni>
	<!--
	<scroll-view  class="container" :style="'height:' + dkheight + 'px;'"  scroll-y="true"  :scroll-top="scrollTop" @scrolltoupper="scrolltoupper" @scroll="scroll" >
	<view class="goTop" :hidden="!floorstatus" @tap.stop="goTop">
		<uni-icon style="margin-top:-25rpx;" class="Hui-iconfont iconv-uparrow"></uni-icon>
		<view class style="margin-top:-10rpx;font-size:20rpx;">TOP</view>
	</view>
	
	</scroll-view>
	-->
	<view>
		<uni-popup :show="!modalHidden" type="bottom" :custom="true" :mask-click="false">
			<view class="uni-tip" style="z-index:9999;">
				<view class="uni-tip-title">
				更新商品信息
				</view>
				<view class="uni-tip-content">
					  <view class="section">  
					     <view class="">{{goods_name}}</view>  
					   </view>
					    <view class="section">  
					     <view class="">{{goods_sku_key}}</view>  
					   </view>
					   <view class="section">
					     <view class="section-title">价格：</view>  
					     <input type="digit" :value="sell_price" placeholder-style="font-size:18rpx;" placeholder="请输入价格" confirm-type="done"  @input="sellPriceInput" style="border:1prx;" />
					   </view>
					   <view class="section">  
					     <view class="section-title">库存：</view>  
					     <input type="number" :value="store_nums" placeholder-style="font-size:18rpx;" placeholder="请输入库存" confirm-type="done"   @input="storeNumsInput" />
					   </view>
					   <view class="section">  
					     <view class="section-title">状态：</view>  
					       <radio-group  @change ='goodsStatusInput'>  
					         <label  style="margin-left:20rpx;">  
					         <radio value="0" :checked="goods_status==0" style="margin-left:20rpx;" />上架</label>  
					         <label style="margin-left:20rpx;">  
					         <radio value="2" :checked="goods_status==2" style="margin-left:20rpx;" />下架</label>  
					       </radio-group>  
					     </view>  
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @tap="modalBindcancel">取消</view>
					<view class="uni-tip-button" @tap="modalBindconfirm">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
	<view>
		<uni-popup :show="!modalOrderHidden" type="bottom" :custom="true" :mask-click="false">
			<view class="uni-tip" style="z-index:9999;">
				<view class="uni-tip-title">
				更新订单信息
				</view>
				<view class="uni-tip-content">
					<view class="section">  
						<view class="">{{goods_name}}</view>  
					</view>
					<view class="section">  
						<view class="">{{goods_sku_key}}</view>  
					</view>
					<view class="section">
						<view class="section-title" style="width: 300rpx;">{{order_price?'价格:￥'+order_price:''}}</view>  
					</view>
					<view class="section">  
						<view class="section-title" style="width: 200rpx;">{{buy_num>0?'数量：'+buy_num:''}}</view>
						<view v-if="order_sku_num>1" class="section-title" style="width: 200rpx;">{{order_sku_num>0?'子订单：'+order_sku_num:''}}</view>    
					</view>
					<view class="section">  
						<view class="section-title-delivery">物流公司：</view>  
						<input type="text" name="delivery_company" :value="delivery_company"  placeholder-style="width:300rpx;"  placeholder="物流公司" confirm-type="done"  @input="deliveryCompanyInput" style="border:1prx;width:300rpx;" />
					</view>
					<view class="section">  
						<view class="section-title-delivery">物流单：</view>  
						<input type="text" name="delivery_no" :value="delivery_no" placeholder-style="width:300rpx;" placeholder="物流单号" confirm-type="done"  @input="deliveryNoInput" style="border:1prx;width:300rpx" />
					</view>  
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @tap="modalBindOrdercancel">取消</view>
					<view class="uni-tip-button" @tap="modalBindOrderconfirm">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
import md5 from '../../../utils/md5.js';
var md5_key = getApp().globalData.md5_key;
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var navList_order = [{
  id: "order_manager",
  title: "订单管理"
}, {
  id: "goods_manager",
  title: "商品管理"
}];
var now = new Date().getTime();
var navList2 = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [{}];

export default {
  data() {
    return {
      title_name: '店铺管理',
      title_logo: '/images/history_s.png',
      orders: [],
      goods: [],
	  goods_name:'',
	  goods_status:0,
	  sell_price:0,
	  store_nums:0,
	  goods_sku_key:'',
	  order_price:0,
	  order_sku_num:0,
	  delivery_company:'',
	  delivery_no:'',
	  buy_num:0,
      shop_type: shop_type,
      page: 1,
      pagesize: 10,
      order_status: 0,
      navList_order: navList_order,
      tab2: 'order_manager',
      activeIndex2: 0,
	  TabCur: 0,
	  scrollLeft: 0,
	  old: {
	  	scrollTop: 0
	  },
      all_rows: 0,
      giftflag: 0,
      gift_send: 0,
      gift_rcv: 0,
      page_num: 0,
      hiddenmodalput: true,
      currenttime: now ? parseInt(now / 1000) : 0,
      navList2: navList2,
      buyin_rate: 90 , //礼物折现率
      floorstatus: false,
      scrollTop: 0,
      loadingHidden: false,
	  isReloading: false,
      username: "",
      windowWidth: "",
      windowHeight: "",
      dkheight: "1800",
      venuesItems: [],
      keyword: "",
	  modalHidden:true,
	  modalOrderHidden:true,
	  status: 'more',
	  contentText: {
	  	contentdown: '上拉加载更多',
	  	contentrefresh: '加载中',
	  	contentnomore: '没有更多'
	  },
	  downOption:{
	  	auto:false, // 不自动加载
	  	use:false,
	  	isLock:true,
	  },
	  upOption:{
	  	auto:false, // 不自动加载
	  	onScroll:true,
	  	page: {
	  	 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
	  	 	size: 10, // 每页数据的数量
	  	},
	  	noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
	  	empty:{
	  		tip: '~ 空空如也 ~', // 提示
	  		btnText: '去看看'
	  	}
	  },
	  isInit: false, // 列表是否已经初始化
	  scrollY: 0
    };
  },

  components: {
	  uniPopup,
	  MescrollUni
  },
  props: {},
  onLoad: function (options) {
    // 订单状态，已下单为1，已付为2，已发货为3，已收货为4 5已经评价 6退款 7部分退款 8用户取消订单 9作废订单 10退款中
    var that = this;
    var status = parseInt(options.status ? options.status : 0);
    var username = wx.getStorageSync('username');
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';

    if (!username) {
      //登录

      /*
      wx.navigateTo({
        url: '../login/login'
      })
      */
      wx.switchTab({
        url: '/pages/my/index'
      });
    }

    that.get_project_gift_para(); // 存为全局变量，控制支付按钮是否显示

    if (status) {
      that.setData({
        order_status: status
      });
    }

    that.setData({
      username: username
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          dkheight: res.windowHeight - 60,
          scrollTop: that.scrollTop + 10
        });
      }
    });
    //that.reloadData();
  },
  onShow: function () {//
  },
  mounted() {
  	this.isInit = true; // 标记为true
  	this.mescroll.triggerDownScroll();
  },
  methods: {
	 search_goodsnameTapTag: function (e) {
	    var that = this
	    that.keyword = e.target.value
	  },
	  orderSearch: function () {
	    var that = this
		that.page = 1 
	    //console.log('orderSearch keyword:', that.data.keyword)
	    //that.reloadData()
		this.isInit = true; // 标记为true
		this.mescroll.triggerDownScroll();
	},
	
	goodsStatusInput: function (e) {
	    var that = this;
	    var goods_status = e.detail.value
	    console.log("选中商品状态：" + goods_status);
	    that.setData({
	      goods_status: goods_status
	    })
	},
	 
	storeNumsInput: function (e) {
	    var that = this;
	    that.store_nums = e.target.value
	    console.log("商品库存：" + that.store_nums);
	 },
	 
	 sellPriceInput: function (e) {
	    var that = this;
	    that.sell_price = e.target.value
	    console.log("商品价格：" + that.sell_price);
	},
	
	modalBindconfirm: function () {
	    var that = this
		that.modalHidden = !that.modalHidden
	    that.update_goods_info()
	},
	  //取消按钮点击事件  
	modalBindcancel: function () {
		var that = this
		that.modalHidden = !that.modalHidden
	},

	update_goods_info: function () {
	    var that = this
	    var shop_type = that.shop_type
	    var goods_id = that.goods_id
	    var goods_sku_id = that.goods_sku_id
	    var sell_price = that.sell_price
	    var goods_store_nums = that.store_nums
	    var goods_status = that.goods_status
	    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
	    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
		var tokenmd5 = md5(username,md5_key,true)
	
	    //提交商品信息更新
	    wx.request({
	      url: weburl + '/api/client/update_manager_goods_info',
	      method: 'POST',
	      data: {
	        username: username,
	        access_token: token,
	        shop_type: shop_type,
	        access_tokenmd5: tokenmd5,
	        goods_id: goods_id,
	        goods_sku_id: goods_sku_id,
	        sell_price: sell_price,
	        goods_store_nums: goods_store_nums,
	        goods_status: goods_status,
	      },
	      header: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Accept': 'application/json'
	      },
	      success: function (res) {
	        console.log(res.data);
	        var orderObjects = res.data.result;
	        if (res.data.status != 'y') {
	          wx.showToast({
	            title: res.data.info ? res.data.info : '商品更新失败',
	            icon: 'loading',
	            duration: 1500
	          })
	        } else {
	          wx.showToast({
	            title: '商品更新完成',
	            icon: 'success',
	            duration: 1000
	          })
			  that.goods = [] ;
			  that.page  =  1 ;
			  that.isInit = true; // 标记为true
			  that.mescroll.triggerDownScroll();
	        }
	      }
	    })
	
	  }, 
	update_order: function (e) {
	    var that = this
	    var order_id = e.id
	    var goods_name = e.order_sku[0].goods_name
	    var order_price = e.order_price
	    var buy_num = e.buy_num
	    var order_sku_num = e.order_sku_num
		that.modalOrderHidden = !that.modalOrderHidden
		that.order_id = order_id 
		that.goods_name = goods_name 
		that.order_price = order_price 
		that.buy_num = buy_num 
		that.order_sku_num = order_sku_num 
		that.query_order_info()
	    console.log('update_order() order_id', order_id, ' order_price:', order_price)
	},  
	modalBindOrderconfirm: function () {
		var that = this
	  	that.modalOrderHidden = !that.modalOrderHidden
		that.update_order_info() ;
	},
	    //取消按钮点击事件  
	modalBindOrdercancel: function () {
	  	var that = this
	  	that.modalOrderHidden = !that.modalOrderHidden
	},
	
	deliveryCompanyInput: function (e) {
	    var that = this;
	    that.delivery_company = e.target.value
	    //console.log("物流公司：" + that.delivery_company);
	},

	deliveryNoInput: function (e) {
	    var that = this;
	    that.delivery_no = e.target.value
	    //console.log("物流单：" + that.delivery_no);
	},
	
	query_order_info: function () {
	    var that = this;
	    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
	    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
	    var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : '0';
	    var shop_type = that.shop_type
	    var order_id = that.order_id
	    //从服务器获取订单列表
	    console.log('orderdetail query_order_info() 从服务器获取订单 order_id: ', order_id)
	    if (order_id) {
	      wx.request({
	        url: weburl + '/api/client/query_order',
	        method: 'POST',
	        data: {
	          username: username,
	          access_token: token,
	          shop_type: shop_type,
	          order_id: order_id,
	        },
	        header: {
	          'Content-Type': 'application/x-www-form-urlencoded',
	          'Accept': 'application/json'
	        },
	        success: function (res) {
	          console.log('orderdetail query order:', res.data.result);
	          var orderObjects = res.data.result;
	          var all_rows = res.data.all_rows;
	          if (!res.data.result) {
	            wx.showToast({
	              title: '没有该订单',
	              icon: 'none',
	              duration: 1500
	            });
	          } else {
	            // 存储地址字段
	            for (var i = 0; i < orderObjects.length; i++) {
	              if (orderObjects[i]['logo'] && orderObjects[i]['logo'].indexOf("http") < 0) {
	                orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo']
	              }
	              for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
	                if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
	                  orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image']
	                }
	
	                if (orderObjects[i]['order_sku'][j]['sku_value']) {
	                  for (var k = 0; k < orderObjects[i]['order_sku'][j]['sku_value'].length; k++) {
	                    //orderObjects[i]['order_sku'][j]['sku_value'][k]['value'] = weburl + orderObjects[i]['order_sku'][j]['sku_value'][k]['value']
	                  }
	                }
	              }
	            }
	            console.log('orderdetail reloadData() query_order_info:', orderObjects)
	            var status = orderObjects[0]['status']
	            var gift_status = orderObjects[0]['gift_status']
	            var order_id = orderObjects[0]['id']
	            var order_no = orderObjects[0]['order_no']
	            var sendtime = orderObjects[0]['paytime']
	            var rcvtime = orderObjects[0]['rcvtime']
	            var orderprice = orderObjects[0]['order_price']
	            var orderaddress = orderObjects[0]['address']
	            var fullname = orderObjects[0]['full_name']
	            var from_nickname = orderObjects[0]['from_nickname']
	            var from_headimg = orderObjects[0]['from_headimg']
	            var tel = orderObjects[0]['tel']
	            var deliverycode = orderObjects[0]['deliverycode']
	            var deliveryname = orderObjects[0]['deliveryname']
	            var deliverystepinfo = orderObjects[0]['deliverystepinfo']
	            var order_status = orderObjects[0]['status']
	            var buy_num = orderObjects[0]['buy_num']
	            var sku_num = orderObjects[0]['order_sku'][0]['sku_num']
	            var giftflag = orderObjects[0]['m_id'] == m_id ? 0 : 1
	            var send_rcv = giftflag == 0 ? 'send' : 'receive'
	            var order_shape = orderObjects[0]['shape'] ? orderObjects[0]['shape'] : 1
				that.send_rcv = send_rcv 
				that.order_status = status 
				that.sendtime = sendtime 
				that.rcvtime = rcvtime 
				that.orderaddress = orderaddress 
				that.tel = tel 
				that.order_shape = order_shape 
				that.order_shape = send_rcv 
				that.fullname = fullname
				that.from_nickname = from_nickname
				that.from_headimg = from_headimg
				that.delivery_no = deliverycode
				that.delivery_company = deliveryname
				that.deliverystepinfo = deliverystepinfo
	          }
	        }
	      })
	    } else {
	      wx.showToast({
	        title: '订单不存在',
	        icon: 'none',
	        duration: 1500
	      })
	     
	    }
	  },
	update_order_info: function () {
	    var that = this
	    var order_id = that.order_id
	    var delivery_no = that.delivery_no
	    var delivery_company = that.delivery_company
	    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
	    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
		var shop_type = that.shop_type
		var tokenmd5 = md5(username,md5_key,true)
	    if (!delivery_no || !delivery_company|| !order_id) {
	      wx.showToast({
	        title: '订单信息不全',
	        icon: 'none',
	        duration: 1500
	      })
	      return
	    }
	
	    //提交商品信息更新
	    wx.request({
	      url: weburl + '/api/client/update_manager_order_info',
	      method: 'POST',
	      data: {
	        username: username,
	        access_token: token,
	        shop_type: shop_type,
	        access_tokenmd5: tokenmd5,
	        order_id: order_id,
	        delivery_company: delivery_company,
	        delivery_no: delivery_no,
	        type:1,  //1订单发货
	      },
	      header: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Accept': 'application/json'
	      },
	      success: function (res) {
	        console.log(res.data);
	        var orderObjects = res.data.result;
	        if (res.data.status != 'y') {
	          wx.showToast({
	            title: res.data.info ? res.data.info : '订单发货失败',
	            icon: 'loading',
	            duration: 1500
	          })
	        } else {
	          wx.showToast({
	            title: '订单发货完成',
	            icon: 'success',
	            duration: 1000
	          })
			  that.orders = [] ;
			  that.page  =  1 ;
			  that.isInit = true; // 标记为true
			  that.mescroll.triggerDownScroll();
	        }
	      }
	    })
	  }, 
	
	
	// mescroll组件初始化的回调,可获取到mescroll对象
	mescrollInit(mescroll) {
		this.mescroll = mescroll;
	},
	/*下拉刷新的回调 */
	downCallback(mescroll) {
		// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
		// loadSwiper();
		// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
		//mescroll.endSuccess() ;
	
		this.page =  1 
		mescroll.resetUpScroll()
		
	},
	/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
	upCallback(mescroll) {
		//联网加载数据
		var order_type = this.tab2
		//console.log("order_type="+order_type," mescroll.num:" , mescroll.num , " mescroll.size:" , mescroll.size);
		
		this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData)=>{
			//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
			mescroll.endSuccess(curPageData.length);
			//设置列表数据
			if(mescroll.num == 1|| this.page == 1) {
				this.orders = []; //如果是第一页需手动制空列表
				this.goods = [];
			}
			if(curPageData=='n'){
				mescroll.endByPage(this.page, this.all_rows)
			}else{
				if(order_type == 'order_manager'){
					this.orders=this.page==1?curPageData:this.orders.concat(curPageData); //追加新数据
				}else{
					this.goods=this.page==1?curPageData:this.goods.concat(curPageData); //追加新数据
				}
				console.log("mescroll.num:" , mescroll.num , " mescroll.size:" , mescroll.size  ,"  order_type:",order_type," orders:" , this.orders,' goods:',this.goods);
			}
			
		}, () => {
			//联网失败的回调,隐藏下拉刷新的状态
			mescroll.endErr();
		})
	},
	//点击空布局按钮的回调
	emptyClick(){
		uni.showToast({
			title:'点击了按钮'
		})
	},
	
	getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
		var that = this;
		var order_type = that.tab2;
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
		var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
		var status = that.status;
		var keyword = that.keyword;
		var shop_type = that.shop_type;
		var page = that.page;
		var pagesize = that.pagesize;
		var pageoffset =  0 ;
		var all_rows = that.all_rows ;
	
		if(page > all_rows && page>1) {
			console.log('加载完成 page:', page, 'all_rows:',all_rows);
			that.isReloading = false ;
			successCallback && successCallback('n');
			return ;
		}else{
			that.isReloading = true ;
			that.status = 'loading';
		}
		
		if (order_type == 'order_manager') { 	//从服务器获取订单列表
			try{
			  	uni.request({
			  	  url: weburl + '/api/client/query_order_list',
			  	  method: 'POST',
			  	  data: {
			  	    username: username,
			  	    access_token: token,
			  	    status: status,
			  	    shop_type: shop_type,
			  	    openid: openid,
			  	    order_type: order_type,
			  	    page: page,
			  	    pagesize: pagesize,
			  		keyword:keyword,
			  	  },
			  	  header: {
			  	    'Content-Type': 'application/x-www-form-urlencoded',
			  	    'Accept': 'application/json'
			  	  },
			  	  success: function (res) {
			  	    console.log(res.data);
			  	    var orderObjects = res.data.result;
			  	    var all_rows = res.data.all_rows;
			  	
			  	    if (!res.data.result && page == 1) {
			  	      wx.showToast({
			  	        title: "空空如也",
			  	        icon: 'none',
			  	        duration: 1500
			  	      });
			  	      setTimeout(function () {
			  	        wx.navigateBack();
			  	      }, 500);
			  			that.isReloading =  false
			  			that.orders =  []
			  			that.all_rows  = 0 
			  	    } else {
			  	      // 存储地址字段
						if (orderObjects) {
							for (var i = 0; i < orderObjects.length; i++) {
								if (orderObjects[i]['logo']){
									if (orderObjects[i]['logo'].indexOf("http") < 0) {
										orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo'];
									}	
								}
								for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
									if (orderObjects[i]['order_sku'][j]['sku_image']){
										if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
											orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
										}
									}
									orderObjects[i]['order_sku_num'] = orderObjects[i]['order_sku'] ? orderObjects[i]['order_sku'].length : 1;
								}
							}
							/*
							if (page > 1 && orderObjects) {
							//向后合拼
								orderObjects = that.orders.concat(orderObjects);
							}
							*/
							var gift_send = that.gift_send;
							var gift_rcv = that.gift_rcv;
							var page_num = that.page_num;
							page_num = all_rows / pagesize + 0.5;
			  	
							if (order_type == 'order_manager') {
								gift_send = all_rows;
							} else {
								gift_rcv = all_rows;
							}
							//that.orders = orderObjects
							that.all_rows = all_rows
							that.gift_send = gift_send
							that.gift_rcv = gift_rcv
							that.page_num = page_num.toFixed(0)
							
							that.page = page + 1 ;
							that.all_rows = all_rows ;
							successCallback && successCallback(orderObjects)
						}
			  	    }
			  	  }
			  	})
			} catch (e) {
			  	//联网失败的回调
			  	errorCallback && errorCallback()
			}
		} else { //从服务器获取商品列表
				var shape = 1
				console.log('get_manager_goods_list:', username,weburl,that.page)
				try{
					uni.request({
					  url: weburl + '/api/client/get_manager_goods_list',
					  method: 'POST',
					  data: {
					     username: username,
					     access_token: token,
					     page: page,
					     pagesize: pagesize,
					     shop_type: shop_type,
					     shape: shape,
						 keyword:keyword,
						 pageoffset:pageoffset,
					  },
					  header: {
					    'Content-Type': 'application/x-www-form-urlencoded',
					    'Accept': 'application/json'
					  },
					  success: function (res) {
					    var goods = res.data.result;
					    var page = that.page;
					    var all_rows = res.data.all_rows;
						
					    if (!goods) {
					      wx.showToast({
					        title: '没有搜到记录',
					        icon: 'loading',
					        duration: 1000
					      });
						  that.goods = [] ;
						  that.all_rows = 0 ;
						  that.loadingHidden =  false
					      return;
					    } 
						 
					    for (var i = 0; i < goods.length; i++) {
					      goods[i]['short_name'] = goods[i]['name'].substring(0, 10) + '...';
					
					      if (!goods[i]['act_info']) {
					        goods[i]['act_info'] = ''
					      } 
					
					      if (!goods[i]['goods_tag']) {
					        goods[i]['goods_tag'] = ''
					      } else {
					        goods[i]['goods_tag'] = goods[i]['goods_tag'].substring(0, 10)
					      }
					    }
						/*
					    if (page > 1 && goods) {
					      //向后合拼
					      goods = that.goods.concat(goods)
					    }
						*/
						var page_num = that.page_num
						page_num = all_rows
						//that.goods = goods 
						that.page_num = page_num 
						that.all_rows = all_rows 
						that.page = page + 1 ;
						that.pageoffset = pageoffset ;
					    console.log('get_manager_goods_list:', goods,'page num:',that.page_num,' all rows:',that.all_rows,' pagesize:',that.pagesize,' page:',that.page);
						successCallback && successCallback(goods);
					  }
					})
				} catch (e) {
					//联网失败的回调
					errorCallback && errorCallback();
				}
		}
		
	},
	
    goBack: function () {
      wx.switchTab({
        url: '/pages/hall/hall'
      });
    },
    onOrderTapTag: function (e) {
	  this.TabCur = e.currentTarget.dataset.id;
	  this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
	  var tab = e.currentTarget.dataset.tab;
      var that = this;
      var index = e.currentTarget.dataset.index;
      var giftflag = that.giftflag;
	 
      if (tab == 'order_manager') {
        giftflag = 0;
			that.goods = [] ;
      } else {
			giftflag = 1; //goods manager
			that.orders = [] ;
      }

      that.setData({
        activeIndex2: index,
        tab2: tab,
        page: 1,
        giftflag: giftflag,
        all_rows: 1,
        page_num: 1
      });
      console.log('tab:' + tab, ' giftflag:', giftflag);
	  that.isInit = true; // 标记为true
	  that.mescroll.triggerDownScroll();
	  //that.goTop() ;
	 //that.reloadData();
     
    },
    // 获取滚动条当前位置
    scrolltoupper: function (e) {
    	var that = this
		if (e.detail.scrollTop > 100) {
			that.floorstatus = true 
		} else {
			that.floorstatus = false 
		}
		
		that.current_scrollTop = e.detail.scrollTop
    },
	scroll: function(e) {
		var that = this
		var old_scrollTop = that.old.scrollTop
		var current_scrollTop = that.mescroll.scrollTop
		that.old.scrollTop = current_scrollTop
	},
    //回到顶部
    goTop: function (e) {
	// 一键回到顶部
		var that = this;
		var navList_new = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : '';
     	//that.pdList = [] ;
		that.page = 1 ;
		that.pageoffset = 0 ;
		that.mescroll.resetUpScroll()
		//getApp().globalData.hall_gotop = 0;
       // 解决view层不同步的问题
		//console.log('goTop scrollTop:', that.mescroll.scrollTop); 
		that.$nextTick(function() {
			that.mescroll.scrollTo(0) ;
		});
		that.mescroll.scrollTop = that.old.scrollTop
    },
    getMoreOrdersTapTag: function (e) {
      var that = this;
      var page = that.page + 1;
      var pagesize = that.pagesize;
      var page_num = that.page_num;
	  var isReloading  = that.isReloading

      if (page > page_num ) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 1000
        });
        return;
      }
	  if (isReloading) {
		/*
	    wx.showToast({
	      title: '加载中',
	      icon: 'loading',
	      duration: 1000
	    });
		*/
	    return;
	  }
	  that.page = page 
      //that.reloadData();
    },
    sendAginTapTag: function (e) {
      var that = this;
      var username = wx.getStorageSync('username');
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      wx.navigateTo({
        url: '../list/list?username=' + username + '&token=' + token
      });
    },
    send: function (e) {
      var that = this;
      var order_no = e.currentTarget.dataset.objectId;
      var index = e.currentTarget.dataset.index;
      var orders = [];
      orders[0] = that.orders[index];
      console.log('送出:', order_no, ' order info:', orders, 'index:', index);
      wx.navigateTo({
        url: '../order/send/send?order_no=' + order_no + '&orders=' + JSON.stringify(orders)
      });
    },
    sendOtherTapTag: function (e) {
      var that = this;
      var order_no = e.currentTarget.dataset.orderNo;
      var index = e.currentTarget.dataset.index;
      var orders = [];
      orders[0] = that.orders[index];
      wx.navigateTo({
        url: '../order/transfer/transfer?receive=-1&order_no=' + order_no + '&orders=' + JSON.stringify(orders)
      });
      orders = that.orders;
      orders[index]['duetime'] = that.currenttime;
      that.setData({
        orders: orders
      });
    },
    refundTapTag: function (e) {
      var that = this;
      var order_no = e.currentTarget.dataset.orderNo;
      var index = e.currentTarget.dataset.index;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1'; //提交退款申请

      wx.request({
        url: weburl + '/api/client/refund',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          order_no: order_no
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          var orderObjects = res.data.result;

          if (res.data.status != 'y') {
            wx.showToast({
              title: res.data.info ? res.data.info : '退款申请失败',
              icon: 'loading',
              duration: 1500
            });
          } else {
            wx.showToast({
              title: '退款申请完成',
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
    detailTapTag: function (e) {
      var that = this;
      var order_object = e;
      var order_id = order_object['id'];
	  var order_no = order_object['order_no'];
      var tab2 = that.tab2;
      console.log('订单ID:' + order_id);
      wx.navigateTo({
         url: '/pages/order/orderdetail/orderdetail?order_id=' + order_id + '&order_no=' + order_no //  + '&order_object=' + JSON.stringify(order_object) + '&giftflag=' + that.data.giftflag + '&send_rcv=' + tab2
      });
    },
	update_goods: function (e) {
	    var that = this
	    var goods_id = e.id
	    var goods_sku_id = e.sku_id
	    var goods_name = e.name
	    var sell_price = e.sell_price
	    var store_nums = e.store_nums
	    var goods_status = e.status
	    var goods_sku_key = e.sku_key
		that.modalHidden = !that.modalHidden
		that.goods_id = goods_id
		that.goods_sku_id = goods_sku_id
		that.goods_name = goods_name
		that.sell_price = sell_price
		that.store_nums = store_nums
		that.goods_status = goods_status
		that.goods_sku_key = goods_sku_key
	  
	    console.log('update_goods() goods_sku_id：', goods_sku_id, '  goods_name:', goods_name,'goods_status:',goods_status)
	  },
    get_project_gift_para: function () {
      var that = this;
      var navList_new = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [{}];
      var shop_type = that.shop_type;
      console.log('index get_project_gift_para navList2:', navList_new);

      if (navList2.length == 0) {
        //项目列表
        wx.request({
          url: weburl + '/api/client/get_project_gift_para',
          method: 'POST',
          data: {
            type: 2,
            //暂定 1首页单图片 2首页轮播  
            shop_type: shop_type
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log('get_project_gift_para:', res.data.result);
            navList_new = res.data.result;

            if (!navList_new) {
              /*
               wx.showToast({
                 title: '没有菜单项2',
                 icon: 'loading',
                 duration: 1500
               });
               */
              return;
            } else {
              wx.setStorageSync('navList2', navList_new);
              that.setData({
                navList2: navList_new,
                buyin_rate: navList_new[7]['value'] ? navList_new[7]['value'] : buyin_rate
              });
            }
          }
        });
      } else {
        that.setData({
          navList2: navList_new,
          buyin_rate: navList_new ? navList_new[7]['value'] : buyin_rate
        });
      }

      setTimeout(function () {
        that.setData({
          loadingHidden: true
        });
      }, 1500);
    },
	/*
    reloadData: function () {
      var that = this;
      var order_type = that.tab2;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var status = that.order_status;
	  var keyword = that.keyword;
      var shop_type = that.shop_type;
      var page = that.page;
      var pagesize = that.pagesize;
	  var pageoffset =  0 ;
	  var isReloading = that.isReloading
      //console.log('reloadData shop_type:' + shop_type + ' order_type:' + order_type);
		if(isReloading) {
			//console.log('reloadData shop_type:' + shop_type + ' order_type:' + order_type,' isReloading:',isReloading);
			wx.showToast({
			  title: '加载中',
			  icon: 'loading',
			  duration: 1000
			});
			setTimeout(function () {
			  that.reloadData();
			}, 500);
			return 
		}else{
			that.isReloading = true 
		}
      if (order_type == 'order_manager') {
		  that.goods = [] ;
        //从服务器获取订单列表
        uni.request({
          url: weburl + '/api/client/query_order_list',
          method: 'POST',
          data: {
            username: username,
            access_token: token,
            status: status,
            shop_type: shop_type,
            openid: openid,
            order_type: order_type,
            page: page,
            pagesize: pagesize,
			keyword:keyword,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log(res.data);
            var orderObjects = res.data.result;
            var all_rows = res.data.all_rows;

            if (!res.data.result && page == 1) {
              wx.showToast({
                title: "空空如也",
                icon: 'none',
                duration: 1500
              });
              setTimeout(function () {
                wx.navigateBack();
              }, 500);
				that.isReloading =  false
				that.orders =  []
				that.all_rows  = 0 
            } else {
              // 存储地址字段
              if (orderObjects) {
                for (var i = 0; i < orderObjects.length; i++) {
				  if (orderObjects[i]['logo']){
					if (orderObjects[i]['logo'].indexOf("http") < 0) {
					  orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo'];
					}	
				  }
                  for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
					if (orderObjects[i]['order_sku'][j]['sku_image']){
						 if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
						   orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
						 }
					}
                    orderObjects[i]['order_sku_num'] = orderObjects[i]['order_sku'] ? orderObjects[i]['order_sku'].length : 1;
                  }
                }

                if (page > 1 && orderObjects) {
                  //向后合拼
                  orderObjects = that.orders.concat(orderObjects);
                }

                var gift_send = that.gift_send;
                var gift_rcv = that.gift_rcv;
                var page_num = that.page_num;
                page_num = all_rows / pagesize + 0.5;

                if (order_type == 'send') {
                  gift_send = all_rows;
                } else {
                  gift_rcv = all_rows;
                }
				
                that.setData({
                  orders: orderObjects,
                  all_rows: all_rows,
                  gift_send: gift_send,
                  gift_rcv: gift_rcv,
                  page_num: page_num.toFixed(0)
                });
				
                //console.log('gift_send:' + gift_send + ' gift_rcv:' + gift_rcv);
				setTimeout(function () {
				   that.isReloading =  false
				}, 1500);
              }
            }
          }
        });
      } else {
        //从服务器获取商品列表
        var shape = 1;
		that.orders = [] ;
		console.log('get_manager_goods_list:', username,weburl,that.page);
        uni.request({
          url: weburl + '/api/client/get_manager_goods_list',
          method: 'POST',
          data: {
             username: username,
             access_token: token,
             page: page,
             pagesize: pagesize,
             shop_type: shop_type,
             shape: shape,
			 keyword:keyword,
			 pageoffset:pageoffset,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            var goods = res.data.result;
            var page = that.page;
            var all_rows = res.data.all_rows;
			
            if (!goods) {
              wx.showToast({
                title: '没有搜到记录',
                icon: 'loading',
                duration: 1000
              });
			  that.goods = [] ;
			  that.all_rows = 0 ;
			  that.loadingHidden =  false
              return;
            } 
			 
            for (var i = 0; i < goods.length; i++) {
              goods[i]['short_name'] = goods[i]['name'].substring(0, 10) + '...';

              if (!goods[i]['act_info']) {
                goods[i]['act_info'] = '';
              } 

              if (!goods[i]['goods_tag']) {
                goods[i]['goods_tag'] = '';
              } else {
                goods[i]['goods_tag'] = goods[i]['goods_tag'].substring(0, 10);
              }
            }

            if (page > 1 && goods) {
              //向后合拼
              goods = that.goods.concat(goods);
            }
			var page_num = that.page_num
			page_num = all_rows
			that.goods = goods 
			that.page_num = page_num 
			that.all_rows = all_rows 
			
            console.log('get_manager_goods_list:', goods,'page num:',that.page_num,' all rows:',that.all_rows,' pagesize:',that.pagesize,' page:',that.page);
            setTimeout(function () {
               that.isReloading =  false
            }, 1500);
          }
        })
      }
    },
	*/
    buyin: function (e) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_id = that.goods_id; //e.currentTarget.dataset.goodsId

      var goods_skuid = that.goods_skuid; //e.currentTarget.dataset.goodsSkuid

      var order_skuid = that.order_skuid; //e.currentTarget.dataset.skuId

      var shop_type = that.shop_type;
      var order_index = that.order_index;
      var sku_index = that.sku_index;
      console.log('礼物回收 goods_id:', goods_id, 'goods skuid:', goods_skuid, 'order skuid:', order_skuid, ' order_index:', order_index); //礼物折现

      wx.request({
        url: weburl + '/api/client/buyin',
        method: 'POST',
        data: {
          username: username,
          m_id: m_id,
          access_token: token,
          order_skuid: order_skuid,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          var orderObjects = res.data.result;

          if (res.data.status != 'y') {
            wx.showToast({
              title: res.data.info ? res.data.info : '回收失败',
              icon: 'loading',
              duration: 1500
            });
          } else {
            wx.showToast({
              title: '回收完成',
              icon: 'success',
              duration: 1500
            });
            var orders = that.orders;
            orders[order_index]['order_sku'][sku_index]['status'] = 1;
            that.setData({
              orders: orders
            });
          }
        }
      });
    },
    comment: function (e) {
      var goods_id = e.goodsId;
      var goods_skuid = e.goodsSkuid;
      var order_skuid = e.skuId;
      console.log('礼物评价 goods_id:', goods_id, 'goods skuid:', goods_skuid, 'order skuid:', order_skuid);
      wx.navigateTo({
        url: '../goods/comment/comment?goods_id=' + goods_id + '&goods_skuid=' + goods_skuid + '&order_skuid=' + order_skuid
      });
    },
    accept: function (e) {
      var objectId = e.currentTarget.dataset.objectId;
      var totalFee = e.currentTarget.dataset.totalFee;
      console.log('接受礼物order_no:');
      console.log(objectId);
      wx.navigateTo({
        url: '../order/receive/receive?order_no=' + objectId + '&receive=1'
      });
    },
    pay: function (e) {
      var objectId = e.currentTarget.dataset.objectId;
      var totalFee = e.currentTarget.dataset.totalFee;
      console.log('order_no');
      console.log(objectId);
      wx.navigateTo({
        url: '../order/payment/payment?orderNo=' + objectId + '&totalFee=' + totalFee
      });
    },
    cancel_order: function (e) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var order_no = e.currentTarget.dataset.objectId;
      var order_index = e.currentTarget.dataset.index;
      var shop_type = that.shop_type;
      wx.showModal({
        title: '请确认',
        content: '确认要取消吗',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: weburl + '/api/client/update_order_status',
              method: 'POST',
              data: {
                username: username,
                access_token: token,
                order_no: order_no,
                status_info: 'cancel',
                shop_type: shop_type
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                console.log(res.data.result);
                console.log(res.data.info);

                if (!res.data.info) {
                  wx.showToast({
                    title: '取消完成',
                    icon: 'success',
                    duration: 1000
                  });
                  var orders = that.orders;
                  orders[order_index]['status'] = 8; // 8 订单取消

                  that.setData({
                    orders: orders
                  });
                } else {
                  wx.showToast({
                    title: res.data.info,
                    icon: 'loading',
                    duration: 1500
                  });
                }
              }
            });
          }
        }
      });
    },
    receive: function (e) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      wx.showModal({
        title: '请确认',
        content: '确认要收货吗',
        success: function (res) {
          if (res.confirm) {
            var objectId = e.currentTarget.dataset.objectId;
            wx.request({
              url: weburl + '/api/client/order_confirm',
              method: 'POST',
              data: {
                username: username,
                access_token: token,
                id: objectId,
                shop_type: shop_type
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                console.log(res.data.result);
                console.log(res.data.info);

                if (!res.data.info) {
                  wx.showToast({
                    title: '确认收货完成',
                    icon: 'success',
                    duration: 1000
                  });
                } else {
                  wx.showToast({
                    title: res.data.info,
                    icon: 'loading',
                    duration: 1500
                  });
                }
              }
            });
          }
        }
      });
    },
    showGoods: function (e) {
      var skuId = e.currentTarget.dataset.skuId;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_id = e.currentTarget.dataset.goodsId;
      var goods_name = e.currentTarget.dataset.goodsName;
      wx.navigateTo({
        url: '../details/details?sku_id=' + skuId + '&goods_name=' + goods_name + '&id=' + goods_id + '&token=' + token + '&username=' + username
      });
    },
    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }

          data = data[key2];
        });
      });
    }
  }
};
</script>
<style>
@import "./shopowner.css";
</style>