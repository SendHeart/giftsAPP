<template>
<view>
	<!-- 
	<view class="banner" style>
	  <text class="status1" v-if="send_rcv=='send' && gift_status==2 && order_status<2 && order_shape!=5 && order_shape!=4">对方已接受,待付款</text>
	  <text class="status1" v-if="send_rcv=='send' && gift_status==2 && order_status>=2 && order_status<4 && order_shape!=5&& order_shape!=4">礼物寄送中</text>
	  <text class="status2" v-if="send_rcv=='send' && order_status<=2 && gift_status==1">对方未接受</text>
	  <text class="status2" v-if="send_rcv=='send' && order_status==4 && gift_status==1">对方已收货</text>
	  <text class="status2" v-if="send_rcv=='send' && gift_status==0">未送出</text>
	  <text class="status1" v-if="send_rcv=='receive' && gift_status==2 && order_status<2 && order_shape!=5 && order_shape!=4">已接受,对方未付款</text>
	  <text class="status1" v-if="send_rcv=='receive' && gift_status==2 && order_status>=2  && order_status<4 && order_shape!=5 && order_shape!=4">礼物寄送中</text>
	</view>
	-->

<view class="container">
  <view class="order-item" v-for="(item, index) in orders" :key="index">
    <!-- 厂家logo缩略图 -->
    <view class="order-detail-text">
      <text>{{(order_shape!=5 && order_shape!=4)?'订单号:':'订单号:'}}</text>
      <text>{{order_no}}</text>
	  <text class="smallbtn2" style="border: none;margin:0rpx auto;" @tap="copyorderinfo(item)">复制订单信息</text>
    </view>
    <view v-for="(mapping, index2) in item['order_sku']" :key="index2" class="carts-item" @tap="showGoods" :data-sku-id="mapping.id" :data-goods-id="mapping.goods_id" :data-goods-name="mapping.goods_name" :data-goods-shape="mapping.shape">
      <view>
        <!-- 缩略图 -->
        <image class="carts-image" :src="mapping.sku_image" mode="aspectFit"></image>
      </view>
      <view class="carts-text">
        <!-- 商品标题 -->
        <text class="carts-title">{{mapping.goods_name}}</text>
		<view class="carts-sku-text">
        <view v-if="order_shape!=5 && order_shape!=4" v-for="(sku_value, index3) in mapping['sku_value']" :key="index3" style="font-size:24rpx;">
			<text>{{sku_value?sku_value['name']+':':''}}</text>
			<text v-if="sku_value['type']==1">{{sku_value?sku_value['value']:''}}</text>
			<image v-if="sku_value['type']==2" :src="(sku_value?sku_value['value']:'')" style="width:30rpx;height:30rpx;"> </image> 
			<text v-if="sku_value['type']==2">{{sku_value?sku_value['note']:''}} </text>
        </view>
		</view>
		<view v-if="order_shape==4 && card_name_info">
            <text class="carts-card-title">{{card_name_info.card_name_name?'姓名:'+card_name_info.card_name_name:''}}{{card_name_info.card_name_title?'('+card_name_info.card_name_title+')':''}}{{card_name_info.card_name_phone?' 手机: '+card_name_info.card_name_phone:''}}
            </text>
            <text class="carts-card-title">{{card_name_info.card_name_addr?'地址: '+card_name_info.card_name_addr:''}}
            </text>
		</view>
		<view v-if="order_shape==4 && card_love_info">
            <text class="carts-card-title">{{card_love_info.card_love_title?card_love_info.card_love_title:''}}
            </text>
            <text class="carts-card-title">{{card_love_info.card_love_related?'联系人:'+card_love_info.card_love_related:''}}{{card_love_info.card_love_phone?'手机:'+card_love_info.card_love_phone:''}}
            </text>
		</view> 
		<view v-if="order_shape==4 && card_register_info">
            <text class="carts-card-title">{{card_register_info.card_register_title?'名称:'+card_register_info.card_register_title:''}} 
            </text>
            <text class="carts-card-title">{{card_register_info.register_start_date}}{{card_register_info.register_start_time?'~'+card_register_info.register_start_time:''}}{{card_register_info.card_register_ownername?' 发起人: '+card_register_info.card_register_ownername:''}}
            </text>
		</view>
		<view v-if="order_shape==5 && card_cele_info">
            <text class="carts-card-title">{{card_cele_info.card_cele_title?card_cele_info.card_cele_title:''}} 
            </text>
		</view>
        <view class="carts-subtitle">
          <text>x{{mapping.sku_num}}</text>
        </view>
      </view>
    </view>
    <view class="order-footer">
      <view style="width:80%">
        <text class="order-price">金额:￥{{item.order_price}}<text :class="(item.amountpay<item.order_price)?'':'hidden'">(实付￥{{item.amountpay}})</text></text>
        <text @tap="pay" :data-object-id="item.order_no" :data-total-fee="item.amount" data-received="1" :class="((item.status==1 && item.gift_status==2  && (item.rcv_openid ||item.rcv_receivetime>0) && giftflag==0) ? '': 'hidden') + ' smallbtn'" style="background:#e34c55;color:#fff;">去支付</text>
        <text style="width:20%;" @tap="receive" :data-object-id="item.id" :class="((item.status==3 && item.gift_status==2 && giftflag==1 ) ? '': 'hidden') + ' smallbtn'">确认收货</text>
         <text style="width:20%;" @tap="showGoods" :data-order-shape="order_shape" :data-order-no="item.order_no" :class="((order_shape==5 || order_shape==4) ? '': 'hidden') + ' smallbtn'">看内容</text>
        <text style="width:20%;" @tap="showinteracton" :data-order-shape="order_shape" :data-order-id="item.id" :class="((order_shape==4||order_shape==5) ? '': 'hidden') + ' smallbtn'">查详情</text>
		
	  </view>
    </view>
    <!--<view class="order-footer">
   
		<text>收货地址</text>
		<text>{{item.address}}</text>
   
    <text>送给:</text>
		<image src="{{item.rcv_headimg}}"></image>
    <text>{{item.rcv_nickname}}</text>
     
	</view>-->
  </view>
  <view class="order-detail">
    <view class="order-detail-text">
      <text class="labeltext">总共:</text>
      <text>{{sku_num}}件 {{buy_num>1?' (份数:'+buy_num+')':''}}</text>
      <!-- <text>合计金额:￥{{orderprice}}元</text> -->
    </view>
    <view class="order-detail-text">
      <text class="labeltext">送出人: </text>
      <image :src="from_headimg"></image>
      <text>{{from_nickname}}</text>
    </view>
    <view class="order-detail-text">
      <text class="labeltext">送出时间:</text>
      <text>{{sendtime?sendtime:''}}</text>
    </view>
    <view class="order-detail-text">
      <text class="labeltext">接受时间:</text>
      <text>{{rcvtime?rcvtime:'对方未接受'}}{{gift_status=='1'?'':''}}</text>
    </view>
  </view>
  <view v-if="order_shape!=5" class="delivery-detail" @tap="address_update">
    <view class="delivery-detail-text">
      <text class="labeltext">收货人:</text>
      <text class="labeltext2">{{fullname?fullname:''}}</text>
	  <text class="smallbtn3">修改</text>
    </view>
    <view class="delivery-detail-text">
      <text class="labeltext">手机:</text>
      <text>{{tel?tel:''}}</text>
    </view>
    <view class="delivery-detail-text">
      <text class="labeltext">收货地址:</text>
      <text>{{orderaddress?orderaddress:''}}</text>
    </view>
    <view class="delivery-detail-text">
      <text class="labeltext">物流公司:</text>
      <text>{{deliveryname?deliveryname:''}}</text>
    </view>
    <view class="delivery-detail-text">
      <text class="labeltext">运单号:</text>
      <text>{{deliverycode?deliverycode:''}}</text>
    </view>
    <!--
    <view class="delivery-detail-text" style='margin-bottom:15rpx;'>
      <text class="labeltext">当前状态:</text>
      <text>{{deliverystepinfo?deliverystepinfo:''}}</text>
      
   <text wx:if="{{deliverycode}}" bindtap="expressTapTag" style="width:20%;color:gray;text-align:center;border:1px solid; border-radius: 5px">物流详情</text>
   
    </view>
    -->
  </view>
  <view v-if="order_shape!=5 && delivery_status && delivery_status.length>0" class="delivery-detail-info">
    <text style="text-indent:20rpx;font-weight:bold;" @tap="expressTapTag">物流跟踪</text>
    <view class="delivery-detail-info-text">
		<uni-steps :options="delivery_trace" :active="delivery_step_active" direction="column" />
	</view>
	<!--
	<view v-for="(accept, index) in delivery_trace" :key="index">
      <view class="delivery-detail-info-text">		 
			<view class="timeline-date" style="margin-left:20rpx;">			
				<text style="width:80%;margin-left:20rpx;color:#999;">{{accept.AcceptTime}}</text>
			</view>
			<view class="timeline-date" style="margin-left:20rpx;">          
				<text style="width:80%;overflow:hidden;position:relative;margin-left:20rpx;">{{accept.AcceptStation}}</text>
			</view>
			<view class="timeline-date" style="margin-left:20rpx;">          
				<text style="width:80%;margin-left:20rpx;">{{accept.operator}}</text>
			</view>			
		</view>	 
    </view>
	-->
  </view>
</view>
<view class="footer">
  <view class="opt-buttons">
    <form @submit="formSubmit" data-name="express" report-submit="true" :hidden="((currentPages_length>1 && order_shape!=5 && order_shape!=7 && order_shape!=8)?false:true)">
      <button class="button-group" style="width:200rpx;" formType="submit">物流跟踪</button>
    </form>
    <form @submit="formSubmit" data-name="goBack" report-submit="true" :hidden="((currentPages_length>1 && order_shape!=5 && order_shape!=7 && order_shape!=8)?true:false)">
      <button class="button-group" style="width:200rpx;" formType="submit">返回</button>
    </form>
    <form @submit="formSubmit" data-name="navigateToCustomerService" report-submit="true">
      <button class="button-group" style="width:200rpx;margin-left:50rpx;" formType="submit">咨询客服</button>
    </form>
  </view>
</view>
</view>
</template>

<script>
import uniSteps from '@/components/uni-steps/uni-steps.vue'
var weburl = getApp().globalData.weburl;
var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
var shop_type = getApp().globalData.shop_type;
var delivery_info_list = []
export default {
	data() {
    return {
		nickname: userInfo.nickname ? userInfo.nickname : '匿名',
		avatarUrl: userInfo.avatarUrl,
		title_name: '记录详情',
		title_logo: '/static/images/footer-icon-05.png',
		delivery_background: weburl + '/uploads/line.png',
		share_title: '我的礼物详情单',
		share_desc: '送礼就是送心',
		orders: [],
		order_no: '',
		sendtime: '',
		orderprice: 0,
		orderaddress: '',
		fullname: '',
		deliverycode: '',
		deliveryname: '',
		deliverystepinfo: '',
		deliveryinfo: [],
		delivery_trace:[],
		deliveryflag: 0,
		delivery_step_active: 1,
		tel: '',
		rcvtime: '',
		page: 1,
		pagesize: 10,
		status: 0,
		order_id: 0,
		sku_num: 0,
		giftflag: 0,
		shop_type: shop_type,
		scrollTop: 1000,
		currentPages_length: 2,
		activeIndex2: "",
		tab2: "",
		winHeight: "",
		winWidth: "",
		wx_notes: "",
		gift_status: "",
		send_rcv: "",
		order_status: "",
		order_shape: "",
		buy_num: "",
		from_nickname: "",
		from_headimg: "",
		card_name_info: "",
		card_love_info: "",
		card_cele_info: "",
		card_register_info: "",
		card_type: "",
		userInfo: "",
	}
	},

  components: {
	  uniSteps
  },
  props: {},
  onLoad: function (options={}) {
		// 订单状态，已下单为1，已付为2，已发货为3，已收货为4 5已经评价 6退款 7部分退款 8用户取消订单 9作废订单 10退款中
		var that = this;
		var orders = that.orders;
		var order_id = options.order_id ? options.order_id : 0;
		var order_no = options.order_no ? options.order_no : 0;
		var card_type = options.card_type ? options.card_type : 0;
		var giftflag = options.giftflag ? options.giftflag : 0;
		var send_rcv = options.send_rcv ? options.send_rcv : 0;
		var wx_notes = options.wx_notes ? options.wx_notes : 0; //微信通知直接进入

		var order_object = options.order_object ? JSON.parse(options.order_object) : '';
		wx.getSystemInfo({
			success: function (res) {
				let winHeight = res.windowHeight;
				let winWidth = res.windowWidth;
				that.winHeight = winHeight
				that.winWidth = winWidth
			}
		});
		var currentPages = getCurrentPages();
		that.currentPages_length = currentPages.length
		that.wx_notes = wx_notes

		console.log('orderdetail onload options:', options, 'order_object:', order_object, 'length:', order_object.length);

		if (order_object) {
			console.log('订单详情', order_object);
			var sku_num = 0;
			var status = order_object['status'];
			var gift_status = order_object['gift_status'];
			var order_no = order_object['order_no'];
			var order_shape = order_object['shape'];
			var sendtime = order_object['paytime'];
			var rcvtime = order_object['rcvtime'];
			var orderprice = order_object['order_price'];
			var orderaddress = order_object['address'];
			var fullname = order_object['full_name'];
			var from_nickname = order_object['from_nickname'];
			var from_headimg = order_object['from_headimg'];
			var tel = order_object['tel'];
			var deliverycode = order_object['deliverycode'];
			var deliveryname = order_object['deliveryname'];
			var deliverystepinfo = order_object['deliverystepinfo'];
			var order_status = order_object['status'];
			var buy_num = order_object['buy_num'];
			var card_name_info = order_object['card_name_info'] ? order_object['card_name_info'] : '';
			var card_cele_info = order_object['card_cele_info'] ? order_object['card_cele_info'] : '';
			var card_love_info = order_object['card_love_info'] ? order_object['card_love_info'] : '';
			var card_register_info = order_object['card_register_info'] ? order_object['card_register_info'] : '';
			sku_num = order_object['order_sku'] ? order_object['order_sku'].length : 1;
			orders.push(order_object);
			that.order_id = order_id ? order_id : 0,
			that.orders = orders
			that.status = status
			that.giftflag = giftflag ? giftflag : 0
			that.gift_status = gift_status
			that.send_rcv = send_rcv ? send_rcv : 0
			that.order_status = order_status
			that.order_shape = order_shape
			that.sku_num = sku_num
			that.buy_num = buy_num
			that.order_no = order_no
			that.sendtime = sendtime
			that.rcvtime = rcvtime
			that.orderprice = orderprice
			that.orderaddress = orderaddress ? orderaddress : ''
			that.tel = tel ? tel : ''
			that.fullname = fullname ? fullname : ''
			that.from_nickname = from_nickname
			that.from_headimg = from_headimg
			that.deliverycode = deliverycode ? deliverycode : ''
			that.deliveryname = deliveryname ? deliveryname : ''
			that.deliverystepinfo = deliverystepinfo ? deliverystepinfo : ''
			that.card_name_info = card_name_info
			that.card_love_info = card_love_info
			that.card_cele_info = card_cele_info
			that.card_register_info = card_register_info
			that.card_type = card_type
		} else if (order_no || order_id) {
			that.order_no = order_no
			that.order_id = order_id
			console.log('订单号:', order_no,' order id:',order_id);
			//that.reloadData()
		} else {
			uni.navigateBack();
		}
	},
	onShow: function () {
		this.reloadData();
		var that = this;
		var CurrentPages = getCurrentPages();

		if (CurrentPages.length > 1) {
			that.title_logo = '../../../images/back.png'
		}
	},
	
	onShareAppMessage: function () {
		var that = this;
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var order_no = that.order_no;
		return {
			title: that.share_title,
		desc: that.share_desc,
		path: '/pages/order/orderdetail/orderdetail?order_no=' + order_no + '&refername=' + username
		};
	},
	
	methods: {
	copyorderinfo: function (e) {
		var that = this;
		var order_info_no = e.order_no?'订单:'+e.order_no:'';
		var order_info_num = e.order_sku[0]['sku_num'] ? ' 数量:' +  e.order_sku[0]['sku_num'] : ''
		var order_info_goodsname = e.order_sku[0]['goods_name'] ? ' 商品:' + e.order_sku[0]['goods_name'] : ''
		var order_info = order_info_no + order_info_num + order_info_goodsname
		//console.log('copyorderinfo success data:',order_info);
		uni.setClipboardData({
			data: order_info,
			success: function () {
				console.log('copyorderinfo success data:',order_info);
			}
		})
	},
	
    pageScrollToBottom: function () {
      wx.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
        // 使页面滚动到底部
        wx.pageScrollTo({
          scrollTop: 450
        });
      }).exec();
    },
	
	formSubmit: function (e) {
		var that = this;
		var formId = e.detail.formId;
		var form_name = e.currentTarget.dataset.name;
		var order_shape = that.order_shape;
		console.log('formSubmit() formID：', formId, ' form name:', form_name);

		if (form_name == 'express') {  
			that.expressTapTag();
		} else if (form_name == 'navigateToCustomerService'){
			that.navigateToCustomerService() ;
		} else if (form_name == 'goBack') {
			if (order_shape == 5) {
				uni.navigateTo({
					url: '/pages/list/list?navlist_title=贺卡请柬'
				})
			} else if (order_shape == 4) {
				uni.navigateTo({
					url: '/pages/list/list?navlist_title=互动卡'
				})
			} else {
				that.goBack();
			}
		}
		if (formId) that.submintFromId(formId);
	},
	
    //提交formId，让服务器保存到数据库里
    submintFromId: function (formId) {
      var that = this;
      var formId = formId;
      var shop_type = that.shop_type;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      wx.request({
        url: weburl + '/api/client/save_member_formid',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          formId: formId,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('submintFromId() update success: ', res.data);
        }
      });
    },
	
	address_update: function () {
		var that = this
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var order_no = that.order_no
		var order_id = that.order_id
	    uni.navigateTo({
			url: '/pages/address/list/list?order_id=' + order_id+'&order_no='+order_no 
		})
	},

	goBack: function () {
		var CurrentPages = getCurrentPages();

		if (CurrentPages.length > 1) {
			wx.navigateBack({
			changed: true
			}); //返回上一页
		} else {
			wx.switchTab({
			url: '../../hall/hall'
			});
		}
	},
	
    onTapTag2: function (e) {
		var that = this;
		var tab = e.currentTarget.id;
		var index = e.currentTarget.dataset.index;
		that.activeIndex2 = index
		that.tab2 = tab
		that.page = 1
	},
	
	expressTapTag: function () {
		var that = this;
		var shop_type = that.shop_type;
		var order_no = that.order_no;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		//var deliveryflag = that.deliveryflag;
		console.log('物流详情:' + order_no + ' ' + username + ' ' + token+' order shape:'+that.order_shape);
		//if (deliveryflag == 1) return; //从服务器获取订单物流信息
		uni.request({
			url: weburl + '/api/client/query_delivery_info',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				order_no: order_no,
				shop_type: shop_type
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {							
				if (!res.data.result) {
					uni.showToast({
					title: '暂无物流信息',
					icon: 'loading',
					duration: 1500
					});
				} else {
					if (res.data.result['status_list'].length < 2) {
						uni.showToast({
							title: '暂无轨迹信息',
							icon: 'loading',
							duration: 1500
						})
					}

					let deliveryinfo = res.data.result;
					let status_list = deliveryinfo['status_list'];
					//console.log('order orderdetail expressTapTag: '+JSON.stringify(status_list));		
					let delivery_trace_info = [];
					if (status_list) {
						let index = status_list.length - 1;
						for (let i = 0; i < status_list.length; i++) {
							let trace_info = {
								title: status_list[i]['AcceptTime'],
								desc: status_list[i]['AcceptStation'],
							}
							delivery_trace_info.push(trace_info);
						}	
						that.delivery_step_active = index
					}
					
					that.deliveryinfo = deliveryinfo
					delivery_info_list = delivery_trace_info
					that.delivery_trace = delivery_info_list
					
					console.log('order orderdetail expressTapTag delivery_info_list: '+JSON.stringify(that.delivery_trace));
					//that.deliveryflag = 1 
					that.pageScrollToBottom();
				}
			}
		})
    },
	
    reloadData: function () {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : '0';
		var status = that.status;
		var shop_type = that.shop_type;
		var order_no = that.order_no;
		var order_id = that.order_id; //从服务器获取订单列表

		console.log('orderdetail reloadData() 从服务器获取订单 order_no: ', order_no);

		if (order_no) {
			wx.request({
			url: weburl + '/api/client/query_order',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				status: status,
				shop_type: shop_type,
				order_no: order_no,
				order_id: order_id
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
						title: '暂无',
						icon: 'loading',
						duration: 1500
					});
					setTimeout(function () {
						wx.navigateBack();
					}, 500);
				} else {
              // 存储地址字段
					for (var i = 0; i < orderObjects.length; i++) {
						if (orderObjects[i]['logo'].indexOf("http") < 0) {
							orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo'];
						}

						for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
							if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
								orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
							}

							if (orderObjects[i]['order_sku'][j]['sku_value']) {
								for (var k = 0; k < orderObjects[i]['order_sku'][j]['sku_value'].length; k++) {
								//orderObjects[i]['order_sku'][j]['sku_value'][k]['value'] = weburl + orderObjects[i]['order_sku'][j]['sku_value'][k]['value']
								}
							}
						}
					}

					//console.log('orderdetail reloadData() orderObjects:', orderObjects);
					var status = orderObjects[0]['status'];
					var gift_status = orderObjects[0]['gift_status'];
					var order_id = orderObjects[0]['id'];
					var order_no = orderObjects[0]['order_no'];
					var sendtime = orderObjects[0]['paytime'];
					var rcvtime = orderObjects[0]['rcvtime'];
					var orderprice = orderObjects[0]['order_price'];
					var orderaddress = orderObjects[0]['address'];
					var fullname = orderObjects[0]['full_name'];
					var from_nickname = orderObjects[0]['from_nickname'];
					var from_headimg = orderObjects[0]['from_headimg'];
					var tel = orderObjects[0]['tel'];
					var deliverycode = orderObjects[0]['deliverycode'];
					var deliveryname = orderObjects[0]['deliveryname'];
					var deliverystepinfo = orderObjects[0]['deliverystepinfo'];
					var order_status = orderObjects[0]['status'];
					var buy_num = orderObjects[0]['buy_num'];
					var sku_num = orderObjects[0]['order_sku'][0]['sku_num'];
					var giftflag = orderObjects[0]['m_id'] == m_id ? 0 : 1;
					var send_rcv = giftflag == 0 ? 'send' : 'receive';
					var order_shape = orderObjects[0]['shape'] ? orderObjects[0]['shape'] : 1;
					that.orders = orderObjects
					that.buy_num = buy_num
					that.sku_num = sku_num
					that.order_id = order_id ? order_id : 0
					that.status = status
					that.giftflag = giftflag ? giftflag : 0
					that.gift_status = gift_status
					that.send_rcv = send_rcv
					that.order_status = status
					that.order_no = order_no
					that.sendtime = sendtime
					that.rcvtime = rcvtime
					that.orderprice = orderprice
					that.orderaddress = orderaddress
					that.tel =  tel
					that.order_shape = order_shape
					that.fullname = fullname
					that.from_nickname = from_nickname
					that.from_headimg = from_headimg
					that.deliverycode = deliverycode ? deliverycode : ''
					that.deliveryname = deliveryname ? deliveryname : ''
					that.deliverystepinfo = deliverystepinfo ? deliverystepinfo : ''
				}
			}
			})
		} else {
			uni.showToast({
				title: '订单不存在',
				icon: 'loading',
				duration: 1500
			});
			setTimeout(function () {
				uni.navigateBack();
			}, 1500);
		}
    },
	
	pay: function (e) {
		var objectId = e.currentTarget.dataset.objectId;
		var totalFee = e.currentTarget.dataset.totalFee;
		var received = e.currentTarget.dataset.received ? e.currentTarget.dataset.received : 0;
		console.log('orderdetail pay() order_no:', objectId, 'received:', received); //console.log(objectId);

		uni.navigateTo({
			url: '../payment/payment?orderNo=' + objectId + '&totalFee=' + totalFee + '&received=' + received
		})
	},
	
    receive: function (e) {
		var that = this;
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
		uni.showModal({
			title: '请确认',
			content: '确认要收货吗',
			success: function (res) {
				if (res.confirm) {
					var objectId = e.currentTarget.dataset.objectId;
					uni.request({
						url: weburl + '/api/client/order_confirm',
						method: 'POST',
						data: {
							username: username,
							access_token: token,
							id: objectId
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': 'application/json'
						},
						success: function (res) {
						//console.log(res.data.result);
						//console.log(res.data.info);
							if (!res.data.info) {
								wx.showToast({
									title: '确认收货完成',
									icon: 'success',
									duration: 1000
								})
							} else {
								wx.showToast({
									title: res.data.info,
									icon: 'loading',
									duration: 1500
								})
							}
						}
					})
				}
			}
		})
    },
	
	showGoods: function (e) {
		var that = this;
		var skuId = e.currentTarget.dataset.skuId;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var goods_id = e.currentTarget.dataset.goodsId;
		var goods_name = e.currentTarget.dataset.goodsName;
		var goods_shape = e.currentTarget.dataset.goodsShape;
		var order_no = that.order_no;
		var order_id = that.order_id;
		var order_shape = e.currentTarget.dataset.orderShape;
		var card_type = that.card_type;
		var receive = that.send_rcv;
		console.log('orderdetail showGoods() 查看详情 order_no: ', order_no, ' order_id:', order_id, ' order_shape:', order_shape, ' receive:', receive);

		if (order_shape == 5 || order_shape == 4) {
			uni.navigateTo({
				url: '/pages/order/receive/receive?order_no=' + order_no + '&order_id=' + order_id + '&order_shape=' + order_shape + '&card_type=' + card_type + '&receive=' + receive
			})
		} else {
			uni.navigateTo({
				url: '../../details/details?sku_id=' + skuId + '&goods_name=' + goods_name + '&id=' + goods_id + '&token=' + token + '&username=' + username
			})
		}
	},
	
    showinteracton: function (e) {
      var that = this;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
	  var order_id = e.currentTarget.dataset.orderId;
      var order_shape = e.currentTarget.dataset.orderShape;
      var receive = that.send_rcv;

      if (order_shape == 4 || order_shape == 5) {
        uni.navigateTo({
          url: '/pages/order/list/list?order_id=' + order_id + '&order_shape=' + order_shape + '&receive=' + receive
        });
      }
    },
	navigateToCustomerService: function () {
		var that = this
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var webview_url ='http://wpa.qq.com/msgrd?v=3&uin=198895160&site=qq&menu=yes' ;
		var order_no = this.order_no;
		var order_id = this.order_id;
		var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		
		uni.request({
			url: weburl + '/api/client/query_webview_url',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				shop_type: shop_type,
				order_no: order_no,
				order_id: order_id,
				webview_type: '1' , //1:customerservice
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				console.log('web view url：', res.data.result);
				if (res.data.status=='y') {
					var webview_info = res.data.result ;
					webview_url = webview_info.url ;
					
					plus.runtime.openURL(webview_url,function (res) {  
						plus.nativeUI.alert("本机没有安装QQ，无法启动");  
					});
					
				} else {
					wx.showToast({
						title: '暂时没有WEBVIEW URL',
						icon: 'none',
						duration: 1500
					})
				}
			}
		})
		
		//发通知消息
		var title = '订单咨询' ;
		var content = {
			message_type: '20',  //MQTT 客服咨询消息
			message: '订单ID:'+order_id+' 发起咨询【请及时回复】',
			order_no:order_no,
			order_id:order_id,
		}
		var mqtt_pub_content = {
			d:{
				title:'订单咨询',
				content:JSON.stringify(content),
				from_headimg:userInfo.avatarUrl,
				from_nickname:userInfo.nickname,
				from_username:username
			}
		}
		uni.request({
			url: weburl + '/api/mqttservice/publish',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				shop_type: shop_type,
				title: title,
				from_headimg: userInfo.avatarUrl?userInfo.avatarUrl:'',
				from_nickname: userInfo.nickname?userInfo.nickname:'',
				content: JSON.stringify(mqtt_pub_content),
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				//console.log('web view url：', res.data.result)
			}
		})		 
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
			})
		});
	}
}
};
</script>
<style>
@import "./orderdetail.css";
</style>