
<template>
<view class="uni__uliveWrapper">
	<view class="uni__subNavs">
	<view class="ls flexbox flex_alignc"><text class="item on">推荐</text><text class="item">附近</text><text class="item">跳舞</text><text class="item">音乐</text><text class="item">游戏</text>
	</view>
		</view>
		<view class="uni_uliveList">
		<block v-for="(item,index) in liveList" :key="index">
			<view class="item" @tap="GoLivePlay(index)">
		<image class="lv-thumb" :src="item.poster" mode="aspectFill" />
		<view class="lv-ftinfo">
	<view class="pos"><text class="iconfont icon-dingwei"></text> {{item.location}}</view>
			<view class="title flexbox flex_alignb">{{item.subtitle}}</view>
			<view class="flexbox flex_alignc"><view class="user flex1 flexbox flex_alignc"><image class="avator" :src="item.avator" mode="aspectFill" /> <text class="fs_12 bold">{{item.author}}</text></view>
	<text class="hot"><text class="iconfont icon-hot"></text>{{item.hotNum}}</text></view>
		</view>
		<view v-if="item.online" class="lv-status flexbox flex_alignc"><text class="dot"></text>直播中</view><text class="btn-play iconfont icon-bofang"></text>
	</view>
	</block>
		</view>
	<view class="nlv-attentionFloat flexbox"><image class="af-avator" src="/static/uimg/u__chat_img9.jpg" mode="aspectFill" />
	<view class="af-info"><text class="af-tit">孤独伊人直播开始了</text><text class="af-subtit">心动的感觉</text>
	</view>
	<text class="af_ico iconfont">&#xe84f;</text>
	</view>
	</view>
</template>

<script>
	const liveJson = require('./mock-live.js')
	
	var weburl = getApp().globalData.weburl;
	var playerurl = getApp().globalData.playerurl;
	var appid = getApp().globalData.appid;
	var appsecret = getApp().globalData.secret;
	var user_type = getApp().globalData.user_type ? getApp().globalData.user_type : 0;
	var shop_type = getApp().globalData.shop_type;
	var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
	var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
	var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
	var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
	var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
	var userauth = wx.getStorageSync('userauth') ? wx.getStorageSync('userauth') : '';
	
	export default {
		data() {return {
				liveList: liveJson,
				m_id: m_id,
				is_hoster: false,
				nickName: userInfo.nickName,
				refername: '',
				liveid: '3954',
				streamname: 'sendheart_3989.m3u8',
				playerurl: playerurl,
				advurl: weburl + '/uploads/live_adv_video.mp4',
				currentWebview:null,
				videoplayer:null,
				videourl: '',
				videoList:[],
				liveurl: '',
				live_goods: '',
				errorhidden: true,
				error_message: '',
				poster_image: weburl + '/uploads/video_poster_image.png',
				page: 1,
				pagesize: 10,
				pageoffset: 0,
				goods_page: 1,
				goods_pagesize: 20,
				goods_all_rows: 0,
				goods_num: 1,
				venuesItems: [],
			}
		},
		onLoad: function (options) {
		  var that = this;
		  var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
		  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
		  var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
		  var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
		  var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
		  var liveid = options.liveid ? options.liveid : '3954';
		  var live_goods = options.live_goods ? options.live_goods : '';
		  var live_name = options.live_name ? options.live_name : '送心礼物';
		  var live_poster = options.live_poster ? options.live_poster : that.poster_image;
		  var live_desc = options.live_desc ? options.live_desc : that.share_desc;
		  var live_logo = options.live_logo ? options.live_logo : that.share_logo;
		  var is_live = options.is_live ? options.is_live : false;
		  var advurl = options.advurl ? options.advurl : that.advurl;
		  var playerurl = that.playerurl;
		  var streamname = options.liveid ? 'sendheart_' + liveid + '.m3u8' : that.streamname;
		  var refername = options.refername ? options.refername : '';
			 
		  if (options) {
				that.onload_options = options
		  }
		  that.m_id = m_id
		  that.nickName = userInfo.nickName
		  that.liveurl = playerurl + '/' + streamname
		  that.live_goods = live_goods
		  that.live_name = live_name
		  that.live_poster = live_poster
		  that.live_desc = live_desc
		  that.live_logo = live_logo
		  that.liveid = liveid
		  that.is_live = is_live
		  that.refername = refername
		  that.query_liveroom_info();
		  that.get_goods_list(); //console.log('options:',options)
			uni.getSystemInfo({
		    success: function (res) {
		      let winHeight = res.windowHeight;
		      let winWidth = res.windowWidth;
				that.dkheight = winHeight
				that.winHeight = winHeight
				that.winWidth = winHeight
		      console.log(winHeight);
		    }
		  })
		  console.log('player onLoad liveurl:', that.liveurl, ' liveid:', liveid, ' dkheight:', that.dkheight, ' live_name:', live_name, ' playerurl:', playerurl);
		},
		onShow: function () {
		  var that = this;
		  
		   
		},
		onReady() {
			 
		},
		methods: {
			GoLivePlay(index) {
				uni.navigateTo(
				{
					url: '/pages/uLive/subnvue/live?index=' + index,
				}
				)
			},
			query_liveroom_info: function (event) {
			  //venuesList
			  var that = this;
			  var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
			  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
			  var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
			  var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : '';
			  var liveid = that.liveid;
			  var is_hoster = that.is_hoster;
			  var live_status = that.live_status;
			  var is_live = that.is_live;
			  var is_live_loading = that.is_live_loading;
			
			  if (is_live_loading) {
			    return;
			  }
			  that.is_live_loading = true
			  
			  wx.request({
			    url: weburl + '/api/client/get_liveroom_list',
			    method: 'POST',
			    data: {
			      username: username,
			      access_token: token,
			      liveid: liveid,
			      shop_type: shop_type
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      'Accept': 'application/json'
			    },
			    success: function (res) {
			      console.log('query_liveroom_info:', res.data);
				  that.is_live_loading = false
			      if (res.data.status != 'y') {
						that.videourl = that.liveurl
						that.live_focus_status = true
						return;
			      }
				  
			      var liveinfo = res.data.result;
			
			      if (is_live && live_status == 3 && liveinfo[0]['live_status'] == 1) {
			        //暂停恢复
			        console.log('player rePlay 暂停恢复 重新播放');
			        //that.rePlay();
			        return;
			      }
				  that.live_status = liveinfo[0]['live_status']
			     
			      if (liveinfo[0]['live_status'] == 2) {
			        //锁定状态
			        wx.showToast({
			          title: '暂无视频',
			          icon: 'none',
			          duration: 1500
			        });
			        return;
			      }
			
			      if (liveinfo[0]['logo'].indexOf("http") < 0) {
			        liveinfo[0]['logo'] = weburl + '/' + liveinfo[0]['logo'];
			      }
			
			      var live_hoster = liveinfo[0]['live_hoster'] ? liveinfo[0]['live_hoster'].split(',') : [];
			
			      for (var i = 0; i < live_hoster.length; ++i) {
			        if (m_id == live_hoster[i]) is_hoster = true;
			      }
			
			      if (liveinfo && liveinfo[0]['live_status'] == 0) {
			        //离线 取视频url
			        if (!is_live) {
			          //离线视频
			          var videourl = liveinfo[0]['videourl'];
					  that.videourl = videourl ? videourl : that.liveurl
					  that.live_logo = liveinfo[0]['logo']
					  that.live_name = liveinfo[0]['shop_name'] ? liveinfo[0]['shop_name'] : '送心礼物'
					  that.live_hoster = live_hoster
					  that.is_hoster = is_hoster
			           
			        } else {
			          //结束了
			          var error_message = '结束了';
			          var errorTitile = '提示信息';
					  that.errorhidden = false
					  that.error_message = error_message
					  that.errorTitile = errorTitile
			
			          return;
			        }
			      } else if (liveinfo && liveinfo[0]['live_status'] == 3) {
			        //暂停
			        wx.showToast({
			          title: '暂停中...',
			          icon: 'loading',
			          duration: 1500
			        });
			        that.playwaiting();
			        return;
			      } else {
			        //在线
					that.videourl = that.liveurl
					that.is_live = that.is_live
					that.live_starttime = liveinfo[0]['endtime']
					that.live_logo = liveinfo[0]['logo']
					that.live_name = liveinfo[0]['shop_name'] ? liveinfo[0]['shop_name'] : '送心礼物'
					that.live_hoster = live_hoster
					that.is_hoster = is_hoster
			      } 
				  console.log('query_liveroom_info videourl:', that.videourl, ' live_starttime:', that.live_starttime, ' live_logo:', that.live_logo, ' live_name:', that.live_name, ' live_hoster:', live_hoster, 'is_hoster:',is_hoster)
			    },
			    fail: function (e) {
					that.videourl = that.liveurl
			    }
			  });
			},
			get_goods_list: function (event) {
			  //venuesList
			  var that = this;
			  var goods_page = that.goods_page;
			  var goods_pagesize = that.goods_pagesize;
			  var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
			  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
			  var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
			  var live_goods = that.live_goods;
			  var live_adv_goods = [];
			  that.loadingHidden = false
			  that.is_goods_loading = true
			   
			  wx.request({
			    url: weburl + '/api/client/get_goods_list',
			    method: 'POST',
			    data: {
			      live_goods: live_goods,
			      username: username,
			      access_token: token,
			      page: goods_page,
			      pagesize: goods_pagesize,
			      shop_type: shop_type
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      'Accept': 'application/json'
			    },
			    success: function (res) {
			      // console.log('get_goods_list:', res.data)
			      var venuesItems = res.data.result;
			      var all_rows = res.data.all_rows;
			
			      if (!venuesItems) {
			        that.venuesItems = []
					that.goods_all_rows = 0
			        return;
			      }
			
			      for (var i = 0; i < venuesItems.length; i++) {
			        if (!venuesItems[i]['goodsno']) {
			          venuesItems[i]['goodsno'] = i + 1;
			        }
			
			        if (!venuesItems[i]['act_info']) {
			          venuesItems[i]['act_info'] = '';
			        }
			
			        if (!venuesItems[i]['goods_tag']) {
			          venuesItems[i]['goods_tag'] = '';
			        } else {
			          venuesItems[i]['goods_tag'] = venuesItems[i]['goods_tag'].substring(0, 10);
			        }
			
			        venuesItems[i]['image'] = venuesItems[i]['activity_image'] ? venuesItems[i]['activity_image'] : venuesItems[i]['image'];
			
			        if (venuesItems[i]['image'].indexOf("http") < 0) {
			          venuesItems[i]['image'] = weburl + '/' + venuesItems[i]['image'];
			        }
			      }
			
			      if (goods_page > 1 && venuesItems) {
			        //向后合拼
			        venuesItems = that.venuesItems.concat(venuesItems);
			      }
				  that.venuesItems = venuesItems
				  that.goods_all_rows = all_rows
				  that.goods_num = (all_rows - goods_page) * goods_pagesize + venuesItems.length
				  that.goods_page = goods_page
				  that.loadingHidden = true
				  that.is_goods_loading = false
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
	}
</script>

<style scoped>

</style>