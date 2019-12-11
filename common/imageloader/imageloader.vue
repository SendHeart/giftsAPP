<template>
<view>
<image v-if="!finishLoadFlag" :mode="mode" :src="defaultImage" :style="(width ? 'width:' + width : '') + ';' + (height ? 'height:' + height : '')"></image>
<image :mode="mode" :class="(finishLoadFlag ? '' : 'before-load')" :src="originalImage" @load="finishLoad" :style="(finishLoadFlag && width ? 'width:' + width : '') + ';' + (finishLoadFlag && height ? 'height:' + height : '') + ';' + (finishLoadFlag && display ? 'display:' + display : '')"></image>
</view>
</template>

<script>

export default {
  data() {
    return {
      finishLoadFlag: false
    };
  },

  components: {},
  props: {
    //默认图片
    defaultImage: String,
    //原始图片
    originalImage: String,
    width: String,
    height: String,
    //图片剪裁mode，同Image组件的mode
    mode: String,
    display: String
  },
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag: true
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
@import "./imageloader.css";
</style>