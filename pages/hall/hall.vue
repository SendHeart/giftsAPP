<template>
	<view class="page" :style="'height:'+windowHeight">
		<uni-nav-bar :fixed="true" color="#fff" background-color="#1d1d1d" style="z-index:9;"></uni-nav-bar>
		 
		<view class="search">
			<image class="userinfo-avatar" :src="userInfo.avatarUrl?userInfo.avatarUrl:default_avatar" background-size="cover" />
			<view class="wx-input" style="background-color:#000000" @tap='searchTapTag'>
				<uni-icons :color="'#999999'" class="icon-search" type="search" size="18" />
				<text>搜索我的品质生活</text>
			</view>
			<!--		
		    <view class="page-title">
		      <text>会员制购物商城</text>
		    </view>
			-->
		    <view class="page-title2" @tap="messagesTapTag">
		       <text>了解会员制</text>
		    </view>
			
		</view>
		<view class="all-classify" v-if="hiddenallclassify">
			<view class="catg-title" @click.stop="openAllTapTag">
				<view class="catg-titletext">全部分类</view>
				<view class="catg-claps">
					<image style src="/static/images/bottom-close.png"></image>
				</view>
			</view>
			<view class="all-classify-list">
				<block v-for="(item, index) in navList" :key="index">
					<view :id="'v_' + index" :data-index="index" :data-id="item.id" :data-title="item.title" :data-value="item.value" :class="'all-classify-item ' + (index == activeIndex ? 'all-classify-item-active' : '')" @click="onTapTag">
						{{item.title}}
					</view>
				</block>
			</view>
		</view>
		<view class="top-banner">
			<view class="top-bar-list">
				<!--
				
				<scroll-view scroll-x="true" :scroll-left="scrollLeft" :scroll-into-view="'v_' + toView" class="top-bar">
				 	<view v-for="(item, index) in navList" :key="index" :id="'v_' + index" :data-index="index" :data-id="item.id" :data-title="item.title" :data-value="item.value" :class="'top-bar-item ' + (index == activeIndex ? 'top-bar-active' : '')" @click="onTapTag">{{item.title}}</view>
				</scroll-view>
				<view scroll-x="true" class="top-bar">
					<view v-for="(item, index) in navList" :key="index" :id="'v_' + index" :data-index="index" :data-id="item.id" :data-title="item.title" :data-value="item.value" :class="'top-bar-item ' + (index == activeIndex ? 'top-bar-active' : '')" @click="onTapTag">{{item.title}}</view>
				</view>
				-->
				<swiper class="top-bar" :vertical="false" :display-multiple-items="6" :current="scrollLeft">
					<swiper-item v-for="(item, index) in navList" :key="index">
						<view :id="'v_' + index" :data-index="index" :data-id="item.id" :data-title="item.title" :data-value="item.value" :class="'top-bar-item ' + (index == activeIndex ? 'top-bar-active' : '')" @click="onTapTag">{{item.title}}</view>
					</swiper-item>
				</swiper>
				<view class="top-bar-image">
					<image style="width: 30rpx;height: 20rpx;" src="/static/images/icon_all.png" @click="openAllTapTag"></image>
				</view>
			</view>
		</view>
		<mescroll-body top="60" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @topclick="goTop" @init="mescrollInit">
		<view class="container" scroll-y >
			<view class="banner">
				<swiper class="swiper-box" :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,0.1)" indicator-active-color="rgba(0,0,0,0.3)"
				 :vertical="vertical" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular"
				 easing-function="easeInOutCubic">
					<block v-for="(banner_list, index) in hall_banner" :key="index">
						<swiper-item>
							<view @click="bannerTapTag" :data-bannerlink="banner_list.link">
								<image :src="banner_list.img" class="slide-image" mode="Widthfix"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!--
			<view class="goTop" @tap.stop="goTop">
				<uni-icons style="margin-top:-15rpx;" class="Hui-iconfont iconv-uparrow"></uni-icons>
				<view class style="margin-top:-5rpx;font-size:22rpx;">TOP</view>
			</view>
			-->
			<view class="wrap">
				<!--
				<view class="middle-goods">
					<view v-if="middle8_img" class="image-btnbuy" @tap="bindAIPickGoods" data-goods-type="8" :data-middle-title="middle8_title">
						<image class="pick-goods-image" :src="middle8_img" mode="aspectFill"></image>
						<text>{{middle8_title}}</text>
					</view>

					<view v-if="middle5_img" class="image-btnbuy" @tap="bindMiddleGoods" data-goods-type="5" :data-middle-title="middle5_title">
						<image class="pick-goods-image" :src="middle5_img" mode="aspectFill"></image>
						<text>{{middle5_title}}</text>
					</view>
					<view v-if="middle6_img" class="image-btnbuy" @tap="bindMiddleGoods" data-goods-type="6" :data-middle-title="middle6_title">
						<image class="pick-goods-image" :src="middle6_img" mode="aspectFill"></image>
						<text>{{middle6_title}}</text>
					</view>
					<view v-if="middle7_img" class="image-btnbuy" @tap="bindMiddleGoods" data-goods-type="7" :data-middle-title="middle7_title">
						<image class="pick-goods-image" :src="middle7_img" mode="aspectFill"></image>
						<text>{{middle7_title}}</text>
					</view>
					<view class="image-btnbuy" @tap="bindPickGoods">
						<image class="pick-goods-image" src="../../static/images/menu2.png" mode="aspectFill"></image>
						<text>全部精选</text>
					</view>
				</view>
				<view class="user">
					<view class="usertitle">我的礼物包</view>
					<view class="usergifts" @tap="usergiftTapTag">
						<text>收到</text>
						<text class="snum">{{gifts_rcv}}</text>
						<text>送出</text>
						<text class="snum">{{gifts_send}}</text>
					</view>
				</view>
				-->
				<!--
				<view class="carts-list">
					<view v-for="(item, cart_idx) in carts" :key="cart_idx" @tap="showGoods(item)" class="carts-container" 
					 :hidden="(item.hidden==1?false:false)" >
						<view class="carts-item" :data-index="cart_idx">
							<image class="carts-image" :src="(item.activity_image?item.activity_image:item.image)" mode="aspectFit"  :data-object-id="item.id" :data-goods-id="item.goods_id"
					 :data-goods-name="item.name" :data-goods-org="item.goods_org" :data-goods-shape="item.shape" :data-goods-info="item.act_info"
					 :data-goods-price="item.sell_price" :data-sale="item.sale" :data-image="(item.activity_image?item.activity_image:item.image)"></image>
							 
							<view class="carts-text">
								<view class="carts-title">
									<text>{{item.name}}</text>
								</view>
								<view class="carts-subtitle">
									<view class="carts-sku">
										<text v-for="(sku_value, index) in item['value']" :key="index">{{sku_value?sku_value['name']+':':''}}{{sku_value['type']==2?sku_value['note']+' ':sku_value['value']+' '}}
										</text>
									</view>
									<view class="carts-en-price">￥{{item.sell_price}} x{{item.num}}</view>
									 
									<view class="stepper">
										 
										<text v-if="cart_idx=='99999'" class="normal" :data-index="cart_idx" @tap="bindMinus">-</text>
										 
										<input v-if="cart_idx=='99999'" type="number" :data-index="cart_idx" catchchange="bindManual" @click.stop="bindManualTapped"
										 :value="item.num"></input>
										 
										<text v-if="cart_idx=='99999'" class="normal" :data-index="cart_idx" @tap="bindPlus">+</text>
									</view>
								</view>
							</view>
							<view :data-index="cart_idx" class="delete-button" @tap.stop="deleteFun" :data-object-id="item.objectId" :data-goods-name="item.name" >
								<image src="../../static/images/icon_delete.png"></image>
							</view>
						</view>
					</view>
				</view>
				-->
				<!--
				<view class="pick-goods jcleft" style="border-bottom:0;">
					<view class="pick-goods-text">
						<text class="pick-goods-slogan">附赠留言</text>
					</view>
					<view class="" :hidden="notehidden" style="width: 96%;height:80; 1rpx; margin:0 auto;display: flex;flex-direction: row;color:#666;background: #ffff;">
						<textarea @blur="bindTextAreaBlur" @input="bindTextAreaBlur" placeholder="送你一份礼物，愿你喜欢！" maxlength="56" style="height: 50rpx;line-height:50rpx; font-size:24rpx;" />
					</view>
				</view>
				-->
				<!--
				<uni-popup :show="deletecarthidden" type="center" :custom="true" :mask-click="false">
					<view class="uni-tip">
						<view class="uni-tip-title">确定移除该礼物吗?</view>
						<view class="uni-tip-content">
							{{deletegooodsname}}
						</view>
						<view class="uni-tip-group-button">
							<view class="uni-tip-button" @tap="delete_cart(0)">取消</view>
							<view class="uni-tip-button" @tap="delete_cart(1)">确定</view>
						</view>
					</view>
				</uni-popup>
				-->
				<!--
				<view class="pick-goods">
				  <view style="width:60%;">
				    <image class="serviceimg" :hidden="buyhidden1" :src="(img_service?img_service:'../../images/service.png')" mode="aspectFill"></image>
				    <image class="serviceimg" :hidden="!buyhidden1" :src="(img_service?img_service2:'../../images/service.png')" mode="aspectFill"></image>
				  </view>
				  <view class="modeswitch">
				    <label>
				      <text style="height:30rpx;line-height:30rpx;">模式切换</text>
				      <switch @change="BuyModeChange" :class="buyhidden1?'checked':''" color="#E34C55" style="zoom:0.6"></switch>
				    </label>
				  </view>
				</view>
				<view class="btnconfirm">
					<view v-if="carts[0]">
						<form @submit="formSubmit" :hidden="buyhidden1" data-name="sendgift" data-type="0" report-submit="true">
							<button class="send-button" formType="submit">
								<image src="../../static/images/packed.png"></image>
						    打包送出
							</button>
						</form>
					</view>
				  <view v-if="!carts[0]">
					<form @submit="formSubmit" data-name="pickgift" data-type="1" report-submit="true">
					  <view class="buttonwrap">
					    <button class="send-button" formType="submit">
					      <image src="../../static/btn_add.png"></image>
					      添加礼物
						</button>
					  </view>
					</form>
				  </view>
				  <view v-if="carts[0]">
				  	<form @submit="formSubmit" :hidden="!buyhidden1" data-name="buymyself" data-type="2" report-submit="true">
				  		<view class="buttonwrap">
				  			<button class="send-button" formType="submit">
				  				<image src="../../static/images/buynow.png"></image>
				  				立即自购
				  			</button>
				  		</view>
				  	</form>
				  </view>
				</view>
				-->
				<!--
				<view v-if="friends[0]" class="recomment-title" @tap="bindPickFriends">
				  <text>我的好友<text class="title_ex"></text></text>
				  <text class="more">更多...</text>
				</view>
				<view v-if="friends[0]" class="top-bar-list">
					<scroll-view scroll-x="true" @scroll="getleft" :scroll-into-view="'v_' + toView" class="top-bar">
						<block v-for="(item, index) in friends" :key="index">
							<view :id="'v_' + index"  class="top-bar-item" @tap="bindFriendinfo(item)" >
								<view class="friend-image">
									<image class="friend-image-headimg" :src=item.wx_headimg mode="aspectFill"></image>
									<text>{{item.wx_nickname}}</text>
								</view>
							</view>
						</block>
					</scroll-view>
				</view>
				-->
				<!--
				<view class="recomment-title" @tap="bindPickGoods">
				  <text>精选清单<text class="title_ex">达人推荐</text></text>
				  <text class="more">更多...</text>
				   <button wx:if="is_video_play==1" type="primary" @tap.stop='videoPlayer'>视频</button>
				</view>
				<view class="middle-goods">
				  <view v-if="middle1_img" class="image-btn" @tap="bindMiddleGoods" data-goods-type="1" :data-middle-title="middle1_title" style="border-top-left-radius:14rpx;">
				    <view>
				      <image class="middle-goods-image" :src="middle1_img"></image>
				    </view>
				    <view class="image-btntext">
				      <text class="middle-goods-action">{{middle1_title}}</text>
				      <text class="middle-goods-btntips">{{middle1_note}}</text>
				    </view>
				  </view>
				  <view v-if="middle2_img" class="image-btn" style="margin-right:0;" @tap="bindMiddleGoods" data-goods-type="2" :data-middle-title="middle2_title">
				    <view>
				      <image class="middle-goods-image" :src="middle2_img"></image>
				    </view>
				    <view class="image-btntext">
				      <text class="middle-goods-action">{{middle2_title}}</text>
				      <text class="middle-goods-btntips">{{middle2_note}}</text>
				    </view>
				  </view>
				
				  <view v-if="middle3_img" class="image-btn" @tap="bindMiddleGoods" data-goods-type="3" :data-middle-title="middle3_title" style="border-bottom-left-radius:14rpx;">
				    <view>
				      <image class="middle-goods-image" :src="middle3_img"></image>
				    </view>
				    <view class="image-btntext">
				      <text class="middle-goods-action">{{middle3_title}}</text>
				      <text class="middle-goods-btntips">{{middle3_note}}</text>
				    </view>
				  </view>
				  <view v-if="middle4_img" class="image-btn" style="margin-right:0;" @tap="bindMiddleGoods" data-goods-type="4" :data-middle-title="middle4_title">
				    <view>
				      <image class="middle-goods-image" :src="middle4_img"></image>
				    </view>
				    <view class="image-btntext">
				      <text class="middle-goods-action">{{middle4_title}}</text>
				      <text class="middle-goods-btntips">{{middle4_note}}</text>
				    </view>
				  </view>
				</view>
				-->
				<!--
				<view v-if="pdList.length>0" class="recomment-title" @tap="bindPickGoods">
				  <text>近期热门<text class="title_ex">大家都在送</text></text>
				  <text class="more">更多...</text>
				</view>
				-->
			</view>
		</view>
		<pd-list v-if="page>0" :activeIndex="activeIndex" :list="pdList" :scrollTop="image_refresh"></pd-list>
		</mescroll-body>
		<view class="main_message" :hidden="messageHidden" :style="'height:' + dkheight + 'px;'">
			<view class="t_w">
		    <!--右上角图标开始-->
				<view class="t_image" @tap="messageCancel">
					<image class="t_image1" src="../../static/images/icon-no.png"></image>
				</view>
		    <!-- 消息通知 -->
				<view v-if="main_prom_image" class="main_red" :style="'width:600rpx;height:683rpx;background-image:url(' + main_prom_image + '); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%; text-align: center;align-items: center;padding:20rpx;z-index:9999;'" @tap="messageConfirm">
				<!--
				<text class="" style='margin-top:250rpx;font-size:40rpx;color:#fff;'>{{main_prom_note?'':''}}</text>
				-->
				</view>
			</view>
		</view>
		<view>
			<uni-popup :show="!modalFriendinfoHidden" type="bottom" :custom="true" :mask-click="false">
				<view class="uni-tip" style="z-index:9999;">
					<view class="uni-tip-title">
					{{friend_wx_nickname}}
					</view>
					<view class="uni-tip-content">
						<view class="section">  
							<view class="">{{friend_full_name?'姓名:'+friend_full_name:''}}</view>  
						</view>
						<view class="section">
							<view class="">{{friend_tel?'联系方式:'+friend_tel:''}}</view>  
						</view>
						<view class="section">  
							<view class="">{{friend_address?'地址：'+friend_address:''}}</view>  
						</view>
					</view>
					<view class="uni-tip-group-button">
						<view class="uni-tip-button" @tap="modalBindFriendinfocancel">取消</view>
						<!--
						<view class="uni-tip-button" @tap="modalBindFriendinfoconfirm">确定</view>
						-->
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
var util = require("utils/util.js"); //获取应用实例
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
//import addTips from "pages/common/weplug-add-tips-master/index";
//import imageloader from "../../common/imageloader/imageloader";
import uniPopup from '@/components/uni-popup/uni-popup.vue' ;
//import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
//var dateUtils = require('../../common/util.js').dateUtils;
//import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
//import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
// 引入mescroll-mixins.js
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";		
// 引入mescroll-body组件 (如已在main.js注册全局组件,则省略此步骤)
//import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
import PdList from "./pd-list.vue";
import push from "@/common/push.js"
//获取应用实例
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var wssurl = getApp().globalData.wssurl;
var socketOpen = getApp().globalData.websocketOpen?getApp().globalData.websocketOpen:false;
var socketMsgQueue = [];
var sendMsgQueue = [];
var message = "";
var text = '';
var page = 1;
var pagesize = 20;
var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
var user_group_id = uni.getStorageSync('useruser_group_idInfo') ? uni.getStorageSync('user_group_id') : '0'
var navList = [{
  id: "is_recommend",
  title: "推荐",
  value: "1"
}];
var navList2_init = [{
  id: "gift_logo",
  title: "送礼logo",
  value: "",
  img: "/uploads/gift_logo3.png"
}, {
  id: "wishlist_logo",
  title: "心愿单logo",
  value: "",
  img: "/uploads/wishlist.png"
}, {
  id: "trans_gift_logo",
  title: "转送礼logo",
  value: "",
  img: "/uploads/gift_logo.png"
}, {
  id: "hall_banner",
  title: "首页banner",
  value: "",
  img: ""
}, {
  id: "wish_banner",
  title: "心愿单banner",
  value: "",
  img: "/uploads/wish_banner.png"
}, {
  id: "wechat_gb",
  title: "背景",
  value: "",
  img: "/uploads/wechat_share.png"
}];
var navList2 = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : [];

export default {
	data() {
    return {
		user_group_id:user_group_id,
		title_name: '送心',
		title_logo: '/static/images/footer-icon-05.png',
		img_discount: '/static/images/discount.png',
		img_service: weburl + '/uploads/service.png',
		img_service2: weburl + '/uploads/service2.png',
		default_img: weburl + '/uploads/default_goods_image.png',
		default_avatar: weburl + '/uploads/avatar.png',
		platform: '',
		pagesize: pagesize,
		pageoffset: 0,
		hidden: true,
		resp_message: {},
		messageHidden: true,
		notehidden: false,
		dkheight: 2000,
		scrollLeft: 0,
		toView: 0,
		hiddenallclassify: false,
		animationData: "",
		floorstatus: false,
		is_video_play:0,
		activeIndex: 0,
		activeIndex2: 0,
		navList: navList,
		navList2: navList2,
		old: {
			scrollTop: 0
		},
		image_refresh:0,
		current_scrollTop: 0,
		scrollHeight: 500,
		indicatorDots: true,
		vertical: false,
		autoplay: true,
		interval: 7000,
		duration: 300,
		circular: true,
		hall_banner: weburl + "/uploads/hb_banner.png?rand="+Math.random()*100,
		//默认的banner图
		banner_link: "pages/list/list?navlist=1",
		//默认的banner图 跳转链接
		gifts_rcv: 0,
		gifts_send: 0,
		messages_num: 0,
		note: '',
		username: null,
		token: null,
		recommentslist: [],
		recommentslist_show: [],
		show_max: 20,
		minusStatuses: [],
		selectedAllStatus: true,
		total: '',
		startX: 0,
		itemLefts: [],
		showmorehidden: true,
		loadingHidden: true,
		all_rows: 0,
		rall_rows: 0,
		windowWidth: 380,
		windowHeight: 1100,
		carts: [],
		cartIds: [],
		friends: [],
		modalFriendinfoHidden:true,
		friend_wx_nickname :'',
		friend_full_name :'',
		friend_address:'',
		friend_tel :'',
		amount: 0,
		nickname: userInfo.nickName ,
		avatarUrl: userInfo.avatarUrl ,
		userInfo:userInfo ,
		shop_type: shop_type,
		tab: 'is_recommend',
		tab_value: "1",
		tab2: 'default',
		socktBtnTitle: '连接socket',
		message: '',
		text: text,
		content: '',
		buyhidden1: false,
		buyhidden2: true,
		page: 1,
		friends_page:1,
		friends_pagesize:10,
		rpage_num: 1,
		isPush:false,		
		touchstop: false,
		loading_note: "",
		deleteindex: "",
		is_buymyself: "",
		middle1_img: "",
		middle2_img: "",
		middle3_img: "",
		middle4_img: "",
		middle5_img: "",
		middle6_img: "",
		middle7_img: "",
		middle8_img: "",
		middle1_title: "",
		middle2_title: "",
		middle3_title: "",
		middle4_title: "",
		middle5_title: "",
		middle6_title: "",
		middle7_title: "",
		middle8_title: "",
		middle1_note: "",
		middle2_note: "",
		middle3_note: "",
		middle4_note: "",
		middle5_note: "",
		middle6_note: "",
		middle7_note: "",
		middle8_note: "",
		refername: "",
		msg_id: "",
		art_id: "",
		art_cat_id: "",
		art_title: "",
		page_type: "",
		main_prom_image: "",
		main_prom_title: "",
		main_prom_note: "",
		deletecarthidden:false,
		deletegooodsname:'',
		is_reloading: false,
		status: 'more',
		/*
		contentText: {
			contentdown: '上拉加载更多',
			contentrefresh: '加载中',
			contentnomore: '没有更多'
		},
		*/
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
		//scrollY: 0,
	}
	},
	 
	mixins: [MescrollMixin], // 使用mixin
	components: {
	//   imageloader,
		uniPopup,
		//uniLoadMore,  
		//uniIcons,
		uniNavBar,
		uniSearchBar,
		//MescrollUni,
		//MescrollBody,
		PdList,
	},
	props: {
	},
   
  /*
  onReachBottom() {
  	this.status = 'more';
  	this.getMoreGoodsTapTag();
  },
  */
	onLoad: function (options) {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var shop_type = that.shop_type;
		var page_type = options.page_type ? options.page_type : 0;
		var order_no = options.order_no ? options.order_no : 0;
		var coupons = options.coupons ? options.coupons : '';
		var receive = options.receive ? options.receive : 0;
		var refername = options.refername ? options.refername : '';
		var task = options.task ? options.task : 0;
		var msg_id = options.msg_id ? options.msg_id : 0;
		var art_id = options.art_id ? options.art_id : 0;
		var art_cat_id = options.art_cat_id ? options.art_cat_id : 0;
		var art_title = options.art_title ? options.art_title : '';
		var message = '获取个人消息';
		var messages_num = that.messages_num;
		var myDate = util.formatTime(new Date());
		var deletecarthidden = false ;
    
		getApp().globalData.is_task = task;
    //console.log('hall onload task:', getApp().globalData.is_task, ' username:', username);
		/*
		var message_info = {
			addtime: myDate,
			username: username,
			shop_type: shop_type,
			message: message,
			message_type: 1
		};
		that.message = JSON.stringify(message_info)
		*/
		that.refername = refername
		that.msg_id = msg_id
		that.art_id = art_id
		that.art_cat_id = art_cat_id
		that.art_title = art_title
		that.page_type = page_type
 
		if (art_id > 0 || art_cat_id > 0) {
			uni.navigateTo({
				url: '/pages/my/index?art_id=' + art_id + '&art_cat_id=' + art_cat_id
			});
		}
		that.query_message()
		that.get_menubar()
		//socketMsgQueue.push(that.message)
		//that.initSocketMessage()
		setInterval(function () {
			//that.initSocketMessage()
			that.query_message()
			that.gift_para_interval = 1  //获取业务参数 
			that.get_menubar()
		}, 60*1000)
		
		that.get_project_gift_para();
		that.reloadData();
		//that.sum();		
		//that.query_friends();
	},
	
  //事件处理函数
	onShow: function () {
		var that = this;
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var username = uni.getStorageSync('username');
		var refername = that.refername;
		var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		var msg_id = that.msg_id;
		var page_type = that.page_type;
		var pages = getCurrentPages();
		that.userInfo = userInfo ;
		//#ifdef APP-PLUS
		if((plus.os.name=='iOS')) that.isOpenPush() ;
		//#endif
		uni.getSystemInfo({
			success: function (res) {
				let winHeight = res.windowHeight;
				let winWidth = res.windowWidth;
				that.platform = res.platform;
				that.dkheight = winHeight;
				that.winHeight = winHeight;
				that.winWidth = winWidth;
				//console.log('getSystemInfo:', res);
			}
		})
		//that.query_cart();
		that.get_project_gift_para();
		that.query_friends();
	 
		if (pages.length > 1) {
			that.title_logo = '../../images/back.png'
		}

		if (!username) {
		/*
			uni.navigateTo({
				url: '/pages/login/login'
			})
			uni.switchTab({
				url: '/pages/my/index'
			})
		*/
		} else {
			if (page_type == 2) {
			//收到礼物
			//console.log('hall page_type:', page_type, ' order_no:', order_no, ' receive:', receive);
				if (receive == 1) {
					uni.navigateTo({
						url: '../order/receive/receive?order_no=' + order_no + '&receive=1'
					});
				}
			}

			if (page_type == 3) {
				//收到优惠券
				//console.log('收到优惠券 Hall page_type:', page_type, ' coupons_flag:', coupons_flag, ' coupons_id:', coupons_id, ' receive:', receive);

				if (receive == 1) {
					uni.navigateTo({
						url: '../member/couponrcv/couponrcv?coupons_flag=' + coupons_flag + '&coupons_id' + coupons_id + '&receive=1'
					});
				}
			}

			if (getApp().globalData.is_task > 0) {
			//收到任务分享人信息
			// console.log('收到任务分享 Hall task:', getApp().globalData.is_task, ' refername:', refername, ' msg_id:', msg_id);

				if (username != refername) {
				//保留分享人信息
					uni.setStorageSync('taskrefername', refername);
				}

				uni.request({
					url: weburl + '/api/client/get_task_refer',
					method: 'POST',
					data: {
						username: username,
						access_token: token,
						shop_type: shop_type,
						refername: refername,
						msg_id: msg_id,
						task: getApp().globalData.is_task
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json'
					},
					success: function (res) {
						getApp().globalData.is_task = 0;
						//console.log('hall get_task_refer:', res.data);
					}
				})
				that.messageHidden = !that.messageHidden
				that.main_prom_image = that.navList2[10]['img']
				that.main_prom_title = that.navList2[10]['title'] ? that.navList2[10]['title'] : '黑贝会'
				that.main_prom_note = that.navList2[10]['note'] ? that.navList2[10]['note'] : '黑贝会欢迎您！'
				that.notehidden = !that.notehidden
			}
		}

		if (getApp().globalData.hall_gotop == 1) {
			that.goTop();
		}
		setTimeout(function () {
			if(that.image_refresh == 0){
				that.image_refresh  = that.image_refresh  +1
			}			 
		}, 1000)
    //console.log('onShow get_project_gift_para:', wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [{}]); //app.globalData.messageflag = 0
	},
  
	onShareAppMessage: function () {
		return {
			title: '开启礼物电商时代,200万人都在用的礼物小程序',
			desc: '送心礼物欢迎您',
			path: '/pages/hall/hall?refername=' + username + '&mainpage=1'
		};
	},
	mounted() {
		this.isInit = true // 标记为true
		this.mescroll.triggerDownScroll()
	},
	methods: {
	//#ifdef APP-PLUS
	isOpenPush:function () {  
		if(plus.os.name =='iOS'){
			var UIApplication = plus.ios.import("UIApplication");
			var app = UIApplication.sharedApplication();  
			var enabledTypes = 0;  
			if (app.currentUserNotificationSettings) {  
				var settings = app.currentUserNotificationSettings();  
				enabledTypes = settings.plusGetAttribute("types");  
				//console.log("enabledTypes1:" + enabledTypes);  
				if (enabledTypes == 0) {  
					plus.nativeUI.confirm("推送设置没有开启，是否去开启？", function(e) {  
						if (e.index == 0) {  
							var NSURL2 = plus.ios.import("NSURL");  
							var setting2 = NSURL2.URLWithString("app-settings:");  
							var application2 = UIApplication.sharedApplication();  
							application2.openURL(setting2);  
							plus.ios.deleteObject(setting2);  
							plus.ios.deleteObject(NSURL2);  
							plus.ios.deleteObject(application2);  
						}  
					}, {  
							"buttons": ["Yes", "No"],  
							"verticalAlign": "center"  
						});  
				}  
				plus.ios.deleteObject(settings);  
			} else {  
				enabledTypes = app.enabledRemoteNotificationTypes();  
				if(enabledTypes == 0){  
					console.log("推送未开启!");  
				}else{  
					console.log("已经开启推送功能!")  
				}  
					console.log("enabledTypes2:" + enabledTypes);  
			}  
			plus.ios.deleteObject(app);  
		}
	},
	//#endif
	
	
	imageLoad: function(e) {
		this.recommentslist[e.target.dataset.index].loaded = true
	},
	
	videoPlayer: function (e) {
	    var that = this;
		uni.navigateTo({
	      url: '/pages/live/live?streamaname='
	    })
	},
	 
	//定位数据
	getleft: function (e) {
	  var that = this;
	  var scrollLeft = that.scrollLeft
	  that.scrollLeft = scrollLeft + 10;
	  
	},
	
	getMoreGoodsTapTag: function (e) {
      var that = this;
      var page = that.page  ;
      var rpage_num = that.rpage_num;
      var is_reloading = that.is_reloading;
      //console.log('getMoreGoodsTapTag 加载更多中，请稍等 page:', page, 'is_reloading:', is_reloading, that.scrollHeight);

      if (is_reloading) {
        return;
      }

      if (page > rpage_num && page !=1) {
		that.status = 'nomore';
		return; 
	  }
	  that.reloadData();
	},
	
	bindPickFriends: function () {
		 /*
	    uni.navigateTo({
	      url: '/pages/member/friends/friends'
	    })
		*/
	    uni.switchTab({
	         url: '/pages/member/friends/friends'
	    });
	 },

	bindFriendinfo: function (e) {
		var that = this
    //var index = e.currentTarget.dataset.index
    //var friends = that.friends
		var friend_wx_nickname = e.wx_nickname 
		var friend_full_name = e.full_name
		var friend_address = e.address
		var friend_tel = e.tel
   
		uni.navigateTo({
		url: '/pages/member/friendinfo/friendinfo?friendinfo=' + JSON.stringify(e)
		})
		console.log('bindFriendinfo() friend_full_name', friend_full_name, ' friend_address:', friend_address)
	},
	// 点击获取对应分类的数据
	onTapTag: function (e) {
		var that = this; //var tab = e.currentTarget.id;
		var tab = e.currentTarget.dataset.id;
		var tab_value = e.currentTarget.dataset.value;
		var index = e.currentTarget.dataset.index;
		var search_goodsname = e.currentTarget.dataset.title;
		var navList = that.navList;
		var toView = parseInt(index);
		var hiddenallclassify = that.hiddenallclassify;
		
		if (index > 2 && index < navList.length) {
			toView = index - 2;
		} else {
			toView = 0;
		}
	
		if (tab != 'search_goodsname') {
			search_goodsname = '';
		}
	
		that.activeIndex = parseInt(index)
		that.tab = tab 
		that.tab_value = tab_value
		that.page = 1
		that.search_goodsname = search_goodsname
		that.toView = toView ? toView : 0
		that.pageoffset = 0
	  	that.hiddenallclassify = !hiddenallclassify
		that.gift_para_interval = 1 //更新广告轮播图
		//console.log('toView:' + that.toView,'hiddenallclassify:',that.hiddenallclassify);
		that.scrollLeft = toView
		that.downCallback(that.mescroll)
		that.get_project_gift_para()
		if (hiddenallclassify == false) {
			that.openAllTapTag();
		}
	},
	
	// 打开全部子分类
	openAllTapTag: function (e) {
	  var that = this;
	  var hiddenallclassify = that.hiddenallclassify;
	  that.hiddenallclassify = !hiddenallclassify ;
	},
	 
	onPageScroll:function(e){
		var that = this
		that.current_scrollTop = e.scrollTop
		that.image_refresh = that.image_refresh + e.scrollTop
		//console.log('hall onPageScroll:'+that.current_scrollTop)
	},
	
    //回到顶部，内部调用系统API
    goTop: function () {
      // 一键回到顶部
        var that = this;
		var navList_new = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : '';
        that.scrollTop = 0 ;
		that.image_refresh = that.image_refresh +that.scrollTop
		that.pdList = [] ;
		that.page = 0
        that.pageoffset = 0 ;
		that.mescroll.resetUpScroll()
		
		//that.reloadData();
		
		getApp().globalData.hall_gotop = 0;
		//console.log('goTop scrollTop:', that.mescroll.scrollTop); 
        that.$nextTick(function() {
        	that.mescroll.scrollTo(0) ;
        });	
		that.mescroll.scrollTop = that.old.scrollTops
    },
	
    searchTapTag: function (e) {
      var that = this
	   //console.log('搜索关键字：' + that.data.search_goodsname)
      uni.navigateTo({
        url: '/pages/goods/list/list?search=1'
      });
    },
	
    reSend: function () {
      //失败后重新发送
      var that = this
      var reSendMsgQueue = sendMsgQueue

      for (var i = 0; i < reSendMsgQueue.length; i++) {
        uni.sendSocketMessage({
          data: reSendMsgQueue[i],
          success: function (res) {
            //console.log("sendSocketMessage 重发完成");
            sendMsgQueue.splice(i, 1);
          },
          fail: function (res) {
            //console.log("sendSocketMessage 重发失败");
            uni.showToast({
              title: '网络故障',
              icon: 'loading',
              duration: 2000
            });
          }
        });
      }
    },
	
    initSocketMessage: function () {
		var that = this;
		var remindTitle = socketOpen ? '正在关闭' : '正在连接';

		if (!socketOpen) {
			uni.connectSocket({
				url: wssurl + '/wss'
			})
			uni.onSocketError(function (res) {
				socketOpen = false;
				getApp().globalData.websocketOpen = socketOpen
				//console.log('WebSocket连接打开失败，请检查！');
				that.socktBtnTitle = '连接socket'
				uni.hideToast();
			})
			uni.onSocketOpen(function (res) {
				//console.log('WebSocket连接已打开', wssurl + '/wss');
				uni.hideToast();
				that.socktBtnTitle = '断开socket'
				socketOpen = true;
				getApp().globalData.websocketOpen = socketOpen
				let username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				let uid = username + '_' + shop_type;
				uni.sendSocketMessage({
					data: uid
				});

				for (let i = 0; i < socketMsgQueue.length; i++) {
					that.message = socketMsgQueue[i]
					that.sendSocketMessage();
				} 
			})
			uni.onSocketMessage(function (res) {
				let username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				let response = res.data?JSON.parse(res.data.trim(), true):'';
				let messageHidden = that.messageHidden;
				console.log('hall 收到服务器内容：' + res.data.trim());

				if (response.status == 'y') {
					let resp_message = response.result;
					let messages_num = that.messages_num;
					resp_message['title'] = resp_message['title'] ? resp_message['title'] : '我的消息';
					resp_message['start_time'] = util.getDateStr(resp_message['start_time'] * 1000, 0);
					resp_message['end_time'] = util.getDateStr(resp_message['end_time'] * 1000, 0);
					that.resp_message = resp_message ;
					that.messages_num =  messages_num + 1 ;
					if(resp_message['type']=='7' && resp_message['webview_url']){
						let message_content =  resp_message?JSON.parse(resp_message['content'].trim(), true):'';
						that.main_prom_image = message_content['image']?message_content['image']:'' ;
						that.main_prom_title = resp_message['title'] ? resp_message['title'] : '送心礼物' ;
						that.messageHidden = !messageHidden ;
					}
				}
			})
			uni.onSocketClose(function (res) {
				socketOpen = false;
				getApp().globalData.websocketOpen = socketOpen
				console.log('hall WebSocket 已关闭！');
				uni.hideToast();
				that.socktBtnTitle = '连接socket'
			})
		}
    },
	
    sendSocketMessage: function () {
      var that = this
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
      var myDate = util.formatTime(new Date())
      var message = that.message

      if (!socketOpen) {
        socketMsgQueue.push(message)
        that.initSocketMessage()
      } else {
        //console.log('sendSocketMessage message:', message);
        uni.sendSocketMessage({
          data: message,
          success: function (res) {
            //console.log("sendSocketMessage 完成", res);
          },
          fail: function (res) {
            console.log("hall sendSocketMessage 通讯失败")
            uni.showToast({
              title: '网络故障',
              icon: 'loading',
              duration: 1500
            });
          }
        });
      }
    },
	
    bindMiddleGoods: function (e) {
      var that = this;
      var goods_type = e.currentTarget.dataset.goodsType;
      var middle_title = e.currentTarget.dataset.middleTitle;
      uni.navigateTo({
        url: '/pages/goods/list/list?goods_type_value=' + goods_type + '&middle_title=' + middle_title
      });
    },
	
    goBack: function () {
      var pages = getCurrentPages();

      if (pages.length > 1) {
        uni.navigateBack({
          changed: true
        }); //返回上一页
      } else {
        uni.switchTab({
          url: '../../hall/hall'
        });
      }
    },
	
    bannerTapTag: function (e) {
      var that = this
      var banner_link = e.currentTarget.dataset.bannerlink
      uni.navigateTo({
        url: banner_link + '&username=' + username + '&token=' + token
      });
    },
	
	/*
    messagesTapTag: function () {
      var that = this;
      that.setData({
        messages_num: 0
      });
      getApp().globalData.messageflag = 1; //1系统消息

      console.log('hall messagesTapTag: messageflag:', getApp().globalData.messageflag);
      wx.switchTab({
        url: '/pages/member/message/message'
      });
    },
	*/
	messagesTapTag: function () {
	    var that = this
	   that.messages_num = 0
	    getApp().globalData.messageflag = 1 //1系统消息
	    console.log('hall messagesTapTag: messageflag:', getApp().globalData.messageflag)
	   
	   getApp().globalData.my_index = 1 //1系统消息
	   getApp().globalData.art_id = 28 //1系统消息
	    uni.switchTab({
	      url: '/pages/my/index'
	    })
	},
	
    userTapTag: function () {
      uni.switchTab({
        url: '../my/index'
      });
    },
    usergiftTapTag: function () {
      uni.switchTab({
        url: '../index/index'
      });
    },
    bindTextAreaBlur: function (e) {
      var that = this;
      that.note = e.detail.value
    },
    bindMinus: function (e) {
      var that = this;
      var index = parseInt(e.currentTarget.dataset.index);
      var num = that.carts[index]['num'];
      var num_cur = num; //  

      if (num_cur > 1) {
        num--;
      } else {
        num_cur = 0; //减到0视同删除
      } //var minusStatus = num <= 1 ? 'disabled' : 'normal';


      var minusStatus = num <= 1 ? 'normal' : 'normal'; //减到0视同删除
      // 购物车数据

      var carts = that.carts;
      carts[index]['num'] = num; // 按钮可用状态

      var minusStatuses = that.minusStatuses;
      minusStatuses[index] = minusStatus; // 将数值与状态写回

      that.carts = carts
      that.minusStatuses = minusStatuses

      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var sku_id = carts[index]['id'];
      that.updateCart(username, sku_id, num, token);
      uni.hideLoading();
      this.sum();

      if (num_cur == 0) {
        that.deleteindex = index
        that.deleteFun();
      }
    },
    bindPlus: function (e) {
	  var that = this;
      /*
      wx.showLoading({
        title: '操作中',
        mask: true
      })
      */
      var index = parseInt(e.currentTarget.dataset.index);
      var num = that.carts[index]['num']; // 自增

      num++; // 只有大于一件的时候，才能normal状态，否则disable状态

      var minusStatus = num <= 1 ? 'disabled' : 'normal'; // 购物车数据

      var carts = that.carts;
      carts[index]['num'] = num; // 按钮可用状态

      var minusStatuses = that.minusStatuses;
      minusStatuses[index] = minusStatus; // 将数值与状态写回

      that.carts = carts
      that.minusStatuses = minusStatuses

      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var sku_id = carts[index]['id'];
      that.updateCart(username, sku_id, num, token);
      uni.hideLoading();
      //that.$options.methods.sum();
    },
    bindManual: function (e) {
      uni.showLoading({
        title: '操作中',
        mask: true
      });
      var index = parseInt(e.currentTarget.dataset.index);
      var carts = this.carts;
      var num = parseInt(e.detail.value);
      carts[index]['num'] = num; // 将数值与状态写回

     this.carts = carts
      uni.hideLoading();
      this.sum();
    },
    bindManualTapped: function () {// 什么都不做，只为打断跳转
    },
    bindCheckbox: function (e) {
		uni.showLoading({
			title: '操作中',
			mask: true
		});
		var that = this;
      /*绑定点击事件，将checkbox样式改变为选中与非选中*/
      //拿到下标值，以在carts作遍历指示用

		var index = parseInt(e.currentTarget.dataset.index); //原始的icon状态

		var selected = that.carts[index]['selected'];
		var carts = that.carts; // 对勾选状态取反

		carts[index]['selected'] = !selected; // 写回经点击修改后的数组
		
		that.carts = carts

		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var sku_id = carts[index]['id'];
		var buy_num = carts[index]['num'];
		that.updateCart(username, sku_id, buy_num, token);
		uni.hideLoading();
		that.sum();
    },
	
    bindSelectAll: function () {
      uni.showLoading({
        title: '操作中',
        mask: true
      }); // 环境中目前已选状态

      var selectedAllStatus = this.selectedAllStatus; // 取反操作

      selectedAllStatus = !selectedAllStatus; // 购物车数据，关键是处理selected值

      var carts = this.carts; // 遍历

      for (var i = 0; i < carts.length; i++) {
        carts[i]['selected'] = selectedAllStatus; // update selected status to db
      }

      this.selectedAllStatus = selectedAllStatus
      this.carts = carts
      uni.hideLoading();
      this.sum();
    },
	
    bindPickGoods: function () {
		var that = this
		uni.navigateTo({
			url: '/pages/list/list?username=' + that.username + '&token=' + that.token
		})
    },
	
    bindAIPickGoods: function () {
		var that = this;
		getApp().globalData.messageflag = 2;
		uni.switchTab({
			url: '/pages/member/message/message'
		})
    },
	
    bindCheckout: function (buymyself=0,mycarts='',mynote='',mytotal=0) {
      var that = this;
      var is_buymyself = buymyself;
      var order_type = 'gift';
      var order_note = mynote;
      var amount = mytotal;
      var cartIds = [];
      var carts = mycarts;
      var cartselected = [];
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      //console.log('hall bindCheckout is_buymyself:', is_buymyself, 'cartIds:', cartIds, 'carts:', carts);
	  var index = 0 ;
	  var total = 0 ;
	  for (var i = 0; i < carts.length; i++) {
		if (carts[i]['selected']) {
			cartIds.push(carts[i]['objectId']);
			cartselected[index++] = carts[i];
			total += carts[i]['num'] * carts[i]['sell_price'];
		}
	  }
	
	  cartIds = cartIds.join(',');
	 
      if (!order_note) order_note = '送你一份礼物，希望你喜欢!'; //默认祝福
		
      if (cartselected.length == 0) {
        //that.$options.methods.query_cart();
        //that.$options.methods.sum();
        uni.showToast({
          title: '礼物包是空的，先挑选礼物吧~',
          /* 文案修改 */
          icon: 'none',
          duration: 1500
        });
        return;
      }
		
	  uni.navigateTo({
        url: '../order/checkout/checkout?cartIds=' + cartIds + '&amount=' + total + '&carts=' + JSON.stringify(cartselected) + '&is_buymyself=' + is_buymyself + '&order_type=' + order_type + '&order_note=' + order_note + '&username=' + username + '&token=' + token
      });
	 
    },
	
	query_message:function(){
		var that = this
		var shop_type = that.shop_type; // var formid = formId?formId:that.data.formid
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1'
		var page = 1
		var pagesize =1
		uni.request({
			url: weburl + '/api/mqttservice/sh_query_message',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				message_type: 1,
				shop_type: shop_type,
				page:page,
				pagesize:pagesize,
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				console.log('hall query_message 收到消息：' + JSON.stringify(res.data));
				let response = res.data? res.data :'';
				let messageHidden = that.messageHidden;				
				
				if (response.status == 'y') {
					let resp_message = response.result[0];
					let messages_num = that.messages_num;
					resp_message['title'] = resp_message['title'] ? resp_message['title'] : '我的消息';
					resp_message['start_time'] = util.getDateStr(resp_message['start_time'] * 1000, 0);
					resp_message['end_time'] = util.getDateStr(resp_message['end_time'] * 1000, 0);
					that.resp_message = resp_message ;
					that.messages_num =  messages_num + 1 ;
					if(resp_message['type']=='7' && resp_message['webview_url']){
						let message_content =  resp_message?JSON.parse(resp_message['content'].trim(), true):'';
						that.main_prom_image = message_content['image']?message_content['image']:'' ;
						that.main_prom_title = resp_message['title'] ? resp_message['title'] : '送心礼物' ;
						that.messageHidden = !messageHidden ;
					}
				}
			}
		})
	},
	
    formSubmit: function (e) {
      var that = this;
      //var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name; //记录用户的操作
      //console.log('formSubmit() formID：', formId, ' form name:', form_name);
		
      if (form_name == 'sendgift') {
		  that.is_buymyself = 0
      } else if (form_name == 'buymyself') {
		  that.is_buymyself = 1
	  } else if (form_name == 'pickgift') {
		uni.navigateTo({
		  url: '/pages/list/list?username=' + username + '&token=' + token
		});
		return 
      }
	
      that.$options.methods.bindCheckout(that.is_buymyself,that.carts,that.note,that.total);
      //that.submintFromId(formId, form_name);
    },
	
    //提交formId，让服务器保存到数据库里
    submintFromId: function (formId = 0, form_name = '') {
      var that = this;
      var shop_type = that.shop_type; // var formid = formId?formId:that.data.formid
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      //console.log('submintFromId() formID：', formId, ' form name:', form_name);
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
          //console.log('submintFromId() update success: ', res.data.result);
        }
      })
    },
	
    deleteFun: function (e) {
      var that = this;
      var index = 0;
      var objectId = 0;
	  var deletegooodsname = '' 
      if (e) {
        index = e.currentTarget.dataset.index ? e.currentTarget.dataset.index : 0;
        objectId = e.currentTarget.dataset.objectId;
      } else {
        index = that.deleteindex;
      }
	  that.deletegooodsname = e.currentTarget.dataset.goodsName;
	  that.deletecarthidden = true ;
      index = parseInt(index);
      var carts = that.carts;
      that.sku_id = that.carts[index]['id']; // 购物车单个删除
	    //console.log('hall deleteFun sku_id: ', that.sku_id,' deletecarthidden:',that.deletecarthidden);
    },
	delete_cart: function (isConfirm=0) {
	  var that = this;
	  var shop_type = that.shop_type;
	  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	  var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	  var sku_id =  that.sku_id;
	  var weburl = getApp().globalData.weburl;
	  var carts = that.carts ;
	   that.deletecarthidden = false ;
	  if(isConfirm==0){
		  return;
	  }
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
	      //console.log(res.data.result);
	      var new_carts = [];
	      var j = 0;
	  	
	      for (var i = 0; i < carts.length; i++) {
	        if (carts[i]['id'] != sku_id) {
	          //剔除删除产品
	          new_carts[j++] = carts[i];
	        }
	      }
	  	
	      if (new_carts.length == 0) {
	        var all_rows = 0;
	        var showmorehidden = true;
	      } else {
	        var all_rows = new_carts.length;
	        var showmorehidden = true; // false
	      }
	  	
	      that.carts = new_carts
	      that.showmorehidden = showmorehidden
	      //that.$options.methods.sum();
	      //that.$options.methods.query_cart();
	    }
	  });
	},
    get_cartIds: function () {
      // 遍历取出已勾选的cid
      // var buys = [];
      var cartIds = [];

      for (var i = 0; i < this.carts.length; i++) {
        if (this.carts[i]['selected']) {
          // 移动到Buy对象里去
          // cartIds += ',';
          cartIds.push(this.carts[i]['objectId']);
        }
      }

       that.cartIds = cartIds;
    },
    sum: function () {
		var that = this
      var carts = that.carts; // 计算总金额
      var total = 0;

      for (var i = 0; i < carts.length; i++) {
        /*
        if (carts[i]['selected']) {
          total += carts[i]['num'] * carts[i]['sell_price'];
        }
        */
        total += carts[i]['num'] * carts[i]['sell_price'];
      }

      total = total.toFixed(2); // 写回经点击修改后的数组

      this.carts = carts
      this.total = total
    },
    
	showGoods: function (e) {
      // 点击购物车某件商品跳转到商品详情
		var objectId = e.id ; //currentTarget.dataset.objectId;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
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
		})
    },
	
    updateCart: function (username, sku_id, buy_num, token) {
      var that = this;
      var shop_type = that.shop_type;
      var token = that.token; // 加入购物车
	  var weburl = getApp().globalData.weburl;
      uni.request({
        url: weburl + '/api/client/update_cart',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          sku_id: sku_id,
          buy_num: buy_num,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          //console.log(res.data.result);
          //that.$options.methods.query_cart();
          /*
          wx.showToast({
            title: '已更新',
            icon: 'success',
            duration: 1000
          });
          */
        }
      });
    },
    //确定按钮点击事件 
	messageConfirm: function () {
		var that = this;
		var messageHidden = that.messageHidden;
		var resp_message = that.resp_message ;
		that.messageHidden = !messageHidden
		that.notehidden = !that.notehidden
		if(resp_message['type']=='6' ){
			uni.navigateTo({
				url: '/pages/member/task/task'
			});
		}
		if(resp_message['type']=='7' && resp_message['webview_url']){
			var webview_url = resp_message['webview_url']
			uni.navigateTo({
				url: '/pages/customerservice/customerservice?url='+webview_url
			}); 
		}
	},
	
    //取消按钮点击事件  
	messageCancel: function () {
		var that = this;
		that.messageHidden = true
		that.notehidden = !that.notehidden
	},
	
    query_cart: function () {
      var that = this;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var minusStatuses = [];
      var shop_type = that.shop_type;
	  var weburl = getApp().globalData.weburl;
 
      if (!username) {
		  /*
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500
        });
		*/
		 /*
        setTimeout(function () {
          that.$options.methods.query_cart();
        }, 500);
		*/
		return;
      } 
      uni.request({
        url: weburl + '/api/client/query_cart',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          //console.log('hall query_cart:', res.data);
          var carts = [];
          if (!res.data.result) {
            return;
          }

          var cartlist = res.data.result.list;
          var showmorehidden;
          var index = 0;

          for (var key in cartlist) {
            for (var i = 0; i < cartlist[key]['sku_list'].length; i++) {
              if (cartlist[key]['sku_list'][i]['image'].indexOf("http") < 0) {
                cartlist[key]['sku_list'][i]['image'] = weburl + '/' + cartlist[key]['sku_list'][i]['image'];
              }

              cartlist[key]['sku_list'][i]['selected'] = true;
              cartlist[key]['sku_list'][i]['shop_id'] = key;
              cartlist[key]['sku_list'][i]['objectId'] = cartlist[key]['sku_list'][i]['id'];

              if (index > 1) {
                cartlist[key]['sku_list'][i]['hidden'] = 1;
              }

              carts[index] = cartlist[key]['sku_list'][i]; //minusStatuses[index] = cartlist[key]['sku_list'][i]['num'] <= 1 ? 'disabled' : 'normal';

              minusStatuses[index] = cartlist[key]['sku_list'][i]['num'] <= 1 ? 'normal' : 'normal';
              index++;
            }
          }
		  that.carts = carts;
		  that.minusStatuses = minusStatuses ;
		  //that.mescroll.scrollTo(0,0) ;
		 // that.all_rows = carts.length ;
		  //that.$options.methods.sum();
		   //console.log('hall query_cart:', carts);
        },
		
      });
    },
	 
	modalBindFriendinfoconfirm: function () {
		var that = this
	  	that.modalFriendinfoHidden = !that.modalFriendinfoHidden
	},
	    //取消按钮点击事件  
	modalBindFriendinfocancel: function () {
	  	var that = this
	  	that.modalFriendinfoHidden = !that.modalFriendinfoHidden
	},
	
	query_friends: function () {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var shop_type = that.shop_type;
		var weburl = getApp().globalData.weburl;
		var friends_page  = that.friends_page
		var friends_pagesize = that.friends_pagesize 
		if (!username) {
			return
		} 
		 
		uni.request({
			url: weburl + '/api/client/get_member_friends',
			method: 'POST',
			data: {
				username: username ? username : openid,
				access_token: token,
				type:3 ,  // 3送心礼物好友
				shop_type: shop_type,
			page:friends_page,
			pagesize:friends_pagesize,
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
	     // console.log('hall query_friends:', res.data);
				if (!res.data.result) {
					return;
				}
	
				var friends_list = res.data.result;
				var index = 0;
	
				if(friends_list) {
					for (var i = 0; i < friends_list.length; i++) {
						if (friends_list[i]['wx_headimg'].indexOf("http") < 0) {
							friends_list[i]['wx_headimg'] = weburl + '/' + friends_list[i]['wx_headimg'];
						}
					}
				}
				that.friends = friends_list
				console.log('hall query_friends friends:', that.friends)
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
		if(this.mescroll) mescroll.resetUpScroll()
		
	},
	/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
	upCallback(mescroll) {
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
		var goods_type = that.tab
		var goods_type_value = that.tab_value
	
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
				query_type: 'app',
				page: page,
				pagesize: pagesize,
				pageoffset: pageoffset,
				goods_type: goods_type, 
				goods_type_value: goods_type_value, 
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
				  that.page = page + 1 ;
				  that.pageoffset = pageoffset ;
				  that.all_rows = all_rows ;
				  //console.log('加载完成 page:', page, 'venuesItems_new:',venuesItems_new);
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
		
	reloadData: function () {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var minusStatuses = [];
		var page = that.page;
		var pagesize = that.pagesize;
		var pageoffset = that.pageoffset;
		var shop_type = that.shop_type;
		var weburl = getApp().globalData.weburl;
		that.status = 'loading';
       
		that.is_reloading = true,
		that.loadingHidden = false
	  
	 /*
      uni.request({
        url: weburl + '/api/client/query_member_goods_prom',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          shop_type: shop_type,
		  query_type: 'app',
          page: page,
          pagesize: pagesize,
          pageoffset: pageoffset
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
         // console.log('会员推荐商品列表获取:', recommentslist, ' page num:', res.data.all_rows, ' page:', page, ' pageoffset:', pageoffset, ' res.data:', res.data);
			
          if (res.data.status = 'y') {
            var recommentslist = that.recommentslist;
            var recommentslist_new = res.data.result;
            var rpage_num = res.data.all_rows;
            var pageoffset = res.data.pageoffset;
            var show_max = that.show_max;
            //var recommentslist_show = that.recommentslist_show;
            if (!recommentslist_new) {
				return;
			}
			
            var recomm_len = recommentslist_new.length;
            for (var i = 0; i < recomm_len; i++) {
              if (recommentslist_new[i]['activity_image'].indexOf("http") < 0 && recommentslist_new[i]['activity_image']) {
                recommentslist_new[i]['activity_image'] = weburl + '/' + recommentslist_new[i]['activity_image'];
              }

              if (recommentslist_new[i]['image'].indexOf("http") < 0 && recommentslist_new[i]['image']) {
                recommentslist_new[i]['image'] = weburl + '/' + recommentslist_new[i]['image'];
              }

              recommentslist_new[i]['image'] = recommentslist_new[i]['activity_image'] ? recommentslist_new[i]['activity_image'] : recommentslist_new[i]['image']; //recommentslist[i]['name'] = recommentslist[i]['name'].substr(0, 13) + '...';
			
			 
			  recommentslist_new[i]['show'] = page == 1?true:false;
			  recommentslist_new[i]['loaded'] = page == 1?true:false;
			   
            }
			recommentslist = recommentslist.concat(recommentslist_new);
			 
            that.setData({
              recommentslist: recommentslist,
              rpage_num: rpage_num,
              pageoffset: pageoffset,
			  page:page+1,
            });
			setTimeout(function() {
				that.is_reloading = false ;
			}, 500);
          } 
        }
      });
	  */
		var gifts_rcv = that.gifts_rcv;
		var gifts_send = that.gifts_send;
		var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
      //console.log("openid:" + openid + ' username:' + username); // 送收礼物信息查询

		uni.request({
			url: weburl + '/api/client/query_member_gift',
			method: 'POST',
			data: {
				username: username ? username : openid,
				access_token: token,
				openid: openid,
				shop_type: shop_type,
			},
			header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'
			},
			success: function (res) {
          //console.log('会员礼物收送信息获取:', res.data);

				if (res.data.result) {
					var gifts_rcv = res.data.result['giftgetnum'];
					var gifts_send = res.data.result['giftsendnum'];
					that.gifts_rcv = gifts_rcv
					that.gifts_send = gifts_send
				}
			}
		});
    },
	
	set_project_gift_para: function () {
		var that = this;
		var navList_new = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : '';
		that.gift_para_interval = 0
		that.navList2 = navList_new ;
		that.hall_banner = navList_new[3] ? navList_new[3] : that.hall_banner ;
		that.middle1_img = navList_new[11] ? navList_new[11]['img'] : '' ;
		that.middle2_img = navList_new[12] ? navList_new[12]['img'] : '' ;
		that.middle3_img = navList_new[13] ? navList_new[13]['img'] : '' ;
		that.middle4_img = navList_new[14] ? navList_new[14]['img'] : '' ;
		that.middle5_img = navList_new[15] ? navList_new[15]['img'] : '' ;
		that.middle6_img = navList_new[16] ? navList_new[16]['img'] : '' ; 
		that.middle7_img = navList_new[17] ? navList_new[17]['img'] : '' ;
		that.middle8_img = navList_new[18] ? navList_new[18]['img'] : '' ;
		that.middle1_title = navList_new[11] ? navList_new[11]['title'] : '' ;	
		that.middle2_title = navList_new[12] ? navList_new[12]['title'] : '' ;	
		that.middle3_title = navList_new[13] ? navList_new[13]['title'] : '' ;	
		that.middle4_title = navList_new[14] ? navList_new[14]['title'] : '' ;	
		that.middle5_title = navList_new[15] ? navList_new[15]['title'] : '' ;	
		that.middle6_title = navList_new[16] ? navList_new[16]['title'] : '' ;	
		that.middle7_title = navList_new[17] ? navList_new[17]['title'] : '' ;
		that.middle8_title = navList_new[18] ? navList_new[18]['title'] : '' ;	
		that.middle1_note = navList_new[11] ? navList_new[17]['note'] : '' ;	
		that.middle2_note = navList_new[12] ? navList_new[12]['note'] : '' ;
		that.middle3_note = navList_new[13] ? navList_new[13]['note'] : '' ;	
		that.middle4_note = navList_new[14] ? navList_new[14]['note'] : '' ;	
		that.middle5_note = navList_new[15] ? navList_new[15]['note'] : '' ;	
		that.middle6_note = navList_new[16] ? navList_new[16]['note'] : '' ;	
		that.middle7_note = navList_new[17] ? navList_new[17]['note'] : '' ;
		that.middle8_note = navList_new[18] ? navList_new[18]['note'] : '' ; 
		that.is_video_play = navList_new[19] ? navList_new[19]['value'] : 0 ;
	},
	
	get_project_gift_para: function () {
		var that = this;
		var navList_new = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : '';
		var hall_banner = that.hall_banner;
		var gift_para_interval = that.gift_para_interval
		var cat_id = that.tab_value>0? that.tab_value:1
		//console.log('hall get_project_gift_para navList2:', navList_new);		
		if(navList_new && gift_para_interval == 0 ) {
			that.set_project_gift_para()
			return 
		} 
		
		uni.request({
			url: weburl + '/api/client/get_project_gift_para',
			method: 'POST',
			data: {
				type: 2,
				query_type:'APP',  
				//暂定 1首页单图片 2首页轮播  
				shop_type: shop_type,
				cat_id:cat_id,
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				//console.log('get_project_gift_para:', res.data)
				navList_new = res.data.result;
				//console.log('get_project_gift_para:', navList_new);
      	
				if (!navList_new) {
					return;
				} else {
					uni.setStorageSync('navList2', navList_new);
					that.set_project_gift_para()
				}
			}
		})
    },
	
    //图片加载出错，替换为默认图片
    imageError: function (e) {
      var that = this;
      var errorImgIndex = e.target.dataset.imageindex;
      var default_img = that.default_img;
      var imgObject = "recommentslist_show[" + errorImgIndex + "].image"; //commentList为数据源，对象数组

      var errorImg = {};
      errorImg[imgObject] = default_img; //构建一个对象
		
      that.errorImg = errorImg;
      //console.log('hall imageError():', errorImg);
    },
    
    BuyModeChange: function (e) {
      //console.log(e.detail.value);
	  var that = this
      var obj = {};
	  //obj['buyhidden2'] = e.detail.value; 
	  that.buyhidden1 =  e.detail.value ;
    },
	
	get_menubar: function (event) {
	  //获取菜单项
		var that = this;
		var navlist_toView = that.navlist_toView?that.navlist_toView:0;
		var navlist_title = that.navlist_title;
		uni.request({
			url: weburl + '/api/client/get_menubar',
			method: 'POST',
			data: {
				menu_type: 1,
				query_type:'APP',  
			},
			header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'
			},
			success: function (res) {
				//console.log('get_menubar:', res.data.result);
				var navList_new = res.data.result;
	
				if (!navList_new) {
					uni.showToast({
						title: '没有菜单项',
						icon: 'loading',
						duration: 1500
					})
					return
				}
	
				for (var i = 0; i < navList_new.length; i++) {
					if (navList_new[i]['title'].indexOf(navlist_title) >= 0) {
						navlist_toView = i;
						break;
					}
				}
				that.navList = navList_new ;
				//that.index = navlist_toView ;
				//that.activeIndex = navlist_toView ;
				//console.log('get_menubar navlist_toView:'+navlist_toView+' navList_new:'+ JSON.stringify(navList_new));
				that.tab = navList_new[navlist_toView]['id'] ;
				that.tab_value = navList_new[navlist_toView]['value'] ;
				that.venuesItems_show = [] ;
				that.navList.forEach((tabBar) => {
					that.venuesList = [
					{
						venuesItems: [],
						refreshing: false,
						refreshFlag: false,
						refreshText: "",
						isLoading: false,
						loadingText: '加载中...',
						isNoData: false,
						pulling: false,
						page: 0,
						pagesize: that.pagesize,
						all_rows: that.all_rows,
						scrollTop:that.current_scrollTop,
						angle: 0,
						},
					]
				})
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
        });
      });
    }
  }
};
</script>
<style>
@import "./hall.css";
</style>
