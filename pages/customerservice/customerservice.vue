<template>
<view>
	<view class="chatroom-title">
		<text>查询:</text>
		<uni-search-bar placeholder="商品ID" @input="input_goodsid" clearButton="no" nocancel="yes" nobutton="yes" @confirm="searchTapTag" />
		<uni-search-bar placeholder="商品名称" @input="input_goodsname" clearButton="no" nocancel="no" nobutton="yes" @confirm="searchTapTag" />
	</view>
	<mescroll-body ref="mescrollRef" top="0" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"  @emptyclick="emptyClick"  @topclick="goTop" @init="mescrollInit">	 <!-- @scroll="scroll" -->
		<view v-for="(item,index) in recommentList"  :key="index">
			<view class="chat-info">
				<view class="chat-title">
					<view style="line-height: 80rpx;">{{(item.goods_id>0)?'ID:':''}}{{item.goods_id}}</view>
					<view class="chat-userinfo" @tap="navigateToChatroom(item)">
						<view class="chat-nickname">{{item.m_id?'ID:'+item.m_id+' ':''}}</view>
						<view class="chat-nickname">{{item.wx_nickname?item.wx_nickname+' ':''}}</view>
						<image class="chat-headimg" :src="item.wx_headimg"></image>
					</view>			
				</view>
				<view class="chat-content">
					<image  @tap="showGoods(item)" class="chat-img" :src="item.image"></image>
					<view class="chat-item">
						<view class="chat-goods-name">{{item.name}}</view>
						<!--
						<view class="chat-goods-tags">
							<view class="left-name-tag">{{item.act_info?item.act_info:''}}</view>
						</view> 
						-->
						<view class="opt-list">
							<text @tap="navigateToChatroom(item)" class="smallbtn" style="background:#e34c55;color:#fff;">进入</text>
						</view>
					</view>	
				</view>			
			</view>	
		</view>
	</mescroll-body>
</view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var shop_type = getApp().globalData.shop_type;
var weburl = getApp().globalData.weburl;
var page = 1;
var pagesize = 20;
var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
var current_shop_info = uni.getStorageSync('current_shop_info') ? uni.getStorageSync('current_shop_info') : ''
var navList2_init = [
  { id: "gift_logo", title: "送礼logo", value: "", img: "/uploads/gift_logo3.png" },
  { id: "wishlist_logo", title: "心愿单logo", value: "", img: "/uploads/wishlist.png" },
  { id: "trans_gift_logo", title: "转送礼logo", value: "", img: "/uploads/gift_logo.png" },
  { id: "hall_banner", title: "首页banner", value: "", img: "" },
  { id: "wish_banner", title: "心愿单banner", value: "", img: "/uploads/wish_banner.png" },
  { id: "wechat_gb", title: "背景", value: "", img: "/uploads/wechat_share.png" },
]
var navList2 = uni.getStorageSync('navList2') ? uni.getStorageSync('navList2') : []
export default {
	data() {
	return {
	    scrollTop: 0,
		old: {
			scrollTop: 0
		},
	    username: username,
	    token: token,	   
	    recommentList: [],
	    page:page,
	    pagesize:pagesize,
	    all_rows: 0,
	    rall_rows: 0,
		page_num:0,
	    windowWidth: 0,
	    windowHeight: 0,	    
	    nickname: userInfo.nickName,
	    avatarUrl: userInfo.avatarUrl,
	    shop_type: shop_type,	  
	    goodsshape:1,
		search_goodsid:'',
		search_goodsname:'',
		is_loading: false,
		
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
	}
	},
	mixins: [MescrollMixin], // 使用mixin
	components: {},
	props: {},
	mounted() {
		this.isInit = true; // 标记为true
		this.mescroll.triggerDownScroll();
	},
	onLoad: function (options) {
		var that = this
		that.frompage = options.frompage ? options.frompage : '/pages/hall/hall'
	},
  
	onShow: function () {
		var that = this 
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		
        if (!username) {//登录
			uni.navigateTo({
				url: '/pages/login/login?frompage='+ that.frompage
			})
		}
		uni.getSystemInfo({
			success: function (res) {
				let winHeight = res.windowHeight;
				that.windowWidth = res.windowWidth
				that.windowHeight = res.windowHeight
				that.dkheight = winHeight - 60
				that.scrollTop = that.scrollTop + 10
			}
		})
        //that.reloadData(username, token);
	},
	methods: {	
		showGoods: function (e) {
			var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
			var objectId = e.id ; //currentTarget.dataset.objectId;
			var goods_id = e.goods_id?e.goods_id:e.id ; //currentTarget.dataset.goodsId;
			var goods_org = e.goods_org ; //currentTarget.dataset.goodsOrg;
			var goods_shape = e.shape ; //currentTarget.dataset.goodsShape;
			var goods_name = e.name ; //currentTarget.dataset.goodsName;			 
			var goods_info = e.atc_info ; //currentTarget.dataset.goodsInfo;			 
			var image = e.image?e.image:'' ; //currentTarget.dataset.image ? e.currentTarget.dataset.image : ''; //var carts = this.data.carts
			var activity_image = e.activity_image?e.activity_image:''
			image = image?image:activity_image?activity_image:'' 
			
			var show_goods_options = {
				sku_id:objectId,
				id:goods_id,
				goods_shape:goods_shape,			 
				goods_info:goods_info,			 
				name:goods_name,
				image:image,
				token:token,
				username:username
			}
			//uni.setStorageSync('show_goods_options', show_goods_options);
			uni.navigateTo({
				url: '/pages/details/details?id=' + goods_id + '&goods_shape=' + goods_shape + '&goods_info=' + goods_info +  '&name=' + goods_name + '&image=' + image + '&token=' + token + '&username=' + username
			})
		},	
	
		reloadData: function (username, token) {
			// auto login
			var that = this;
			var shop_type = that.shop_type
			var page = that.page
			var pagesize = that.pagesize
       
			uni.request({
				url: weburl + '/api/mqttservice/query_custservice',
				method: 'POST',
				data: {
					username: username,
					access_token: token,
					shop_type:shop_type,
					query_type:'chatroom', 
					page: page,
					pagesize: pagesize 
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				success: function (res) {           
					var recommentslist = res.data.result
					that.page_num = res.data.all_rows
					if (recommentslist) {
						for (var i = 0; i < recommentslist.length; i++) {
							if (recommentslist[i]['image'].indexOf("http") < 0) {
								recommentslist[i]['image'] = weburl + '/' + recommentslist[i]['image'];
							}
						}					 
						
						that.recommentList = recommentslist
					}
				}
			})
		},
	 
		onPageScroll:function({scrollTop}){
			var that = this
			that.scrollTop = scrollTop
			//console.log('wechat onPageScroll:'+that.scrollTop)
		},	
		 
		scroll: function (event) {
        //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
			this.scrollTop = event.detail.scrollTop
		},		
		 
		navigateToChatroom: function (e) {
			var that = this 
			var goods_id = e.goods_id?e.goods_id:e.id 
			var goods_name = e.name ; 
			var goods_owner = e.goods_owner ; 
			var from_username = e.username
			var from_nickname = e.wx_nickname
			var from_headimg = e.wx_headimg
			var m_id = e.m_id
			
			uni.navigateTo({
				url: '/pages/customerservice/chatroomservice?frompage=/pages/customerservice/customerservice&goods_id='+goods_id+'&goods_name='+goods_name+'&goods_owner='+goods_owner+'&from_username='+from_username+'&from_headimg='+from_headimg+'&from_nickname='+from_nickname+'&m_id='+m_id+'&customer=2&is_refresh=1'
			})
		},
	  
		searchTapTag: function (res) {
			var that = this
			console.log('customerservice searchTapTag() value：' + res.value)	      
			that.page = 1
			that.downCallback(that.mescroll)
			uni.hideKeyboard()//隐藏软键盘  
		},
		
		input_goodsid:function(res) {
			var that = this
			that.search_goodsid = res.value
			//console.log('customerservice input_goodsid() value：' + res.value)	
		},
		
		input_goodsname:function(res) {
			var that = this
			that.search_goodsname = res.value
			//console.log('customerservice input_goodsname() value：' + res.value)	
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
			this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData)=>{
	  		//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				mescroll.endSuccess(curPageData.length);
	  		//设置列表数据
				if(mescroll.num == 1|| this.page == 1) {
					this.recommentList = []; //如果是第一页需手动制空列表
				}
				if(curPageData=='n'){
					mescroll.endByPage(this.page, this.all_rows)
				}else{
					this.recommentList=this.page==1?curPageData:this.recommentList.concat(curPageData); //追加新数据
	  			//console.log("mescroll.num:" , mescroll.num + " mescroll.size:" + mescroll.size  +" recommentList:" + this.recommentList);
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
			var shop_type = that.shop_type
			var page = that.page
			var pagesize = that.pagesize
			var page_num = that.page_num
			var search_goodsid = that.search_goodsid
			var search_goodsname = that.search_goodsname
		
			if(page > page_num && page>1) {
				console.log('加载完成 page:', page, 'page_num:',page_num);
				that.is_loading = false ;
				successCallback && successCallback('n');
				return 
			}else{
				that.is_loading = true 
			}
	  	
			if( page == 1){
				that.orders = []
				that.orders_show = []
				that.page_num = 0
			}
			uni.request({
				url: weburl + '/api/mqttservice/query_custservice',
				method: 'POST',
				data: {
					username: username,
					access_token: token,
					shop_type:shop_type,
					query_type:'chatroom', 
					page: page,
					pagesize: pagesize,
					search_goodsid:search_goodsid,
					search_goodsname:search_goodsname,
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				success: function (res) {           
					var recommentslist = res.data.result
					that.page_num = res.data.all_rows;
					console.log('加载 page:'+ JSON.stringify(recommentslist)+' page:'+ that.page+' page_num:'+that.page_num);
	  			 
					if (recommentslist) {
						for (var i = 0; i < recommentslist.length; i++) {
							if (recommentslist[i]['image'] && recommentslist[i]['image'].indexOf("http") < 0) {
								recommentslist[i]['image'] = weburl + '/' + recommentslist[i]['image'];
							}
						}  				 
					
						//that.recommentList = recommentslist
						that.page = page + 1 ;
						successCallback && successCallback(recommentslist)
					}				
				}
			})	  	
		},
	  
	  //回到顶部
		goTop: function (e) {
	  // 一键回到顶部
			var that = this;
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
	
		setData: function (obj) {
			let that = this
			let keys = []
			let val, data
			Object.keys(obj).forEach(function (key) {
				keys = key.split('.')
				val = obj[key]
				data = that.$data
				keys.forEach(function (key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val)
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {})
						}
					}
					data = data[key2]
				})
			})
		}
	}
}
</script>
<style>
@import "./customerservice.css";
</style>