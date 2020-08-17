<template>
<view>
<view class="container">
  <view class="carts-item" @tap="showGoods">
      <view>
        <!-- 缩略图 -->
        <image class="carts-image" :src="goods_img" mode="aspectFill"></image>
      </view>
      <view class="carts-text">
        <!-- 商品标题 --> 
        <text class="carts-title">{{goodsname}}</text>
        <text class="carts-subtitle">{{goodsinfo?goodsinfo:'高端大气'}}</text>
        <text class="carts-price">{{goodsprice?'￥'+goodsprice:''}}</text>
    </view>
  </view>
</view>
<view class="comm-title">发表评论</view>
<view class="star-level">
    <view class="star-title">推荐度</view>
    <view class="star-image">
      <image data-star-id="1" @tap="comment_star" :src="(comment_level>0?'/static/images/star_on.png':'/static/images/star.png')"></image>
      <image data-star-id="2" @tap="comment_star" :src="(comment_level>1?'/static/images/star_on.png':'/static/images/star.png')"></image>
      <image data-star-id="3" @tap="comment_star" :src="(comment_level>2?'/static/images/star_on.png':'/static/images/star.png')"></image>
      <image data-star-id="4" @tap="comment_star" :src="(comment_level>3?'/static/images/star_on.png':'/static/images/star.png')"></image>
      <image data-star-id="5" @tap="comment_star" :src="(comment_level>4?'/static/images/star_on.png':'/static/images/star.png')"></image>
      </view>
    </view>
 
<form @submit="formSubmit" id="2">  
   <view class="sendmessage">
    <view class="note">
      <textarea @blur="bindTextAreaBlur" :value="content" placeholder="评论内容" maxlength="140"></textarea>
    </view>
    <view class="upimage">
      <block v-for="(upimg, index) in img_arr" :key="index">      
         <image :data-id="index" @tap="cancel_upimg" :src="upimg" mode="aspectFit"></image>       
      </block>
      <block v-for="(upimg_new, index) in new_img_arr" :key="index">      
         <image :data-id="index" @tap="cancel_new_upimg" :src="upimg_new" mode="aspectFit"></image>       
      </block>
    </view>
    <view @tap="upimg" class="upimg">
    <image class="btnjia" src="../../../static/images/jia.png"></image>
    </view>
  </view>
</form>
<view class="footer">
    <view class="opt-buttons">
        <view class="button-group">
         <button type="warn" size="default" hover-class="button-hover" class="button" @tap="sendCommentBtnTap">发表</button>
        </view>
    </view>
</view>
</view>
</template>

<script>
var util = require("utils/util.js");
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var uploadurl = getApp().globalData.uploadurl;

export default {
  data() {
    return {
      shop_type: shop_type,
      uploadurl: uploadurl,
      user: null,
      userInfo: {},
      username: null,
      indicatorDots: false,
      vertical: false,
      autoplay: true,
      page: 1,
      pagesize: 10,
      all_rows: 0,
      interval: 30000,
      duration: 12000,
      goodsname: '',
      goodsinfo: [],
      goodsprice: 0,
      goodssale: 0,
      goodsid: 0,
      sku_id: 0,
      commodityAttr: [],
      attrValueList: [],
      hideviewgoodsinfo: true,
      dkheight: 300,
      scrollTop: 0,
      scrollTop_init: 350,
      comment: '',
      comm_list: [],
      img_arr: [],
      new_img_arr: [],
      upimg_url: [],
      formdata: '',
      star: [],
      goodstag: "",
      goods_img: "",
      goods_id: "",
      goods_skuid: "",
      order_skuid: "",
      comm_type: "",
      comment_level: "",
      content: "",
      new_img_url: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    this.goods_id = options.goods_id ? options.goods_id : 0;
    this.goods_skuid = options.goods_skuid ? options.goods_skuid : 0;
    this.order_skuid = options.order_skuid ? options.order_skuid : 0;
    this.comm_type = options.comm_type ? options.comm_type : 0;
    
    console.log('comment onload options:', options);
    that.get_goods_list();
  },
  methods: {
    showGoods: function (e) {
      // 点击购物车某件商品跳转到商品详情
      var objectId = e.currentTarget.dataset.objectId;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_id = e.currentTarget.dataset.goodsId;
      var goods_name = e.currentTarget.dataset.goodsName;
      var goods_price = e.currentTarget.dataset.goodsPrice;
      var goods_info = e.currentTarget.dataset.goodsInfo;
      var goods_sale = e.currentTarget.dataset.sale; //var carts = this.data.carts;

      var sku_id = objectId;
      wx.navigateTo({
        url: '../../details/details?sku_id=' + objectId + '&id=' + goods_id + '&goods_info=' + goods_info + '&goods_price=' + goods_price + '&sale=' + goods_sale + '&token=' + token + '&username=' + username
      });
    },
    //获取商品信息
    get_goods_list: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var page = that.page;
      var goods_id = that.goods_id;
      var goods_skuid = that.goods_skuid;
      wx.request({
        url: weburl + '/api/client/get_goods_list',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          goods_id: goods_id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var goods_info = res.data.result;
          var ret_info = res.data.info;
          console.log('获取单个产品信息:', goods_info);

          if (goods_info) {
            that.goodsid = goods_info[0]['id']
            that.goodsname = goods_info[0]['name']
            that.goodsinfo = goods_info[0]['act_info']
            that.goodstag = goods_info[0]['goods_tag']
            that.goodsprice = goods_info[0]['sell_price']
            that.goodssale = goods_info[0]['sale']
            that.goods_img = goods_info[0]['image']
            // 商品SKU

            wx.request({
              url: weburl + '/api/client/get_goodssku_list',
              method: 'POST',
              data: {
                username: username,
                access_token: token,
                goods_id: goods_id,
                sku_id: goods_skuid,
                page: page
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: function (res) {
                console.log('商品SKU:'+ res.data.result);
                var attrValueList = res.data.result.spec_select_list;
                var commodityAttr = res.data.result.sku_list;
                if (!commodityAttr) return;

                for (var i = 0; i < commodityAttr.length; i++) {
                  if (commodityAttr[i].attrValueStatus) {
                    commodityAttr[i].attrValueStatus = true;
                  } else {
                    commodityAttr[i].attrValueStatus = false;
                  }
                }

               that.commodityAttr = commodityAttr
			   that.goodsprice = commodityAttr[0]['sell_price']
                if (!attrValueList) return;

                for (var i = 0; i < attrValueList.length; i++) {
                  if (attrValueList[i].attrValueStatus) {
                    attrValueList[i].attrValueStatus = true;
                  } else {
                    attrValueList[i].attrValueStatus = false;
                  }
                }

               that.attrValueList = attrValueList
              }
            });
          } else {
            wx.showToast({
              title: '服务已暂停',
              icon: 'loading',
              duration: 3000
            });
            setTimeout(function () {
              wx.navigateBack();
            }, 1500);
          }
        }
      });
    },
    get_order_comment: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var page = that.page;
      var pagesize = that.pagesize;
      var goods_id = that.goods_id;
      var good_skuid = that.good_skuid;
      var order_skuid = that.order_skuid;
      var shop_type = that.shop_type;
      var img_arr = that.img_arr;

      if (goods_id > 0) {
        wx.request({
          url: weburl + '/api/client/get_order_comment',
          method: 'POST',
          data: {
            username: username,
            access_token: token,
            goods_id: goods_id,
            good_skuid: good_skuid,
            order_skuid: order_skuid,
            m_id: m_id,
            shop_type: shop_type
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            var comm_list = res.data.result;
            var ret_info = res.data.info;
            var all_rows = res.data.all_rows ? res.data.all_rows : 1;
            console.log('获取订单评论信息 :' + res.data, 'goods_id:', goods_id); //console.log(res.data);

            if (comm_list) {
              if (comm_list[0]['img1'] != 'undefined' && comm_list[0]['img1'] != '') img_arr[0] = comm_list[0]['img1'];
              if (comm_list[0]['img2'] != 'undefined' && comm_list[0]['img2'] != '') img_arr[1] = comm_list[0]['img2'];
              if (comm_list[0]['img3'] != 'undefined' && comm_list[0]['img3'] != '') img_arr[2] = comm_list[0]['img3'];
              that.comm_list = that.comm_list.concat(comm_list)
              that.all_rows = all_rows
              that.img_arr = img_arr
              that.comment_level = comm_list[0]['level']
              that.content = comm_list[0]['desc']
              console.log('comm_list:', comm_list, 'img list:', img_arr);
            }
          }
        });
      }
    },
    comment_star: function (e) {
      var that = this;
      var star_id = e.currentTarget.dataset.starId;
      var comment_level = that.comment_level;

      if (star_id == comment_level) {
        comment_level = comment_level - 1;
      } else {
        comment_level = star_id;
      }

      that.comment_level = comment_level
    },
    formSubmit: function (e) {
      var id = e.target.id;
      adds = e.detail.value;
      adds.program_id = getApp().globalData.jtappid;
      adds.openid = getApp().globalData._openid;
      adds.zx_info_id = this.zx_info_id;
      this.upload();
    },
    upload: function () {
      var that = this;
      var goods_id = that.goods_id;
      var new_img_addr = that.new_img_arr; //本次上传图片的手机端文件地址

      var new_img_url = []; //本次上传图片的服务端url

      for (var i = 0; i < new_img_addr.length; i++) {
        var count = new_img_addr.length;
        wx.uploadFile({
          url: uploadurl,
          filePath: new_img_addr[i],
          name: 'wechat_upimg',
          //formData: adds,
          formData: {
            latitude: encodeURI(0.0),
            longitude: encodeURI(0.0),
            restaurant_id: encodeURI(0),
            city: encodeURI('杭州'),
            prov: encodeURI('浙江'),
            name: encodeURI(goods_id) // 名称

          },
          // HTTP 请求中其他额外的 form data
          success: function (res) {
            var retinfo = JSON.parse(res.data.trim());

            if (retinfo['status'] == "y") {
              new_img_url.push(retinfo['result']['img_url']);
              that.new_img_url = new_img_url
              count--;
              console.log('图片上传完成:', that.new_img_url, ' count:', count);

              if (count == 0) {
                that.send_comment();
              }
            }
          }
        });
      }

      wx.showToast({
        title: '已提交！',
        duration: 2000
      });
      var content = that.content;
      if (!content) {
        that.content = '图片:'
      }
    },
    upimg: function () {
      var that = this;
      var new_img_arr = that.new_img_arr;
      var img_arr = that.img_arr;

      if (img_arr.length + new_img_arr.length < 3) {
        wx.chooseImage({
          sizeType: ['original', 'compressed'],
          success: function (res) {
           that.new_img_arr = new_img_arr.concat(res.tempFilePaths)
            console.log('本次上传图片:', that.new_img_arr);
          }
        });
      } else {
        wx.showToast({
          title: '最多上传三张图片',
          icon: 'loading',
          duration: 3000
        });
      }
    },
    cancel_upimg: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      var img_tmp = [];
      var old_img_arr = that.img_arr;
      var j = 0;
      console.log('cancel_upimg:', old_img_arr.length, 'id:', id);

      for (var i = 0; i < old_img_arr.length; i++) {
        if (i != id) {
          img_tmp[j++] = old_img_arr[i];
        }
      }

      that.img_arr = img_tmp
    },
    cancel_new_upimg: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      var img_tmp = [];
      var all_img_arr = that.img_arr;
      var new_img_arr = that.new_img_arr;
      var j = 0;
      console.log('cancel_upimg:', new_img_arr.length, 'id:', id);

      for (var i = 0; i < new_img_arr.length; i++) {
        if (i != id) {
          img_tmp[j++] = new_img_arr[i];
        }
      }

     that.new_img_arr = img_tmp
    },
    bindTextAreaBlur: function (e) {
      var that = this;
	  that.content = e.detail.value ;
    },
    sendCommentBtnTap: function () {
      var that = this;
      var upimage = that.new_img_arr;
      var content = that.content ? that.content : '';

      if (content == '') {
        wx.showToast({
          title: '评论内容不能为空',
          icon: 'none',
          duration: 1500
        });
      } else {
        if (upimage.length > 0) {
          that.upload();
        } else {
          //console.log('本次没有需上传图片:', upimage) 
          that.send_comment();
        }
      }
    },
    send_comment: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : '';
      var goods_id = that.goods_id;
      var goods_skuid = that.goods_skuid;
      var order_skuid = that.order_skuid;
      var upimg_url = that.upimg_url;
      upimg_url = upimg_url.concat(that.img_arr);
      upimg_url = upimg_url.concat(that.new_img_url);
      var comment_img1 = upimg_url[0] ? upimg_url[0] : '';
      var comment_img2 = upimg_url[1] ? upimg_url[1] : '';
      var comment_img3 = upimg_url[2] ? upimg_url[2] : '';
      var content = that.content ? that.content : '';
      var product_comment_level = that.comment_level ? that.comment_level : 0;
      var shop_type = that.shop_type;
      var comm_type = that.comm_type;
      console.log('提交评论:', upimg_url, content);
      wx.request({
        url: weburl + '/api/client/order_comment',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          goods_id: goods_id,
          goods_skuid: goods_skuid,
          order_skuid: order_skuid,
          comment_img1: comment_img1,
          comment_img2: comment_img2,
          comment_img3: comment_img3,
          content: content,
          product_comment_level: product_comment_level,
          shop_type: shop_type,
          comm_type: comm_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '点评完成',
            icon: 'success',
            duration: 1000
          });
          console.log('点评完成', res);
          wx.navigateBack();
        }
      });
    },
	/*
    showCartToast: function () {
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1000
      });
    },
	*/
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
@import "./comment.css";
</style>