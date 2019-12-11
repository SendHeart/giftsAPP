### jsfun-record 1.0.1 录制声音
录制声音，返回音频文件的地址，使用此地址上传给服务器即可

1.解决了canvas的适配问题

2.可控制音频长短

3.录制完成后，可以预览、确认提交

此组件因为录音功能需要在真机上调试
### 使用方式：

在 ``script`` 中引用组件 

```javascript
import jsfunRecord from '@/components/jsfun-record/jsfun-record.vue'
export default {
    components: {jsfunRecord}
}

methods:{
	saveRecord: function(recordPath) {		
		console.log("===音频文件地址："+recordPath+"===")
		//do... 可以使用 uni.uploadFile 接口上传到服务器
	}
}
```

在 ``template`` 中使用组件

```html
<jsfun-record
  voicePath=""
  maxTime="15"
  minTime="5"
  @okClick="saveRecord"
>
	<view class="centerwz">录制语音</view>
</jsfun-record>	
```


### 属性说明：

|属性名		|类型	|默认值					|说明				|
|---		|----	|---					|---																											|
|voicePath		|String	|""						|默认文件地址，可以预览																									|
|maxTime		|Number	|15|最大时间：单位秒				|
|defaultArr		|String	|5|最小时间：单位秒|


### 事件说明：

|事件称名|说明|
|---|----|---|
|okClick|点击确认后可以获得音频的地址	|


### 版本说明：
### 1.0.1
1.进入页面先获取录音权限
2.部分手机canvas事件不支持导致没有动画，不能录音
### 1.0.0
初始版本

### 特别说明	
因为canvas中绘制的内容不能适配，所以canvas用到的宽高坐标点都是采用屏幕的缩放比例计算的，
但发现有些手机上显示圆环动画会有错位

最终方案读取canvas的宽高，使用宽高来计算圆环的中心点，根据中间声波图片的宽高来计算圆环的宽高，
这样保证了圆环与声波图的位置是一致的


