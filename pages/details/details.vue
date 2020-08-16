<template>
<view> 
	<view scroll-y class="pagewrap" :style="'heigth:'+winHeight+'px;'+((!modalHidden||!cardcelehidden||!cardnamehidden||!cardregisterhidden||!cardlovehidden)?'position:fixed;':'')">
	<view class="share-goods">
		<view class="share-buttons" style="justify-content: flex-end">
			<view v-if="goodsshape==4||goodsshape==5" class="btnshare" @tap="cardEditTapTag">		    
			<image class="shareto" src="/static/images/u72.png"></image>
		        编辑
			</view>
			<view v-if="goodsshape==1 && !showVideo" class="btnshare" @tap="sharegoodsTapTag">
				<image class="shareto" src="/static/images/shareto.png"></image>
		        求赠
			</view>
		</view>
	</view>
	
	<view class="banner">
		<view :hidden="!modalHidden" :style="(card_type==2?'margin-top:90rpx;':'')">
			<image v-if="showVideo" class="video-close" src="/static/images/icon-no.png" @click="videoEnd"></image>
			<image v-if="showVideo" class="video-voice" :src="video_muted?'/static/images/notification.png':'/static/images/notificationclose.png'" @click="videoVoice"></image>
			<swiper class="swiper-box swiper-image" @change="swiperchange" :current="cur_img_id" :indicator-dots="indicatorDots" indicator-color="rgba(0,0,0,0.1)" indicator-active-color="rgba(0,0,0,0.3)" :vertical="vertical" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" :style="'height:' + card_image_height + 'rpx;'">
			<block v-for="(pic, idx) in image_pic" :key="idx">
				<swiper-item class="swiper-item">
					<view style="flex: 1;">
						<view  v-if="pic.video_url==''"  >
							<image :src="pic.url" class="slide-image" :style="'z-index:1;height:' + card_image_height + 'rpx;'" :data-list="image_pic" :data-src="pic.url" @tap="imgYu" mode="aspecFit"></image>
						</view>
						<view  v-if="pic.video_url!=''" style="flex: 1;">
							<view v-if="!showVideo" >
								<image :src="pic.url" class="slide-image" :style="'z-index:1;height:' + card_image_height + 'rpx;'" :data-list="image_pic" :data-src="pic.url" @tap="imgYu" mode="aspecFit"></image>							 
								<image class="video-play" src="/static/images/play.png" @tap="bindplay"></image>
							</view>
							
							<view v-if="showVideo"> 
								<video id="f" class="slide-video" :src="pic.video_url" :controls="true" :show-play-btn="true"
								:show-center-play-btn="false" :muted="video_muted" :autoplay="video_autoplay" :poster="pic.url"  :objectFit="pic.short?'':'fill'" :show-progress="false" enable-progress-gesture="false" 
								@click="videoPlay" @pause="pauseVideo" @ended="videoEnd"  page-gesture="false"  @timeupdate="timeupdate" 
								>
								</video>
							</view>
						</view>
					</view>
					
					<view v-if="goodsshape==4 && card_type==1" class="card-register-view">
						<block v-for="(template, index) in pic['template_config']" :key="index">
							<text :hidden="(template.typeId=='card_register_title'?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_title?card_register_title:template.typeText}}
							</text>
							<text :hidden="(template.typeId=='card_register_content'?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_content?card_register_content:template.typeText}}
							</text>
							<text :hidden="(template.typeId=='card_register_addr'?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth)+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_addr?'地址:'+card_register_addr:template.typeText}}
							</text>
							<text :hidden="((template.typeId=='register_start_date' && has_registerdue)?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{register_start_date?'注册:'+register_start_date:template.typeText}}
							</text>
							<text :hidden="((template.typeId=='register_start_time' && has_registerdue)?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{register_start_time?register_start_time:template.typeText}}
							</text> 
							<text :hidden="((template.typeId=='register_end_date' && has_registerdue)?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{register_end_date?register_end_date:template.typeText}}
							</text> 
							<text :hidden="((template.typeId=='register_end_time' && has_registerdue)?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{register_end_time?register_end_time:template.typeText}}
							</text>  
							<text :hidden="((template.typeId=='action_start_date' && has_actiondue)?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{action_start_date?'活动:'+action_start_date:template.typeText}}
							</text>  
							<text :hidden="((template.typeId=='action_start_time' && has_actiondue)?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{action_start_time?action_start_time:template.typeText}}
							</text>  
							<text :hidden="((template.typeId=='action_end_date' && has_actiondue)?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{action_end_date?action_end_date:template.typeText}}
							</text> 
							<text :hidden="((template.typeId=='action_end_time' && has_actiondue)?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{action_end_time?action_end_time:template.typeText}}
							</text>  
							<text :hidden="((template.typeId=='card_register_lim')?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_lim==0?'人数:不限':'人数:'+card_register_lim}}
							</text>  
							<text :hidden="((template.typeId=='card_register_fee')?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_fee>0?'费用:￥'+card_register_fee:'费用:免费'}}
							</text>  
							<text :hidden="((template.typeId=='card_register_ownername')?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_ownername?'发起人:'+card_register_ownername:''}}
							</text>   
							<text :hidden="((template.typeId=='card_register_ownerwechat')?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_register_ownerwechat?'微信:'+card_register_ownerwechat:''}}
							</text>  
							<view :hidden="(template.typeId=='card_register_adv'?false:true)">
								<image :style="' border-radius:20rpx; ' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'')" :src="card_register_adv"></image>
							</view>
							<view :hidden="((template.typeId=='card_register_logo' && has_shlogo)?false:true)" style>
								<image :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + ' width:70rpx;height:70rpx; border-radius:50%;'" :src="share_goods_qrcode"></image>
							</view>
						</block>
					</view>
			       
					<view v-if="goodsshape==4 && card_type==2" class="card-name-view">
						<block v-for="(template, index) in pic['template_config']" :key="index">
							<text :hidden="template.typeId=='card_name'?false:true" :style="'text-align:right;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">
							{{card_name_name?card_name_name:template.typeText}}
							</text>
							<text :hidden="(template.typeId=='card_title'?false:true)" :style="'text-align:right; ' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_title?card_name_title:template.typeText}}
							</text>
							<text :hidden="(template.typeId=='card_phone'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_phone?card_name_phone:template.typeText}}
							</text>
							<text :hidden="(template.typeId=='card_tel'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_tel?card_name_tel:template.typeText}}
							</text> 
							<text :hidden="(template.typeId=='card_email'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_email?card_name_email:template.typeText}}
							</text> 
							<text :hidden="(template.typeId=='card_weburl'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_website?card_name_website:template.typeText}}
							</text> 
							<text :hidden="(template.typeId=='card_companyname'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_company?card_name_company:template.typeText}}
							</text>  
							<text :hidden="(template.typeId=='card_addr'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_name_addr?card_name_addr:template.typeText}}
							</text>
							<view :hidden="(template.typeId=='card_logo'?false:true)">
								<image :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'')" :src="card_name_logo_image"></image>
							</view>
							<view :hidden="((template.typeId=='card_qrcode' && has_shlogo)?false:true)" style>
								<image :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + ' width:80rpx;height:80rpx; border-radius:50%;'" :src="share_goods_qrcode"></image>
							</view>
						</block>
					</view>
			       
					<view v-if="goodsshape==4 && card_type==4" class="card-love-view">
						<block v-for="(template, index) in pic['template_config']" :key="index">
							<text :hidden="(template.typeId=='card_love_title'?false:true)" :style="'text-align:right;' + (template.y?' top:'+(template.y*card_image_height*100)/100+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_title?card_love_title:template.typeText}}
							</text>
							<text :hidden="(template.typeId=='card_love_phone'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height*100)/100+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_phone?'电话:'+card_love_phone:template.typeText}}
							</text>
							<text :hidden="(template.typeId=='card_love_related'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_related?card_love_related:template.typeText}}
							</text> 
							<text :hidden="(template.typeId=='card_love_addr'?false:true)" :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_addr?'地址:'+card_love_addr:template.typeText}}
							</text> 
			           
							<text :hidden="(template.typeId=='card_love_content'?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_love_content?card_love_content:template.typeText}}
							</text>
							<view :hidden="(template.typeId=='card_love_logo'?false:true)">
								<image :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'')" :src="card_love_logo"></image>
							</view>
							<view :hidden="((template.typeId=='card_love_qrcode' && has_shlogo)?false:true)" style>
								<image :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + ' width:80rpx;height:80rpx; border-radius:50%;'" :src="share_goods_qrcode"></image>
							</view>
						</block>
					</view>
					<view v-if="goodsshape==5" style class="card-blessing-view">
						<block v-for="(template, index) in pic['template_config']" :key="index">
							<text :hidden="(template.typeId=='card_cele_title'?false:true)" :style="'text-align:right;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.height?' line-height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_cele_title?card_cele_title:template.typeText}}
							</text>
							<text space="ensp" :hidden="(template.typeId=='card_cele_content'?false:true)" :style="'text-align:left;' + (template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*100*winWidth)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'') + '' + (template.styleSheet.fontSize?' font-size:'+(template.styleSheet.fontSize)+'px;':'') + '' + (template.styleSheet.fontFamily?' font-family:'+(template.styleSheet.fontFamily)+';':'') + '' + (template.color?' color:'+(template.color)+';':'')">{{card_cele_content?card_cele_content:template.typeText}}
							</text>
							<view :hidden="(template.typeId=='card_cele_logo'?false:true)">
								<image :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth*100)/100+'px;':'') + '' + (template.width?' width:'+(template.width*winWidth*100)/100+'px;':'') + '' + (template.height?' height:'+(template.height*card_image_height)+'rpx;':'')" :src="card_cele_logo"></image>
							</view>
							<view :hidden="((template.typeId=='card_cele_qrcode' && has_shlogo)?false:true)" style>
								<image :style="(template.y?' top:'+(template.y*card_image_height)+'rpx;':'') + '' + (template.x?' margin-left:'+(template.x*winWidth)+'px;':'') + ' width:80rpx;height:80rpx; border-radius:50%;'" :src="share_goods_qrcode"></image>
							</view>
						</block>
					</view>
					<view v-if="(goodsshape==5||goodsshape==4 ) && new_rec_url" class="share-play-rec" @tap="play_rec">
						<image src="../../static/images/notification.png" style="width:50rpx;height:50rpx;"></image>
					</view>
				</swiper-item>
			</block>
			</swiper>
		</view>
		</view>
		 
		<view v-if="goodsshape==4 && card_type==2" :hidden="!cardnamehidden" class="card-name-note">
			<textarea style="font-size:28rpx;" @blur="cardnameNoteTextAreaBlur" :value="card_name_note" placeholder="请输入简介(限80个汉字)" placeholder-style="text-align:center;color:#e2e2e2;" maxlength="80"></textarea>
		</view>
		<view class="shopping_container">
			<view class="goods-name">
				<text>{{goodsname?goodsname:''}}</text>
				<text class="goods_prom">{{goodsinfo?goodsinfo:''}}</text>
			</view>
			<view v-if="goodsshape!=5 && goodsshape!=4" class="goods-info">
				<text class="left-tag">{{goodssale>0?goodssale:'0'}}人已送</text>
				<view class="right-tag">
					{{marketprice>0?'':''}} 
					<text class="price-market">{{marketprice>0?'￥'+marketprice:''}}</text>
					{{marketprice>0?'':''}} 
					<text class="price-real">{{goodsprice>0?'￥'+goodsprice:''}}</text>
				</view>
			</view>
			<view v-if="goodsshape!=5 && goodsshape!=4" class="fitfor">
				<text>适合送</text>
				<text class="goods_tag">{{goodstag?goodstag:''}}</text>
			</view>
			<view v-if="goodsdiscount<100" class="prd-prom">
				<image src="/static/images/discount.png" style="width:75rpx;height:32rpx;"></image>
				{{discountinfo}}
			</view>
			<view v-if="goodsorg!=5" class="comm-text">
				<text class="comm-name">服务</text>
				<view class="comm-listitem">
					<image class="icon-item" src="/static/images/icon-zp.png"></image>
					<text>假一赔十</text>
				</view>
				<view class="comm-listitem">
					<image class="icon-item" src="/static/images/icon-by.png"></image>
					<text>全国包邮</text>
				</view>
				<view class="comm-listitem">
					<image class="icon-item" src="/static/images/icon-tk.png"></image>
					<text>送礼对方接受后付款</text>
				</view>
			</view>
			<view v-if="goodsorg!=5" class="comm-text">
				<text class="comm-name">物流</text>
				<view class="comm-listitem">
					<image class="icon-item" src="/static/images/icon-wl.png"></image>
					<text v-if="(goodsshape!=5&&goodsshape!=4&&goodsorg==4)" class="goods-org">京东物流</text>
				</view>
			</view>
			<view v-if="(goodsshape!=5&&goodsshape!=4)"  class="comm-text2">
				<text class="comm-name">礼物评论</text>
				<text @tap="commTapTag" class="comm-status">查看全部{{all_rows>0?'('+all_rows+')':''}}</text>
			</view>
			<view v-for="(comm, index) in comm_list" :key="index" class="comm-item">
				<view @tap="commTapTag" class="comm-title">
					<image class="comm-image" :src="comm.wx_headimg" mode="aspectFill"></image>
					<view>
						<text>{{comm.wx_nickname}}</text>
					</view>
				</view>
				<view class="comm-content">
					{{comm.desc}}
				</view>
			</view>
		</view>
		<view class="prd-title">{{(goodsshape!=5&&goodsshape!=4)?'商品详情':'说明'}}</view>
		<view class="prd-detail">
			<view class="wxParse" :hidden="hideviewgoodsinfo">
				<scroll-view scroll-y >
					<uParse :content="dkcontent"  @navigate="navigate" />
				</scroll-view>
			</view>
		</view>
	</view>
	<uni-popup :show="!modalHidden" type="bottom" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">
			{{attrValueList.length>0?'':add_cart_title}}
			</view>
			<view class="uni-tip-content">
				<scroll-view scroll-y :style="'max-height:' + dkheight + 'px'">
				<view v-if="attrValueList.length>0" class="commodity_attr_list">
				 		<view v-for="(attrValueObj, attrIndex) in attrValueList" :key="attrIndex">
				 			<view class="sku_title">选择{{attrValueObj.name}}</view>
				 			<view class="attr_value_box">
				 				<view v-for="(value, valueIndex) in attrValueObj.type==2?attrValueObj.note:attrValueObj.value" :key="valueIndex" :class="'attr_value ' + (attrValueObj.attrValueStatus?(value==attrValueObj.selectedValue?'attr_value_active':'attr_value_disabled'):'attr_value_disabled')" @tap="selectAttrValue" :data-status="attrValueObj.attrValueStatus" :data-value="value" :data-valueindex="valueIndex" :data-key="attrValueObj.name" :data-index="attrIndex" :data-selectedvalue="attrValueObj.selectedValue">
				 					<image v-if="attrValueObj.type == 2" :src="attrValueObj.value[valueIndex]"></image>
				 					<text v-else-if="attrValueObj.type == 1">{{attrValueObj.value[valueIndex]}}</text>
				 					<text>{{attrValueObj.note[valueIndex]}}</text>
				 				</view>
				 			</view>
				 		</view>
				</view>
				</scroll-view>
				<view v-if="sku_id" class="sku-code">编号:{{sku_id}} 名称:{{goodsname}}</view>
				<view v-if="!sku_id" class="sku-code">未选中商品</view>
				<view class="buy-info">
					<text style="margin-left:20rpx;">{{sku_sell_price>0?'单价:':''}} </text>
					<view class="price-now">
						<text v-if="sku_sell_price">￥{{sku_sell_price}}</text>
						<text v-if="sku_delivery_price" style="font-size:28rpx;margin-left:10rpx;color:#333">(运费:￥{{sku_delivery_price}})</text>
					</view>
				</view>
				<view class="buy-info">
					<view v-if="goodsshape!=5 && goodsshape!=4" class="buy-num">数量:</view> 
					<view v-if="goodsshape!=5 && goodsshape!=4" class="buy-num-minus" @click.stop="bindMinus">
						<image style="width:30rpx;height:30rpx;margin-left:20rpx;" src="../../static/images/setting-small.png"></image>
					</view> 
					<view v-if="goodsshape!=5 && goodsshape!=4" class="buy-num-count">{{buynum}}</view>  
					<view v-if="goodsshape!=5 && goodsshape!=4" class="buy-num-plus" @click.stop="bindPlus">
						<image style="width:30rpx;height:30rpx;" src="../../static/images/setting-plus.png"></image>  
					</view>
				</view>
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @tap="modalBindcancel">取消</view>
				<view class="uni-tip-button" @tap="modalBindconfirm">确定</view>
			</view>
		</view>
	</uni-popup>
	
	<!-- name card -->
	<uni-popup :show="!cardnamehidden" type="bottom" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">
			{{is_buymyself==1?'请确认':card_name_modal_title}}
			</view>
			<view class="uni-tip-content">
				<scroll-view scroll-y :style="'max-height:' + dkheight + 'px'">
				<view class="card-name-info">
				  <input :hidden="!is_card_name_name" style="font-size:30rpx;" placeholder-style="text-align:center;color:#e2e2e2;" :value="card_name_name" placeholder="姓名" @input="card_name_nameTapTag" :focus="inputShowed" maxlength="20"></input>
				  <input :hidden="!is_card_name_title" style="font-size:30rpx;" @input="card_name_titleTapTag" :value="card_name_title" placeholder="职务/称谓" placeholder-style="text-align:center;color:#e2e2e2;" maxlength="30"></input>
				</view>
				<view class="card-name-info">
				  <input :hidden="!is_card_name_phone" style="font-size:30rpx;" :value="card_name_phone" placeholder-style="text-align:center;color:#e2e2e2;" type="number" placeholder="手机号" @input="card_name_phoneTapTag" :focus="inputShowed2" maxlength="30"></input>
				   <input :hidden="!is_card_name_tel" style="font-size:30rpx;" :value="card_name_tel" placeholder-style="text-align:center;color:#e2e2e2;" type="number" placeholder="公司电话" @input="card_name_telTapTag" :focus="inputShowed2" maxlength="30"></input>
				</view>
				<view class="card-name-info">
				<input :hidden="!is_card_name_email" style="font-size:30rpx;" :value="card_name_email" placeholder-style="text-align:center;color:#e2e2e2;" type="text" placeholder="电子邮箱" @input="card_name_emailTapTag" :focus="inputShowed4" maxlength="30"></input>
				</view>
				<view class="card-name-info">
				  <input :hidden="!is_card_name_website" style="font-size:30rpx;" :value="card_name_website" placeholder-style="text-align:center;color:#e2e2e2;" type="text" placeholder="网址" @input="card_name_websiteTapTag" :focus="inputShowed4" maxlength="30"></input>
				  <input :hidden="!is_card_name_publicwechat" style="font-size:30rpx;" :value="card_name_publicwechat" placeholder-style="text-align:center;color:#e2e2e2;" type="text" placeholder="微信公众号" @input="ccard_name_publicwechatTapTag" :focus="inputShowed4" maxlength="30"></input>
				</view>
				<view class="card-name-info">
				  <input :hidden="!is_card_name_addr" style="font-size:25rpx;" :value="card_name_addr" placeholder-style="text-align:center;color:#e2e2e2;" type="text" placeholder="地址" @input="card_name_addrTapTag" :focus="inputShowed4" maxlength="80"></input>
				</view>
				 <view class="card-name-info">
				  <input :hidden="!is_card_name_company" style="font-size:25rpx;" :value="card_name_company" placeholder-style="text-align:center;color:#e2e2e2;" type="text" placeholder="公司名称" @input="card_name_companyTapTag" :focus="inputShowed4" maxlength="80"></input>
				</view>
				<view :hidden="!is_card_name_logo_image" class="card-name-info">
				  <image :src="card_name_logo_image"></image>
				  <text :hidden="card_name_logo_image" style="font-size:25rpx;height:100rpx;line-height:100rpx;" data-logo="1" @tap="upimg">添加LOGO</text>
				  <text :hidden="!card_name_logo_image" @tap="cancel_upimg" data-logo="1" style="font-size:25rpx;height:100rpx;line-height:100rpx;">取消LOGO</text>
				</view>
				 <view class="modeswitch">
				  <label>
				    <text style="height:50rpx;line-height:50rpx;">送心logo</text>
				    <switch @change="shlogoChange" :checked="has_shlogo" color="#E34C55" style="zoom:0.6"></switch>
				  </label>
				</view>
				</scroll-view>
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @tap="shareCandelCardName">取消</view>
				<view class="uni-tip-button" @tap="shareConfirmCardName">确定</view>
			</view>
		</view>
	</uni-popup>
	
	<!-- cele card -->
	<uni-popup :show="!cardcelehidden" type="bottom" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">
			{{is_buymyself==1?'请确认':card_name_modal_title}}
			</view>
			<view class="uni-tip-content">
				<scroll-view scroll-y :style="'max-height:' + dkheight + 'px'">
				<view class="card-blessing-info">
				  <input :hidden="!is_card_cele_title" style="font-size:30rpx;" placeholder-style="text-align:center;color:#e2e2e2;" :value="card_cele_title" placeholder="标题" @input="card_cele_titleTapTag" :focus="inputShowed" maxlength="50"></input>
				</view>
				<view :hidden="!is_card_cele_content" class="card-blessing-info">
				   <textarea style="font-size:28rpx;" @blur="card_cele_contentTapTag" :value="card_cele_content" placeholder="请输入内容(限220个汉字)" placeholder-style="text-align:center;color:#e2e2e2;" maxlength="220"></textarea>
				</view>
				<view :hidden="!is_card_cele_logo" class="card-blessing-info">
				  <image :src="card_cele_logo"></image>
				  <text :hidden="card_cele_logo" style="font-size:25rpx;height:100rpx;line-height:100rpx;" data-logo="10" @tap="upimg">添加LOGO</text>
				  <text :hidden="!card_cele_logo" @tap="cancel_upimg" data-logo="10" style="font-size:25rpx;height:100rpx;line-height:100rpx;">取消LOGO</text>
				</view>
				 <view class="modeswitch">
				  <label>
				    <text style="height:50rpx;line-height:50rpx;">送心logo</text>
				    <switch @change="shlogoChange" :checked="has_shlogo" color="#E34C55" style="zoom:0.6"></switch>
				  </label>
				</view>
				</scroll-view>
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @tap="shareCandelCardCele">取消</view>
				<view class="uni-tip-button" @tap="shareConfirmCardCele">确定</view>
			</view>
		</view>
	</uni-popup>
	 

	<!-- love card -->
	<uni-popup :show="!cardlovehidden" type="bottom" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">
			{{is_buymyself==1?'请确认':card_name_modal_title}}
			</view>
			<view class="uni-tip-content">
				<scroll-view scroll-y :style="'max-height:' + dkheight + 'px'">
				<view class="card-love-info">
				  <input :hidden="!is_card_love_title" style="font-size:30rpx;" placeholder-style="text-align:center;color:#e2e2e2;" :value="card_love_title" placeholder="标题" @input="card_love_titleTapTag" :focus="inputShowed" maxlength="50"></input>
				</view>
				<view :hidden="!is_card_love_content" class="card-love-info">
					<view class="uni-textarea">
						<textarea style="font-size:28rpx;" @blur="card_love_contentTapTag" :value="card_love_content" placeholder="请输入说明(限120个汉字)" placeholder-style="text-align:center;color:#e2e2e2;" maxlength="120" /> 
					</view>
				</view>
				<view class="card-love-info">
				  <input :hidden="!is_card_love_related" style="font-size:30rpx;" placeholder-style="text-align:center;color:#e2e2e2;" :value="card_love_related" placeholder="联系人姓名" @input="card_love_relatedTapTag" :focus="inputShowed" maxlength="50"></input>
				  <input :hidden="!is_card_love_phone" style="font-size:30rpx;" placeholder-style="text-align:center;color:#e2e2e2;" :value="card_love_phone" placeholder="联系人手机" @input="card_love_phoneTapTag" :focus="inputShowed" maxlength="50"></input>
				</view>
				<view class="card-love-info">
				  <input :hidden="!is_card_love_addr" style="font-size:30rpx;" placeholder-style="text-align:center;color:#e2e2e2;" :value="card_love_addr" placeholder="联系地址" @input="card_love_addrTapTag" :focus="inputShowed" maxlength="50"></input>
				</view>
				<view :hidden="!is_card_love_logo" class="card-love-info">
				  <image :src="card_love_logo"></image>
				  <text :hidden="card_love_logo==''?false:true" style="font-size:25rpx;height:100rpx;line-height:100rpx;" data-logo="4" @tap="upimg">添加照片</text>
				  <text :hidden="card_love_logo==''?true:false" @tap="cancel_upimg" data-logo="4" style="font-size:25rpx;height:100rpx;line-height:100rpx;">取消照片</text>
				</view>
				<view class="modeswitch">
				  <label>
				    <text style="height:50rpx;line-height:50rpx;">送心logo</text>
				    <switch @change="shlogoChange" :checked="has_shlogo" color="#E34C55" style="zoom:0.6"></switch>
				  </label>
				</view>
				</scroll-view>
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @tap="shareCandelCardLove">取消</view>
				<view class="uni-tip-button" @tap="shareConfirmCardLove">确定</view>
			</view>
		</view>
	</uni-popup>
	
	
    <!-- register card -->
	<uni-popup :show="!cardregisterhidden" type="bottom" :custom="true" :mask-click="false">
		<view class="uni-tip">
			<view class="uni-tip-title">
			{{is_buymyself==1?'请确认':card_name_modal_title}}
			</view>
			<view class="uni-tip-content">
				<scroll-view scroll-y :style="'max-height:' + dkheight + 'px'">
				<view class="card-register-info">
				  <input :hidden="!is_card_register_title" style="font-size:30rpx;" placeholder-style="text-align:center;color:#e2e2e2;" :value="card_register_title" placeholder="标题" @input="cardregistertitleTapTag" :focus="inputShowed" maxlength="30"></input>
				</view>
				 <view :hidden="!is_card_register_adv" class="card-register-info">
				  <image :src="(card_register_adv?card_register_adv:default_image)"></image>
				  <text :hidden="card_register_adv" data-logo="2" @tap="upimg" style="font-size:25rpx;height:100rpx;line-height:100rpx;">添加主题图片</text>
				  <text :hidden="!card_register_adv" @tap="cancel_upimg" data-logo="2" style="font-size:25rpx;height:100rpx;line-height:100rpx;">取消主题图片</text>
				</view>
				<view class="card-register-info">
					<view class="uni-textarea">
						<textarea :hidden="!is_card_register_content" style="font-size:28rpx;" @blur="cardRegisterTextAreaBlur" :value="card_register_content" placeholder="请输入说明(限220个汉字)" placeholder-style="text-align:center;color:#e2e2e2;" maxlength="220" /> 
					</view>
				</view>
				<view class="card-register-info">
					<input :hidden="!is_card_register_ownername" style="width:40%;" placeholder-style="text-align:center;color:#e2e2e2;" type="text" :value="card_register_ownername" placeholder="发起人署名" @input="cardregisterOwnerNameTapTag" :focus="inputShowed2" maxlength="30"></input>
					<input :hidden="!is_card_register_ownerwechat" style="width:60%;" placeholder-style="text-align:center;color:#e2e2e2;" type="text" :value="card_register_ownerwechat" placeholder="发起人微信号" @input="cardregisterOwnerWechatTapTag" :focus="inputShowed3" maxlength="30"></input>
				</view>
				<view class="card-register-info">
					<input :hidden="!is_card_register_addr" :value="card_register_addr" placeholder-style="text-align:center;color:#e2e2e2;" type="text" placeholder="地址" @input="cardregisterAddrTapTag" :focus="inputShowed4" maxlength="50"></input>
				</view>
				<view class="card-register-info">
					<text :hidden="!is_card_register_lim" style="width:35%;padding:5rpx auto;">人数(0无限):</text>
					<input :hidden="!is_card_register_lim" style="width:20%;" :value="card_register_lim" type="number" placeholder-style="text-align:center;color:#e2e2e2;" placeholder="限制人数(0不限制)" @input="cardregisterLimTapTag" :focus="inputShowed5" maxlength="10"></input>
					<text :hidden="!is_card_register_fee" style="width:20%;padding:5rpx auto;">费用￥:</text>
					<input :hidden="!is_card_register_fee" style="width:20%;" :value="card_register_fee" type="digit" placeholder-style="text-align:center;color:#e2e2e2;" placeholder="参与费用" @input="cardregisterFeeTapTag" :focus="inputShowed6" maxlength="10"></input>
				</view>
				<view class="card-register-info" style="justify-content: left;">
				  <text style="width:150rpx;">所需证件:</text>
				  <picker :value="card_register_reqid_index" :range="card_register_reqid_picker" @change="bindChangeRegisterReqid">
				    <view style="font-size:25rpx;background:#fff;margin-top:15rpx;">
				     {{card_register_reqid_picker[card_register_reqid_index]}}  
				    </view>
				  </picker>
				</view>
				<view :hidden="!is_register_start_date" class="modeswitch">
				  <label>
				    <text style="height:50rpx;line-height:50rpx;">注册期限</text>
				    <switch @change="registerDueChange" :checked="has_registerdue" color="#E34C55" style="zoom:0.6"></switch>
				  </label>
				</view>
				<view class="card-register-info" :hidden="!is_register_start_date || !has_registerdue">
				  <text style="width:300rpx;">注册开始:</text>
				  <picker mode="date" :value="register_start_date" start="register_start_date" end="2999-12-12" @change="bindChangeStartDate">
				  <view style="font-size:25rpx;background:#fff;width:160rpx;margin-top:15rpx;">
				   {{register_start_date}}
				  </view>
				  </picker>
				  <text style="width:20rpx;" space="ensp"></text>
				  <picker mode="time" :value="register_start_time" start="register_start_time" end="23:59" @change="bindChangeStartTime">
				   <view style="font-size:25rpx;background:#fff;width:120rpx;margin-top:15rpx;">
				   {{register_start_time}}
				  </view>
				  </picker>
				</view>
				 <view :hidden="!is_register_end_date || !has_registerdue" class="card-register-info">
				  <text style="width:300rpx;">注册结束:</text>
				  <picker mode="date" :value="register_end_date" start="register_end_date" end="2999-12-12" @change="bindChangeEndDate">
				  <view style="font-size:25rpx;background:#fff;width:160rpx;margin-top:15rpx;">
				   {{register_end_date}}
				  </view>
				  </picker>
				  <text style="width:20rpx;" space="ensp"></text>
				  <picker mode="time" :value="register_end_time" start="register_end_time" end="23:59" @change="bindChangeEndTime">
				   <view style="font-size:25rpx;background:#fff;width:120rpx;margin-top:15rpx;">
				   {{register_end_time}}
				  </view>
				  </picker>
				</view>
				<view :hidden="!is_action_start_time" class="modeswitch">
				  <label>
				    <text style="height:50rpx;line-height:50rpx;">活动期限</text>
				    <switch @change="actionDueChange" :checked="has_actiondue" color="#E34C55" style="zoom:0.6"></switch>
				  </label>
				</view>
				<view :hidden="!is_action_start_time || !has_actiondue" class="card-register-info">
				  <text style="width:300rpx;">活动开始:</text>
				  <picker mode="date" :value="action_start_date" start="action_start_date" end="2999-12-12" @change="bindChangeActStartDate">
				  <view style="font-size:25rpx;background:#fff;width:160rpx;margin-top:15rpx;">
				   {{action_start_date}}
				  </view>
				  </picker>
				  <text style="width:20rpx;" space="ensp"></text>
				  <picker mode="time" :value="action_start_time" start="action_start_time" end="23:59" @change="bindChangeActStartTime">
				   <view style="font-size:25rpx;background:#fff;width:120rpx;margin-top:15rpx;">
				   {{action_start_time}}
				  </view>
				  </picker>
				</view>
				<view :hidden="!is_action_end_time || !has_actiondue" class="card-register-info">
				  <text style="width:300rpx;">活动结束:</text>
				  <picker mode="date" :value="action_end_date" start="action_end_date" end="2999-12-12" @change="bindChangeActEndDate">
				  <view style="font-size:25rpx;background:#fff;width:160rpx;margin-top:15rpx;">
				   {{action_end_date}}
				  </view>
				  </picker>
				  <text style="width:20rpx;" space="ensp"></text>
				  <picker mode="time" :value="action_end_time" start="action_end_time" end="23:59" @change="bindChangeActEndTime">
				   <view style="font-size:25rpx;background:#fff;width:120rpx;margin-top:15rpx;">
				   {{action_end_time}}
				  </view>
				  </picker>
				</view>
				 <view class="modeswitch">
				  <label>
				    <text style="height:50rpx;line-height:50rpx;">送心logo</text>
				    <switch @change="shlogoChange" :checked="has_shlogo" color="#E34C55" style="zoom:0.6"></switch>
				  </label>
				</view>
				</scroll-view>
			</view>
			<view class="uni-tip-group-button">
				<view class="uni-tip-button" @tap="shareCandelCardRegister">取消</view>
				<view class="uni-tip-button" @tap="shareConfirmCardRegister">确定</view>
			</view>
		</view>
	</uni-popup>
	 
	<view class="footer">
		<view class="opt-buttons">
			<view v-if="goodsshape==5||goodsshape==4" style="width:30%;">
				<jsfun-record voicePath="" maxTime="60" minTime="3" @okClick="save_recorder">
					<button type="primary" class="sec-btn">
						<image class="icon-detail" src="/static/images/record.png"></image>
						<text>长按说话</text>
					</button>	
				</jsfun-record>
			</view>
			<form v-if="goodsshape!=5 && goodsshape!=4" @submit="formSubmit" data-name="mycommTapTag" report-submit="true" style="width:20%;">
				<button class="sec-btn" formType="submit">
					<image class="icon-detail" src="../../static/images/bottom-comment.png"></image>
					<text>写评论</text>
				</button>
			</form>
			<form v-if="goodsshape!=5&&goodsshape!=4" @submit="formSubmit" data-name="wishcart" report-submit="true" style="width:24%;">
				<button class="sec-btn" formType="submit">
					<image class="icon-detail" src="../../static/images/bottom-unpraise.png"></image>
					<text>+心愿单</text>
				</button>  
			</form>
			<form v-if="goodsorg!=5" @submit="formSubmit" data-name="buyGift" report-submit="true" style="width:28%;">
				<button class="add-cart2" formType="submit">
					<text>+购物车</text>
				</button>  
			</form>
			<form v-if="has_cardpayed==0" @submit="formSubmit" data-name="buyMyself" report-submit="true" style="width:28%;">
				<button class="add-cart" formType="submit">{{(goodsshape==5||goodsshape==4)?'立即购买':'立即购买'}}</button>  
			</form>
			
			<form v-if="goodsorg==5 && has_cardpayed!=0" @submit="formSubmit" data-name="sharecard" report-submit="true" style="width:28%;">
				<button class="add-cart" formType="submit">
					<text>预览</text>
				</button>  
			</form>
		</view>
	</view>
	</view>
</view>
</template>
<script>
var util = require("utils/util.js");
var wxparse = require("wxParse/wxParse.js");
import uParse from '@/components/uParse/src/wxParse.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import jsfunRecord from '@/components/jsfun-record/jsfun-record.vue'
//import chunleiVideo  from '@/components/chunlei-video/chunlei-video.vue'
var weburl = getApp().globalData.weburl;
var shop_type = getApp().globalData.shop_type;
var from_page = getApp().globalData.from_page;
var userInfo = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : '';
var appid = getApp().globalData.appid;
var secret = getApp().globalData.secret;
var uploadurl = getApp().globalData.uploadurl;
const myaudio = uni.createInnerAudioContext();
/*
var webview_pages = getCurrentPages();  
var webview_page = webview_pages[webview_pages.length - 1];  
// #ifdef APP-PLUS  
var currentWebview = webview_page.$getAppWebview(); //页面栈最顶层就是当前webview  
// #endif
*/
// #ifdef APP-PLUS  
var video_cover_view=null;
// #endif

/*
const recorderManager = uni.getRecorderManager();
const recorder_options = {
  duration: 180 * 1000,
  //指定录音的时长，单位 ms
  sampleRate: 16000,
  //采样率
  numberOfChannels: 1,
  //录音通道数
  encodeBitRate: 96000,
  //编码码率
  format: 'mp3',
  //音频格式，有效值 aac/mp3
  frameSize: 50 //指定帧大小，单位 KB

};
*/
var card_color = [{
  id: "gray",
  title: "灰色",
  value: "#f2f2f2"
}, {
  id: "red",
  title: "红色",
  value: "#e34c55"
}, {
  id: "white",
  title: "白色",
  value: "#fff"
}, {
  id: "black",
  title: "黑色",
  value: "#333"
}, {
  id: "blue",
  title: "蓝色",
  value: "#6495ED"
}, {
  id: "yellow",
  title: "黄色",
  value: "#FFFF00"
}];

export default {
  data() {
    return {
      title_name: '详情',
      title_logo: '/static/images/footer-icon-05.png',
      share_title: '这个礼物真不错，来看看吧，要是你能送我就更好了~',
      card_blessing: '',
      card_content: '',
      share_desc: '送心礼物，开启礼物社交时代！',
      share_avatarUrl: weburl + '/uploads/avatar.png',
      share_goods_avatarUrl: weburl + '/uploads/avatar.png',
      nickname: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      user: null,
      userInfo: {},
      username: null,
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      page: 1,
      interval: 3000,
      duration: 300,
      circular: true,
      goodsname: '',
      goodsinfo: [],
      goodsprice: 0,
      goodssale: 0,
      goodsid: 0,
      goodsshape: 0,
      goodsdiscount: 100,
      discountinfo: '9折优惠券',
      sku_gov_price: 0,
      sku_earnest_price: 0,
      sku_sell_price: 0,
      sku_id: 0,
      commodityAttr: [],
      attrValueList: [],
      firstIndex: 0,
      cur_img_id: 0,
      image: '',
      image_pic: [],
      hideviewgoodsinfo: true,
      hideviewgoodspara: true,
      dkheight: 300,
      scrollTop: 0,
      scrollTop_init: 10,
      toView: 'red',
      hideviewgoodsinfoflag: true,
      hideviewgoodsparaflag: true,
      modalHidden: true,
      //是否隐藏对话框  
      dkcontent: '',
     // goodsPicsInfo: [],
      selectValueInfo: '',
      wishflag: 0,
      goodsinfoshowflag: 0,
      shop_type: shop_type,
      comm_list: [],
      image_save_count: 0,
      image_save_times: 0,
      is_buymyself: 0,
      buynum: 1,
      notehidden: true,
      cardregisterhidden: true,
      card_image_height: '750',
      card_image_w_h: '5/7',
      has_cardpayed: 0,
      openRecordingdis: "block",
      //显示录机图标
      shutRecordingdis: "none",
      //隐藏停止图标
      recordingTimeqwe: 0,
      //录音计时
      goodsmodel_count: 0,
      //商品属性加载计次数
      setInter: "",
      cardnamehidden: true,
      cardcelehidden: true,
      cardlovehidden: true,
      card_color: card_color,
      current_card_color: '#333',
      card_color_index: 0,
      card_register_img: weburl + '/uploads/card_register_share.png',
      card_register_title: '',
      card_register_content: '',
      register_start_date: util.getDateStr(new Date(), 0),
      register_end_date: util.getDateStr(new Date(), 3),
      register_start_time: util.getDateStr(new Date(), 0, 1),
      register_end_time: util.getDateStr(new Date(), 3, 1),
      action_start_date: util.getDateStr(new Date(), 3),
      action_end_date: util.getDateStr(new Date(), 6),
      action_start_time: util.getDateStr(new Date(), 3, 1),
      action_end_time: util.getDateStr(new Date(), 6, 1),
      card_register_lim: 0,
      card_register_fee: 0,
      card_register_addr: '',
      card_register_ownername: '',
      card_register_ownerwechat: '',
      card_register_right_str: '',
      card_register_right_picker: ['参与者可看', '管理者可看', '公开'],
      card_register_right_index: 0,
      card_register_reqid_picker: ['0无需证件', '1身份证', '2微信号', '3QQ号', '4邮箱', '5学号', '6工号'],
      card_register_reqid_index: 0,
      card_name_modal_title: '编辑内容',
      card_name_logo_image: '/images/img_upload_field.png',
      card_register_topic_image: weburl + '/uploads/card_default_topic.png',
      card_cele_topic_image: weburl + '/uploads/card_default_cele.png',
      default_image: '/images/img_upload_field.png',
      has_shlogo: false,
      has_registerdue: false,
      has_actionrdue: false,
      is_logo: "",
      new_img_arr: "",
      card_register_adv: "",
      card_love_logo: "",
      card_cele_logo: "",
      content: "",
      cur_img_share_id: "",
      is_card_name_name: "",
      is_card_name_title: "",
      is_card_name_phone: "",
      is_card_name_tel: "",
      is_card_name_email: "",
      is_card_name_website: "",
      is_card_name_publicwechat: "",
      is_card_name_addr: "",
      is_card_name_company: "",
      is_card_name_logo_image: "",
      is_card_name_qrcode: "",
      is_card_register_title: "",
      is_card_register_content: "",
      is_card_register_adv: "",
      is_card_register_logo: "",
      is_card_register_ownername: "",
      is_card_register_ownerwechat: "",
      is_card_register_addr: "",
      is_card_register_lim: "",
      is_card_register_fee: "",
      is_register_start_date: "",
      is_register_start_time: "",
      is_register_end_date: "",
      is_register_end_time: "",
      is_action_start_date: "",
      is_action_start_time: "",
      is_action_end_date: "",
      is_action_end_time: "",
      is_card_love_title: "",
      is_card_love_content: "",
      is_card_love_phone: "",
      is_card_love_related: "",
      is_card_love_addr: "",
      is_card_love_logo: "",
      is_card_love_qrcode: "",
      is_card_cele_title: "",
      is_card_cele_content: "",
      is_card_cele_logo: "",
      is_card_cele_qrcode: "",
      card_cele_title: "",
      card_cele_content: "",
      card_love_title: "",
      card_love_phone: "",
      card_love_related: "",
      card_love_addr: "",
      card_love_content: "",
      card_name_name: "",
      card_name_title: "",
      card_name_phone: "",
      card_name_tel: "",
      card_name_email: "",
      card_name_website: "",
      card_name_publicwechat: "",
      card_name_addr: "",
      card_name_company: "",
      card_name_note: "",
      inputShowed: false,
	  inputShowed2: false,
	  inputShowed3: false,
	  inputShowed4: false,
	  inputShowed5: false,
	  inputShowed6: false,
	  modalName:'',
      new_rec_url: "",
      is_apple: "",
      keyword: "",
      is_satisfy: "",
      rule_selected_info: "",
      has_actiondue: "",
      image_video: "",
      goodsorg: "",
      goodstag: "",
      card_type: "",
      refer_mid: "",
      marketprice: "",
      m_id: "",
      share_goods_qrcode: "",
      goodscoverimg: "",
      share_goods_wx_headimg: "",
      evalrate: "",
      card_image_w_rate: "",
      image_share: "",
      all_rows: "",
      sku_delivery_price: "",
      add_cart_title: "",
      carts: "",
      winHeight: 1100,
      winWidth: 380,
      secondIndex: "",
	  showVideo:false,
	  videoContext:null ,
	  video_type: 'video',
	  video_height:'630rpx',
	  video_index:0,
	  video_width:'',
	  video_oldIndex:0,
	  video_play_time:0 ,
	  video_muted:true,
	  video_autoplay:true,
    };
  },
  components: {
	 uParse,
	 uniPopup,
	 jsfunRecord,
	 //chunleiVideo,
  },

  onLoad: function (options) { //
    var that = this;
    var is_back = options.is_back ? options.is_back : 0;
    if (is_back == 1) options = wx.getStorageSync('details_options');
    var m_id = wx.getStorageSync('m_id') ? wx.getStorageSync('m_id') : 0;
    var phonemodel = wx.getStorageSync('phonemodel') ? wx.getStorageSync('phonemodel') : 'Andriod';
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    username = options.username ? options.username : username;
    var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
    var keyword = options.keyword ? options.keyword : '';
    var is_satisfy = options.is_satisfy ? options.is_satisfy : 0;
    var has_cardpayed = options.has_cardpayed ? options.has_cardpayed : 0;
    var rule_selected_info = options.rule_selected_info ? options.rule_selected_info : '';
    var goodsorg = options.goods_org ? options.goods_org : 1;
    var goodsshape = options.goods_shape ? options.goods_shape : 0;
    var goodstag = options.goods_tag ? options.goods_tag : '';
    //var goodsorg = options.goods_org ? options.goods_org : '';
    var card_type = options.card_type ? options.card_type : 0;
    var card_register_title = '';
    var card_register_content = '';
    var card_register_addr = '';
    var card_register_lim = 0;
    var card_register_fee = 0;
    var card_register_right_index = 0;
    var card_register_reqid_index = 0;
    var card_register_ownername = '';
    var card_register_ownerwechat = '';
    var card_register_adv = '';
    var card_content = '';
    var card_name_name = '';
    var card_name_title = '';
    var card_name_phone = '';
    var card_name_tel = '';
    var card_name_email = '';
    var card_name_website = '';
    var card_name_publicwechat = '';
    var card_name_addr = '';
    var card_name_company = '';
    var card_name_note = '';
    var card_name_logo_image = '';
    var card_cele_title = '';
    var card_cele_content = '';
    var card_cele_logo = '';
    var card_love_title = '';
    var card_love_content = '';
    var card_love_logo = '';
    var card_love_related = '';
    var card_love_phone = '';
    var card_love_addr = '';
    var has_shlogo = that.has_shlogo;
    var has_registerdue = that.has_registerdue;
    var has_actiondue = that.has_actiondue;
    var page = that.page;
    var scene = decodeURIComponent(options.scene);
    var goodsname = options.name;
    var goodsid = options.id;
    var share_goods_id = options.goodsid?options.goodsid:0;
    goodsid = goodsid ? goodsid : share_goods_id;
    var refer_mid = options.mid ? options.mid : 0; //分享人id
    var goodsinfo = options.goods_info ? options.goods_info : '';
    var goodsprice = options.goods_price;
    var marketprice = options.goods_marketprice;
    var goodssale = options.sale;
    var image = options.image;
    var activity_image = options.activity_image;
    var share_goods_image = activity_image ? activity_image : image;
    var shop_type = that.shop_type;
    var qr_type = 'wishshare';
    var image_video = [];
    var image_pic = [];
    var card_image_height = that.card_image_height ? that.card_image_height : '750';
    var card_image_w_rate = that.card_image_w_rate ? that.card_image_w_rate : 1;
    var card_register_prev = wx.getStorageSync('card_register_info');
    var card_name_prev = wx.getStorageSync('card_name_info');
    var card_cele_prev = wx.getStorageSync('card_cele_info');
    var card_love_prev = wx.getStorageSync('card_love_info');
    wx.setStorageSync('details_options', options);
	 
    if (card_register_prev) {
      var card_register_info = JSON.parse(card_register_prev);
      card_register_content = card_register_info['card_register_content'];
      card_register_title = card_register_info['card_register_title'];
      card_register_addr = card_register_info['card_register_addr'];
      card_register_lim = card_register_info['card_register_lim'];
      card_register_fee = card_register_info['card_register_fee'];
      card_register_right_index = card_register_info['card_register_right_index'];
      card_register_reqid_index = card_register_info['card_register_reqid_index'];
      card_register_ownername = card_register_info['card_register_ownername'];
      card_register_ownerwechat = card_register_info['card_register_ownerwechat'];
      card_register_adv = card_register_info['card_register_adv'] ? card_register_info['card_register_adv'] : that.card_register_topic_image;
      has_shlogo = card_register_info['has_shlogo'] ? card_register_info['has_shlogo'] : has_shlogo;
      has_registerdue = card_register_info['has_registerdue'] ? card_register_info['has_registerdue'] : has_registerdue;
      has_actiondue = card_register_info['has_actiondue'] ? card_register_info['has_actiondue'] : has_actiondue;
    }

    if (card_name_prev) {
      var card_name_info = JSON.parse(card_name_prev);
      card_name_name = card_name_info['card_name_name'];
      card_name_title = card_name_info['card_name_title'];
      card_name_phone = card_name_info['card_name_phone'];
      card_name_tel = card_name_info['card_name_tel'];
      card_name_email = card_name_info['card_name_email'];
      card_name_website = card_name_info['card_name_website'];
      card_name_publicwechat = card_name_info['card_name_publicwechat'];
      card_name_addr = card_name_info['card_name_addr'];
      card_name_company = card_name_info['card_name_company'];
      card_name_note = card_name_info['card_name_note'];
      card_name_logo_image = card_name_info['card_name_logo_image'];
      has_shlogo = card_name_info['has_shlogo'] ? card_name_info['has_shlogo'] : has_shlogo;
    }

    if (card_cele_prev) {
      var card_cele_info = JSON.parse(card_cele_prev);
      card_cele_title = card_cele_info['card_cele_title'];
      card_cele_content = card_cele_info['card_cele_content'];
      card_cele_logo = card_cele_info['card_cele_logo'];
      has_shlogo = card_cele_info['has_shlogo'] ? card_cele_info['has_shlogo'] : has_shlogo;
    }

    if (card_love_prev) {
      var card_love_info = JSON.parse(card_love_prev);
      card_love_title = card_love_info['card_love_title'];
      card_love_phone = card_love_info['card_love_phone'];
      card_love_addr = card_love_info['card_love_addr'];
      card_love_related = card_love_info['card_love_related'];
      card_love_content = card_love_info['card_love_content'];
      card_love_logo = card_love_info['card_love_logo'];
      has_shlogo = card_love_info['has_shlogo'] ? card_love_info['has_shlogo'] : has_shlogo;
    }

    console.log('detail options:', options, 'share_goods_id:', share_goods_id, 'card_type:', card_type, ' goodsshape:', goodsshape);
    that.setData({
      is_apple: phonemodel.indexOf("iPhone") >= 0 ? 1 : 0,
      image_save_count: 0,
      keyword: keyword,
      is_satisfy: is_satisfy,
      rule_selected_info: rule_selected_info,
      card_register_content: card_register_content ? card_register_content : '',
      card_register_title: card_register_title ? card_register_title : '',
      card_register_addr: card_register_addr ? card_register_addr : '',
      card_register_lim: card_register_lim ? card_register_lim : 0,
      card_register_fee: card_register_fee ? card_register_fee : 0,
      card_register_right_index: card_register_right_index ? card_register_right_index : 0,
      card_register_reqid_index: card_register_reqid_index ? card_register_reqid_index : 0,
      card_register_ownername: card_register_ownername ? card_register_ownername : '',
      card_register_ownerwechat: card_register_ownerwechat ? card_register_ownerwechat : '',
      card_register_adv: card_register_adv ? card_register_adv : '',
      has_registerdue: has_registerdue,
      has_actiondue: has_actiondue ? has_actiondue : false,
      card_content: card_content,
      card_image_height: card_image_height,
      card_name_name: card_name_name ? card_name_name : '',
      card_name_title: card_name_title ? card_name_title : '',
      card_name_phone: card_name_phone ? card_name_phone : '',
      card_name_tel: card_name_tel ? card_name_tel : '',
      card_name_email: card_name_email ? card_name_email : '',
      card_name_website: card_name_website ? card_name_website : '',
      card_name_publicwechat: card_name_publicwechat ? card_name_publicwechat : '',
      card_name_addr: card_name_addr ? card_name_addr : '',
      card_name_company: card_name_company ? card_name_company : '',
      card_name_note: card_name_note ? card_name_note : '',
      card_name_logo_image: card_name_logo_image ? card_name_logo_image : '',
      card_cele_title: card_cele_title ? card_cele_title : '',
      card_cele_content: card_cele_content ? card_cele_content : '',
      card_cele_logo: card_cele_logo ? card_cele_logo : '',
      card_love_title: card_love_title ? card_love_title : '',
      card_love_phone: card_love_phone ? card_love_phone : '',
      card_love_related: card_love_related ? card_love_related : '',
      card_love_addr: card_love_addr ? card_love_addr : '',
      card_love_content: card_love_content ? card_love_content : '',
      card_love_logo: card_love_logo ? card_love_logo : '',
      has_shlogo: has_shlogo ? has_shlogo : false
    });

    if (scene) {
      if (scene.indexOf("goodsid=") >= 0) {
        var goodsidReg = new RegExp(/(?=goodsid=).*?(?=\&)/);
        var midReg = new RegExp(/\&mid=(.*)/);
        var scene_goodsid = scene.match(goodsidReg)[0];
        goodsid = scene_goodsid ? scene_goodsid.substring(8, scene_goodsid.length) : goodsid; //m_id = scene.match(/mid=(.*)/)[1] //取 mid=后面所有字符串

        var scene_mid = scene.match(midReg) ? scene.match(midReg)[0] : 0;
        refer_mid = scene_mid ? scene_mid.substring(5, scene_mid.length) : refer_mid;
      }
    }

    if (image) {
      if (image.indexOf("%3A%2F%2F") >= 0) {
        image = decodeURIComponent(image);
        share_goods_image = activity_image ? activity_image : image;
        goodsname = decodeURIComponent(goodsname);
        goodsinfo = decodeURIComponent(goodsinfo);
      }
	 
	  var video_init ={}
      if (image.indexOf(".mp4") >= 0) {
        video_init = {
          id: 0,
          video_url: image,
          url: activity_image,
		  ext:'mp4',
		  content:'',
		  flag:true,
		  check:false,
		  like:'10w',
		  comment:'1045',
		  avater:'',
		  initialTime:0,
		  at:'',
		  duration:841,
		  short:true,//是否矮视频
		  objectFit:'fill'
        };
        image_video.push(video_init);
		that.image_video = image_video ;
      }
	
      var image_init = {
        id: 0,
        goods_id: goodsid,
        url: activity_image ? activity_image : image,
		video_url:'',
		ext:'png',
		content:'',
		flag:false,
		check:false,
		like:'10w',
		comment:'1045',
		avater:'',
		initialTime:0,
		at:'',
		duration:841,
		short:true,//是否矮视频
		objectFit:'fill'
      };
      image_init['url'] = image_init['url'].replace('/n11/', '/n12/'); // n12京东高清图片

      image_init['url'] = image_init['url'].replace('/n1/', '/n12/'); // n12京东高清图片
	  image_pic.push(image_init) ;
	  if(image_video.length > 0) image_pic = image_video.concat(image_pic);
	  that.image_pic = image_pic ;
	   
    }
	
    //that.showGoodspara();
    goodsinfo = goodsinfo == 'undefined' ? '' : goodsinfo;
    var share_goods_qrcode = weburl + '/api/WXPay/getQRCode?username=' + username + '&appid=' + appid + '&secret=' + secret + '&shop_type=' + shop_type + '&qr_type=' + qr_type + '&share_goods_id=' + goodsid + '&m_id=' + m_id;
    that.setData({
      goodsname: goodsname ? goodsname : '',
      goodsinfo: goodsinfo ? goodsinfo : '',
      goodsorg: goodsorg,
      goodsshape: goodsshape,
      goodstag: goodstag,
      card_type: card_type,
      goodsid: goodsid ? goodsid : 0,
      refer_mid: refer_mid,
      goodsprice: goodsprice ? goodsprice : 0,
      marketprice: marketprice ? marketprice : '',
      goodssale: goodssale ? goodssale : 0,
      m_id: m_id,
      share_goods_qrcode: share_goods_qrcode
    });
    that.image_save(share_goods_qrcode, 'goods_qrcode_cache_' + goodsid); // console.log('商品分享二维码下载缓存 goods_qrcode_cache_'+goodsid, 'share_goods_image:', share_goods_image)
   
    if (goodsid > 0) {
      if (share_goods_image) {
        that.image_save(share_goods_image, 'goods_image_cache_' + goodsid); // console.log('商品详情图片下载缓存 goods_image_cache_' + goodsid, share_goods_image)
      }

      wx.request({
        url: weburl + '/api/client/get_goods_list',
        method: 'POST',
        data: {
          username: options.username ? options.username : username,
          access_token: token,
          goods_id: goodsid,
          shop_type: shop_type
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          var goods_info = res.data.result;
          var ret_info = res.data.info;
          console.log('获取单个产品信息 res.data:', res.data, ' goods info:', goods_info);

          if (goods_info) {
            if (goods_info[0]['shape'] == 5) {
              card_content = that.card_blessing;
            } else if (goods_info[0]['shape'] == 4) {
              card_register_content = that.card_register_content;
              card_register_title = that.card_register_title;
            }

            var goodstag = goods_info[0]['goods_tag'];
            var card_type = goods_info[0]['card_type'] ? goods_info[0]['card_type'] : 0;

            if (card_type == 1 || card_type == 4 || goods_info[0]['shape'] == 5) {
              card_image_w_rate = '5/7';
              card_image_height = parseFloat(that.winWidth * 7 * 2 / 5);
            } else if (card_type == 2) {
              //card_image_height = '470'
              card_image_w_rate = '9/5';
              card_image_height = parseFloat(that.winWidth * 5 * 2 / 9);
            } else {
              card_image_height = '750'; //card_image_w_rate = '5/7'
              //card_image_height = parseFloat(that.winWidth*7*2/5)       
            }

			that.goodsshape = goods_info[0]['shape'],
            that.setData({
              goodsname: goods_info[0]['name'],
              goodsinfo: goods_info[0]['act_info'],
              goodstag: goods_info[0]['goods_tag'],
              goodsprice: goods_info[0]['sell_price'],
              marketprice: goods_info[0]['market_price'],
              goodssale: goods_info[0]['sale'],
              goodsorg: goods_info[0]['goods_org'],
             // goodsshape: goods_info[0]['shape'],
              goodstag: goods_info[0]['goods_tag'],
              card_type: card_type,
              goodscoverimg: goods_info[0]['activity_image'],
              share_title: goods_info[0]['3D_image'] ? goods_info[0]['3D_image'] : that.share_title,
              share_goods_wx_headimg: goods_info[0]['share_goods_wx_headimg']?goods_info[0]['share_goods_wx_headimg']:that.share_avatarUrl,
              goodsdiscount: goods_info[0]['discount'],
              discountinfo: goods_info[0]['discount_info'],
              evalrate: parseInt(goods_info[0]['evalrate']),
              card_content: card_content,
              card_register_content: card_register_content,
              card_register_title: card_register_title,
              card_image_height: card_image_height,
              card_image_w_rate: card_image_w_rate
            }); //var wx_headimg_cache = wx.getStorageSync('wx_headimg_cache')

            that.image_save(that.share_goods_wx_headimg, 'wx_headimg_cache'); //console.log('头像图片下载缓存 card_type:', card_type)

            setTimeout(function () {
              that.setData({
                cardnamehidden: card_type == 2 ? false : true,
                cardregisterhidden: card_type == 1 ? false : true,
                cardlovehidden: card_type == 4 ? false : true,
                cardcelehidden: card_type == 10 ? false : true
              });
            }, 800);
          } else {
            wx.showToast({
              title: '商品已下架',
              icon: 'loading',
              duration: 3000
            });
            setTimeout(function () {
              wx.navigateBack();
            }, 1500);
          }
        }
      });
    } else {
      console.log('单个产品名称为空', goodsid);
      return;
    } // 商品详情图片
    // console.log('商品详情图片', image_pic)

    wx.request({
      url: weburl + '/api/client/get_goodsdesc_list',
      method: 'POST',
      data: {
        username: username,
        access_token: token,
        goods_id: goodsid,
        refer_mid: refer_mid,
        //分享人id
        page: page,
        shop_type: shop_type,
        keyword: keyword,
        is_satisfy: is_satisfy,
        rule_selected_info: rule_selected_info
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        var goodsPicsInfo = res.data.result;
        //console.log('get_goodsdesc_list goodsPicsInfo:', goodsPicsInfo, ' template id:', goodsPicsInfo.image[0]['template_id']);
        var k = image ? 1 : 0;
        for (var i = k; i < goodsPicsInfo.image.length; i++) {
			goodsPicsInfo.image[i]['content']  = '' ;
			goodsPicsInfo.image[i]['flag']  = i==0?true:false ;
			goodsPicsInfo.image[i]['check']  = false ;
			goodsPicsInfo.image[i]['like']  = '10w' ;
			goodsPicsInfo.image[i]['comment']  = '1045' ;
			goodsPicsInfo.image[i]['avater']  = '' ;
			goodsPicsInfo.image[i]['initialTime']  = 0 ;
			goodsPicsInfo.image[i]['at']  = '' ;
			goodsPicsInfo.image[i]['duration']  = 841 ;
			goodsPicsInfo.image[i]['objectFit']  = 'fill' ;
			goodsPicsInfo.image[i]['short'] = true ;//是否矮视频
          if (goodsPicsInfo.image[i]['ext'] == 'mp4') {
				goodsPicsInfo.image[i]['video_url'] =  goodsPicsInfo.image[i]['url'] ;
				goodsPicsInfo.image[i]['url'] = share_goods_image ;
				image_video.push(goodsPicsInfo.image[i]);
          } else {
            if (goodsPicsInfo.image[i]['url'].indexOf("http") < 0) {
				goodsPicsInfo.image[i]['url'] = weburl + '/' + goodsPicsInfo.image[i]['url'];
            }
            goodsPicsInfo.image[i]['url'] = goodsPicsInfo.image[i]['url'].replace("http:", "https:");
            goodsPicsInfo.image[i]['video_url'] = '' ;
			image_pic.push(goodsPicsInfo.image[i]);
          }
        }
		if(image_video.length > 0){
			image_pic = image_video.concat(image_pic);
		}
		
        image_pic[0]['template_config'] = goodsPicsInfo.image[0]['template_config'];
		that.goodsPicsInfo = res.data.result ;
		that.image_pic = image_pic ;
		that.image_video = image_video ;
		that.image_share = goodsPicsInfo.share_image ;
		//that.showVideo = image_video.length > 0?true:false ;
		/*
		if( image_video.length > 0) {
			that.videoPlay(that.video_index) ;
			setTimeout(function () {
				this.videoContext = uni.createVideoContext('myVideo',this); // 
			}, 350);
		}
		*/
		//that.showVideo = false ;
	
        if (goodsPicsInfo.image[0]['template_id'] != 0) {
          //互动卡需要获取 图片模板信息
          that.swiperchange_cardname(0);
        }

        if (!share_goods_image) {
          that.image_save(image_pic[0]['url'], 'goods_image_cache_' + goodsid); // console.log('商品详情图片下载缓存 goods_image_cache_' + goodsid, image_pic[0]['url'])
        } 
		console.log('get_goodsdesc_list image_video:', that.image_video, ' image_pic:', image_pic)
        that.showGoodsinfo();
      }
    }); // 商品SKU

    wx.request({
      url: weburl + '/api/client/get_goodssku_list',
      method: 'POST',
      data: {
        username: username,
        access_token: token,
        goods_id: goodsid,
        shop_type: shop_type,
        page: page
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log('商品goods_sku:', res.data.result,' info:'+res.data.info);
        var attrValueList = res.data.result.spec_select_list ? res.data.result.spec_select_list : '';
        var commodityAttr = res.data.result.sku_list ? res.data.result.sku_list : '{}';
        if (!commodityAttr) return;

        for (var i = 0; i < commodityAttr.length; i++) {
          if (commodityAttr[i].attrValueStatus) {
            commodityAttr[i].attrValueStatus = true;
          } else {
            commodityAttr[i].attrValueStatus = false;
          }
        }

        that.setData({
          commodityAttr: commodityAttr
        });
        if (!attrValueList) return;

        for (var i = 0; i < attrValueList.length; i++) {
          if (!attrValueList[i].attrValueStatus) {
            attrValueList[i].attrValueStatus = true;
          }

          if (attrValueList[i].type == 2) {
            for (var k = 0; k < attrValueList[i].value.length; k++) {
              if (attrValueList[i].value[k].indexOf("http") < 0) {
                attrValueList[i].value[k] = weburl + '/' + attrValueList[i].value[k];
              }
            }
          }
        }

        that.setData({
          attrValueList: attrValueList
        });
      }
    }); // 商品评价

    wx.request({
      url: weburl + '/api/client/get_order_comment',
      method: 'POST',
      data: {
        username: username,
        access_token: token,
        goods_id: goodsid,
        query_type: 1,
        //1查商品所有评价 0查本人对商品的评价
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
          that.setData({
            comm_list: that.comm_list.concat(comm_list),
            all_rows: all_rows
          });
          console.log('获取订单评论信息:', comm_list, ' all rows:', all_rows);
        }
      }
    });
	if(that.goodsshape==5 || that.goodsshape==4){ //互动卡录音功能
	/*
		recorderManager.onStart(() => {
			console.log('recorder start');
			that.recording = true;
			recordTimeInterval = setInterval(() => {
				that.recordTime += 1;
				that.formatedRecordTime = util.formatTime(that.recordTime);
			}, 1000)
		});
			
		recorderManager.onStop((res) => {
			console.log('on stop');
			music.src = res.tempFilePath;
			that.hasRecord = true;
			that.recording = false;
		});
			
		recorderManager.onError(() => {
			console.log('recorder onError');
		});
		*/
	}
  },
  onShow: function () {
    var that = this;
	wx.getSystemInfo({
	  success: function (res) {
	    if (res.platform == "ios") {
	      var version = res.SDKVersion;
		  /*
	     uni.setInnerAudioOption({
	       obeyMuteSwitch: false
	     });
		 */
	    }
	
	    let winHeight = res.windowHeight;
	    let winWidth = res.windowWidth;
	    console.log('detail getSystemInfo:', res);
	    that.setData({
	      dkheight: winHeight - winHeight * 0.05 - 100,
	      winHeight: winHeight,
	      winWidth: winWidth,
	    });
		that.video_height = '630rpx'  ;
		that.video_width = `${winWidth}px`  ;
		
	    wx.setStorageSync('systeminfo', res.system);
	    wx.setStorageSync('phonemodel', res.model);
	  }
	});
	
  },
  onReady: function () {
	//#ifdef APP-PLUS
	plus.screen.lockOrientation("portrait-primary")
	//#endif
  },
  onHide:function() {
  	for (let item of this.image_pic) {
  		item.flag = false
  	}
  },
  onShareAppMessage: function () {
    var that = this;
    var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
    var share_goods_id = that.goodsid;
    var share_goods_image = that.image_pic[0]['url'];
    var share_goods_title = that.share_title;
    var share_goods_desc = that.share_desc;
    var m_id = that.m_id > 0 ? that.m_id : 0;
    var scene = 'goodsid=' + that.goodsid + '&mid=' + m_id;
    return {
      title: share_goods_title,
      desc: share_goods_desc,
      imageUrl: share_goods_image,
      path: '/pages/details/details?id=' + share_goods_id + '&image=' + share_goods_image + '&refername=' + username // path: '/pages/details/details?scene=' + encodeURIComponent(scene)
    };
  },
  mounted() {
  	
  },
  methods: {
	  
	 /*
	switchTtype: function (type) {
	  	this.video_type = type;
		if(this.image_pic.length>0 && this.image_video.length>0){
			this.showVideo = !this.showVideo ;
			if(this.video_type=='video'){
				this.showVideo = true;
			}else{
				this.showVideo = false;
			}
		}
		console.log(' video type:',type,' swiper video:',this.video_index);
	},
	*/
    bindPickerChange_card_color: function (e) {
      var that = this;
      var card_color = that.card_color;
      var card_color_index = e.detail.value;
      console.log('picker发送选择改变，携带值为', e.detail.value, card_color[card_color_index]['value']);
      that.setData({
        //给变量赋值
        current_card_color: card_color[card_color_index]['value'],
        card_color_index: card_color_index
      });
    },
   
    formSubmit: function (e) {
      var that = this;
      //var formId = e.detail.formId;
      var form_name = e.currentTarget.dataset.name;
      console.log('formSubmit() form name:', form_name);

      if (form_name == 'buyGift') {
        that.buyGift();
      } else if (form_name == 'buyMyself') {
        that.buyMyself();
      } else if (form_name == 'mycardregister') {
        that.upimg();
      } else if (form_name == 'wishcart') {
        that.setData({
          is_buymyself: 0
        });
        that.wishCart();
      } else if (form_name == 'mycommTapTag') {
        that.setData({
          is_buymyself: 0
        });
        that.mycommTapTag();
      } else if (form_name == 'myblessing') {
        that.myblessing();
      } else if (form_name == 'card_register') {
        that.card_register();
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
        success: function (res) {// console.log('submintFromId() update success: ', res.data)
        }
      });
    },
    upimg: function (e) {
      var that = this;
      var is_logo = e.currentTarget.dataset.logo ? e.currentTarget.dataset.logo : 0;
      var new_img_arr = '';
      that.setData({
        is_logo: is_logo
      });
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            new_img_arr: res.tempFilePaths
          });
          console.log('本次上传图片:', that.new_img_arr, res.tempFilePaths);
          that.upload();
        }
      });
    },
    cancel_upimg: function (e) {
      var that = this;
      var is_logo = e.currentTarget.dataset.logo ? e.currentTarget.dataset.logo : 0;
      console.log('cancel_upimg:', is_logo);

      if (is_logo == 1) {
        that.setData({
          card_name_logo_image: ''
        });
      } else if (is_logo == 2) {
        that.setData({
          card_register_adv: ''
        });
      } else if (is_logo == 4) {
        that.setData({
          card_love_logo: ''
        });
      } else if (is_logo == 10) {
        that.setData({
          card_cele_logo: ''
        });
      }
    },
    upload: function () {
      var that = this;
      var goods_id = that.goodsid;
      var new_img_arr = that.new_img_arr[0]; //本次上传图片的手机端文件地址
	  var uploader_type = 'xcx_goods_cardregister' ;
      var image_pic = that.image_pic;
      var is_logo = that.is_logo;

      if (new_img_arr) {
        wx.uploadFile({
          url: uploadurl,
          filePath: new_img_arr,
          name: 'wechat_upimg',
          formData: {
            latitude: encodeURI(0.0),
            longitude: encodeURI(0.0),
            type: encodeURI(uploader_type),
            city: encodeURI('杭州'),
            prov: encodeURI('浙江'),
            name: encodeURI(goods_id) // 名称

          },
          // HTTP 请求中其他额外的 form data
          success: function (res) {
            var retinfo = JSON.parse(res.data.trim()); 
			console.log('upimg upload url:', retinfo['result']['img_url'])

            if (retinfo['status'] == "y") {
              if (is_logo == 1) {
                //logo 处理
                that.image_save(retinfo['result']['img_url'], 'card_name_logo_image');
                that.setData({
                  card_name_logo_image: retinfo['result']['img_url']
                });
              } else if (is_logo == 2) {
                that.setData({
                  card_register_adv: retinfo['result']['img_url']
                });
              } else if (is_logo == 4) {
                that.setData({
                  card_love_logo: retinfo['result']['img_url']
                });
              } else if (is_logo == 10) {
                that.setData({
                  card_cele_logo: retinfo['result']['img_url']
                });
              } else {
                var new_image_pic = [];
                that.image_save(retinfo['result']['img_url'], 'myregistercard_image');
                var myregistercard_image = wx.getStorageSync('myregistercard_image');
                var new_image_pic = {
                  id: goods_id,
                  goods_id: goods_id,
                  url: retinfo['result']['img_url']
                };
                image_pic.push(new_image_pic);
                setTimeout(function () {
                  that.setData({
                    image_pic: image_pic
                  });
                }, 3000);
                console.log('图片上传完成:', new_image_pic, image_pic);
              }
            } else {
              wx.showToast({
                title: '图片加载失败，请再试一次',
                icon: none,
                duration: 2000
              });
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
        that.setData({
          content: '图片:'
        });
      }
    },
    goBack: function () {
      var pages = getCurrentPages(); // console.log('details goBack pages:', pages)

      if (pages.length > 1) {
        wx.navigateBack({
          changed: true
        }); //返回上一页
      } else {
        getApp().globalData.from_page = '/pages/details/details';
        getApp().globalData.hall_gotop = 1;
        wx.switchTab({
          url: '/pages/hall/hall'
        });
      }
    },
    commTapTag: function () {
      var that = this;
      wx.navigateTo({
        url: '../goods/commentlist/commentlist?goods_id=' + that.goodsid
      });
    },
    mycommTapTag: function () {
      var that = this;
      var goods_skuid = that.commodityAttr[0]['id'];
      var goods_id = that.goodsid;
      wx.navigateTo({
        url: '../goods/comment/comment?goods_id=' + goods_id + '&goods_skuid=' + goods_skuid + '&comm_type=' + 1
      });
    },
    returnTapTag: function () {
      var that = this;
      wx.switchTab({
        url: '/pages/cart/cart'
      });
    },
	
	timeupdate: function(event){
		var duration = event.detail.duration
		if(this.video_play_time>=duration) this.video_play_time=0
		this.video_play_time = event.detail.currentTime
	},
	
	videoPlay: function(){
		let index = this.cur_img_id?this.cur_img_id:0 ;
		if(this.image_video.length==0) return ;
		this.image_pic[index].flag = !this.image_pic[index].flag ;
		
		if(this.image_pic[index].flag){
			this.videoContext.play(); 
			//this.videoContext.seek(1);
		}else{
			this.videoContext.pause();
			this.showVideo = false ;
		}
		console.log('click videoPlay cur_img_id: ',index,this.image_pic[index].flag)
	},
	
	pauseVideo: function(){
		console.log('pause Video video_play_time:',this.video_play_time,this.cur_img_id)
		if(typeof this.image_pic[this.cur_img_id].initialTime !='undefined') {
			this.image_pic[this.cur_img_id].initialTime = this.video_play_time ;
		}
		//this.showVideo = false ;
	},
	videoEnd: function(){
		console.log('End Video video_play_time:',this.video_play_time,this.cur_img_id)
		this.showVideo = false ;
		 
		//#ifdef APP-PLUS
		video_cover_view.close() ;
		//#endif
		 
	},
	videoVoice: function(){
		console.log('Open Voice of Video video_play_time:',this.video_play_time,this.cur_img_id)
		this.video_muted = !this.video_muted ;
		this.image_pic[this.cur_img_id].initialTime = this.video_play_time ;
		this.videoContext = uni.createVideoContext('myVideo',this)
		this.videoContext.play(); 
		//#ifdef APP-PLUS
		video_cover_view.close() ;
		//#endif
		 
	},
	/*
	clickVideo(e){
		this.image_pic[this.cur_img_id].flag = !this.image_pic[this.cur_img_id].flag
		console.log('click video:',this.cur_img_id,this.cur_img_id.flag)
		//return
	},
	animateTranslateX(){
		let num= this.image_pic[this.cur_img_id].dubbedText.length*9
		timer=setInterval(()=>{
			this.translateX--
			if(this.translateX==-(num+35)){
				this.translateX=num
			}
		},100)
		
	},
	ListTouchStart(e) {
		this.listTouchStartY = e.changedTouches[0].pageY
		this.listTouchStartX = e.changedTouches[0].pageX
		this.moverOnoff=false
			
	},
	ListTouchMove(e) {
		this.listTouchDirection = this.listTouchStartY - e.changedTouches[0].pageY > 10 ? -1 : 0
		this.listTouchDirection = e.changedTouches[0].pageY - this.listTouchStartY > 10 ?  1 : this.listTouchDirection
		const distance = this.distance + e.changedTouches[0].pageY - this.listTouchStartY
		if(distance>0) return
		if(Math.abs(this.listTouchStartY - e.changedTouches[0].pageY)<2){
			this.listTouchDirection = null
		}
	},
	ListTouchEnd(e) {
		try{
			this.image_pic[this.cur_img_id].flag = !this.image_pic[this.cur_img_id].flag
			this.translateX=10
		}catch(e){
		}
		if(this.scroll) return
		if(!this.listTouchDirection){
			return
		}
		const destination = this.listTouchDirection*this.sysheight+this.distance
		if(destination>0||destination<-this.sysheight*(this.image_pic.length-1)) return
		for (let item of this.image_pic) {
			item.flag = false
		}
		this.animate(destination, this.listTouchDirection)
		this.cur_img_id = this.cur_img_id - this.listTouchDirection
		this.image_pic[this.cur_img_id].flag = true
		this.listTouchDirection = null
	},
	animate(des, direc) {
		let { distance } = this
		let promise = new Promise((resolve,reject)=>{
			this.scroll = true
			const temp = setInterval(() => {
				if ((direc === -1 && des < distance) || (direc === 1 && des > distance)) {
					distance += 100 * direc
					this.containerStyle = `transform:translateY(${distance}px)`
				} else {
					clearInterval(temp)
					distance = des
					this.distance = des
					this.containerStyle = `transform:translateY(${distance}px)`
					this.scroll = false
					resolve()
				}
			}, 50)
		})
		return promise
	},
	*/
    swiperchangevideo: function (e) {
      var that = this;
	  that.video_oldIndex = that.video_index;
      var video_index = e.detail.current; 
	  
	  for (let item of that.image_video) {
	  	item.flag = false
	  }
	  that.image_video[video_index].flag = !that.image_video[video_index].flag ;
	  that.video_index = video_index ;
   
	 //console.log('detail swiperchange:', e.detail.current, 'cur_img_id:',cur_img_id, ' image pic:',that.image_pic[cur_img_id])
    },
	swiperchange: function (e) {
	  var that = this;
	  var cur_img_id = e.detail.current;  //e.detail.current; 
	 console.log('detail swiperchange:', e.detail.current, 'cur_img_id:',cur_img_id, ' image pic:',that.image_pic[cur_img_id])
	  for (let item of that.image_pic) {
	  	item.flag = false
	  }
	  that.image_pic[cur_img_id].flag = !that.image_pic[cur_img_id].flag ;
	  that.cur_img_id = cur_img_id ;
	  if(that.image_pic[cur_img_id].video_url=='') that.showVideo = false ;
	   
	  that.swiperchange_cardname(cur_img_id);
	 //console.log('detail swiperchange:', val, 'cur_img_id:',cur_img_id, ' image pic:',that.image_pic[cur_img_id])
	},
    swiperchange_share: function (e) {
      var that = this;
      var cur_img_share_id = e.detail.current; //console.log(e)

      that.setData({
        cur_img_share_id: cur_img_share_id
      }); //console.log('detail swiperchange_share:', e.detail.current, 'cur_img_share_id:',cur_img_share_id)
    },
    swiperchange_cardname: function (cur_img_id) {
      var that = this;
      var image_pic = that.image_pic;
      var template_config = image_pic[cur_img_id] ? image_pic[cur_img_id]['template_config'] : '';
      var card_type = that.card_type;
      var is_card_cele_title = false;
      var is_card_cele_content = false;
      var is_card_cele_logo = false;
      var is_card_cele_qrcode = false;
      var is_card_love_title = false;
      var is_card_love_related = false;
      var is_card_love_phone = false;
      var is_card_love_addr = false;
      var is_card_love_content = false;
      var is_card_love_logo = false;
      var is_card_love_qrcode = false;
      var is_card_name_name = false;
      var is_card_name_title = false;
      var is_card_name_phone = false;
      var is_card_name_tel = false;
      var is_card_name_email = false;
      var is_card_name_website = false;
      var is_card_name_publicwechat = false;
      var is_card_name_addr = false;
      var is_card_name_company = false;
      var is_card_name_logo_image = false;
      var is_card_name_qrcode = false;
      var is_card_register_title = false;
      var is_card_register_content = false;
      var is_card_register_adv = false;
      var is_card_register_logo = false;
      var is_card_register_ownername = false;
      var is_card_register_ownerwechat = false;
      var is_card_register_addr = false;
      var is_card_register_lim = false;
      var is_card_register_fee = false;
      var is_register_start_date = false;
      var is_register_start_time = false;
      var is_register_end_date = false;
      var is_register_end_time = false;
      var is_action_start_date = false;
      var is_action_start_time = false;
      var is_action_end_date = false;
      var is_action_end_time = false;
      console.log('detail swiperchange_cardname card_type:', card_type, 'template_config:', template_config);

      if (template_config && card_type == 2) {
        for (var i = 0; i < template_config.length; i++) {
          //console.log('detail swiperchange_cardname template_config i:', template_config[i])
          if (template_config[i]['typeId'] == 'card_name') {
            is_card_name_name = true;
          } else if (template_config[i]['typeId'] == 'card_title') {
            is_card_name_title = true;
          } else if (template_config[i]['typeId'] == 'card_phone') {
            is_card_name_phone = true;
          } else if (template_config[i]['typeId'] == 'card_tel') {
            is_card_name_tel = true;
          } else if (template_config[i]['typeId'] == 'card_email') {
            is_card_name_email = true;
          } else if (template_config[i]['typeId'] == 'card_weburl') {
            is_card_name_website = true;
          } else if (template_config[i]['typeId'] == 'card_publicwechat') {
            is_card_name_publicwechat = true;
          } else if (template_config[i]['typeId'] == 'card_addr') {
            is_card_name_addr = true;
          } else if (template_config[i]['typeId'] == 'card_companyname') {
            is_card_name_company = true;
          } else if (template_config[i]['typeId'] == 'card_logo') {
            is_card_name_logo_image = true;
          } else if (template_config[i]['typeId'] == 'card_qrcode') {
            is_card_name_qrcode = true;
          }
        }

        that.setData({
          is_card_name_name: is_card_name_name,
          is_card_name_title: is_card_name_title,
          is_card_name_phone: is_card_name_phone,
          is_card_name_tel: is_card_name_tel,
          is_card_name_email: is_card_name_email,
          is_card_name_website: is_card_name_website,
          is_card_name_publicwechat: is_card_name_publicwechat,
          is_card_name_addr: is_card_name_addr,
          is_card_name_company: is_card_name_company,
          is_card_name_logo_image: is_card_name_logo_image,
          is_card_name_qrcode: is_card_name_qrcode
        });
      } else if (template_config && card_type == 1) {
        for (var i = 0; i < template_config.length; i++) {
          //console.log('detail swiperchange_cardname template_config i:', template_config[i])
          if (template_config[i]['typeId'] == 'card_register_title') {
            is_card_register_title = true;
          } else if (template_config[i]['typeId'] == 'card_register_content') {
            is_card_register_content = true;
          } else if (template_config[i]['typeId'] == 'card_register_adv') {
            is_card_register_adv = true;
          } else if (template_config[i]['typeId'] == 'card_register_logo') {
            is_card_register_logo = true;
          } else if (template_config[i]['typeId'] == 'card_register_ownername') {
            is_card_register_ownername = true;
          } else if (template_config[i]['typeId'] == 'card_register_ownerwechat') {
            is_card_register_ownerwechat = true;
          } else if (template_config[i]['typeId'] == 'card_register_addr') {
            is_card_register_addr = true;
          } else if (template_config[i]['typeId'] == 'card_register_lim') {
            is_card_register_lim = true;
          } else if (template_config[i]['typeId'] == 'card_register_fee') {
            is_card_register_fee = true;
          } else if (template_config[i]['typeId'] == 'register_start_date') {
            is_register_start_date = true;
          } else if (template_config[i]['typeId'] == 'register_start_time') {
            is_register_start_time = true;
          } else if (template_config[i]['typeId'] == 'register_end_date') {
            is_register_end_date = true;
          } else if (template_config[i]['typeId'] == 'register_end_time') {
            is_register_end_time = true;
          } else if (template_config[i]['typeId'] == 'action_start_date') {
            is_action_start_date = true;
          } else if (template_config[i]['typeId'] == 'action_start_time') {
            is_action_start_time = true;
          } else if (template_config[i]['typeId'] == 'action_end_date') {
            is_action_end_date = true;
          } else if (template_config[i]['typeId'] == 'action_end_time') {
            is_action_end_time = true;
          }
        }

        that.setData({
          is_card_register_title: is_card_register_title,
          is_card_register_content: is_card_register_content,
          is_card_register_adv: is_card_register_adv,
          is_card_register_logo: is_card_register_logo,
          is_card_register_ownername: is_card_register_ownername,
          is_card_register_ownerwechat: is_card_register_ownerwechat,
          is_card_register_addr: is_card_register_addr,
          is_card_register_lim: is_card_register_lim,
          is_card_register_fee: is_card_register_fee,
          is_register_start_date: is_register_start_date,
          is_register_start_time: is_register_start_time,
          is_register_end_date: is_register_end_date,
          is_register_end_time: is_register_end_time,
          is_action_start_date: is_action_start_date,
          is_action_start_time: is_action_start_time,
          is_action_end_date: is_action_end_date,
          is_action_end_time: is_action_end_time
        });
        console.log('detail swiperchange_card name is_card_register_title:', is_card_register_title, ' is_card_register_logo:', is_card_register_logo);
      } else if (template_config && card_type == 4) {
        for (var i = 0; i < template_config.length; i++) {
          //console.log('detail swiperchange_cardname template_config i:', template_config[i])
          if (template_config[i]['typeId'] == 'card_love_title') {
            is_card_love_title = true;
          } else if (template_config[i]['typeId'] == 'card_love_content') {
            is_card_love_content = true;
          } else if (template_config[i]['typeId'] == 'card_love_phone') {
            is_card_love_phone = true;
          } else if (template_config[i]['typeId'] == 'card_love_related') {
            is_card_love_related = true;
          } else if (template_config[i]['typeId'] == 'card_love_addr') {
            is_card_love_addr = true;
          } else if (template_config[i]['typeId'] == 'card_love_logo') {
            is_card_love_logo = true;
          } else if (template_config[i]['typeId'] == 'card_love_qrcode') {
            is_card_love_qrcode = true;
          }
        }

		that.is_card_love_logo = is_card_love_logo 
		 
        that.setData({
          is_card_love_title: is_card_love_title,
          is_card_love_content: is_card_love_content,
          is_card_love_phone: is_card_love_phone,
          is_card_love_related: is_card_love_related,
          is_card_love_addr: is_card_love_addr,
          //is_card_love_logo: is_card_love_logo,
          is_card_love_qrcode: is_card_love_qrcode
        });
		console.log('detail swiperchange_card name is_card_love_title:', that.is_card_love_title, ' is_card_love_logo:', that.is_card_love_logo);
      } else if (template_config && card_type == 10) {
        for (var i = 0; i < template_config.length; i++) {
          //console.log('detail swiperchange_cardname template_config i:', template_config[i])
          if (template_config[i]['typeId'] == 'card_cele_title') {
            is_card_cele_title = true;
          } else if (template_config[i]['typeId'] == 'card_cele_content') {
            is_card_cele_content = true;
          } else if (template_config[i]['typeId'] == 'card_cele_logo') {
            is_card_cele_logo = true;
          } else if (template_config[i]['typeId'] == 'card_cele_qrcode') {
            is_card_cele_qrcode = true;
          }
        }

        that.setData({
          is_card_cele_title: is_card_cele_title,
          is_card_cele_content: is_card_cele_content,
          is_card_cele_logo: is_card_cele_logo,
          is_card_cele_qrcode: is_card_cele_qrcode
        });
        console.log('detail swiperchange_cardname is_card_cele_content:', is_card_cele_content);
      }
    },
    card_cele_titleTapTag: function (e) {
      var that = this;
      var card_cele_title = util.filterEmoji(e.detail.value);
      that.setData({
        card_cele_title: card_cele_title
      });
    },
    card_cele_contentTapTag: function (e) {
      var that = this;
      var card_cele_content = util.filterEmoji(e.detail.value);
      that.setData({
        card_cele_content: card_cele_content
      });
    },
    card_love_titleTapTag: function (e) {
      var that = this;
      var card_love_title = util.filterEmoji(e.detail.value);
      that.setData({
        card_love_title: card_love_title
      });
    },
    card_love_phoneTapTag: function (e) {
      var that = this;
      var card_love_phone = util.filterEmoji(e.detail.value);
      that.setData({
        card_love_phone: card_love_phone
      });
    },
    card_love_relatedTapTag: function (e) {
      var that = this;
      var card_love_related = util.filterEmoji(e.detail.value);
      that.setData({
        card_love_related: card_love_related
      });
    },
    card_love_addrTapTag: function (e) {
      var that = this;
      var card_love_addr = util.filterEmoji(e.detail.value);
      that.setData({
        card_love_addr: card_love_addr
      });
    },
    card_love_contentTapTag: function (e) {
      var that = this;
      var card_love_content = util.filterEmoji(e.detail.value);
      that.setData({
        card_love_content: card_love_content
      });
    },
    card_name_nameTapTag: function (e) {
      var that = this;
      var card_name_name = util.filterEmoji(e.detail.value);
	  that.card_name_name = card_name_name
    },
    card_name_titleTapTag: function (e) {
      var that = this;
      var card_name_title = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_title: card_name_title
      });
    },
    card_name_phoneTapTag: function (e) {
      var that = this;
      var card_name_phone = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_phone: card_name_phone
      });
    },
    card_name_telTapTag: function (e) {
      var that = this;
      var card_name_tel = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_tel: card_name_tel
      });
    },
    card_name_emailTapTag: function (e) {
      var that = this;
      var card_name_email = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_email: card_name_email
      });
    },
    card_name_websiteTapTag: function (e) {
      var that = this;
      var card_name_website = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_website: card_name_website
      });
    },
    card_name_publicwechatTapTag: function (e) {
      var that = this;
      var card_name_publicwechat = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_publicwechat: card_name_publicwechat
      });
    },
    card_name_addrTapTag: function (e) {
      var that = this;
      var card_name_addr = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_addr: card_name_addr
      });
    },
    card_name_companyTapTag: function (e) {
      var that = this;
      var card_name_company = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_company: card_name_company
      });
    },
    cardnameNoteTextAreaBlur: function (e) {
      var that = this;
      var card_name_note = util.filterEmoji(e.detail.value);
      that.setData({
        card_name_note: card_name_note
      });
      that.confirmcardinput();
    },
    cardRegisterTextAreaBlur: function (e) {
      var that = this;
      var card_register_content = util.filterEmoji(e.detail.value);
      that.setData({
        card_register_content: card_register_content
      });
    },
    cardregistertitleTapTag: function (e) {
      var that = this;
      var card_register_title = util.filterEmoji(e.detail.value);
      that.setData({
        card_register_title: card_register_title
      });
    },
    cardregisterLimTapTag: function (e) {
      var that = this;
      var card_register_lim = e.detail.value;
      card_register_lim.replace('不限', '');
      that.setData({
        card_register_lim: card_register_lim
      });
      console.log('card_register_lim:', that.card_register_lim);
    },
    cardregisterFeeTapTag: function (e) {
      var that = this;
      that.setData({
        card_register_fee: e.detail.value
      });
    },
    cardregisterAddrTapTag: function (e) {
      var that = this;
      var card_register_addr = util.filterEmoji(e.detail.value);
      that.setData({
        card_register_addr: card_register_addr
      });
    },
    cardregisterOwnerNameTapTag: function (e) {
      var that = this;
      var card_register_ownername = util.filterEmoji(e.detail.value);
      that.setData({
        card_register_ownername: card_register_ownername
      });
    },
    cardregisterOwnerWechatTapTag: function (e) {
      var that = this;
      var card_register_ownerwechat = util.filterEmoji(e.detail.value);
      that.setData({
        card_register_ownerwechat: card_register_ownerwechat
      });
    },
    //确定按钮点击事件 
    shareConfirmCardCele: function () {
      var that = this;
      that.setData({
        cardcelehidden: !that.cardcelehidden
      });
      that.confirmcardinput();
    },
    //取消按钮点击事件  
    shareCandelCardCele: function () {
      var that = this;
      that.setData({
        cardcelehidden: !that.cardcelehidden
      });
    },
    //确定按钮点击事件 
    confirmcardinput: function () {
      var that = this;
      var card_type = that.card_type;
      var is_buymyself = that.is_buymyself;

      if (card_type == 1) {
        var card_register_info = [{
          card_color: that.current_card_color,
          card_register_title: that.card_register_title,
          card_register_content: that.card_register_content,
          card_register_adv: that.card_register_adv,
          image: that.card_register_img,
          register_start_date: that.register_start_date,
          register_end_date: that.register_end_date,
          register_end_date: that.register_end_date,
          register_start_time: that.register_start_time,
          register_end_time: that.register_end_time,
          action_start_date: that.action_start_date,
          action_end_date: that.action_end_date,
          action_start_time: that.action_start_time,
          action_end_time: that.action_end_time,
          card_register_lim: that.card_register_lim,
          card_register_fee: that.card_register_fee,
          card_register_addr: that.card_register_addr,
          card_register_ownername: that.card_register_ownername,
          card_register_ownerwechat: that.card_register_ownerwechat,
          card_register_right_index: that.card_register_right_index,
          card_register_reqid_index: that.card_register_reqid_index,
          has_shlogo: that.has_shlogo,
          has_registerdue: that.has_registerdue,
          has_actiondue: that.has_actiondue
        }];
        uni.setStorageSync('card_register_info', JSON.stringify(card_register_info[0]));
        console.log('card_register_info:', wx.getStorageSync('card_register_info'));
      } else if (card_type == 2) {
        var card_name_info = [{
          card_name_name: that.card_name_name,
          card_name_title: that.card_name_title,
          card_name_phone: that.card_name_phone,
          card_name_tel: that.card_name_tel,
          card_name_email: that.card_name_email,
          card_name_website: that.card_name_website,
          card_name_publicwechat: that.card_name_publicwechat,
          card_name_addr: that.card_name_addr,
          card_name_company: that.card_name_company,
          card_name_logo_image: that.card_name_logo_image,
          card_name_note: that.card_name_note,
          has_shlogo: that.has_shlogo
        }];
        uni.setStorageSync('card_name_info', JSON.stringify(card_name_info[0]));
        console.log('card_name_info:', wx.getStorageSync('card_name_info'));
      } else if (card_type == 4) {
        var card_love_info = [{
          card_love_title: that.card_love_title,
          card_love_phone: that.card_love_phone,
          card_love_related: that.card_love_related,
          card_love_addr: that.card_love_addr,
          card_love_content: that.card_love_content,
          card_love_logo: that.card_love_logo,
          has_shlogo: that.has_shlogo
        }];
        uni.setStorageSync('card_love_info', JSON.stringify(card_love_info[0]));
        console.log('card_love_info:', wx.getStorageSync('card_love_info'));
      } else if (card_type == 10) {
        var card_cele_info = [{
          card_cele_title: that.card_cele_title,
          card_cele_content: that.card_cele_content,
          card_cele_logo: that.card_cele_logo,
          has_shlogo: that.has_shlogo
        }];
        uni.setStorageSync('card_cele_info', JSON.stringify(card_cele_info[0]));
        console.log('card_cele_info:', wx.getStorageSync('card_cele_info'));
      }

      that.setData({
        inputShowed: false,
        goodsmodel_count: 0
      });

      if (is_buymyself == 1) {
        that.goodsmodel();
      }
    },
    bindChangeStartDate: function (e) {
      var that = this;
      var start_date = e.detail.value;
      that.setData({
        register_start_date: start_date
      });
      console.log('register_start_date:' + that.register_start_date);
    },
    bindChangeStartTime: function (e) {
      var that = this;
      var start_time = e.detail.value;
      that.setData({
        register_start_time: start_time
      });
      console.log('register_start_time:' + that.register_start_time);
    },
    bindChangeEndDate: function (e) {
      var that = this;
      var end_date = e.detail.value;
      var end_time = that.register_end_time + ":00";
      var diff_start_time = that.register_start_date + ' ' + that.register_start_time + ':00';
      var diff_end_time = end_date + ' ' + end_time;
      var diff = util.calDateDiff(diff_start_time, diff_end_time);

      if (diff > 0) {
        that.setData({
          register_end_date: end_date
        });
      } else {
        wx.showToast({
          title: "结束时间小于开始时间",
          icon: 'none',
          duration: 1500
        });
      }

      console.log('register_end_date:', that.register_end_date, diff_start_time, diff_end_time);
    },
    bindChangeEndTime: function (e) {
      var that = this;
      var end_time = e.detail.value;
      var end_date = that.register_end_date;
      var diff_start_time = that.register_start_date + ' ' + that.register_start_time + ':00';
      var diff_end_time = end_date + ' ' + end_time + ':00';
      var diff = util.calDateDiff(diff_start_time, diff_end_time);

      if (diff > 0) {
        that.setData({
          register_end_time: end_time
        });
      } else {
        uni.showToast({
          title: "结束时间小于开始时间",
          icon: 'none',
          duration: 1500
        });
      }

      console.log('register_end_time:' + that.register_end_time, diff_start_time, diff_end_time);
    },
    bindChangeActStartDate: function (e) {
      var that = this;
      var start_date = e.detail.value;
      that.setData({
        action_start_date: start_date
      });
      console.log('action_start_date:' + that.action_start_date);
    },
    bindChangeActStartTime: function (e) {
      var that = this;
      var start_time = e.detail.value;
      that.setData({
        action_start_time: start_time
      });
      console.log('action_start_time:' + that.action_start_time);
    },
    bindChangeActEndDate: function (e) {
      var that = this;
      var end_date = e.detail.value;
      var end_time = that.action_end_time + ":00";
      var diff_start_time = that.action_start_date + ' ' + that.action_start_time + ':00';
      var diff_end_time = end_date + ' ' + end_time;
      var diff = util.calDateDiff(diff_start_time, diff_end_time);

      if (diff > 0) {
        that.setData({
          action_end_date: end_date
        });
      } else {
        uni.showToast({
          title: "结束时间小于开始时间",
          icon: 'none',
          duration: 1500
        });
      }

      console.log('action_end_date:' + that.action_end_date, diff_start_time, diff_end_time);
    },
    bindChangeActEndTime: function (e) {
      var that = this;
      var end_time = e.detail.value;
      var end_date = that.action_end_date;
      var diff_start_time = that.action_start_date + ' ' + that.action_start_time + ':00';
      var diff_end_time = end_date + ' ' + end_time + ':00';
      var diff = util.calDateDiff(diff_start_time, diff_end_time);

      if (diff > 0) {
        that.setData({
          action_end_time: end_time
        });
      } else {
        uni.showToast({
          title: "结束时间小于开始时间",
          icon: 'none',
          duration: 1500
        });
      }

      console.log('action_end_time:' + that.action_end_time, diff_start_time, diff_end_time);
    },
    bindChangeRegisterRight: function (e) {
      var that = this;
      var card_register_right_index = e.detail.value;
      that.setData({
        card_register_right_index: card_register_right_index
      });
      console.log('card_register_right:' + that.card_register_right_index);
    },
    bindChangeRegisterReqid: function (e) {
      var that = this;
      var card_register_reqid_index = e.detail.value;
      that.setData({
        card_register_reqid_index: card_register_reqid_index
      });
      console.log('card_register_reqid_index:' + that.card_register_reqid_index);
    },
	
    sharegoodsTapTag: function () {
      var that = this;
      var share_goods_id = that.goodsid;
      var share_goods_org = that.goodsorg;
      var share_goods_shape = that.goodsshape ? that.goodsshape : 1;
      var share_goods_price = that.goodsprice;
      var share_goods_name = that.goodsname;
      share_goods_name = share_goods_name.replace(/\&/g, ' ');
      var cur_img_id = that.cur_img_id;
      var share_goods_wx_headimg = that.share_goods_wx_headimg ? that.share_goods_wx_headimg : that.share_avatarUrl;
      var qr_type = that.qr_type?that.qr_type:'wishshare'
	  var share_goods_title = '';
      if (share_goods_shape == 5 || share_goods_shape == 4) {
        share_goods_title = that.card_content;
      } else {
        share_goods_title = that.share_title;
      }

      var share_goods_desc = that.share_desc;
      var share_avatarUrl = that.share_avatarUrl;
      var wx_headimg_cache = wx.getStorageSync('wx_headimg_cache');
      var goods_image_cache = wx.getStorageSync('goods_image_cache_' + share_goods_id);
      var share_goods_qrcode = that.share_goods_qrcode //wx.getStorageSync('goods_qrcode_cache_' + share_goods_id);
      var card_type = that.card_type;
      //share_goods_wx_headimg =  wx_headimg_cache ? wx_headimg_cache : share_goods_wx_headimg;

      if (that.cur_img_id == 0) {
        var share_goods_image = that.image_pic[cur_img_id]['url'];
        //share_goods_image = goods_image_cache ? goods_image_cache : share_goods_image;
      } else {
        cur_img_id = cur_img_id - that.image_video.length;
        var share_goods_image = that.image_pic[cur_img_id]['url'];
      }

      //console.log('sharegoodsTapTag share_goods_id:', share_goods_id, 'cur_img_id:', cur_img_id, 'image_save_count:', that.image_save_count);

		if (share_goods_shape != 5 && share_goods_shape != 4) {//
			console.log('商品分享 share_goods_id:',share_goods_id,' share_goods_qrcode:',share_goods_qrcode)
			
			uni.navigateTo({
				url: '/pages/wish/wishshare/wishshare?share_goods_id=' + share_goods_id + '&share_goods_shape=' + share_goods_shape + '&share_goods_org=' + share_goods_org + '&share_goods_name=' + share_goods_name + '&share_goods_price=' + share_goods_price + '&share_goods_image=' + share_goods_image + '&share_goods_wx_headimg=' + share_goods_wx_headimg + '&share_goods_title=' + share_goods_title + '&share_goods_desc=' + share_goods_desc + '&share_goods_image2=' + that.image_pic[cur_img_id]['url'] + '&qr_type=' + qr_type+ '&card_type=' + card_type
			});
			/*
			wx.navigateTo({
				url: '/pages/API/canvas/canvas' 
			});
			*/
		}
		/*
      if (that.image_save_count < 2) {
        if (that.image_save_times > 8) {
          //8次不成功返回上一级
          //that.has_auth();
          return;
        }else {
			var image_save_times = that.image_save_times + 1;
			that.setData({
			  image_save_times: image_save_times
			});
			setTimeout(function() {
			    wx.showToast({
			      title: "开始求赠",
			      icon: 'loading',
			      duration: 2000
			    });
			    that.sharegoodsTapTag();
			}, 1500);
			return;
		}
	  }else{
		
	  }
	  */
    },
	
    image_save: function (image_url, image_cache_name) {
      var that = this;
      console.log('imge save image url:', image_url, 'image_cache_name:', image_cache_name);
      uni.downloadFile({
      	url: image_url,
      	success: (res) => {
      		console.log('downloadFile success, res is', res)
      		var img_tempFilePath = res.tempFilePath;
			uni.saveFile({
				tempFilePath: img_tempFilePath,
				success: (res) => {
					//this.savedFilePath = res.savedFilePath;
					uni.setStorageSync(image_cache_name, res.savedFilePath);
					that.image_save_count = that.image_save_count + 1
					/*
					uni.showModal({
						title: '保存成功',
						content: '图片保存完成'+image_cache_name+' '+that.image_save_count,
						showCancel: false
					});
					*/
				},
				fail: (res) => {
					/*
					uni.showModal({
						title: '保存失败',
						content: '失败原因: ' + JSON.stringify(res),
						showCancel: false
					});
					*/
				}
			})
      	},
      	fail: (err) => {
      		console.log('downloadFile fail, err is:', err)
      	}
      })
    },
    has_auth: function () {
      var that = this;
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            wx.navigateTo({
              url: '/pages/login/login?frompage=/pages/details/details'
            });
          }
        }
      });
    },
	
    //点击播放按钮，封面图片隐藏,播放视频
	bindplay: function (e) {
	    //console.log('detail bindplay 响应', e);
		this.showVideo = true ;
		this.image_pic[this.cur_img_id].flag = true ;
		this.videoContext = uni.createVideoContext('myVideo',this)
		this.videoContext.seek(1);
		/*
		uni.setStorageSync('image_pic', this.image_pic);
		uni.navigateTo({
			url: '/pages/details/detailsview'
		});
		
		
	   //#ifdef APP-PLUS
		setTimeout(function () {
		  this.createView();
		}, 1200);
	   	//#endif
		*/
    },
	 
	//#ifdef APP-PLUS
	createView:function (){
		video_cover_view = new plus.nativeObj.View('video_cover_view',
		{top:'0px',left:'0px',height:'50px',width:'50px'},
		[{tag:'img',id:'img',src:'/static/play.png',position:{top:'0px',left:'0px',width:'100%',height:'100%'}},
		{tag:'rect',id:'rect',color:'#FF0000',position:{top:'0px',left:'0px',width:'100%',height:'1px'}},
		{tag:'font',id:'font',text:'视频播放',textStyles:{size:'18px'}}
		]);
		plus.webview.currentWebview().append(video_cover_view);
		video_cover_view.show();
	},
	//#endif
	 
    myblessing: function () {
      var that = this;
      that.setData({
        notehidden: !that.notehidden
      });
    },
    cardEditTapTag: function (is_buymyself = 0) {
      var that = this;
      var card_type = that.card_type;

      if (card_type == 1) {
        that.setData({
          cardregisterhidden: !that.cardregisterhidden,
          is_buymyself: is_buymyself ? is_buymyself : 0,
          card_name_modal_title: '编辑内容'
        });
      } else if (card_type == 2) {
        that.setData({
          cardnamehidden: !that.cardnamehidden,
          is_buymyself: is_buymyself ? is_buymyself : 0
        });
      } else if (card_type == 4) {
        that.setData({
          cardlovehidden: !that.cardlovehidden,
          is_buymyself: is_buymyself ? is_buymyself : 0
        });
      } else if (card_type == 10) {
        that.setData({
          cardcelehidden: !that.cardcelehidden,
          is_buymyself: is_buymyself ? is_buymyself : 0
        });
      }
    },
    //确定按钮点击事件 
    shareConfirmCardLove: function () {
      var that = this;
      that.setData({
        cardlovehidden: !that.cardlovehidden
      });
      that.confirmcardinput();
    },
    //取消按钮点击事件  
    shareCandelCardLove: function () {
      var that = this;
      that.setData({
        cardlovehidden: !that.cardlovehidden
      });
    },
    //确定按钮点击事件 
    shareConfirmCardName: function () {
      var that = this;
      that.setData({
        cardnamehidden: !that.cardnamehidden
      });
      that.confirmcardinput();
    },
    //取消按钮点击事件  
    shareCandelCardName: function () {
      var that = this;
      that.setData({
        cardnamehidden: !that.cardnamehidden
      });
    },
    //确定按钮点击事件 
    shareConfirmCardRegister: function () {
      var that = this;
      that.setData({
        cardregisterhidden: !that.cardregisterhidden
      });
      that.confirmcardinput();
    },
    //取消按钮点击事件  
    shareCandelCardRegister: function () {
      var that = this;
      that.setData({
        cardregisterhidden: !that.cardregisterhidden
      });
    },
    card_register: function () {
      var that = this;
      that.setData({
        cardregisterhidden: !that.cardregisterhidden
      });
    },
	
    save_recorder: function (recordPath) {
      var that = this;
      var goods_id = that.goods_id;
      var urls = uploadurl;
	  that.current_voice = recordPath
	  /*
	  wx.showToast({
	    title: "保存录音:"+recordPath,
	    icon: 'none',
	    duration: 1500
	  });
	  */
      wx.uploadFile({
        url: uploadurl,
        filePath: recordPath,
        name: 'wechat_upimg',
        formData: {
          latitude: encodeURI(0.0),
          longitude: encodeURI(0.0),
          restaurant_id: encodeURI(0),
          city: encodeURI('杭州'),
          prov: encodeURI('浙江'),
          name: encodeURI(goods_id) // 名称

        },
        success: function (res) {
          var retinfo = JSON.parse(res.data.trim());
          var new_rec_url = '';

          if (retinfo['status'] == "y") {
            new_rec_url = retinfo['result']['img_url'];
            that.setData({
              new_rec_url: new_rec_url,
			  
            });
            wx.setStorageSync('cardvoice', new_rec_url);
            wx.setStorageSync('cardvoicetime', that.recordingTimeqwe);
           /*
		   wx.showToast({
             title: "录音保存完成!"+new_rec_url,
             icon: 'none',
             duration: 1500
           });
		   */
            console.log('录音上传完成', recordPath, new_rec_url, that.recordingTimeqwe);
          } else {
            wx.showToast({
              title: '录音上传返回失败',
              icon: 'none',
              duration: 1000
            });
            console.log('录音上传返回失败', recordPath, new_rec_url);
          }
        }
      });
    },
	
    play_rec: function () {
      var that = this;
      var new_rec_url = that.new_rec_url;
      if (that.current_voice) {
        myaudio.src = that.current_voice;
        myaudio.play();
      } else if (new_rec_url) {
        wx.downloadFile({
          url: new_rec_url,
          //音频文件url                  
          success: res => {
            if (res.statusCode === 200) {
              myaudio.src = res.tempFilePath;
              myaudio.play();
              console.log('录音播放完成', res.tempFilePath);
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
   
    imgYu: function (e) {
      var src = e.currentTarget.dataset.src; //获取data-src
      //var list = e.currentTarget.dataset.list; //获取data-list
      var imgList = [];
	  var image_pic = this.image_pic
	  var card_type = this.card_type
	  if(card_type!=0){
		 this.cardEditTapTag()
		 return ;
	  }

      for (var i = 0; i < image_pic.length; i++) {
        imgList.push(image_pic[i]['url']);
      }

     // console.log('image Yu imgList:', imgList,' src:',src); //图片预览

      uni.previewImage({
        current: src,
        // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表

      });
    },
    bindMinus: function (e) {
      var that = this;
      var num = that.buynum;
      num--;
      that.setData({
        buynum: num > 0 ? num : 1
      });
    },
    bindPlus: function (e) {
      var that = this;
      var num = that.buynum; // 自增

      num++; // 只有大于一件的时候，才能normal状态，否则disable状态

      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      this.setData({
        buynum: num <= 1 ? 1 : num
      });
    },
    //事件处理函数 选择型号规格  
    goodsmodel: function (options) {
      var that = this;
      var modalHidden = options.modalHidden;
	  that.modalName ='bottomModal' ;
      var goodsmodel_count = options.goodsmodel_count;
	  var goodsname = options.goodsname? options.goodsname:''
	  var commodityAttr = options.commodityAttr?options.commodityAttr:that.options.commodityAttr ;
	  var attrValueList = options.attrValueList?options.attrValueList:that.attrValueList;
	  var is_buymyself = options.is_buymyself?options.is_buymyself:0 ;
	  var goodsshape = options.goodsshape ?options.goodsshape:0 ;
	  var card_type = options.card_type?options.card_type:0;
	  var card_register_title = options.card_register_title ? options.card_register_title:'';
      var card_register_content = options.card_register_content;
      var card_register_addr = options.card_register_addr;
	  var sku_id = commodityAttr[0]?commodityAttr[0].id:0;
	  var sku_sell_price = commodityAttr[0]?commodityAttr[0].sell_price:0;
	  var sku_delivery_price = commodityAttr[0]?commodityAttr[0].delivery_price:0;
	  if (commodityAttr.length > 0) {
        console.log('detail goodsmodel is_buymyself:', is_buymyself, 'goodsshape:', goodsshape, ' card_type:', card_type);
        if (attrValueList.length > 0) {
			that.modalHidden = !modalHidden ;
			that.sku_id = sku_id ;
			that.sku_sell_price = sku_sell_price ;
			that.sku_delivery_price = sku_delivery_price ;
			that.add_cart_title = '商品名称' ;
			that.wishflag = 0 ;
          console.log('挑选 sku_id:' , commodityAttr[0].id, 'modalHidden:', modalHidden);
        } else {
          console.log('送礼 sku_id:' ,commodityAttr[0].id, 'attrValueList:', attrValueList);
          that.modalHidden = !modalHidden ;
          that.sku_id = sku_id ;
          that.sku_sell_price = sku_sell_price ;
          that.sku_delivery_price = sku_delivery_price ;
          that.add_cart_title = goodsname ;
          that.wishflag = 0 ;
		  if (card_type > 0) {
			  options['sku_id'] = sku_id ;
			  options['add_cart_title'] = goodsname ;
			  options['wishflag'] = 0 ;
			  that.addCart(options);
          }
        }
      } else {
        setTimeout(function () {
          goodsmodel_count = goodsmodel_count + 1;
          if (goodsmodel_count < 15) {
            uni.showToast({
              title: "加载中...",
              icon: 'loading',
              duration: 1000
            });
			options.goodsmodel_count = goodsmodel_count ;
			options.commodityAttr = options.commodityAttr?options.commodityAttr:that.options.commodityAttr ;
			options.attrValueList = options.attrValueList?options.attrValueList:that.attrValueList;
            that.goodsmodel_count = goodsmodel_count ;
			if(is_buymyself==0){
				that.buyGift();
			}else{
				that.buyMyself();
			}
          } else {
			that.goodsmodel_count = 0 ;
            wx.showToast({
              title: "系统繁忙!",
              icon: 'loading',
              duration: 1500
            });
            that.goBack();
          }
        }, 500);
      }
    },
    wishCart: function () {
      var that = this;
      var attrValueList = that.attrValueList;
	  var commodityAttr = that.commodityAttr
	  
      if (attrValueList.length > 0) {
        that.setData({
          modalHidden: !that.modalHidden,
          sku_id: commodityAttr[0]?commodityAttr[0].id:0,
          add_cart_title: '商品名称',
          wishflag: 1
        });
      } else {
        that.setData({
          sku_id: commodityAttr[0]?commodityAttr[0].id:0,
          wishflag: 1
        });
		//options['sku_id'] = commodityAttr[0]?commodityAttr[0].id:0 ;
		//options['wishflag'] = 1 ;
        that.addCart();
      }
    },
    buyMyself: function () {
      var that = this;
      var goodsshape = that.goodsshape;
      var refer_mid = that.refer_mid;
      var card_type = that.card_type;
      console.log('buyMyself card_type:', that.card_type, 'goodsshape:', that.goodsshape);
	  that.is_buymyself = 1 ;
	  that.goodsmodel_count = 0 ;
      
      /*
      if (goodsshape==4) {
        //that.confirmcardinput()
        //that.cardEditTapTag(that.data.is_buymyself)
      }else{
        
      }
      */
	 var options ={}
	 options['goodsname'] = that.goodsname ;
	 options['commodityAttr'] = that.commodityAttr ;
	 options['attrValueList'] = that.attrValueList ; 
	 options['goodsmodel_count'] = that.goodsmodel_count ;  
	 options['goodsshape'] = that.goodsshape ; 
	 options['modalHidden'] = that.modalHidden ; 
	 options['is_buymyself'] = that.is_buymyself ; 
	 options['card_type'] = that.card_type ; 
	 options['card_register_title'] = that.card_register_title ; 
	 options['card_register_content'] = that.card_register_content ; 
	 options['card_register_addr'] = that.card_register_addr ; 
	// that.$options.methods.goodsmodel(options);
	 that.goodsmodel(options) ;
    },
    buyGift: function () {
		var that = this;
		that.is_buymyself = 0 ;
		that.goodsmodel_count = 0 ;
	console.log('buyGift card_type:', that.card_type, 'goodsshape:', that.goodsshape);
		var options ={}   
		options['goodsname'] = that.goodsname ;
		options['commodityAttr'] = that.commodityAttr ;
		options['attrValueList'] = that.attrValueList ; 
		options['goodsmodel_count'] = that.goodsmodel_count ;  
		options['goodsshape'] = that.goodsshape ; 
		options['modalHidden'] = that.modalHidden ; 
		options['is_buymyself'] = that.is_buymyself ; 
		options['card_type'] = that.card_type ; 
		options['card_register_title'] = that.card_register_title ; 
		options['card_register_content'] = that.card_register_content ; 
		options['card_register_addr'] = that.card_register_addr ; 
		options['card_register_addr'] = that.card_register_addr ; 
		
		//that.$options.methods.goodsmodel(options);
		that.goodsmodel(options) ;
    },
    //确定按钮点击事件  
    modalBindconfirm: function () {
      var that = this; //var card_type = that.data.card_type

      this.setData({
        modalHidden: !this.modalHidden
      });
      this.addCart();
    },
    //取消按钮点击事件  
    modalBindcancel: function () {
      this.setData({
        modalHidden: !this.modalHidden
      });
    },
    addCart: function () {
      var that = this;
      var is_buymyself = that.is_buymyself;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var keyword = that.keyword;
      var is_satisfy = that.is_satisfy;
      var rule_selected_info = that.rule_selected_info;

      if (!username) {
        //登录
        wx.navigateTo({
          url: '../login/login?goods_id=' + that.goodsid
        });
      } else {
        if (that.sku_id) {
          that.insertCart(that.sku_id, that.buynum, username, token, that.shop_type, that.wishflag, is_buymyself, keyword, is_satisfy, rule_selected_info);
        } else {
          wx.showToast({
            title: '该产品无货',
            icon: 'loading',
            duration: 1500
          });
        }
      }
    },
    insertCart: function (sku_id, buynum, username, token, shop_type, wishflag, is_buymyself, keyword, is_satisfy, rule_selected_info) {
      var that = this;
      var order_shape = that.order_shape; //var shop_type = that.data.shop_type

      wx.request({
        url: weburl + '/api/client/add_cart',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          sku_id: sku_id,
          num: buynum,
          wishflag: wishflag,
          shop_type: shop_type,
          keyword: keyword,
          is_satisfy: is_satisfy,
          rule_selected_info: rule_selected_info
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log('details insertCart res data:', res.data, ' wishflag：', wishflag);
          var title = wishflag == 1 ? '已加入心愿单' : '已加入礼物包';
          title = is_buymyself == 1 ? '自购礼品' : title;
          title = that.card_type > 0 ? '加载中' : title;
          title = order_shape == 5 || order_shape == 4 ? '处理中' : title;
          wx.showToast({
            title: title,
            icon: 'loading',
            duration: 2000
          });
          getApp().globalData.from_page = '/pages/details/details';

          if (wishflag == 1) {
            wx.navigateTo({
              url: '/pages/wish/wish'
            })
            /*
			wx.switchTab({
			  url: '/pages/wish/wish'
			});
           
            */
          } else {
            if (is_buymyself == 1) {
              that.queryCart();
            } else {
              console.log('details insertCart wishflag:', wishflag);
              getApp().globalData.hall_gotop = 1;
              wx.switchTab({
                url: '/pages/cart/cart'
              });
            }
          }
        }
      });
    },
    queryCart: function () {
      var that = this;
      var username = wx.getStorageSync('username') ? wx.getStorageSync('username') : '';
      var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '1';
      var order_type = 'gift';
      var order_note = '送你一份礼物，希望你喜欢!'; //默认祝福

      var order_image = that.order_image;
      var buynum = that.buynum;
      var sku_sell_price = that.sku_sell_price;
      var amount = parseFloat(sku_sell_price) * buynum;
      var sku_id = that.sku_id;
      var is_buymyself = that.is_buymyself;
      var cur_img_id = that.cur_img_id;
      var share_goods_image = that.image_pic[cur_img_id]['url'];
      var share_goods_template = that.image_pic[cur_img_id]['template_config'];
      var order_voice = that.new_rec_url ? that.new_rec_url : ''; //录音文件url

      var order_voicetime = that.recordingTimeqwe ? that.recordingTimeqwe : 0; //录音文件url

      var goodsshape = that.goodsshape;
      var current_card_color = that.current_card_color;
      var card_type = that.card_type;

      if (goodsshape == 5 || goodsshape == 4) {
        order_note = that.card_content;

        if (cur_img_id != 0) {
          cur_img_id = cur_img_id - that.image_video.length;
          share_goods_image = that.image_pic[cur_img_id]['url'];
        }
      }

      wx.request({
        url: weburl + '/api/client/query_cart',
        method: 'POST',
        data: {
          username: username,
          access_token: token,
          shop_type: shop_type,
          sku_id: sku_id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: function (res) {
          //console.log('details queryCart:', res.data, 'cur_img_id:',cur_img_id);
          var carts = [];

          if (!res.data.result) {
            wx.showToast({
              title: '未挑选商品' + res.data.info,
              icon: 'none',
              duration: 1500
            });
            return;
          }

          var cartlist = res.data.result.list;
          var index = 0;

          for (var key in cartlist) {
            cartlist[key]['sku_list'][0]['image'] = share_goods_image;

            for (var i = 0; i < cartlist[key]['sku_list'].length; i++) {
              if (cartlist[key]['sku_list'][i]['image'].indexOf("http") < 0) {
                cartlist[key]['sku_list'][i]['image'] = weburl + '/' + cartlist[key]['sku_list'][i]['image'];
              }

              cartlist[key]['sku_list'][i]['selected'] = true;
              cartlist[key]['sku_list'][i]['shop_id'] = key;
              cartlist[key]['sku_list'][i]['objectId'] = cartlist[key]['sku_list'][i]['id'];
              carts[index] = cartlist[key]['sku_list'][i];
              index++;
            }
          }

          that.setData({
            carts: carts,
            all_rows: carts.length,
            is_buymyself: 0
          });
          var amount = parseFloat(that.sku_sell_price) * buynum;

          if (goodsshape != 5 && goodsshape != 4) {
            wx.navigateTo({
              url: '../order/checkout/checkout?cartIds=' + sku_id + '&amount=' + amount + '&carts=' + JSON.stringify(carts) + '&is_buymyself=' + is_buymyself + '&order_type=' + order_type + '&order_shape=' + goodsshape + '&order_image=' + share_goods_image + '&username=' + username + '&token=' + token
            });
          } else {
            if (goodsshape == 5) {
              var card_cele_info = wx.getStorageSync('card_cele_info'); //从缓存中读取

              console.log('detail checkout 贺卡请柬互动卡  order_image:', share_goods_image, ' carts:', carts);
              wx.navigateTo({
                url: '../order/checkout/checkout?cartIds=' + sku_id + '&amount=' + amount + '&carts=' + JSON.stringify(carts) + '&is_buymyself=' + is_buymyself + '&order_type=' + order_type + '&order_shape=' + goodsshape + '&order_voice=' + order_voice + '&order_voicetiime=' + order_voicetime + '&order_note=' + order_note + '&order_image=' + share_goods_image + '&card_cele_info=' + card_cele_info + '&card_template=' + JSON.stringify(share_goods_template) + '&username=' + username + '&token=' + token
              });
            } else if (goodsshape == 4) {
              if (card_type == 1) {
                var card_register_info = wx.getStorageSync('card_register_info'); //从缓存中读取

                console.log('detail checkout 互动卡 register card order_image:', share_goods_image, ' card_register_info:', card_register_info, ' share_goods_template:', share_goods_template);
                wx.navigateTo({
                  url: '../order/checkout/checkout?cartIds=' + sku_id + '&amount=' + amount + '&carts=' + JSON.stringify(carts) + '&is_buymyself=' + is_buymyself + '&order_type=' + order_type + '&order_shape=' + goodsshape + '&order_voice=' + order_voice + '&order_voicetiime=' + order_voicetime + '&order_note=' + order_note + '&order_color=' + share_goods_template[0]['color'] + '&order_image=' + share_goods_image + '&card_register_info=' + card_register_info + '&card_template=' + JSON.stringify(share_goods_template) + '&username=' + username + '&token=' + token
                });
              } else if (card_type == 2) {
                var card_name_info = wx.getStorageSync('card_name_info'); //从缓存中读取

                console.log('detail checkout 互动卡 name card  order_image:', share_goods_image, ' card_name_info:', card_name_info, ' share_goods_template:', share_goods_template);
                wx.navigateTo({
                  url: '../order/checkout/checkout?cartIds=' + sku_id + '&amount=' + amount + '&carts=' + JSON.stringify(carts) + '&is_buymyself=' + is_buymyself + '&order_type=' + order_type + '&order_shape=' + goodsshape + '&order_voice=' + order_voice + '&order_voicetiime=' + order_voicetime + '&order_note=' + order_note + '&order_color=' + share_goods_template[0]['color'] + '&order_image=' + share_goods_image + '&card_name_info=' + card_name_info + '&card_template=' + JSON.stringify(share_goods_template) + '&username=' + username + '&token=' + token
                });
              } else if (card_type == 4) {
                //爱心卡
                var card_love_info = wx.getStorageSync('card_love_info'); //从缓存中读取

                console.log('detail checkout 互动卡 love card  order_image:', share_goods_image, ' card_love_info:', card_love_info, ' share_goods_template:', share_goods_template);
                wx.navigateTo({
                  url: '../order/checkout/checkout?cartIds=' + sku_id + '&amount=' + amount + '&carts=' + JSON.stringify(carts) + '&is_buymyself=' + is_buymyself + '&order_type=' + order_type + '&order_shape=' + goodsshape + '&order_voice=' + order_voice + '&order_voicetiime=' + order_voicetime + '&order_note=' + order_note + '&order_color=' + share_goods_template[0]['color'] + '&order_image=' + share_goods_image + '&card_love_info=' + card_love_info + '&card_template=' + JSON.stringify(share_goods_template) + '&username=' + username + '&token=' + token
                });
              }
            }
          }
        }
      });
    },
    showGoodsinfo: function () {
      // 获得高度  
      let winPage = this;
      winPage.setData({
        //hideviewgoodsinfo: (!winPage.hideviewgoodsinfo),
        hideviewgoodsinfo: false
      });
/*
      if (winPage.hideviewgoodsinfoflag) {
        if (winPage.goodsinfoshowflag == 0) {
          //wxparse.wxParse('dkcontent1', 'html', winPage.goodsPicsInfo.desc['desc'], winPage, 1);
        }
      }
*/
      winPage.setData({
        hideviewgoodsinfoflag: !winPage.hideviewgoodsinfoflag,
        goodsinfoshowflag: 1,
        scrollTop: winPage.scrollTop_init,
		dkcontent:winPage.goodsPicsInfo.desc['desc']
      });
    },
    showGoodspara: function () {
      // 获得高度  
      var winPage = this;
      winPage.setData({
        hideviewgoodspara: !winPage.hideviewgoodspara
      });

      if (winPage.hideviewgoodsparaflag) {
        if (winPage.goodsPicsInfo.desc) {
          wxparse.wxParse('dkcontent2', 'html', winPage.goodsPicsInfo.desc['desc2'], winPage, 1);
        }
      }

      winPage.setData({
        hideviewgoodsparaflag: false
      });
    },
    getAttrIndex: function (attrName, attrValueList) {
      // 判断数组中的attrKey是否有该属性值 
      for (var i = 0; i < attrValueList.length; i++) {
        if (attrName == attrValueList[i].name) {
          break;
        }
      }

      return i < attrValueList.length ? i : -1;
    },
    isValueExist: function (value, valueArr) {
      // 判断是否已有属性值 
      for (var i = 0; i < valueArr.length; i++) {
        if (valueArr[i] == value) {
          break;
        }
      }

      return i < valueArr.length;
    },

    /* 选择属性值事件 */
    selectAttrValue: function (e) {
      /* 
      点选属性值，联动判断其他属性值是否可选 
      { 
      attrKey:'型号', 
      attrValueList:['1','2','3'], 
      selectedValue:'1', 
      attrValueStatus:[true,true,true] 
      } 
      console.log(e.currentTarget.dataset); 
      */
      var that = this;
      var attrValueList = that.attrValueList;
      var index = e.currentTarget.dataset.index; //属性索引 

      var firstIndex = that.firstIndex;
      var valueindex = e.currentTarget.dataset.valueindex; //属性索引 

      var key = e.currentTarget.dataset.key;
      var value = e.currentTarget.dataset.value;
      var status = e.currentTarget.dataset.status;
      var selectedvalue = e.currentTarget.dataset.selectedvalue;
      this.setData({
        firstIndex: index,
        secondIndex: valueindex
      });

      if (status || valueindex == that.secondIndex) {
        if (attrValueList[index].type == 2) {
          value = attrValueList[index].note[valueindex];
        }

        if (selectedvalue == value) {
          // 取消选中 
          that.disSelectValue(index, key, value);
        } else {
          // 选中 
          that.selectValue(index, key, value);
        }
      }

      that.setData({
        sku_id: '',
        sku_gov_price: '',
        sku_earnest_price: '',
        sku_sell_price: '',
        sku_delivery_price: ''
      });
      var selectValueInfo = '';

      for (var i = 0; i < attrValueList.length; i++) {
        if (attrValueList[i].selectedValue) {
          selectValueInfo = selectValueInfo + attrValueList[i].selectedValue + ';';
        }
      }

      for (var i = 0; i < that.commodityAttr.length; i++) {
        if (selectValueInfo.indexOf(that.commodityAttr[i].sku_key) >= 0) {
          that.setData({
            sku_id: that.commodityAttr[i].id,
            sku_gov_price: that.commodityAttr[i].gov_price,
            sku_earnest_price: that.commodityAttr[i].earnest_price,
            sku_sell_price: that.commodityAttr[i].sell_price,
            sku_delivery_price: that.commodityAttr[i].delivery_price
          }); //break
        }
      }
    },

    /* 选中 */
    selectValue: function (index, key, value) {
      var that = this;
      var attrValueList = that.attrValueList;
      attrValueList[index].selectedValue = value;
      that.setData({
        attrValueList: attrValueList
      }); // console.log('selectValueInfo 选中信息:', attrValueList,' index:',index); 
    },

    /* 取消选中 */
    disSelectValue: function (index, key, value) {
      //var commodityAttr = this.commodityAttr;
      var that = this;
      var attrValueList = that.attrValueList;
      attrValueList[index].selectedValue = '';
      this.setData({
        sku_id: '',
        sku_gov_price: '',
        sku_earnest_price: '',
        attrValueList: attrValueList
      }); // console.log('selectValueInfo 取消选中信息:', attrValueList,' index:',index); 
    },
    shlogoChange: function (e) {
      var that = this;
      var has_shlogo = e.detail.value;
      console.log('shlogoChange：', e.detail.value);
      that.setData({
        has_shlogo: has_shlogo
      });
      that.confirmcardinput();
    },
    registerDueChange: function (e) {
      var that = this;
      var has_registerdue = e.detail.value;
      console.log('registerDueChange', e.detail.value);
      that.setData({
        has_registerdue: has_registerdue
      });
      that.confirmcardinput();
    },
    actionDueChange: function (e) {
      var that = this;
      var has_actiondue = e.detail.value;
      console.log('actionDueChange', e.detail.value);
      that.setData({
        has_actiondue: has_actiondue
      });
      that.confirmcardinput();
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
@import "./details.css";
@import "../../components/uParse/src/wxParse.css";
</style>