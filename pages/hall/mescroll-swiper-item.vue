<template>
	<view v-show="i === index">
		<mescroll-uni top="50" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
			<!-- 数据列表 -->
			<pd-list :list="pdList"></pd-list>
		</mescroll-uni>
	</view>
</template>

<script>
	//import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import PdList from "./pd-list.vue";
	var weburl = getApp().globalData.weburl;
	var shop_type = getApp().globalData.shop_type;
	export default {
		components: {
			//MescrollUni,
			PdList
		},
		data() {
			return {
				all_rows: 0,
				venuesItems: [],
				venuesList: [],
				search_goodsname: null,
				page: 1,
				pagesize: 20,
				pageoffset: 0,
				is_goodslist_loading: false,
				scrollTop: 0,
				mescroll: null, //mescroll实例对象
				downOption:{
					auto:false, // 不自动加载
					use:false,
					isLock:true,
				},
				upOption:{
					auto:false, // 不自动加载
					page: {
					 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					 	size: 20, // 每页数据的数量
					},
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						btnText: '去看看'
					}
				},
				pdList: [], //列表数据
				isInit: false, // 列表是否已经初始化
				scrollY: 0
			}
		},
		props:{
			i: Number, // 每个tab页的专属下标
			index: { // 当前tab的下标
				type: Number,
				default(){
					return 0
				}
			}
		},
		watch:{
			// 监听下标的变化
			index(val){
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.triggerDownScroll();
				}
			}
			
		},
		mounted() {
			// 第一个tab,自动加载数据
			if(this.i === 0){
				this.isInit = true; // 标记为true
				this.mescroll.triggerDownScroll();
			}
			 
		},
		methods: {
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				//mescroll.endSuccess() ;
			
				this.page =  1 
				mescroll.resetUpScroll()
				
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				//console.log("i="+this.i+", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size);
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData)=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					console.log("i="+this.i+", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" + curPageData.length);
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if(mescroll.num == 1|| this.page == 1) this.pdList = []; //如果是第一页需手动制空列表
					if(curPageData=='n'){
						mescroll.endByPage(this.page, this.all_rows)
					}else{
						this.pdList=this.pdList.concat(curPageData); //追加新数据
					}
					
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			},
			
			/*联网加载列表数据
			在您的实际项目中,请参考官方写法: http://www.mescroll.com/uni.html#tagUpCallback
			请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
			getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
				var that = this;
				var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
				var token = uni.getStorageSync('token') ? uni.getStorageSync('token') : '1';
				var minusStatuses = [];
				var page = that.page;
				var pagesize = that.pagesize;
				var pageoffset = that.pageoffset;
				var all_rows = that.all_rows
			
				if(page > all_rows && page>1) {
					console.log('加载完成 page:', page, 'all_rows:',all_rows);
					that.is_goodslist_loading = false ;
					successCallback && successCallback('n');
					return ;
				}
				that.is_goodslist_loading = true ;
				
				that.status = 'loading';
				
				try{
					wx.request({
					  url: weburl + '/api/client/query_member_goods_prom',
					  method: 'POST',
					  data: {
					  username: username,
					  access_token: token,
					  shop_type: shop_type,
					  query_type: 'app',
					  page: page,
					  pagesize: pagesize,
					  pageoffset: pageoffset
					  },
					  header: {
					    'Content-Type': 'application/x-www-form-urlencoded',
					    'Accept': 'application/json'
					  },
					  success: function (res) {
					    var venuesItems_new = res.data.result;
					    var all_rows = res.data.all_rows;
					    var pageoffset = res.data.pageoffset;
						console.log('加载 page:', page, 'all_rows:',all_rows,' venuesItems_new:',venuesItems_new);
					    if (!venuesItems_new) {
							that.is_goodslist_loading = false ;
							successCallback && successCallback(res.data.status);
							return;
					    } 
						
					    if (venuesItems_new) {
					      for (var i = 0; i < venuesItems_new.length; i++) {
					        venuesItems_new[i]['short_name'] = venuesItems_new[i]['name'].substring(0, 10) + '...';
								
					        if (!venuesItems_new[i]['act_info']) {
					          venuesItems_new[i]['act_info'] = '';
					        }
								
					        if (!venuesItems_new[i]['goods_tag']) {
					          venuesItems_new[i]['goods_tag'] = '';
					        } else {
					          venuesItems_new[i]['goods_tag'] = venuesItems_new[i]['goods_tag'].substring(0, 10);
					        }
							if (venuesItems_new[i]['activity_image'].indexOf("http") < 0 && venuesItems_new[i]['activity_image']) {
							  venuesItems_new[i]['activity_image'] = weburl + '/' + venuesItems_new[i]['activity_image'];
							}
							
							if (venuesItems_new[i]['image'].indexOf("http") < 0 && venuesItems_new[i]['image']) {
							  venuesItems_new[i]['image'] = weburl + '/' + venuesItems_new[i]['image'];
							}
										
					        venuesItems_new[i]['image'] = venuesItems_new[i]['activity_image'] ? venuesItems_new[i]['activity_image'] : venuesItems_new[i]['image'];

						  }
						  that.page = page + 1 ;
						  that.pageoffset = pageoffset ;
						  that.all_rows = all_rows ;
						  // 回调
						  successCallback && successCallback(venuesItems_new);
					    }
					  }
					});
					
				} catch (e) {
					//联网失败的回调
					errorCallback && errorCallback();
				}
			},
		 
		}
	}
</script>
<style>

</style>
