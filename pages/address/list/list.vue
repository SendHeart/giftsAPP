<template>
<view>
<view class="address-list">
	<view class="item" v-for="(item, index) in addressObjects" :key="index">
		 
		<view class="header">
			<text class="realname">{{item.full_name}}</text>
			<text class="mobile">{{item.tel}}</text>
		</view>
		 
		<view class="summary">{{item.prov_str}}{{item.city_str}}{{item.area_str}}{{item.town_str}}{{item.address}}</view>
		 
		<view class="footer">
			<!-- is default switch -->
			<view class="set-default" :data-index="index" @tap="setDefault">
				<!-- circle or success type -->
				<uni-icons :type="(item.is_default == 1 ? 'checkbox-filled' : 'circle')"  size="18" color='#e34c55'></uni-icons>
				<text>默认地址<text>{{order_id>0?'(更新订单地址)':''}}</text></text>
			</view>
			
			<view class="operation">
				<view class="container" :data-index="index" @tap="edit"><image src="../../../static/images/icon_edit.png"></image><text>编辑</text></view>
				<view class="container" :data-index="index" @tap="deleteFun"><image src="../../../static/images/icon_delete.png"></image><text>删除</text></view>
			</view>
		</view>
	</view>
	<view style="height: 30px;">
		
	</view>
</view>
<button @tap="add" type="warn" class="address-add">添加地址</button>
</view>
</template>

<script>
var weburl = getApp().globalData.weburl;
var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
var openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : '';
var userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
var shop_type = getApp().globalData.shop_type;
export default {
  data() {
    return {
      username: null,
      token: null,
      addressIndex: null,
      addressObjects: "",
	  is_buymyself:0,
	  is_activity:0,
	  order_id:0,
	  order_no:'',
    };
  },

  components: {},
  props: {},
	onLoad: function (options) {
		var that = this
		that.is_buymyself= options.is_buymyself? options.is_buymyself:0 ;
		that.is_activity= options.is_activity?options.is_activity:0 ;
		that.order_id = options.order_id? options.order_id:0
		that.order_no = options.order_no? options.order_no:''
		   
		console.log('address list onload options:',options)
	},
  onShow: function () {
    var that = this;
    var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
    that.username = username
    that.token =token

    if (username) {
      this.loadData(username, token);
    } else {
      uni.navigateTo({
        url: '../../login/login?goods_id=' + this.goodsid + '&is_permission=1'
      });
    }
  },
  methods: {
    add: function () {
		var is_buymyself = this.is_buymyself ;
		var is_activity = this.is_activity ;
		uni.navigateTo({
			url: '../add/add?is_buymyself='+is_buymyself+'&is_activity='+is_activity
		})
    },
    setDefault: function (e) {
      // 设置为默认地址
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';

		var index = parseInt(e.currentTarget.dataset.index); // 遍历所有地址对象设为非默认
		var order_id = that.order_id>0?that.order_id:0
		var order_no = that.order_no!=''?that.order_no:''
		var addressObjects = that.addressObjects;
		var addressOrder

		for (var i = 0; i < addressObjects.length; i++) {
			// 判断是否为当前地址，是则传true
			if (i == index) {
				addressObjects[i]['is_default'] = 1;
				addressOrder = addressObjects[i]
			} else {
				addressObjects[i]['is_default'] = 0;
			}
		}

		that.addressObjects = addressObjects

		uni.request({
			url: weburl + '/api/client/update_member_address',
			method: 'POST',
			data: {
				'username': username,
				'id': addressObjects[index]['id'],
				'access_token': token,
				'full_name': addressObjects[index]['full_name'],
				'prov': addressObjects[index]['prov'],
				'city': addressObjects[index]['city'],
				'area': addressObjects[index]['area'],
				'town': addressObjects[index]['town'],
				'address': addressObjects[index]['address'],
				'tel': addressObjects[index]['tel'],
				'is_default': addressObjects[index]['is_default']
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			success: function (res) {
				console.log(res.data.result); // 成功同时更新本地数据源
				if(order_id>0||order_no!=''){
					that.updateOrderAddress(addressOrder,order_id,order_no)
				}else{
					uni.showToast({
						title: '设置成功',
						icon: 'success',
						duration: 2000
					})
				}
        
			}
		});
    },
	
	// 修改订单地址
	updateOrderAddress: function (addressOrder=null,order_id=0,order_no='') {			
		var that = this;
	    var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
	    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
	    var order_info = order_id>0?' 订单ID'+order_id:''
	    order_info = order_info+order_no!=''?' 订单号:'+order_no:''
	    if(!addressOrder || (order_id>0 && order_no=='')){
			return
	    }
	    console.log('address/list/list updateOrderAddress()',addressOrder,' order id:',order_id);    
	        
	    uni.showModal({
			title: '确认',
			content: '更新'+order_info+'的地址吗？',
			success: function(res) {
				if (res.confirm) {
					uni.request({
						url: weburl + '/api/client/update_order_address',
						method: 'POST',
						data: {
							'username': username,       
							'access_token': token,
							'shop_type': shop_type,
							'order_id': order_id,
							'order_no': order_no,
							'full_name': addressOrder['full_name'],
							'prov': addressOrder['prov'],
							'city': addressOrder['city'],
							'area': addressOrder['area'],
							'town': addressOrder['town'],
							'address': addressOrder['address'],
							'tel': addressOrder['tel'],       
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': 'application/json'
						},
						success: function (res) {
							console.log('订单地址修改:'+ JSON.stringify(res.data));        
							if(res.data.status=='y'){
								uni.showToast({
									title: '订单地址已修改',
									icon: 'none',
									duration: 2000
								});
							}else{
								uni.showToast({
									title: res.data.info?res.data.info:'订单地址修改失败',
									icon: 'none',
									duration: 2000
								});
							}   
						}
					})          
				}
			}
		})    
	},
	  
    edit: function (e) {
		var that = this; // 取得下标
		var index = parseInt(e.currentTarget.dataset.index); // 取出id值

		var objectId = this.addressObjects[index]['id'];
		uni.navigateTo({
			url: '../add/add?objectId=' + objectId
		});
    },
    deleteFun: function (e) {
		var that = this;
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';

		var index = parseInt(e.currentTarget.dataset.index); // 找到当前地址AVObject对象

		var address = that.addressObjects[index]; // 给出确认提示框

		uni.showModal({
			title: '确认',
			content: '要删除这个地址吗？',
			success: function (res) {
				if (res.confirm) {
            // 真正删除对象
					wx.request({
						url: weburl + '/api/client/delete_member_address',
						method: 'POST',
						data: {
							'username': username,
							'address_id': address['id'],
							'access_token': token
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': 'application/json'
						},
						success: function (res) {
							console.log(res.data.result);
							var address = that.addressObjects;
							var new_address = [];
							var j = 0;

							for (var i = 0; i < address.length; i++) {
							// find the default address
								if (i != index) {
									new_address[j++] = address[i];
								}
							}

							that.setData({
							addressObjects: new_address
							}); // 成功同时更新本地数据源
							// 设置成功提示

							wx.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 2000
							});
						}
					});
				}
			}
		});
	},
	
    loadData: function (username, token) {
      // 加载网络数据，获取地址列表
      var that = this	  
      wx.request({
        url: weburl + '/api/client/get_member_address',
        method: 'POST',
        data: {
          username: username,
          token: token
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          //console.log(res.data.result);
          var address = res.data.result;

          for (var i = 0; i < address.length; i++) {
            // find the default address
            if (address[i]['is_default'] == 1) {
              that.setData({
                addressIndex: i
              });
            }
          }

          that.setData({
            addressObjects: address
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
@import "./list.css";
</style>