<template>
<view>
	<view class="container">
		<view class="balance">
			<view class="balance-title">
				<text class="balance-title-bal">账户余额(元)</text>
			</view>
			<view class="balance-content"> 
				<text class="snum">{{balance?'￥'+balance:''}}</text>
			</view>   
		</view> 
		<view v-for="(blist, index) in balance_detail" :key="index" class="bal-item">
			<view>
				<text class="bal-title">{{blist.addtime}}</text>   
			</view>
			<view>
				<text class="bal-content-text">{{blist.note}}</text>
			</view>
			<view>
				<text class="bal-content-text" :style="((blist.type==1 && blist.amount>0) ?'':' color:red')">{{(blist.type==1 && blist.amount>0) ?'':' -'}}{{blist.amount?'￥'+blist.amount:''}}</text>
			</view>	
		</view>
		<view style="display:flex;flex-direction: row;justify-content: center;">
			<view v-if="page_num>1" hover-class="none" class="morebtn" @tap="getMoreAccountTapTag">展开更多 ({{page}}/{{page_num}})</view>
		</view>
	</view>
	<uni-popup :show="hiddenmodalput" type="center" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">可提现金额 ￥{{balance?balance:0}}</view>
			<view class="uni-tip-content">
				<view class="formfill">
				  <text>￥</text>
				  <input @input="bindChangeNum" :value="withdrawNum" type="digit" placeholder="请输入金额"></input> 
				</view>
				<view class="select-and-amount-mark">
						    提现到: <icon :type="(withdraw_selected==1 ? 'success_circle' : 'circle')" size="18" color="#333" data-withdraw-type="1" @tap="withdrawSelect"></icon>
						    <text>微信钱包</text>
				      <!--  
				      <icon type="{{withdraw_selected==2 ? 'success_circle' : 'circle'}}" size="18" color='#333' style='margin-left:30rpx;' data-withdraw-type="2" bindtap="withdrawSelect" />
						    <text style="margin-left:10rpx;">银行卡</text>
				      -->
					</view>
				<view class="tips">
				<text class="strong">提现说明：</text>
				<text>到账微信钱包时间为1-2个工作日，如遇节假日顺延，敬请理解。</text>
				</view>
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @tap="cancel_withdraw">取消</view>
				<view class="uni-tip-button" @tap="confirm_withdraw">确定</view>
			</view>
		</view>
	</uni-popup>
	<view class="footer">
		<view class="opt-buttons" @tap="modalinput_withdraw">
			<button class="withdraw">申请提现</button>
		</view>
	</view>
</view>
</template>

<script>
var util = require("../../../utils/util.js");
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
import uniPopup from '@/components/uni-popup/uni-popup.vue' ;

export default {
  data() {
    return {
      shop_type: shop_type,
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
      userInfo: userInfo,
      hiddenmodalput: false,
      withdrawNum: null,
      withdrawWx: null,
      withdraw_selected: 1,
      balance_detail: [],
      bank_name: "",
      bank_id: "",
      bankcard_no: "",
      bankcard_name: "",
      balance: ""
    };
  },

  components: {
	  uniPopup,
  },
  props: {},
  onLoad: function (options) {
    var that = this;
    that.get_member_account_bal();
    that.get_member_account_detail();
  },
  onPullDownRefresh: function () {
    //下拉刷新
    wx.stopPullDownRefresh();
  },
  methods: {
    //点击按钮指定的hiddenmodalput弹出框  
    modalinput_withdraw: function () {
      var that = this;
	  that.hiddenmodalput = !that.hiddenmodalput
    },
    //取消按钮  
    cancel_withdraw: function () {
		var that = this;
		that.hiddenmodalput = !that.hiddenmodalput ;
      
    },
    //确认  
    confirm_withdraw: function () {
      var that = this;
      var withdrawNum = that.withdrawNum ? that.withdrawNum : 0;
      var withdrawWx = that.withdrawWx ? that.withdrawWx : '';
      var withdraw_selected = that.withdraw_selected ? that.withdraw_selected : 1;
      var balance = that.balance;
      console.log('withdrawNum:' + that.withdrawNum, 'balance:' + balance);

      if (withdrawNum - balance > 0) {
        wx.showToast({
          title: '大于可提现余额' + balance,
          withdrawNum,
          icon: 'none',
          duration: 1500
        });
      } else if (withdrawNum == 0) {
        wx.showToast({
          title: '提现金额不能为空',
          icon: 'none',
          duration: 1500
        });
      } else {
		that.hiddenmodalput = !that.hiddenmodalput ;
        that.withdraw_member_account();
      }
    },
    bindChangeNum: function (e) {
      var that = this;
      var withdrawNum = e.detail.value;
	  that.withdrawNum = withdrawNum
     
      console.log('withdrawNum:' + that.withdrawNum);
    },
    bindChangeWx: function (e) {
      var that = this;
      var withdrawWx = e.detail.value;
      that.setData({
        withdrawWx: withdrawWx
      });
      console.log('withdrawWx:' + that.withdrawWx);
    },
    withdrawSelect: function (e) {
      var that = this;
      var withdraw_selected = e.currentTarget.dataset.withdrawType;
      that.setData({
        withdraw_selected: withdraw_selected
      });
      console.log('withdraw_selected:' + that.withdraw_selected);
    },
    //账户提现申请
    withdraw_member_account: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      var withdrawNum = that.withdrawNum ? parseFloat(that.withdrawNum) : 0;
      var withdrawWx = that.withdrawWx ? withdrawWx : '';
      var withdraw_selected = that.withdraw_selected;
      var balance = that.balance;
      console.log('账户提现申请 withdrawNum:' + withdrawNum, ' balance:', balance);

      if (withdrawNum > 0 && withdrawNum <= balance && withdraw_selected == 2) {
        //银行卡提现
        //获取我的银行列表
        wx.request({
          url: weburl + '/api/client/get_member_bankcardinfo',
          method: 'POST',
          data: {
            username: username,
            access_token: token,
            shop_type: shop_type
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            if (res.data.status == 'y') {
              var mbank_info = res.data.result;
              that.setData({
                bank_name: mbank_info[0]['bank_name'],
                bank_id: mbank_info[0]['bank_id'],
                bankcard_no: mbank_info[0]['bank_cardno'],
                bankcard_name: mbank_info[0]['bank_cardname']
              });
              console.log('获取我的银行卡完成 bank id:', that.bank_id, ' bankcard_no:', that.bankcard_no);
              wx.request({
                url: weburl + '/api/client/withdraw_member_account',
                method: 'POST',
                data: {
                  username: username,
                  access_token: token,
                  shop_type: shop_type,
                  withdraw_type: 2,
                  amount: withdrawNum * 100,
                  bank_id: that.bank_id,
                  bank_cardno: that.bankcard_no,
                  bank_cardname: that.bankcard_name
                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
                },
                success: function (res) {
                  if (res.data.status == 'y') {
                    wx.showToast({
                      title: '提现申请完成',
                      icon: 'loading',
                      duration: 1000
                    });
                    console.log('提现申请完成', withdrawNum);
                    that.setData({
                      balance_detail: [],
                      page: 1
                    });
                    that.get_member_account_bal();
                    that.get_member_account_detail();
                  } else {
                    wx.showToast({
                      title: res.data.info + '[失败]',
                      icon: 'none',
                      duration: 1500
                    });
                  }
                }
              });
            }
          }
        });
      } else if (withdrawNum > 0 && withdrawNum <= balance && withdraw_selected == 1) {
        //微信提现
        wx.request({
          url: weburl + '/api/client/withdraw_member_account',
          method: 'POST',
          data: {
            username: username,
            access_token: token,
            shop_type: shop_type,
            withdraw_type: 1,
            amount: withdrawNum * 100,
            wxname: withdrawWx
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            if (res.data.status == 'y') {
              wx.showToast({
                title: '提现申请完成',
                icon: 'loading',
                duration: 1000
              });
              console.log('提现申请完成', withdrawNum);
              that.setData({
                balance_detail: [],
                page: 1
              });
              that.get_member_account_bal();
              that.get_member_account_detail();
            } else {
              wx.showToast({
                title: res.data.info + '[失败]',
                icon: 'none',
                duration: 1500
              });
            }
          }
        });
      } else {
        wx.showToast({
          title: '提现金额有误',
          icon: 'loading',
          duration: 1500
        });
      }
    },
    //获取账户余额
    get_member_account_bal: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      wx.request({
        url: weburl + '/api/client/get_member_account_bal',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var balance_info = res.data.result;

          if (balance_info) {
            var balance = 0;
            balance = balance_info['balance'] / 100;
            var withdrawWx = balance_info['wx_name'];
            that.setData({
              balance: balance.toFixed(2),
              withdrawWx: withdrawWx //微信号

            });
            console.log('获取账户余额:', balance, ' 微信号:', withdrawWx);
          } else {
            wx.showToast({
              title: '暂无账户信息',
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    },
    //获取账户明细
    get_member_account_detail: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var shop_type = that.shop_type;
      var all_rows = that.all_rows;
      var page = that.page;
      var pagesize = that.pagesize;
      var balance_detail = that.balance_detail;
      wx.request({
        url: weburl + '/api/client/get_member_account_detail',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          page: page,
          pagesize: pagesize
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var balance_detail_info = res.data.result;
          var all_rows = res.data.all_rows ? res.data.all_rows : 1;

          if (balance_detail_info) {
            var page_num = that.page_num;
            page_num = all_rows / pagesize + 0.5;

            for (var i = 0; i < balance_detail_info.length; i++) {
              balance_detail_info[i]['addtime'] = util.formatTime(new Date(balance_detail_info[i]['addtime'] * 1000));
              balance_detail_info[i]['amount'] = (balance_detail_info[i]['amount'] / 100).toFixed(2);
            }

            that.setData({
              balance_detail: page == 1 ? balance_detail_info : balance_detail.concat(balance_detail_info),
              all_rows: all_rows,
              page_num: page_num.toFixed(0)
            });
            console.log('获取账户明细:', balance_detail_info, that.page_num);
          } else {
            wx.showToast({
              title: '暂无账户明细',
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    },
    getMoreAccountTapTag: function (e) {
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
      that.get_member_account_detail();
    },
    goBack: function () {
      var pages = getCurrentPages();

      if (pages.length > 1) {
        wx.navigateBack({
          changed: true
        }); //返回上一页
      } else {
        wx.switchTab({
          url: '../../my/index'
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
@import "./account.css";
</style>