<template>
<view>
<view class="container">
  <view v-for="(comm, index) in comm_list" :key="index" class="comm-item">
    <view class="comm-title">
        <image class="comm-image" :src="comm.wx_headimg" mode="aspectFill"></image>
        <view class="comm-sub-title">
          <text>{{comm.wx_nickname}}</text>
          <view class="star-level">
          <image :src="(comm.level>0?'/static/images/star_on.png':'/static/images/star.png')"></image>
          <image :src="(comm.level>1?'/static/images/star_on.png':'/static/images/star.png')"></image>
          <image :src="(comm.level>2?'/static/images/star_on.png':'/static/images/star.png')"></image>
          <image :src="(comm.level>3?'/static/images/star_on.png':'/static/images/star.png')"></image>
          <image :src="(comm.level>4?'/static/images/star_on.png':'/static/images/star.png')"></image>
        </view>    
      </view>
    </view>
   <view>
    <view class="comm-content-text">{{comm.desc}}</view>
    </view>
    <view class="comm-content-image">
     <image @tap="imgYu" :data-list="comm.img_arr" :data-src="dImg" v-for="(dImg, index2) in comm.img_arr" :key="index2" :src="dImg" mode="aspectFit"></image>
    </view>
  </view>
</view>
<button v-if="page_num>1" type="default" size="default" hover-class="none" class="morebtn" @tap="getMoreCommentTapTag">更多 {{page}}/{{page_num}}</button>
</view>
</template>

<script>
var util = require("../../../utils/util.js");
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
      page_num: 0,
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
      goods_id: "",
      goods_skuid: "",
      order_skuid: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var goods_id = options.goods_id;
    var goods_skuid = options.goods_skuid ? options.goods_skuid : 0;
    var order_skuid = options.order_skuid ? options.order_skuid : 0;
    that.setData({
      goods_id: goods_id,
      goods_skuid: goods_skuid,
      order_skuid: order_skuid
    });
    that.get_order_comment();
  },
  methods: {
    /** 
       * 预览图片
       */
    imgYu: function (event) {
      var src = event.currentTarget.dataset.src; //获取data-src

      var imgList = event.currentTarget.dataset.list; //获取data-list
      //图片预览

      wx.previewImage({
        current: src,
        // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表

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
      var query_type = 1;
      var page = that.page;
      var pagesize = that.pagesize;
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
            query_type: query_type,
            m_id: m_id,
            page: page,
            pagesize: pagesize,
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

            if (comm_list) {
              var page_num = that.page_num;
              page_num = all_rows / pagesize + 0.5;
              that.setData({
                comm_list: that.comm_list.concat(comm_list),
                all_rows: all_rows,
                page_num: page_num.toFixed(0)
              });

              for (var i = 0; i < comm_list.length; i++) {
                var img_arr = [];
                if (comm_list[i]['img1']) img_arr.push(comm_list[i]['img1']);
                if (comm_list[i]['img2']) img_arr.push(comm_list[i]['img2']);
                if (comm_list[i]['img3']) img_arr.push(comm_list[i]['img3']);
                comm_list[i]['img_arr'] = img_arr;
              }

              that.setData({
                comm_list: comm_list
              });
              console.log('获取商品评论信息:', comm_list, 'all_rows:', all_rows);
            } else {
              wx.showToast({
                title: '暂无评论信息',
                icon: 'loading',
                duration: 1000
              });
            }
          }
        });
      }
    },
    getMoreCommentTapTag: function (e) {
      var that = this;
      var page = that.page + 1;
      var pagesize = that.pagesize;
      var all_rows = that.all_rows;

      if (page > that.page_num) {
        wx.showToast({
          title: '没有更多了',
          icon: 'loading',
          duration: 1000
        });
        return;
      }

      that.setData({
        page: page
      });
      that.get_order_comment();
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
    showCartToast: function () {
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1000
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
@import "./commentlist.css";
</style>