<template>
<!--index.wxml-->
<view class="container-layout">
      
  <!--地图-->
  <view class="map-wrapper" :style="'height:' + mapHeight">
      <!--顶部提示-->
      <view v-if="openSetting==0" class="cover-tip-wrapper">
        <button open-type="openSetting" @opensetting="getSetting">打开授权</button>
      </view>
      <!-- 
      <cover-view class='cover-tip-wrapper' wx:if='{{showTopTip}}' bindtap='showNewMarkerClick'>
        <cover-image class='tip-bg' src='../../../images/tip-bg.png'>
        </cover-image>
        <cover-view class='cover-tip-content'>
          <cover-image class='trumpet-icon' src='../../../images/notification.png'>
          </cover-image>
          <cover-view class='tip-text'>{{warningText}}</cover-view>
          <cover-image class='right-arrow' src='../../../images/right-arrow.png'></cover-image>
        </cover-view>
      </cover-view>
      -->
    <map class="map" id="myMap" :longitude="longitude" :latitude="latitude" :scale="scale" show-location="true" :markers="markers" :polyline="polyline" @markertap="bindMakertap" @controltap="controlTap" @regionchange="regionChange" :controls="controls" @tap="bindMapTap">
    </map>
    <!--定位当前位置-->
    <cover-view class="cover-layout" @tap="selfLocationClick">
      <cover-image class="self-location" src="/static/images/self-location.png"></cover-image>
    </cover-view>
    <!--上传信息按钮-->
    <!-- 
    <cover-view wx:if='{{showUpload}}' class='home-btn-layout' style='left:{{homeActionLeftDistance}}' id='home-action-wrapper'>
      <cover-image class='home-action-btn' src='../../img/home-btn.png' bindtap='uploadInfoClick'>
      </cover-image>
    </cover-view>
    -->
  </view>
  <!--底部布局-->
  <view class="bottom-layout" id="bottom-layout">
    <view class="bottom-wrapper">
      <view upload-wrapper v-if="showConfirm">
        <!--点击上传信息-->
        <form @submit="confirmClick">
          <view class="cancel-publish-layout">
            <view class="cancel-btn flex-center" @tap="cancelClick">取消</view>
            <button class="confirm-btn flex-center" form-type="submit">发布</button>
            <view class="split-blur-bg" style="position:absolute;top:0"></view>
          </view>
          <view class="line"></view>
          <view class="location-wrapper" @tap="chooseAddress">
            <image class="location-icon" src="/static/images/location-icon.png"></image>
            <view class="address-wrapper">
              <text class="location-address">{{selectAddress}}</text>
            </view>
          </view>
          <view class="info-wrapper">
            <textarea class="info-text" placeholder name="message" placeholder-style="color:#CCCCCC"></textarea>
          </view>
          <view class="upload-image-root">
            <view class="upload-image-wrapper">
              <image class="default-image" src="/static/images/default-camera-image.png" @tap="takePhoto" v-if="!uploadImagePath"></image>
              <image class="default-image" :src="uploadImagePath" @tap="previewSelectImage" v-if="uploadImagePath" mode="aspectFill"></image>
              <!--删除图片的图标-->
              <image class="delete-image-icon" src="/static/images/delete-icon.png" v-if="uploadImagePath" @tap="deleteSelectImage"></image>
            </view>
          </view>
        </form>
      </view>
    </view>
  </view>
</view>
</template>

<script>
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var qqmapkey = getApp().globalData.mapkey;
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
const defaultScale = 14;
var mapInterval = getApp().globalData.mapInterval;
var constant = require("utils/constant.js");
var QQMapWX = require("utils/qqmap-wx-jssdk.min.js"); //定义全局变量
//定义全局变量
var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
var wxMarkerData = [];
var bottomHeight = 0;
var windowHeight = 0;
var windowWidth = 0;
var mapId = 'myMap';
var qqmapsdk;
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];

export default {
  data() {
    return {
      userInfo: userInfo,
      openSetting: 0,
      m_id: m_id,
      username: username,
      token: token,
      hasUserInfo: false,
      longitude: '',
      latitude: '',
      interval: mapInterval ? mapInterval : 20000,
      //地图缩放级别
      scale: defaultScale,
      markers: [],
      showTopTip: true,
      warningText: '顶部提示',
      showUpload: true,
      showConfirm: false,
      showComment: false,
      //地图高度
      mapHeight: 0,
      infoAddress: '',
      commentCount: 0,
      praiseCount: 0,
      commentList: [],
      selectAddress: '',
      centerLongitude: '',
      centerLatitude: '',
      uploadImagePath: '',
      currentMarkerId: 0,
      praiseSrc: '../../../images/bottom-unpraise.png',
      warningIconUrl: '',
      infoMessage: '',
      isUp: false,
      //中心指针，不随着地图拖动而移动
      controls: [],
      //搜索到的中心区域地址信息,用于携带到选择地址页面
      centerAddressBean: null,
      //选择地址后回调的实体类
      callbackAddressInfo: null,
      //将回调地址保存
      callbackLocation: null,
      //当前省份
      currentProvince: '',
      //当前城市
      currentCity: '',
      //当前区县
      currentDistrict: '',
      showHomeActionIcon: true,
      homeActionLeftDistance: '0rpx',
      //单个 marker
      currentTipInfo: '',
      //显示位置评论输入框
      showCommentInput: false,
      //位置评论文字
      commentMessage: '',
      //分享携带经度
      shareLongitude: '',
      //分享携带纬度
      shareLatitude: '',
      //是否是分享点击进入小程序
      showShare: false,
      //上传者用户信息
      userAvatar: userInfo.avatarUrl,
      userNickname: userInfo.nickName,
      uploadTime: '',
      hasMarkers: true,
      activity_lat: "",
      activity_lng: "",
      activity_title: "",
      activity_address: "",
      activity_id: "",
      activity_omid: "",
      member_loc: "",
      loc_name: "",
      markersMy: "",
      polyline: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var activity_lat = options.lat;
    var activity_lng = options.lng;
    var activity_title = options.title ? options.title : '';
    var activity_id = options.activity_id ? options.activity_id : 0;
    var activity_address = options.activity_address ? options.activity_address : '';
    var activity_omid = options.activity_omid ? options.activity_omid : 0;
    this.setData({
      activity_lat: activity_lat,
      activity_lng: activity_lng,
      activity_title: activity_title,
      activity_address: activity_address,
      activity_id: activity_id,
      activity_omid: activity_omid
    });
    console.log('map onlod activity_lat:', activity_lat, ' activity_lng:', activity_lng, ' activity_title:', activity_title, ' activity_id:', activity_id);
    wx.getSetting({
      success(res) {
        var authMap = res.authSetting;
        var length = Object.keys(authMap).length;
        console.log("authMap info 长度:" + length, authMap);

        if (authMap.hasOwnProperty('scope.userLocation')) {
          if (!res.authSetting['scope.userLocation']) {
            wx.showModal({
              title: '用户未授权',
              content: '请授权地理位置权限',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定授权地理位置权限');
                  wx.openSetting({
                    success: function success(res) {
                      console.log('openSetting success', res.authSetting);
                    }
                  });
                }
              }
            });
          }
        }
      }

    });
    /*
    var openSetting = wx.getStorageSync('userLocation') ? wx.getStorageSync('userLocation') : 1
    this.setData({
      openSetting: openSetting
    })
    */
    //检测更新

    that.checkUpdate();

    if (that.userInfo) {
      this.setData({
        hasUserInfo: true
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      getApp().globalData.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo,
          hasUserInfo: true
        });
      });
    }
    /*
    setInterval(function () {
     that.reportLocation()
    }, that.data.interval)
    */


    that.requestLocation(); //that.reportLocation()

    that.scopeSetting();
  },
  onShow: function () {
    console.log('onShow--------------------->');
    var that = this;
    that.changeMapHeight(); //that.setHomeActionLeftDistance();
    //如果刚从选择地址页面带数据回调回来，则显示选择的地址

    console.log(that.callbackAddressInfo);

    if (that.callbackAddressInfo == null) {
      that.getCenterLocation(); //正在上传的话，不去请求地理位置信息

      if (that.showUpload) {//that.requestLocation()
      }
    } else {
      that.setData({
        selectAddress: that.callbackAddressInfo.title,
        callbackLocation: that.callbackAddressInfo.location
      }); //置空回调数据，即只使用一次，下次中心点变化后就不再使用

      that.setData({
        callbackAddressInfo: null
      });
    }
  },

  /**
   * 页面不可见时
   */
  onHide: function () {},
  onShareAppMessage: function (res) {},
  methods: {
    getSetting: function (e) {
      if (e.detail.authSetting["scope.userLocation"]) {
        //如果打开了地理位置，就会为true
        this.setData({
          openSetting: 1
        });
      } else {
        wx.authorize({
          scope: 'scope.userLocation',

          success() {
            console.log('位置授权成功' + res.errMsg);
            wx.setStorageSync('userLocation', '1');
          }

        });
        this.setData({
          openSetting: 1
        });
      }
    },

    /**
     * 点击顶部横幅提示
     */
    showNewMarkerClick: function () {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '你点击了顶部提示框',
        showCancel: false
      });
    },

    /**
     * 设置上传情报按钮的左边距
     */
    setHomeActionLeftDistance: function () {
      var that = this;

      if (!that.showUpload) {
        return;
      }

      wx.getSystemInfo({
        success: function (res) {
          windowHeight = res.windowHeight;
          windowWidth = res.windowWidth; //创建节点选择器

          var query = wx.createSelectorQuery(); //选择id

          query.select('#home-action-wrapper').boundingClientRect();
          query.exec(function (res) {
            //res就是 所有标签为mjltest的元素的信息 的数组
            console.log(res);
            /*
            that.setData({
              homeActionLeftDistance: ((windowWidth - res[0].width) / 2) + 'px'
            })
            */
          });
        }
      });
    },
    changeMapHeight: function () {
      var that = this;
      var count = 0;
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          windowHeight = res.windowHeight;
          windowWidth = res.windowWidth; //创建节点选择器

          var query = wx.createSelectorQuery();
          var query = wx.createSelectorQuery();
          query.select('#bottom-layout').boundingClientRect();
          query.exec(function (res) {
            console.log(res);
            bottomHeight = res[0].height;
            that.setMapHeight();
          });
        }
      });
    },
    setMapHeight: function (params) {
      var that = this;
      that.setData({
        mapHeight: windowHeight - bottomHeight + 'px'
      });
      var controlsWidth = 40;
      var controlsHeight = 48; //设置中间部分指针

      that.setData({
        controls: [{
          id: 1,
          iconPath: '../../../images/center-location.png',
          position: {
            left: (windowWidth - controlsWidth) / 2,
            top: (windowHeight - bottomHeight) / 2 - controlsHeight * 3 / 4,
            width: controlsWidth,
            height: controlsHeight
          },
          clickable: true
        }]
      });
    },
    scopeSetting: function () {
      var that = this;
      console.log('scopeSetting');
      that.initMap();
    },

    /** 
     * 初始化地图
     */
    initMap: function () {
      var that = this;
      qqmapsdk = new QQMapWX({
        key: constant.tencentAk
      });
      console.log('初始化地图');
      that.getCenterLocation();
      that.getMemberLocation();
      /*
      if (that.data.activity_omid == that.data.m_id && that.data.markersMy) {
        that.getMemberLocation()
      }
      */
    },
    //请求地理位置
    requestLocation: function () {
      var that = this;
      var activity_id = that.activity_id;
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          that.setData({
            latitude: res.latitude ? res.latitude : that.latitude,
            longitude: res.longitude ? res.longitude : that.longitude
          });
          console.log('requestLocation:', res);
          that.moveTolocation();
          that.reportLocation();
          that.queryMarkerInfo();
        }
      });

      if (activity_id > 0) {
        setTimeout(function () {
          that.requestLocation(); //取消定时获取位置信息
        }, that.interval);
      }
    },
    //上报地理位置
    reportLocation: function () {
      var that = this;
      wx.request({
        url: weburl + '/api/client/update_member_loc',
        method: 'POST',
        data: {
          'username': that.username ? that.username : wx.getStorageSync('username'),
          'access_token': that.token ? that.token : wx.getStorageSync('token'),
          'm_id': that.m_id ? that.m_id : 0,
          'latitude': that.latitude,
          'longitude': that.longitude,
          'shop_type': that.shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('reportLocation:', res);
          var mapDisplayInfo = res.data.result;

          if (mapDisplayInfo) {
            that.setData({
              interval: mapDisplayInfo['interval']
            });
            getApp().globalData.mapInterval = mapDisplayInfo['interval'];
          }
        }
      });
    },
    //获取成员地理位置
    getMemberLocation: function () {
      var that = this;
      var activity_id = that.activity_id;
      var shop_type = that.shop_type; //console.log('map getMemberLocation activity_id:',that.data.activity_id)

      wx.request({
        url: weburl + '/api/client/get_member_loc',
        method: 'POST',
        data: {
          'username': that.username ? that.username : wx.getStorageSync('username'),
          'access_token': that.token ? that.token : wx.getStorageSync('token'),
          'm_id': that.m_id ? that.m_id : 0,
          'activity_id': activity_id,
          'shop_type': shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var loc_list = res.data.result ? res.data.result : '';
          var member_loc = [];

          if (loc_list) {
            for (var i = 0; i < loc_list.length; i++) {
              var new_loc = {
                id: i + 3,
                name: loc_list[i]['wx_nickname'],
                latitude: parseFloat(loc_list[i]['latitude']),
                longitude: parseFloat(loc_list[i]['longitude']),
                width: 25,
                height: 25,
                iconPath: loc_list[i]['wx_headimg'] ? loc_list[i]['wx_headimg'] : '../../../images/ai.png',
                callout: {
                  content: loc_list[i]['wx_nickname'],
                  color: "#2c8df6",
                  fontSize: 12,
                  borderRadius: 10,
                  bgColor: "#fff",
                  display: "ALWAYS",
                  boxShadow: "5px 5px 10px #aaa"
                }
              };
              member_loc.push(new_loc);
            }

            that.setData({
              member_loc: member_loc,
              hasMarkers: true
            }); //that.getCenterLocation()

            that.queryMarkerInfo();
            console.log('map getMemberLocation success:', res, 'member_loc:', that.member_loc);
          }
        }
      });

      if (activity_id > 0) {
        setTimeout(function () {
          that.getMemberLocation();
        }, that.interval);
      }
    },

    /**
     * 点击marker
     */
    bindMakertap: function (e) {
      var that = this; //设置当前点击的id

      that.setData({
        currentMarkerId: e.markerId
      });
      console.log('currentMarkerId:', that.currentMarkerId); //重新设置点击marker为中心点

      for (var key in that.markers) {
        var marker = that.markers[key];

        if (e.markerId == marker.id) {
          that.setData({
            //longitude: marker.longitude,
            //latitude: marker.latitude,
            loc_name: e.markerId == 1 ? that.activity_address : marker.name
          });
        }
      }

      wx.showModal({
        title: '这里是',
        content: that.loc_name ? that.loc_name : '位置',
        showCancel: false
      });
    },

    /**
     * 上传情报
     */
    uploadInfoClick: function () {
      var that = this;
      that.adjustViewStatus(false, true, false);
      that.updateCenterLocation(that.latitude, that.longitude); //that.regeocodingAddress();
    },

    /**
     * 更新上传坐标点
     */
    updateCenterLocation: function (latitude, longitude) {
      var that = this;
      that.setData({
        centerLatitude: latitude,
        centerLongitude: longitude
      }); //that.queryMarkerInfo()

      that.regeocodingAddress();
    },

    /**
     * 回到定位点
     */
    selfLocationClick: function () {
      var that = this; //还原默认缩放级别

      that.setData({
        scale: defaultScale
      }); //必须请求定位，改变中心点坐标
      //that.requestLocation();

      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
          console.log('selfLocationClick:', res);
        }
      });
    },

    /**
     * 移动到中心点
     */
    moveTolocation: function () {
      var mapCtx = wx.createMapContext(mapId);
      mapCtx.moveToLocation();
    },
    cancelClick: function () {
      var that = this;
      that.resetPhoto();
      that.adjustViewStatus(true, false, false);
    },

    /**
     * 确认上传情报，忽略此处逻辑
     */
    confirmClick: function (res) {
      var that = this;
      console.log(res);
      var message = res.detail.value.message.trim();

      if (!that.centerLatitude || !that.centerLongitude) {
        that.showModal('请选择上传地点~');
        return;
      }

      if (!message) {
        that.showModal('请说点什么吧~');
        return;
      }
    },

    /**
     * 点击控件时触发
     */
    controlTap: function () {},

    /**
     * 点击地图时触发
     */
    bindMapTap: function () {
      //恢复到原始页
      this.adjustViewStatus(true, false, false);
    },
    adjustViewStatus: function (uploadStatus, confirmStatus, commentStatus) {
      var that = this;
      that.setData({
        //显示上传情报按钮
        showUpload: uploadStatus,
        //开始上传情报
        showConfirm: confirmStatus,
        //显示情报详情
        showComment: commentStatus
      });
      that.changeMapHeight();
    },

    /**
     * 预览图片
     */
    previewImage: function () {
      var that = this;
      wx.previewImage({
        urls: [that.warningIconUrl]
      });
    },

    /**
     * 选择照片
     */
    takePhoto: function () {
      var that = this;
      wx.chooseImage({
        sizeType: sizeType[1],
        count: 1,
        success: function (res) {
          that.setData({
            uploadImagePath: res.tempFilePaths[0]
          });
          that.adjustViewStatus(false, true, false);
        }
      });
    },

    /**
     * 删除已选照片
     */
    deleteSelectImage: function () {
      this.resetPhoto();
    },

    /**
     * 重置照片
     */
    resetPhoto: function () {
      var that = this;
      that.setData({
        uploadImagePath: ''
      });
    },
    previewSelectImage: function () {
      var that = this;
      wx.previewImage({
        urls: [that.uploadImagePath]
      });
    },

    /**
     * 拖动地图回调
     */
    regionChange: function (res) {
      var that = this; // 改变中心点位置  

      if (res.type == "end") {
        that.getCenterLocation();
      }
    },

    /**
     * 得到中心点坐标
     */
    getCenterLocation: function () {
      var that = this;
      var mapCtx = wx.createMapContext(mapId);
      mapCtx.getCenterLocation({
        success: function (res) {
          console.log('getCenterLocation----------------------->');
          console.log(res);
          that.updateCenterLocation(res.latitude, res.longitude);
        }
      });
    },

    /**
     * 逆地址解析
     */
    regeocodingAddress: function () {
      var that = this; //不在发布页面，不进行逆地址解析，节省调用次数，腾讯未申请额度前一天只有10000次

      if (!that.showConfirm) {
        return;
      } //通过经纬度解析地址


      qqmapsdk.reverseGeocoder({
        location: {
          latitude: that.centerLatitude,
          longitude: that.centerLongitude
        },
        success: function (res) {
          console.log(res);
          that.setData({
            centerAddressBean: res.result,
            selectAddress: res.result.formatted_addresses.recommend,
            currentProvince: res.result.address_component.province,
            currentCity: res.result.address_component.city,
            currentDistrict: res.result.address_component.district
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    },

    /**
     * 查询 marker 信息
     */
    queryMarkerInfo: function () {
      var that = this;
      var markersMy = []; //调用请求 marker 点的接口就好了

      var destLocation = {
        id: 1,
        name: that.activity_title,
        latitude: parseFloat(that.activity_lat),
        longitude: parseFloat(that.activity_lng),
        width: 50,
        height: 50,
        iconPath: '../../../images/ai_s.png',
        //dog-select.png
        callout: {
          content: that.activity_title,
          color: "#2c8df6",
          fontSize: 13,
          borderRadius: 10,
          bgColor: "#fff",
          display: "ALWAYS",
          boxShadow: "5px 5px 10px #aaa"
        }
        /*
        label: {
          color: "#ff6600",
          fontSize: 12,
          content: "目的地",
          x: parseFloat(that.data.activity_lat),
          y: parseFloat(that.data.activity_lng),
        } 
        */

      };
      if (destLocation) markersMy.push(destLocation);

      if (that.longitude && that.latitude) {
        var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
        var myLocation = {
          id: 2,
          name: '我的位置',
          latitude: that.latitude,
          longitude: that.longitude,
          width: 35,
          height: 35,
          iconPath: userInfo.userAvatar ? userInfo.userAvatar : '../../../images/ai.png',
          callout: {
            content: '我',
            color: "#e34c55",
            fontSize: 12,
            borderRadius: 10,
            bgColor: "#fff",
            display: "ALWAYS",
            boxShadow: "5px 5px 10px #aaa"
          }
        };
        if (myLocation) markersMy.push(myLocation);
      }

      var polyline = [{
        points: [{
          latitude: parseFloat(that.activity_lat),
          longitude: parseFloat(that.activity_lng)
        }, {
          latitude: that.latitude ? that.latitude : parseFloat(that.activity_lat),
          longitude: that.longitude ? that.longitude : parseFloat(that.activity_lng)
        }],
        color: "#ff6600",
        width: 2,
        dottedLine: false,
        arrowLine: true,
        borderColor: "#000",
        borderWidth: 2
      }];

      if (!that.member_loc) {
        that.setData({
          markers: markersMy,
          markersMy: markersMy
        });
      } else {
        that.setData({
          markers: markersMy.concat(that.member_loc),
          markersMy: markersMy
        });
      }

      that.setData({
        polyline: polyline
      });
      console.log('queryMarkerInfo markers:', that.markers, 'polyline:', polyline);
      /*
      var mapCtx = wx.createMapContext(mapId);
      mapCtx.includePoints({
        padding: [20],
        points: currentMarker
      })
      */
    },

    /**
     * 创建marker
     */
    createMarker: function () {
      var that = this;
      var currentMarker = [];
      var markerList = dataList.data;

      for (var key in markerList) {
        var marker = markerList[key];
        marker.id = marker.info_id;
        marker.latitude = marker.lat;
        marker.longitude = marker.lng;
        marker.width = 40;
        marker.height = 40;

        if (marker.image) {
          marker.iconPath = '../../../images/dog-select.png';
        } else {
          marker.iconPath = '../../../images/dog-yellow.png';
        }
      }

      currentMarker = currentMarker.concat(markerList);
      console.log(currentMarker);
      that.setData({
        markers: currentMarker
      });
    },

    /**
     * 选择地址
     */
    chooseAddress: function () {
      var that = this;
      wx.navigateTo({
        url: '../chooseAddress/chooseAddress?city=' + that.centerAddressBean.address_component.city + '&street=' + that.centerAddressBean.address_component.street
      });
    },

    /**
     * 版本更新
     */
    checkUpdate: function () {
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          console.log('onCheckForUpdate----------------->');
          console.log(res.hasUpdate);
        });
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，即刻体验？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(function () {// 新的版本下载失败
        });
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
@import "./map.css";
</style>