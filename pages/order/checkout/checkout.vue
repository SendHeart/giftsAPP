<template>
<view>
<scroll-view scroll-y  class="container carts-list" :style="(modalHiddenCoupon?'position:fixed;':'') +'height:'+dkheight+'px;'">
  <!-- 地址 -->
	<navigator v-if="is_buymyself==1 && order_shape!=8 && order_shape!=7" url="/pages/address/list/list" class="address-section">
  	<view class="address-content">
  		<image style="width:60rpx;height:60rpx;margin-left:20rpx" src="/static/images/icon_address.png"></image>
  		<view class="cen">
  			<view>
  				<text class="name">{{addressData.full_name}}</text>
  				<text class="mobile">{{addressData.tel}}</text>
  			</view>
  			<text class="address">{{addressData.prov_str}}{{addressData.city_str}}{{addressData.area_str}}{{addressData.town_str}}{{addressData.address}}</text>
  		</view>
  		<image style="width:15rpx;height:30rpx;margin-right:20rpx;" src="/static/images/right-arrow.png"></image>
  	</view>
	</navigator>
	<view class="carts-container" v-for="(item, index) in carts" :key="index" :data-object-id="item.id" :data-goods-id="item.goods_id" :data-goods-name="item.name" :data-goods-info="item.act_info" :data-goods-price="item.sell_price" :data-sale="item.sale" :data-image="(item.activity_image?item.activity_image:item.image)" @tap="showGoods">
    <view class="carts-item" :data-index="index">
      <!-- 缩略图 -->
      <image class="carts-image" :src="(item.activity_image?item.activity_image:item.image)" mode="aspectFill"></image>
      <!-- 商品标题 -->
      <view class="carts-text">
        <text class="carts-title">{{item.name}}</text>
        <view class="carts-sku">
			<view v-if="order_shape!=5 && order_shape!=4" v-for="(sku_value, index2) in item['value']" :key="index2">
				<text>{{sku_value?sku_value['name']+':':''}}{{sku_value['type']==2?sku_value['note']+' ':sku_value['value']+' '}}
              </text>
			</view>
			<view v-if="order_shape==7 || order_shape==8">
		              <text>{{item.act_info}}</text>
			</view>
			<view v-if="order_shape==4 && card_name_info">
				<text>{{card_name_info.card_name_name?'姓名:'+card_name_info.card_name_name:''}}{{card_name_info.card_name_title?'('+card_name_info.card_name_title+')':''}}{{card_name_info.card_name_phone?' 手机: '+card_name_info.card_name_phone:''}}</text>
				<text>{{card_name_info.card_name_email?'电子邮箱: '+card_name_info.card_name_email:''}}</text>
            <!-- 
             <text hidden="{{!card_name_info.card_name_tel}}">{{card_name_info.card_name_tel?'公司电话: '+card_name_info.card_name_tel:''}}</text>
            <text>{{card_name_info.card_name_website?'网址: '+card_name_info.card_name_website:''}}
            </text>
            -->
				<text>{{card_name_info.card_name_addr?'地址: '+card_name_info.card_name_addr:''}}</text>
			</view>
			<view v-if="order_shape==4 && card_register_info">
				<text>{{card_register_info.card_register_title?'名称:'+card_register_info.card_register_title:''}} </text>
				<text>{{card_register_info.card_register_ownername?'发起人: '+card_register_info.card_register_ownername:''}}</text>
			</view>
			<view v-if="order_shape==5 && card_cele_info">
				<text>{{card_cele_info.card_cele_title?card_cele_info.card_cele_title:''}} </text>
			</view>
			<view v-if="order_shape==4 && card_love_info">
				<text>{{card_love_info.card_love_title?card_love_info.card_love_title:''}}</text>
				<text>{{card_love_info.card_love_related?'联系人:'+card_love_info.card_love_related:''}}{{card_love_info.card_love_phone?' 手机:'+card_love_info.card_love_phone:''}}</text>
			</view>
		</view>
		<view v-if="order_shape!=4 && order_shape!=5" class="carts-subtitle">
			<view class="carts-price">
				<view>{{item.sell_price>0?'￥'+item.sell_price:''}} {{item.num>0?'x'+item.num+' ':''}}</view>
			</view>
		</view>
	</view>
	</view>
  </view>
  <view class="order-item">
	<!-- 份数，不是件数，用于群发礼物订单
  <view v-if="order_shape!=5" class="order-num">
    <text>份数:</text> 
    <input type="number" @input="order_numFun" :value="order_num"></input>
  </view>
  -->
  <view class="cell" style>
    <view style="width:18%">商品金额:</view>
    <view class="amount" style="width:32%">{{(payamount)}}
    <text v-if="delivery_price>0"> {{(delivery_price>0?'+'+delivery_price:'')}}(运费)</text>
    </view>
    <view style="width:18%">优惠金额:</view>
    <view class="amount" style="width:30%;">{{discountpay>0?'-'+discountpay:'0'}}</view>
  </view>
  <view class="carts-more" :hidden="showmorehidden">
	<!--
    <view class="select-and-amount" @tap="bindSelectRedAll">
      <uni-icons style="margin:10rpx;" :type="(selectedRedAllStatus ? 'checkbox-filled' : 'circle')" size="18" color="#e34c55"></uni-icons>
      <text style="margin-left:10rpx;">使用红包</text>
    </view>
	-->
    <view class="select-and-amount" @tap="bindSelectAll">
      <uni-icons style="margin:10rpx;" :type="(selectedAllStatus ? 'checkbox-filled' : 'circle')" size="18" color="#e34c55"></uni-icons>
      <text style="margin-left:10rpx;">使用优惠券</text>
    </view>
  </view>
  <view class="confirmbtn">
  <form @submit="formSubmit" data-name="confirmOrder" report-submit="true">
    <button class="submit" style="width:96%;" type="warn" formType="submit">确认订单</button>
  </form>
  </view>
  </view>
</scroll-view>

<view :hidden="modalHiddenCoupon" style="width:100%;">
  <view class="counpons" title="请选择" confirm-text="确定" cancel-text="取消" @confirm="modalBindaconfirmCoupon" @cancel="modalBindcancelCoupon" no-cancel>
    <view class="counpon-item-banner" :style="'height:' + dkheight-34 + 'px'">
      <view v-for="(mapping, index) in coupons_list" :key="index" class="gifts-item">
        <view @tap="bindSelectCoupon" class="coupons-list" :data-couponindex="index" :data-couponid="mapping.id" :data-starttime="mapping.start_time" :data-endtime="mapping.end_time" :data-couponname="mapping.name" :data-couponcontent="mapping.content" :data-couponamount="mapping.amount" :data-couponfooter="mapping.footer" :data-coupontype="mapping.type" :data-couponimage="mapping.image">
          <view class="select-and-amount-mark">
            <uni-icons :type="(mapping.selected ? 'checkbox-filled' : 'circle')" size="18" color="rgb(255,255,255)"></uni-icons>
            <!-- 
		    <text style="margin-left:10rpx;">选中</text>
        -->
          </view>
          <view :style="'background-image:url('+mapping.image +');background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%; text-align: center;align-items: center;'" class="counpons-item">
            <!-- 
        <image class="gifts-image" src="{{mapping.image}}" mode="aspectFit"> </image>
        -->
            <text class="coupon-name">{{mapping.name}} </text>
            <text class="coupon-content">{{mapping.content}}</text>
            <text v-if="couponType==2" class="coupon-content">{{mapping.amount>0?'现金￥'+mapping.amount+'元':'' }}</text>
            <text class="coupon-footer">{{mapping.footer}}</text>
            <text class="coupon-dueday">{{mapping.start_time?'(有效期:'+mapping.start_time+'至':''}}{{mapping.end_time?mapping.end_time+')':''}}</text>
            <!--<text class="coupon-dueday">{{mapping.id?'序号:'+mapping.id:''}}</text>-->
          </view>
        </view>
      </view>
      <form @submit="formSubmit" data-name="getMoreOrders" report-submit="true">
      <button v-if="page_num>1" type="default" size="default" hover-class="none" class="morebtn" style="width:200rpx;" formType="submit">更多</button>
      </form>
    </view>
  </view>
</view>


</view>
</template>

<script>
var util = require("../../../utils/util.js");
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var member_group_id = wx.getStorageSync('member_group_id') ? wx.getStorageSync('member_group_id') : 0
var member_group_name = wx.getStorageSync('member_group_name') ? wx.getStorageSync('member_group_name') : 0 
export default {
  data() {
    return {
		title_name: '送出礼品',
		title_logo: '/static/images/footer-icon-05.png',
		amount: 0,
		carts: [],
		cartIds: null,
		addressList: [],
		addressData:[],
		addressIndex: 0,
		address_id: 0,
		username: null,
		token: null,
		page: 1,
		pagesize: 5,
		page_num: 0,
		page_red: 1,
		page_red_num: 0,
		all_rows: 0,
		all_red_rows: 0,
		shop_type: shop_type,
		showmorehidden: false,
		modalHiddenCoupon: true,
		couponType: 1,
		selectedAllStatus: false,
		selectedRedAllStatus: false,
		discountpay: 0,
      //折扣差额
		payamount: 0,
      //实际支付金额
		order_num: 1 ,//订单份数
		dkheight: "",
		delivery_price: "",
		order_type: "",
		order_note: "",
		order_image: "",
		is_buymyself: "",
		order_shape: "",
		order_voice: "",
		order_voicetime: "",
		order_color: "",
		card_register_info: "",
		card_name_info: "",
		card_cele_info: "",
		card_love_info: "",
		card_template: "",
		coupons_list: "",
		selected_coupon_id: "",
		selected_coupon_name: "",
		selected_coupon_content: "",
		selected_coupon_footer: "",
		selected_coupon_starttime: "",
		selected_coupon_endtime: "",
		selected_coupon_type: "",
		selected_coupon_amount: "",
		selected_coupon_index: "",
		selected_couponimage: "",
		coupons_quan_list: "",
		selected_coupon_quan_index: "",
		selected_coupon_quan_amount: "",
		coupons_red_list: "",
		selected_coupon_red_index: "",
		selected_coupon_red_amount: "",
		member_group_name:member_group_name,
		member_group_id:member_group_id,
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
	/*
	
	*/
   wx.showToast({
     title: '加载中',
     icon: 'loading',
     duration: 1000
   });
	that.readCarts(options)
    wx.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight;
        console.log(winHeight);
        that.setData({
          dkheight: winHeight - winHeight * 0.05 - 20
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '/static/images/back.png'
      });
    } 
	that.loadAddress()

  },
  methods: {
    formSubmit: function (e) {
      var that = this;
      var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name;
      //console.log('formSubmit() formID：', formId, ' form name:', form_name);

      if (form_name == 'confirmOrder') {
        that.confirmOrder();
      } else if (form_name == 'getMoreOrders') {
        that.getMoreOrdersTapTag();
      }

      if (formId) that.submintFromId(formId);
    },
    //提交formId，让服务器保存到数据库里
    submintFromId: function (formId) {
      var that = this;
      var formId = formId;
      var shop_type = that.shop_type;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
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
    showGoods: function (e) {
      var skuId = e.currentTarget.dataset.skuId;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var goods_id = e.currentTarget.dataset.goodsId;
      var goods_name = e.currentTarget.dataset.goodsName;
      var goods_price = e.currentTarget.dataset.goodsPrice;
      var goods_sale = e.currentTarget.dataset.goodsSale;
      var goods_info = e.currentTarget.dataset.goodsInfo;
      var goods_image = e.currentTarget.dataset.image;
      wx.navigateTo({
        url: '../../details/details?sku_id=' + skuId + '&goods_name=' + goods_name + '&id=' + goods_id + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&goods_info=' + '&image=' + goods_image + '&token=' + token + '&username=' + username
      });
    },
    order_numFun: function (e) {
      var that = this;
      var order_num = parseInt(e.detail.value ? e.detail.value : 0);
      var amount = that.amount;
      var discountpay = that.discountpay ? that.discountpay : 0;
      var payamount = (amount * order_num - discountpay).toFixed(2);
      console.log('order_num amount:', amount, ' discountpay:', discountpay, ' order_num:', order_num, ' payamount:', payamount);
      that.setData({
        order_num: order_num,
        payamount: payamount
      });
    },
    goBack: function () {
      var pages=getCurrentPages(), prevPage=null;
         if(pages.length>1){
             prevPage=pages[pages.length-2];
         }
         if(prevPage){
             // #ifdef H5
      			prevPage.customerSource=that.source[that.curIndex];
      		// #endif
      		// #ifdef APP-PLUS || MP-WEIXIN
      			prevPage.setData({
      				customerSource : that.source[that.curIndex]
      			})
      		// #endif
         }
         uni.navigateBack();
    },
    readCarts: function (options) {
      var that = this;
      console.log('order checkout from hall  readCarts options:', options);
      var amount = parseFloat(options.amount); //var delivery_price = parseFloat(options.delivery_price)
      var payamount = that.payamount;
      var discountpay = that.discountpay;
	 
      var carts = JSON.parse(options.carts);
      var cartIds = options.cartIds;
	 
      var delivery_price = parseFloat(carts[0].delivery_price);
      var cartIdArray = cartIds.split(',');
      var order_type = options.order_type ? options.order_type : '';
      var order_note = options.order_note ? options.order_note : '';
      var order_image = options.order_image ? options.order_image : '';
      var order_shape = options.order_shape ? options.order_shape : 0; //5贺卡请柬

      var order_voice = options.order_voice ? options.order_voice : '';
      var order_voicetime = options.order_voicetime ? options.order_voicetime : 0; //5贺卡请柬

      var order_color = options.order_color ? options.order_color : '#333'; //5贺卡请柬文字颜色

      var is_buymyself = options.is_buymyself ? options.is_buymyself : 0; //自购

      var card_register_info = options.card_register_info ? JSON.parse(options.card_register_info) : ''; //

      var card_name_info = options.card_name_info ? JSON.parse(options.card_name_info) : ''; //

      var card_cele_info = options.card_cele_info ? JSON.parse(options.card_cele_info) : ''; //

      var card_love_info = options.card_love_info ? JSON.parse(options.card_love_info) : ''; //

      var card_template = options.card_template ? JSON.parse(options.card_template) : ''; //
      payamount = (amount - discountpay).toFixed(2);
	 /*
	 wx.showToast({
	   title: '加载中 carts:'+carts[0]['sell_price']+' payamount:'+payamount,
	   icon: 'loading',
	   duration: 1000
	 });
	 */
      this.setData({
        amount: amount,
        payamount: payamount,
        delivery_price: delivery_price,
        carts: carts,
        cartIds: cartIdArray,
        order_type: order_type,
        order_note: order_note,
        order_image: order_image,
        username: options.username,
        token: options.token,
        is_buymyself: is_buymyself,
        order_shape: order_shape,
        order_voice: order_voice,
        order_voicetime: order_voicetime,
        order_color: order_color,
        card_register_info: card_register_info,
        card_name_info: card_name_info,
        card_cele_info: card_cele_info,
        card_love_info: card_love_info,
        card_template: card_template
      });
	 
      console.log('checkouts readCarts() order_image:', order_image, 'order_shape:', order_shape, 'card_template:', card_template, ' card_name_info:', card_name_info, ' card_register_info:', card_register_info, ' card_love_info:', card_love_info);
	},
	
    confirmOrder: function () {
      var that = this;
      var order_num = that.order_num;

      if (order_num == 0) {
        wx.showToast({
          title: '请输入份数',
          icon: 'loading',
          duration: 2000
        });
        return;
      }

      var is_buymyself = that.is_buymyself; //自购
	  var address_id = that.address_id? that.address_id:0;
      var carts = that.carts;
      var cartIds = that.cartIds;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var selectedAllStatus = that.selectedAllStatus;
      var selectedRedAllStatus = that.selectedRedAllStatus;
      var selected_coupon_quan_index = that.selected_coupon_quan_index ? that.selected_coupon_quan_index : 0;
      var selected_coupon_red_index = that.selected_coupon_red_index ? that.selected_coupon_red_index : 0;
      //console.log('confirmOrder selected_coupon_quan_index:', that.selected_coupon_quan_index, 'selected_coupon_red_index:', that.selected_coupon_red_index, ' coupons_red_list:', that.coupons_red_list);
      var selected_coupon_amount = selectedAllStatus ? that.coupons_quan_list[selected_coupon_quan_index]['amount'] : 0;
      var selected_coupon_id = selectedAllStatus ? that.coupons_quan_list[selected_coupon_quan_index]['id'] : 0;
      var selected_coupon_type = selectedAllStatus ? that.coupons_quan_list[selected_coupon_quan_index]['type'] : 1;
      var selected_coupon_red_amount = selectedRedAllStatus ? that.coupons_red_list[selected_coupon_red_index]['amount'] : 0;
      var selected_coupon_red_id = selectedRedAllStatus ? that.coupons_red_list[selected_coupon_red_index]['id'] : 0;
      var selected_coupon_red_type = selectedRedAllStatus ? that.coupons_red_list[selected_coupon_red_index]['type'] : 1;
      var status = 0;
      var shop_type = that.shop_type;
      var amount = that.amount;
      var order_type = is_buymyself==1?'app':'gift';
      var order_image = that.order_image;
      var order_note = that.order_note;
      var order_shape = that.order_shape;
      var order_voice = that.order_voice;
      var order_voicetime = that.order_voicetime;
      var order_color = that.order_color;
      var order_num = that.order_num;
      var card_register_info = JSON.stringify(that.card_register_info);
      var card_name_info = JSON.stringify(that.card_name_info);
      var card_cele_info = JSON.stringify(that.card_cele_info);
      var card_love_info = JSON.stringify(that.card_love_info);
      var card_template = JSON.stringify(that.card_template);
      if (!order_note) order_note = '好货分享，愿你喜欢!'; //默认祝福

      //console.log('order_image:'+order_image+ ' order_shape:'+ order_shape + ' card_template:'+ card_template + ' card_cele_info:' + card_cele_info);
      wx.request({
        url: weburl + '/api/client/add_order',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          sku_id: cartIds,
          buy_type: 'cart',
          order_type: order_type,
          note: order_note,
          order_image: order_image,
          order_shape: order_shape,
          order_voice: order_voice,
          order_voicetime: order_voicetime,
          order_color: order_color,
          card_register_info: card_register_info,
          card_name_info: card_name_info,
          card_cele_info: card_cele_info,
          card_love_info: card_love_info,
          card_template: card_template,
          coupon_id: selectedAllStatus ? selected_coupon_id : 0,
          coupon_type: selectedAllStatus ? selected_coupon_type : 0,
          coupon_amount: selectedAllStatus ? selected_coupon_amount : 0,
          coupon_red_id: selectedRedAllStatus ? selected_coupon_red_id : 0,
          coupon_red_type: selectedRedAllStatus ? selected_coupon_red_type : 0,
          coupon_red_amount: selectedRedAllStatus ? selected_coupon_red_amount : 0,
          order_num: order_num ? order_num : 1,
          is_buymyself: is_buymyself ? is_buymyself : 0 ,//1自购礼品
		  address_id:address_id,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('提交订单:', res.data.result);
          var order_data = res.data.result;

          if (!res.data.info) {
            /*wx.showToast({
              title: '订单提交完成',
              icon: 'success',
              duration: 1500
            })
            */
            if (order_data['order_pay'] == 0 || is_buymyself == 0) {
              that.delete_cart();
              that.zero_pay(order_data['order_no']); //0支付直接送出
            } else {
              wx.navigateTo({
                url: '../../order/payment/payment?orderNo=' + order_data['order_no'] + '&totalFee=' + order_data['order_pay'] + '&is_buymyself=' + is_buymyself
              });
            }
          } else {
            wx.showToast({
              title: res.data.info,
              icon: 'none',
              duration: 2000
            });
          }
        }
      });
    },
    delete_cart: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var sku_id = that.cartIds;
      var shop_type = that.shop_type;
      console.log('payment delete_cart sku_id:', sku_id); // 购物车单个删除

      wx.request({
        url: weburl + '/api/client/delete_cart',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          sku_id: sku_id,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('payment delete_cart:', res.data.result);
        }
      });
    },
    zero_pay: function (order_no = '') {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var is_buymyself = that.is_buymyself; //再次确认订单状态

      wx.request({
        url: weburl + '/api/client/query_order',
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
          console.log('order checkout zero_pay() 0支付订单查询:', res.data);
          var orderObjects = res.data.result;

          if (!orderObjects) {
            console.log('order checkout zero_pay() 没有该订单 orderObjects:', orderObjects);
            wx.showToast({
              title: '没有该订单',
              icon: 'none',
              duration: 1500
            });
            setTimeout(function () {
              wx.navigateBack();
            }, 1500);
            return;
          } else {
            if (orderObjects[0]['gift_status'] > 0) {
              console.log('order checkout zero_pay() 该订单已送出 orderObjects:', orderObjects);
              wx.showToast({
                title: '该订单已送出',
                icon: 'none',
                duration: 1500
              });
              setTimeout(function () {
                wx.navigateBack();
              }, 1500);
              return;
            } else {
              wx.navigateTo({
                url: '../send/send?order_no=' + order_no + '&orders=' + JSON.stringify(orderObjects) + '&is_buymyself=' + is_buymyself
              });
            }
          }
        }
      });
    },
    loadAddress: function () {
      var that = this;
      var addressList = [];
	  var shop_type = that.shop_type ;
      var addressObjects = null;
      var address = [];
	  var address_id = that.address_id?that.address_id:0
	  var addressIndex = that.addressIndex? that.addressIndex:0;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	  var addressData = that.addressData
	  var is_buymyself = that.is_buymyself ? that.is_buymyself : 0; //自购
	  
      uni.request({
        url: weburl + '/api/client/get_member_address',
        method: 'POST',
        data: {
          username: username,
          token: token,
		  shop_type:shop_type,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          //console.log('address list:',res.data.result);
          address =  res.data.result? res.data.result:address;
			if(address==0){
				wx.navigateTo({
				  url: '/pages/address/list/list?is_buymyself=' +is_buymyself
				})
				return;
			}
          for (var i = 0; i < address.length; i++) {
            // find the default address
            if (address[i]['isDefault'] == 1) {
              that.setData({
                addressIndex: i
              });
            }
            addressList[i] = address[i]; //console.log(addressList[i]);
          }
		  that.addressList = addressList
          that.addressObjects = address;
		  that.addressData = address[addressIndex] ;
		  that.address_id = address[addressIndex]?address[addressIndex]['id']:address_id ;
		  console.log('address list:',address,'addressIndex:',addressIndex,' addressData:',address[addressIndex] );
        }
      });
    },
    bindSelectRedAll: function () {
      var that = this; // 环境中目前已选状态

      var selectedRedAllStatus = that.selectedRedAllStatus;
      var modalHiddenCoupon = that.modalHiddenCoupon;
      var page_red_num = that.page_red_num; // 取反操作

      selectedRedAllStatus = !selectedRedAllStatus;
      modalHiddenCoupon = !modalHiddenCoupon
	  that.selectedRedAllStatus = selectedRedAllStatus
	  that.modalHiddenCoupon = modalHiddenCoupon
	  that.couponType = 2
      
      console.log('bindSelectRedAll :', selectedRedAllStatus, 'page_red_num:', page_red_num);

      if (selectedRedAllStatus && page_red_num == 0) {
        that.query_coupon();
      } else {
        that.coupons_list = that.coupons_red_list
      }
    },
    bindSelectAll: function () {
      var that = this; // 环境中目前已选状态

      var selectedAllStatus = that.selectedAllStatus;
      var modalHiddenCoupon = that.modalHiddenCoupon;
      var page_num = that.page_num; // 取反操作

      selectedAllStatus = !selectedAllStatus;
      modalHiddenCoupon = !modalHiddenCoupon;
      that.setData({
        selectedAllStatus: selectedAllStatus,
        modalHiddenCoupon: modalHiddenCoupon,
        couponType: 1 //优惠券

      });
      console.log('selectedAllStatus :', selectedAllStatus, 'page_num:', page_num);

      if (selectedAllStatus && page_num == 0) {
        that.query_coupon();
      } else {
        that.setData({
          coupons_list: that.coupons_quan_list
        });
      }
    },
    bindSelectCoupon: function (e) {
      var that = this;
      var coupon_type = that.couponType;
      var selected_coupon_index = e.currentTarget.dataset.couponindex ? e.currentTarget.dataset.couponindex : 0;
      var selected_coupon_id = e.currentTarget.dataset.couponid ? e.currentTarget.dataset.couponid : 0;
      var selected_coupon_name = e.currentTarget.dataset.couponname ? e.currentTarget.dataset.couponname : '';
      var selected_coupon_content = e.currentTarget.dataset.couponcontent ? e.currentTarget.dataset.couponcontent : '';
      var selected_coupon_footer = e.currentTarget.dataset.couponfooter ? e.currentTarget.dataset.couponfooter : '';
      var selected_coupon_starttime = e.currentTarget.dataset.starttime;
      var selected_coupon_endtime = e.currentTarget.dataset.endtime;
      var selected_coupon_type = e.currentTarget.dataset.coupontype ? e.currentTarget.dataset.coupontype : 1;
      var selected_coupon_amount = e.currentTarget.dataset.couponamount ? e.currentTarget.dataset.couponamount : 0;
      var selected_couponimage = e.currentTarget.dataset.couponimage;

      if (coupon_type == 1) {
        var coupons_list = that.coupons_quan_list;
      } else if (coupon_type == 2) {
        var coupons_list = that.coupons_red_list;
      }

      for (var i = 0; i < coupons_list.length; i++) {
        if (i == selected_coupon_index) {
          coupons_list[selected_coupon_index]['selected'] = !coupons_list[selected_coupon_index]['selected'];
        } else {
          coupons_list[i]['selected'] = false;
        }
      }

      that.setData({
        selected_coupon_id: selected_coupon_id,
        selected_coupon_name: selected_coupon_name,
        selected_coupon_content: selected_coupon_content,
        selected_coupon_footer: selected_coupon_footer,
        selected_coupon_starttime: selected_coupon_starttime,
        selected_coupon_endtime: selected_coupon_endtime,
        selected_coupon_type: selected_coupon_type,
        selected_coupon_amount: selected_coupon_amount,
        selected_coupon_index: selected_coupon_index,
        selected_couponimage: selected_couponimage,
        coupons_list: coupons_list
      });

      if (coupon_type == 1) {
        that.setData({
          coupons_quan_list: coupons_list,
          selected_coupon_quan_index: selected_coupon_index,
          selected_coupon_quan_amount: selected_coupon_amount
        });
      } else if (coupon_type == 2) {
        that.setData({
          coupons_red_list: coupons_list,
          selected_coupon_red_index: selected_coupon_index,
          selected_coupon_red_amount: selected_coupon_amount
        });
      }

      console.log('bindSelectCoupon coupon_type:', coupon_type, ' index:', that.selected_coupon_quan_index, ' red index:', that.selected_coupon_red_index);
    },
    getMoreOrdersTapTag: function (e) {
      var that = this;
      var coupon_type = that.coupon_type ? that.coupon_type : 1;
      var page = coupon_type == 1 ? that.page + 1 : that.page;
      var page_red = coupon_type == 2 ? that.page_red + 1 : that.page_red;
      var pagesize = that.pagesize;
      var all_rows = that.all_rows;

      if (page > that.page_num && coupon_type == 1) {
        wx.showToast({
          title: '没有更多了~',
          icon: 'none',
          duration: 1500
        });
        return;
      } else if (page_red > that.page_red_num && coupon_type == 2) {
        wx.showToast({
          title: '没有更多了~',
          icon: 'none',
          duration: 1500
        });
        return;
      }

      that.setData({
        page: page,
        page_red: page_red
      });
      that.query_coupon();
    },
    query_coupon: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var page = that.page;
      var page_red = that.page_red;
      var pagesize = that.pagesize;
      var all_rows = that.all_rows;
      var page_num = that.page_num;
      var page_red_num = that.page_red_num;
      var shop_type = that.shop_type;
      var coupons_status = 'avaliable';
      var coupons_type = that.couponType;
      console.log('query_coupon coupons_type:', coupons_type);
      /*
      if (page > that.data.page_num) {
        return
      }
      */
		that.coupons_list = {}
      wx.request({
        url: weburl + '/api/client/query_coupon',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          page: page,
          pagesize: pagesize,
          shop_type: shop_type,
          coupons_status: coupons_status,
          quan_type: coupons_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('查询优惠券:', res.data.result);
          var coupons_list = res.data.result;
          var all_rows = res.data.all_rows;

          if (!res.data.result) {
            wx.showToast({
              title: res.data.info ? res.data.info : '暂无优惠券~',
              icon: 'none',
              duration: 2000
            })

            if (page == 1 && coupons_type == 1) {
              that.coupons_quan_list = {}
              that.page_num = 0
			  that.selectedAllStatus = false
            } else if (page_red == 1 && coupons_type == 2) {
              that.coupons_red_list = {}
              that.page_red_num = 0
			  that.selectedRedAllStatus = false
            }
          } else {
            for (var i = 0; i < coupons_list.length; i++) {
              coupons_list[i]['start_time'] = util.getDateStr(coupons_list[i]['start_time'] * 1000, 0);
              coupons_list[i]['end_time'] = util.getDateStr(coupons_list[i]['end_time'] * 1000, 0);
              coupons_list[i]['selected'] = false;
            }

            if (page > 1 && coupons_type == 1 && coupons_list) {
				coupons_list = that.coupons_quan_list.concat(coupons_list);
            } else if (page_red > 1 && coupons_type == 2 && coupons_list) {
				coupons_list = that.coupons_red_list.concat(coupons_list);
            }

            if (coupons_type == 1) {
				page_num = all_rows / pagesize + 0.5;
				that.coupons_list = coupons_list
				that.coupons_quan_list = coupons_list
				that.page_num = page_num.toFixed(0)
				that.page_red_num = 0
            } else if (coupons_type == 2) {
				page_red_num = all_rows / pagesize + 0.5
				that.coupons_list = coupons_list
				that.coupons_red_list = coupons_list
				that.page_red_num = page_red_num.toFixed(0)
				that.page_num = 0
            }
          }
          console.log('query_coupon coupons_list:', coupons_list, 'red:', that.coupons_red_list, 'quan:', that.coupons_quan_list);
        }
      })
    },
    //优惠券使用
    coupon_pay: function (e) {
      var that = this;
      var coupon_type = that.couponType;
      var amount = that.amount;
      var order_num = that.order_num;
      var payamount = that.payamount;
      var selectedAllStatus = that.selectedAllStatus;
      var selectedRedAllStatus = that.selectedRedAllStatus;
      var couponSelectedId = selectedAllStatus ? that.selected_coupon_id : 0;
      var couponSelectedType = selectedAllStatus ? that.selected_coupon_type : 0;
      var couponSelectedAmount = selectedAllStatus ? parseFloat(that.selected_coupon_amount) : 0;
      var couponSelectedRedId = selectedRedAllStatus ? that.selected_coupon_red_id : 0;
      var couponSelectedRedType = selectedRedAllStatus ? that.selected_coupon_red_type : 0;
      var couponSelectedRedAmount = selectedRedAllStatus ? parseFloat(that.selected_coupon_red_amount) : 0;
      var carts = that.carts;
      var discountpay = that.discountpay ? that.discountpay : 0;
      console.log('coupon_pay couponSelectedAmount:', couponSelectedAmount, 'discountpay:', discountpay);

      for (var i = 0; i < carts.length; i++) {
        if (carts[i]['discount'] < 100 && carts[i]['discount'] > 0) {
          //打折商品判断
          if (couponSelectedType == 1 && couponSelectedId) {
            //打折优惠券
            discountpay = discountpay + (100 - carts[i]['discount']) * carts[i]['sell_price'] * carts[i]['num'] / 100;
            discountpay = discountpay.toFixed(2);
          }
        }
      }

      if (coupon_type == 2) {
        //红包
        discountpay = discountpay + couponSelectedRedAmount ? couponSelectedRedAmount : 0;
        discountpay = discountpay.toFixed(2);
      }

      payamount = (amount * order_num - discountpay).toFixed(2);
      that.setData({
        discountpay: discountpay,
        payamount: payamount
      });

      if (discountpay - couponSelectedRedAmount == 0 && selectedAllStatus && coupon_type == 1) {
        that.modalBindcancelCoupon();
        wx.showToast({
          title: '该商品无法使用优惠券',
          icon: 'none',
          duration: 1000
        });
      }
    },
    bindPickerChange: function (e) {
      this.setData({
        addressIndex: e.detail.value
      });
    },
    bindCreateNew: function () {
      var addressList = this.addressList;

      if (addressList.length == 0) {
        wx.navigateTo({
          url: '../../address/add/add?username=' + this.username
        });
      }
    },
    //确定按钮点击事件  优惠券
    modalBindaconfirmCoupon: function () {
      var that = this;
      var coupon_type = that.couponType;
      var selectedAllStatus = that.selectedAllStatus;
      var selected_coupon_index = that.selected_coupon_index ? that.selected_coupon_index : 0;
      var coupon_list = that.coupons_list;
      var couponSelectedStatus = coupon_list[selected_coupon_index] ? coupon_list[selected_coupon_index]['selected'] : 0;
      that.setData({
        modalHiddenCoupon: !this.modalHiddenCoupon
      });

      if (coupon_type == 1) {
        that.setData({
          selectedAllStatus: couponSelectedStatus ? true : false
        });
      } else if (coupon_type == 2) {
        that.setData({
          selectedRedAllStatus: couponSelectedStatus ? true : false
        });
      }

      that.coupon_pay(); //计算优惠券价格
    },
    //取消按钮点击事件  优惠券
    modalBindcancelCoupon: function () {
      var that = this;
      var coupon_type = that.couponType;
      var payamount = that.payamount;
      var amount = that.amount;
      var discountpay = that.discountpay;
      that.setData({
        modalHiddenCoupon: !that.modalHiddenCoupon,
        payamount: amount
      });

      if (coupon_type == 1) {
        that.setData({
          selectedAllStatus: false
        });
      } else if (coupon_type == 2) {
        that.setData({
          selectedRedAllStatus: false
        });
      }

      that.coupon_pay(); //计算优惠券价格
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
<style >
@import "./checkout.css";
	.address-section {
		width: 95%;
		height: 60px;
		padding: 30rpx;
		background: #ffffff;
		position: relative;
		border-bottom: 1px solid #eee;
		margin-bottom: 10px;
	}
	.address-content {
		display: flex;
		flex-direction: row;
		justify-content:space-between;
		align-items: center;
	}
	
	.icon-shouhuodizhi {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90upx;
		color: #888;
		font-size: 44upx;
	}
	
	.cen {
		display: flex;
		flex-direction: column;
		font-size: 28upx;
		color: #666666;
	}
	
	.name {
		font-size: 34upx;
		margin-right: 24upx;
	}
	
	.address {
		margin-top: 16upx;
		margin-right: 20upx;
		color: $font-color-light;
	}
	
	.icon-you {
		font-size: 32upx;
		color: $font-color-light;
		margin-right: 30upx;
	}
	
	.a-bg {
		position: absolute;
		left: 0;
		bottom: 0;
		display: block;
		width: 100%;
		height: 5upx;
	}

</style>