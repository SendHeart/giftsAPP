<template>
<view>
	<view class="top-title">
		<view class="top-title-item">最近新增</view>
	</view>
	<view v-if="friends_latest[0]" class="top-bar-list">
		<scroll-view scroll-x="true" @scroll="getleft" :scroll-into-view="'v_' + toViewX" class="top-bar">
			<block v-for="(item, friend_idx) in friends_latest" :key="friend_idx"  >
				<view :id="'v_' + index" class="top-bar-item" @tap="friendinfo(item)">
					<view class="friend-image" >
						<image class="friend-image-headimg" :src="item.wx_headimg" mode="aspectFill"></image>
						<text>{{item.wx_nickname}}</text>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
 
	<mescroll-uni top="260" bottom="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"  @emptyclick="emptyClick" @scroll="scroll" @topclick="goTop" @init="mescrollInit">	
		<view class="friend-list" v-for="(item,friend_idx) in friends" :key="friend_idx"  @tap="friendinfo(item)">
			<view class="friend-list-image">
			  <image :src="item.wx_headimg" mode="aspectFill"></image>
			</view>
			<view class="friend-list-text">{{item.full_name?item.full_name:item.wx_nickname}}</view>
			<view class="friend-list-right-image">
			  <image src="../../../static/images/right-arrow.png" mode="aspectFill"></image>
			</view>
		</view>
	</mescroll-uni>
</view>
</template>

<script>
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
var weburl = getApp().globalData.weburl;
var appid = getApp().globalData.appid;
var appsecret = getApp().globalData.secret;
var shop_type = getApp().globalData.shop_type;

var navList_order = [{
  id: "send",
  title: "我送出的"
}, {
  id: "receive",
  title: "我收到的"
}];
var now = new Date().getTime();
var navList2 = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [{}];
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';

export default {
  data() {
    return {
      title_name: '礼物袋',
      title_logo: '../../images/history_s.png',
      nickname: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      friends: [],
      friends_show: [],
      friends_latest: [],
      friends_next: [],
      colors: [],
      keyword: '',
      user_name: '',
      shop_type: shop_type,
      page: 1,
      pagesize: 10,
      show_max: 1,
      //最多显示页数
      status: 0,
      navList_order: navList_order,
	  index:0,
      tab2: 'send',
      activeIndex2: 0,
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
      is_loading: false,
      lastX: 0,
      //滑动开始x轴位置
      lastY: 0,
      //滑动开始y轴位置
      text: "没有滑动",
      currentGesture: 0,
      //标识手势
      current_scrollTop: 0,
      needPhoneNumber: '微信授权',
      needUserName: '微信授权',
      inputShowed: false,
      toViewX: 0,
      toViewY: 0,
      scrollLeft: 0,
      loading_note: "",
      floorstatus: false,
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
    // 订单状态，已下单为1，已付为2，已发货为3，已收货为4 5已经评价 6退款 7部分退款 8用户取消订单 9作废订单 10退款中
    var that = this;
    var status = parseInt(options.status ? options.status : 0);
    var username = wx.getStorageSync('username');
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1'; //that.query_friends()

    //that.reloadData(); // 存为全局变量，控制支付按钮是否显示

    if (status) {
		that.status = status
    
	}

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
  },
  onShow: function () {
    var that = this;
    var friends_show = that.friends_show;
    var username = wx.getStorageSync('username');
    var user_phone = wx.getStorageSync('user_phone') ? wx.getStorageSync('user_phone') : '';
    var user_name = wx.getStorageSync('user_name') ? wx.getStorageSync('user_name') : '';
    var modalHiddenPhone = that.modalHiddenPhone;
    var modalHiddenUserName = that.modalHiddenUserName;
    var userInfo = wx.getStorageSync('userInfo');
    console.log('index onShow() userInfo:', userInfo);

    if (!username || !userInfo) {
      //登录
      wx.navigateTo({
        url: '/pages/login/login?frompage=/pages/index/index'
      });
      return;
    }
  },
  onReady: function () {
	  var that = this 
  },
  methods: {
    goBack: function () {
      wx.switchTab({
        url: '../hall/hall'
      });
    },
	scroll: function(e) {
		var that = this
		var old_scrollTop = that.old.scrollTop
		var current_scrollTop = that.mescroll.scrollTop
		that.old.scrollTop = current_scrollTop
	},
    orderSearch: function () {
      var that = this;
      console.log('orderSearch keyword:', that.keyword);
      that.setData({
        page: 0
      });
      that.reloadData();
    },
    searchTagTap: function () {
      var that = this;
      var hidddensearch = that.hidddensearch;
      that.setData({
        hidddensearch: !hidddensearch
      });
    },
    search_goodsnameTapTag: function (e) {
      var that = this;
      var keyword = e.detail.value;
      that.setData({
        keyword: keyword
      });
    },
	/*
    getMoreGoodsTapTag: function (e) {
      var that = this;
      var page = that.page + 1;
      var rpage_num = that.rpage_num;
      var is_reloading = that.is_reloading;
      console.log('getMoreGoodsTapTag 加载更多中，请稍等 page:', page, 'is_reloading:', is_reloading, that.scrollHeight);

      if (is_reloading) {
        return;
      }

      if (page > rpage_num) {
        wx.showToast({
          title: '已经到底了~',
          icon: 'none',
          duration: 1000
        });
        that.setData({
          loadingHidden: false,
          loading_note: '已经到底了~'
        });
        setTimeout(function () {
          that.setData({
            loadingHidden: true
          });
        }, 1000);
        return;
      }
     
      that.setData({
        page: page,
        loadingHidden: false,
        loading_note: '加载中'
      });
      that.reloadData();
    },
	*/
   /*
    // 获取滚动条当前位置
    scrolltoupper: function (e) {
      if (e.detail.scrollTop > 100) {
        this.setData({
          floorstatus: true,
          hidddensearch: false
        });
      } else {
        this.setData({
          floorstatus: false,
          hidddensearch: true
        });
      }

      this.setData({
        current_scrollTop: e.detail.scrollTop
      });
    },
	*/
    //回到顶部
    goTop: function (e) {
      // 一键回到顶部
      var that = this;
      that.setData({
        scrollTop: 0
      });
      console.log('goTop:', that.scrollTop);
    },
	/*
    getMoreOrdersTapTag: function () {
      var that = this;
      if (that.is_loading) return;
      var page = that.page;
      var pagesize = that.pagesize;
      var all_rows = that.all_rows;

      if (page + 1 > that.page_num) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 1500
        });
        that.setData({
          hiddenmore: true
        });
        return;
      } else {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 2000
        });
        that.setData({
          page: page + 1
        });
        console.log('get More Orders page:', page, 'current scrollTop:', that.current_scrollTop);
        that.reloadData();
      }
    },
	*/
    friendinfo: function (e) {
      var that = this;
      //var friends = that.friends;
      wx.navigateTo({
        url: '/pages/member/friendinfo/friendinfo?friendinfo=' + JSON.stringify(e)
      });
    },
    //定位数据
    getleft: function (e) {
      var that = this;
      var scrollLeft = that.scrollLeft;
      that.setData({
        scrollLeft: scrollLeft + 10
      });
    },
	/*
    reloadData: function () {
      var that = this;
      var scrollTop = that.scrollTop; //保留当前位置
      var current_scrollTop = that.current_scrollTop ? that.current_scrollTop : 0; //保留当前位置
      var order_type = that.tab2;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var status = that.status;
      var shop_type = that.shop_type;
      var page = that.page; //从服务器获取页面序号

      var page_num = that.page_num; //从服务器获取页面数

      var show_max = that.show_max;
      var friends_latest = page == 1 ? [] : that.friends_latest;
      var friends_next = that.friends_next;
      var pagesize = that.pagesize;
      var now = new Date().getTime();
      var currenttime = now ? parseInt(now / 1000) : 0;
      var tips = "查看第" + (page == 0 ? 1 : page) + "页";
      var hidddensearch = that.hidddensearch;
      var keyword = hidddensearch ? '' : that.keyword;
      var userInfo = wx.getStorageSync('userInfo');
      console.log('reloadData userInfo:', userInfo, ' keyword:', keyword);

      if (!username || !userInfo) {
        //登录
        wx.navigateTo({
          url: '/pages/login/login?frompage=/pages/index/index'
        });
        return;
      }

      if (page > page_num && page_num > 0) return;
	  that.is_loading = true
     
      var page_show = friends_next.length;
      var friends_show = that.friends_show; //从服务器获取订单列表

      wx.request({
        url: weburl + '/api/client/get_member_friends',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          status: status,
          shop_type: shop_type,
          type: 3,
          // 3送心礼物好友
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
          var friends_list = res.data.result;
          var all_rows = res.data.all_rows;

          if (!res.data.result && page == 1) {
            wx.showToast({
              title: "空空如也,快去送礼吧！",
              icon: 'none',
              duration: 1500
            });
            setTimeout(function () {
              wx.navigateBack();
            }, 500);
			that.friends = []
			that.friends_show = []
			that.all_rows = 0
			that.hiddenmore = true
            
          } else {
            if (friends_list) {
              for (var i = 0; i < friends_list.length; i++) {
                if (friends_list[i]['wx_headimg'].indexOf("http") < 0) {
                  friends_list[i]['wx_headimg'] = weburl + '/' + friends_list[i]['wx_headimg'];
                }

                if (i < 10 && page == 1) {
                  friends_latest = friends_latest.concat(friends_list[i]);
                }
              }
            }

            var page_num = that.page_num;
            page_num = all_rows / pagesize + 0.5;
            var friends = that.friends;
            friends = friends.concat(friends_list);
			that.friends =  friends
			that.friends_latest =  friends_latest
			that.all_rows =  all_rows
			that.page_num =  page_num
			that.hiddenmore =  false
			that.is_loading =  false
			that.loadingHidden =  false
			
            console.log('送心礼物好友 hall reloadData friends:', that.friends);
          }
        }
      });
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
				this.friends = []; //如果是第一页需手动制空列表
			}
			if(curPageData=='n'){
				mescroll.endByPage(this.page, this.all_rows)
			}else{
				this.friends=this.friends.concat(curPageData); //追加新数据
				
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
		var pagesize = that.pagesize
		var page_num = that.page_num
		var all_rows = that.all_rows
		var keyword = that.keyword
		var friends_latest = that.friends_latest
		var status = that.status
	
		if(page > all_rows && page>1) {
			console.log('加载完成 page:', page, 'all_rows:',all_rows);
			that.is_friendslist_loading = false ;
			successCallback && successCallback('n');
			return ;
		}
		that.is_friendslist_loading = true ;
		//that.status = 'loading';
		console.log('getListDataFromNet Starting ...')
		try{
			wx.request({
			  url: weburl + '/api/client/get_member_friends',
			  method: 'POST',
			  data: {
			    username: username ? username : openid,
			    access_token: token,
			    status: status,
			    shop_type: shop_type,
			    type: 3,
			    // 3送心礼物好友
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
			    var friends_list = res.data.result;
			    var all_rows = res.data.all_rows;
			
			    if (!res.data.result && page == 1) {
			      wx.showToast({
			        title: "空空如也,快去送礼吧！",
			        icon: 'none',
			        duration: 1500
			      });
			      
				  that.friends = []
				  that.friends_show = []
				  that.all_rows = 0
				  that.hiddenmore = true
				  successCallback && successCallback(res.data.status);
			      
			    } else {
			      if (friends_list) {
			        for (var i = 0; i < friends_list.length; i++) {
			          if (friends_list[i]['wx_headimg'].indexOf("http") < 0) {
			            friends_list[i]['wx_headimg'] = weburl + '/' + friends_list[i]['wx_headimg'];
			          }
			
			          if (i < 10 && page == 1) {
			            friends_latest = friends_latest.concat(friends_list[i]);
			          }
			        }
			      }
			
					var page_num = that.page_num;
					page_num = all_rows / pagesize + 0.5;
					var friends = that.friends;
					friends = friends.concat(friends_list);
					that.friends =  friends
					that.friends_latest =  friends_latest
					that.all_rows =  all_rows
					that.page_num =  page_num
					that.hiddenmore =  false
					that.is_loading =  false
					that.loadingHidden =  false
					console.log('送心礼物好友 hall reloadData friends:', that.friends);
					successCallback && successCallback(friends_list)
			    }
			  }
			});
			
		} catch (e) {
			//联网失败的回调
			console.log('getListDataFromNet Starting ...',e)
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
@import "./friends.css";
</style>