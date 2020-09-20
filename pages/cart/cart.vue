<template>
<view>
<view class="container carts-list">
    <view v-for="(cart_item, cart_idx) in carts"  class="carts-container" :key="cart_idx" :hidden="(cart_item.hidden==1?false:false)">
    	<view class="carts-item" :style="'left:' + itemLefts[cart_idx]+'px;'" bindtouchstart="touchStart" bindtouchmove="touchMove" bindtouchend="touchEnd">
	    	<!-- 复选框图标 -->
			<uni-icons style="margin-left:20rpx;" :type="(cart_item.selected ? 'checkbox' : 'circle')" size="18" @tap="bindCheckbox(cart_idx)" :data-index="cart_idx"></uni-icons>
			<!-- 缩略图 -->
				<image  class="carts-image" :src="cart_item.image" mode="aspectFit" @tap="showGoods(cart_item)"></image>
				<!-- 商品标题 -->
				<view class="carts-text">
				  <view class="carts-title">{{cart_item.name}}</view>
				  <view class="carts-subtitle">
					<view class=''  >
						<view class="carts-sku">
							<view class="carts-sku">
								<text v-for="(sku_value, index) in cart_item['value']" :key="index">{{sku_value?sku_value['name']+':':''}}{{sku_value['type']==2?sku_value['note']+' ':sku_value['value']+' '}}
								</text>
							</view>
						</view>
						<view class="carts-en-price">￥{{cart_item.sell_price}}元</view>
					</view>
				      <view class="stepper">
						<text :class="minusStatuses[cart_idx]" :data-index="cart_idx" @tap="bindMinus">-</text>
						<input type="number" :data-index="cart_idx" @change="bindManual" @tap="bindManualTapped" :value="cart_item.num" />
						<text class="normal" :data-index="cart_idx" @tap="bindPlus">+</text>
				  	</view>
				</view>
			</view>
    </view>
	<!-- 
	<button type="warn" :data-index="cart_idx" class="delete-button" @tap="delete(cart_item)" :data-object-id="item.objectId"><text>删除</text></button>
	-->
    </view>
</view>
<view class="carts-footer">
	<view class="select-and-amount" @tap="bindSelectAll">
		<uni-icons :type="(selectedAllStatus ? 'checkbox-filled' : 'circle')" size="18" color='#e34c55'></uni-icons>
		<text>全选</text>
		<text>{{total>0?'￥'+total:''}}</text>
	</view>
	<view class="button" @tap="bindCheckout">立即结算</view>
</view>
<view class="recomment-title">
    <text>精品推荐</text>
</view>
<view v-for="(item,index) in recommentList" class="recomm-item" :key="index" @tap="showGoods(item)" :data-object-id="item.id" :data-goods-id="item.id" :data-goods-name="item.name" :data-goods-price="item.sell_price" :data-sale="item.sale" :data-goods-info="item.act_info" :hidden="(item.hidden==1?true:false)">
   <image class="recomm-img" :src="item.image"></image>
    <text style="font-size:12px;">{{item.name}}</text>
    <view style="font-size:10px;color:gray;">{{item.act_info?item.act_info:''}}</view>  
    <view class="recomm-goods-tags">
      <text class="left-tag">{{item.sale>0?item.sale:'0'}}人已送</text>
    </view>    
	<view class="price-list">
		<view class="price-market">{{item.market_price>0?'￥'+item.market_price:''}}</view>
   		<view class="price-now">￥{{item.sell_price}}</view>
	</view>
</view>

<view class="carts-more" :hidden="rshowmorehidden">
	<!-- 
	 <text bindtap="bindShowMoreR" >更多[{{page}}/{{rpage_num}}]</text> 
	-->
</view>
</view>
</template>

<script>
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
		navList2: navList2,
	    hidden: true,
	    scrollTop: 0,
	    scrollHeight: 0,
	    indicatorDots: true,
	    vertical: false,
	    autoplay: true,
	    interval: 3000,
	    duration: 1000,
	    main_title_Bg: weburl + "/uploads/xianshe_hall_banner.png",
	    gifts_rcv: 0,
	    gifts_snd: 0,
	    note: '',
	    username: null,
	    token: null,
	    carts: [],
	    recommentList: [],
	    minusStatuses: [],
	    selectedAllStatus: false,
	    total: '',
	    startX: 0,
	    itemLefts: [],
	    showmorehidden: true,
	    rshowmorehidden: true,
		frompage:'',
	    page:page,
	    pagesize:pagesize,
	    all_rows: 0,
	    rall_rows: 0,
	    rpage_num: 0,
	    windowWidth: 0,
	    windowHeight: 0,
	    cartIds: null,
	    amount: 0,
	    nickname: userInfo.nickName,
	    avatarUrl: userInfo.avatarUrl,
	    shop_type: shop_type,
	    machine_uuid: current_shop_info['machine_uuid'], //售货机 uuid
	    is_machine: current_shop_info['type'] == 2 ? 1 : 0, //是否售货机
	    machine_shop_id: current_shop_info['shop_id'], //售货机 所属 shop_id
	    machine_location_id: current_shop_info['id'], //售货机 所属 shop_id
	    is_buymyself:1,
	    goodsshape:1,
		is_video_play:false,
	}
	},

	components: {},
	props: {},
	onLoad: function (options) {
		var that = this
		that.username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		that.token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
		that.username = username
		that.token = token
		that.frompage = options.frompage ? options.frompage : '/pages/hall/hall'
		that.get_project_gift_para()
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
    
        that.username = username
        that.reloadData(username, token);
        // sum
        that.sum();
	},

	methods: {
    //事件处理函数
	bindTextAreaBlur: function (e) {
        var that = this;
        that.note = e.detail.value
	},
	
	bindMinus: function (e) {
        var that = this
        var index = e.currentTarget.dataset.index
        var num = that.carts[index]['num']
        var num_cur = num
        console.log('bindMinus carts index:'+e.currentTarget.dataset.index) 
        if (num_cur > 1) {
          num--
        } else {
          num_cur = 0  //减到0视同删除
        }
    
        //var minusStatus = num <= 1 ? 'disabled' : 'normal';
		that.minusStatuses[index]  = num <= 1 ? 'normal' : 'normal';  //减到0视同删除
        // 购物车数据
		that.carts[index]['num'] = num
        // 按钮可用状态
     
        // update database
        var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
        var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
        var sku_id = that.carts[index]['id'];
		
        that.updateCart(username, sku_id, num, token)
        uni.hideLoading()
        that.sum()
        if (num_cur == 0) {
			that.deleteindex = index
			console.log('bindMinus carts[index][id]:',that.carts[index]['id'])
			that.delete()
        }
	},
	
	bindPlus: function (e) {
		var that  = this
        wx.showLoading({
          title: '',
          mask: true
        });
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.carts[index]['num'];
        // 自增
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 购物车数据
        var carts = that.carts;
        carts[index]['num'] = num;
        // 按钮可用状态
        var minusStatuses = that.minusStatuses;
        minusStatuses[index] = minusStatus;
        // 将数值与状态写回
        that.carts = carts
        that.minusStatuses = minusStatuses
        // update database
        var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
        var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
        var sku_id = carts[index]['id']
        that.updateCart(username, sku_id, num, token);
        wx.hideLoading();
        that.sum();
	},
	
	bindManual: function (e) {
        wx.showLoading({
          title: '',
          mask: true
        });
        var index = parseInt(e.currentTarget.dataset.index);
        var carts = this.carts;
        var num = parseInt(e.detail.value);
        carts[index]['num'] = num;
        // 将数值与状态写回
        this.setData({
          carts: carts
        });
        wx.hideLoading();
        this.sum();
	},
	
	bindManualTapped: function () {
        // 什么都不做，只为打断跳转
	},
	
	bindCheckbox: function (cart_index) {
        wx.showLoading({
          title: '操作中',
          mask: true
        });
        var that = this;
        /*绑定点击事件，将checkbox样式改变为选中与非选中*/
        //拿到下标值，以在carts作遍历指示用
        var index = cart_index;
        //原始的icon状态
        var selected = that.carts[index]['selected'];
        var carts = that.carts;
        // 对勾选状态取反
        carts[index]['selected'] = !selected;
        // 写回经点击修改后的数组
        that.setData({
          carts: carts,
        });
        // update database
        var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
        var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
        var sku_id = carts[index]['id'];
        var buy_num = carts[index]['num'];
        that.updateCart(username, sku_id, buy_num, token);
        wx.hideLoading();
        that.sum();
	},
	
	bindSelectAll: function () {
        wx.showLoading({
          title: '操作中',
          mask: true
        });
        // 环境中目前已选状态
        var selectedAllStatus = this.selectedAllStatus;
        // 取反操作
        selectedAllStatus = !selectedAllStatus;
        // 购物车数据，关键是处理selected值
        var carts = this.carts;
        // 遍历
        for (var i = 0; i < carts.length; i++) {
          carts[i]['selected'] = selectedAllStatus;
          // update selected status to db
        }
    
        this.setData({
          selectedAllStatus: selectedAllStatus,
          carts: carts,
        });
        wx.hideLoading();
        this.sum();
    
	},
	
	bindPickGoods: function () {
        uni.navigateTo({
          url: '../classify/classify?username=' + username + '&token=' + token
        });
	},
	
	bindShowMore: function () {
        var that = this;
        var carts = that.carts
        // 遍历 设置 hidden
        for (var i = 0; i < carts.length; i++) {
          carts[i]['hidden'] = 0;
        }
    
        that.setData({
          carts: carts,
          showmorehidden: true
    
        });
	},
	
	bindShowLess: function () {
        var that = this;
        var carts = that.carts
        // 遍历 设置 hidden
        for (var i = 0; i < carts.length; i++) {
          if (i > 1) carts[i]['hidden'] = 1;
        }
    
        that.carts = carts
        that.showmorehidden = false
	},
	
	bindShowMoreR: function () {
        var that = this;
        var recommentList = that.recommentList
        // 遍历 设置 hidden
        for (var i = 0; i < recommentList.length; i++) {
          recommentList[i]['hidden'] = 0;
        }
    
        that.recommentList = recommentList
        that.rshowmorehidden = true
	},
	
	bindShowLessR: function () {
        var that = this;
        var recommentList = that.recommentList
        // 遍历 设置 hidden
        for (var i = 0; i < recommentList.length; i++) {
          if (i > 1) recommentList[i]['hidden'] = 1;
        }
    
        that.recommentList = recommentList
        that.rshowmorehidden = false
	},
    
	bindCheckout: function () {
        var that = this;
        var order_type = 'gift'
        var order_note = that.note
        var amount = that.total;
        var cartIds = that.calcIds();
        cartIds = cartIds.join(',');
        var is_buymyself = that.is_buymyself
        var goodsshape = that.goodsshape
        var share_goods_image = ''
        var liveid = 0
        var carts = that.carts;
        var cartselected = [];
        var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
        var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
        // 遍历selected 
        var index = 0;
        for (var i = 0; i < carts.length; i++) {
          if (carts[i]['selected']) {
            cartselected[index++] = carts[i];
          }
        }
        if (cartselected.length == 0) {
          wx.showToast({
            title: '请选商品',
            icon: 'success',
            duration: 1000
          })
          return
        }
    
        that.amount = amount,
        that.carts = carts
        that.cartIds = cartIds
        that.username = username
        that.token = token
		
        //that.confirmOrder()
    
        /*
        wx.navigateTo({
          url: '../order/checkout/checkout?cartIds=' + cartIds + '&amount=' + that.data.total + '&carts=' + JSON.stringify(cartselected) + '&username=' + username + '&token=' + token
        });
        */
        uni.navigateTo({
          url: '/pages/order/checkout/checkout?cartIds=' + cartIds + '&amount=' + amount + '&carts=' + JSON.stringify(cartselected) + '&is_buymyself=' + is_buymyself + '&order_type=' + order_type + '&order_shape=' + goodsshape + '&order_image=' + share_goods_image + '&liveid=' + liveid + '&username=' + username + '&token=' + token
        })
        /*
        wx.navigateTo({
          url: '../order/checkout/checkout?cartIds=' + cartIds + '&amount=' + amount + '&carts=' + JSON.stringify(cartselected) + '&order_type=' + order_type + '&order_note=' + order_note + '&username=' + username + '&token=' + token
        });
        */
	},
    
	confirmOrder: function () {
        // submit order
        var that = this;
        var carts = that.carts;
        var cartIds = that.cartIds
        var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
        var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
        var status = 0;
        var amount = that.amount;
        var order_type = 'gift';
        var order_note = that.note;
        if (!order_note) order_note = '送你一份心意，愿美好长存!'; //默认祝福
        console.log('附言:' + order_note)
    
        wx.request({
          url: weburl + '/api/client/add_order',
          method: 'POST',
          data: {
            username: username,
            access_token: token,
            sku_id: cartIds,
            buy_type: 'cart',
            order_type: order_type,
            note: order_note,
    
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log(res.data.result);
            var order_data = res.data.result;
    
            if (!res.data.info) {
              wx.showToast({
                title: '订单提交完成',
                icon: 'success',
                duration: 1500
              });
            } else {
              wx.showToast({
                title: res.data.info,
                icon: 'loading',
                duration: 1500
              });
            }
            uni.navigateTo({
              url: '../order/payment/payment?orderNo=' + order_data['order_no'] + '&totalFee=' + order_data['order_pay']
            });
          }
        })
    
	},
    
	delete: function () {
        var that = this
        var shop_type = that.shop_type
        var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : ''
        var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1'
        var index = that.deleteindex?that.deleteindex:0
        /*
		var objectId = 0
        if (e) {
          index = e.index ? e.index : 0
          objectId = e.id;
        } else {
          index = that.deleteindex
        }
		*/
	
        //index = parseInt(index)
        var carts = that.carts;
		console.log('delete index:'+index);
        var sku_id = that.carts[index]['id'];
    
        // 购物车单个删除
        console.log('delete:',sku_id);
        uni.showModal({
          title: '',
          content: '确认移除该商品？', /*文案修改*/
          success: function (res) {
            if (res.confirm) {
              // 从网络上将它删除
              // 购物车单个删除
              wx.request({
                url: weburl + '/api/client/delete_cart',
                method: 'POST',
                data: { 
                  username: username, 
                  access_token: token, 
                  sku_id: sku_id,
                  shop_type:shop_type,
                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
                },
                success: function (res) {
                  console.log('删除购物车单个商品:',res.data.result)
                  var new_carts = []
                  var j = 0;
                  for (var i = 0; i < carts.length; i++) {
                    if (i != index) {
                      //剔除删除产品
                      new_carts[j++] = carts[i];
                    }
                  }
                  if (new_carts.length == 0) {
                    var all_rows = 0;
                    var showmorehidden = true;
                  } else {
                    var all_rows = new_carts.length;
                    var showmorehidden = true; // false
                  }
                 that.carts = new_carts
                 that.all_rows = all_rows 
                 that.showmorehidden = showmorehidden
                  that.sum()
                }
              })
    
            }else if(res.cancel){
    
            }
          }
        })
	},
	
	calcIds: function () {
        // 遍历取出已勾选的cid
        // var buys = [];
		var that = this
        var cartIds = [];
        for (var i = 0; i < this.carts.length; i++) {
          if (this.carts[i]['selected']) {
            // 移动到Buy对象里去
            // cartIds += ',';
            cartIds.push(this.carts[i]['objectId']);
          }
        }
    
        return cartIds;
	},
	
	sum: function () {
		var that = this
        var carts = this.carts;
        // 计算总金额
        var total = 0;
        for (var i = 0; i < carts.length; i++) {
          if (carts[i]['selected']) {
            total += carts[i]['num'] * carts[i]['sell_price'];
          }
        }
        total = total.toFixed(2);
        // 写回经点击修改后的数组
        that.carts = carts
        that.total = total
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
        uni.navigateTo({
          url: '/pages/details/details?sku_id=' + objectId + '&id=' + goods_id + '&goods_shape=' + goods_shape + '&goods_org=' + goods_org + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&name=' + goods_name + '&image=' + image + '&token=' + token + '&username=' + username
        });
	},
	
	touchStart: function (e) {
        var startX = e.touches[0].clientX;
        this.startX = startX
        this.itemLefts = []
	},
	
	touchMove: function (e) {
		var index = e.currentTarget.dataset.index;
		var movedX = e.touches[0].clientX;
		var distance = this.startX - movedX;
		var itemLefts = this.itemLefts;
		itemLefts[index] = -distance;
		this.itemLefts = itemLefts
	},
	
	touchEnd: function (e) {
		var index = e.currentTarget.dataset.index;
		var endX = e.changedTouches[0].clientX;
		var distance = this.startX - endX;
        // button width is 60
		var buttonWidth = 60;
		if (distance <= 0) {
			distance = 0;
		} else {
			if (distance >= buttonWidth) {
				distance = buttonWidth;
			} else if (distance >= buttonWidth / 2) {
				distance = buttonWidth;
			} else {
				distance = 0;
			}
		}
        var itemLefts = this.itemLefts;
        itemLefts[index] = -distance;
        this.itemLefts = itemLefts
	},
	
	updateCart: function (username, sku_id, buy_num, token) {
        var that = this
        var shop_type = that.shop_type
        var token = that.token;
    
        // 加入购物车
        uni.request({
          url: weburl + '/api/client/update_cart',
          method: 'POST',
          data: { 
            username: username, 
            access_token: token, 
            sku_id: sku_id, 
            buy_num: buy_num,
            shop_type:shop_type,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            //console.log('updateCart:',res);
          }
        })
	},
	
	reloadData: function (username, token) {
        // auto login
        var that = this;
        var minusStatuses = []
        var shop_type = that.shop_type
        var page = that.page
        var pagesize = that.pagesize
        // cart info
        uni.request({
			url: weburl + '/api/client/query_cart',
			method: 'POST',
			data: { 
				username: username, 
				access_token: token,
				shop_type:shop_type,
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				var carts = []
				var cartlist = res.data.result.list;
				var showmorehidden;
			//console.log('reloadData cartlist:'+JSON.stringify(cartlist));
				var index = 0;
				for (var key in cartlist) {
					for (var i = 0; i < cartlist[key]['sku_list'].length; i++) {
						if (cartlist[key]['sku_list'][i]['image'].indexOf("http") < 0) {
							cartlist[key]['sku_list'][i]['image'] = weburl + '/' + cartlist[key]['sku_list'][i]['image'];
						}
                
						if (cartlist[key]['sku_list'][i]['sku_note']) {
							cartlist[key]['sku_list'][i]['sku_note'] = cartlist[key]['sku_list'][i]['sku_note'].substr(0, 13) + '...';
						}
    
						cartlist[key]['sku_list'][i]['selected'] = '';
						cartlist[key]['sku_list'][i]['shop_id'] = key;
						cartlist[key]['sku_list'][i]['objectId'] = cartlist[key]['sku_list'][i]['id'];
						carts[index] = cartlist[key]['sku_list'][i];
						minusStatuses[index] = cartlist[key]['sku_list'][i]['num'] <= 1 ? 'disabled' : 'normal';
						index++;
					}
				}
				if (index > 1) {
					showmorehidden = false
				} else {
					showmorehidden = true
				}
            //倒序
            /*
            var k = carts.length
            var carts_sort = []
            var minusStatuses_sort = []
            var j=0
            for (var i = k-1; i >=0 ; i--) {
              carts_sort[j] = carts[i]
              if(j>1){
                carts_sort[j]['hidden'] = 1
              } else{
                carts_sort[j]['hidden'] = 0
              }
              minusStatuses_sort[j] = minusStatuses[i]
              j++
            }
            */
            //console.log('reloadData carts:'+JSON.stringify(carts));
				that.carts = carts
				that.minusStatuses = minusStatuses
				that.selectedAllStatus = false
				that.showmorehidden = showmorehidden
				that.all_rows = carts.length
			}
		})
    
        // recommend goods info
        uni.request({
			url: weburl + '/api/client/query_member_goods_prom',
			method: 'POST',
			data: {
				username: username,
				access_token: token,
				shop_type:shop_type,
				query_type:'cart', //购物车推荐商品
				page: page,
				pagesize: pagesize 
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
            //console.log('会员推荐商品列表获取:', res.data);
      
				var recommentslist = res.data.result;
				var rshowmorehidden;
				if (recommentslist) {
					for (var i = 0; i < recommentslist.length; i++) {
						if (recommentslist[i]['image'].indexOf("http") < 0) {
							recommentslist[i]['image'] = weburl + '/' + recommentslist[i]['image'];
						}
               
               /*
                recommentslist[i]['name'] = recommentslist[i]['name'].substr(0, 13) + '...';
                if (i > 1) {
                 recommentslist[i]['hidden'] = 1;
                }
                */
					}
					if (recommentslist.length > 0) {
						rshowmorehidden = false
					} else {
						rshowmorehidden = true
					}
					var rpage_num = that.rpage_num
					rpage_num = (recommentslist.length / pagesize + 0.5)
					that.recommentList = recommentslist
					that.rshowmorehidden = rshowmorehidden
					that.rall_rows = recommentslist.length
					that.rpage_num = rpage_num.toFixed(0)
				}
			}
		})
	},
	
	showCart: function () {
        uni.switchTab({
          url: '../../cart/cart'
        });
	},
    
	showCartToast: function (message) {
        wx.showToast({
          title: message ? message : '已完成',
          icon: 'success',
          duration: 1000
        });
	},
    
	onGotUserInfo: function (e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.userInfo)
        console.log(e.detail.rawData)
	},
	
	get_project_gift_para: function () {
        var that = this
        var navList_new = that.navList2
        var shop_type = that.shop_type
        var hall_banner = that.hall_banner
        var gift_para_interval = that.gift_para_interval
        console.log('hall get_project_gift_para navList2:', navList_new, ' is_video_play', that.is_video_play)
		if (navList_new.length == 0 || gift_para_interval>0){
			//项目列表
			uni.request({
				url: weburl + '/api/client/get_project_gift_para',
				method: 'POST',
				data: {
					type: 2,  //暂定 1首页单图片 2首页轮播  
					shop_type: shop_type,
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				success: function (res) {
				//console.log('get_project_gift_para:', res.data)
					navList_new = res.data.result;
					//console.log('get_project_gift_para:', navList_new)
					if (!navList_new) {
						return
					}else{
						that.gift_para_interval = 0
						that.navList2 = navList_new
						that.hall_banner = navList_new[3] ? navList_new[3]:hall_banner //首页banner图
						that.middle1_img = navList_new[11] ? navList_new[11]['img'] : ''
						that.middle2_img = navList_new[12] ? navList_new[12]['img'] : ''
						that.middle3_img = navList_new[13] ? navList_new[13]['img'] : ''
						that.middle4_img = navList_new[14] ? navList_new[14]['img'] : ''
						that.middle5_img = navList_new[15] ? navList_new[15]['img'] : ''
						that.middle6_img = navList_new[16] ? navList_new[16]['img'] : ''
						that.middle7_img = navList_new[17] ? navList_new[17]['img'] : ''
						that.middle8_img = navList_new[18] ? navList_new[18]['img'] : ''
                    
						that.middle1_title = navList_new[11] ? navList_new[11]['title'] : ''
						that.middle2_title = navList_new[12] ? navList_new[12]['title'] : ''
						that.middle3_title = navList_new[13] ? navList_new[13]['title'] : ''
						that.middle4_title = navList_new[14] ? navList_new[14]['title'] : ''
						that.middle5_title = navList_new[15] ? navList_new[15]['title'] : ''
						that.middle6_title = navList_new[16] ? navList_new[16]['title'] : ''
						that.middle7_title = navList_new[17] ? navList_new[17]['title'] : ''
						that.middle8_title = navList_new[18] ? navList_new[18]['title'] : ''
                    
						that.middle1_note = navList_new[11] ? navList_new[11]['note'] : ''
						that.middle2_note = navList_new[12] ? navList_new[12]['note'] : ''
						that.middle3_note = navList_new[13] ? navList_new[13]['note'] : ''
						that.middle4_note = navList_new[14] ? navList_new[14]['note'] : ''
						that.middle5_note = navList_new[15] ? navList_new[15]['note'] : ''
						that.middle6_note = navList_new[16] ? navList_new[16]['note'] : ''
						that.middle7_note = navList_new[17] ? navList_new[17]['note'] : ''
						that.middle8_note = navList_new[18] ? navList_new[18]['note'] : ''
                    
						that.is_video_play = navList_new[19] ? navList_new[19]['value'] : 0
                
						uni.setStorageSync('navList2', navList_new)
					}
				} 
			})
        } else{
			that.hall_banner = navList_new[3] ? navList_new[3]:hall_banner //首页banner图
			that.middle1_img = navList_new[11] ? navList_new[11]['img'] : ''
			that.middle2_img = navList_new[12] ? navList_new[12]['img'] : ''
			that.middle3_img = navList_new[13] ? navList_new[13]['img'] : ''
			that.middle4_img = navList_new[14] ? navList_new[14]['img'] : ''
			that.middle5_img = navList_new[15] ? navList_new[15]['img'] : ''
			that.middle6_img = navList_new[16] ? navList_new[16]['img'] : ''
			that.middle7_img = navList_new[17] ? navList_new[17]['img'] : ''
			that.middle8_img = navList_new[18] ? navList_new[18]['img'] : ''
			                    
			that.middle1_title = navList_new[11] ? navList_new[11]['title'] : ''
			that.middle2_title = navList_new[12] ? navList_new[12]['title'] : ''
			that.middle3_title = navList_new[13] ? navList_new[13]['title'] : ''
			that.middle4_title = navList_new[14] ? navList_new[14]['title'] : ''
			that.middle5_title = navList_new[15] ? navList_new[15]['title'] : ''
			that.middle6_title = navList_new[16] ? navList_new[16]['title'] : ''
			that.middle7_title = navList_new[17] ? navList_new[17]['title'] : ''
			that.middle8_title = navList_new[18] ? navList_new[18]['title'] : ''
			                    
			that.middle1_note = navList_new[11] ? navList_new[11]['note'] : ''
			that.middle2_note = navList_new[12] ? navList_new[12]['note'] : ''
			that.middle3_note = navList_new[13] ? navList_new[13]['note'] : ''
			that.middle4_note = navList_new[14] ? navList_new[14]['note'] : ''
			that.middle5_note = navList_new[15] ? navList_new[15]['note'] : ''
			that.middle6_note = navList_new[16] ? navList_new[16]['note'] : ''
			that.middle7_note = navList_new[17] ? navList_new[17]['note'] : ''
			that.middle8_note = navList_new[18] ? navList_new[18]['note'] : ''
			                    
			that.is_video_play = navList_new[19] ? navList_new[19]['value'] : 0      
        }
        
        /*
        setTimeout(function () {
          that.setData({
            loadingHidden: true,
          })
        }, 1500)
        */
	},

    //页面滑动到底部
	bindDownLoad: function () {
        var that = this;
       that.page = page++
        // this.loadgoods(reid,this.data.navLeftItems[this.data.curIndex]['id']);
        console.log("lower");
	},
	
	scroll: function (event) {
        //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
        this.scrollTop = event.detail.scrollTop
	},
		
	topLoad: function (event) {
        //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
        //page = 1;
        this.scrollTop = 0
        //loadMore(this);
        console.log("lower");
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
@import "./cart.css";
</style>