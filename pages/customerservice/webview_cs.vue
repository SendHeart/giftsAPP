<template>
	<view>
		<web-view :src="url" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://sendheart.dreamer-inc.com'
			}
		},
		onLoad(options) {
			//console.log('customer service onload:',options)
			var username = uni.getStorageSync('username') ? uni.getStorageSync('username') : '';
			if (options && options.url) {
				this.url = options.url+'&username='+username+'&from=APP' ;
			}			
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				})
			}
		}
	}
</script>

<style>

</style>
