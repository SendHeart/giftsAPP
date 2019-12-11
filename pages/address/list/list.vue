<template>
<view>
<view class="address-list">
	<view class="item" v-for="(item, index) in addressObjects" :key="index">
		<!-- first row -->
		<view class="header">
			<text class="realname">{{item.full_name}}</text>
			<text class="mobile">{{item.tel}}</text>
		</view>
		<!-- second row -->
		<view class="summary">{{item.prov_str}}{{item.city_str}}{{item.area_str}}{{item.town_str}}{{item.address}}</view>
		<!-- third row -->
		<view class="footer">
			<!-- is default switch -->
			<view class="set-default" :data-index="index" @tap="setDefault">
				<!-- circle or success type -->
				<icon :type="(item.is_default == 1 ? 'success_circle' : 'circle')"></icon>
				<text>默认地址</text>
			</view>
			<!-- edit and delete button -->
			<view class="operation">
				<view class="container" :data-index="index" @tap="edit"><image src="../../../static/images/icon_edit.png"></image><text>编辑</text></view>
				<view class="container" :data-index="index" @tap="deleteFun"><image src="../../../static/images/icon_delete.png"></image><text>删除</text></view>
			</view>
		</view>
	</view>
</view>
<button @tap="add" type="warn" class="address-add">添加地址</button>
</view>
</template>

<script>
var weburl = getApp().globalData.weburl;

export default {
  data() {
    return {
      username: null,
      token: null,
      addressIndex: null,
      addressObjects: "",
	  is_buymyself:0,
	  is_activity:0,
    };
  },

  components: {},
  props: {},
	onLoad: function (options) {
		var that = this
		that.is_buymyself= options.is_buymyself? options.is_buymyself:0 ;
		that.is_activity= options.is_activity?options.is_activity:0 ;
		console.log('address list onload options:',options)
	},
  onShow: function () {
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
    that.setData({
      username: username,
      token: token
    });

    if (username) {
      this.loadData(username, token);
    } else {
      wx.navigateTo({
        url: '../../login/login?goods_id=' + this.goodsid + '&is_permission=1'
      });
    }
  },
  methods: {
    add: function () {
		var is_buymyself = this.is_buymyself ;
		var is_activity = this.is_activity ;
		wx.navigateTo({
			url: '../add/add?is_buymyself='+is_buymyself+'&is_activity='+is_activity
		})
    },
    setDefault: function (e) {
      // 设置为默认地址
      var that = this;
      var username = that.username;
      var token = that.token; // 取得下标

      var index = parseInt(e.currentTarget.dataset.index); // 遍历所有地址对象设为非默认

      var addressObjects = that.addressObjects;

      for (var i = 0; i < addressObjects.length; i++) {
        // 判断是否为当前地址，是则传true
        if (i == index) {
          addressObjects[i]['is_default'] = 1;
        } else {
          addressObjects[i]['is_default'] = 0;
        }
      }

      that.setData({
        addressObjects: addressObjects
      }); // 提交网络更新该用户所有的地址
      //保存地址到服务器

      wx.request({
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
          // 设置成功提示

          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          });
        }
      });
    },
    edit: function (e) {
      var that = this; // 取得下标

      var index = parseInt(e.currentTarget.dataset.index); // 取出id值

      var objectId = this.addressObjects[index]['id'];
      wx.navigateTo({
        url: '../add/add?objectId=' + objectId
      });
    },
    deleteFun: function (e) {
      var that = this;
      var username = that.username;
      var token = that.token; // 取得下标

      var index = parseInt(e.currentTarget.dataset.index); // 找到当前地址AVObject对象

      var address = that.addressObjects[index]; // 给出确认提示框

      wx.showModal({
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
      var that = this;
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