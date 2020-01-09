<template>
<view>
	<mescroll-uni top="60" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"  @emptyclick="emptyClick" @scroll="scroll" @topclick="goTop" @init="mescrollInit">
		<view class="userinfo">
			<image class="userinfo-avatar" :src="(friendinfo.wx_headimg?friendinfo.wx_headimg:default_avatar)" background-size="cover"></image>
			<text v-if="friendinfo.wx_nickname" class="userinfo-nickname">{{friendinfo.wx_nickname}}</text>
		<button class="userinfo-nickname" style="margin-top:10rpx;line-height:50rpx;height:50rpx;font-size: 26rpx;color:#fff;background:#e02e24" hover-class="none" @tap="pickgift">发起送礼</button>
		</view>
		
		<view class="menu-area">
			<view v-if="friendinfo.full_name" class="tableviewcell linegray" :style="'width:' + windowWidth-35 + 'px'">
				<text style="color:#808080;">姓名</text>
				<text>{{friendinfo.full_name}}</text>
			</view>
			<view v-if="friendinfo.tel" class="tableviewcell linegray" :style="'width:' + windowWidth-35 + 'px'">
				<text style="color:#808080;">电话</text>
				<text style="color:#e52445;">{{friendinfo.tel}}</text>
			</view>
			<view v-if="friendinfo.address" class="tableviewcell linegray" :style="'width:' + windowWidth-35 + 'px'">
				<text style="color:#808080;">地址</text>
				<text>{{friendinfo.address}}</text>
			</view>
			<view class="tableviewcell2 linegray" :style="'width:' + windowWidth-35 + 'px'">
				<text style="color:#fff;">记录</text>
				<image src="../../../static/images/icon_add_bg_red.png" @tap="friendinfoedit(0)"></image>
			</view>
		</view>
		<view class="friendinfo-list" v-for="(item,friend_idx) in friendinfo_list" :key="friend_idx"  @tap="friendinfoedit(item.id)">
			<view class="friendinfo-list-image">
				<image src="../../../static/images/u8.png" mode="aspectFill"></image>
			</view>
			<view class="friendinfo-list-info">
				<view class="friendinfo-list-info-text">{{item.info.info}}</view>
				<view class="friendinfo-list-info-text">{{item.info.note_date}}{{item.info.note_str?' ,'+item.info.note_str:''}}</view>
			</view>
		</view>
	</mescroll-uni>
</view>
</template>

<script>
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";	
var wxparse = require("../../../wxParse/wxParse.js");
var weburl = getApp().globalData.weburl;
var appid = getApp().globalData.appid;
var appsecret = getApp().globalData.secret;
var user_type = getApp().globalData.user_type ? app.globalData.user_type : 0;
var shop_type = getApp().globalData.shop_type;
var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
var userauth = wx.getStorageSync('userauth') ? wx.getStorageSync('userauth') : '';
var navList2 = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [{}];
var page = 1;
var pagesize = 20;

export default {
  data() {
    return {
      title_name: '我的',
      title_logo: '/images/footer-icon-05.png',
      share_art_image: weburl + '/uploads/share_art_image.jpg',
      nickname: userInfo.nickName ? userInfo.nickName : '登录',
      avatarUrl: userInfo.avatarUrl,
      userauth: userauth,
      default_avatar: weburl + '/uploads/avatar.png',
      all_rows: 0,
      page: page,
      pagesize: pagesize,
	  toViewY:0,
      friendinfo: '',
      friend_id: 0,
      infoid: 0,
      friendinfo_list: [],
      friendinfo_show: [],
      show_max: 1,
      scrollTop: 0,
      shop_type: shop_type,
      index: 0,
      art_index: 0,
      web_url: '',
      web_id: '',
      inputShowed: false,
      hiddenmore: true,
      windowWidth: "",
      windowHeight: "",
      dkheight: "",
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
    }
  },

  components: {
  	  MescrollUni,
  },
  props: {},
  mounted() {
  	this.isInit = true; // 标记为true
  	this.mescroll.triggerDownScroll();
  },
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
    var friendinfo = options.friendinfo ? JSON.parse(options.friendinfo) : '';
    var friend_id = friendinfo ? friendinfo['f_id'] : 0;
    that.setData({
      friendinfo: friendinfo,
      friend_id: friend_id
    });
    wx.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight;
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          dkheight: winHeight
        });
      }
    });
    console.log("friendinfo onload options:", options);
  },
  onShow: function () {
    var that = this;
    //that.get_member_note();
	if(that.mescroll){
		that.isInit = true; // 标记为true
		that.mescroll.triggerDownScroll();
	}
  },
  onShareAppMessage: function () {
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
  },
  methods: {
    pickgift: function (e) {
      var that = this;
      wx.navigateTo({
        url: '/pages/list/list?navlist=1'
      });
    },
    friendinfoedit: function (info_id) {
      var that = this;
      var friendinfo = that.friendinfo;
      var infoid = info_id?info_id:0;
      infoid = infoid ? infoid : that.infoid;
	  console.log('friendinfoedit friendinfo:',friendinfo,' info id:',infoid)
      wx.navigateTo({
        url: '/pages/member/friendinfoedit/friendinfoedit?friendinfo=' + JSON.stringify(friendinfo) + '&infoid=' + infoid
      });
    },
	/*
    get_member_note: function () {
      var that = this;
      var show_max = that.show_max;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      var friendinfo = that.friendinfo;
      var friend_id = that.friend_id ? that.friend_id : friendinfo['f_id'];
      var friendinfo_show = that.friendinfo_show;
      wx.request({
        url: weburl + '/api/client/get_member_friendinfo',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          f_id: friend_id,
          shop_type: shop_type,
          type: 0 //0提醒

        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var friendinfo = res.data.result; // console.log('friendinfo get_member_note:', friendinfo)

          if (!friendinfo) {
            wx.showToast({
              title: '没有搜到记录',
              icon: 'loading',
              duration: 1000
            });

            if (page == 1) {
				that.friendinfo_show = []
				that.all_rows = 0 
				that.hiddenmore = false 
            }
            return;
          }

          if (res.data.status == 'y') {
            var all_rows = res.data.all_rows;

            if (friendinfo) {
              for (var i = 0; i < friendinfo.length; i++) {
                if (friendinfo[i]['content']) {
                  friendinfo[i]['info'] = JSON.parse(friendinfo[i]['content']);
                }
              }
            }

            var friendinfo_list = that.friendinfo_list;

            if (friendinfo_show.length >= show_max) {
              friendinfo_show.shift();
            }
			that.friendinfo_list = friendinfo_list.concat(friendinfo)
			that.all_rows = all_rows
			that.friendinfo_show[page - 1] = friendinfo
            console.log('friendinfo get_member_note:', friendinfo);
          }
        }
      });
    },
	*/
	scroll: function(e) {
		var that = this
		var old_scrollTop = that.old.scrollTop
		var current_scrollTop = that.mescroll.scrollTop
		that.old.scrollTop = current_scrollTop
		
	},
    goBack: function () {
      var that = this;
      var pages = getCurrentPages();
      var userInfo = wx.getStorageSync('userInfo');
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
	/*
    getMoreFriendinfoTapTag: function (e) {
      var that = this;
      var page = that.page + 1;
      var all_rows = that.all_rows;

      if (page > all_rows) {
        wx.showToast({
          title: '没有更多的数据',
          icon: 'loading',
          duration: 1000
        });
		that.hiddenmore = true
        return;
      }
	  that.page = page
      that.get_member_note();
    },
	*/
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
   			this.friendinfo_list = []; //如果是第一页需手动制空列表
   		}
   		if(curPageData=='n'){
   			mescroll.endByPage(this.page, this.all_rows)
   		}else{
   			this.friendinfo_list=this.friendinfo_list.concat(curPageData); //追加新数据
   			
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
		var page = that.page;
		var pagesize = that.pagesize
		var page_num = that.page_num
		var all_rows = that.all_rows
		var friendinfo = that.friendinfo;
		var friend_id = that.friend_id ? that.friend_id : friendinfo['f_id'];
   
		if(page > all_rows && page>1) {
			console.log('加载完成 page:', page, 'all_rows:',all_rows);
			that.is_friendslist_loading = false ;
			successCallback && successCallback('n');
			return ;
		}
		that.is_friendslist_loading = true ;
		that.status = 'loading';
		console.log('getListDataFromNet Starting ...')
		try{
			wx.request({
				url: weburl + '/api/client/get_member_friendinfo',
				method: 'POST',
				data: {
					username: username,
					access_token: token,
					page:page,
					pagesize:pagesize,
					f_id: friend_id,
					shop_type: shop_type,
					type: 0 ,//0提醒
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				success: function (res) {
					var friendinfo = res.data.result; 
					//console.log('friendinfo get_member_note:', friendinfo)
					if (!friendinfo) {
						wx.showToast({
							title: '暂无记录',
							icon: 'loading',
							duration: 1000
						});
   		
						if (page == 1) {
							that.friendinfo_list = []
							that.all_rows = 0 
							that.hiddenmore = false 
						}
						successCallback && successCallback(res.data.status);
						return;
					}
   		
					if (res.data.status == 'y') {
						var all_rows = res.data.all_rows;
   		
						if (friendinfo) {
							for (var i = 0; i < friendinfo.length; i++) {
								if (friendinfo[i]['content']) {
									friendinfo[i]['info'] = JSON.parse(friendinfo[i]['content']);
								}
							}
						}
   		
						 
						that.all_rows = all_rows
						console.log('friendinfo get_member_note:', friendinfo);
						successCallback && successCallback(friendinfo)
					}
				}
			})
		} catch (e) {
			//联网失败的回调
			console.log('getListDataFromNet failed ...',e)
			errorCallback && errorCallback();
		}
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
@import "./friendinfo.css";
</style>