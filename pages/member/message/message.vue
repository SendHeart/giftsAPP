<template>
<view class="page" :style="'height:'+windowHeight">
	<uni-nav-bar :fixed="true" color="#fff" background-color="#1d1d1d"></uni-nav-bar>
	<!--
	
	<scroll-view scroll-x class="bg-black nav text-center">
		<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in navList_order" :key="index" @tap="onOrderTapTag" :data-id="index" :data-tab="item.id">
			{{item.title}}
		</view>
	</scroll-view>
	-->
	<view class="top-bar2">
	  <block v-for="(item, index) in navList_order" :key="index">
	    <view :id="'v_' + index" :data-id="index" :data-title="item.title" :data-tab="item.id" :class="'top-bar-item2 ' + (index == TabCur ? 'top-bar-active2' : '')" @click.stop="onOrderTapTag">
	      <view style="height:70rpx;line-height: 70rpx;">{{item.title}}</view>
	    </view>
	  </block>
	</view>
	<view class="container"> 
		<view v-if="messageflag==2" v-for="(rlist, rindex) in rule_list" :key="rindex" class="ai-goods">
			<view class="goods-item" v-if="(rindex==selected_num)"> 
				<view class="ai-goods-title">{{rlist.title}}</view>
				<view class="goods-item-list">
					<block v-for="(ritem, rindex2) in rlist.item_name" :key="rindex2"> 
						<view @tap="rule_select" :class="(rindex2==rlist.selected?'goods-item-content2':'goods-item-content')" :data-goods-item-id="rlist.id" :data-goods-item-index="rindex2">{{ritem}}</view>
					</block>
				</view>
			</view>
		</view> 
		<view v-if="messageflag==2" class="opt-buttons">
			<form @submit="formSubmit" data-name="selectBtn_last" report-submit="true" :hidden="selected_start">
				<button class="opt-button2" formType="submit">返回上一项</button> <!-- bindtap="selectBtnTap" -->
			</form>
			<form @submit="formSubmit" data-name="selectBtn_next" report-submit="true" :hidden="selected_all">
				<button class="opt-button" style="width:300rpx;margin-left:50rpx;" formType="submit">继续</button>
			</form>
			<form @submit="formSubmit" data-name="selectBtn" report-submit="true" :hidden="!selected_all">
				<button class="opt-button" style="width:300rpx;margin-left:50rpx;" formType="submit">开始推荐</button> <!-- bindtap="selectBtnTap" -->
			</form>
		</view>

		<view v-if="messageflag==3" :class="'loadingshow ' + (isLoadingTrue?'isLoadingShow':'isLoadingHide')" :style="'height:' + dkheight + 'px;'" catchtouchmove="move">
			<view class="select-goods-list">
				<view class="select-goods" :style="'height:' + dkheight-80 + 'px;'">
					<image class="img-loading" :src="loading_img"></image> <!-- ../../../images/loading.gif-->
					<text class="loadingtext">正在为您挑选中...</text>
				</view>
			</view>
		</view>
	<view v-if="messageflag==3" class="select-goods-list">
		<view class="select-goods">
			<view class="select-goods-title1">最佳推荐</view>
			<view class @tap="showGoods" :data-goods-id="select_goods_list.id" :data-image="select_goods_list.image" :data-goods-name="select_goods_list.name" :data-goods-price="select_goods_list.sell_price">
				<image class="select-goods-image" :src="(select_goods_list.activity_image?select_goods_list.activity_image:select_goods_list.image)" mode="aspectFill"></image>
				<view class="select-goods-content">{{select_goods_list.name}}</view>
				<view class="select-goods-content" style="color:#999;font-weight:normal;">{{select_goods_list.act_info}}</view>
				<view class="price-list"> 
          <!--{{select_goods_list.market_price>0?'市场价':''}} <view class="price-market">{{select_goods_list.market_price>0?'￥'+select_goods_list.market_price+' ':''}}</view>-->
					{{select_goods_list.market_price>0?'':''}}<view class="price-now">￥{{select_goods_list.sell_price}}</view>
				</view>
			</view>
		<view class="opt-buttons">
			<form @submit="formSubmit" data-name="addCart" :data-goods-id="select_goods_list.id" report-submit="true">
				<view style="margin-top:10rpx;margin-bottom:10rpx;">
					<button class="send-button" formType="submit">立即送出</button> <!-- bindtap="addCart" -->
				</view>
			</form>
		</view>
    </view>
    <view v-if="select_goods_1" class="select-goods">
      <view class="select-goods-title">备选一</view>
      <view class @tap="showGoods" :data-goods-id="select_goods_1.id" :data-image="select_goods_1.image" :data-goods-name="select_goods_1.name" :data-goods-price="select_goods_1.sell_price">
        <image class="select-goods-image" :src="select_goods_1.image" mode="aspectFill"></image>
        <view class="select-goods-content">{{select_goods_1.name}}</view>
        <view class="select-goods-content" style="color:gray">{{select_goods_1.act_info}}</view>
         <view class="price-list"> 
           {{select_goods_1.market_price>0?'':''}} <view class="price-market">{{select_goods_1.market_price>0?'￥'+select_goods_1.market_price+' ':''}}</view>
          {{select_goods_1.market_price>0?'':''}}<view class="price-now">￥{{select_goods_1.sell_price}}</view>
        </view>
      </view>
       <view class="opt-buttons">
        <form @submit="formSubmit" data-name="addCart" :data-goods-id="select_goods_1.id" report-submit="true">
        <view style="margin-top:10rpx;margin-bottom:10rpx;">
          <button class="send-button" type="warn" formType="submit" size="mini" hover-class="button-hover">立即送出</button>
        </view>
      </form>
      </view>
    </view>
    <view v-if="select_goods_2" class="select-goods">
      <view class="select-goods-title">备选二</view>
      <view class @tap="showGoods" :data-goods-id="select_goods_2.id" :data-image="select_goods_2.image" :data-goods-name="select_goods_2.name" :data-goods-price="select_goods_2.sell_price">
        <image class="select-goods-image" :src="select_goods_2.image" mode="aspectFill"></image>
        <view class="select-goods-content">{{select_goods_2.name}}</view>
        <view class="select-goods-content" style="color:gray">{{select_goods_2.act_info}}</view>
        <view class="price-list">   
           {{select_goods_2.market_price>0?'':''}} <view class="price-market">{{select_goods_2.market_price>0?'￥'+select_goods_2.market_price+' ':''}}</view>
          {{select_goods_2.market_price>0?'':''}}<view class="price-now">￥{{select_goods_2.sell_price}}</view>
        </view> 
      </view>
       <view class="opt-buttons">
        <form @submit="formSubmit" data-name="addCart" :data-goods-id="select_goods_2.id" report-submit="true">
        <view style="margin-top:10rpx;margin-bottom:10rpx;">
          <button class="send-button" type="warn" formType="submit" size="mini" hover-class="button-hover">立即送出</button>
        </view>
        </form>
      </view>
    </view>
    <view class="sentbtn">
      <text @tap="goBack">以上推荐都不合适，我要自己选</text>
    </view>
  </view>
  <view v-if="messageflag==9" class="select-goods-list">
    <view class="select-goods">
      <view class="noselect-goods-info">亲，暂无推荐的礼品，请简化条件</view> 
      <view class="opt-buttons">
        <view style="margin-top:50rpx;margin-bottom:20rpx;">
          <button type="warn" size="mini" hover-class="button-hover" class="button" @tap="tryagain">再试一次</button>
        </view>
      </view>
      <view class="sentbtn">
        <text @tap="goBack">我要自己手动挑选</text>
      </view>
    </view>
  </view>
  <view v-if="messageflag==0" v-for="(blist, index) in task_list" :key="index" class="msg-list">
    <view class="msg-title">
      <text>{{blist.addtime}}</text> 
		  <text @tap="task_action" :data-msg-id="blist.msg_id" :data-task-status="blist.task_info.task_status" :data-url="blist.message_info.url" :data-image="blist.message_info.image" :style="((blist.task_info.task_status==9||blist.msg_status==1)?' color:#999':' color:#e34c55') + ';'">{{(blist.task_info.task_status==9||blist.msg_status==1)?'已完成':'未完成，继续'}}</text>
    </view>
    <view class="msg-item" @tap="task_action">
      <image class="msg-item-image" :data-order-no="blist.message_info.order_no" :data-list="blist.message_info.image" :data-message="blist.message_info.message" :data-message-type="blist.message_info.message_type" :data-amount="blist.message_info.amount" :data-amount-type="blist.message_info.amount_type" :data-content="blist.message_info.content" :data-footer="blist.message_info.footer" :data-accept-time="blist.message_info.accept_time" :data-start-time="blist.message_info.start_time" :data-end-time="blist.message_info.end_time" :data-image="blist.message_info.image" :src="blist.message_info.image" mode="aspectFill"></image>
      <view class="msg-item-content">
          <text class="msg-item-text">{{blist.title}}</text>
          <text class="msg-item-text2">{{blist.message_info.message}}</text> 
      </view>
    </view>
  </view>
  <view v-if="messageflag==1" v-for="(blist, index) in message_list" :key="index" class="msg-list">
    <view class="msg-title">
      <text class="msg-item-text3">{{blist.title}}</text>
		  <text @tap="message_action" :data-msg-id="blist.msg_id" :data-msg-type="blist.type" :data-coupon-id="blist.message_info.coupon_id" :data-amount-type="blist.message_info.amount_type" style="color:#fff;background:#e34c55;">{{(blist.type==4)?'领取奖励':''}}</text>  
      <text>{{blist.addtime}}</text>
    </view>
    <view class="msg-item" @tap="imgYu" :data-list="blist.message_info.image" :data-message="blist.message_info.message" :data-order-no="blist.message_info.order_no" :data-message-type="blist.message_info.message_type" :data-amount="blist.message_info.amount" :data-amount-type="blist.message_info.amount_type" :data-content="blist.message_info.content" :data-footer="blist.message_info.footer" :data-accept-time="blist.message_info.accept_time" :data-start-time="blist.message_info.start_time" :data-end-time="blist.message_info.end_time">
       <image class="msg-item-image" :data-image="blist.message_info.image" :src="blist.message_info.image" mode="aspectFill"></image>
      <view class="msg-item-content">
          <text :class="(blist.message_info.message_type==6?'msg-item-text':'msg-item-text2')">{{blist.message_info.message}}</text>
      </view>
    </view>
  </view>
   <view v-if="page_num>1 & messageflag==1" hover-class="none" class="morebtn" @tap="getMoreAccountTapTag">查看更多 ({{page}}/{{page_num}})</view>
</view> 

 <view class="message" :hidden="messageHidden" @tap="messageConfirm" :style="'height:' + dkheight + 'px;'">
    <view class="t_w">
      <!--右上角图标开始-->
      <!-- 
      <view class="t_image"  bindtap="messageCandel">
        <image class="t_image1" src="{{resp_message.image}}"></image>
      </view>
      -->
      <!--右上角图标结束-->
      <!--弹出框开始-->
      <!-- 红包 -->
      <view v-if="message.message_type==1||message.message_type==2" class="red-item" :style="'background-image:url(' + $1 + '); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;'">
          <!-- <view class="bg_view">{{resp_message.title}}</view> -->
          <text class="red-name">{{message.message}}</text>
          <text class="red-value">{{message.message_type==1?'现金￥'+message.amount+'元':'积分:'+message.amount}}</text>
          <text class="red-content">{{message.content}}</text>
          <text class="red-footer">{{message.footer}}</text>
          <text class="red-dueday">{{message.start_time?'(有效期:'+message.start_time+'至':''}}{{message.end_time?message.end_time+')':''}}</text>
          <!-- 
          <view class="txtys">{{resp_message.message}}</view>
          -->
          <!--确定开始-->
          <!-- 
          <view class="txtsure">
            <view class="txtsurebg" bindtap="messageCandel">
              <text class="txtsurename">确定</text>
            </view>        
          </view>
          -->
          <!--确定结束-->
      </view>
      <!-- 优惠券 -->
      <view v-if="message.message_type==3" class="coupon-item" :style="'height:150px;background-image:url(' + $1 + '); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;'">
        <text class="coupon-name">{{message.message}}</text>
        <text class="coupon-content">{{message.content}}</text>
        <text class="coupon-footer">{{message.footer}}</text>
        <text class="coupon-dueday">{{message.start_time?'(有效期:'+message.start_time+'至':''}}{{message.end_time?message.end_time+')':''}}</text>
      </view>
      <!-- 消息通知 -->
      <view v-if="message.message_type>3" class="coupon-item" :style="'background-image:url(' + $1 + '); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;height:130rpx; text-align: left;align-items: left; padding:20rpx;'">
        <text class="coupon-name" style="font-size:30rpx; text-overflow:ellipsis; white-space:wrap;">{{message.message}}</text>
      </view>
    </view>
     <!--弹出框结束-->
  </view>
<view :hidden="hiddenmodalput" title="提现" confirm-text="确定" cancel-text="返回" @cancel="cancel_withdraw" @confirm="confirm_withdraw">
  <view class="select-and-amount-mark">
	</view>
</view>
</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import permision from "@/common/permission.js"
var util = require("utils/util.js");
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var messageflag = getApp().globalData.messageflag;
var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
var navList_order = [{
  id: "AI",
  title: "智能选礼"
}, {
  id: "task",
  title: "任务"
}, {
  id: "message",
  title: "消息"
}];
var now = new Date().getTime();

export default {
  data() {
    return {
      new_task_image: weburl + "/uploads/gift_logo.png",
      //默认的新人送礼图片
      loading_img: weburl + "/uploads/loading.gif",
      shop_type: shop_type,
      user: null,
      userInfo: {},
      nickname: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      username: null,
      indicatorDots: false,
      vertical: false,
      autoplay: true,
      page: 1,
      pagesize: 10,
      all_rows: 0,
      page_num: 0,
      hiddenmodalput: true,
      withdrawNum: null,
      withdrawWx: null,
      withdraw_selected: 1,
      message_list: [],
      task_list: [],
      messageHidden: true,
      dkheight: 300,
      message: {},
      messageflag: messageflag,
      noselected: 0,
      selected_num: 0,
      selected_all: false,
      selected_start: true,
      rules_length: 5,
      //默认规则种类数 
      task_num: 0,
      message_num: 0,
      navList_order: navList_order,
      tab2: 'task',
      activeIndex2: 0,
	  TabCur: 0,
	  scrollLeft: 0,
      currenttime: now ? parseInt(now) : 0,
      message_type: 0,
      goods_id: "",
      orderObjects: "",
      rule_list: "",
      rule_selected_info: "",
      isLoadingTrue: false,
      rule_goods_list: "",
      select_goods_list: "",
      select_goods_1: "",
      select_goods_2: "",
      commodityAttr: "",
      sku_id: "",
      attrValueList: ""
    };
  },

  components: {
	  uniIcons,
	  uniNavBar,
  },
  props: {},
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight;
        console.log('getSystemInfo:', winHeight);
        that.setData({
          dkheight: winHeight
        });
      }
    });
	that.getPermission();
  },
  onShow: function () {
    var that = this;
    var activeIndex2 = 0;
	var TabCur = that.TabCur ;

    if (getApp().globalData.messageflag == 0) {
      TabCur = 1;
    } else if (getApp().globalData.messageflag == 1) {
      TabCur = 2;
    } else {
      TabCur = 0;
    }

    console.log('message onShow messageflag:', getApp().globalData.messageflag, 'activeIndex2:', activeIndex2);
   that.TabCur = TabCur
   that.messageflag = getApp().globalData.messageflag

    if (TabCur == 0) {
      that.get_ai_rules();
    } else {
      that.get_member_messages();
    }
  },
  onPullDownRefresh: function () {//下拉刷新
    //wx.startPullDownRefresh()
    //wx.stopPullDownRefresh()
  },
  methods: {
	  // #ifdef APP-PLUS
	  async getPermission() {
	  	let status = await this.checkPermission(); 
	  },
	  		
	  async checkPermission(code) {
	  	let status_push = permision.isIOS ? await permision.requestIOS('push') :
	  		1;
	  	if (status_push === null || status_push === 1) {
	  		status_push = 1;
	  	} else {
	  		uni.showModal({
	  			content: "需要推送权限",
	  			confirmText: "设置",
	  			success: function(res) {
	  				if (res.confirm) {
	  					permision.gotoAppSetting();
	  				}
	  			}
	  		})
	  	}
	  	let status_WRITE_EXTERNAL_STORAGE =  permision.isIOS ? 1 :await permision.requestAndroid('android.permission.WRITE_EXTERNAL_STORAGE');
	  	if (status_WRITE_EXTERNAL_STORAGE === null || status_WRITE_EXTERNAL_STORAGE === 1) {
	  		status_WRITE_EXTERNAL_STORAGE = 1;
	  	} else {
	  		uni.showModal({
	  			content: "需要写数据权限",
	  			confirmText: "设置",
	  			success: function(res) {
	  				if (res.confirm) {
	  					permision.gotoAppSetting();
	  				}
	  			}
	  		})
	  	}
	  	let status_READ_EXTERNAL_STORAGE =  permision.isIOS ? 1 :await permision.requestAndroid('android.permission.READ_EXTERNAL_STORAGE');
	  	if (status_READ_EXTERNAL_STORAGE === null || status_READ_EXTERNAL_STORAGE === 1) {
	  		status_READ_EXTERNAL_STORAGE = 1;
	  	} else {
	  		uni.showModal({
	  			content: "需要读数据权限",
	  			confirmText: "设置",
	  			success: function(res) {
	  				if (res.confirm) {
	  					permision.gotoAppSetting();
	  				}
	  			}
	  		})
	  	}
	  	let status = (status_push && status_WRITE_EXTERNAL_STORAGE && status_READ_EXTERNAL_STORAGE)?1:0
	  	return status;
	  },
	  
	  // #endif
	tabSelect(e) {
		this.TabCur = e.currentTarget.dataset.id;
		this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60	
	},  
    formSubmit: function (e) {
      var that = this;
      var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name;
      console.log('formSubmit() formID：', formId, ' form name:', form_name);
		
      if (form_name == 'selectBtn') {
        that.selectBtnTap();
      } else if (form_name == 'addCart') {
        var goods_id = e.currentTarget.dataset.goodsId;
        that.goods_id = goods_id
        that.addCart();
      } else if (form_name == 'selectBtn_next') {
        var selected_num = that.selected_num + 1;
        var rules_length = that.rules_length - 1;
        that.selected_num = selected_num <= rules_length ? selected_num : rules_length
        that.selected_all= selected_num == rules_length ? true : false
        that.selected_start = selected_num == 0 ? true : false
      } else if (form_name == 'selectBtn_last') {
        var selected_num = that.selected_num - 1;
        var rules_length = that.rules_length - 1;
        that.selected_num = selected_num <= 0 ? 0 : selected_num
        that.selected_all = selected_num == rules_length ? true : false
        that.selected_start = selected_num == 0 ? true : false
      }
    },
    
    showGoods: function (e) {
      var that = this; // 点击购物车某件商品跳转到商品详情

      var objectId = e.currentTarget.dataset.objectId;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_id = e.currentTarget.dataset.goodsId;
      var goods_name = e.currentTarget.dataset.goodsName;
      var goods_price = e.currentTarget.dataset.goodsPrice;
      var goods_info = e.currentTarget.dataset.goodsInfo;
      var goods_sale = e.currentTarget.dataset.sale;
      var image = e.currentTarget.dataset.image;
      var rule_selected_info = that.rule_selected_info; //var carts = this.data.carts;

      var sku_id = objectId;

      if (!rule_selected_info) {
        var rule_list = that.rule_list;
        rule_selected_info = '';

        for (var i = 0; i < rule_list.length; i++) {
          var selected = rule_list[i]['selected'];
          rule_selected_info = rule_selected_info + '"' + rule_list[i]['id'] + '":"' + rule_list[i]['item_name'][selected] + '"';
        }

        rule_selected_info = '{' + rule_selected_info + '}';
      }

      wx.navigateTo({
        url: '/pages/details/details?sku_id=' + objectId + '&id=' + goods_id + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&name=' + goods_name + '&image=' + image + '&rule_selected_info=' + rule_selected_info + '&token=' + token + '&username=' + username
      });
    },
    onOrderTapTag: function (e) {
      var that = this; 
	  this.TabCur = e.currentTarget.dataset.id;
	  this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
      var tab = e.currentTarget.dataset.tab;
      var index = e.currentTarget.dataset.index;
      var messageflag = that.messageflag;
      var message_type = that.message_type;

      if (tab == 'task') {
        //task
        messageflag = 0;
        getApp().globalData.messageflag = messageflag;
        message_type = 0;
      } else if (tab == 'AI') {
        messageflag = 2; //message
        getApp().globalData.messageflag = messageflag;
      } else {
        messageflag = 1; //message
        getApp().globalData.messageflag = messageflag;
        message_type = 5;
      }

     that.activeIndex2 = index
     that.tab2 = tab
     that.page = 1
     that.messageflag = messageflag
     that.message_type = message_type
     that.message_list = []
	 
      console.log('tab:' + tab, ' messageflag:', messageflag, 'activeIndex2:', that.activeIndex2); //that.reloadData()

      if (that.TabCur == 0) {
        that.get_ai_rules();
      } else {
        that.get_member_messages();
      }
    },
    bindChangeNum: function (e) {
      var that = this;
      var withdrawNum = e.detail.value;
      that.withdrawNum = withdrawNum
      console.log('withdrawNum:' + that.withdrawNum);
    },
    bindChangeWx: function (e) {
      var that = this;
      var withdrawWx = e.detail.value;
      that.setData({
        withdrawWx: withdrawWx
      });
      console.log('withdrawWx:' + that.withdrawWx);
    },

    /** 
       * 预览图片
       */
    imgYu: function (event) {
      var that = this;
      var shop_type = that.shop_type;
      var src = event.currentTarget.dataset.src; //获取data-src

      var order_no = event.currentTarget.dataset.orderNo;
      var message_type = event.currentTarget.dataset.messageType;
      var imgList = [];
      imgList.push(event.currentTarget.dataset.list); //获取data-list

      if (order_no) {
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
            console.log('message gift info:', res.data.result);
            var orderObjects = res.data.result;
            var sku_id = that.sku_id;

            if (!res.data.info) {
              var order_price = 0;

              for (var i = 0; i < orderObjects.length; i++) {
                if (res.data.result[i]['logo'].indexOf("http") < 0) {
                  orderObjects[i]['logo'] = weburl + orderObjects[i]['logo'];
                }

                for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
                  if (res.data.result[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
                    orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
                  }

                  if (sku_id != '') {
                    sku_id = sku_id + ',' + orderObjects[i]['order_sku'][j]['sku_id'];
                  } else {
                    sku_id = orderObjects[i]['order_sku'][j]['sku_id'];
                  }
                } //order_price = order_price + orderObjects[i]['order_price']

              } //totalFee = order_price.toFixed(2) * 100


              that.setData({
                orderObjects: orderObjects[0]
              });
              wx.navigateTo({
                url: '/pages/order/orderdetail/orderdetail?order_object=' + JSON.stringify(that.orderObjects) + '&order_id=' + orderObjects['id']
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
      } else {
        //图片预览
        wx.previewImage({
          current: src,
          // 当前显示图片的http链接
          urls: imgList // 需要预览的图片http链接列表

        });
      }
    },
    //领取 
    message_action: function (e) {
      var that = this;
      var msg_id = e.currentTarget.dataset.msgId;
      var msg_type = e.currentTarget.dataset.msgType;
      var coupon_id = e.currentTarget.dataset.couponId;
      var coupons_type = e.currentTarget.dataset.amountType;

      if (msg_type == 4) {
        if (coupons_type == 1) {
          coupons_type = 2;
        } else if (coupons_type == 2) {
          coupons_type = 3;
        } else {
          coupons_type = 1;
        }

        wx.navigateTo({
          url: '/pages/member/couponrcv/couponrcv?receive=1&coupons_flag=9&coupons_type=' + coupons_type + '&coupons_id=' + coupon_id + '&msg_id=' + msg_id
        });
      } else if (msg_type == 6) {
        wx.switchTab({
          url: '/pages/member/task/task'
        });
      }
    },
    //领取 
    task_action: function (e) {
      var that = this;
      var msg_id = e.currentTarget.dataset.msgId;
      var task_status = e.currentTarget.dataset.taskStatus ? e.currentTarget.dataset.taskStatus : 0;
      var image = e.currentTarget.dataset.image;

      if (task_status < 9) {}

      wx.navigateTo({
        url: '/pages/member/task/task?task=1&image=' + image + '&msg_id=' + msg_id
      });
    },
    //选规则 
    rule_select: function (e) {
      var that = this;
      var rule_list = that.rule_list;
      var goods_item_id = e.currentTarget.dataset.goodsItemId;
      var goods_item_index = e.currentTarget.dataset.goodsItemIndex;
      var rule_selected_info = '';

      for (var i = 0; i < rule_list.length; i++) {
        if (rule_list[i]['id'] == goods_item_id) {
          rule_list[i]['selected'] = goods_item_index; //break
        }

        var selected = rule_list[i]['selected'];
        rule_selected_info = rule_selected_info + '"' + rule_list[i]['id'] + '":"' + rule_list[i]['item_name'][selected] + '"';
      }

      rule_selected_info = '{' + rule_selected_info + '}';
      that.setData({
        rule_list: rule_list,
        rule_selected_info: rule_selected_info
      });
      console.log('rule_selected_info:', rule_selected_info);
    },
    //确定按钮点击事件 
    messageConfirm: function () {
      var that = this;
      var messageHidden = that.messageHidden;
      that.setData({
        messageHidden: !messageHidden
      });
    },
    message_detail: function (e) {
      var that = this;
      var message_info = e.currentTarget.dataset.message;
      var message_type = e.currentTarget.dataset.messageType;
      var amount = e.currentTarget.dataset.amount;
      var amount_type = e.currentTarget.dataset.amountType;
      var footer = e.currentTarget.dataset.footer;
      var content = e.currentTarget.dataset.content;
      var accept_time = e.currentTarget.dataset.acceptTime;
      var start_time = e.currentTarget.dataset.startTime;
      var end_time = e.currentTarget.dataset.endTime;
      var image = e.currentTarget.dataset.image;
      var messageHidden = that.messageHidden;
      var message = that.message;
      start_time = util.getDateStr(start_time * 1000, 0);
      end_time = util.getDateStr(end_time * 1000, 0);
      if (message_type > 3) return;
      message = {
        message: message_info,
        message_type: message_type,
        amount: amount,
        amount_type: amount_type,
        footer: footer,
        content: content,
        start_time: start_time,
        end_time: end_time,
        image: image
      };
      that.setData({
        message: message,
        messageHidden: !messageHidden
      });
      console.log('message_detail message:', that.message);
    },
    //确定按钮点击事件 
    tryagain: function () {
      var that = this;
      that.setData({
        messageflag: getApp().globalData.messageflag
      });
    },
    //获取消息
    get_member_messages: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      var page = that.page;
      var pagesize = that.pagesize;
      var message_type = that.message_type;
      wx.request({
        url: weburl + '/api/client/get_member_messages',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          message_type: message_type,
          //所有消息
          page: page,
          pagesize: pagesize
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var messages_all = res.data;
          var all_rows = res.data.all_rows;

          if (messages_all['status'] == 'y') {
            var messages = messages_all['result'];
            var task_list = [];
            var message_list = [];

            for (var i = 0; i < messages.length; i++) {
              if (messages[i].type == 6) {
                //task info
                console.log('message get_member_messages messages[i]:', i, messages[i]);

                if (messages[i]['task_info']['task_status'] != 9) {// if (task_list.length==0) task_list.push(messages[i])
                }

                if (task_list.length == 0) task_list.push(messages[i]);
              } else {
                message_list.push(messages[i]);
              }
            }
            /*
            if (task_list.length==0){//为空时虚拟一条送礼任务
              var message_info = {
                message_type: 0,
                message: '请完成一次送礼',
                image: that.data.new_task_image
              }
              var task_info = {
                step_no: 0,
                task_status: 0,
                step_info: '未开始'
              }
              var new_task = [{
                addtime: util.getDateStr(that.data.currenttime,0), 
                msg_id:0,
                msg_status:0,
                title:'新手免费送大礼',
                type:6, //送礼类型
                message_info:message_info,
                task_info:task_info,
              }]
            }
            */


            var page_num = that.page_num;
            page_num = all_rows / pagesize + 0.5;

            if (page_num > 1 && message_list) {
              //向后合拼
              message_list = that.message_list.concat(message_list);
            }

            that.message_list = message_list
            that.task_list = task_list
            that.page_num = page_num.toFixed(0)
            console.log('获取消息:', that.message_list, that.task_list);
          } else {
            wx.showToast({
              title: '暂无消息',
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    },
    //获取AI规则
    get_ai_rules: function () {
      var that = this;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      console.log('get_ai_rules');
      uni.request({
        url: weburl + '/api/client/get_ai_rules',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          type: 2
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var rule_info = res.data;
          console.log('get_ai_rules info:', rule_info);

          if (rule_info['status'] == 'y') {
            var rule_list = rule_info['result'];

            for (var i = 0; i < rule_list.length; i++) {
              if (rule_list[i]['item_name'].length > 0) {
                rule_list[i]['selected'] = 0;
              }
            }
			that.rule_list = rule_list
			that.rules_length = rule_list.length
			that.selected_num = that.selected_num
			that.selected_all = that.selected_all
			that.selected_start = that.selected_start
            
            console.log('获取智能选品规则:', that.rule_list);
			 
          } else {
            wx.showToast({
              title: '暂无选品规则',
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    },
    //获取AI 商品列表
    selectBtnTap: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      var rule_list = that.rule_list;
      var rule_select = [];
		that.isLoadingTrue = true
      setTimeout(function () {
        that.isLoadingTrue = false
      }, 3000);

      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        });
      }

      for (var i = 0; i < rule_list.length; i++) {
        var selected = {};
        selected['id'] = rule_list[i]['id'];
        selected['selected'] = rule_list[i]['selected'];
        rule_select.push(selected);
      }

      console.log('selectBtnTap selected rule:', rule_select);
      wx.request({
        url: weburl + '/api/client/get_ai_goods_list',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          rule_select: JSON.stringify(rule_select)
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var rule_goods_info = res.data;
          console.log('get_ai_rules 智能选品列表 goods info:', rule_goods_info);

          if (rule_goods_info['status'] == 'y') {
            var rule_goods_list = rule_goods_info['result'];
            var rule_goods_len = rule_goods_list.length;
            rule_goods_len > 2 ? 3 : rule_goods_len;

            for (var i = 0; i < rule_goods_len; i++) {
              rule_goods_list[i]['image'] = rule_goods_list[i]['activity_image'] == "" ? rule_goods_list[i]['image'] : rule_goods_list[i]['activity_image'];
            }

           that.rule_goods_list = rule_goods_list
           that.select_goods_list = rule_goods_list[0]
           that.select_goods_1 = rule_goods_list[1] ? rule_goods_list[1] : ''
           that.select_goods_2 = rule_goods_list[2] ? rule_goods_list[2] : ''
           that.messageflag = 3
            getApp().globalData.messageflag = that.messageflag;
            console.log('get_ai_rules 智能选品列表:', that.rule_goods_list);
          } else {
            that.messageflag = 9
            console.log('get_ai_rules 暂无推荐的商品:', that.noselected);
          }
        }
      });
    },
    addCart: function () {
      var that = this;
      var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
      var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
      var goods_id = that.goods_id;
      var page = that.page;

      if (!username) {
        //登录
        wx.navigateTo({
          url: '/pages/login/login?frompage=member/message/message'
        });
      } else {
        // 获取商品SKU
        wx.request({
          url: weburl + '/api/client/get_goodssku_list',
          method: 'POST',
          data: {
            username: username,
            access_token: token,
            goods_id: goods_id,
            shop_type: shop_type,
            page: page
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log('goods_sku:', res.data.result);
            var attrValueList = res.data.result.spec_select_list ? res.data.result.spec_select_list : '';
            var commodityAttr = res.data.result.sku_list ? res.data.result.sku_list : '{}';

            if (!commodityAttr) {
              wx.showToast({
                title: '该产品已下架',
                icon: 'loading',
                duration: 1500
              });
              return;
            }

            for (var i = 0; i < commodityAttr.length; i++) {
              if (commodityAttr[i].attrValueStatus) {
                commodityAttr[i].attrValueStatus = true;
              } else {
                commodityAttr[i].attrValueStatus = false;
              }
            }

            that.commodityAttr = commodityAttr
            that.sku_id = commodityAttr[0]['id']
            console.log('goods sku id:', that.sku_id);
            that.insertCart(that.sku_id, username, 0);
            if (!attrValueList) return;

            for (var i = 0; i < attrValueList.length; i++) {
              if (!attrValueList[i].attrValueStatus) {
                attrValueList[i].attrValueStatus = true;
              }
            }

            that.attrValueList = attrValueList
          }
        });
      }
    },
    insertCart: function (sku_id, username, wishflag) {
      var that = this;
      var shop_type = that.shop_type;
      var rule_selected_info = that.rule_selected_info;

      if (!rule_selected_info) {
        var rule_list = that.rule_list;
        rule_selected_info = '';

        for (var i = 0; i < rule_list.length; i++) {
          var selected = rule_list[i]['selected'];
          rule_selected_info = rule_selected_info + '"' + rule_list[i]['id'] + '":"' + rule_list[i]['item_name'][selected] + '"';
        }

        rule_selected_info = '{' + rule_selected_info + '}';
      }

      wx.request({
        url: weburl + '/api/client/add_cart',
        method: 'POST',
        data: {
          username: username,
          access_token: "1",
          sku_id: sku_id,
          wishflag: wishflag,
          shop_type: shop_type,
          rule_selected_info: rule_selected_info
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('details insertCart res data:', res.data, ' wishflag：', wishflag);
          var title = wishflag == 1 ? '已加入心愿单' : '已加入礼物袋';
          wx.showToast({
            title: title,
            duration: 2000
          });
          getApp().globalData.from_page = '/pages/details/details';

          if (wishflag == 1) {
            /*
            wx.navigateTo({
              url: '/pages/details/details'
            })
            */
            wx.navigateTo({
              url: '/pages/wish/wish'
            });
          } else {
            console.log('details insertCart wishflag:', wishflag);
            getApp().globalData.hall_gotop = 1;
            wx.switchTab({
              url: '/pages/hall/hall'
            });
          }
        }
      });
    },
    getMoreAccountTapTag: function (e) {
      var that = this;
      var page = that.page + 1;
      var pagesize = that.pagesize;
      var all_rows = that.all_rows;

      if (page > that.page_num) {
        wx.showToast({
          title: '没有更多了',
          icon: 'loading',
          duration: 1000
        });
        return;
      }
		that.page = page
		that.get_member_messages();
    },
    goBack: function () {
      var pages = getCurrentPages();

      if (pages.length > 1) {
        wx.navigateBack({
          changed: true
        }) / 返回上一页;
      } else {
        /*
        wx.switchTab({
          url: '../../hall/hall'
        })*/
        wx.navigateTo({
          url: '/pages/list/list'
        });
      }
    },
    move: function () {},
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
@import "./message.css";
</style>