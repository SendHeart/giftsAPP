<template>
<view>
<!--index.wxml-->
<view class="container">
  <view class="userinfo">
    <image class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover"></image>
    <text class="userinfo-nickname">{{userInfo.nickName}}</text>
     <button type="default" size="default" hover-class="button-hover" class="button" @tap="loginBtnTap">{{logintBtnTitle}}</button>
  </view>
  <!--
  <view class="voice">
    <button type="primary" size="default" hover-class="button-hover" class="button-voice-play" bindtap="socketBtnTap">{{socktBtnTitle}}</button>
  </view>
   -->
</view>
<scroll-view scroll-y="true" :style="'height:' + dkheight + 'px;opacity:1;'" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" :scroll-into-view="toView" :scroll-top="scrollTop">
<!--
  <view wx:if="{{goods_owner!=username}}" class='wxParse' hidden='{{hidechatbox}}'>
      <template is="wxParse" data="{{wxParseData:dkcontent.nodes}}"/>  
  </view> 
  -->
  <view class="voice" :hidden="hidechatbox">
    <block v-for="(rcvitem, index) in rcvinfo" :key="index">
      <view :class="rcvitem.textclass" :data-index="index" @tap="feedbackTap">
        <text style="margin-right:5px;">[{{rcvitem.nickname}}]</text>
        <text style="margin-right:5px;" v-if="rcvitem.message">{{rcvitem.message}}</text>
        <image style="margin-right:5px;width:20px;height:20px;" v-if="rcvitem.pic1!='undefined'" :src="rcvitem.pic1"></image>
        <image style="margin-right:5px;width:20px;height:20px;" v-if="rcvitem.pic2!='undefined'" :src="rcvitem.pic2"></image>
        <image style="margin-right:5px;width:20px;height:20px;" v-if="rcvitem.pic3!='undefined'" :src="rcvitem.pic3"></image>
        <!-- 
        <text style='margin-right:5px;'wx:if="{{rcvitem.addtime}}">{{rcvitem.addtime}}</text>
        -->
       </view>
       <view v-if="goods_owner==username">
        <text style="margin-left:5px;" v-if="rcvitem.reply!='undefined'">[回复]:{{rcvitem.reply}}</text>
         <image style="margin-right:5px;width:20px;height:20px;" v-if="rcvitem.rpypic1!='undefined'" :src="rcvitem.rpypic1"></image>
        <image style="margin-right:5px;width:20px;height:20px;" v-if="rcvitem.rpypic2!='undefined'" :src="rcvitem.rpypic2"></image>
        <image style="margin-right:5px;width:20px;height:20px;" v-if="rcvitem.rpypic3!='undefined'" :src="rcvitem.rpypic3"></image>
        <!-- 
        <text style='margin-right:5px;'wx:if="{{rcvitem.reply!='undefined'}}">{{rcvitem.replytime}}</text>
        -->
      </view>
    </block>
  </view>
</scroll-view>
<form @submit="formSubmit" id="2" @reset="formReset">  
   <view class="sendmessage">
    <view class="upimage">
      <block v-for="(upimg, index) in img_arr" :key="index">      
         <image :data-id="index" @tap="cancel_upimg" :src="upimg"></image>       
      </block>
      <text v-if="goods_owner==username" style="margin-left:5px;color:blue">回复:{{from_uid}}{{to_nickname}}[{{replyfor}}]</text>
    </view>
    <view class="text">   
    <image @tap="upimg" src="../../static/images/jia.png"></image>        
    <input class="input" @input="bindChange" :value="content"></input>
     <button type="primary" size="default" hover-class="button-hover" class="button" @tap="sendMessageBtnTap">发送</button>
    </view>
  </view>
</form>
</view>
</template>

<script>
//index.js
//获取应用实例
var util = require("utils/util.js");
var wxparse = require("wxParse/wxParse.js");
var weburl = getApp().globalData.weburl;
var wssurl = getApp().globalData.wssurl;
var uploadurl = getApp().globalData.uploadurl;
var socketOpen = false;
var socketMsgQueue = [];
var sendMsgQueue = [];
var message = "";
var text = '';
var goods_owner = '';

export default {
  data() {
    return {
      userInfo: {},
      username: '',
      socktBtnTitle: '连接socket',
      logintBtnTitle: '其他账号',
      windowWidth: 100,
      windowHeight: 200,
      message: '',
      text: text,
      content: '',
      goods_id: 0,
      goods_org: 1,
      goods_owner: '',
      goods_image: '',
      goods_name: '',
      img_arr: [],
      upimg_url: [],
      formdata: '',
      hidechatbox: false,
      hiderevbox: true,
      rcvid: 0,
      rcvinfo: [],
      goods_ownershort: '',
      feedback_id: 0,
      to_uid: '',
      to_nickname: '',
      replyfor: '',
      send_ret: 'ok',
      textclass: 'mytext',
      from_uid: "",
      dkheight: "",
      scrollTop: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    console.log('onLoad');
    console.log(options);
    var that = this;
    goods_owner = options.goods_owner;
    var username = wx.getStorageSync('username');
    that.setData({
      goods_id: options.goods_id,
      goods_org: options.goods_org,
      goods_owner: options.goods_owner,
      goods_ownershort: options.goods_owner ? options.goods_owner.substring(0, 3) + '****' + options.goods_owner.substring(7, 4) : '',
      goods_image: options.goods_image,
      goods_name: options.goods_name,
      username: username
    }); //调用应用实例的方法获取全局数据

    getApp().globalData.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
    wx.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight;
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          dkheight: winHeight - 200,
          scrollTop: that.scrollTop + 10
        });
      }
    });
    that.initSocketMessage();
    setInterval(function () {
      that.initSocketMessage();
    }, 20000);
    setInterval(function () {//that.reSend()
    }, 5000);
  },
  methods: {
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

      for (var i = 0; i < this.img_arr.length; i++) {
        wx.uploadFile({
          url: uploadurl,
          filePath: that.img_arr[i],
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
            console.log(res.data);
            var retinfo = JSON.parse(res.data.trim());
            var img_url = [];
            img_url.push(retinfo['result']['img_url']);

            if (retinfo['status'] == "y") {
              that.setData({
                upimg_url: img_url
              });
              wx.showToast({
                title: '已提交！',
                duration: 2000
              });
              var content = that.content;

              if (!content) {
                that.setData({
                  content: '图片:'
                });
              }

              that.sendSocketMessage();
            }
          }
        });
      }
    },
    upimg: function () {
      var that = this;

      if (this.img_arr.length < 3) {
        wx.chooseImage({
          sizeType: ['original', 'compressed'],
          success: function (res) {
            that.setData({
              img_arr: that.img_arr.concat(res.tempFilePaths)
            });
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
      var j = 0;

      for (var i = 0; i < that.img_arr.length; i++) {
        if (i != id) {
          img_tmp[j++] = that.img_arr[i];
        }
      }

      that.setData({
        img_arr: img_tmp
      });
    },
    socketBtnTap: function () {
      this.initSocketMessage();
    },
    //事件处理函数
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      });
    },
    loginBtnTap: function () {
      //登录
      wx.navigateTo({
        url: '../login/login?wechat=1'
      });
    },
    feedbackTap: function (e) {
      var that = this;
      var feedback_id = e.currentTarget.dataset.index;
      var to_uid = that.rcvinfo[feedback_id]['from_uid'];
      var to_nickname = that.rcvinfo[feedback_id]['nickname'];
      var replyfor = that.rcvinfo[feedback_id]['message'] ? that.rcvinfo[feedback_id]['message'].substring(0, 10) + '...' : '';
      that.setData({
        feedback_id: feedback_id,
        to_uid: to_uid,
        to_nickname: to_nickname,
        replyfor: replyfor
      });
    },
    reSend: function () {
      //失败后重新发送
      var that = this; //失败重发

      var reSendMsgQueue = sendMsgQueue;

      for (var i = 0; i < reSendMsgQueue.length; i++) {
        wx.sendSocketMessage({
          data: reSendMsgQueue[i],
          success: function (res) {
            console.log("sendSocketMessage 重发完成");
            console.log(rcvnew);
            sendMsgQueue.splice(i, 1);
          },
          fail: function (res) {
            console.log("sendSocketMessage 重发失败");
            wx.showToast({
              title: '网络故障',
              icon: 'loading',
              duration: 2000
            });
          }
        });
      }
    },
    initSocketMessage: function () {
      var that = this;
      var remindTitle = socketOpen ? '正在关闭' : '正在连接';
      /*
      wx.showToast({
        title: remindTitle,
        icon: 'loading',
        duration: 10000
      })
      */

      if (!socketOpen) {
        wx.connectSocket({
          url: wssurl + '/wss'
        });
        wx.onSocketError(function (res) {
          socketOpen = false;
          console.log('WebSocket连接打开失败，请检查！');
          that.setData({
            socktBtnTitle: '连接socket'
          });
          wx.hideToast();
        });
        wx.onSocketOpen(function (res) {
          console.log('WebSocket连接已打开', wssurl + '/wss');
          wx.hideToast();
          that.setData({
            socktBtnTitle: '断开socket'
          });
          socketOpen = true;
          var username = wx.getStorageSync('username');

          if (!username) {
            //登录
            wx.navigateTo({
              url: '../login/login?wechat=1'
            });
          }

          that.setData({
            username: username
          });
          wx.sendSocketMessage({
            data: username
          });

          for (var i = 0; i < socketMsgQueue.length; i++) {
            that.setData({
              content: socketMsgQueue[i]
            });
            that.sendSocketMessage();
          }

          socketMsgQueue = [];
        });
        wx.onSocketMessage(function (res) {
          console.log('收到服务器内容：' + res.data);
          var username = that.username;
          var retinfo = JSON.parse(res.data.trim(), true);
          var to_uid = retinfo['to_uid'];
          var from_uid = retinfo['from_uid'];
          var rcvtext = retinfo['message'];
          var rcvpic1 = retinfo['question_pic1'];
          var rcvpic2 = retinfo['question_pic2'];
          var rcvpic3 = retinfo['question_pic3'];
          var rcvtime = retinfo['addtime'];
          var nickname = retinfo['nickname'];
          var rcvnew = that.rcvinfo;
          var rcvid = that.rcvid;

          if (from_uid == username) {
            if (retinfo['ret'] == 'fail') {
              wx.showToast({
                title: '对方不在线',
                icon: 'loading',
                duration: 2000
              });
            }

            that.setData({
              //text: text,
              from_uid: from_uid
            });
            return;
          } //var json_str = '{"from_uid":"' + from_uid + '","nickname":"' + nickname + '","message":"' + rcvtext + '","pic1":"' + rcvpic1 + '","pic2":"' + rcvpic2 + '","pic3":"' + rcvpic3 + '","reply":"","replytime":"","rpypic1":"","rpypic2":"","rpypic3":"","addtime":"'+rcvtime+'"'+'}' ;
          //rcvnew.push(JSON.parse(json_str));


          var newarray = [{
            from_uid: from_uid,
            nickname: nickname,
            message: rcvtext,
            addtime: rcvtime,
            pic1: rcvpic1,
            pic2: rcvpic2,
            pic3: rcvpic3,
            reply: '',
            replytime: '',
            rpypic1: '',
            rpypic2: '',
            rpypic3: '',
            textclass: 'gettext'
          }]; //向前合拼

          rcvnew = newarray.concat(rcvnew); //向后合拼
          //rcvnew = rcvnew.concat(newarray);
          // text = '<div style="color:red;margin-left:5px;">[' + retinfo['from_uid'] + '] ' + retinfo['message'] + '   ['+retinfo['addtime']+ ']<div style="width:100%;margin:0 auto; overflow:hidden;" ><div style="float:left;width:20px;height:20px;margin:5px;" ><img src="' + retinfo['question_pic1'] + '" style=""> </img></div><div style="float:left;width:20px;height:20px;margin:5px;" ><img src="' + retinfo['question_pic2'] + '" style=""></img></div><div style="float:left;width:20px;height:20px;margin:5px;" ><img src="' + retinfo['question_pic3'] +'" style=""></img></div></div></div></div>' + text;

          that.setData({
            //text: text,
            rcvinfo: rcvnew
          }); //that.showChatinfo(); 
        });
        wx.onSocketClose(function (res) {
          socketOpen = false;
          console.log('WebSocket 已关闭！');
          wx.hideToast();
          that.setData({
            socktBtnTitle: '连接socket'
          });
        });
      } else {//wx.closeSocket()
      }
    },
    sendSocketMessage: function () {
      var that = this;
      var user = wx.getStorageSync('username');
      var nickname = that.userInfo.nickName;
      var myDate = util.formatTime(new Date());
      var goods_id = that.goods_id;
      var shop_id = '';
      var m_id = '';
      var goods_owner = that.goods_owner;
      var question_img1 = that.upimg_url[0];
      var question_img2 = that.upimg_url[1];
      var question_img3 = that.upimg_url[2];
      var content = that.content; //var upimg_url = that.data.upimg_url;

      var username = user + '@' + nickname + '$';
      var to_uid = that.to_uid;
      var feedback_id = that.feedback_id;
      var rcvnew = that.rcvinfo;

      if (goods_owner == user) {
        message = '{"addtime":"' + myDate + '","username":"' + username + '","goods_id":"' + goods_id + '","shop_id":"' + shop_id + '","m_id":"' + m_id + '","nickname":"' + nickname + '","to_uid":"' + to_uid + '","from_uid":"' + user + '","message":"' + content + '","question_type":"' + '1' + '","question_pic1":"' + question_img1 + '","question_pic2":"' + question_img2 + '","question_pic3":"' + question_img3 + '"}';
        rcvnew[feedback_id]['reply'] = content;
        rcvnew[feedback_id]['rpypic1'] = question_img1;
        rcvnew[feedback_id]['rpypic2'] = question_img2;
        rcvnew[feedback_id]['rpypic3'] = question_img3;
        rcvnew[feedback_id]['replytime'] = myDate;
      } else {
        message = '{"addtime":"' + myDate + '","username":"' + username + '","goods_id":"' + goods_id + '","shop_id":"' + shop_id + '","m_id":"' + m_id + '","nickname":"' + nickname + '","to_uid":"' + goods_owner + '","from_uid":"' + user + '","message":"' + content + '","question_type":"' + '1' + '","question_pic1":"' + question_img1 + '","question_pic2":"' + question_img2 + '","question_pic3":"' + question_img3 + '"}';
      }

      if (!socketOpen) {
        socketMsgQueue.push(content);
        this.initSocketMessage();
      } else {
        wx.sendSocketMessage({
          data: message,
          success: function (res) {
            console.log("sendSocketMessage 完成");
            console.log(rcvnew); // text = '<div style="text-align:right;color:blue;margin-right:10px;">[我] ' + content + '<div style="float:right;width:30px;height:30px;margin:5px;" ><img src="' + question_img1 + '" style=""> </img><img src="' + question_img2 + '" style=""></img><img src="' + question_img3 + '" style=""> </img></div></div>' + text;
            //rcvnew.push(JSON.parse(json_str));

            var newarray = [{
              to_uid: to_uid,
              from_uid: user,
              nickname: nickname,
              message: content,
              addtime: myDate,
              pic1: question_img1,
              pic2: question_img2,
              pic3: question_img3,
              reply: '',
              replytime: '',
              rpypic1: '',
              rpypic2: '',
              rpypic3: '',
              textclass: 'mytext'
            }]; //向前合拼

            rcvnew = newarray.concat(rcvnew);
            that.setData({
              rcvinfo: rcvnew,
              content: '',
              upimg_url: [],
              img_arr: []
            }); //that.showChatinfo()     
          },
          fail: function (res) {
            console.log("sendSocketMessage 通讯失败");
            wx.showToast({
              title: '网络故障',
              icon: 'loading',
              duration: 2000
            });
          }
        });
      }
    },
    sendMessageBtnTap: function () {
      var that = this;
      var content = that.content;
      var upimage = that.img_arr;
      var to_uid = that.to_uid;
      var username = that.username; //var goods_owner = that.data.goods_owner;

      if (username == goods_owner && !to_uid) {
        wx.showToast({
          title: '没有回复对象',
          icon: 'loading',
          duration: 2000
        });
        return;
      }

      if (upimage.length > 0) {
        that.upload();
      } else if (content) {
        that.sendSocketMessage();
      }
    },
    bindChange: function (e) {
      var that = this;
      var content = e.detail.value;
      that.setData({
        content: content
      });
    },
    showChatinfo: function () {
      // 获得高度  
      let winPage = this;
      wx.getSystemInfo({
        success: function (res) {
          let winHeight = res.windowHeight;
          console.log(winHeight);
          winPage.setData({
            dkheight: winHeight - 50,
            scrollTop: winPage.data.scrollTop + 10
          });
        }
      }); //wxparse.wxParse('dkcontent', 'html', winPage.data.text, winPage, 1);
    },
    upper: function (e) {
      console.log(e);
    },
    lower: function (e) {
      console.log(e);
    },
    scroll: function (e) {
      console.log(e);
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
@import "./wechat.css";
</style>