<template>
<view class="page" :style="'height:'+windowHeight">
	<!-- 
	<uni-nav-bar :fixed="true" color="#fff" background-color="#1d1d1d"></uni-nav-bar>
	-->
	
	<view v-if="hidddensearch" class="search">
		<view class="wx-input">
	    <input name="search" :value="keyword" placeholder="搜索订单" @input="search_goodsnameTapTag" :focus="inputShowed" maxlength="10" confirm-type="search" @confirm="orderSearch"></input>
	    <image @click="orderSearch" src="../../static/images/search-btn.png"></image>
	    </view>
	</view>
	<!-- 
	<view class="top-bar2">
	  <block v-for="(item, index) in navList_order" :key="index">
	    <view :id="'v_' + index" :data-id="index" :data-title="item.title" :data-tab="item.id" :class="'top-bar-item2 ' + (index == TabCur ? 'top-bar-active2' : '')" @click.stop="onOrderTapTag">
	      <view>{{item.title}}</view>
	    </view>
	  </block>
	</view>
	-->
	
	<mescroll-body ref="mescrollRef" top="150" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"  @emptyclick="emptyClick" @scroll="scroll" @topclick="goTop" @init="mescrollInit">	
		<view sclass="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,order_idx) in orders" :key="order_idx"  >
			<view class="order-item">
			<view class="shop-text">
				<text>{{(item.shape!=5 && item.shape!=4)?'订单号:':'订单号:'}}{{item.order_no}}</text>
				 <!--
				<text :hidden="((item.gift_status==2 && giftflag ==0 && item.shape!=4 && item.shape!=5 )?false:true)" class="status2">对方已接受</text>
				<text :hidden="((item.status==2 && item.gift_status==0 && giftflag ==0 && item.shape!=4 && item.shape!=5)?false:true)" class="status">已支付未送出</text>
				<text :hidden="((item.gift_status==1 && giftflag ==0 && item.shape!=4 && item.shape!=5)?false:true)" class="status">对方未接受</text>
				<text :hidden="((item.gift_status==1 && giftflag ==0 && item.status==2 && item.sec>=0 && item.order_price>0 && item.shape!=4 && item.shape!=5)?false:true)" class="status">自动退</text>
				<text :hidden="((item.gift_status==1 && giftflag ==0 && item.status==2 && item.sec>=0 && item.order_price>0 && item.shape!=4 && item.shape!=5)?false:true)" class="status">{{item.hour}}:{{item.minus}}:{{item.sec}}</text>
				<view :hidden="((item.status==2 && giftflag==1 && item.gift_status==2 && mapping.status==1)?false:true)" class="">已回收</view>
				 -->
				
				<text :hidden="((giftflag==0 && item.status == 8 && item.shape!=4 && item.shape!=5)?false:true)" class="status2">已取消</text>
				<text :hidden="((item.status==10 && giftflag ==0 && item.shape!=4 && item.shape!=5)?false:true )" class="status">退款中</text>
				<text :hidden="((item.status==6 && giftflag ==0 && item.shape!=4 && item.shape!=5)?false:true )" class="status2">已退款</text>
				<text :hidden="((item.gift_status==2 && giftflag ==1 && item.status == 3 && item.shape!=4 && item.shape!=5)?false:true)" class="status2">已发货</text>
				<text :hidden="((item.gift_status==2 && giftflag ==1 && item.status == 2 && mapping.status==1 && item.shape!=4 && item.shape!=5)?false:true)" class="status2">未发货</text>
				
			</view>
			<view v-for="(mapping, sku_idx) in item['order_sku']" :key="sku_idx" class="carts-item">
				<view @click="detailTapTag(item.order_no,item.order_id)">
					<image class="carts-image" :src="mapping.sku_image" mode="aspectFit"></image>
				</view>
				<view class="carts-text">
					<text class="carts-title" @click="detailTapTag(item.order_no,item.order_id)" >{{mapping.goods_name}}</text>
					<view :hidden="(item['card_type']==0?false:true)" class="carts-sku">
						<view v-for="(sku_value, index) in mapping['sku_value']" :key="index">
							<text>{{sku_value?sku_value['name']+':':''}}{{sku_value['type']==2?sku_value['note']+' ':sku_value['value']+' '}}</text>
						</view>
					</view>
					<view v-if="(item['card_type']==1?false:true)" class="carts-sku">
						<text :hidden="(item['card_register_info']?false:true)">{{item['card_register_info']?item['card_register_info']['card_register_title']:''}}</text>
						<text :hidden="(item['card_register_info']?false:true)">{{item['card_register_info']?item['card_register_info']['register_start_date']:''}}~~{{item['card_register_info']?item['card_register_info']['register_end_date']:''}}</text>
					</view>
					<view v-if="(item['card_type']==2?false:true)" class="carts-sku">
						<text>{{item['card_name_info']?item['card_name_info']['card_name_name']:''}}{{item['card_name_info']?'('+item['card_name_info']['card_name_title']+')':''}}</text>
					</view>
					<view v-if="(item['card_type']==4?false:true)" class="carts-sku">
						<text>{{item['card_love_info']?item['card_love_info']['card_love_related']:''}}{{item['card_love_info']?'('+item['card_love_info']['card_love_phone']+')':''}}</text>
					</view>
					<view v-if="(item['card_type']==10?false:true)" class="carts-sku">
						<text>{{item['card_cele_info']?item['card_cele_info']['card_cele_title']:''}}</text>
					</view>
					<view v-if="(item['card_type']==0?false:true)" class="carts-subtitle">
						<text>x{{mapping.sku_num}}</text>
					</view>
					<!--
					<view v-if="((item.status==2 && giftflag==1 && item.gift_status==2 && mapping.status!=1 && item.shape!=5 && item.rcv_openid == username)?false:true )" @tap="modalinput_buyin" :data-order_index="order_idx" :data-id="mapping.id" :data-sku_index="sku_idx" :data-goods_id="mapping.goods_id" :data-goods_skuid="mapping.sku_id" :data-order_sku_price="mapping.sku_sell_price_real" :data-order_sku_num="mapping.sku_num" :class="((item.status==2 && giftflag==1 && item.gift_status==2 && mapping.status!=1) ? '': 'hidden') + ' recyclebtn'">
						<image src="../../static/images/recycle.png"></image>礼物回收
					</view>
					-->
					<view @click="comment(mapping)" :class="(((item.status==4 || item.status==5) && item.gift_status==2) ? '': 'hidden') + ' commbtn'">写评论</view>
				</view>
				
			</view>
			<view class="order-footer">
				<view style="width:70%">
					<text style="width:20%">共:{{item.order_sku_num}}件{{item.buy_num>1?' (份数:'+item.buy_num+')':''}}</text>
					<text style="color:#e34c55;">￥{{item.order_price}}</text>
					<text @click="pay" :data-object_id="item.order_no" :data-total_fee="item.order_price" :class="((((item.status==1 && item.gift_status==2) ||(item.status==2 && item.payment_status==2)) && item.rcv_id && giftflag==0) ? '': 'hidden') + ' smallbtn'" style="background:#e34c55;color:#fff;">去支付</text>
					<text @click="cancel_order" :data-object_id="item.order_no" :data-index="order_idx" :class="((item.status==1 && item.gift_status==0 && giftflag==0) ? '': 'hidden') + ' smallbtn'">取消</text>
					<!--
					<text @tap="send" :data-object_id="item.order_no" :data-index="order_idx" :class="((item.status<=2 && item.status>0 && item.gift_status>=0 && item.gift_status<=2 && !item.rcv_openid && giftflag==0) ? '': 'hidden') + ' smallbtn'">重发</text>
					<text @tap="accept" :data-object_id="item.order_no" :data-total_fee="item.amount" :data-order_id="item.id" :class="((item.gift_status==1 && giftflag ==1) ? '': 'hidden') + ' smallbtn'">接受</text>
					 -->
					<text style="width:20%;" @click="receive" :data-object_id="item.id" :class="((item.status==3 && item.gift_status==2 && giftflag==1 && item.rcv_openid == username) ? '': 'hidden') + ' smallbtn'">确认收货</text>
					
				</view>
				<view style="width:30%; text-align:right;">
					 <!--
					<text :hidden="((giftflag==1 && item.status==2)?false:true)" @tap="sendAginTapTag" class="smallbtn2">回赠</text>
					<text :hidden="((giftflag==0 && item.status==2 && item.gift_status==1 && currenttime>item.duetime && item.shape!=4 && item.shape!=5)?false:true)" :data-id="item.order_no" :data-index="order_idx" @tap="sendOtherTapTag" class="smallbtn2">转送</text>
					 -->
					
					<text :hidden="((giftflag==0 && item.status==2 && item.order_price>0 && item.gift_status==1 && currenttime>item.duetime && item.shape!=4 && item.shape!=5)?false:true)" :data-id="item.order_no" :data-index="order_idx" @tap="refundTapTag" class="smallbtn2">退款</text>
				</view>
			</view>	
			</view>
		</view>
	</mescroll-body>
	
	<!-- 
	<view :hidden="hiddenmodalput" @change="shareConfirmCardLove" class="cu-modal bottom-modal"  :class="!hiddenmodalput?'show':''" :style="dkheight + 'px'">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">title="确定要把礼物折现回收?"</view>
				<view class="action" @tap="shareCandelCardLove">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xl">
				<view class="buyin_title">
				  <text>获得金额:</text>
				  <text style="color:#e34c55;font-size:48rpx;height:80rpx;">￥{{buyin_price}}</text>
				</view>
				<view class="buyin_content">
				  <text class="buyin_text" style="font-size:28rpx; font-weight:bold;">礼物回收怎么玩？</text>
				  <text class="buyin_text">1. 仅限于接受礼物后，尚未发货时可以申请折现。</text>
				  <text class="buyin_text">2. 回收会收取该订单金额<text style="color:#e34c55;">{{100-buyin_rate}}%</text>的手续费。</text>
				  <text class="buyin_text">3. 折现后的金额会全部自动转到您的[送心钱包]账户中，您可以在“我的-钱包”中查询并提现到微信钱包。</text>
				</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action text-blue" @tap="cancel_buyin">取消</view>
				<view class="action text-red" @tap="confirm_buyin">确定</view>
			</view>
		</view>
	</view>
	-->
</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue' ;
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue' ;
//import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
// 引入mescroll-mixins.js
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";		
// 引入mescroll-body组件 (如已在main.js注册全局组件,则省略此步骤)
//import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省

//import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
var dateUtils = require('../../common/util.js');
var weburl = getApp().globalData.weburl;
var appid = getApp().globalData.appid;
var appsecret = getApp().globalData.secret;
var shop_type = getApp().globalData.shop_type;
var weburl = getApp().globalData.weburl;
var navList_order = [{
  id: "send",
  title: "我送出的"
}, {
  id: "receive",
  title: "我收到的"
}];
var now = new Date().getTime();
var navList2 = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : [{}];
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';

export default {
	data() {
    return {
      title_name: '礼物袋',
      title_logo: '/static/images/history_s.png',
      nickname: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      orders: [],
      orders_show: [],
      orders_prev: [],
      orders_next: [],
      colors: [],
      keyword: '',
      user_name: '',
      shop_type: shop_type,
      page: 1,
      pagesize: 10,
      show_max: 1,
      //最多显示页数
      order_status: 0,
      navList_order: navList_order,
      tab2: 'send',
      activeIndex2: 0,
	  TabCur: 0,
	  scrollLeft: 0,
      all_rows: 0,
      giftflag: 0,
      gift_send: 0,
      gift_rcv: 0,
      page_num: 0,
      hiddenmodalput: true,
      hidddensearch: true,
      hiddenmore: true,
      modalHiddenUserName: true,
      modalHiddenPhone: true,
      currenttime: now ? parseInt(now / 1000) : 0,
      navList2: navList2,
      buyin_rate: 90,
      //礼物折现率
      loadingHidden: true,
      // loading
      scrollTop: 0,
	  old: {
    	scrollTop: 0
	  },
      current_scrollTop: 0,
      needPhoneNumber: '微信授权',
      needUserName: '微信授权',
      inputShowed: false,
      user_gender: "",
      goods_id: "",
      goods_skuid: "",
      order_skuid: "",
      buyin_price: "",
      order_index: "",
      sku_index: "",
      floorstatus: false,
      windowWidth: "380",
      windowHeight: "1800",
      dkheight: "1800",
	  is_loading: false,
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
	  	onScroll:false,
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
	mixins: [MescrollMixin], // 使用mixin
	components: {
	  uniIcons,
	  uniNavBar,
	  //uniLoadMore,
	  //MescrollUni,
	  //MescrollBody,
	},
	props: {},
  
	onLoad: function (options) {
    // 订单状态，已下单为1，已付为2，已发货为3，已收货为4 5已经评价 6退款 7部分退款 8用户取消订单 9作废订单 10退款中
    var that = this;
    var order_status = parseInt(options.status ? options.status : 0);
    var username = uni.getStorageSync('username')?uni.getStorageSync('username'):'';
    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
    var bar_title = options.bar_title ? options.bar_title : '我的订单';
	that.get_project_gift_para(); //that.reloadData()
	that.orders = []
    // 存为全局变量，控制支付按钮是否显示
	if (order_status == 1) {
	      bar_title = '待付款订单'
	    } else if( order_status == 2){
	      bar_title = '待发货订单'
	    }else if( order_status == 3){
	      bar_title = '待收货订单'
	    }else if( order_status == 4){
	      bar_title = '待评价订单'
	    }else if( order_status == 5){
	      bar_title = '退换货订单'
	    } else{
	      bar_title = '全部订单'
	    }
	wx.setNavigationBarTitle({
	      title: bar_title
	})
	
    if (order_status) {
		that.order_status = order_status
    }
	
  },
  onShow: function () {
    var that = this;
    var orders = that.orders;
    var username = uni.getStorageSync('username');
    var user_phone = uni.getStorageSync('user_phone') ? uni.getStorageSync('user_phone') : '';
    var user_name = uni.getStorageSync('user_name') ? uni.getStorageSync('user_name') : '';
    var modalHiddenPhone = that.modalHiddenPhone;
    var modalHiddenUserName = that.modalHiddenUserName;
    var userInfo = uni.getStorageSync('userInfo');
    //console.log('index onShow() orders:', orders);
	
    if (!username) {
      uni.navigateTo({
       url: '/pages/login/login?frompage=/pages/index/index'
      });
	  
    }else{
		//that.reloadData();
		uni.getSystemInfo({
			  success: function (res) {
			    that.windowWidth = res.windowWidth
			    that.windowHeight = res.windowHeight
			    that.dkheight = res.windowHeight - 60 
			  }
			});
		if (!user_name || user_name == '') {
		  that.modalHiddenUserName = !modalHiddenUserName;
		}
	}
  },
  onReady: function () {},
  mounted() {
  	this.isInit = true; // 标记为true
  	this.mescroll.triggerDownScroll();
  },
  methods: {
	tabSelect(e) {
		this.TabCur = e.currentTarget.dataset.id;
		this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
	},
    goBack: function () {
      wx.switchTab({
        url: '../hall/hall'
      });
    },
    orderSearch: function () {
      var that = this;
      console.log('orderSearch keyword:', that.keyword);
    
	  that.page = 1 ;
	  that.orders = [] ;
      //that.reloadData();
	  this.isInit = true; // 标记为true
	  this.mescroll.triggerDownScroll();
	  
    },
	searchTagTap: function () {
		var that = this;
		var hidddensearch = that.hidddensearch;
		that.hidddensearch = !hidddensearch
	},
	search_goodsnameTapTag: function (e) {
		var that = this;
		var keyword = e.detail.value;
		that.keyword = keyword
		console.log('index search_goodsnameTapTag keyword:', e.detail.value);
    },
    getPhoneNumber: function (e) {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var session_key = wx.getStorageSync('session_key') ? wx.getStorageSync('session_key') : '';
      console.log('index getPhoneNumber:', e.detail.errMsg == "getPhoneNumber:ok");

      if (e.detail.errMsg == "getPhoneNumber:ok") {
        wx.request({
          url: weburl + '/api/client/update_name',
          method: 'POST',
          data: {
            username: username ? username : openid,
            access_token: token,
            appid: appid,
            session_key: session_key,
            type: '1',
            //需要后台解密 encryptedData
            shop_type: shop_type,
            encryptedData: encodeURIComponent(e.detail.encryptedData),
            iv: e.detail.iv
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            var result = res.data.result;
            var phoneNumber = result.phoneNumber;
            wx.setStorageSync('user_phone', phoneNumber);
            that.modalHiddenPhone = !that.modalHiddenPhone
            that.reloadData();
          }
        });
      } else {
        //授权失败，具体进入‘我的’页面
        wx.switchTab({
          url: '../hall/hall'
        });
      }
    },
    //按钮点击事件  获取手机号
    modalBindconfirmPhone: function () {
      var that = this;
      var user_phone = wx.getStorageSync('user_phone') ? wx.getStorageSync('user_phone') : '';

      if (user_phone) {
        that.setData({
          modalHiddenPhone: !that.modalHiddenPhone
        });
      } else {
        var needPhoneNumber = '需要您的手机号授权';
        that.setData({
          needPhoneNumber: needPhoneNumber
        });
      }
    },
    getUserName: function (user_name, user_gender) {
      var that = this;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
	  var weburl = getApp().globalData.weburl;
      if (!user_name || !user_gender) {
        return;
      }

      uni.request({
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
          if (res.data.status == 'y') {
            uni.setStorageSync('user_name', user_name);
			wx.showToast({
			  title: '姓名更新完成',
			  icon: 'none',
			  duration: 1000
			});
            that.reloadData();
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
    user_nameTapTag: function (e) {
      var that = this;
      var user_name = e.detail.value;
      that.setData({
        user_name: user_name
      });
    },
    //按钮点击事件  获取姓名
    modalBindconfirmUsername: function () {
      var that = this;
      var user_name = that.user_name;
      var user_gender = that.user_gender;

      if (user_name && user_gender) {
        that.setData({
          modalHiddenUserName: !that.modalHiddenUserName
        });
        that.getUserName(user_name, user_gender);
      } else {
        var needUserName = '请填写您的姓名和性别';
        that.setData({
          needUserName: needUserName
        });
      }
    },
    radiochange: function (e) {
      var that = this;
      var user_gender = e.detail.value; //console.log('radio发生change事件，携带的value值为：', e.detail.value)

      that.setData({
        user_gender: user_gender
      });
      wx.setStorageSync('user_gender', user_gender);
    },
    //点击按钮指定的hiddenmodalput弹出框  
    modalinput_buyin: function (e) {
      var that = this;
      var sku_index = e.currentTarget.dataset.sku_index;
      var order_index = e.currentTarget.dataset.order_index;
      var goods_id = e.currentTarget.dataset.goods_id;
      var goods_skuid = e.currentTarget.dataset.goods_skuid;
      var order_skuid = e.currentTarget.dataset.id;
      var sku_price = e.currentTarget.dataset.order_sku_price;
      var sku_num = e.currentTarget.dataset.order_sku_num;
      var buyin_rate = that.buyin_rate;
      var buyin_price = (sku_price * sku_num * buyin_rate / 100).toFixed(2);
      console.log('order_index:' + order_index, ' sku_index:', sku_index);
      that.setData({
        hiddenmodalput: !that.hiddenmodalput,
        goods_id: goods_id,
        goods_skuid: goods_skuid,
        order_skuid: order_skuid,
        buyin_price: buyin_price,
        order_index: order_index,
        sku_index: sku_index
      });
    },
    //取消按钮  
    cancel_buyin: function () {
      var that = this;
      that.setData({
        hiddenmodalput: !that.hiddenmodalput
      });
      setTimeout(function () {
        wx.navigateBack();
      }, 500);
    },
    //确认  
    confirm_buyin: function () {
      var that = this;
      that.setData({
        hiddenmodalput: !that.hiddenmodalput
      });
      that.buyin();
    },
    onOrderTapTag: function (e) {
      var that = this;
	  var TabCur = e.currentTarget.dataset.id;
	  var scrollLeft = (e.currentTarget.dataset.id - 1) * 60
      var tab = e.currentTarget.dataset.tab;
      var page = that.page;
     // var index = e.currentTarget.dataset.index;
      var giftflag = that.giftflag;

      if (tab == 'send') {
        giftflag = 0;
      } else {
        giftflag = 1; //receive
      }

		that.TabCur = TabCur 
		that.tab = tab 
		that.orders = []
		that.orders_show = []
		that.orders_prev = []
		that.orders_next = [] 
		that.loadingHidden = true
		that.hiddenmore = true
		that.giftflag = giftflag
		that.all_rows = 0 
		that.page = 0
		that.page_num = 1
      
	  console.log('tab:' , tab, ' TabCur:',TabCur, 'giftflag:', giftflag);

      if (that.orders.length == 0) {
	   that.isInit = true; // 标记为true
	   that.mescroll.triggerUpScroll();
	   
        //that.reloadData();
      }
    },
	
   // 获取滚动条当前位置
   /*
   scrolltoupper: function (e) {
   	var that = this
   	if (e.detail.scrollTop > 100) {
   		that.floorstatus = true 
   	} else {
   		that.floorstatus = false 
   	}
   	
   	that.current_scrollTop = e.detail.scrollTop
   },
   */
  
   scroll: function(e) {
   	var that = this
   	var old_scrollTop = that.old.scrollTop
   	var current_scrollTop = that.mescroll.scrollTop
   	that.old.scrollTop = current_scrollTop
	//console.log('scroll old_scrollTop:', old_scrollTop, 'current_scrollTop:',current_scrollTop);
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
		console.log("order_type:",order_type," mescroll.num:" , mescroll.num , " mescroll.size:" , mescroll.size);
		
		this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData)=>{
			//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
			mescroll.endSuccess(curPageData.length);
			//设置列表数据
			if(mescroll.num == 1|| this.page == 1) {
				this.orders = []; //如果是第一页需手动制空列表
			}
			if(curPageData=='n'){
				mescroll.endByPage(this.page, this.all_rows)
			}else{
				this.orders=this.page==1?curPageData:this.orders.concat(curPageData); //追加新数据
				console.log("mescroll.num:" , mescroll.num , " mescroll.size:" , mescroll.size  ,"  order_type:",order_type," orders:" , this.orders);
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
		var weburl = getApp().globalData.weburl;
		var scrollTop = that.scrollTop; //保留当前位置
		var current_scrollTop = that.current_scrollTop ? that.current_scrollTop : 0; //保留当前位置
		var order_type = that.tab?that.tab:'send';
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
		var order_status = that.order_status;
		var shop_type = that.shop_type;
		var page = that.page==0?1:that.page; //从服务器获取页面序号
		var page_num = that.page_num; //从服务器获取页面数
		var show_max = that.show_max;
		var orders_prev = that.orders_prev;
		var orders_next = that.orders_next;
		var pagesize = that.pagesize;
		var now = new Date().getTime();
		var currenttime = now ? parseInt(now / 1000) : 0;
		var tips = "查看第" + (page == 0 ? 1 : page) + "页";
		var hidddensearch = that.hidddensearch;
		var keyword = hidddensearch ? that.keyword:''  ;
		var userInfo = uni.getStorageSync('userInfo');
		//console.log('reloadData userInfo:', userInfo, ' keyword:', keyword,' hidddensearch:',hidddensearch);
	
		if(page > page_num && page>1) {
			console.log('加载完成 page:', page, 'page_num:',page_num);
			that.is_loading = false ;
			successCallback && successCallback('n');
			return ;
		}else{
			that.is_loading = true ;
			that.status = 'loading';
		}
		
		if( page == 1){
			that.orders = []
			that.orders_show = []
			that.page_num = 0
		}
		
		wx.request({
		  url: weburl + '/api/client/query_order_list',
		  method: 'POST',
		  data: {
		    username: username ? username : openid,
		    access_token: token,
		    status: order_status,
		    shop_type: shop_type,
		    query_type: 'app',
		    order_type: order_type,
		    keyword: keyword,
		    page: page,
		    pagesize: pagesize
		  },
		  header: {
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Accept': 'application/json'
		  },
		  success: function (res) {
		    console.log(res.data);
		    var orderObjects = res.data.result;
		    var all_rows = res.data.all_rows;
		
		    if (!res.data.result) {
					that.status = 'nomore' ;
				    if( page == 1){
						wx.showToast({
						  title: "空空如也,快去送礼吧！",
						  icon: 'none',
						  duration: 1500
						});
						that.orders = []
						that.orders_show = []
						that.all_rows = 0
					}
					//that.mescroll.endErr();
					successCallback && successCallback(res.data.status);
					return;
					
		    } else {
		      // 存储地址字段
		      //var orders = that.orders;
		      if (orderObjects) {
		        for (var i = 0; i < orderObjects.length; i++) {
		          if (orderObjects[i]['logo'].indexOf("http") < 0) {
		            orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo'];
		          }
		
		          if (orderObjects[i]['order_sku']) {
		            for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
		              if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
		                orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
		              }
		
		              orderObjects[i]['order_sku_num'] = orderObjects[i]['order_sku'] ? orderObjects[i]['order_sku'].length : 1;
		            }
		          }
		
		          var duetime = orderObjects[i]['duetime'] - currenttime;
		          orderObjects[i]['hour'] = parseInt(duetime / 3600);
		          orderObjects[i]['minus'] = parseInt((duetime - orderObjects[i]['hour'] * 3600) / 60);
		          orderObjects[i]['sec'] = duetime - orderObjects[i]['hour'] * 3600 - orderObjects[i]['minus'] * 60; //orders.push(orderObjects[i])
		
		          if ((orderObjects[i]['shape'] == 5 || orderObjects[i]['shape'] == 4) && orderObjects[i]['m_desc']) {
		            var m_desc = JSON.parse(orderObjects[i]['m_desc']);
		            var card_register_info = m_desc['card_register_info'] ? m_desc['card_register_info'] : '';
		            var card_name_info = m_desc['card_name_info'] ? m_desc['card_name_info'] : '';
		            var card_love_info = m_desc['card_love_info'] ? m_desc['card_love_info'] : '';
		            var card_cele_info = m_desc['card_cele_info'] ? m_desc['card_cele_info'] : '';
		            var card_template = m_desc['card_template'] ? m_desc['card_template'] : '';
		            var card_type = m_desc['card_register_info'] ? 1 : 0;
		            card_type = m_desc['card_template'] ? m_desc['card_template'][0]['type'] : card_type;
		            orderObjects[i]['card_type'] = card_type;
		            if (card_name_info) orderObjects[i]['card_name_info'] = card_name_info;
		            if (card_love_info) orderObjects[i]['card_love_info'] = card_love_info;
		            if (card_cele_info) orderObjects[i]['card_cele_info'] = card_cele_info;
		            if (card_register_info) orderObjects[i]['card_register_info'] = card_register_info;
		          }
		        } 
				
				//orders = orders.concat(orderObjects)
		        var gift_send = that.gift_send;
		        var gift_rcv = that.gift_rcv;
		        var page_num = that.page_num;
		        page_num = all_rows / pagesize + 0.5;
		
		        if (order_type == 'send') {
		          gift_send = all_rows;
		        } else {
		          gift_rcv = all_rows;
		        } //更新当前显示页信息
					  
				//that.orders = orders
				that.page = page + 1 
				that.page_num = page_num.toFixed(0)
				that.all_rows = all_rows
				that.gift_send = gift_send
				that.gift_rcv = gift_rcv
				that.hiddenmore = false
				that.is_loading = false
				that.status = page_num>page?'more':'nomore';
				that.loadingHidden = false
		        console.log('reloadData page:' + page + ' pagesize:' + pagesize, ' current time:', currenttime, 'current scrollTop', scrollTop, ' orders', JSON.stringify(that.orders));
		      }
				console.log('加载 page:', that.page, 'page_num:',that.page_num);
				successCallback && successCallback(orderObjects)
		    }
		  }
		});
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
    getMoreOrdersTapTag: function () {
      var that = this;
      if (that.is_loading) return;
      var page = that.page;
      var pagesize = that.pagesize;
      var all_rows = that.all_rows;

      if (page + 1 > that.page_num) {
		  /*
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 1500
        });
		*/
     
		that.status = 'nomore';
		that.hiddenmore = true ;
        return;
      } else {
		  /*
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 2000
        });
		*/
	    that.page = page +  1 ;
        console.log('get More Orders page:', page, 'current scrollTop:', that.current_scrollTop);
        //that.reloadData();
      }
    },
    sendAginTapTag: function () {
      var that = this;
      var username = wx.getStorageSync('username');
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      wx.navigateTo({
        url: '../list/list?username=' + username + '&token=' + token
      });
    },
    send: function (e) {
      var that = this;
      var page = that.page;
      var order_no = e.currentTarget.dataset.object_id;
      //var index = e.currentTarget.dataset.index;
      var orders = that.orders;
      var index = 0;
      var order_send = [];

      for (var i = 0; i < orders.length; i++) {
        if (orders[i]['order_no'] == order_no) {
          index = i;
          order_send.push(orders[i]);
          break;
        }
      }

      if (order_send[0]['shape'] == 4 || order_send[0]['shape'] == 5) {
        wx.navigateTo({
          url: '/pages/wish/wishshare/wishshare?share_order_id=' + order_send[0]['id'] + '&share_order_shape=' + order_send[0]['shape'] + '&share_order_note=' + order_send[0]['rcv_note'] + '&share_order_bg=' + order_send[0]['order_sku'][0]['sku_image'] + '&share_order_image=' + order_send[0]['order_sku'][0]['sku_share_image']
        });
        console.log('贺卡请柬互动卡 送出 order no:', order_no, 'order_send:', order_send);
      } else {
        console.log('送出 order no:', order_no, ' order info:', order_send, 'index:', index);
        wx.navigateTo({
          url: '../order/send/send?order_no=' + order_no + '&orders=' + JSON.stringify(order_send)
        });
      }
    },
    sendOtherTapTag: function (e) {
      var that = this;
      var page = that.page;
      var order_no = e.currentTarget.dataset.id; //var index = e.currentTarget.dataset.index

      var orders = that.orders;
      var index = 0;
      var order_send = [];

      for (var i = 0; i < orders.length; i++) {
        if (orders[i]['order_no'] == order_no) {
          index = i;
          order_send.push(orders[i]);
          break;
        }
      }

      uni.navigateTo({
        url: '../order/transfer/transfer?receive=-1&order_no=' + order_no + '&orders=' + JSON.stringify(order_send)
      });
    },
    refundTapTag: function (e) {
      var that = this;
      var order_no = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type; //提交退款申请
	  var weburl = getApp().globalData.weburl;
      wx.request({
        url: weburl + '/api/client/refund',
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
    detailTapTag: function (order_no='',order_id=0) {
      var that = this;
     // var order_object = e.currentTarget.dataset.orderObject;
      
      var card_type = that.card_type ? that.card_type : 0;
      var tab2 = that.tab2;
      console.log('index detail 订单 order no:' + order_no+' oder id:'+order_id);
      uni.navigateTo({
        url: '/pages/order/orderdetail/orderdetail?order_id=' + order_id + '&order_no=' + order_no + '&giftflag=' + that.giftflag + '&card_type=' + card_type + '&send_rcv=' + tab2
      });
    },
    get_project_gift_para: function () {
      var that = this;
      var navList_new = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [{}];
      //var shop_type = that.shop_type;
	  var weburl = getApp().globalData.weburl;
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
	  var weburl = getApp().globalData.weburl;
      var scrollTop = that.scrollTop; //保留当前位置
      var current_scrollTop = that.current_scrollTop ? that.current_scrollTop : 0; //保留当前位置
      var order_type = that.tab?that.tab:'send';
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
      var order_status = that.order_status;
      var shop_type = that.shop_type;
      var page = that.page; //从服务器获取页面序号
      var page_num = that.page_num; //从服务器获取页面数
      var show_max = that.show_max;
      var orders_prev = that.orders_prev;
      var orders_next = that.orders_next;
      var pagesize = that.pagesize;
      var now = new Date().getTime();
      var currenttime = now ? parseInt(now / 1000) : 0;
      var tips = "查看第" + (page == 0 ? 1 : page) + "页";
      var hidddensearch = that.hidddensearch;
      var keyword = hidddensearch ? that.keyword:''  ;
      var userInfo = uni.getStorageSync('userInfo');
      //console.log('reloadData userInfo:', userInfo, ' keyword:', keyword,' hidddensearch:',hidddensearch);

  	  that.status = 'loading';
	
      if (page > page_num && page_num > 0) return;
	that.is_loading = true
	if( page == 1){
		that.orders = []
		that.orders_show = []
		that.all_rows = 0
	}
      wx.request({
        url: weburl + '/api/client/query_order_list',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          status: order_status,
          shop_type: shop_type,
          query_type: 'app',
          order_type: order_type,
          keyword: keyword,
          page: page > page_num ? page_num : page,
          pagesize: pagesize
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          var orderObjects = res.data.result;
          var all_rows = res.data.all_rows;

          if (!res.data.result) {
            
			that.status = 'nomore' ;
		
		    if( page == 1){
				wx.showToast({
				  title: "空空如也,快去送礼吧！",
				  icon: 'none',
				  duration: 1500
				});
				that.orders = []
				that.orders_show = []
				that.all_rows = 0
			}
			
          } else {
            // 存储地址字段
            var orders = that.orders;
            if (orderObjects) {
              for (var i = 0; i < orderObjects.length; i++) {
                if (orderObjects[i]['logo'].indexOf("http") < 0) {
                  orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo'];
                }

                if (orderObjects[i]['order_sku']) {
                  for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
                    if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
                      orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
                    }

                    orderObjects[i]['order_sku_num'] = orderObjects[i]['order_sku'] ? orderObjects[i]['order_sku'].length : 1;
                  }
                }

                var duetime = orderObjects[i]['duetime'] - currenttime;
                orderObjects[i]['hour'] = parseInt(duetime / 3600);
                orderObjects[i]['minus'] = parseInt((duetime - orderObjects[i]['hour'] * 3600) / 60);
                orderObjects[i]['sec'] = duetime - orderObjects[i]['hour'] * 3600 - orderObjects[i]['minus'] * 60; //orders.push(orderObjects[i])

                if ((orderObjects[i]['shape'] == 5 || orderObjects[i]['shape'] == 4) && orderObjects[i]['m_desc']) {
                  var m_desc = JSON.parse(orderObjects[i]['m_desc']);
                  var card_register_info = m_desc['card_register_info'] ? m_desc['card_register_info'] : '';
                  var card_name_info = m_desc['card_name_info'] ? m_desc['card_name_info'] : '';
                  var card_love_info = m_desc['card_love_info'] ? m_desc['card_love_info'] : '';
                  var card_cele_info = m_desc['card_cele_info'] ? m_desc['card_cele_info'] : '';
                  var card_template = m_desc['card_template'] ? m_desc['card_template'] : '';
                  var card_type = m_desc['card_register_info'] ? 1 : 0;
                  card_type = m_desc['card_template'] ? m_desc['card_template'][0]['type'] : card_type;
                  orderObjects[i]['card_type'] = card_type;
                  if (card_name_info) orderObjects[i]['card_name_info'] = card_name_info;
                  if (card_love_info) orderObjects[i]['card_love_info'] = card_love_info;
                  if (card_cele_info) orderObjects[i]['card_cele_info'] = card_cele_info;
                  if (card_register_info) orderObjects[i]['card_register_info'] = card_register_info;
                }
              } 
			  //if (page > 1 && orderObjects) {
              //向后合拼
              //}

              //orders.push(orderObjects);
			  orders = orders.concat(orderObjects)
              var gift_send = that.gift_send;
              var gift_rcv = that.gift_rcv;
              var page_num = that.page_num;
              page_num = all_rows / pagesize + 0.5;

              if (order_type == 'send') {
                gift_send = all_rows;
              } else {
                gift_rcv = all_rows;
              } //更新当前显示页信息

             
			  that.orders = orders
			  that.page_num = page_num.toFixed(0)
			  that.all_rows = all_rows
			  that.gift_send = gift_send
			  that.gift_rcv = gift_rcv
			  that.hiddenmore = false
			  that.is_loading = false
			  that.status = page_num>page?'more':'nomore';
			  that.loadingHidden = false
              //console.log('reloadData page:' + page + ' pagesize:' + pagesize, ' current time:', currenttime, 'current scrollTop', scrollTop, ' orders', that.orders);
            }

            if (order_type == 'send') {
              setTimeout(function () {
                that.duetime_update();
              }, 500);
            }
          }
        }
      });
    },
	*/
    duetime_update: function () {
      var that = this;
      var page = that.page;
      var now = new Date().getTime();
      var currenttime = now ? parseInt(now / 1000) : 0;
	  var has_sent = getApp().globalData.has_sent
	  //console.log('index duetime_update() has_sent:', has_sent, ' currenttime:', currenttime); //礼物折现
	  if(has_sent == 1){ //礼物发送微信后返回标志
		getApp().globalData.has_sent = 0 ;
		that.page = 1 ;
		that.orders = [] ;
		that.reloadData();
		return ;
	  } 
      if (!that.orders) return;
      //var orderObjects = that.orders; //console.log('duetime page:',page,' orders[page]',that.data.orders[page-1])

      for (var i = 0; i < that.orders.length; i++) {
        var duetime = that.orders[i]['duetime'] - currenttime;
        that.orders[i]['hour'] = parseInt(duetime / 3600);
        that.orders[i]['minus'] = parseInt((duetime - that.orders[i]['hour'] * 3600) / 60);
        that.orders[i]['sec'] = duetime - that.orders[i]['hour'] * 3600 - that.orders[i]['minus'] * 60;
      }
		
      setTimeout(function () {
        that.duetime_update();
      }, 500);
    },
	
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
            var orders = that.orders_show[page - 1];
            orders[order_index]['order_sku'][sku_index]['status'] = 1;
            that.setData({
              //orders: orders,
              ["orders_show[" + (page - 1) + "]"]: orders
            });
          }
        }
      });
    },
    comment: function (e) {
      var goods_id = e.goods_id;
      var goods_skuid = e.sku_id;
      var order_skuid = e.id;
      console.log('礼物评价 goods_id:', goods_id, 'goods skuid:', goods_skuid, 'order skuid:', order_skuid,' sku info:',JSON.stringify(e));
      uni.navigateTo({
        url: '../goods/comment/comment?goods_id=' + goods_id + '&goods_skuid=' + goods_skuid + '&order_skuid=' + order_skuid
      });
    },
    accept: function (e) {
      var that = this;
      var order_no = e.currentTarget.dataset.object_id;
      var totalFee = e.currentTarget.dataset.total_fee;
      var order_id = e.currentTarget.dataset.order_id;
      var orders = that.orders;
      var order_accept = [];
      console.log('接受礼物order_no:', order_no);
      var index = 0;

      for (var i = 0; i < orders.length; i++) {
        if (orders[i]['order_no'] == order_no) {
          index = i;
          order_accept.push(orders[i]);
          break;
        }
      }

      uni.navigateTo({
        url: '../order/receive/receive?order_no=' + order_no + '&order_id=' + order_id + '&receive=1' + '&order_shape=' + order_accept[0]['shape'] + '&goods_flag=0'
      });
    },
    pay: function (e) {
      var order_no = e.currentTarget.dataset.object_id;
      var totalFee = e.currentTarget.dataset.total_fee;
      console.log('pay order_no:', order_no,' totalFee:',totalFee);
      uni.navigateTo({
        url: '../order/payment/payment?orderNo=' + order_no + '&totalFee=' + totalFee + '&received=1'
      });
    },
    cancel_order: function (e) {
      var that = this;
	  var weburl = getApp().globalData.weburl;
      var page = that.page;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var order_no = e.currentTarget.dataset.object_id;
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
                  var orders = that.orders[page - 1];
                  orders[order_index]['status'] = 8; // 8 订单取消

                  that.setData({
                    //orders: orders,
                    ["orders[" + (page - 1) + "]"]: orders
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
	  var weburl = getApp().globalData.weburl;
      wx.showModal({
        title: '请确认',
        content: '确认要收货吗',
        success: function (res) {
          if (res.confirm) {
            var objectId = e.currentTarget.dataset.object_id;
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
      uni.navigateTo({
        url: '../details/details?sku_id=' + skuId + '&goods_name=' + goods_name + '&id=' + goods_id + '&token=' + token + '&username=' + username
      });
    },

    getPrevOrdersTapTag() {
      var that = this;
      var page = that.page;
      var last_page = page - 1 > 0 ? page - 1 : 1;
      var is_loading = that.is_loading;
      console.log('getPrevOrdersTapTag:下拉刷新 page:', page, ' is loading:', is_loading, ' last_page:', last_page, 'current scrollTop:', that.current_scrollTop);

      if (page == 1 || is_loading) {
        return;
      }

      that.setData({
        page: last_page
      });
      that.reloadData();
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
@import "./index.css";
</style>