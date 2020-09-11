<template>
<view>
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
	<view class="banner">
		<view class="top-bar-list">
			<!--
			<me-tabs v-model="activeIndex" :tabs="navList" :nameKey="title" :fixed="true" :tab-width="130"></me-tabs>
			<swiper class="top-bar" :vertical="false" :display-multiple-items="5">
				<swiper-item v-for="(item, index) in navList" :key="index">
					<view class="top-bar-scroll-item">
						<view :id="'v_' + index" :data-index="index" :data-id="item.id" :data-title="item.title" :data-value="item.value" :class="'top-bar-item ' + (index == activeIndex ? 'top-bar-active' : '')" @click="onTapTag">{{item.title}}</view>
					</view>
				</swiper-item>
			</swiper>
			-->
			<!-- #ifdef APP-PLUS -->
			
			<!-- #endif -->
			<scroll-view scroll-x="true" :scroll-left="scrollLeft" :scroll-into-view="'v_' + toView" class="top-bar">
				<view v-for="(item, index) in navList" :key="index" :id="'v_' + index" :data-index="index" :data-id="item.id" :data-title="item.title" :data-value="item.value" :class="'top-bar-item ' + (index == activeIndex ? 'top-bar-active' : '')" @click="onTapTag">{{item.title}}</view>
			</scroll-view>
		
			<view class="top-bar-image">
				<image style="width: 30rpx;height: 20rpx;" src="/static/images/icon_all.png" @tap="openAllTapTag"></image>
			</view>
			
		</view>
		<view class="top-bar2">
			<block v-for="(item, index) in navList2" :key="index">
				<view :id="'v_' + index" :data-index="index" :data-title="item.title" :data-tabid="item.id" :class="'top-bar-item2 ' + (index == activeIndex2 ? 'top-bar-active2' : '')" @click.stop="onTapTag2">
					<view>{{item.title}}</view>
					<uni-icons v-if="updown==0 && index == activeIndex2" style="margin-top:-2rpx;" class="Hui-iconfont iconv-uparrow" @click.stop :data-index="index"></uni-icons>
					<uni-icons v-if="updown==1 && index == activeIndex2" style="margin-top:-2rpx;" class="Hui-iconfont iconv-downarrow" @click.stop :data-index="index"></uni-icons>
				</view>
			</block>
		</view>
	</view>
	
	<swiper class="swiper container" :style="'height:'+dkheight+''" :current="activeIndex"  circular="true" :duration="duration" @animationfinish="swiperChange">
		<swiper-item  v-for="(venuesItems, venuesIndex) in venuesList" :key="venuesIndex">
			<mescroll-item :i="venuesIndex" :activeIndex="activeIndex" :tab="tab" :tab_value="tab_value" :tab2="tab2" :updown="updown"></mescroll-item>
		</swiper-item>
	</swiper>
</view>
</template>
<script> 
 
var util = require("utils/util.js"); //获取应用实例
//import imageloader from "../../common/imageloader/imageloader";
import MescrollItem from "./mescroll-swiper-item.vue";
//import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
//var dateUtils = require('../../common/util.js').dateUtils;
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var navList = [{
  id: "is_recommend",
  title: "推荐",
  value: "1"
}];
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
      title_name: '商城首页',
      title_logo: '/static/images/footer-icon-05.png',
      img_discount: '/static/images/discount.png',
      default_img: weburl + '/uploads/default_goods_image.png',
      activeIndex: 0,
      activeIndex2: 0,
      navList: navList,
      navList2: navList2,
      images: [],
      all_rows: 0,
      venuesItems_show: [],
	  venuesItems: [],
	  venuesList: [],
      show_max: 1,
      search_goodsname: null,
      keyword: '',
      page: 1,
      pagesize: 20,
      pageoffset: 0,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 100,
      loadingHidden: true,
      // loading
      is_goodslist_loading: false,
      msgList: [],
      hidden: true,
      scrollTop: 0,
      scrollHeight: 0,
	  old: {
	  	scrollTop: 0
	  },
      tab: 'is_recommend',
      tab_value: "1",
      tab2: 'default',
      updown: 0,
      //升序 降序
      shop_type: shop_type,
      //商家类型 1普通
      scrollLeft: 0,
      toView: 0,
      hiddenallclassify: false,
      animationData: "",
      floorstatus: false,
      loading_note: "",
      username: "",
      token: "",
      navlist_toView: "",
      navlist_title: "",
      userInfo: "",
      platform: "",
      windowHeight: "",
      windowWidth: "",
      dkheight: "",
      index: "",
	  status: 'more',
	  contentText: {
	  	contentdown: '上拉加载更多',
	  	contentrefresh: '加载中',
	  	contentnomore: '没有更多'
	  },
    };
},
	components: {
		// imageloader,
		//uniLoadMore,
		MescrollItem
	},
	props: {
	},
	watch:{
   
	},
	mounted() {
   
	},
	
	onLoad: function (options) {
    //console.log('onLoad', options);
    var that = this;
    var username = options.username ? options.username : wx.getStorageSync('username');
    var token = options.token ? options.token : wx.getStorageSync('token');
    var navlist_toView = options.navlist ? options.navlist : 0;
    var navlist_title = options.navlist_title ? options.navlist_title : '';
    that.username = username
    that.token = token
    that.navlist_toView = navlist_toView
    that.navlist_title = navlist_title
    //调用应用实例的方法获取全局数据

    uni.getSystemInfo({
      success: function (res) {
        that.setData({
          platform: res.platform,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          dkheight: res.windowHeight - 60
        });
      }
    });
    that.get_menubar();
  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();
    if (pages.length > 1) {
      that.title_logo = '/static/images/back.png'
    }
	/*
	setTimeout(() => {
		this.load()
	}, 100) ;
	*/
  },
  // #ifdef MP 
  onShareAppMessage: function () {
    return {
      title: '送心礼物',
      desc: '开启礼物电商时代，200万人都在用的礼物小程序！',
      path: '/pages/list/list?refername=' + username
    };
  },
  //#endif
  
  methods: {
	  showGoods: function (e) {
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
	    uni.navigateTo({
	      url: '/pages/details/details?sku_id=' + objectId + '&id=' + goods_id + '&goods_shape=' + goods_shape + '&goods_org=' + goods_org + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&name=' + goods_name + '&image=' + image + '&token=' + token + '&username=' + username
	    });
	  },
	  
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
	   
    //定位数据  
    getleft: function (e) {
      var that = this;
	  var scrollLeft = that.scrollLeft
	  that.scrollLeft = scrollLeft + 10;
	  
    },
    // 打开全部子分类
    openAllTapTag: function (e) {
      var that = this;
      var hiddenallclassify = that.hiddenallclassify;
	  that.hiddenallclassify = !hiddenallclassify ;
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
  // 轮播菜单
	swiperChange(e){
		this.changeTab(e.detail.current)
	},
  // 切换菜单
	changeTab(i){
		var that = this
		var navList = that.navList;
		var index = i
		var toView = index;
		that.activeIndex = i
		if (index > 2 && index < navList.length) {
			toView = index - 2;
		} else {
		toView = 0;
		}
		that.toView = toView ? toView : 0 ;
		that.tab = navList[that.activeIndex].id
		that.tab_value = navList[that.activeIndex].value
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
      //console.log('toView:' + that.toView,'hiddenallclassify:',that.hiddenallclassify);
      that.get_goods_list();
      if (hiddenallclassify == false) {
        that.openAllTapTag();
      }
    },
	
    onTapTag2: function (e) {
      var that = this;
      var id = e.currentTarget.id;
      var tab = e.currentTarget.dataset.tabid;
      var index = e.currentTarget.dataset.index;
      var updown = that.updown == 1 ? 0 : 1;
	  var activeIndex = that.activeIndex ;
	  that.activeIndex2 = parseInt(index) ;
	  that.tab2 = tab ;
	  that.page =  1 ;
	  that.updown = parseInt(updown) ;
	  that.venuesList[activeIndex].venuesItems = [] ;
      that.get_goods_list();
    },
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
	scroll: function(e) {
		var that = this
		var activeIndex = that.activeIndex ;
		var old_scrollTop = that.venuesList[activeIndex].scrollTop  ;//that.old.scrollTop
		var current_scrollTop = e.detail.scrollTop
		that.venuesList[activeIndex].scrollTop = current_scrollTop ; //that.old.scrollTop
		
		if(current_scrollTop > old_scrollTop +60) {
			that.getMoreGoodsTapTag() ;
		}
		//that.load() ;
	},
	//回到顶部
	goTop: function (e) {
	  // 一键回到顶部
	  var that = this;
	  var activeIndex = that.activeIndex
	  that.page = 1
	  that.pageoffset = that.venuesList[activeIndex].pageoffset 
	  that.venuesList[activeIndex].scrollTop = 0 ;
	  that.venuesList[activeIndex].venuesItems = [] ;
	  that.get_goods_list();
	  //console.log('goTop:', that.scrollTop);  
	  // 解决view层不同步的问题
	 
	  that.$nextTick(function() {
	  	that.venuesList[activeIndex].scrollTop = 0
	  });
	  //that.venuesList[activeIndex].scrollTop = that.old.scrollTop
	},
   
    /*
    searchTapTag: function (e) {
      var that = this;
      //console.log('搜索关键字：' + that.search_goodsname);
      that.setData({
        venuesItems_show: []
      });
      that.get_goods_list();
    },
	*/
    getMoreGoodsTapTag: function () {
      var that = this;
	  var activeIndex = that.activeIndex;
      var page = that.venuesList[activeIndex].page + 1;
      var all_rows = that.venuesList[activeIndex].all_rows;
      var is_goodslist_loading = that.is_goodslist_loading;
      if (is_goodslist_loading) return;

      if (page > all_rows) {
        /*
        wx.showToast({
          title: '已经到底了~',
          icon: 'none',
          duration: 1000
        })
        */
	    that.status = 'nomore';
        return;
      }
	  that.venuesList[activeIndex].page = page
      that.get_goods_list();
    },
    search_goodsnameTapTag: function (e) {
      var that = this;
      var keyword = e.detail.value;
      that.setData({
        keyword: keyword
      });
    },
    get_goods_list: function (event) {
      var that = this;
      var page = that.page;
      var pagesize = that.pagesize;
      var pageoffset = that.pageoffset;
      var username = that.username;
      var token = that.token;
	  var activeIndex = that.activeIndex;
      var goods_type = that.tab;
      var goods_type_value = that.tab_value;
      var goods_sales = that.tab2;
      var updown = that.updown;
      var search_goodsname = that.search_goodsname;
      var keyword = that.keyword;
      var shop_type = that.shop_type; //var shape = 1

      //var show_max = that.show_max;
	  
      that.setData({
        is_goodslist_loading: true,
        loadingHidden: false
      });
	  
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
          shop_type: shop_type ,// shape:shape
		  query_type:'APP' ,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          //var venuesItems_show = that.venuesItems_show;
         // console.log('get_goods_list:', res.data, 'page:', page);
          var venuesItems_new = res.data.result;
          var all_rows = res.data.all_rows;
          var pageoffset = res.data.pageoffset;

          if (!venuesItems_new) {
			  /*
            wx.showToast({
              title: '没有搜到记录',
              icon: 'loading',
              duration: 1000
            });
			*/
            that.setData({
			  is_goodslist_loading: false,
              keyword: ''
            });
			that.status = 'nomore';
            return;
          } 
		  var venuesItems = that.venuesList[activeIndex].venuesItems
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
              venuesItems_new[i]['show'] = page==1?true:false; //暂时都显示
              venuesItems_new[i]['loaded'] = page==1?true:false;
			}

            //if (page > 1 && venuesItems_new) {
				 
			//} //向后合拼
           venuesItems = that.venuesItems.concat(venuesItems_new);
		   that.venuesList[activeIndex].venuesItems = that.venuesList[activeIndex].venuesItems.concat(venuesItems);
		   that.venuesList[activeIndex].page = page ;
		   that.venuesList[activeIndex].pagesize = pagesize ;
		   that.venuesList[activeIndex].all_rows = all_rows ;
		   that.venuesList[activeIndex].pageoffset = pageoffset ;
		   /*
			if (page == 1) {
				that.load()
			}
			 */
            //更新当前显示页信息
            //if (venuesItems_show.length >= show_max) {
            //  venuesItems_show.shift();
            //}
			//that.venuesItems = venuesItems ;
			//that.all_rows = all_rows ;
			//that.page = page ;
			//that.pageoffset = pageoffset ;
			//that.keyword = '' ;
			
			setTimeout(function(){
				that.is_goodslist_loading = false ;
			}, 500)
          }
        }
      });
    },
    get_menubar: function (event) {
      //获取菜单项
      var that = this;
      var navlist_toView = that.navlist_toView;
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
         // console.log('get_menubar:', res.data.result);
          var navList_new = res.data.result;

          if (!navList_new) {
            wx.showToast({
              title: '没有菜单项',
              icon: 'loading',
              duration: 1500
            });
            return;
          }

          for (var i = 0; i < navList_new.length; i++) {
            if (navList_new[i]['title'].indexOf(navlist_title) >= 0) {
              navlist_toView = i;
              break;
            }
          }
			that.navList = navList_new ;
			that.index = navlist_toView ;
			that.activeIndex = navlist_toView ;
			that.tab = navList_new[navlist_toView]['id'] ;
			that.tab_value = navList_new[navlist_toView]['value'] ;
			that.venuesItems_show = [] ;
			that.navList.forEach((tabBar) => {
				that.venuesList.push({
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
					scrollTop:that.scrollTop,
					angle: 0,
				});
			});
			//that.get_goods_list();
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