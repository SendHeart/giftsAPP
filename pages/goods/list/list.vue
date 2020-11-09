<template>
<view>
<view v-if="!hidddensearch" :hidden="hidddensearch" class="search">
	<view class="wx-input">
		<input name="search" :value="keyword" placeholder="好礼搜一下" @input="search_goodsnameTapTag" :focus="inputShowed" maxlength="10" confirm-type="search" @confirm="searchTapTag"></input>
		<image @tap="searchTapTag" src="/static/images/search-btn.png"></image>
	</view>
	<text class="searchcancel" @tap="goBack">取消</text>
</view>
<!--<view  wx:if="!hidddensearch" hidden='{{hidddensearch}}' class="serach-comm">
  <view class="search-comm-vote linegray">
    <text>对结果是否满意?</text>
    <view class="search-comm-confirm" style=''>
      <view bindtap="satisfyTagTap" data-satisfy="1" class='lable' style="{{satisfy==1?'background-color:green;color:white':'background-color:white;color:gray'}}">是</view>
      <view bindtap="satisfyTagTap" data-satisfy="2" class='lable'style="{{satisfy==2?'background-color:green;color:white':'background-color:white;color:gray'}}">否</view>
    </view> 
</view>-->
<movable-area class="inlinetips" :style="'margin-left:' + windowWidth-45 + 'px;margin-top:' + (hidddensearch?80:130) + 'rpx;'"><!-- style="height:{{dkheight}}px"  这个组件撑满页面时部分手机无法点击进入详情页-->
<movable-view class="floatlayer" x="330" y="10" direction="all">
<image src="../../../static/images/floatbanner.png" @tap="gotoAITagTap"></image>
</movable-view>
</movable-area>
<view class="banner" :style="(hidddensearch?'top:0;':'top:80rpx;')">
	<view class="top-bar2" style>
		<block v-for="(item, index) in navList2" :key="index">
			<view :id="'v_' + index" :data-index="index" :data-title="item.title" :data-tabid="item.id" :class="'top-bar-item2 ' + (index == activeIndex2 ? 'top-bar-active2' : '')" @click.stop="onTapTag2">
				<view>{{item.title}}</view>
				<icon v-if="updown==0 && index == activeIndex2" style="margin-top:-2rpx;" class="Hui-iconfont iconv-uparrow" @click.stop :data-index="index"></icon>
				<icon v-if="updown==1 && index == activeIndex2" style="margin-top:-2rpx;" class="Hui-iconfont iconv-downarrow" @click.stop :data-index="index"></icon>
			</view>
		</block>
	</view>
</view>
<mescroll-body top="0" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"  @emptyclick="emptyClick" @scroll="scroll" @topclick="goTop" @init="mescrollInit">
	<pd-list :list="pdList"></pd-list>
</mescroll-body>
<!--
<view class="loading-show" :hidden="loadingHidden">
  <text>{{loading_note}}</text>
</view>
-->
</view>
</template>

<script>
var util = require("utils/util.js"); //获取应用实例
//import imageloader from "../../../common/imageloader/imageloader";
//import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
//var dateUtils = require('../../../common/util.js').dateUtils;
//import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
// 引入mescroll-mixins.js
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";		
// 引入mescroll-body组件 (如已在main.js注册全局组件,则省略此步骤)
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省

import PdList from "./pd-list.vue";
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var navList2 = [{
  id: "default",
  title: "最新"
}, {
  id: "hot",
  title: "人气"
}, {
  id: "price",
  title: "价格"
}];


export default {
  data() {
    return {
      title_name: '搜索礼物',
      title_logo: '/static/images/footer-icon-05.png',
      img_discount: '/static/images/discount.png',
      default_img: weburl + '/uploads/default_goods_image.png',
      activeIndex: 0,
      activeIndex2: 0,
      navList2: navList2,
      images: [],
      all_rows: 1,
      venuesItems: [],
      hidddensearch: true,
      search_goodsname: null,
      keyword: '',
      satisfy: true,
      is_satiify: 0,
      page: 1,
      pagesize: 20,
      pageoffset: 0,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      loadingHidden: true,
      // loading
      is_loading: false,
      msgList: [],
      hidden: true,
      scrollTop: 0,
	  old: {
	  	scrollTop: 0
	  },
      scrollHeight: 0,
      tab: 'is_recommend',
      tab_value: "1",
      tab2: 'default',
      updown: 0,
      //升序 降序
      shop_type: shop_type,
      //商家类型 1普通
      scrollLeft: 0,
      toView: 0,
      inputShowed: true,
      is_satisfy: "",
      floorstatus: false,
      loading_note: "",
      username: "",
      token: "",
      navlist_toView: "",
      goods_type: "",
      goods_type_value: "",
      userInfo: "",
      platform: "",
      windowHeight: "",
      windowWidth: "",
      dkheight: "",
      navList: "",
      index: "",
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
	  scrollY: 0
    };
	},
  
	mixins: [MescrollMixin], // 使用mixin
	components: {
		// imageloader,
		//uniLoadMore,
		//MescrollUni,
		MescrollBody,
		PdList,
	},
	props: {},
	
	onLoad: function (options) {
    //console.log('onLoad', options);
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
    var middle_title = options.middle_title ? options.middle_title : '特色礼物';
    var navlist_toView = options.navlist ? options.navlist : 0;
    var goods_type_value = options.goods_type_value ? options.goods_type_value : 0;
    var goods_type = 'goods_middle_search';
    var hidddensearch = options.search == 1 ? false : true;
    middle_title = options.search == 1 ? '搜索礼物' : middle_title;
	  wx.setNavigationBarTitle({
	      title: middle_title
	    })
    that.setData({
      username: username,
      token: token,
      navlist_toView: navlist_toView,
      goods_type: goods_type,
      goods_type_value: goods_type_value,
      hidddensearch: hidddensearch
    });
     
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          platform: res.platform,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          dkheight: res.windowHeight - 10
        });
      }
    });
    //if (hidddensearch) that.get_goods_list();
  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '/images/back.png'
      });
    }
	/*
	setTimeout(() => {
		this.load()
	}, 100)
	*/
  },
  onShareAppMessage: function () {
    return {
      title: '送心礼物',
      desc: '开启礼物电商时代，200万人都在用的礼物小程序！',
      path: '/pages/list/list?refername=' + username
    };
  },
  mounted() {
  	this.isInit = true; // 标记为true
  	this.mescroll.triggerDownScroll();
  },
  methods: {
	load: function() {
		uni.createSelectorQuery().selectAll('.lazy').boundingClientRect((images) => {
			images.forEach((image, index) => {
				if (image.top <= this.windowHeight) {
					this.venuesItems[image.dataset.index].show = true;
				}
			})
		}).exec()
	},
	imageLoad: function(e) {
		this.venuesItems[e.target.dataset.index].loaded = true
	},
	
    satisfyTagTap: function (e) {
      var that = this;
      var satisfy = e.currentTarget.dataset.satisfy;
      that.setData({
        satisfy: satisfy,
        is_satisfy: satisfy ? 1 : 2
      });
    },
    goBack: function () {
      var pages = getCurrentPages();

      if (pages.length > 1) {
        wx.navigateBack({
          changed: true
        }); //返回上一页
      } else {
        wx.switchTab({
          url: '../hall/hall'
        });
      }
    },
    //事件处理函数
    swiperchange: function (e) {//console.log(e.detail.current)
    },

    // 点击获取对应分类的数据
    onTapTag: function (e) {
      var that = this; //var tab = e.currentTarget.id;
      var tab = e.currentTarget.dataset.id;
      var tab_value = e.currentTarget.dataset.value;
      var index = e.currentTarget.dataset.index;
      var search_goodsname = e.currentTarget.dataset.title;
      var navList = that.navList;
      var toView = index;

      if (index > 2 && index < navList.length) {
        toView = index - 2;
      } else {
        toView = 0;
      }

      if (tab != 'search_goodsname') {
        search_goodsname = '';
      }

      that.setData({
        activeIndex: index,
        tab: tab,
        tab_value: tab_value,
        page: 1,
        search_goodsname: search_goodsname,
        toView: toView ? toView : 0,
      });
	  that.goTop()
      //console.log('toView:' + that.toView);
      //that.get_goods_list();
	  /*
	  setTimeout(() => {
	  	this.load()
	  }, 100)
	  */
    },
   onTapTag2: function (e) {
     var that = this;
     var id = e.currentTarget.id;
     var tab = e.currentTarget.dataset.tabid;
     var index = e.currentTarget.dataset.index;
     var updown = that.updown == 1 ? 0 : 1;
	 that.activeIndex2 = index 
	 that.tab2 = tab 
	 that.page = 1
	 that.updown = updown
	 that.venuesItems_show = []
	 that.venuesItems = []
	 that.goTop() ;
     //that.get_goods_list();
   },
   /*
    // 获取滚动条当前位置
    scrolltoupper: function (e) {
      var that = this;
      var scrollTop = e.detail.scrollTop
      
      if ( scrollTop > 100) {
        this.setData({
          floorstatus: true
        });
      
        if (that.platform == 'ios') {
      			
        }
      } else {
        this.setData({
          floorstatus: false
        });
      } 
    },
	*/
    scroll: function(e) {
    	var that = this
    	var old_scrollTop = that.old.scrollTop
    	var current_scrollTop = that.mescroll.scrollTop
    	that.old.scrollTop = current_scrollTop
    	//console.log('scroll current_scrollTop:', current_scrollTop);  
    },
    //回到顶部
    goTop: function (e) {
      // 一键回到顶部
		var that = this;
		var navList_new = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : '';
     	that.pdList = [] ;
		that.page = 1 ;
		that.pageoffset = 0 ;
		that.mescroll.resetUpScroll()
		getApp().globalData.hall_gotop = 0;
       // 解决view层不同步的问题
		//console.log('goTop scrollTop:', that.mescroll.scrollTop); 
		that.$nextTick(function() {
			that.mescroll.scrollTo(0) ;
		});
		that.mescroll.scrollTop = that.old.scrollTop
    },
       
    searchTapTag: function (e) {
      var that = this;
	  that.goTop() ;
    },
    getMoreGoodsTapTag: function (e) {
      var that = this;
      var page = that.page + 1;
      var all_rows = that.all_rows;
      var is_loading = that.is_loading;
      if (is_loading) return;

      if (page > all_rows) {
		that.status = 'nomore';
        return;
      }
	  
	  that.page = page
      that.get_goods_list();
    },
    search_goodsnameTapTag: function (e) {
      var that = this;
      var keyword = e.detail.value;
      that.setData({
        keyword: keyword
      });
    },
	showGoods: function (e) {
	  // 点击购物车某件商品跳转到商品详情
	  var objectId = e.id ; //currentTarget.dataset.objectId;
	  var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
	  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
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
	  
	  setTimeout(function () {
		wx.navigateTo({
		url: '/pages/details/details?sku_id=' + objectId + '&id=' + goods_id + '&goods_shape=' + goods_shape + '&goods_org=' + goods_org + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&name=' + goods_name + '&image=' + image + '&token=' + token + '&username=' + username
		});
	  }, 100);
	},
    gotoAITagTap: function (e) {
      var that = this;
      getApp().globalData.messageflag = 2;
      wx.switchTab({
        url: '/pages/member/message/message'
      });
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
		//console.log("i="+this.i+", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size);
		this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData)=>{
			//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
			console.log("i="+this.i+", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" + curPageData.length);
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
		var page = that.page;
		var pagesize = that.pagesize;
		var pageoffset = that.pageoffset;
		var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
		var goods_type = that.goods_type;
		var goods_type_value = that.goods_type_value;
		var goods_sales = that.tab2;
		var updown = that.updown;
		var search_goodsname = that.search_goodsname;
		var keyword = that.keyword;
		var shop_type = that.shop_type;
		var shape = 1;
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
			wx.request({
			  url: weburl + '/api/client/get_goods_list',
			  method: 'POST',
			  data: {
				goods_type: goods_type,
				goods_type_value: goods_type_value,
				username: username,
				access_token: token,
				page: page,
				pagesize: pagesize,
				pageoffset: pageoffset,
				search_goodsname: search_goodsname,
				goods_sales: goods_sales,
				updown: updown,
				keyword: keyword,
				shop_type: shop_type,
				shape: shape
			  },
			  header: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			    'Accept': 'application/json'
			  },
			  success: function (res) {
			    var venuesItems_new = res.data.result;
			    var all_rows = res.data.all_rows;
			    var pageoffset = res.data.pageoffset;
				
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
				  console.log('加载 page:', page, 'all_rows:',all_rows,' venuesItems_new:',venuesItems_new);
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

	/*
    get_goods_list: function (event) {
      //venuesList
      var that = this;
      var page = that.page;
      var pagesize = that.pagesize;
      var pageoffset = that.pageoffset;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_type = that.goods_type;
      var goods_type_value = that.goods_type_value;
      var goods_sales = that.tab2;
      var updown = that.updown;
      var search_goodsname = that.search_goodsname;
      var keyword = that.keyword;
      var shop_type = that.shop_type;
      var shape = 1;

      if (!search_goodsname && !keyword && !goods_type_value) {
        wx.showToast({
          title: '搜到内容为空',
          icon: 'loading',
          duration: 2000
        });
		that.status = 'nomore' ;
        return;
      }

	  that.is_loading = true ;
	  that.status = 'loading';
	   
      wx.request({
        url: weburl + '/api/client/get_goods_list',
        method: 'POST',
        data: {
          goods_type: goods_type,
          goods_type_value: goods_type_value,
          username: username,
          access_token: token,
          page: page,
          pagesize: pagesize,
          pageoffset: pageoffset,
          search_goodsname: search_goodsname,
          goods_sales: goods_sales,
          updown: updown,
          keyword: keyword,
          shop_type: shop_type,
          shape: shape
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          //console.log('get_goods_list:', res.data);
          var venuesItems_new = res.data.result;
          var page = that.page;
          var all_rows = res.data.all_rows;
          var pageoffset = res.data.pageoffset;

          if (!venuesItems_new) {
			 
		   that.setData({
		     is_loading: false,
		   });
			that.status = 'nomore';
            return;
          }
		  var venuesItems = that.venuesItems
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
			
			  venuesItems_new[i]['image'] = venuesItems_new[i]['activity_image'] ? venuesItems_new[i]['activity_image'] : venuesItems_new[i]['image'];
			  //venuesItems_new[i]['show'] = page==1?true:false; //暂时都显示
			  //venuesItems_new[i]['loaded'] = page==1?true:false;
			}
		  }
          
			venuesItems = venuesItems.concat(venuesItems_new);
			that.venuesItems = venuesItems
			that.all_rows = all_rows 
			that.pageoffset = pageoffset
			that.page = page ;
			
			setTimeout(function () {
				that.is_loading = false ;
			}, 300);
        }
      });
    },
	*/
    get_menubar: function (event) {
      //获取菜单项
      var that = this;
      var navlist_toView = that.navlist_toView;
      wx.request({
        url: weburl + '/api/client/get_menubar',
        method: 'POST',
        data: {
          menu_type: 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          //console.log('get_menubar:', res.data.result);
          var navList_new = res.data.result;

          if (!navList_new) {
            wx.showToast({
              title: '没有菜单项',
              icon: 'loading',
              duration: 1500
            });
            return;
          }

          that.setData({
            navList: navList_new,
            index: navlist_toView,
            activeIndex: navlist_toView,
            tab: navList_new[navlist_toView]['id'],
            tab_value: navList_new[navlist_toView]['value']
          });
          //that.get_goods_list();
          setTimeout(function () {
            that.setData({
              loadingHidden: true
            });
          }, 1500);
        }
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
@import "./list.css";
</style>