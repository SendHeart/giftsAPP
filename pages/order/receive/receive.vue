<template>
<view>
<view v-if="is_buymyself==0 && order_shape!=5 && order_shape!=4" class="subject" style>
  <text class="toptitle" v-if="receive_status==0">{{order_shape==5?'恭喜，您收到一份惊喜':'恭喜，您收到一份礼物'}}</text>
  <text class="toptitle" v-if="receive_status==1" style="color:#999;">礼物已领取</text>
  <text v-if="receive_status==0">{{(order_shape==5||order_shape==4)?'点击确定':'点击拆开，收取礼物'}}</text>
  <text v-if="receive_status==1">{{(order_shape==5||order_shape==4)?'点击回赠，也给Ta送一个惊喜吧':'点击回赠，也给Ta送一个礼物吧'}}</text>
</view>
<view class="share-goods">
    <view class="share-buttons" :style="((order_shape==5)?'':'')">
       <view v-if="order_shape==4||order_shape==5" class="btnshare" data-type="1" @tap="returnTapTag">
        <image class="shareto" src="/static/images/icon_shopping.png"></image>
        商城
      </view>
      <view v-if="order_shape==5" class="btnshare" data-type="2" :data-order-id="order_id" @tap="animateTapTag">
        <image class="shareto" src="/static/images/play.png"></image>
        播放
      </view>
      <view v-if="order_shape==4 && (is_showable==1)" class="btnshare" data-type="2" :data-order-id="order_id" @tap="returnTapTag">
        <image class="shareto" src="/static/images/icon_normal.png"></image>
        详情
      </view>
      <view v-if="order_shape==4" class="btnshare" data-type="3" :data-order-id="order_id" @tap="shareorderTapTag">
        <image class="shareto" src="/static/images/shareto.png"></image>
        分享
      </view>
    </view>
</view>
 <view v-if="is_buymyself==0 && (order_shape==5||order_shape==4)" class="card-info">
  <image :src="order_image" class="card-image" :style="(card_type>0?' margin-top:'+card_view_offset+'rpx;height:'+card_image_height+'rpx;':'') + '' + (card_image_width>0?' width:'+card_image_width+'rpx;':'')"></image>
  <!-- 
  <text wx:if="{{order_shape==5}}" class="card-text" space="ensp">{{note}}</text>
  <view wx:if="{{order_shape==5}}" class="card-wx-info">
    <image src="{{headimg}}" style="width:100rpx;height:100rpx; border-radius:50%;item-align:right;" ></image>
    <view style="margin-left:20rpx;line-height:100rpx;height:100rpx;">{{nickname}}</view>
  </view>
  -->
  <view v-if="order_shape==4 && card_type==1" class="card-register-info">
    <block v-for="(template, index) in card_template" :key="index">
      <text :hidden="(template.typeId=='card_register_title'?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['card_register_title']?card_register_info['card_register_title']:template.typeText}}
      </text>
      <text :hidden="(template.typeId=='card_register_content'?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['card_register_content']?card_register_info['card_register_content']:template.typeText}}
      </text>
      <text :hidden="(template.typeId=='card_register_addr'?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['card_register_addr']?'地址:'+card_register_info['card_register_addr']:template.typeText}}
      </text>
      <text :hidden="((template.typeId=='register_start_date' && card_register_info['has_registerdue'])?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['register_start_date']?'注册:'+card_register_info['register_start_date']:template.typeText}}
      </text>
      <text :hidden="((template.typeId=='register_start_time' && card_register_info['has_registerdue'])?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['register_start_time']?card_register_info['register_start_time']:template.typeText}}
      </text> 
      <text :hidden="((template.typeId=='register_end_date' && card_register_info['has_registerdue'])?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['register_end_date']?card_register_info['register_end_date']:template.typeText}}
      </text> 
      <text :hidden="((template.typeId=='register_end_time' && card_register_info['has_registerdue'])?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['register_end_time']?card_register_info['register_end_time']:template.typeText}}
      </text>  
      <text :hidden="((template.typeId=='action_start_date' && card_register_info['has_actiondue'])?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['action_start_date']?'活动:'+card_register_info['action_start_date']:template.typeText}}
      </text>  
      <text :hidden="((template.typeId=='action_start_time' && card_register_info['has_actiondue'])?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['action_start_time']?card_register_info['action_start_time']:template.typeText}}
      </text>  
      <text :hidden="((template.typeId=='action_end_date' && card_register_info['has_actiondue'])?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['action_end_date']?card_register_info['action_end_date']:template.typeText}}
      </text> 
      <text :hidden="((template.typeId=='action_end_time' && card_register_info['has_actiondue'])?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['action_end_time']?card_register_info['action_end_time']:template.typeText}}
      </text>  
      <text :hidden="((template.typeId=='card_register_lim')?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['card_register_lim']==0?'人数:不限':'人数:'+card_register_info['card_register_lim']}}
      </text>  
      <text :hidden="((template.typeId=='card_register_fee')?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['card_register_fee']>0?'费用:￥'+card_register_info['card_register_fee']:'费用:免费'}}
      </text>  
      <text :hidden="((template.typeId=='card_register_ownername')?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['card_register_ownername']?'发起人:'+card_register_info['card_register_ownername']:''}}
      </text>   
      <text :hidden="((template.typeId=='card_register_ownerwechat')?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_info['card_register_ownerwechat']?'微信:'+card_register_info['card_register_ownerwechat']:''}}
      </text>  
      <view :hidden="(template.typeId=='card_register_adv'?false:true)">
        <image :style="'border-radius:20rpx;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'')" :src="card_register_info['card_register_adv']" :data-src="card_register_info['card_register_adv']" @tap="imgYu" mode="aspectFit"></image>
      </view>
    </block>
  </view>
  <view v-if="order_shape==4 && card_type==2" class="card-name-info">
    <block v-for="(template, index) in card_template" :key="index">
      <text :hidden="(template.typeId=='card_name'?fale:true)" @tap="textPaste" :style="'text-align:right;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_info['card_name_name']}}
      </text>
      <text :hidden="(template.typeId=='card_title'?fale:true)" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_info['card_name_title']}}
      </text>
      <text :hidden="(template.typeId=='card_phone'?fale:true)" @tap="callphone" :data-phone="card_name_info['card_name_phone']" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_info['card_name_phone']}}
      </text>
      <text :hidden="(template.typeId=='card_tel'?fale:true)" @tap="callphone" :data-phone="card_name_info['card_name_tel']" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_info['card_name_tel']}}
      </text> 
      <text :hidden="(template.typeId=='card_email'?fale:true)" @tap="textPaste" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_info['card_name_email']}}
      </text> 
      <text :hidden="(template.typeId=='card_weburl'?fale:true)" @tap="textPaste" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_info['card_name_website']}}
      </text> 
      <text :hidden="(template.typeId=='card_companyname'?fale:true)" @tap="textPaste" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'')">{{card_name_info['card_name_company']}}
      </text>  
      <text :hidden="(template.typeId=='card_addr'?fale:true)" @tap="textPaste" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_info['card_name_addr']}}
      </text>
      <view :hidden="(template.typeId=='card_logo'?false:true)">
        <image :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'')" :src="card_name_info['card_name_logo_image']" :data-src="card_name_info['card_name_logo_image']" @tap="imgYu" mode="aspectFit"></image>
      </view>
      <view :hidden="(template.typeId=='card_qrcode'?false:true)" style>
        <image :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + ' border-radius:50%;'" :src="share_goods_qrcode"></image>
      </view>
    </block>
    <text class="card-name-note">
     {{card_name_info['card_name_note']}}
    </text>
  </view>
    <view v-if="order_shape==4 && card_type==4" class="card-love-info">
    <block v-for="(template, index) in card_template" :key="index">
      <text :hidden="(template.typeId=='card_love_title'?fale:true)" @tap="textPaste" :style="'text-align:right;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_info['card_love_title']}}
      </text>
      <text :hidden="(template.typeId=='card_love_related'?fale:true)" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_info['card_love_related']}}
      </text>
      <text :hidden="(template.typeId=='card_love_phone'?fale:true)" @tap="callphone" :data-phone="card_love_info['card_love_phone']" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_info['card_love_phone']?'电话:'+card_love_info['card_love_phone']:''}}
      </text>
      <text :hidden="(template.typeId=='card_love_addr'?fale:true)" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_info['card_love_addr']}}
      </text> 
      <text :hidden="(template.typeId=='card_love_content'?fale:true)" @tap="textPaste" :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_info['card_love_content']}}
      </text>   
      <view :hidden="(template.typeId=='card_love_logo'?false:true)">
        <image :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'')" :src="card_love_info['card_love_logo']" :data-src="card_love_info['card_love_logo']" @tap="imgYu" mode="aspectFit"></image>
      </view>
      <view :hidden="(template.typeId=='card_love_qrcode'?false:true)" style>
        <image :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + ' border-radius:50%;'" :src="share_goods_qrcode"></image>
      </view>
    </block>
  </view>
  <view v-if="order_shape==5 || card_type==10" class="card-cele-info">
    <block v-for="(template, index) in card_template" :key="index">
      <text :hidden="(template.typeId=='card_cele_title'?fale:true)" @tap="textPaste" :style="'text-align:right;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_cele_info['card_cele_title']}}
      </text>
      <text :hidden="(template.typeId=='card_cele_content'?fale:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_cele_info['card_cele_content']?card_cele_info['card_cele_content']:template.typeText}}
      </text>
      <view :hidden="(template.typeId=='card_cele_logo'?false:true)">
        <image :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'')" :src="card_cele_info['card_cele_logo']"></image>
      </view>
      <view :hidden="(template.typeId=='card_cele_qrcode'?false:true)" style>
        <image :style="(template.y?' top:'+(template.y*card_image_height+card_view_offset)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + ' border-radius:50%;'" :src="share_goods_qrcode"></image>
      </view>
    </block>
  </view>
  <view v-if="(order_shape==5||order_shape==4)" class="share-play-rec" style="}}" @tap="play_rec">
    <image src="/static/images/notification.png" style="width:80rpx;height:80rpx;"></image>
  </view>
</view>
<view v-if="is_buymyself==0 && order_shape!=5 && order_shape!=4" class="order-item">
  <view class="order-item-banner">
    <view>
      <image src="/static/images/gift.gif" style="width:378rpx;height:202rpx;" mode="aspectFill"></image>
    </view>
    <view class="userinfo">
      <image class="userinfo-avatar" :src="headimg" background-size="cover"></image>
      <text class="userinfo-nickname">{{nickname?nickname:''}}</text>
    </view>
    <view class="order_note">
      <!--<text>{{note_title}}</text> -->
      <text space="ensp">{{note}}</text>
    </view>
    <view v-for="(item, index) in orderskus" :key="index" class="gifts-item">
      <view @tap="showGoods" :data-sku-id="item.sku_id" :data-goods-id="item.goods_id" :data-goods-name="item.goods_name">
        <image class="gifts-image" :src="item.sku_image" mode="aspectFill"> </image>
      </view>
      <text class="carts-title">{{item.goods_name}} x{{item.sku_num}}</text>
    </view>
  </view>
</view>
<view v-if="receive_status<=1" class="sentbtn" style="z-index:2;">
  <form @submit="formSubmit" data-name="receivegift" report-submit="true" :hidden="((receive_status==1 || overtime_status==1)?true:false)">
    <button class="button" style="width:200rpx;" formType="submit">{{button_name?button_name:'拆开'}}</button> <!-- bindtap="receiveTapTag" -->
  </form>
  <form @submit="formSubmit" data-name="refresh" report-submit="true" :hidden="(overtime_status==0?true:false)">  
    <button formType="submit" style="width:200rpx;">请刷新重试</button> <!-- bindtap="refresh"  data-isreload="1" -->
  </form>
  <view style="width:100%; display: flex;flex-direction: column;text-align:center;" :hidden="receive_status==0">
    <text :hidden="((receive_status==1 || overtime_status==0)?true:false)" style="margin-top:10rpx;">填写收货地址，礼物会很快奔向您</text>
    <view v-if="order_shape!=4 && order_shape!=5" data-type="1" @tap="returnTapTag" style="margin-top:10rpx;">
      <text :hidden="((receive_status==1 || overtime_status==1)?true:false)" style="color:#E34C55;font-size:28rpx;">暂不接受，看看其他内容</text>
    </view>
  </view>
  <button :hidden="((receive_status==0 || overtime_status==1)?true:false)" class="button" formType="submit" style="width:200rpx;" data-type="1" @tap="returnTapTag">{{(order_shape==4)?'返回':'回赠'}}</button> 
   <!-- 
  <form bindsubmit="formSubmit"  data-name='resendgift' report-submit="true" >  
   
  </form>
  -->
  <view style="width:100%; display:flex;flex-direction:column;text-align:center;margin-top:15rpx;" v-if="receive_status==1 && overtime_status==0 && card_type!=4 && card_type!=5">
    <text>礼尚往来，回赠一份礼物让你们的联系更进一步</text>
  </view>
</view>
<view>
<modal class="modalbox" :title="needCardRegisterName" :hidden="cardregisterHidden" confirm-text="确定" @confirm="confirmCardRegisterInfo" cancel-text="返回" @cancel="cancelCardRegisterInfo">
  <view style="height:250rpx;">
    <view class="card-register-input">
      <input style="width:65%;" :value="card_register_nameFun" placeholder-style="text-align:center;" placeholder="请输入姓名" @input="card_register_nameFun" :focus="inputShowed" type="text" maxlength="50"></input>   
      <input style="width:35%;" :value="card_register_phoneFun" placeholder-style="text-align:center;" placeholder="请输入手机号" @input="card_register_phoneFun" :focus="inputShowed" type="number" maxlength="20"></input>   
    </view>
    <view v-if="card_register_reqid_index>0" class="card-register-input">
      <input style="width:280rpx;" :value="card_register_reqid_value" placeholder-style="text-align:center;" :placeholder="'请输入' + card_register_req[card_register_info['card_register_reqid_index']]" :type="(card_register_reqid_index==1?'idcard':'text')" @input="card_register_reqFun" :focus="inputShowed" maxlength="20"></input>   
    </view>
    <view class="card-register-input">
      <radio-group @change="radiochange">
        <radio value="1" style="margin-left:0rpx;">男</radio>
        <radio value="2" style="margin-left:50rpx;">女</radio>
      </radio-group>
    </view>
  </view>
  <view class="card-register-input">
    <textarea style="width:100%;" :value="card_register_noteFun" placeholder-style="text-align:center;" placeholder="您的留言" @input="card_register_noteFun" :focus="inputShowed" type="text" maxlength="80"></textarea>
  </view>
</modal>
<modal class="modalbox" :title="needCardnameHello" :hidden="cardnameHidden" confirm-text="确定" @confirm="confirmCardNameInfo" cancel-text="返回" @cancel="cancelCardNameInfo">
  <view class="card-register-input">
    <textarea style="width:100%;" :value="card_name_helloFun" placeholder-style="text-align:center;" placeholder="打个招呼" @input="card_name_helloFun" :focus="inputShowed" type="text" maxlength="80"></textarea>
  </view>
</modal>
<modal class="modalbox" title="回复" :hidden="cardceleHidden" confirm-text="确定" @confirm="confirmCardCeleInfo" cancel-text="返回" @cancel="cancelCardCeleInfo">
  <view class="card-register-input">
    <textarea style="width:100%;" :value="card_cele_replyFun" placeholder-style="text-align:center;" placeholder="说点什么(限80个字)" @input="card_cele_replyFun" :focus="inputShowed" type="text" maxlength="80"></textarea>
  </view>
</modal>
<modal class="modalbox" title="回复" :hidden="cardloveHidden" confirm-text="确定" @confirm="confirmCardLoveInfo" cancel-text="返回" @cancel="cancelCardLoveInfo">
  <view class="card-register-input">
    <textarea style="width:100%;" :value="card_love_replyFun" placeholder-style="text-align:center;" placeholder="留言(限80个字)" @input="card_love_replyFun" :focus="inputShowed" type="text" maxlength="80"></textarea>
  </view>
</modal>
</view>
</view>
</template>

<script>
var QQMapWX = require("utils/qqmap-wx-jssdk.min.js");
var qqmapsdk;
var qqmapkey = getApp().globalData.globalData.mapkey;
var weburl = getApp().globalData.globalData.weburl;
var util = require("utils/util.js");
var now = new Date().getTime();
var shop_type = getApp().globalData.globalData.shop_type;
const myaudio = wx.createInnerAudioContext();

export default {
  data() {
    return {
      qqmapkey: qqmapkey,
      prov: [],
      city: [],
      area: [],
      town: [],
      title_name: '收到礼物',
      title_logo: '/static/images/footer-icon-05.png',
      shop_type: shop_type,
      orders: [],
      orderskus: [],
      openid: null,
      userInfo: {},
      page: 1,
      pagesize: 10,
      status: 0,
      all_rows: 0,
      giftflag: 0,
      scrollTop: 0,
      scrollHeight: 0,
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 2000,
      note_title: 'Hi~:',
      note: '',
      headimg: '',
      nickname: '',
      receive_status: 9,
      overtime_status: 0,
      receive: 0,
      order_no: '',
      currenttime: now ? parseInt(now / 1000) : 0,
      is_buymyself: 0,
      messageHidden: true,
      cardregisterHidden: true,
      needCardRegisterName: '请提供相关信息',
      card_register_note: '',
      card_register_name: '',
      card_register_phone: '',
      card_register_gender: '',
      card_register_req: ['无需证件', '身份证号', '微信号', 'QQ号', '电子邮箱', '学号', '工号'],
      card_register_reqid_index: 0,
      card_register_reqid_value: '',
      is_showable: 0,
      //查看权限
      cardnameHidden: true,
      cardceleHidden: true,
      cardloveHidden: true,
      needCardnameHello: '打个招呼吧',
      card_view_offset: 100 //卡片Y位置 偏移量
      ,
      isreload: "",
      address: "",
      latitude: "",
      longitude: "",
      card_name_hello: "",
      card_love_reply: "",
      card_cele_reply: "",
      address_userName: "",
      address_postalCode: "",
      address_provinceName: "",
      address_cityName: "",
      address_countyName: "",
      address_detailInfo: "",
      address_nationalCode: "",
      address_telNumber: "",
      order_id: "",
      order_shape: "",
      username: "",
      goods_flag: "",
      dkheight: "",
      winHeight: "",
      winWidth: "",
      order_voice: "",
      voice_url: "",
      order_price: "",
      order_image: "",
      share_order_image: "",
      order_m_id: "",
      card_register_info: "",
      card_name_info: "",
      card_love_info: "",
      card_cele_info: "",
      card_template: "",
      card_image_height: "",
      card_image_width: "",
      card_type: "",
      button_name: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // 订单状态，已下单为1，已付为2，已发货为3，已收货为4 5已经评价 6退款 7部分退款 8用户取消订单 9作废订单 10退款中
    var that = this;
    var is_back = options.is_back ? options.is_back : 0;
    if (is_back == 1) options = wx.getStorageSync('receive_options');
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
    var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
    var ordno = options.ordno ? options.ordno : ''; //APP 送礼订单

    var order_no = options.order_no ? options.order_no : ordno;
    var order_id = options.order_id ? options.order_id : 0;
    var order_shape = options.order_shape ? options.order_shape : 0;
    var receive = options.receive ? options.receive : 0;
    var is_buymyself = options.is_buymyself ? options.is_buymyself : 0;
    var goods_flag = options.goods_flag ? options.goods_flag : 0;
    var orders = that.orders;
    var orderskus = that.orderskus;
    var note_title = that.note_title;
    var headimg = that.headimg;
    var nickname = that.nickname;
    var note = that.note;
    var shop_type = that.shop_type;
    var scene = decodeURIComponent(options.scene);
    console.log('order receive onLoad() options:', options);
    wx.setStorageSync('receive_options', options);

    if (scene.indexOf("ordno=") >= 0) {
      var ordnoReg = new RegExp(/(?=ordno=).*?(?=\&)/);
      var scene_ordno = scene.match(ordnoReg)[0];
      order_no = order_no ? order_no : scene_ordno;
    } else if (scene.indexOf("ordid=") >= 0) {
      var ordidReg = new RegExp(/(?=ordid=).*?(?=\&)/);
      var scene_ordid = scene.match(ordidReg)[0];
      var tyReg = new RegExp(/\&ty=(.*)/);
      var scene_order_shape = scene.match(tyReg)[0];
      order_id = order_id > 0 ? order_id : scene_ordid;
      order_shape = scene_order_shape;
    }

    getApp().globalData.is_receive = receive;
    getApp().globalData.order_no = order_no;
    getApp().globalData.order_id = order_id;
    getApp().globalData.goods_flag = goods_flag;
    that.setData({
      order_no: order_no,
      order_id: order_id,
      order_shape: order_shape,
      receive: getApp().globalData.is_receive,
      openid: openid,
      username: username,
      goods_flag: goods_flag,
      is_buymyself: is_buymyself
    });
    wx.getSystemInfo({
      success: function (res) {
        let winHeight = res.windowHeight;
        let winWidth = res.windowWidth;
        console.log('getSystemInfo winHeight:', winHeight, ' winWidth:', winWidth);

        if (res.platform == "ios") {
          var version = res.SDKVersion;

          if (util.compareVersion(version, '2.3.0') >= 0) {
            wx.setInnerAudioOption({
              obeyMuteSwitch: false
            });
          } else {
            wx.showModal({
              title: '提示',
              content: '当前微信版本过低，静音模式下可能会导致播放音频失败。'
            });
          }
        }

        that.setData({
          dkheight: winHeight,
          winHeight: winHeight,
          winWidth: winWidth
        });
      }
    });
    console.log('礼品信息 order receive onLoad() order_no:', order_no + ' is_receive:' + getApp().globalData.is_receive, ' order shape:', order_shape, 'order id:', order_id);

    if (getApp().globalData.is_receive != 1 && that.is_buymyself != 1 && that.order_shape != 5 && that.order_shape != 4) {
      wx.switchTab({
        url: '/pages/hall/hall'
      });
      return;
    }

    that.reloadData();
  },
  onShow: function () {
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
    var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
    var order_no = getApp().globalData.order_no;
    var order_id = getApp().globalData.order_id;
    var goods_flag = getApp().globalData.goods_flag; //var is_buymyself = that.data.is_buymyself

    var pages = getCurrentPages();

    if (pages.length > 1) {
      that.setData({
        title_logo: '../../../images/back.png'
      });
    }

    if (!username) {
      wx.navigateTo({
        url: '/pages/login/login?frompage=/pages/order/receive/receive'
      });
      /*
      wx.switchTab({
        url: '/pages/my/index'
      })
       */
    } else {
      //调用应用实例的方法获取全局数据
      getApp().globalData.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        });
      });
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
      that.get_mylocation();
    }
  },
  onShareAppMessage: function (options) {
    var that = this;
    var res;
    var order_no = that.order_no;
    var order_id = that.order_id;
    var username = that.username;
    var token = that.token;
    console.log('开始收礼');
    console.log(options);
    var shareObj = {
      title: "我收到的礼物",
      // 默认是小程序的名称(可以写slogan等)
      path: '/pages/hall/hall',
      // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: '',
      //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        console.log(res);

        if (res.errMsg == 'shareAppMessage:ok') {// 转发成功之后的回调
        }
      },
      fail: function () {
        console.log(res);

        if (res.errMsg == 'shareAppMessage:fail cancel') {// 转发失败之后的回调
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {// 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function () {// 转发结束之后的回调（转发成不成功都会执行）
      }
    };

    if (options.from === 'button') {} // 来自页面内转发按钮
    // shareBtn
    // 此处可以修改 shareObj 中的内容
    // var orderno = order_no.split(','); //有可能一份礼物包括多个订单号 按店铺拆单的情况
    // shareObj.path = '/pages/order/send/send?order_no=' +'&receive=';
    // 返回shareObj


    return shareObj;
  },
  methods: {
    animateTapTag: function () {
      var that = this;
      var type = 'card_cele';
      var order_id = that.order_id;
      var order_no = that.order_no;
      wx.navigateTo({
        url: '/pages/member/aboutus/aboutus?type=' + type + '&order_id=' + order_id + '&order_no=' + order_no
      });
    },
    imgYu: function (event) {
      var src = event.currentTarget.dataset.src; //获取data-src

      var imgList = [];
      imgList.push(src);
      console.log('image Yu imgList:', imgList); //图片预览

      wx.previewImage({
        current: src,
        // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表

      });
    },
    formSubmit: function (e) {
      var that = this;
      var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name;
      var order_shape = that.order_shape;
      var card_type = that.card_type;
      var order_m_id = that.order_m_id;
      var m_id = wx.getStorageSync('openid') ? wx.getStorageSync('m_id') : '';
      console.log('formSubmit() formID：', formId, ' form name:', form_name);

      if (form_name == 'receivegift') {
        if ((order_shape == 4 || order_shape == 5) && order_m_id != m_id) {
          if (card_type == 1) {
            that.setData({
              cardregisterHidden: !that.cardregisterHidden
            });
          } else if (card_type == 2) {
            that.setData({
              cardnameHidden: !that.cardnameHidden
            });
          } else if (card_type == 4) {
            that.setData({
              cardloveHidden: !that.cardloveHidden
            });
          } else if (card_type == 10) {
            that.setData({
              cardceleHidden: !that.cardceleHidden
            });
          }
        } else {
          that.receiveTapTag();
        }
      } else if (form_name == 'refresh') {
        var isreload = 1;
        that.setData({
          isreload: isreload,
          all_rows: 0
        });
        that.reloadData();
      } else if (form_name == 'resendgift') {
        if (order_shape == 4 || order_shape == 5) {
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          that.returnTapTag();
        }
      }

      if (formId) that.submintFromId(formId);
    },
    get_mylocation: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var refer_username = that.refer_username;
      var activity_id = that.activity_id;
      var shop_type = that.shop_type;
      var cur_city = wx.getStorageSync('city'); //默认杭州市 1213

      var cur_area = wx.getStorageSync('district'); //默认老余杭 50142

      var cur_prov = wx.getStorageSync('province'); //默认浙江省15

      var prov = that.prov;
      var city = that.city;
      var area = that.area;
      var qqmapkey = that.qqmapkey;
      console.log('location cur_city:', cur_city); // 实例化腾讯地图API核心类

      qqmapsdk = new QQMapWX({
        key: qqmapkey // 必填

      });
      wx.getLocation({
        type: 'gcj02',
        //gcj02  wgs84
        success: function (res) {
          console.log('mylocation wx.getLocation:', res);
          var latitude = res.latitude;
          var longitude = res.longitude;
          var speed = res.speed;
          var accuracy = res.accuracy;
          wx.setStorageSync('latitude', latitude);
          wx.setStorageSync('longitude', longitude);
          wx.setStorageSync('speed', speed);
          wx.setStorageSync('accuracy', accuracy);
          qqmapsdk.reverseGeocoder({
            poi_options: 'policy=2',
            get_poi: 1,
            success: function (res) {
              console.log('qqmapsdk:', res);
              that.setData({
                address: res.result.address
              });
              wx.setStorageSync('mylocation', res.result.address);
              wx.setStorageSync('city', res.result.address_component.city);
              wx.setStorageSync('district', res.result.address_component.district);
              wx.setStorageSync('province', res.result.address_component.province);
              wx.setStorageSync('street', res.result.address_component.street);
              wx.setStorageSync('street_number', res.result.address_component.street_number);
              console.log('位置获取成功:' + res.result.address);
              prov.push(res.result.address_component.province);
              city.push(res.result.address_component.city);
              area.push(res.result.address_component.district);
              that.setData({
                prov: prov,
                city: city,
                area: area,
                latitude: latitude,
                longitude: longitude
              });
            },
            fail: function (res) {
              console.log('mylocation get_mylocation()位置获取失败', res);
            },
            complete: function (res) {
              console.log('mylocation get_mylocation()位置获取完成', res);
            }
          });
        }
      });
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
      var that = this;
      var pages = getCurrentPages();
      var order_shape = that.order_shape;

      if (order_shape != 5 && order_shape != 4) {
        wx.switchTab({
          url: '../../hall/hall'
        });
      }
      /*
      if (pages.length > 1) {
        wx.navigateBack({ changed: true })//返回上一页
      }  
      */

    },
    returnTapTag: function (e) {
      var that = this;
      var type = e.currentTarget.dataset.type ? e.currentTarget.dataset.type : 1;
      var order_id = e.currentTarget.dataset.orderId ? e.currentTarget.dataset.orderId : that.order_id; //e.currentTarget.dataset.orderId

      var order_shape = that.order_shape;
      var card_type = that.card_type ? that.card_type : 0;

      if (type == 1) {
        //转商城
        if (order_shape == 5) {
          wx.navigateTo({
            url: '/pages/list/list?navlist_title=贺卡请柬'
          });
        } else if (order_shape == 4) {
          wx.navigateTo({
            url: '/pages/list/list?navlist_title=互动卡'
          });
        } else {
          wx.switchTab({
            url: '../../hall/hall'
          });
        }
      } else if (type == 2) {
        //转互动详情
        wx.navigateTo({
          url: '/pages/order/list/list?order_id=' + order_id + '&order_shape=' + order_shape + '&card_type=' + card_type
        });
      } else {
        wx.switchTab({
          url: '../../hall/hall'
        });
      }
    },
    radiochange: function (e) {
      var that = this;
      var card_register_gender = e.detail.value; //console.log('radio发生change事件，携带的value值为：', e.detail.value)

      that.setData({
        card_register_gender: card_register_gender
      });
    },
    callphone: function (e) {
      var that = this;
      var phone = e.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone
      });
    },
    textPaste: function (e) {
      var that = this;
      var content = e.currentTarget.dataset.content;
      wx.showToast({
        title: '复制成功'
      });
      wx.setClipboardData({
        data: content,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              console.log('点击复制微信号:', res.data);
            }
          });
        }
      });
    },
    shareorderTapTag: function (e) {
      var that = this;
      var order_id = e.currentTarget.dataset.orderId ? e.currentTarget.dataset.orderId : that.order_id;
      var order_shape = that.order_shape;
      var order_bg = that.order_bg;
      var order_image = that.order_image;
      var share_order_image = that.share_order_image;
      var card_type = that.card_type;
      wx.navigateTo({
        url: '/pages/wish/wishshare/wishshare?share_order_id=' + order_id + '&share_order_shape=' + order_shape + '&card_type=' + card_type + '&share_order_bg=' + order_image + '&share_order_image=' + share_order_image
      });
    },
    card_register_reqFun: function (e) {
      var that = this;
      var card_register_reqid_value = e.detail.value;
      that.setData({
        card_register_reqid_value: card_register_reqid_value
      });
    },
    card_register_phoneFun: function (e) {
      var that = this;
      var card_register_phone = e.detail.value;
      that.setData({
        card_register_phone: card_register_phone
      });
    },
    card_register_nameFun: function (e) {
      var that = this;
      var card_register_name = util.filterEmoji(e.detail.value);
      that.setData({
        card_register_name: card_register_name
      });
    },
    card_register_noteFun: function (e) {
      var that = this;
      var card_register_note = util.filterEmoji(e.detail.value);
      that.setData({
        card_register_note: card_register_note
      });
    },
    //按钮点击事件  获取姓名
    confirmCardRegisterInfo: function () {
      var that = this;
      var card_register_name = that.card_register_name;
      var card_register_phone = that.card_register_phone;
      var card_register_gender = that.card_register_gender;

      if (card_register_phone && !util.checkPhoneNumber(card_register_phone)) {
        wx.showToast({
          title: '手机号码无效',
          icon: 'none',
          duration: 1500
        });
        return;
      }

      if (card_register_name && card_register_gender) {
        that.receiveTapTag();
        that.setData({
          cardregisterHidden: !that.cardregisterHidden
        });
      } else {
        var needCardRegisterName = '需要提供姓名、性别和手机号';
        that.setData({
          needCardRegisterName: needCardRegisterName
        });
      }
    },
    //按钮点击事件  取消
    cancelCardRegisterInfo: function () {
      var that = this;
      that.setData({
        cardregisterHidden: !that.cardregisterHidden
      });
    },
    card_name_helloFun: function (e) {
      var that = this;
      var card_name_hello = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_hello: card_name_hello
      });
    },
    card_love_replyFun: function (e) {
      var that = this;
      var card_love_reply = util.filterEmoji(e.detail.value);
      that.setData({
        card_love_reply: card_love_reply
      });
    },
    card_cele_replyFun: function (e) {
      var that = this;
      var card_cele_reply = util.filterEmoji(e.detail.value);
      that.setData({
        card_cele_reply: card_cele_reply
      });
    },
    //按钮点击事件  获取姓名
    confirmCardCeleInfo: function () {
      var that = this;
      var card_cele_reply = that.card_cele_reply;

      if (card_cele_reply) {
        that.receiveTapTag();
      }

      that.setData({
        cardceleHidden: !that.cardceleHidden
      });
    },
    //按钮点击事件  取消
    cancelCardCeleInfo: function () {
      var that = this;
      that.setData({
        cardceleHidden: !that.cardceleHidden
      });
    },
    //按钮点击事件  获取姓名
    confirmCardNameInfo: function () {
      var that = this;
      var card_name_hello = that.card_name_hello;

      if (card_name_hello) {
        that.receiveTapTag();
      }

      that.setData({
        cardnameHidden: !that.cardnameHidden
      });
    },
    //按钮点击事件  取消
    cancelCardNameInfo: function () {
      var that = this;
      that.setData({
        cardnameHidden: !that.cardnameHidden
      });
    },
    //按钮点击事件  获取姓名
    confirmCardLoveInfo: function () {
      var that = this;
      var card_love_reply = that.card_love_reply;

      if (card_love_reply) {
        that.receiveTapTag();
      }

      that.setData({
        cardloveHidden: !that.cardloveHidden
      });
    },
    //按钮点击事件  取消
    cancelCardLoveInfo: function () {
      var that = this;
      that.setData({
        cardloveHidden: !that.cardloveHidden
      });
    },
    receiveTapTag: function () {
      var that = this;
      var order_shape = that.order_shape; //5贺卡请柬 4互动卡

      var is_buymyself = that.is_buymyself;
      var title = is_buymyself == 1 ? '收货地址' : '请确认';
      var content = is_buymyself == 1 ? '详细地址' : '确认接受吗';

      if (order_shape == 5 || order_shape == 4) {
        //贺卡请柬 或 互动卡 不需要设置接收地址
        that.confirm_card();
      } else {
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
      }
    },
    set_address: function () {
      var that = this;
      var shop_type = that.shop_type;
      var order_no = that.order_no;
      var order_price = that.order_price;
      var goods_flag = that.goods_flag ? that.goods_flag : 0;
      var openid = that.openid;
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
      var is_buymyself = that.is_buymyself; //通讯录权限检查

      wx.getSetting({
        success(res) {
          var authMap = res.authSetting;
          var length = Object.keys(authMap).length;
          console.log("authMap info 长度:" + length, authMap);

          if (authMap.hasOwnProperty('scope.address')) {
            if (!authMap['scope.address']) {
              //授权拒绝
              wx.showModal({
                title: '用户未授权',
                content: '请授权通讯地址权限',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定授权通讯地址权限');
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
          console.log('收货地址选择 订单号 order receive chooseAddress:' + that.order_no + ' openid:' + that.openid);
          wx.request({
            //更新收礼物状态
            url: weburl + '/api/client/update_order_status',
            method: 'POST',
            data: {
              username: that.username,
              shop_type: shop_type,
              openid: that.openid,
              nickname: that.nickname,
              headimg: that.headimg,
              order_no: that.order_no,
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

                if (is_buymyself == 1 && order_price > 0) {
                  //自购礼物订单抽奖
                  console.log('自购礼物订单抽奖 to lottery order_no:', order_no);
                  wx.navigateTo({
                    url: '/pages/lottery/lottery?lottery_type=0' + '&order_no=' + that.order_no
                  });
                } else {
                  that.goBack();
                }
              } else {
                console.log('礼物接收失败 order_no:', that.order_no);
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
    //贺卡请柬 互动卡 接受处理
    confirm_card: function () {
      var that = this;
      var shop_type = that.shop_type;
      var order_id = that.order_id;
      var order_no = that.order_no;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var m_id = wx.getStorageSync('openid') ? wx.getStorageSync('m_id') : '';
      var order_m_id = that.order_m_id;
      var goods_flag = that.goods_flag;
      var is_buymyself = that.is_buymyself;
      var nickname = that.userInfo.nickName;
      var headimg = that.userInfo.avatarUrl;
      var order_shape = that.order_shape;
      var card_type = that.card_type;
      var card_register_name = that.card_register_name ? that.card_register_name : '';
      var card_register_phone = that.card_register_phone ? that.card_register_phone : '';
      var card_register_gender = that.card_register_gender ? that.card_register_gender : '';
      var card_register_reqid_value = that.card_register_reqid_value ? that.card_register_reqid_value : '';
      var card_register_reqid_index = that.card_register_reqid_index ? that.card_register_reqid_index : 0;
      var card_register_note = that.card_register_note ? that.card_register_note : '';
      var card_name_hello = that.card_name_hello ? that.card_name_hello : '';
      var card_love_reply = that.card_love_reply ? that.card_love_reply : '';
      var card_cele_reply = that.card_cele_reply ? that.card_cele_reply : '';
      var latitude = that.latitude;
      var longitude = that.longitude;
      var city = that.city;
      var prov = that.prov;

      if ((order_shape == 5 || order_shape == 4) && order_m_id == m_id) {
        //贺卡请柬 互动卡 不能自己接受
        if (order_shape == 5) {
          wx.navigateTo({
            url: '/pages/list/list?navlist_title=贺卡请柬'
          });
        } else if (order_shape == 4) {
          wx.navigateTo({
            url: '/pages/list/list?navlist_title=互动卡'
          });
        }

        return;
      }

      var card_register_info = [{
        card_register_name: card_register_name,
        card_register_phone: card_register_phone,
        card_register_gender: card_register_gender,
        card_register_note: card_register_note,
        card_register_reqid_value: card_register_reqid_value,
        card_register_reqid_index: card_register_reqid_index
      }];
      wx.request({
        //更新收礼物状态
        url: weburl + '/api/client/update_order_status',
        method: 'POST',
        data: {
          username: username,
          shop_type: shop_type,
          openid: openid,
          nickname: nickname,
          headimg: headimg,
          order_id: order_id,
          order_no: order_no,
          status_info: 'receive',
          order_shape: order_shape,
          card_register_info: card_type == 1 ? JSON.stringify(card_register_info[0]) : '',
          card_name_info: card_type == 2 ? JSON.stringify(that.card_name_info) : '',
          card_name_hello: card_type == 2 ? card_name_hello : '',
          card_cele_info: card_type == 10 ? JSON.stringify(that.card_cele_info) : '',
          card_cele_reply: card_type == 10 ? card_cele_reply : '',
          card_love_info: card_type == 4 ? JSON.stringify(that.card_love_info) : '',
          card_love_reply: card_type == 4 ? card_love_reply : '',
          latitude: latitude,
          longitude: longitude,
          city: city,
          prov: prov
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('order receive set_address()礼物已接收:', res.data, ' card_love_reply:', card_love_reply, ' city:', city);
          var retinfo = res.data;
          var title = '';

          if (order_shape == 5) {
            title = '已接收';
          } else if (order_shape == 4) {
            var m_desc = JSON.parse(retinfo.result.m_desc);
            title = m_desc['note'];
          } else {
            title = '已接收';
          }

          if (retinfo.status == 'y') {
            if (order_shape == 5 || order_shape == 4) {
              wx.showToast({
                title: title,
                icon: 'none',
                duration: 1500
              });
            }

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

            if (is_buymyself == 1 && order_price > 0 && order_shape != 5 && order_shape != 4) {
              //自购礼物订单抽奖
              console.log('自购礼物订单抽奖 to lottery order_id:', order_id);
              wx.navigateTo({
                url: '/pages/lottery/lottery?lottery_type=0' + '&order_no=' + that.order_no
              });
            } else {
              console.log('礼物已接收 返回 order_id：', order_id);
              that.goBack();
            }
          } else {
            console.log('礼物接收失败 order_id:', that.order_id);
            wx.showToast({
              title: res.data.info ? res.data.info : '系统错误',
              icon: 'loading',
              duration: 1500
            });
            that.setData({
              receive_status: 0
            });
          }
        }
      });
    },
    scroll: function (event) {
      //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
      this.setData({
        scrollTop: event.detail.scrollTop
      });
    },
    topLoad: function (event) {
      //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
      //page = 1;
      this.setData({
        //list: [],
        scrollTop: 0
      }); //loadMore(this);

      console.log("lower");
    },
    overtimeData: function () {
      var that = this;
      var headimg = that.headimg;
      var nickname = that.nickname;
      console.log(' receive overtimeData() 超时处理 headimg:', headimg, ' nickname:', nickname);

      if (!headimg) {
        that.setData({
          overtime_status: 1,
          //超时标志
          orders: [],
          all_rows: 0
        });
      }
    },
    play_rec: function () {
      var that = this;
      var order_voice = that.order_voice;
      var new_rec_url = that.voice_url;
      console.log('录音文件url:', myaudio.src);

      if (order_voice) {
        myaudio.src = order_voice;
        myaudio.play();
      } else if (new_rec_url) {
        wx.downloadFile({
          url: new_rec_url,
          //音频文件url                  
          success: res => {
            if (res.statusCode === 200) {
              console.log('音频文件下载完成:', res.tempFilePath);
              myaudio.src = res.tempFilePath;
              myaudio.play();
              console.log('录音播放完成');
            }
          }
        });
      } else {
        wx.showToast({
          title: '暂无录音',
          icon: 'none',
          duration: 1000
        });
      }
    },
    reloadData: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var openid = wx.getStorageSync('openid') ? wx.getStorageSync('openid') : '';
      var order_no = that.order_no;
      var order_id = that.order_id;
      var order_shape = that.order_shpape;
      var goods_flag = that.goods_flag;
      var orders = that.orders;
      var orderskus = that.orderskus;
      var shop_type = that.shop_type;
      var note_title = that.note_title;
      var headimg = that.headimg;
      var nickname = that.nickname;
      var note = that.note;
      var is_buymyself = that.is_buymyself;
      var isreload = that.isreload;
      var order_price = 0;
      var card_register_info = '';
      var card_name_info = '';
      var card_cele_info = '';
      var card_love_info = '';
      var card_template = '';
      var card_image_height = 500;
      var card_image_width = 0;
      var card_type = 0;
      var card_int_desc = '';
      var button_name = '';
      var card_register_reqid_index = that.card_register_reqid_index ? that.card_register_reqid_index : 0; //从服务器获取订单列表

      if (is_buymyself != 1) {
        setTimeout(function () {
          //3秒超时
          that.overtimeData();
        }, 3000);
      }

      wx.request({
        url: weburl + '/api/client/query_order',
        method: 'POST',
        data: {
          username: username ? username : openid,
          access_token: token,
          order_no: order_no,
          order_id: order_id,
          order_type: 'receive',
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log(' order receive reloadData() 礼物订单查询:', res.data.result);
          var orderObjects = res.data.result;
          var all_rows = res.data.all_rows ? res.data.all_rows : 0;
          var receive_status = that.receive_status;
          var order_m_id = 0;

          if (!res.data.result) {
            wx.showToast({
              title: '没有该订单',
              icon: 'loading',
              duration: 1500
            });

            if (goods_flag == 3 && username) {
              //虚拟商品订单
              setTimeout(function () {
                wx.navigateTo({
                  url: 'pages/member/task/task'
                });
              }, 500);
            } else {
              setTimeout(function () {
                wx.navigateBack();
              }, 1500);
            }

            that.setData({
              orders: [],
              all_rows: 0
            });
          } else {
            if (isreload == 1) {
              //超时刷新
              that.setData({
                orders: [],
                all_rows: 0
              });
            } // 存储地址字段


            for (var i = 0; i < orderObjects.length; i++) {
              if (orderObjects[i]['logo'].indexOf("http") < 0) {
                orderObjects[i]['logo'] = weburl + '/' + orderObjects[i]['logo'];
              }

              for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
                if (orderObjects[i]['order_sku'][j]['sku_image'].indexOf("http") < 0) {
                  orderObjects[i]['order_sku'][j]['sku_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_image'];
                }

                if (orderObjects[i]['order_sku'][j]['sku_share_image'].indexOf("http") < 0) {
                  orderObjects[i]['order_sku'][j]['sku_share_image'] = weburl + orderObjects[i]['order_sku'][j]['sku_share_image'];
                }
              }

              note = orderObjects[i]['rcv_note'];
              headimg = orderObjects[i]['from_headimg'];
              nickname = orderObjects[i]['from_nickname'];
              order_price = order_price + orderObjects[i]['order_price'];
            }

            receive_status = orderObjects[0]['gift_status'] == 2 ? 1 : 0;
            order_m_id = orderObjects[0]['m_id'] ? orderObjects[0]['m_id'] : 0;

            if (receive_status == 1 && goods_flag == 3) {
              //虚拟商品订单
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/member/task/task'
                });
              }, 100);
            }

            if (orderObjects) {
              //向后合拼
              orderObjects = that.orders.concat(orderObjects);
            } //console.log('receive status:' + receive_status);
            // order_sku 合并在一个对象中


            for (var i = 0; i < orderObjects.length; i++) {
              for (var j = 0; j < orderObjects[i]['order_sku'].length; j++) {
                orderObjects[i]['order_sku'][j]['goods_name'] = orderObjects[i]['order_sku'][j]['goods_name'].substring(0, 15);
                orderskus.push(orderObjects[i]['order_sku'][j]);
              }
            }

            button_name = orderObjects[0]['button_name'] ? orderObjects[0]['button_name'] : ''; //按钮提示 后端提供

            if ((orderObjects[0]['shape'] == 5 || orderObjects[0]['shape'] == 4) && orderObjects[0]['m_desc']) {
              var m_desc = JSON.parse(orderObjects[0]['m_desc']);
              var voice_url = m_desc['voice'];
              console.log('receive reloadData m_desc:', m_desc);
              card_register_info = m_desc['card_register_info'] ? m_desc['card_register_info'] : '';
              card_name_info = m_desc['card_name_info'] ? m_desc['card_name_info'] : '';
              card_cele_info = m_desc['card_cele_info'] ? m_desc['card_cele_info'] : '';
              card_love_info = m_desc['card_love_info'] ? m_desc['card_love_info'] : '';
              card_template = m_desc['card_template'] ? m_desc['card_template'] : '';
              card_type = card_template ? card_template[0]['type'] : 0;
              card_int_desc = orderObjects[0]['int_m_desc'];

              if (card_type == 1) {
                card_image_height = 1100;
              } else if (card_type == 2) {
                card_image_height = 500;
              } else if (card_type == 10) {
                card_image_width = 580;
                card_image_height = 880;
              } else if (card_type == 4) {
                card_image_width = 580;
                card_image_height = 880;
              } else {
                card_image_height = 750;
              }

              card_register_reqid_index = card_register_info['card_register_reqid_index'];

              if (voice_url) {
                wx.downloadFile({
                  url: voice_url,
                  //音频文件url                  
                  success: res => {
                    if (res.statusCode === 200) {
                      //myaudio.src = res.tempFilePath
                      //myaudio.play()
                      console.log('录音文件下载完成', res.tempFilePath);
                      that.setData({
                        order_voice: res.tempFilePath,
                        voice_url: voice_url
                      });
                    }
                  }
                });
              }
            }

            that.setData({
              orders: orderObjects,
              order_price: order_price,
              all_rows: all_rows,
              orderskus: orderskus,
              note: note,
              note_title: note_title,
              headimg: headimg,
              nickname: nickname,
              order_image: orderskus[0]['sku_image'],
              share_order_image: orderskus[0]['sku_share_image'],
              receive_status: receive_status,
              order_id: orderObjects[0]['id'],
              order_m_id: order_m_id,
              card_register_info: card_register_info,
              card_name_info: card_name_info,
              card_love_info: card_love_info,
              card_cele_info: card_cele_info,
              card_template: card_template,
              card_image_height: card_image_height,
              card_image_width: card_image_width,
              card_type: card_type ? card_type : 0,
              card_name_hello: card_int_desc ? card_int_desc : '',
              card_cele_reply: card_int_desc ? card_int_desc : '',
              card_love_reply: card_int_desc ? card_int_desc : '',
              button_name: button_name ? button_name : '',
              card_register_reqid_index: card_register_reqid_index ? card_register_reqid_index : 0,
              is_showable: orderObjects[0]['is_showable'] ? orderObjects[0]['is_showable'] : 0
            });
            console.log('order sku card_template:', card_template, ' card_type:', that.card_type, ' card_cele_info:', that.card_cele_info);
            getApp().globalData.is_receive = 0;
            var order_price = orderObjects[0];

            if (is_buymyself == 1) {
              //自购礼品 直接接收
              that.receiveTapTag();
            }
          }
        }
      });
    },
    showGoods: function (e) {
      var skuId = e.currentTarget.dataset.skuId;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var goods_id = e.currentTarget.dataset.goodsId;
      var goods_name = e.currentTarget.dataset.goodsName;
      console.log('showGoods');
      console.log(goods_name + ' ' + goods_id);
      wx.navigateTo({
        url: '../../details/details?sku_id=' + skuId + '&goods_name=' + goods_name + '&id=' + goods_id + '&token=' + token + '&username=' + username
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
@import "./receive.css";
</style>