<template>
<view class="page">
	<mescroll-body top="30" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"  @emptyclick="emptyClick" @scroll="scroll" @topclick="goTop" @init="mescrollInit">
	<view class="" scroll-y >
		<view style="display:flex;flex-direction: row;justify-content: center;">
			<view class="userinfo">
				<view class="userinfo-title">
					<image class="userinfo-title-scanqr" src="/static/images/scanqr_s.png" background-size="cover" @tap="scan"></image>
					<text class="userinfo-title-mid">{{m_id>0?'ID:'+m_id:''}}</text>
				</view>
				<view class="userinfo-cards-info">
					<image class="userinfo-cards-logo" :src="card_logo?card_logo:default_avatar" mode="aspectFill" />
					<view class="userinfo-cards-name">
						<text class="userinfo-cards-title">{{card_name}}</text>
					</view>
					<image class="userinfo-avatar" :src="userInfo.avatarUrl?userInfo.avatarUrl:default_avatar" background-size="cover"></image>
				</view>
				<view class="userinfo-cards-item" v-if="card_no!=''">
					<text class="userinfo-cards-no">Global No.{{card_no}}</text>
				</view>
				<view class="userinfo-cards-item" v-if="card_no!=''">
					<text class="userinfo-cards-due">发于:{{card_due_start}}</text>
					<text class="userinfo-cards-due">止于:{{card_due_end}}</text>
				</view>
				<view class="userinfo-cards-nickname" v-if="card_no!=''">
					<text class="userinfo-nickname">{{nickname?nickname:'匿名'}}</text>
					<text class="userinfo-cards-expend" @tap="navigateToRecharge">延长会员期限</text>
				</view>
				<view class="userinfo-cards-nickname" v-if="card_no==''">
					<button class="userinfo-cards-join" style="margin-top:10rpx;line-height:50rpx;height:50rpx;font-size: 26rpx;color:#444;background:#f2f2f2" hover-class='none' @tap="navigateToRecharge">立即入会</button>
				</view>
			</view>
		</view>
		
		<view class="menu-area">
			<view @tap="navigateToOrder" class="order" data-status="0">
				<image src="/static/images/order.png" />
				<text>全部订单</text>
			</view>
			<view @tap="navigateToOrder" class="order" data-status="1">
				<image src="/static/images/daifukuan.png" />
				<text>待付款</text>
			</view>
			<view @tap="navigateToOrder" class="order" data-status="2">
				<image src="/static/images/daifahuo.png" />
				<text>待发货</text>
			</view>
			<view @tap="navigateToOrder" class="order" data-status="3">
				<image src="/static/images/daishouhuo.png" />
				<text>待收货</text>
			</view>
		  	<view @tap="navigateToOrder" class="order" data-status="5">
				<image src="/static/images/iconfont-help.png" />
				<text>退换货</text>
			</view>
			<view @tap="navigateToMyCoupon" class="order">
				<image src="/static/images/iconfont-card.png" />
				<text>优惠券</text>
			</view>
			<view @tap="navigateToAccount" class="order">
				<image src="/static/images/account.png" />
				<text>我的钱包</text>
			</view>
			<view @tap="navigateToAgreement('29')" class="order">
				<image src="/static/images/u633.png" />
				<text>会员协议</text>
			</view>
			<view @tap="navigateToCustomerService" class="order">
				<image src="/static/images/u631.png" class="png" mode="aspectFit"></image>
				<text>联系客服</text>
			</view>
			<view @tap="login" class="order">
				<image src="/static/images/icon_login_name_red.png" />
				<text>重新登录</text>
			</view>
			<view v-if="userauth.location == 1" @tap="navigateToMyLocation" class="order">
			  <image src="/static/images/iconfont-shouhuodizhi.png" />
			  <text>我的位置</text>
			</view>
						 
			<view v-if="userauth.celebration == 1" @tap="navigateToCelebration" class="order">
			  <image src="/static/images/wish.png" />
			  <text>我的祝福</text>
			</view>
			<view v-if="userauth.article==1" @tap="navigateToArticle" class="order">
			  <image src="/static/images/u621.png" />
			  <text>送心文章</text>
			</view>
			<view v-if="userauth.shoper==1" @tap="navigateToShopowner" class="order">
				<image src="/static/images/u633.png" />
				<text>我是店长</text>
			</view>
			<view v-if="userauth.coupon==1" @tap="navigateToCoupon" class="order">
				<image src="/static/images/account.png" />
				<text>发行</text>
			</view>
			<view v-if="userauth_location==1" @tap="navigateToMyLocation" class="order" >
			 	<image src="/static/images/iconfont-shouhuodizhi.png"></image>
			 	<text class="text-grey">我的位置</text>
			</view>
			<view @tap="navigateToShare" class="order" >
			 	<image src="/static/images/barcode.png"></image>
			 	<text class="text-grey">扫码分享</text>
			</view>
			<view  v-if="userauth_shoper==1 || userauth_host==1" @click="bindPlayer" class="order" >
				 <image src="/static/images/live.png"></image>
				 <text class="text-grey">我是主播</text>
			</view>
			<view  bindtap="" class="order">  
			  <text style="color:#fff">.</text>
			</view>
			<view bindtap="" class="order"> 
				<text style="color:#fff">.</text>
			</view>
			<view  bindtap="" class="order">
				<text style="color:#fff">.</text>
			</view>
		</view>
		<view class="wrap">
			<view v-if="pdList.length>0" class="recomment-title">
			  <text>最近浏览商品<text class="title_ex"></text></text>
			</view>
		</view>
	</view>
	<pd-list :list="pdList"></pd-list>
	</mescroll-body>
	
	<!--
	<view class="status_bar"></view>
	<view class="userinfo-mid">{{m_id?'ID:'+m_id:''}}</view>
	<view class="userinfo">  
		<image class="userinfo-avatar" :src="(avatarUrl?avatarUrl:default_avatar)" background-size="cover"  @click.stop="chooseImage(0)"></image>
		<view class="userinfo-nickname">
			<text :hidden="!hiddenNickname" class="userinfo-nickname"  @click.stop="user_nicknameTapTag()">{{nickname?nickname:'匿名'}}</text>
			<image v-if="user_level==1" class="userinfo-vip" src="/static/v.png" background-size="cover"  @click.stop="chooseImage(0)"></image>
		</view>
		<text class="userinfo-nickname">{{user_group_name?user_group_name:''}}</text>
		<input :hidden="hiddenNickname" class="uni-input" style="margin-top:10rpx;" maxlength="20" v-model="nickname" placeholder="请输入昵称" @input="onKeyUserNickNameInput" />
		<button :hidden="!hiddenNickname" class="userinfo-nickname" style="margin-top:10rpx;line-height:50rpx;height:50rpx;font-size: 26rpx;color:#fff;background:#e02e24"  @tap="login">{{login_button}}</button>
		<button :hidden="hiddenNickname" class="userinfo-nickname" style="margin-top:10rpx;line-height:50rpx;height:50rpx;font-size: 26rpx;color:#fff;background:#e02e24"  @tap="update_userinfo">确定</button>
	</view>
	
	<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''" >
	<view class="menu-area">
	 <view @click="navigateToOrder" class="tableviewcell linegray" :style="'width:'+windowWidth-35+'px;'" :data-status="0">
		  <image src="/static/images/order.png" />
		  <text>全部订单</text>
	  </view>
	  <view class="order-area">
		<view @click="navigateToOrder" class="order" :data-status="1">
			<image src="/static/images/daifukuan.png" />
			<text>待付款</text>
		</view>
		<view @click="navigateToOrder" class="order" :data-status="2">
			<image src="/static/images/daifahuo.png" />
			<text>待发货</text>
		</view>
		<view @click="navigateToOrder" class="order" :data-status="3">
			<image src="/static/images/daishouhuo.png" />
			<text>待收货</text>
		</view>
	  <view @click="navigateToOrder" class="order" :data-status="4">
			<image src="/static/images/dpl.png" />
			<text>待评价</text>
		</view>
	  	<view @click="navigateToOrder" class="order" :data-status="5">
			<image src="/static/images/iconfont-help.png" />
			<text>退换货</text>
		</view>
	</view>
	</view>

	<view class="menu-area">
		<view v-if="userauth.shoper!=0" @tap="navigateToRecharge" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'">
			  <image src="/static/images/icon-tk.png" />
			  <text>会员充值</text>
		  </view>
		<view v-if="userauth_coupon==1" @tap="navigateToCoupon" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'">
			<image src="/static/images/iconfont-card.png" />
			<text class="text-grey">发优惠券/红包/积分奖励</text>
		</view>
		<view  v-if="userauth_shoper==1" @click="navigateToShopowner" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
			 <image src="/static/images/my_s.png" class="png" mode="aspectFit"></image>
			 <text class="text-grey">我是店长</text>
		</view>
		<view  v-if="userauth_shoper==1 || userauth_host==1" @click="bindPlayer" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
			 <image src="/static/images/live.png" class="png" mode="aspectFit"></image>
			 <text class="text-grey">我是主播</text>
		</view>
		<view @tap="scan" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/code.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">扫一扫</text>
		</view>
		<view  v-if="userauth_article==1" @tap="navigateToArticle" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/u621.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">送心文章</text>
		</view>
		<view v-if="userauth_location==1" @tap="navigateToMyLocation" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/iconfont-shouhuodizhi.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">我的位置</text>
		</view> 
		<view @tap="navigateToMyCoupon" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/iconfont-card.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">我的优惠券</text>
		</view> 
		<view @tap="navigateToMyRedpackage" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/red_package.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">我的红包</text>
		</view>
		<view @tap="navigateToShare" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/barcode.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">扫码分享</text>
		</view> 
	</view>
	<view class="menu-area">
		<view @tap="navigateToAccount" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/account.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">我的钱包</text>
		</view> 
	</view>
	<view class="menu-area">	
		<view @tap="navigateToPlaysx" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/u628.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">什么是会员制</text>
		</view>  
		<view @tap="navigateToAgreement" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/u633.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">用户协议</text>
		</view>
		<view @tap="navigateToPrivacy" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;'"  >
		 	<image src="/static/images/u621.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey">隐私政策</text>
		</view>
		<view @tap="navigateToCustomerService" class="tableviewcell linegray" :style="'width:'+windowWidth+'px;margin-bottom:50rpx;'"  >
		 	<image src="/static/images/u631.png" class="png" mode="aspectFit"></image>
		 	<text class="text-grey" >联系客服</text>
		</view> 
	</view>
	</scroll-view>
	-->
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
	<uni-popup :show="modalHiddenScan" type="center" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">{{article_title}}</view>
			<view class="uni-tip-content">
				<view scroll-y >
					{{scan_result}}>
				</view>
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @click="modalBindconfirmScan">取消</view>
				<view class="uni-tip-button" @click="modalBindconfirmScan">确定</view>
			</view>
		</view>
	</uni-popup>
</view>
</template>

<script>
var wxparse = require("wxParse/wxParse.js"); 
import uParse from '@/components/uParse/src/wxParse.vue' ;
import uniPopup from '@/components/uni-popup/uni-popup.vue' ;
import permision from "@/common/permission.js"
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";		
//import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
import PdList from "./pd-list.vue";
var weburl = getApp().globalData.weburl;
var appid = getApp().globalData.appid;
var appsecret = getApp().globalData.secret;
var user_type = getApp().globalData.user_type ? getApp().globalData.user_type : 0;
var shop_type = getApp().globalData.shop_type;
var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : 0;
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
var userauth = uni.getStorageSync('userauth') ? uni.getStorageSync('userauth') : {};
var user_group_id = uni.getStorageSync('user_group_id') ? uni.getStorageSync('user_group_id') : 0;
var user_group_name = uni.getStorageSync('user_group_name') ? uni.getStorageSync('user_group_name') : '';
var navList2 = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : [{}];
var uploadurl = getApp().globalData.uploadurl;

export default {
	data() {
	return {
		title_name: '我的',
		title_logo: '/static/images/footer-icon-05.png',
		share_art_image: weburl + '/uploads/share_art_image.jpg',
		nickname: userInfo.nickname ? userInfo.nickname : '匿名',
		avatarUrl: userInfo.avatarUrl,
		m_id:m_id,
		default_avatar: weburl + '/uploads/avatar.png',
		hideviewagreementinfo: true,
		agreementinfoshowflag: 0,
		playsxinfoshowflag: 0,
		artinfoshowflag: 0,
		scrollTop: 0,
		scrollTop_init: 10,
		modalHiddenCele: true,
		modalHiddenAgreement: true,
		modalHiddenBankcard: true,
		modalHiddenPlaysx: false,
		modalHiddenMember:true,
		modalHiddenArt: true,
		modalHiddenArtInfo: true,
		modalHiddenPhone: true,
		modalHiddenUserName: true,
		modalHiddenScan:false,
		modalName:null,
		hiddenNickname:true,
		shop_type: shop_type,
		index: 0,
		art_index: 0,
		web_url: '',
		web_id: '',
		image_save_count: 0,
		needPhoneNumber: '微信授权',
		needUserName: '微信授权',
		login_button:'登录',
		inputShowed: false,
		bank_name: "",
		bank_id: "",
		bankcard_no: "",
		bankcard_name: "",
		bank_info: "",
		user_name: "",
		user_gender: "",
		agreementInfo: "",
		playsxInfo: "",
		article: "",
		article_title:"",
		dkheight: "800",
		webviewurl: "",
		art_title: "",
		art_id: "",
		art_cat_id: "",
		art_image: "",
		navList2: "",
		hall_banner: "",
		middle1_img: "",
		middle2_img: "",
		middle3_img: "",
		middle4_img: "",
		middle1_title: "",
		middle2_title: "",
		middle3_title: "",
		middle4_title: "",
		middle1_note: "",
		middle2_note: "",
		middle3_note: "",
		middle4_note: "",
		loadingHidden: false,
		page:1,
		all_rows: 0,
		rall_rows: 0,
		refer_id: "",
		frompage: "",
		user_type: "",
		user_level:"",
		userauth:userauth,
		userInfo: userInfo,
		userauth_coupon:0,
		userauth_shoper:0,
		userauth_host:0,
		userauth_celebration:0,
		userauth_location:0,
		userauth_article:0,
		user_group_id:user_group_id,
		user_group_name:user_group_name,
		new_img_arr:"",
		scan_result:"",
		windowHeight:'500',
		card_name:'黑贝会 Member',
		card_logo:'',
		card_logo_init:weburl + '/uploads/HB001.png',
		card_no:'',
		card_due_start:'0000-00-00',
		card_due_end:'0000-00-00',
		old: {
			scrollTop: 0
		},
		current_scrollTop: 0,
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
				size: 20, // 每页数据的数量
			},
			noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
			empty:{
				tip: '~ 空空如也 ~', // 提示
				btnText: '去看看'
			}
		},
		pdList: [] ,// 数据列表
		isInit: false, // 列表是否已经初始化
		scrollY: 0,
	};
	},
  
	mixins: [MescrollMixin], // 使用mixin
	components: {
		uParse,
		uniPopup,
		uniNavBar,
		PdList,
	},
	
	props: {
	 
	},
  
	mounted() {
		this.isInit = true; // 标记为true
		this.mescroll.triggerDownScroll();
	},
	
	onLoad: function (options) {
		var that = this
		var gifts_rcv = that.gifts_rcv
		var gifts_send = that.gifts_send
		var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : ''
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
		var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : 0
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1'
		var frompage = options.frompage ? options.frompage : ''

		//var art_id = options.art_id ? options.art_id:0
		//art_id =  art_id>0?art_id:getApp().globalData.art_id
		
		var art_cat_id = options.art_cat_id ? options.art_cat_id : 0
		var art_title = options.art_title ? options.art_title : ''
		var refer_id = options.mid ? options.mid : 0
		var userInfo = uni.getStorageSync('userInfo')
		var userauth = uni.getStorageSync('userauth') ? uni.getStorageSync('userauth') : ''
		that.m_id = m_id
	
		that.get_project_gift_para()
		that.userauth = userauth 
		that.userauth_coupon = userauth.coupon 
		that.userauth_shoper = userauth.shoper 
		that.userauth_host = userauth.host
		that.userauth_celebration = userauth.celebration 
		that.userauth_article = userauth.article 
		that.userauth_location = userauth.location 
		that.nickname =  userInfo.nickname ? userInfo.nickname : '匿名' 
		that.avatarUrl = userInfo.avatarUrl ? userInfo.avatarUrl : '' 
		that.frompage = frompage 
		//that.art_id = art_id 
		that.art_cat_id = art_cat_id 
		that.art_title = art_title 
		that.refer_id = refer_id 
		console.log('my index onLoad() userauth:', userauth, 'user_name:', that.user_name)
	},
	
	onShow: function () {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
		var user_type = uni.getStorageSync('user_type') ? uni.getStorageSync('user_type') : 0
		var user_phone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : ''
		var user_name = uni.getStorageSync('user_name') ? uni.getStorageSync('user_name') : ''
		var user_level = uni.getStorageSync('user_level') ? uni.getStorageSync('user_level') : ''
		var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : 0
		var user_group_id = uni.getStorageSync('user_group_id') ? uni.getStorageSync('user_group_id') : 0
		var user_group_name = uni.getStorageSync('user_group_name') ? uni.getStorageSync('user_group_name') : ''
		var modalHiddenPhone = that.modalHiddenPhone
		var modalHiddenUserName = that.modalHiddenUserName
		var art_id =  getApp().globalData.art_id>0?getApp().globalData.art_id:that.art_id
		var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		var userauth = uni.getStorageSync('userauth') ? uni.getStorageSync('userauth') : '';
		var isReadAgreement = uni.getStorageSync('isReadAgreement') ? uni.getStorageSync('isReadAgreement') : 0;
		var { windowWidth, windowHeight } = uni.getSystemInfoSync();	
		user_type = parseInt(user_type);
		console.log('my index onShow() user_phone:', user_phone, 'userauth:', userauth);
		if (!username) {//登录
			uni.navigateTo({
				url: '../login/login?wechat=1'
			})
		}
		if (!user_name || user_name == '') {
			that.modalHiddenUserName = !modalHiddenUserName;  
		} else if (isReadAgreement == 0 && username) {
		//已登录未阅读用户购买协议
			//that.navigateToAgreement(art_id);
		}
		uni.getSystemInfo({
			success: function (res) {
				that.windowHeight = res.windowHeight?res.windowHeight:that.windowHeight
				that.windowWidth = res.windowWidth?res.windowWidth:that.windowWidth
				that.dkheight = that.windowHeight
			}
		});
		
		that.user_type = user_type
		that.userInfo = userInfo ;
		that.nickname = userInfo.nickname
		that.avatarUrl = userInfo.avatarUrl
		that.userauth = userauth ;
		that.userauth_coupon = userauth.coupon?userauth.coupon:'' ;
		that.userauth_shoper = userauth.shoper?userauth.shoper:'' ;
		that.userauth_host = userauth.host?userauth.host:'' ;
		that.userauth_celebration = userauth.celebration?userauth.celebration:'' ;
		that.userauth_article = userauth.article?userauth.article:'' ;
		that.userauth_location = userauth.location?userauth.location:'' ;
		that.user_level = user_level 
		that.m_id = m_id
		that.user_group_id = user_group_id
		that.user_group_name = user_group_name
		that.user_type = user_type
		that.art_id = art_id

		that.login_button = (username)?'重新登录':'登录' 
		that.query_user_info()
		if (art_id>0){
			if(art_id == 29){
		        that.navigateToAgreement(art_id)
			}else{
				that.navigateToPlaysx()
			}
		}
		 
	    if(that.scrollTop == 0){
			that.goTop()
		}
		 
		//console.log('my index userauth_coupon:', that.userauth_coupon);
  },
  
  onShareAppMessage: function () {
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var share_art_id = that.art_id;
    var share_art_cat_id = that.art_cat_id;
    var share_art_image = that.art_image ? that.art_image : that.share_art_image;
    var share_art_title = that.art_title;
    var m_id = that.m_id > 0 ? that.m_id : 0;
    var scene = 'art_id=' + that.art_id + '&art_cat_id=' + that.art_cat_id + '&mid=' + m_id;
    return {
      title: share_art_title,
      desc: share_art_title,
      imageUrl: share_art_image,
      path: '/pages/my/index?art_id=' + share_art_id + '&art_cat_id=' + share_art_cat_id + '&image=' + share_art_image + '&refer_id=' + m_id // path: '/pages/details/details?scene=' + encodeURIComponent(scene)
    };
  },
  methods: {  
	async scan() {
		// #ifdef APP-PLUS
		let status = await this.checkPermission();
		if (status !== 1) {
		    return;
		}
		// #endif
		uni.scanCode({
			success: (res) => {
				var scan_result = res.result
				this.scan_result = scan_result ;
				if(scan_result.indexOf('http')>-1){
					wx.navigateTo({
					   url: '/pages/customerservice/customerservice?url='+scan_result
					});
				}else{
					this.modalHiddenScan = true ;
				}
			},
			fail: (err) => {
				// #ifdef MP
				uni.getSetting({
					success: (res) => {
						let authStatus = res.authSetting['scope.camera'];
						if (!authStatus) {
							uni.showModal({
								title: '授权失败',
								content: 'Hello uni-app需要使用您的相机，请在设置界面打开相关权限',
								success: (res) => {
									if (res.confirm) {
										uni.openSetting()
									}
								}
							})
						}
					}
				})
				// #endif
			}
		});
	},
	// #ifdef APP-PLUS
	async checkPermission(code) {
		let status = permision.isIOS ? await permision.requestIOS('camera') :
			await permision.requestAndroid('android.permission.CAMERA');
	
		if (status === null || status === 1) {
			status = 1;
		} else {
			uni.showModal({
				content: "需要相机权限",
				confirmText: "设置",
				success: function(res) {
					if (res.confirm) {
						permision.gotoAppSetting();
					}
				}
			})
		}
		return status;
	},
	// #endif
	
	navigateToRecharge: function () {
		var that = this
		var is_recharge = 1
		var recharge_type = 1
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		
		uni.request({
			url: weburl + '/api/client/add_cart',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				shop_type:shop_type,
				is_recharge: is_recharge,
				recharge_type:recharge_type,
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				console.log('My navigateToRecharge res data:', res.data);
				var result =  res.data.result
				var membercard_no = result.card_no? result.card_no:''
				if(membercard_no!=''){
					wx.showToast({
					title: '会员充值',
					icon:'loading',
					duration: 2000
					})
				}else{
					wx.showToast({
						title: '会员卡生成失败',
						icon:'loading',
						duration: 2000
					})
					return
				}
				
				that.recharge_skuid = result.recharge_skuid
				that.recharge_price = result.recharge_price
				that.recharge_image = result.recharge_image
				that.recharge_title1 = result.recharge_title1?result.recharge_title1:'6个月期'
				that.recharge_title2 = result.recharge_title2?result.recharge_title2:'1年期'
				that.recharge_title4 = result.recharge_title4?result.recharge_title4:'终身' 
				that.recharge_title3 = result.recharge_title3?result.recharge_title3:'3年期' 
				that.recharge_amount1 = result.recharge_amount1?result.recharge_amount1:'88'
				that.recharge_amount2 = result.recharge_amount2?result.recharge_amount2:'168' 
				that.recharge_amount3 = result.recharge_amount3?result.recharge_amount3:'358' 
				that.recharge_amount4 = result.recharge_amount4?result.recharge_amount4:'1888' 
				that.recharge_note = result.recharge_note?result.recharge_note:''
				that.recharge_note2 = result.recharge_note2?result.recharge_note2:''
				getApp().globalData.from_page = '/pages/my/index'
				that.queryCart(res.data.result)
			}
		})  
	},
	  
	query_user_info:function () {
		var that = this
		var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : ''
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
		var user_phone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : ''
		var user_name = uni.getStorageSync('user_name') ? uni.getStorageSync('user_name') : ''
		var shop_type = that.shop_type
		
		uni.request({
			url: weburl + '/api/web/user/login/user_xcx_login',
			method: 'POST',
			data: { 
				username: username ?username:openid, 
				wx_nickname:that.wx_nickname,
				wx_headimg:that.wx_headimg,
				user_phone: user_phone,
				user_name: user_name,
				login_type:1,
				type:8,
				shop_type:shop_type,
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				that.token = res.data.result['token']?res.data.result['token']:''
				that.user_group_id = res.data.result['member_group_id']?res.data.result['member_group_id']:this.user_group_id
				that.user_group_name = res.data.result['member_group_name']?res.data.result['member_group_name']:this.user_group_name
				that.card_name = res.data.result['card_name']
				that.card_logo = res.data.result['card_logo']?res.data.result['card_logo']:that.card_logo_init
				that.card_no = res.data.result['card_no']
				that.card_due_start = res.data.result['card_due_start']
				that.card_due_end = res.data.result['card_due_end']
				console.log('my index query_user_info 用户基本信息 user_group_id:'+this.user_group_id+' group name:'+this.user_group_name+' menber info:'+ JSON.stringify(res.data.result))
				var userauth = JSON.parse(res.data.result['userauth'])
				uni.setStorageSync('token', that.token)
				uni.setStorageSync('extensionCode', res.data.result['extensionCode'])
				uni.setStorageSync('username', res.data.result['username'])
				uni.setStorageSync('m_id', res.data.result['m_id'])
				uni.setStorageSync('user_phone', res.data.result['user_phone'])
				uni.setStorageSync('user_name', res.data.result['user_name'])
				uni.setStorageSync('user_gender', res.data.result['user_gender'])
				uni.setStorageSync('user_type', res.data.result['user_type'])
				uni.setStorageSync('userauth', userauth)
				uni.setStorageSync('user_group_id', res.data.result['member_group_id'])
				uni.setStorageSync('user_group_name', res.data.result['member_group_name'])
				uni.setStorageSync('card_name', res.data.result['card_name'])
				uni.setStorageSync('card_logo', res.data.result['card_logo'])
				uni.setStorageSync('card_no', res.data.result['card_no'])
				uni.setStorageSync('card_due_start', res.data.result['card_due_start'])
				uni.setStorageSync('card_due_end', res.data.result['card_due_end'])
			},
		})
	},
	
	scroll: function(e) {
	 	var that = this
	 	var old_scrollTop = that.old.scrollTop
	 	var current_scrollTop = that.mescroll.scrollTop
	 	that.old.scrollTop = current_scrollTop
		//console.log('scroll current_scrollTop:', current_scrollTop);  
		/*
	 	if(current_scrollTop > old_scrollTop +60) {
	 		that.getMoreGoodsTapTag() ;
	 		//that.load() ;
			//console.log('list old_scrollTop:',old_scrollTop,' current_scrollTop:',current_scrollTop)
	 	}
		*/
	 },
	 
	//回到顶部，内部调用系统API
	goTop: function () {
	  // 一键回到顶部
	    var that = this;
		var navList_new = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : '';
	    
		that.pdList = [] ;
	    that.page = 1 ;
	    that.pageoffset = 0 ;
		if(that.mescroll) that.mescroll.resetUpScroll()
		
		getApp().globalData.hall_gotop = 0;
	    // 解决view层不同步的问题
		//console.log('goTop scrollTop:', that.mescroll.scrollTop); 
		/*
	    that.$nextTick(function() {
	    	that.mescroll.scrollTo(0) ;
	    });
		that.mescroll.scrollTop = that.old.scrollTop
		*/
	},
	
	// mescroll组件初始化的回调,可获取到mescroll对象
	mescrollInit(mescroll) {
		this.mescroll = mescroll;
	},
	/*下拉刷新的回调 */
	downCallback() {
		// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
		// loadSwiper();
		// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
		//mescroll.endSuccess() ;
	
		this.page =  1 
		this.mescroll.resetUpScroll()
		
	},
	/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
	upCallback() {
		let mescroll = this.mescroll
		//联网加载数据
		//console.log("i="+this.i+", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size);
		this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData)=>{
			//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
			//console.log("i="+this.i+", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" + curPageData.length);
			mescroll.endSuccess(curPageData.length);
			//设置列表数据
			if(mescroll.num == 1|| this.page == 1) {
				this.pdList = []; //如果是第一页需手动制空列表
			}
			if(curPageData=='n'){
				mescroll.endByPage(this.page, this.all_rows)
			}else{
				this.pdList=this.pdList.concat(curPageData); //追加新数据
				
			}
			
		}, () => {
			//联网失败的回调,隐藏下拉刷新的状态
			mescroll.endErr();
		})
	},
	//点击空布局按钮的回调
	emptyClick(){
		uni.showToast({
			title:'点击了按钮,具体逻辑自行实现'
		})
	},
	
	getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var minusStatuses = [];
		var page = that.page;
		var pagesize = that.pagesize;
		var pageoffset = that.pageoffset;
		var all_rows = that.all_rows
		
		if(page > all_rows && page>1) {
			console.log('加载完成 page:', page, 'all_rows:',all_rows);
			that.is_goodslist_loading = false ;
			successCallback && successCallback('n');
			return ;
		}
		that.is_goodslist_loading = true ;
		that.status = 'loading';
		
		try{
			uni.request({
			  url: weburl + '/api/client/query_member_goods_prom',
			  method: 'POST',
			  data: {
				username: username,
				access_token: token,
				shop_type: shop_type,
				query_type: 'browser',
				page: page,
				pagesize: pagesize,
				pageoffset: pageoffset,
			  },
			  header: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			    'Accept': 'application/json'
			  },
			  success: function (res) {
			    var venuesItems_new = res.data.result;
			    var all_rows = res.data.all_rows;
			    var pageoffset = res.data.pageoffset;
				//console.log('加载 page:', page, 'all_rows:',all_rows,' venuesItems_new:',venuesItems_new);
			    if (!venuesItems_new) {
					that.is_goodslist_loading = false ;
					successCallback && successCallback(res.data.status);
					return;
			    } 
				
			    if (venuesItems_new) {
			      for (var i = 0; i < venuesItems_new.length; i++) {
			        venuesItems_new[i]['short_name'] = venuesItems_new[i]['name'].substring(0, 10) + '...';
						
			        if (!venuesItems_new[i]['act_info']) {
			          venuesItems_new[i]['act_info'] = '';
			        }
						
			        if (!venuesItems_new[i]['goods_tag']) {
			          venuesItems_new[i]['goods_tag'] = '';
			        } else {
			          venuesItems_new[i]['goods_tag'] = venuesItems_new[i]['goods_tag'].substring(0, 10);
			        }
					if (venuesItems_new[i]['activity_image'].indexOf("http") < 0 && venuesItems_new[i]['activity_image']) {
					  venuesItems_new[i]['activity_image'] = weburl + '/' + venuesItems_new[i]['activity_image'];
					}
					
					if (venuesItems_new[i]['image'].indexOf("http") < 0 && venuesItems_new[i]['image']) {
					  venuesItems_new[i]['image'] = weburl + '/' + venuesItems_new[i]['image'];
					}
								
			        venuesItems_new[i]['image'] = venuesItems_new[i]['activity_image'] ? venuesItems_new[i]['activity_image'] : venuesItems_new[i]['image'];
	
				  }
				  that.page = page + 1 
				  that.pageoffset = pageoffset 
				  that.all_rows = all_rows 
				  console.log('加载完成 page:', page, 'venuesItems_new:',venuesItems_new);
				  // 回调
				  successCallback && successCallback(venuesItems_new);
			    }
			  }
			});
			
		} catch (e) {
			//联网失败的回调
			errorCallback && errorCallback();
		}
	},

	modalBindconfirmScan: function (e) {
	  var that = this;
	  that.modalHiddenScan = false ;
	  console.log('modalHiddenScan:' + that.modalHiddenScan);
	},
	bindPlayer: function () {
		var that = this
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var username = uni.getStorageSync('username');
		var streamname = 'sendheart'
		uni.request({
		  url: weburl + '/api/client/get_tengxun_pushurl',
		  method: 'POST',
		  data: {
		    username: username,
		    access_token: token,
			streamname:streamname,
		    shop_type: shop_type
		  },
		  header: {
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Accept': 'application/json'
		  },
		  success: function (res) {
			  console.log('bindPlayer  res:',res.data)
			  if((res.data.status='y')){
				  var result = res.data.result
				  var pushurl = result.pushurl? result.pushurl:''
				  var txSecret = result.txSecret?result.txSecret:''
				  var txTime = result.txTime?result.txTime:''
				  var liveid = result.liveid?result.liveid:'0'
				  if(pushurl && txSecret && txTime){
					 uni.navigateTo({
					   url: '/pages/livepush/livepush?pushurl=' + pushurl+'&txSecret='+txSecret+'&txTime='+txTime+'&liveid='+liveid
					 }) 
				  }else{
					uni.showToast({
					    title: '暂无可用的直播室',
					    icon: 'loading',
					    duration: 2000
					});
				  }
			  }else{
				  console.log("bindPlayer 直播室查询失败"+res.data.info);
				  uni.showToast({
				    title: '直播室查询失败',
				    icon: 'loading',
				    duration: 2000
				  });
			  }
		  }
		});
	   
	},
	
	navigateToOrder: function (e) {
		var status = e.currentTarget.dataset.status
		uni.navigateTo({
			url: '/pages/index/index?status=' + status
		})
	},

	queryCart: function (options) {
	    var that = this
	    var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
	    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1'
	    var order_type = 'recharge'
	    var order_shape = '8'
	    var order_note = '会员充值'; 
	    var recharge_image = options.recharge_image
	    var buynum = 1
	    var sku_sell_price = options.recharge_price
	    var amount = parseFloat(sku_sell_price) * buynum
	    var sku_id = options.recharge_skuid
	    var is_buymyself = 1
	    var goods_shape = 7 
		var recharge_title1 = that.recharge_title1 
		var recharge_title2 = that.recharge_title2 
		var recharge_title3 = that.recharge_title3 
		var recharge_title4 = that.recharge_title4 
		var recharge_amount1 = that.recharge_amount1
		var recharge_amount2 = that.recharge_amount2
		var recharge_amount3 = that.recharge_amount3
		var recharge_amount4 = that.recharge_amount4
		var recharge_note = that.recharge_note
	    var recharge_note2 = that.recharge_note2
	
		uni.request({
			url: weburl + '/api/client/query_cart',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				shop_type: shop_type,
				sku_id: sku_id,
				goods_shape:goods_shape
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				var carts = [];
				if (!res.data.result) {
					wx.showToast({
						title: '会员充值:' + res.data.info,
						icon: 'none',
						duration: 1500
					})
					return
				}
				var cartlist = res.data.result.list;
				var index = 0;
				for (var key in cartlist) {
					cartlist[key]['sku_list'][0]['image'] = recharge_image
					for (var i = 0; i < cartlist[key]['sku_list'].length; i++) {
						if (cartlist[key]['sku_list'][i]['image'].indexOf("http") < 0) {
							cartlist[key]['sku_list'][i]['image'] = weburl + '/' + cartlist[key]['sku_list'][i]['image']
						} 
						cartlist[key]['sku_list'][i]['selected'] = true
						cartlist[key]['sku_list'][i]['shop_id'] = key
						cartlist[key]['sku_list'][i]['objectId'] = cartlist[key]['sku_list'][i]['id']
						carts[index] = cartlist[key]['sku_list'][i]
						index++;
					}
				}
	
				that.carts = carts
				that.all_rows = carts.length
				that.is_buymyself = is_buymyself
				console.log('my index queryCart sku_id:'+sku_id +' amount:'+amount+' carts:' + JSON.stringify(cartlist))
				 uni.navigateTo({
					url: '/pages/order/recharge/recharge?cartIds=' + sku_id + '&amount=' + amount + '&carts=' + JSON.stringify(carts) + '&is_buymyself=' + is_buymyself + '&order_type=' + order_type + '&order_shape=' + order_shape + '&order_image=' + recharge_image + '&recharge=1'+'&recharge_title1='+recharge_title1+'&recharge_amount1='+recharge_amount1+'&recharge_title2='+recharge_title2+'&recharge_amount2='+recharge_amount2+'&recharge_title3='+recharge_title3+'&recharge_amount3='+recharge_amount3+'&recharge_title4='+recharge_title4+'&recharge_amount4='+recharge_amount4+'&recharge_note='+recharge_note+'&recharge_note2='+recharge_note2+'&username=' + username + '&token=' + token
				})
			}
		})
	},
	  
    goBack: function () {
      var that = this;
      var pages = getCurrentPages();
      var userInfo = uni.getStorageSync('userInfo');
      var frompage = that.frompage;

      if (userInfo) {
        if (pages.length > 1) {
          if (frompage) {
            wx.switchTab({
              url: frompage
            });
          } else {
            wx.navigateBack({
              changed: true
            }); //返回上一页
          }
        } else {
          wx.switchTab({
            url: '../hall/hall'
          });
        }
      }
    },
    bindPickerChange: function (e) {
      var that = this;
      var selected_index = e.detail.value;
      var bank_name = that.bank_info[selected_index]['bank_name'];
      var bank_id = that.bank_info[selected_index]['id'];
      console.log('picker发送选择改变，携带值为', e.detail.value);
     
	  that.index = selected_index
	  that.bank_name = bank_name
	  that.bank_id = bank_id
	  
      console.log('自定义值:', that.bank_info[selected_index]['bank_name']);
    },
	
    bindchangeBankcardno: function (e) {
		var that = this;
		var bankcard_no = e.detail.value;
		that.bankcard_no = bankcard_no
		console.log('bankcard_no:' + that.bankcard_no);
    },
	
    bindchangeBankcardname: function (e) {
      var that = this;
      var bankcard_name = e.detail.value;
      that.bankcard_name = bankcard_name
      console.log('bankcard_name:' + that.bankcard_name);
    },
    //绑定银行卡
    get_bank_info: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type; //获取银行列表

      wx.request({
        url: weburl + '/api/client/get_bankinfo',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          if (res.data.status == 'y') {
            var bank_info = res.data.result;
            var index = that.index;
			that.bank_info = bank_info,
			that.modalHiddenBankcard = !that.modalHiddenBankcard
			that.bank_name = bank_info[index]['bank_name']
			that.bank_id = bank_info[index]['id']
            console.log('获取银行列表完成:', res.data.result); //获取我的银行列表

            wx.request({
              url: weburl + '/api/client/get_member_bankcardinfo',
              method: 'POST',
              data: {
                username: username,
                access_token: token,
                shop_type: shop_type
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                if (res.data.status == 'y') {
					var mbank_info = res.data.result;
					that.bank_name = mbank_info[0]['bank_name']
					that.bank_id = mbank_info[0]['bank_id']
					that.bankcard_no = mbank_info[0]['bank_cardno']
					that.bankcard_name = mbank_info[0]['bank_cardname']

                  if (mbank_info[0]['id']) {
                    for (var i = 0; i < that.bank_info.length; i++) {
                      if (that.bank_info[i]['id'] == mbank_info[0]['bank_id']) {
                       that.index = i
						//console.log('获取我的银行列表 index:', i, 'my bank id:', mbank_info[0]['bank_id'])
                      }
                    }
                  }

                  console.log('获取我的银行列表完成:', res.data.result);
                }
              }
            });
          } else {
            wx.showToast({
              title: res.data.info + '[失败]',
              icon: 'none',
              duration: 1500
            });
          }
        }
      });
    },
    //绑定银行卡
    band_bank_card: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      var bank_id = that.bank_id;
      var bank_cardno = that.bankcard_no;
      var bank_cardname = that.bankcard_name;
      var regNum = new RegExp('[0-9]', 'g'); //判断是否为数字

      var rsNum = regNum.exec(bank_cardno);

      if (rsNum) {
        wx.request({
          url: weburl + '/api/client/update_member_bankcardinfo',
          method: 'POST',
          data: {
            username: username,
            access_token: token,
            shop_type: shop_type,
            bank_id: bank_id,
            bank_cardno: bank_cardno,
            bank_cardname: bank_cardname
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            if (res.data.status == 'y') {
              wx.showToast({
                title: '银行卡绑定成功',
                icon: 'none',
                duration: 1500
              });
              console.log('银行卡绑定完');
            } else {
              wx.showToast({
                title: res.data.info + '[失败]',
                icon: 'none',
                duration: 1500
              });
            }
          }
        });
      } else {
        wx.showToast({
          title: '银行卡输入有误',
          icon: 'loading',
          duration: 1500
        });
      }
    },
	
	onKeyUserNickNameInput: function(e) {  
		var hiddenNickname = this.hiddenNickname ;
		this.nickname = e.target.value ;  
	},
	
    update_userinfo: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '' ;
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1' ;
	  var avatarUrl = that.avatarUrl? that.avatarUrl:'';
	  var nickname = that.nickname? that.nickname:'匿名';
	  var hiddenNickname = that.hiddenNickname
      wx.request({
        url: weburl + '/api/client/update_name',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
		  shop_type: shop_type,
          headimgurl: avatarUrl,
		  wx_nickname:nickname,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var result = res.data.result;
          var userInfo = {
			  nickname: nickname,
			  avatarUrl: avatarUrl,
		  };
		  that.userInfo = userInfo ;
          uni.setStorageSync('userInfo', userInfo);
		  that.hiddenNickname = !hiddenNickname
		  console.log('更新用户资料:', userInfo);
        }
      });
    },
	
    getUserName: function (user_name, user_gender) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';

      if (!user_name || !user_gender) {
        return;
      }

      wx.request({
        url: weburl + '/api/client/update_name',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          full_name: user_name,
          sex: user_gender,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          if (res.data.status = 'y') {
            wx.setStorageSync('user_name', user_name);
          } else {
            wx.showToast({
              title: '姓名更新失败',
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    },
	
	user_nicknameTapTag: function () {
	  var that = this;
	  var hiddenNickname = that.hiddenNickname
	  that.hiddenNickname = !hiddenNickname
	},
	
    user_nameTapTag: function (e) {
		var that = this;
		var user_name = e.detail.value;
		that.user_name = user_name
    },
	
    //按钮点击事件  获取姓名
    modalBindconfirmUsername: function () {
      var that = this;
      var user_name = that.user_name;
      var user_gender = that.user_gender;

      if (user_name && user_gender) {
       that.modalHiddenUserName = !that.modalHiddenUserName
        that.getUserName(user_name, user_gender);
      } else {
        var needUserName = '需要您的姓名和性别';
        that.needUserName = needUserName
      }
    },
	
    radiochange: function (e) {
      var that = this;
      var user_gender = e.detail.value; //console.log('radio发生change事件，携带的value值为：', e.detail.value)

      that.user_gender = user_gender
      uni.setStorageSync('user_gender', user_gender);
    },
	
	navigateToAgreement: function (art_id) {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		//var art_id = '29'  //21送心用户协议 29会员规则和权益协议
		var art_cat_id = '9'; //送心协议类

		var shop_type = that.shop_type;
		var agreementinfoshowflag = that.agreementinfoshowflag ? that.agreementinfoshowflag : 0;
		that.article_title = art_id=='29'?"协议":'会籍说明';
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
            that.agreementInfo = res.data.result
			that.art_id = 0
			getApp().globalData.art_id = 0
            console.log('协议:', that.agreementInfo);
			that.modalHiddenPlaysx = true ;
			that.article = that.agreementInfo[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
			
            //that.showAgreementinfo();
          }
        });
      } else {
		  that.modalHiddenPlaysx = true ;
		  that.article = that.agreementInfo[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
		   
        //that.showAgreementinfo();
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
	      //that.showAgreementinfo();
	    }
	  });
	},
	
	showPlaysxinfo:function () {
		var that = this
		var modalHiddenPlaysx = this.modalHiddenPlaysx;
		var playsxinfoshowflag = this.playsxinfoshowflag;
		var playsxInfo = this.playsxInfo
	
		that.modalHiddenPlaysx = !modalHiddenPlaysx
			
		if (!this.modalHiddenPlaysx && playsxinfoshowflag == 0) {
	    uni.getSystemInfo({
	      success: function (res) {
	        let winHeight = res.windowHeight; //console.log(winHeight);
	       that.dkheight = winHeight - winHeight * 0.05 - 20
	      }
	    });
	    this.playsxinfoshowflag = 1
	    var dkcontent2 = this.playsxInfo[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
	    wxparse.wxParse('dkcontent2', 'html', dkcontent2, winPage, 5);
	  }
	},
	
	navigateToPlaysx: function () {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var art_id = that.art_id ? that.art_id : '22'; //玩转送心
		var art_cat_id = that.art_cat_id ? that.art_cat_id : '9'; //送心协议类
		var art_id = that.art_id ? that.art_id:'28'  //22玩转送心 28什么是会员制
		var art_cat_id = that.art_cat_id ? that.art_cat_id:'9'  //送心协议类
		var art_title = that.art_title ? art_title = that.art_title :'如何玩转送心'
	 // var art_title = that.art_title ? art_title = that.art_title : '如何玩转送心';
		var playsxinfoshowflag = that.playsxinfoshowflag;
	 
		if (playsxinfoshowflag == 0) {
			wx.showToast({
				title: '加载中',
				icon: 'loading',
				duration: 1000
			});
			wx.request({
				url: weburl + '/api/client/query_art',
				method: 'POST',
				data: {
					username: username,
					access_token: token,
					art_id: art_id,
					art_cat_id: art_cat_id
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				success: function (res) {
					var playsxInfo = res.data.result 
					that.playsxInfo = playsxInfo 
					getApp().globalData.art_id = 0
					console.log('什么是会员制:', that.playsxInfo)
					that.modalHiddenPlaysx = true 
					that.article_title ="什么是会员制"
					that.article = playsxInfo[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
				}
			})
		} else {
			that.article_title ="什么是会员制";
			that.modalHiddenPlaysx = !that.modalHiddenPlaysx ;
			that.article = that.playsxInfo[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
      }
    },
	
    navigateToArticle: function () {
      var that = this;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		wx.showToast({
		title: '加载中',
		icon: 'loading',
		duration: 1000
		});
      uni.request({
        url: weburl + '/api/client/query_art',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          art_type: 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('文章信息：', res.data.result);
          if (res.data.status=='y') {
            var article = res.data.result;
			that.article_title ="送心文章";
			that.modalHiddenPlaysx = !that.modalHiddenPlaysx ;
			that.article = article[0]['desc'].replace('<img', '<img style="max-width:100%;height:auto;margin:0 auto;" ');
          } else {
            wx.showToast({
              title: '暂时没有文章',
              icon: 'loading',
              duration: 1500
            });
          }
        }
      });
    },
	
    showAgreementinfo: function () {
      let winPage = this; //var hideviewagreementinfo = winPage.data.hideviewagreementinfo
      var modalHiddenAgreement = winPage.modalHiddenAgreement;
      var agreementinfoshowflag = winPage.agreementinfoshowflag ? winPage.agreementinfoshowflag : 0;
      this.modalHiddenAgreement = !modalHiddenAgreement
			
      if (!winPage.modalHiddenAgreement && agreementinfoshowflag == 0) {
        uni.getSystemInfo({
          success: function (res) {
            let winHeight = res.windowHeight;
            console.log(winHeight);
            winPage.dkheight = winHeight - winHeight * 0.05 - 120
          }
        });
        winPage.agreementinfoshowflag = 1
        wxparse.wxParse('dkcontent1', 'html', winPage.agreementInfo[0]['desc'], winPage, 5);
      }
    },
    
    showArt: function () {
      let winPage = this;
      var modalHiddenArt = winPage.modalHiddenArt;
      var modalHiddenArtInfo = winPage.modalHiddenArtInfo;
      var artinfoshowflag = winPage.artinfoshowflag;
      var art_index = winPage.art_index ? winPage.art_index : 0;
      winPage.modalHiddenArt = !modalHiddenArt,
      winPage.modalHiddenArtInfo = !modalHiddenArtInfo
      console.log('my index showArt() modalHiddenArtInfo:', modalHiddenArtInfo, 'artinfoshowflag:', artinfoshowflag, 'art_index:', art_index);

      if (!winPage.modalHiddenArtInfo && artinfoshowflag == 0) {
        wx.getSystemInfo({
          success: function (res) {
            let winHeight = res.windowHeight;
            console.log('my index showArt():', winHeight, 'art_index:', art_index);
            winPagedkheight = winHeight - winHeight * 0.05 - 120
          }
        });
        winPage.artinfoshowflag = 1
        winPage.art_index = art_index
        var dkcontent2 = winPage.article[art_index]['desc'].replace('<img ', '<img style="max-width:100%;height:auto;margin:0 auto;" '); //console.log('my index showArt() dkcontent2:', dkcontent2);

        wxparse.wxParse('dkcontent2', 'html', dkcontent2, winPage, 5); // wxparse.wxParse('dkcontent2', 'html', winPage.data.article[art_index]['desc'], winPage, 5)
      }
    },
    navigateToMyLocation: function (e) {
      wx.navigateTo({
        url: '../member/mylocation/mylocation?'
      });
    },

    /*
    navigateToOrder: function (e) {
      var status = e.currentTarget.dataset.status
      wx.navigateTo({
        url: '../../order/list/list?status=' + status
      });
    },
    */
   navigateToAccount: function (e) {
     uni.navigateTo({
       url: '../member/account/account?'
     });
   },
    navigateToCustomerService: function () {
	  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	  var webview_url ='http://wpa.qq.com/msgrd?v=3&uin=198895160&site=qq&menu=yes' ;
	  uni.request({
	    url: weburl + '/api/client/query_webview_url',
	    method: 'POST',
	    data: {
	      username: username,
	      access_token: token,
	      shop_type: shop_type,
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
			  
			/*
			wx.navigateTo({
			   url: '/pages/customerservice/customerservice?url='+webview_url
			});
			*/
	      } else {
	        wx.showToast({
	          title: '暂时没有WEBVIEW URL',
	          icon: 'none',
	          duration: 1500
	        });
	      }
	    }
	  });
	 
    },
    navigateToWishlist: function (e) {
      uni.navigateTo({
        url: '../wish/wish'
      });
    },
    navigateToShopowner: function (e) {
      uni.navigateTo({
        url: '../member/shopowner/shopowner?'
      });
    },
    navigateToCelebration: function (e) {
      var that = this;
      var shop_type = that.shop_type;
      wx.request({
        url: weburl + '/api/client/get_project_gift_para',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          type: 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data.result);
          var webviewurl = res.data.result;
          this.webviewurl = webviewurl
          this.modalHiddenCele = !that.modalHiddenCele
        }
      });
    },
    bindCelePickerChange: function (e) {
      var that = this;
      var selected_index = e.detail.value;
      var web_url = that.webviewurl[selected_index]['url'];
      var web_id = that.webviewurl[selected_index]['id'];
      console.log('celebration picker发送选择改变，携带值为', e.detail.value);
      that.web_url = web_url
      that.web_id = web_id
      that.index = selected_index
    },
    //确定按钮点击事件  祝福贺卡
    modalBindconfirmCele: function () {
      var that = this;
     that.modalHiddenCele = !that.modalHiddenCele
      uni.navigateTo({
        url: '../member/aboutus/aboutus?url=' + that.web_url
      });
    },
    //取消按钮点击事件  祝福贺卡
    modalBindcancelCele: function () {
      var that = this;
      that.modalHiddenCele = !that.modalHiddenCele
    },
    //按钮点击事件  获取手机号
    modalBindconfirmPhone: function () {
      var that = this;
      var user_phone = wx.getStorageSync('user_phone') ? wx.getStorageSync('user_phone') : '';

      if (user_phone) {
         that.modalHiddenPhone = !that.modalHiddenPhone
      } else {
        var needPhoneNumber = '需要您的手机号授权';
        that.needPhoneNumber = needPhoneNumber
      }
    },
    bindArtPickerChange: function (e) {
      var that = this;
      var selected_index = e.detail.value;
      var art_title = that.article[selected_index]['title'];
      var art_image = that.article[selected_index]['image'];
      var art_id = that.article[selected_index]['id'];
      var art_cat_id = that.article[selected_index]['cat_id'];
      console.log('article picker发送选择改变，携带值为', e.detail.value);
      that.art_title =  art_title
      that.art_id = art_id
      that.art_cat_id = art_cat_id
      that.art_index = selected_index
      that.art_image = art_image ? art_image : that.share_art_image
    },
    //确定按钮点击事件  文章
    modalBindconfirmArt: function () {
      var that = this;
      that.showArt();
    },
    //取消按钮点击事件 文章
    modalBindcancelArt: function () {
      var that = this;
      that.modalHiddenArtInfo = true
      that.modalHiddenArt = true
      that.artinfoshowflag = 0
    },
    //确定按钮点击事件  文章内容
    modalBindconfirmArtInfo: function () {
      var that = this;
      that.modalHiddenArtInfo = true
      that.modalHiddenArt = true
      that.artinfoshowflag = 0
      that.art_id = 0
      that.art_cat_id = 0
    },
    //确定按钮点击事件  文章分享
    modalBindShareArtInfo: function () {
      var that = this;
      that.modalHiddenArtInfo = true
      that.modalHiddenArt = true
      that.artinfoshowflag = 0
      var selected_index = that.art_index;
      var art_title = that.article[selected_index]['title'];
      var art_image = that.article[selected_index]['image'] ? that.article[selected_index]['image'] : that.share_art_image;
      var art_id = that.article[selected_index]['id'];
      var art_cat_id = that.article[selected_index]['cat_id'];
      var art_wx_headimg = that.article[selected_index]['wx_headimg'];
      uni.navigateTo({
        url: '/pages/wish/wishshare/wishshare?share_art_id=' + art_id + '&share_art_cat_id=' + art_cat_id + '&share_art_image=' + art_image + '&share_art_wx_headimg=' + art_wx_headimg + '&share_art_title=' + art_title
      });
      that.art_id = 0
      that.art_cat_id = 0
    },
    navigateToMessage: function (e) {
      uni.navigateTo({
        url: '../member/message/message?'
      });
    },

    /*
    onGotUserInfo: function (e) {
      var that = this
      console.log('onGotUserInfo errMsg:', e.detail.errMsg, 'userInfo:', e.detail.userInfo, 'rawData:', e.detail.rawData)
      //console.log(e.detail.userInfo)
      //console.log(e.detail.rawData)
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log('获取用户登录态 code:' + res.code);
            wx.request({
              url: weburl + '/api/WXPay/getOpenidAction',
              data: {
                js_code: res.code,
                appid: appid,
                appsecret: appsecret
              },
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                var user = res.data//返回openid
                wx.setStorageSync('openid', user.openid);
                wx.setStorageSync('session_key', user.session_key)
                wx.setStorageSync('username', user.openid) //用openid代替用户手机号登录
                that.setData({
                  username: user.openid
                })
                console.log('获取用户OpenId:')
                console.log(user.openid)
                wx.navigateTo({
                  url: '../login/login?frompage=/pages/my/index'
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    },
    */
    //确定按钮点击事件  银行卡
    modalBindconfirmBankcard: function () {
      var that = this;
      that.modalHiddenBankcard = !that.modalHiddenBankcard
      that.band_bank_card();
    },
    //取消按钮点击事件  银行卡
    modalBindcancelBankcard: function () {
      var that = this;
      that.modalHiddenBankcard = !that.modalHiddenBankcard
    },
    //确定按钮点击事件  用户协议
    modalBindconfirmAgreement: function () {
      var that = this;
      that.modalHiddenAgreement = !that.modalHiddenAgreement
      uni.setStorageSync('isReadAgreement', 1); //协议阅读标志

      that.goBack();
    },
    //取消按钮点击事件  用户协议
    modalBindcancelAgreement: function () {
      this.modalHiddenAgreement = !this.modalHiddenAgreement
    },
	
    //确定按钮点击事件  玩转送心
	modalBindconfirmPlaysx: function () {
		this.modalHiddenPlaysx = !this.modalHiddenPlaysx
		if(this.art_id=='29'){
			this.modalHiddenAgreement = !this.modalHiddenAgreement
			uni.setStorageSync('isReadAgreement', 1); //协议阅读标志
		}
		this.art_id = 0
		this.art_cat_id = 0
		this.playsxinfoshowflag = 0
    },
	
    //取消按钮点击事件  玩转送心
    modalBindcancelPlaysx: function () {
      this.modalHiddenPlaysx = !this.modalHiddenPlaysx
      this.art_id = 0
      this.art_cat_id = 0
      this.playsxinfoshowflag = 0
    },
	
    get_project_gift_para: function () {
      var that = this;
      var navList_new = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : [{}];
      var shop_type = that.shop_type;
      var hall_banner = that.hall_banner;
      console.log('hall get_project_gift_para navList2:', navList_new);

      if (navList2.length == 0) {
        //项目列表
        wx.request({
          url: weburl + '/api/client/get_project_gift_para',
          method: 'POST',
          data: {
            type: 2,
            //暂定 1首页单图片 2首页轮播  
            shop_type: shop_type,
			query_type:'APP',
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
              uni.setStorageSync('navList2', navList_new);
              that.navList2 = navList_new
              that.hall_banner = navList_new[3] ? navList_new[3] : hall_banner
              //首页banner图
              that.middle1_img = navList_new[11]['img']
              that.middle2_img = navList_new[12]['img']
              that.middle3_img = navList_new[13]['img']
              that.middle4_img = navList_new[14]['img']
              that.middle1_title = navList_new[11]['title']
              that.middle2_title = navList_new[12]['title']
              that.middle3_title = navList_new[13]['title']
              that.middle4_title = navList_new[14]['title']
              that.middle1_note = navList_new[11]['note']
              that.middle2_note = navList_new[12]['note']
              that.middle3_note = navList_new[13]['note']
              that.middle4_note = navList_new[14]['note']
            }
          }
        });
      } else {
        that.navList2 = navList_new
        that.hall_banner = navList_new[3] ? navList_new[3] : hall_banner
        //首页banner图
        that.middle1_img = navList_new[11]['img']
        that.middle2_img = navList_new[12]['img']
        that.middle3_img = navList_new[13]['img']
        that.middle4_img = navList_new[14]['img']
        that.middle1_title = navList_new[11]['title']
        that.middle2_title = navList_new[12]['title']
        that.middle3_title = navList_new[13]['title']
        that.middle4_titl = navList_new[14]['title']
        that.middle1_note = navList_new[11]['note']
        that.middle2_note = navList_new[12]['note']
        that.middle3_note = navList_new[13]['note']
        that.middle4_note = navList_new[14]['note']
      }

      setTimeout(function () {
       that.loadingHidden = true
      }, 1500);
    },

   chooseImage: async function(is_logo = 0) {
   	wx.chooseImage({
		sizeType: ['original', 'compressed'],
   		success: (res) => {
   			that.new_img_arr = res.tempFilePaths
			console.log('本次上传图片本地:', this.new_img_arr);
			this.upload(is_logo);
   		},
   		fail: (err) => {
   			// #ifdef APP-PLUS
   			if (err['code'] && err.code !== 0 ) {
   				this.checkPermission(err.code);
   			}
   			// #endif
   		}
   	})
   },

	upload: function (is_logo = 0 ) {
	  var that = this;
	  var new_img_arr =  that.new_img_arr[0]; //本次上传图片的手机端文件地址
	  var image_name = '' ;

	  if(is_logo == 0){
		image_name = '头像' ;
	  }else{
		image_name = '用户资料' ;
	  }
	  if (new_img_arr) {
	    wx.uploadFile({
	      url: uploadurl,
	      filePath: new_img_arr,
	      name: 'wechat_upimg',
	      formData: {
	        latitude: encodeURI(0.0),
	        longitude: encodeURI(0.0),
	        restaurant_id: encodeURI(0),
	        city: encodeURI('杭州'),
	        prov: encodeURI('浙江'),
	        name: encodeURI(image_name), // 名称
	      },
	      // HTTP 请求中其他额外的 form data
	      success: function (res) {
	        var retinfo = JSON.parse(res.data.trim());
	        if (retinfo['status'] == "y") {
	          if (is_logo == 0) {
	            //logo 处理
				that.avatarUrl =  retinfo['result']['img_url'] ;
				that.update_userinfo() ;
	          }
	        } else {
	          wx.showToast({
	            title: image_name+'图片加载失败，请再试一次',
	            icon: 'none',
	            duration: 2000
	          });
	        }
	      }
	    });
	  }
	},
	
    login: function () {
      var that = this;
      uni.navigateTo({
        url: '/pages/login/login?frompage=/pages/my/index'
      });
    },
    navigateToAboutus: function () {
      uni.navigateTo({
        url: '/pages/member/aboutus/aboutus'
      });
    },
    navigateToDonate: function () {
      uni.navigateTo({
        url: '/pages/member/donate/donate'
      });
    },
    image_save: function (image_url, image_cache_name) {
      var that = this;
      console.log('membershare imge save image url:', image_url, 'image_cache_name:', image_cache_name);
      uni.downloadFile({
        url: image_url,
        success: function (res) {
          if (res.statusCode === 200) {
            var img_tempFilePath = res.tempFilePath; // console.log('图片下载成功' + res.tempFilePath)

            const fs = wx.getFileSystemManager();
            fs.saveFile({
              tempFilePath: res.tempFilePath,

              // 传入一个临时文件路径
              success(res) {
                wx.setStorageSync(image_cache_name, res.savedFilePath);
                console.log('membershare image_save 用户分享图片缓存成功', image_cache_name, res.savedFilePath);
              },

              fail(res) {
                console.log(' membershare image_save 用户图片缓存失败', image_cache_name, res);
                var wx_headimg_cache = wx.getStorageSync('wx_headimg_cache');
                var membershare_qrcode_cache = wx.getStorageSync('membershare_qrcode_cache_' + that.act_id);
                fs.getSavedFileList({
                  success(res) {
                    console.log('membershare getSavedFileList 缓存文件列表', res);

                    for (var i = 0; i < res.fileList.length; i++) {
                      if (res.fileList[i]['filePath'] != wx_headimg_cache && res.fileList[i]['filePath'] != membershare_qrcode_cache) {
                        fs.removeSavedFile({
                          filePath: res.fileList[i]['filePath'],

                          success(res) {
                            console.log('membershare image_save 缓存清除成功', res);
                          },

                          fail(res) {
                            console.log('membershare image_save 缓存清除失败', res);
                          }

                        });
                      }
                    }

                    fs.saveFile({
                      tempFilePath: img_tempFilePath,

                      // 传入一个临时文件路径
                      success(res) {
                        wx.setStorageSync(image_cache_name, res.savedFilePath);
                      }

                    });
                  },

                  fail(res) {
                    console.log('membershare getSavedFileList 缓存文件列表查询失败', res);
                  }

                });
              }

            });
          } else {
            console.log('membershare image_save 响应失败', res.statusCode);
          }
        }
      });
    },
    navigateToShare: function () {
      var that = this;
      var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0; //var share_member_qrcode = wx.getStorageSync('member_qrcode_cache_' + m_id)

      var qr_type = 'membershare'; // var share_member_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + appsecret + '&shop_type=' + shop_type + '&qr_type=' + qr_type
      //that.image_save(share_member_qrcode, 'member_qrcode_cache_' + m_id)

      /*
      wx.showToast({
        title: "加载中...",
        icon: 'loading',
        duration: 1500,
      })
      setTimeout(function () {
        that.setData({
          loadingHidden: true,
        })
        //var share_member_qrcode_cache = wx.getStorageSync('member_qrcode_cache_' + m_id)
      
      }, 1300)
      */

      uni.navigateTo({
        url: '/pages/member/share/share?qr_type=membershare' //+ '&share_member_qrcode_cache=' + share_member_qrcode_cache

      });
    },
    navigateToCoupon: function () {
      uni.navigateTo({
        url: '/pages/member/couponsnd/couponsnd'
      });
    },
    navigateToMyCoupon: function () {
      uni.navigateTo({
        url: '/pages/member/couponmy/couponmy'
      });
    },
    navigateToMyRedpackage: function () {
      uni.navigateTo({
        url: '/pages/member/couponmy/couponmy?red=1'
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
}
</script>
<style>
@import "./index.css";
/*
@import "../../components/uParse/src/wxParse.css";
*/

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