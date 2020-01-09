<template>
<view>
<!--index.wxml-->

<view class="all-classify" :hidden="hiddenallclassify">
    <view class="catg-title" @click.stop="openAllTapTag">
      <view class="catg-titletext">全部分类</view>
      <view class="catg-claps">
       <image style src="../../static/images/bottom-close.png"></image>
      </view>
    </view>
    <view class="all-classify-list">
    <block v-for="(item, index) in navList" :key="index">
      <view :id="'v_' + index" :data-index="index" :data-id="item.id" :data-title="item.title" :data-value="item.value" :class="'all-classify-item ' + (index == activeIndex ? 'all-classify-item-active' : '')" @click.stop="onTapTag">
        {{item.title}}
      </view>
    </block>
    </view>
</view>
<view class="banner">
    <component is="nav" :navList="navList" :activeIndex="activeIndex" :toView="toView" :navgationHeight="navgationHeight" :is_all_category="is_all_category"></component>
</view>
  <!-- 
<view class="search" style='height:30rpx;'>
		<input value="{{keyword}}" class="wx-input" placeholder="寻找..."  bindinput='search_goodsnameTapTag'/>
    <image bindtap='searchTapTag' src="../../images/search-btn.png"></image>
</view>
  -->

<scroll-view scroll-y class="container" @scrolltolower="getMoreGoodsTapTag" @scroll="scrolltoupper" :scroll-into-view="'v_' + toView" :scroll-top="scrollTop"> <!--  catchtouchstart='touchStart' catchtouchend="touchEnd"-->
<view class="goTop" :hidden="!floorstatus" @tap="goTop">
  <icon style="margin-top:-50rpx;" class="Hui-iconfont iconv-uparrow"></icon>
  <view class style="margin-top:-5rpx;font-size:22rpx;">TOP</view>
  <!--<view class='' style="margin-top:-25rpx;font-size:26rpx;">{{page}}/{{all_rows}}</view>-->
</view>
  <view class="venues_box">
  <view class="box-left">
   <block v-for="(venuesItems_show, m_id) in venuesItems_show" :key="m_id">
      <block v-for="(item, id) in venuesItems_show" :key="id">
        <view class="venues_item" v-if="index%2==0"> 
          <navigator :url="'/pages/player/player?liveid=' + item.liveid + '&live_goods=' + item.live_goods + '&live_name=' + item.shop_name + '&live_poster=' + item.live_poster + '&live_desc=' + item.live_desc + '&live_logo=' + item.logo" hover-class="none">
            <imageloader :default-image="default_img" mode="aspectFit" :original-image="item.live_poster" width="355rpx" height="355rpx" display="block"></imageloader>
            <view class="goods-tags">
              
            </view>
            <text class="goods_name">{{item.shop_name}}</text>
            </navigator>
            <view class="goods_prom">{{item.live_desc?item.live_desc:''}}</view>
            <view class="goods_bottom">
              <view class="goods_tag">
                <text space="ensp">{{item.live_focus_members>0?'人气值:'+item.live_focus_members:'人气值:1'}} </text>
              </view>
              <view class="price-list">
                 
              </view>
          </view>
        </view>
      </block>
    </block>
  </view>
  <view class="box-right">
   <block v-for="(venuesItems_show, m_id) in venuesItems_show" :key="m_id">
      <block v-for="(item, id) in venuesItems_show" :key="id">
        <view class="venues_item" v-if="index%2==1"> 
            <navigator :url="'/pages/player/player?liveid=' + item.liveid + '&live_goods=' + item.live_goods + '&live_name=' + item.shop_name + '&live_poster=' + item.live_poster + '&live_desc=' + item.live_desc + '&live_logo=' + item.logo" hover-class="none">
          <!--
             <imageloader  default-image='{{default_img}}' mode='aspectFit' original-image='{{item.logo}}' width="355rpx" height="355rpx" display="block" />
             -->
             <image class="mainpic" :src="(item.live_poster?item.live_poster:'')" :mode="((item.shape==5||item.shape==4)?'aspectFit':'aspectFill')"></image>
            <view class="goods-tags">
               
            </view>
            <text class="goods_name">{{item.shop_name}}</text>
          </navigator>
            <view class="goods_prom">{{item.live_desc?item.live_desc:''}}</view>
            <view class="goods_bottom">
              <view v-if="item.shape!=4&&item.shape!=5" class="goods_tag">
                 
              </view>
              <view class="price-list">
                 
              </view>
          </view>
        </view>
      </block>
    </block>
    </view>
</view>
<view class="loading-show" :hidden="loadingHidden">
  <text>{{loading_note}}</text>
</view>
  <!--使用懒加载替代
  <button wx:if="{{page<all_rows}}" type="default" size="default" hover-class="button-hover" class="button" bindtap="getMoreGoodsTapTag" style="margin-top:10rpx; margin-bottom:60rpx;">更多</button>
  <loading hidden="{{loadingHidden}}">
    加载中...
  </loading>
-->
</scroll-view>
</view>
</template>

<script>
import defaultData from '../../data';
var util = require("../../utils/util.js"); //获取应用实例
var weburl = getApp().globalData.globalData.weburl;
var shop_type = getApp().globalData.globalData.shop_type;
var navList = [{
  id: "live_type",
  title: "推荐",
  value: "0"
}];
import imageloader from "../common/imageloader/imageloader";

export default {
  data() {
    return {
      title_name: '送心视频',
      title_logo: '../../images/footer-icon-05.png',
      img_discount: '../../images/discount.png',
      default_img: weburl + '/uploads/default_goods_image.png',
      poster_image: weburl + '/uploads/video_poster_image.png',
      logo_image: weburl + '/uploads/video_logo_image.png',
      activeIndex: 0,
      navList: navList,
      images: [],
      all_rows: 0,
      venuesItems_show: [],
      show_max: 1,
      page: 1,
      pagesize: 20,
      loadingHidden: true,
      // loading
      is_goodslist_loading: false,
      msgList: [],
      hidden: true,
      scrollTop: 0,
      scrollHeight: 0,
      tab: 'is_recommend',
      tab_value: "1",
      shop_type: shop_type,
      //商家类型 1普通
      scrollLeft: 0,
      toView: 0,
      hiddenallclassify: true,
      shop_type: shop_type,
      animationData: "",
      floorstatus: false,
      pageoffset: 0,
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
      keyword: "",
      index: ""
    };
  },

  components: {
    imageloader
  },
  props: {},
  onLoad: function (options) {
    console.log('onLoad', options);
    var that = this;
    var username = options.username ? options.username : wx.getStorageSync('username');
    var token = options.token ? options.token : wx.getStorageSync('token');
    var navlist_toView = options.navlist ? options.navlist : 0;
    var navlist_title = options.navlist_title ? options.navlist_title : '';
    that.setData({
      username: username,
      token: token,
      navlist_toView: navlist_toView,
      navlist_title: navlist_title
    }); //that.setNavigation()
    //调用应用实例的方法获取全局数据

    getApp().globalData.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
    wx.getSystemInfo({
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
      that.setData({
        title_logo: '../../images/back.png'
      });
    }
  },
  onShareAppMessage: function () {
    return {
      title: '送心礼物',
      desc: '开启礼物电商时代，200万人都在用的礼物小程序！',
      path: '/pages/list/list?refername=' + username
    };
  },
  methods: {
    //定位数据  
    getleft: function (e) {
      var that = this;
      that.setData({
        scrollLeft: that.scrollLeft + 10
      });
    },
    // 打开全部子分类
    openAllTapTag: function (e) {
      var that = this;
      var hiddenallclassify = that.hiddenallclassify;
      that.setData({
        hiddenallclassify: !hiddenallclassify
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

    touchStart(e) {
      var that = this; // console.log(e)

      that.setData({
        "startX": e.changedTouches[0].clientX,
        "startY": e.changedTouches[0].clientY
      });
    },

    touchEnd(e) {
      var that = this;
      let endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;
      let direction = util.getTouchData(endX, endY, that.startX, that.startY);
      var toView = that.toView;

      if (direction == 'right') {
        if (that.toView < that.navList.length) {
          toView--;
        }
      } else if (direction == 'left') {
        if (that.toView > 0) {
          toView++;
        }
      } else {//that.scrolltoupper(e)
      }

      that.setData({
        toView: toView
      });
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

      that.setData({
        activeIndex: index,
        tab: tab,
        tab_value: tab_value,
        page: 1,
        toView: toView ? toView : 0,
        scrollTop: 0,
        venuesItems_show: []
      });
      console.log('toView:' + that.toView);
      that.get_liveroom_list();

      if (hiddenallclassify == false) {
        that.openAllTapTag();
      }

      console.log(hiddenallclassify);
    },
    // 获取滚动条当前位置
    scrolltoupper: function (e) {
      var that = this;

      if (e.detail.scrollTop > 100) {
        this.setData({
          floorstatus: true
        });

        if (that.platform == 'ios') {//that.getMoreGoodsTapTag() //苹果手机渲染更快，多给记录
          //console.log('list scrolltoupper():', e.detail.scrollTop, that.data.platform)
        }
      } else {
        this.setData({
          floorstatus: false
        });
      } //console.log('list scrolltoupper():', e.detail.scrollTop)

    },
    //回到顶部
    goTop: function (e) {
      // 一键回到顶部
      var that = this;
      that.setData({
        scrollTop: 0,
        venuesItems_show: [],
        page: 1,
        pageoffset: 0
      });
      that.get_liveroom_list();
    },
    searchTapTag: function (e) {
      var that = this;
      console.log('搜索关键字：' + that.search_goodsname);
      that.setData({
        venuesItems_show: []
      });
      that.get_liveroom_list();
    },
    getMoreGoodsTapTag: function (e) {
      var that = this;
      var page = that.page + 1;
      var all_rows = that.all_rows;
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
        that.setData({
          loadingHidden: false,
          loading_note: '已经到底了'
        });
        setTimeout(function () {
          that.setData({
            loadingHidden: true
          });
        }, 1000);
        return;
      }

      that.setData({
        page: page
      });
      that.get_liveroom_list();
    },
    search_goodsnameTapTag: function (e) {
      var that = this;
      var keyword = e.detail.value;
      that.setData({
        keyword: keyword
      });
    },
    get_liveroom_list: function (event) {
      var that = this;
      var page = that.page;
      var pagesize = that.pagesize;
      var username = that.username;
      var token = that.token;
      var shop_type = that.shop_type;
      var live_type = that.tab;
      var live_type_value = that.tab_value;
      var show_max = that.show_max;
      that.setData({
        is_goodslist_loading: true,
        loadingHidden: false
      });
      wx.request({
        url: weburl + '/api/client/get_liveroom_list',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          page: page,
          pagesize: pagesize,
          live_type: live_type,
          live_type_value: live_type_value,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var venuesItems_show = that.venuesItems_show;
          console.log('get_liveroom_list:', res.data, 'page:', page);
          var venuesItems_new = res.data.result;
          var all_rows = res.data.all_rows;
          var pageoffset = res.data.pageoffset;

          if (!venuesItems_new) {
            wx.showToast({
              title: '没有搜到记录',
              icon: 'loading',
              duration: 1000
            });
            that.setData({
              venuesItems_show: [],
              all_rows: 0,
              is_goodslist_loading: false,
              keyword: ''
            });
            return;
          } //var venuesItems = that.data.venuesItems


          if (venuesItems_new) {
            for (var i = 0; i < venuesItems_new.length; i++) {
              venuesItems_new[i]['live_poster'] = venuesItems_new[i]['live_poster'] ? venuesItems_new[i]['live_poster'] : that.poster_image;

              if (venuesItems_new[i]['live_poster'].indexOf("http") < 0) {
                venuesItems_new[i]['live_poster'] = weburl + '/' + venuesItems_new[i]['live_poster'];
              }

              venuesItems_new[i]['logo'] = venuesItems_new[i]['logo'] ? venuesItems_new[i]['logo'] : that.logo_image;

              if (venuesItems_new[i]['logo'].indexOf("http") < 0) {
                venuesItems_new[i]['logo'] = weburl + '/' + venuesItems_new[i]['logo'];
              }
            }

            if (page > 1 && venuesItems_new) {} //向后合拼
            //venuesItems = that.data.venuesItems.concat(venuesItems_new);
            //更新当前显示页信息


            if (venuesItems_show.length >= show_max) {
              venuesItems_show.shift();
            }

            that.setData({
              //venuesItems: venuesItems,
              ["venuesItems_show[" + (page - 1) + "]"]: venuesItems_new,
              page: page,
              all_rows: all_rows,
              pageoffset: pageoffset,
              keyword: ''
            }, function () {
              that.setData({
                is_goodslist_loading: false
              });
            });
          }
        }
      });
    },
    get_menubar: function (event) {
      //获取菜单项
      var that = this;
      var navlist_toView = that.navlist_toView;
      var navlist_title = that.navlist_title;
      wx.request({
        url: weburl + '/api/client/get_menubar',
        method: 'POST',
        data: {
          menu_type: 2
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('get_menubar:', res.data.result);
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

          that.setData({
            navList: navList_new,
            index: navlist_toView,
            activeIndex: navlist_toView,
            tab: navList_new[navlist_toView]['id'],
            tab_value: navList_new[navlist_toView]['value'],
            venuesItems_show: []
          }, function () {
            that.setData({
              loadingHidden: true
            });
            that.get_liveroom_list();
          });
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
@import "./live.css";
</style>