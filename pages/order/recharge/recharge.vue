<template>
<view class="page" :style="'height:'+windowHeight">
	<view class="carts-container" v-for="(item, index) in carts" :key="index" >
		<view class="carts-info">
			<view class="carts-item">
				<image class="carts-image" :src="item.image?item.image:item.activity_image" mode="aspectFill" />
				<view class="carts-text">
					<text class="carts-title">{{item.name}}</text>
					<text class="carts-recharge-title">{{item.goods_tag}}</text>
					<view class="carts-sku">
						<view v-if="order_shape==7 || order_shape==8" v-for="(sku_value, index) in item['value']" :key="index" >
							<text>{{sku_value?sku_value['name']+':':''}}{{sku_value['type']==2?sku_value['note']+' ':sku_value['value']+' '}}</text>
						</view>
						<view v-if="order_shape==7 || order_shape==8" >
							<text>{{item.act_info}}</text>
						</view>
					</view>
					<text class="carts-recharge-note" @tap="bindRechargeNote">会籍说明</text>
				</view>
			</view>
		</view>
	</view>
	<view class="recharge-info">
		<view class="recharge-level">
			<view class="recharge-item" :class="recharge_selected == '1' ? 'recharge-item-selected' : 'recharge-item-unselected'" @tap="bindRechargeSelect" :data-recharge-amount="recharge_amount1" data-recharge-type='1' >
				<text class="recharge-item-amount">{{recharge_amount1}}</text>
				<text>{{recharge_title1}}</text>
			</view>
			<view class="recharge-item" :class="recharge_selected == '2' ? 'recharge-item-selected' : 'recharge-item-unselected'" @tap="bindRechargeSelect" :data-recharge-amount="recharge_amount2" data-recharge-type='2' >
				<text class="recharge-item-amount">{{recharge_amount2}}</text>
				<text>{{recharge_title2}}</text>
			</view>
			<view class="recharge-item"  :class=" recharge_selected == '3' ? 'recharge-item-selected' : 'recharge-item-unselected'" @tap="bindRechargeSelect" :data-recharge-amount="recharge_amount3" data-recharge-type='3' >
				<text class="recharge-item-amount">{{recharge_amount3}}</text>
				<text>{{recharge_title3}}</text>
			</view>
			<view class="recharge-item" :class="recharge_selected == '4' ? 'recharge-item-selected' : 'recharge-item-unselected' " @tap="bindRechargeSelect" :data-recharge-amount="recharge_amount4" data-recharge-type='4' >
				<text class="recharge-item-amount">{{recharge_amount4}}</text>
				<text>{{recharge_title4}}</text>
			</view>
		</view>
		<view class="recharge_recomment" style='margin-top:10rpx;'>
			<image :src="recharge_recomment_image" background-size="cover" mode="widthFix"></image>
		</view>
		<view class="recharge-note">
			<view class="select-and-amount" >
				<uni-icons @tap="bindAgree()" style="margin:20rpx;" :type="selectedAgreeStatus ? 'checkbox-filled' : 'circle'" size="18" color='#e34c55'></uni-icons>
				<text @tap="bindRechargeRule" style="margin-right:20rpx;">{{recharge_note}}</text>
			</view>
			<view class="select-and-amount">
				<text style="margin-left:20rpx;margin-right:20rpx;color:#eeeee;">{{recharge_note2}}</text>
			</view>
		</view>
		<view class="recharge-confirm" >
			<text class="recharge-amount">{{amount}}</text>
			<button @tap="confirmOrder" >去支付</button>
		</view>
	</view>
	<uni-popup :show="modalHiddenPlaysx" type="center" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">{{article_title}}</view>
			<view class="uni-tip-content" style="overflow-y: scroll;">
				<uParse :content="article"  /> 
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @click="modalBindconfirmPlaysx">取消</view>
				<view class="uni-tip-button" @click="modalBindconfirmPlaysx">确定</view>
			</view>
		</view>
	</uni-popup>
</view>
</template>

<script>
import uParse from '@/components/uParse/src/wxParse.vue' 
import uniPopup from '@/components/uni-popup/uni-popup.vue' 

var util = require("../../../utils/util.js");
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var member_group_id = uni.getStorageSync('member_group_id') ? uni.getStorageSync('member_group_id') : 0
var member_group_name = uni.getStorageSync('member_group_name') ? uni.getStorageSync('member_group_name') : 0 
export default {
  data() {
    return {
		title_name: '送出礼品',
		title_logo: '../../images/footer-icon-05.png',
		amount : 0,
		liveid:0,
		carts: [],
		cartIds: null,
		addressList: [],
		addressIndex: 0,
		username:null,
		token:null,
		playsxInfo: "",
		article: "",
		article_title:"",
		webviewurl: "",
		art_title: "",
		art_id: "",
		art_cat_id: "",
		art_image: "",
		dkheight: "800",
		windowHeight:'500',
		agreementinfoshowflag: 0,
		playsxinfoshowflag: 0,
		modalHiddenPlaysx: false,
		page: 1,
		pagesize: 5,
		page_num: 0,
		page_red: 1,
		page_red_num: 0,
		all_rows: 0,
		all_red_rows: 0,
		shop_type: shop_type,
		selectedAllStatus: false,
		selectedAgreeStatus: false,
		recharge_selected:'',
		discountpay:0, //折扣差额
		payamount:0, //实际支付金额
		order_num:1,//订单份数
    };
  },

  components: {
	  uParse,
	  uniPopup
  },
  
  props: {},
  
  onLoad: function (options) {
    var that = this;
	uni.showToast({
		title: '加载中',
		icon: 'loading',
		duration: 1000
	})
	
	that.readCarts(options)
    uni.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight
        //console.log(winHeight)
		that.windowHeight = winHeight
        that.dkheight = winHeight - winHeight * 0.05 - 20
      }
    });
  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();

    if (pages.length > 1) {
     that.title_logo = '/static/images/back.png'
    } 
	//that.loadAddress()

  },
  methods: {
	navigateToAgreement: function (art_id) {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		//var art_id = '29'  //21送心用户协议 29会员规则和权益协议
		var art_cat_id = '9'; //送心协议类
	
		var shop_type = that.shop_type;
		var agreementinfoshowflag = that.agreementinfoshowflag ? that.agreementinfoshowflag : 0;
		that.article_title =art_id=='29'?"协议":'会籍说明';
	  if (agreementinfoshowflag == 0) {
		  wx.showToast({
		    title: '加载中',
		    icon: 'loading',
		    duration: 1500
		  });
	    uni.request({
	      url: weburl + '/api/client/query_art',
	      method: 'POST',
	      data: {
	        username: username,
	        access_token: token,
	        art_id: art_id,
	        art_cat_id: art_cat_id,
	        shop_type: shop_type
	      },
	      header: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Accept': 'application/json'
	      },
	      success: function (res) {
			var agreementInfo = res.data.result
	        that.agreementInfo = res.data.result
			that.art_id = 0
			getApp().globalData.art_id = 0
	        console.log('协议:', that.agreementInfo);
			that.modalHiddenPlaysx = true ;
			that.article = that.agreementInfo[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
			//that.article_title ="协议";
	      }
	    });
	  } else {
		  //that.article_title ="协议";
		  that.modalHiddenPlaysx = true ;
		  that.article = that.agreementInfo[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
	  }
	},
	
	navigateToPrivacy: function () {
	  var that = this;
	  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	  var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	  var art_id = '27'; //送心隐私政策
	
	  var art_cat_id = '9'; //送心协议类
	  var shop_type = that.shop_type;
	  //var agreementinfoshowflag = that.agreementinfoshowflag ? that.agreementinfoshowflag : 0;
	
	  uni.showToast({
	      title: '加载中',
	      icon: 'loading',
	      duration: 1500
	  });
	  uni.request({
	    url: weburl + '/api/client/query_art',
	    method: 'POST',
	    data: {
	      username: username,
	      access_token: token,
	      art_id: art_id,
	      art_cat_id: art_cat_id,
	      shop_type: shop_type
	    },
	    header: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	      'Accept': 'application/json'
	    },
	    success: function (res) {
	  	var privacyInfo = res.data.result
	  	that.privacyInfo = res.data.result
	      console.log('送心隐私政策:', that.privacyInfo);
	  	that.modalHiddenPlaysx = true ;
	  	that.article = that.privacyInfo[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
	  	that.article_title ="送心隐私政策";
	    }
	  });
	},
	
	//确定按钮点击事件  玩转送心
	modalBindconfirmPlaysx: function () {
		var that = this
		that.modalHiddenPlaysx = !that.modalHiddenPlaysx
		that.art_id = 0
		that.art_cat_id = 0
		that.playsxinfoshowflag = 0
		if(that.article_title=='协议'){
			that.modalHiddenAgreement = !that.modalHiddenAgreement
			uni.setStorageSync('isReadAgreement', 1); //协议阅读标志
		}
	},
	
	//取消按钮点击事件  玩转送心
	modalBindcancelPlaysx: function () {
		var that = this
		that.modalHiddenPlaysx = !that.modalHiddenPlaysx
		that.art_id = 0
		that.art_cat_id = 0
		that.playsxinfoshowflag = 0
	},
	
    formSubmit: function (e) {
      var that = this;
      var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name;
      console.log('formSubmit() formID：', formId, ' form name:', form_name);

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
      uni.request({
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
      uni.navigateTo({
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
      that.order_num = order_num
      that.payamount = payamount
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
		console.log('order recharge from index  readCarts options:', JSON.stringify(options))
		var amount = parseFloat(options.amount); //var delivery_price = parseFloat(options.delivery_price)
		var payamount = that.payamount;
		var discountpay = that.discountpay;
		var carts = JSON.parse(options.carts);
		var cartIds = options.cartIds;
		var delivery_price = parseFloat(carts[0].delivery_price);
		var cartIdArray = cartIds.split(',')
		var recharge_recomment_image = carts[0].activity_image
		var recharge_note = options.recharge_note ? options.recharge_note:'点击“立即入会”按钮并购买会员资格时，即代表您已阅读、理解并接受《黑贝会会员规则和权益协议》特别规定'
		var recharge_note2 = options.recharge_note2 ? options.recharge_note2:'注意: 电子版会员卡将在购买成功后，被同时关联至您的微信账户和个人手机号，而会员卡号将作为唯一账户识别号'
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
		var recharge_title1 = options.recharge_title1 
		var recharge_title2 = options.recharge_title2 
		var recharge_title3 = options.recharge_title3  
		var recharge_title4 = options.recharge_title4 
		var recharge_amount1 = options.recharge_amount1  
		var recharge_amount2 = options.recharge_amount2 
		var recharge_amount3 = options.recharge_amount3  
		var recharge_amount4 = options.recharge_amount4
		payamount = (amount - discountpay).toFixed(2);
		that.amount = amount
		that.payamount = payamount
		that.delivery_price = delivery_price
		that.carts = carts
		that.cartIds = cartIdArray
		that.order_type = order_type
		that.order_note = order_note
		that.order_image = order_image
		that.username = options.username
		that.token = options.token
		that.is_buymyself = is_buymyself
		that.order_shape = order_shape
		that.order_voice = order_voice
		that.order_voicetime = order_voicetime
		that.order_color = order_color
		that.card_register_info = card_register_info
		that.card_name_info = card_name_info
		that.card_cele_info = card_cele_info
		that.card_love_info = card_love_info
		that.card_template = card_template
		that.recharge_recomment_image = recharge_recomment_image
		that.recharge_note = recharge_note
		that.recharge_note2 = recharge_note2
		that.recharge_title1 = recharge_title1
		that.recharge_title2 = recharge_title2
		that.recharge_title3 = recharge_title3
		that.recharge_title4 = recharge_title4
		that.recharge_amount1 = recharge_amount1
		that.recharge_amount2 = recharge_amount2
		that.recharge_amount3 = recharge_amount3
		that.recharge_amount4 = recharge_amount4
		//console.log('checkouts readCarts() order_image:', order_image, 'order_shape:', order_shape, 'card_template:', card_template, ' card_name_info:', card_name_info, ' card_register_info:', card_register_info, ' card_love_info:', card_love_info);
	},
	
	bindAgree: function () {
		var that = this
	    // 环境中目前已选状态
		var selectedAgreeStatus = that.selectedAgreeStatus
		var page_red_num = that.page_red_num
	    // 取反操作
		selectedAgreeStatus = !selectedAgreeStatus
		that.selectedAgreeStatus = selectedAgreeStatus
		console.log('bindAgree :', selectedAgreeStatus, 'page_red_num:', page_red_num)
	},

	bindRechargeSelect: function (e) {
		var that = this
		var amount = e.currentTarget.dataset.rechargeAmount?e.currentTarget.dataset.rechargeAmount:that.data.amount
		var recharge_selected = e.currentTarget.dataset.rechargeType?e.currentTarget.dataset.rechargeType:that.data.recharge_selected
		that.amount = amount
		that.recharge_selected = recharge_selected
	},
	
	bindRechargeNote: function () {
		var that = this
		getApp().globalData.my_index = 1 //1系统消息
		getApp().globalData.art_id = 28 //28会员制说明
		that.navigateToAgreement('28')
	    /*
		setTimeout(function () {
			uni.switchTab({
				url: '/pages/my/index'
			})
		}, 300)
		*/
	},
	
	bindRechargeRule: function () {
		var that = this
		getApp().globalData.my_index = 1 //1系统消息
		getApp().globalData.art_id = 29 // 29 会员规则和权益协议
		//getApp().globalData.from_page = '/pages/my/index'
		that.navigateToAgreement('29')
		/*
		setTimeout(function () {
			wx.switchTab({
				url: '/pages/my/index'
			})
		}, 300)
		*/
	},
	  
	confirmOrder: function () {
		var that = this;
		var order_num = that.order_num;
		var selectedAgreeStatus = that.selectedAgreeStatus
	    var amount = that.amount
	    if (!selectedAgreeStatus){
	      wx.showToast({
	        title: '请确认会员规则和权益协议',
	        icon: 'loading',
	        duration: 2500
	      })
	      return
	    }else if(amount == 0){
			wx.showToast({
				title: '请选择充值金额',
				icon: 'loading',
				duration: 2500
			})
			return
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
		console.log('confirmOrder selected_coupon_quan_index:', that.selected_coupon_quan_index, 'selected_coupon_red_index:', that.selected_coupon_red_index, ' coupons_red_list:', that.coupons_red_list);
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
		if (!order_note) order_note = '分享一份喜悦，愿你喜欢!'; //默认祝福

		console.log('order_image:'+order_image+ ' order_shape:'+ order_shape + ' card_template:'+ card_template + ' card_cele_info:' + card_cele_info);
		uni.request({
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
           
					if (order_data['order_pay'] == 0 || is_buymyself == 0) {
						that.delete_cart();
						that.zero_pay(order_data['order_no']); //0支付直接送出
					} else {
						uni.navigateTo({
							url: '../../order/payment/payment?orderNo=' + order_data['order_no'] + '&totalFee=' + order_data['order_pay'] + '&is_buymyself=' + is_buymyself
						})
					}
				} else {
					wx.showToast({
						title: res.data.info,
						icon: 'none',
						duration: 2000
					})
				}
			}
      })
    },
	
	delete_cart: function () {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var sku_id = that.cartIds;
		var shop_type = that.shop_type;
		console.log('payment delete_cart sku_id:', sku_id); // 购物车单个删除

		uni.request({
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
		})
    },
	
    zero_pay: function (order_no = '') {
      var that = this;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var is_buymyself = that.is_buymyself; //再次确认订单状态

      uni.request({
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
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
	  var addressData = that.addressData
	  var is_buymyself = that.is_buymyself ? that.is_buymyself : 0; //自购
	  
      wx.request({
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
      modalHiddenCoupon = !modalHiddenCoupon;
      that.setData({
        selectedRedAllStatus: selectedRedAllStatus,
        modalHiddenCoupon: modalHiddenCoupon,
        couponType: 2 //红包

      });
      console.log('bindSelectRedAll :', selectedRedAllStatus, 'page_red_num:', page_red_num);

      if (selectedRedAllStatus && page_red_num == 0) {
        that.query_coupon();
      } else {
        that.setData({
          coupons_list: that.coupons_red_list
        });
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

		that.selected_coupon_id = selected_coupon_id
		that.selected_coupon_name = selected_coupon_name
		that.selected_coupon_content = selected_coupon_content
		that.selected_coupon_footer = selected_coupon_footer
		that.selected_coupon_starttime = selected_coupon_starttime
		that.selected_coupon_endtime = selected_coupon_endtime
		that.selected_coupon_type = selected_coupon_type
		that.selected_coupon_amount = selected_coupon_amount
		that.selected_coupon_index = selected_coupon_index
		that.selected_couponimage = selected_couponimage
		that.coupons_list = coupons_list

		if (coupon_type == 1) {
			that.coupons_quan_list = coupons_list
			that.selected_coupon_quan_index = selected_coupon_index
			that.selected_coupon_quan_amount = selected_coupon_amount
		} else if (coupon_type == 2) {
			that.coupons_red_list = coupons_list
			that.selected_coupon_red_index = selected_coupon_index
			that.selected_coupon_red_amount = selected_coupon_amount
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
					} else if (page_red == 1 && coupons_type == 2) {
						that.coupons_red_list = {}
						that.page_red_num = 0
					}
				} else {
					for (var i = 0; i < coupons_list.length; i++) {
						coupons_list[i]['start_time'] = util.getDateStr(coupons_list[i]['start_time'] * 1000, 0);
						coupons_list[i]['end_time'] = util.getDateStr(coupons_list[i]['end_time'] * 1000, 0);
						coupons_list[i]['selected'] = false;
					}

					if (page > 1 && coupons_type == 1 && coupons_list) {//向后合拼
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
						page_red_num = all_rows / pagesize + 0.5;
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

		if (coupon_type == 2) {//红包
			discountpay = discountpay + couponSelectedRedAmount ? couponSelectedRedAmount : 0;
			discountpay = discountpay.toFixed(2);
		}

		payamount = (amount * order_num - discountpay).toFixed(2);
		that.discountpay = discountpay
		that.payamount = payamount
		if (discountpay - couponSelectedRedAmount == 0 && selectedAllStatus && coupon_type == 1) {
			that.modalBindcancelCoupon();
			wx.showToast({
				title: '该商品无法使用优惠券',
				icon: 'none',
				duration: 1000
			})
		}
    },
	
	bindPickerChange: function (e) {
		that.addressIndex = e.detail.value
    },
	
	bindCreateNew: function () {
		var addressList = this.addressList;

		if (addressList.length == 0) {
			uni.navigateTo({
				url: '../../address/add/add?username=' + this.username
			})
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
		that.modalHiddenCoupon = !this.modalHiddenCoupon

		if (coupon_type == 1) {
			that.selectedAllStatus = couponSelectedStatus ? true : false
		} else if (coupon_type == 2) {
			that.selectedRedAllStatus = couponSelectedStatus ? true : false
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
         that.selectedAllStatus = false
      } else if (coupon_type == 2) {
        that.selectedRedAllStatus = false
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
        })
      })
    }
  }
};
</script>
<style>
@import "./recharge.css" ;

.wxParse {
	line-height: 1.8;
	font-size: 24rpx;
	height: 600rpx;
}
/* 提示窗口 */
.uni-tip {
	padding: 15px;
	width: 300px;
	background: #fff;
	box-sizing: border-box;
	border-radius: 10px;
}

.uni-tip-title {
	text-align: center;
	font-weight: bold;
	font-size: 16px;
	color: #333;
}

.uni-tip-content {
	padding: 15px;
	font-size: 14px;
	color: #666;
}

.uni-tip-group-button {
	margin-top: 10px;
	display: flex;
}

.uni-tip-button {
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: #3b4144;
}  
</style>
