<template>
<view v-if="popupVisible" class="popup-footer">
	<view class="pop__ui_panel">
		<view class="pop__ui_mask" @tap="close"></view>
		<view class="pop__ui_child anim-footer">
			<view class="pop__ui_body">
			<scroll-view class="nlv-rollMsgPanel" scroll-y show-scrollbar="false" >
				<view class="danmu-scroll-list" ref="danmu_scroll_list">
				<block v-for="(msgitem, msgidx) in danmuList" :key="msgidx">
					<view class="nlv-msglist">
						<view class="msg_bg">
							<text class="msg_name">{{msgitem.uname}}</text> 
							<text class="msg_text">{{msgitem.content}}</text>
						</view>
					</view>
				</block>
				</view>
			</scroll-view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	var weburl = getApp().globalData.weburl;
	var playerurl = getApp().globalData.playerurl;
	var appid = getApp().globalData.appid;
	var appsecret = getApp().globalData.secret;
	var user_type = getApp().globalData.user_type ? getApp().globalData.user_type : 0;
	var shop_type = getApp().globalData.shop_type;
	var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
	var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : 0;
	var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
	var userauth = uni.getStorageSync('userauth') ? uni.getStorageSync('userauth') : ''; 
	
	export default {
		data() {
			return {
				popupVisible: false,
				cartList: [],
				index:0,
				liveid:0,
				is_goods_loading:false,
				goods_page: 1,
				goods_pagesize: 20,
				goods_all_rows: 0,
				goods_num: 1,
				venuesItems: [],
				goods_scrollTop: 0,
				current_goods_scrollTop: 0,
				is_hoster: false,
				is_live:false,
				danmuServ: [],
				danmuList: [],
				danmustatus: true,
				tanmuHidden: true,
				modalDanmuHidden: true,
				cur_danmu_num: 0,
				danmu_num_max: 200,
				danmu_scrollTop: 0,
			}
		},
		props: [
			'vlist',
		],
		onLoad(){
			var that = this
			setTimeout(function () {
			  that.queryDanmu()
			}, 1000)
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
		},
		methods: {
			show(options) {
				var that = this
				var options = options?JSON.parse(options):'{}'
				var index = options.index?options.index:0
				this.liveid = options.liveid?options.liveid:3989
				this.live_goods = options?options.live_goods:{},
				this.is_hoster = options.is_hoster?options.is_hoster:this.is_hoster
				//this.cartList = this.vlist[index].cart
				this.popupVisible = true
				console.log('直播弹幕 options:', options)
			},
			close() {
				this.popupVisible = false
			},
			getMoreGoodsTapTag() {
			  var that = this;
			  var goods_page = that.goods_page + 1;
			  var goods_all_rows = that.goods_all_rows;
			  var is_goods_loading = that.is_goods_loading;
			  if (is_goods_loading) return;
			
			  if (goods_page > goods_all_rows) {
				  that.loadingHidden = false
			   
			    setTimeout(function () {
					that.loadingHidden = true
			    }, 1000);
			    return;
			  }
			  that.goods_page = goods_page
			},
			// 获取滚动条当前位置 goods
			goods_scrolltoupper(e) {
			  if (e.detail.scrollTop > 100) {
				  this.floorstatus = true 
				  this.hidddensearch = false 
			   
			  } else {
				  this.floorstatus = false
				  this.hidddensearch = true 
			  }
			  this.current_goods_scrollTop = e.detail.scrollTop
			},
			
			queryDanmu() {
			  var that = this;
			  var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			  var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
			  var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
			  var nickName = this.nickName ? this.nickName + ':' : '';
			  var m_id = uni.getStorageSync('m_id') ? uni.getStorageSync('m_id') : '';
			  var liveid = that.liveid;
			  var danmuList = that.danmuList;
			  var danmu_num_max = that.danmu_num_max;
			  var live_adv_note = [];
			  var live_adv_goods = [];
			  var page = that.page;
			  var pagesize = that.pagesize;
			  var pageoffset = parseInt(that.pageoffset);
			  var danmustatus = that.danmustatus;
			  var is_danmu_loading = that.is_danmu_loading;
			  var cur_danmu_num = 0;
			  var videoIndex = that.videoIndex
			  
			  if (!danmustatus || is_danmu_loading) {
			    console.log('弹幕信息正在加载 live id:', liveid, 'm_id:', m_id, ' pageoffset:', pageoffset);
			    return;
			  }
			  that.is_danmu_loading = true
					
			  //console.log('获取服务端弹幕信息 live id:', liveid, 'm_id:', m_id, ' pageoffset:', pageoffset)
			
			  uni.request({
			    url: weburl + '/api/client/query_danmu',
			    method: 'POST',
			    data: {
			      username: username ? username : openid,
			      m_id: m_id,
			      liveid: liveid,
			      access_token: token,
			      shop_type: shop_type,
			      pageoffset: pageoffset,
			      page: page,
			      pagesize: pagesize
			    },
			    header: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      'Accept': 'application/json'
			    },
			    success: function (res) {
			      if (res.data.status == 'y') {
			        var danmuServ = res.data.result;
			        var all_rows = parseInt(res.data.all_rows); 
					console.log('获取服务端弹幕信息完成:', res.data)
			
			        if (danmuServ && danmuServ.danmu_list) {
			          for (var i = 0; i < danmuServ.danmu_list.length; i++) {
			            if (danmuServ.danmu_list[i].type == 0) {
			              // 弹幕信息
			              var nickName = danmuServ.danmu_list[i]['nickname'] ? danmuServ.danmu_list[i]['nickname'] + ':' : '';
			              var background_color = nickName ? getRandomColor() : '#e34c55';
			              var cur_danmu = {
							id:	danmuServ.danmu_list[i]['id'],
							uname: nickName,
			                content: danmuServ.danmu_list[i]['content'],
			                color: getRandomColor(),
			                background_color: background_color
			              };
			
			              if (danmuList.length > danmu_num_max - 1) {
			                danmuList.shift();
			              }
			
			              danmuList.push(cur_danmu);
			              cur_danmu_num = cur_danmu_num + 1;
						  
			            } else if (danmuServ.danmu_list[i].type == 1) {
			              //note通知
			              var cur_adv_note = danmuServ.danmu_list[i]['content'] ? JSON.parse(danmuServ.danmu_list[i]['content']) : '';
			
			              if (cur_adv_note['list']) {
			                //note通知
			                for (var k = 0; k < cur_adv_note['list'].length; k++) {
			                  if (cur_adv_note['list'][k]['image'].indexOf("http") < 0) {
			                    cur_adv_note['list'][k]['image'] = weburl + '/' + cur_adv_note['list'][k]['image'];
			                  }
			
			                  if (cur_adv_note['list'][k]['m_id'] == m_id) {
			                    cur_adv_note['sub_title'] = '恭喜您中奖了!';
			                  }
			                }
			              }
			
			              live_adv_note.push(cur_adv_note);
			              if (!cur_adv_note['sub_title'] && !cur_adv_note['note']) cur_adv_note['sub_title'] = '很遗憾，您本次没有中奖~';
			            } else if (danmuServ.danmu_list[i].type == 2) {
			              //商品推荐
			              var cur_adv_goods = danmuServ.danmu_list[i]['content'] ? JSON.parse(danmuServ.danmu_list[i]['content']) : '';
			
			              if (cur_adv_goods['image'].indexOf("http") < 0) {
			                cur_adv_goods['image'] = weburl + '/' + cur_adv_goods['image'];
			              }
			
			              live_adv_goods.push(cur_adv_goods);
			            }
			          }
			        }
			
			        var live_focus_num = danmuServ.focus_num ? danmuServ.focus_num : 0;
			        var live_focus_status = danmuServ.focus_status ? danmuServ.focus_status : that.live_focus_status;
			        var live_sub_name = live_focus_num > 10000 ? '人气:' + (live_focus_num / 10000).toFixed(2) + '万' : '人气:' + live_focus_num;
			        if (all_rows > 0) pageoffset = all_rows;
			        
			        that.live_focus_num = live_focus_num
					that.live_sub_name = live_sub_name
					that.danmuList = danmuList
					that.pageoffset = all_rows > 0 ? pageoffset : that.pageoffset
					that.cur_danmu_num = cur_danmu_num?cur_danmu_num:0
					that.modalAdvNotehidden = live_adv_note.length > 0 ? false : that.modalAdvNotehidden
					that.live_adv_note = live_adv_note ? live_adv_note : that.live_adv_note
					that.modalAdvGoodshidden = live_adv_goods.length > 0 ? false : that.modalAdvGoodshidden
					that.live_adv_goods = live_adv_goods ? live_adv_goods : that.live_adv_goods
			      }
				  that.vlist[videoIndex].hotNum = that.live_sub_name
				  that.vlist[videoIndex].attention = live_focus_status
				  that.is_danmu_loading = !that.is_danmu_loading
				   that.danmu_scroll_auto()
				  console.log('获取服务端弹幕/商品推荐/通知信息完成 all_rows:', all_rows, 'pageoffset:', pageoffset, ' danmuList:', danmuList);
			    }
			  });
			 
			  setTimeout(function () {
			    that.queryDanmu();
			  }, 1000 * 10);
			},
			
			
			
		}
	}
</script>

<style scoped>
.iconfont {
	font-family: nvueIcon;
}
.pop__ui_mask {
	background-color: #000; 
	opacity: .6; 
	position: fixed; 
	left: 0; 
	right: 0; 
	top: 0; 
	bottom: 0; 
	z-index: 1000;
}
.pop__ui_child {
	background-color: #fbfbfb; 
	border-top-left-radius: 12px;
	border-top-right-radius: 12px; 
	font-size: 14px; 
	overflow: hidden; 
	position: fixed; 
	bottom: 0; 
	left: 0; 
	right: 0; 
	z-index: 1001;
}
.pop__ui_head {
	border-style: solid; 
	border-color: #ebebeb; 
	border-bottom-width: 1upx; 
	font-size: 28upx; 
	font-weight: 700; 
	padding: 30upx; 
	text-align: left;
}
.wrap_carts {
	height: 650upx;
}
.item {
	flex-direction: row; 
	align-items: center; 
	padding: 30upx; 
	position: relative;
	height: 220rpx;
}
.gname{
	margin-left: 10rpx;
	width: 120rpx;
	height: 180rpx;
	flex-direction: column;
	justify-content:center;
}
.goods-no{
	  font-size: 18upx; 
	  height:50rpx;
	  line-height:50rpx;
	  width: 100rpx;
	  color: #999;
}
.gpic {
	margin-right: 30upx; 
	height: 100rpx; 
	width: 100rpx;
}
.ginfo {
	flex: 1;
}
.name {
	font-size: 25upx;
	overflow:hidden;
	text-overflow:ellipsis;  
	lines:2;
}
.price {
	color: #ff0f33; 
	font-size: 28upx; 
	margin-top: 15upx;
}
.gbtn {
	background-image: linear-gradient(to right, #ff540a, #ff0f33); 
	border-radius: 5upx; 
	color: #fff; 
	font-size: 28upx; 
	border-radius: 20rpx;
	padding: 12upx 25upx;
}
.cart-head {
	border-color: #FFFFFF; 
	border-style: solid; 
	border-bottom-width: 0upx;
	flex-direction: row; 
	justify-content: space-between;
	align-items: center; 
}
</style>
