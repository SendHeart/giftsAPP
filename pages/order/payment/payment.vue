<template>
<view>
<!-- 
<import src="../../common/hall_title.wxml" />
<template is="hall_title" data="{{title_name,title_logo,navgationHeight,startBarHeight}}" />
 margin-top:{{navgationHeight+startBarHeight}}px
-->

<view v-if="is_buymyself==1||received==1" class="order-item" style v-for="(item, index) in orders" :key="index">
	<!-- 厂家logo缩略图 -->
 	<!--  <view class="shop-text">
			<image class="logo-image" src="{{item.logo}}" mode="aspectFill"/>
      <text class="shop-text">{{item.shop_name}}</text>
  </view>
  
	<view wx:for="{{item['order_sku']}}" wx:for-item="mapping" wx:key="" class="carts-item" bindtap="showGoods" data-sku-id="{{mapping.id}}" data-goods-id="{{mapping.goods_id}}" data-goods-name="{{mapping.goods_name}}">
		<view>
			<image class="carts-image" src="{{mapping.sku_image}}" mode="aspectFit"/>
		</view>
		<view class="carts-text">
			
			<text class="carts-title">{{mapping.goods_name}}</text>
      <view style="font-size:24rpx;color:gray;display: flex;flex-direction: row;align-items:center">
        <view wx:for="{{mapping['sku_value']}}" wx:for-item="sku_value" wx:key="">
           <text>{{sku_value?sku_value['name']+':':''}}{{sku_value['type']==2?sku_value['note']+' ':sku_value['value']+' '}}
              </text>
        </view>
      </view>
			<view class="carts-subtitle">
      
      <text>{{item.act_info?item.act_info:'高端大气'}}</text>
				<text>x{{mapping.sku_num}}</text>
			</view>
		</view>
    <text style='font-size:22rpx; color:red;margin-left:-20rpx;'>{{item.buy_num>1?'份数:'+item.buy_num:''}}</text>
</view>
-->
	<view class="order-footer">
		<text class="paytips">实付金额</text><text>￥{{item.order_price}}</text>
	</view>
</view>
 <form @submit="formSubmit" data-name="pay" report-submit="true" v-if="is_buymyself==1||received==1" style="width:100%;">  
  <button class="btnpay" type="primary" formType="submit">微信支付</button> <!-- bindtap="pay"    -->
</form>
<!--
<view v-if="is_buymyself==1||received==1" class="pay_recomment" style="margin-top:10rpx;">
   <image :src="navList2[6].img" background-size="cover" mode="widthFix"></image>
</view>
-->
</view>
</template>

<script>
var util = require("utils/util.js");
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var navList2 = wx.getStorageSync('navList2') ? wx.getStorageSync('navList2') : [];

export default {
  data() {
    return {
      title_name: '送出礼物',
      title_logo: '../../../images/footer-icon-05.png',
      orderNo: '',
      orders: [],
      totalFee: 0,
      sku_id: '',
      navList2: navList2,
      page: 1,
      pagesize: 5,
      page_num: 0,
      all_rows: 0,
      shop_type: shop_type,
      is_buymyself: 0,
      startBarHeight: "",
      navgationHeight: "",
      loadingHidden: false,
      username: "",
      token: "",
      received: "",
      dkheight: "",
      userInfo: "",
      send_status: 0,
      goods_flag: "",
      order_price: "",
      address_userName: "",
      address_postalCode: "",
      address_provinceName: "",
      address_cityName: "",
      address_countyName: "",
      address_detailInfo: "",
      address_nationalCode: "",
      address_telNumber: "",
      receive_status: 0,
		order_shape:0,
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var orderNo = options.orderNo;
    var totalFee = options.totalFee ? options.totalFee : 0;
    var is_buymyself = options.is_buymyself ? options.is_buymyself : 0; //自购礼品

    var received = options.received ? options.received : 0; //未支付礼物订单支付

    var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
    var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
    var shop_type = that.shop_type;
    var navList2 = that.navList2; //that.setNavigation()

    that.get_project_gift_para();
    wx.request({
      url: weburl + '/api/client/query_order',
      method: 'POST',
      data: {
        username: username,
        access_token: token,
        order_no: orderNo,
        shop_type: shop_type
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        //console.log('payment onload:', res.data.result);
        var orderObjects = res.data.result;
        var sku_id = that.sku_id;

        if (orderObjects) {
          var order_price = 0;
		  console.log('orderObjects:' + orderObjects, 'totalFee:', totalFee);
          for (var i = 0; i < orderObjects.length; i++) {
            if (orderObjects[i]['logo'].indexOf("http") < 0) {
              orderObjects[i]['logo'] = weburl + orderObjects[i]['logo'];
            }

            for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
              if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
                orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
              }

              if (sku_id != '') {
                sku_id = sku_id + ',' + orderObjects[i]['order_sku'][j]['sku_id'];
              } else {
                sku_id = orderObjects[i]['order_sku'][j]['sku_id'];
              }
            }

            order_price = order_price + orderObjects[i]['order_price'];
          }

          totalFee = order_price.toFixed(2) * 100; //totalFee = totalFee.toFixed(0)
			that.orders = orderObjects
			that.orderNo = orderNo
			that.username = username
			that.token = token
			that.totalFee = totalFee ? totalFee : order_price
			that.sku_id = sku_id
			that.is_buymyself = is_buymyself
			that.received = received
			that.order_shape = orderObjects[0]['shape']
			console.log('payment onload orderObjects:', orderObjects);
			if (is_buymyself == 0 && received == 0 || totalFee == 0) that.pay();
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'loading',
            duration: 1500
          });
        }
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight;
        console.log(winHeight);
        that.setData({
          dkheight: winHeight - winHeight * 0.05 - 120
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '../../../images/back.png'
      });
    } //调用应用实例的方法获取全局数据
  },
  methods: {
    formSubmit: function (e) {
      var that = this;
      //var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name;
      console.log('formSubmit() form name:', form_name);

      if (form_name == 'pay') {
        that.pay();
      }

      //if (formId) that.submintFromId(formId);
    },
    //提交formId，让服务器保存到数据库里
    submintFromId: function (formId) {
      var that = this;
      var formId = formId;
      var shop_type = that.shop_type;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      wx.request({
        url: weburl + '/api/client/save_member_formid',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          formId: formId,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('submintFromId() update success: ', res.data);
        }
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
          url: '../../hall/hall'
        });
      }
    },
    get_project_gift_para: function () {
      var that = this;
      var navList_new = that.navList2;
      var shop_type = that.shop_type;
      var page = that.page;
      var pagesize = that.pagesize;
      var navList2 = that.navList2;
      console.log('payment get_project_gift_para navList2:', navList2, 'length:', navList2.length);

      if (navList2.length == 0) {
        //项目列表
        wx.request({
          url: weburl + '/api/client/get_project_gift_para',
          method: 'POST',
          data: {
            type: 2,
            //暂定
            shop_type: shop_type
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log('get_project_gift_para:', res.data.result);
            navList_new = res.data.result;

            if (!navList_new) {
              /*
               wx.showToast({
                 title: '没有菜单项2',
                 icon: 'loading',
                 duration: 1500
               });
               */
              return;
            } else {
				that.navList2 = navList_new
				console.log('payment get_project_gift_para navList_new:', navList_new);
            }
          }
        });
      }

      setTimeout(function () {
        that.loadingHidden = true
      }, 1500);
    },
    pay: function () {
		var that = this;
      //var openId = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
		var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
		var totalFee = that.totalFee;
		var orderNo = that.orderNo;
		var orders = that.orders ;
		var shop_type = that.shop_type;
		var is_buymyself = that.is_buymyself;
		var received = that.received;
		var order_shape = that.order_shape
		console.log('payment username', username, ' totalFee:', totalFee, ' is_buymyself:', is_buymyself, ' received:', received); //统一下单接口对接

      if (totalFee <= 0) {
        that.delete_cart();
        wx.navigateTo({
          url: '../send/send?order_no=' + orderNo + '&orders=' + JSON.stringify(orders) + '&is_buymyself=' + is_buymyself
        });
        return;
      }

      if (is_buymyself == 1 || received == 1) {
        //自购礼品 未支付礼物被接收 支付
        wx.request({
          url: weburl + '/api/WXPay',
          data: {
            openid: username,
            body: '商城',
            tradeNo: that.orderNo,
            totalFee: that.totalFee,
            shop_type: shop_type,
			user_type: 'APP'
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (response) {
            // 发起支付
            if (response.data.timestamp) {
				/*
				uni.showModal({
					title: '支付返回成功',
					content: 'response:'+ JSON.stringify(response.data)
				})
				*/
              wx.requestPayment({
				provider: "wxpay",  
				timeStamp: JSON.stringify(response.data.timestamp),  
				nonceStr: response.data.noncestr,  
				package: response.data.package,  
				signType:"MD5",  
				paySign: response.data.sign,  
				orderInfo: JSON.stringify({  
					appid: response.data.appid,  
					noncestr: response.data.noncestr,  
					package: response.data.package,  
					partnerid: response.data.partnerid,  
					prepayid: response.data.prepayid,  
					timestamp: response.data.timestamp,  
					sign: response.data.sign,  
				}),  
                success: function (res) {
                  console.log('支付成功:' + res);
				  /*
				  uni.showModal({
				  	title: '微信支付返回',
				  	content: 'res:'+ JSON.stringify(res),
					showCancel: false  
				  })
				  */

                  if (received == 1  && order_shape!=8 && order_shape!=7) {
                    wx.navigateTo({
                      url: '/pages/lottery/lottery?lottery_type=0' + '&order_no=' + orderNo
                    });
                  } else {
                    that.delete_cart();
                    that.returnTapTag();
                    /*
                    wx.navigateTo({
                      url: '../send/send?order_no=' + that.data.orderNo + '&orders=' + JSON.stringify(that.data.orders) + '&is_buymyself=' + is_buymyself
                    })
                    */
                  }
                },
				fail:function(res){  
					console.log(JSON.stringify(res));  
					uni.showModal({  
						content: "支付失败,原因为: " + res.errMsg,  
						showCancel: false  
					})  
					console.log('fail:'+JSON.stringify(res));  
				}  
              });
            } else {
              console.log('支付返回:' + response);
             uni.showModal({
             	title: '支付返回错误',
             	content: 'response error:'+ JSON.stringify(response)
             })
            }
          },
          fail: function (response) {
            console.log('发起支付失败', response); //console.log(response);
          }
        });
      } else {
        //未支付 送礼
        console.log('未支付送礼', 'orderNo:', that.orderNo, ' orders:', that.orders);
        that.delete_cart();
        wx.navigateTo({
          url: '../send/send?order_no=' + that.orderNo + '&orders=' + JSON.stringify(that.orders) + '&is_buymyself=' + is_buymyself
        });
      }
    },
    returnTapTag: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_flag = that.goods_flag;
      var order_no = that.orderNo;
      var is_buymyself = that.is_buymyself; //再次确认订单状态
	  var shop_type = that.shop_type ;
	  if(is_buymyself==1){
		  return ; //自购订单无需更新礼物状态
	  }
      wx.request({
        url: weburl + '/api/client/query_order',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          order_no: order_no,
          order_type: 'send',
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('order payment returnTapTag()再次确认订单状态:', res.data);
          var orderObjects = res.data.result;
          if (!orderObjects) {
            console.log('order payment returnTapTag() 没有该订单 orderObjects:', orderObjects);
            wx.showToast({
              title: '没有该订单',
              icon: 'none',
              duration: 1500
            });
            setTimeout(function () {
              wx.navigateBack();
            }, 1500);
            return;
          } else {
            if (orderObjects[0]['gift_status'] > 0) {
              console.log('order payment returnTapTag() 该订单已送出 orderObjects:', orderObjects);
              wx.showToast({
                title: '该订单已送出',
                icon: 'none',
                duration: 1500
              });
              setTimeout(function () {
                wx.navigateBack();
              }, 1500);
              return;
            } else {
              that.setData({
                send_status: 0,
                orders: orderObjects,
                goods_flag: orderObjects[0]['order_sku'][0]['goods_flag'],
                order_price: orderObjects[0]['order_price']
              });
              wx.request({
                //更新发送状态
                url: weburl + '/api/client/update_order_status',
                method: 'POST',
                data: {
                  username: username,
                  shop_type:shop_type,
                  access_token: token,
                  status_info: 'send',
                  order_no: order_no,
                  goods_flag: that.goods_flag,
                  is_buymyself: is_buymyself
                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
                },
                success: function (res) {
                  console.log('order payment returnTapTag() 礼物发送状态更新完成:', res.data, ' is_buymyself:', is_buymyself); //自购礼品 接收处理

                  console.log('order payment returnTapTag() 自购礼品 自动接收处理');
                  //that.receiveTapTag();
                  /*
                  wx.navigateTo({
                    url: '/pages/order/receive/receive?order_no=' + order_no + '&receive=1' + '&is_buymyself=' + is_buymyself
                  })
                  */
                }
              });
            }
          }
        }
      });
    },
    receiveTapTag: function () {
      var that = this;
      var is_buymyself = that.is_buymyself;
      var title = is_buymyself == 1 ? '收货地址' : '请确认';
      var content = is_buymyself == 1 ? '详细地址' : '确认接受吗';

      if (is_buymyself == 1) {
        that.set_address();
      } else {
        wx.showModal({
          title: title,
          content: content,
          success: function (res) {
            if (res.confirm) {
              that.set_address();
            }
          }
        });
      }
    },
    set_address: function () {
      var that = this;
      var shop_type = that.shop_type;
      var order_no = that.orderNo;
	  var order_shape = that.order_shape
      var goods_flag = that.goods_flag;
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var nickname = that.userInfo.nickName;
      var headimg = that.userInfo.avatarUrl;
      var address_userName = that.address_userName;
      var address_postalCode = that.address_postalCode;
      var address_provinceName = that.address_provinceName;
      var address_cityName = that.address_cityName;
      var address_countyName = that.address_countyName;
      var address_detailInfo = that.address_detailInfo;
      var address_nationalCode = that.address_nationalCode;
      var address_telNumber = that.address_telNumber;
      var is_buymyself = that.is_buymyself; //通讯录权限

		if(order_shape == 8 || order_shape == 7) {
			wx.switchTab({
				url: '/pages/index/index',
			})
			return ; //充值订单无需设置收货地址
		}
			
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.address']) {
            wx.authorize({
              scope: 'scope.address',

              success() {// 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                //wx.startRecord()
              }

            });
          }
        }

      }); //收货地址选择

      wx.chooseAddress({
        success: function (res) {
          console.log('微信收货地址:');
          console.log(res);
          address_userName = res.userName;
          address_postalCode = res.postalCode;
          address_provinceName = res.provinceName;
          address_cityName = res.cityName;
          address_countyName = res.countyName;
          address_detailInfo = res.detailInfo;
          address_nationalCode = res.nationalCode;
          address_telNumber = res.telNumber;
          that.setData({
            address_userName: address_userName,
            address_postalCode: address_postalCode,
            address_provinceName: address_provinceName,
            address_cityName: address_cityName,
            address_countyName: address_countyName,
            address_detailInfo: address_detailInfo,
            address_nationalCode: address_nationalCode,
            address_telNumber: address_telNumber
          });
          console.log('收货地址选择 订单号 order receive chooseAddress:' + order_no + ' openid:' + openid);
          wx.request({
            //更新收礼物状态
            url: weburl + '/api/client/update_order_status',
            method: 'POST',
            data: {
              username: that.username,
              shop_type: shop_type,
              openid: openid,
              nickname: that.nickname,
              headimg: that.headimg,
              order_no: order_no,
              status_info: 'receive',
              goods_flag: goods_flag,
              address_userName: address_userName,
              address_postalCode: address_postalCode,
              address_provinceName: address_provinceName,
              address_cityName: address_cityName,
              address_countyName: address_countyName,
              address_detailInfo: address_detailInfo,
              address_nationalCode: address_nationalCode,
              address_telNumber: address_telNumber
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function (res) {
              console.log('order receive set_address()礼物已接收:', res.data);

              if (res.data.status == 'y') {
                wx.showToast({
                  title: '礼物已接收',
                  icon: 'success',
                  duration: 1500
                });
                that.setData({
                  receive_status: 1
                });

                if (goods_flag == 3) {
                  //虚拟商品订单
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/pages/member/task/task'
                    });
                  }, 200);
                }

                if (is_buymyself == 1) {
                  //自购礼物订单抽奖
                  console.log('自购礼物订单抽奖 to lottery order_no:', order_no);
                  wx.navigateTo({
                    url: '/pages/lottery/lottery?lottery_type=0' + '&order_no=' + order_no
                  });
                }
              } else {
                console.log('礼物接收失败 order_no:', order_no);
                wx.showToast({
                  title: res.data.info ? res.data.info : '礼物接收失败',
                  icon: 'loading',
                  duration: 1500
                });
                that.setData({
                  receive_status: 0
                });
              }
            }
          });
        }
      });
    },
    delete_cart: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var sku_id = that.sku_id;
      var shop_type = that.shop_type;
      console.log('payment delete_cart sku_id:', sku_id); // 购物车单个删除

      wx.request({
        url: weburl + '/api/client/delete_cart',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          sku_id: sku_id,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('payment delete_cart:', res.data.result);
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
@import "./payment.css";
</style>