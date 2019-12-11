<template>
<canvas canvas-id="canvasdrawer" :style="'width:' + width + 'px;height:' + height + 'px;'" class="board" v-if="showCanvas"></canvas>
</template>

<script>

export default {
  data() {
    return {
      showCanvas: false,
      width: 100,
      height: 100,
      index: 0,
      imageList: [],
      tempFileList: [],
      isPainting: false,
      cache: {},
	  ctx: null,
      windowHeight: "",
      windowWidth: "",
      ratio: "",
      background: ""
    };
  },

  components: {},
  props: {
    painting: {
      type: Object,
      value: {
        views: []
      },
    }
  },
   watch: {
		painting(newVal, oldVal) {
			wx.removeStorageSync('canvasdrawer_pic_cache');
			this.cache = wx.getStorageSync('canvasdrawer_pic_cache') || {};
			this.ctx = wx.createCanvasContext('canvasdrawer', this);
           if (!this.isPainting) {
             if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
               if (newVal && newVal.width && newVal.height) {
                 this.setData({
                   showCanvas: true,
                   isPainting: true
                 });
                 this.readyPigment();
               }
             } else {
               this.setData({
                 showCanvas: true,
                 isPainting: true
               });
               this.readyPigment();
         
               if (newVal && newVal.mode !== 'same') {
                 this.$emit('getImage', {
                   errMsg: 'canvasdrawer:samme params'
                 });
               }
             }
           }
		}
	},
	mounted() {
		//wx.removeStorageSync('canvasdrawer_pic_cache');
		//this.cache = wx.getStorageSync('canvasdrawer_pic_cache') || {};
		//this.ctx = wx.createCanvasContext('canvasdrawer', this);
	},
  methods: {
	 /*
    ready() {
      wx.removeStorageSync('canvasdrawer_pic_cache');
      this.cache = wx.getStorageSync('canvasdrawer_pic_cache') || {};
      this.ctx = wx.createCanvasContext('canvasdrawer', this);
    },
	*/

    readyPigment() {
      const {
        width,
        height,
        windowHeight,
        windowWidth,
        background,
        views
      } = this.painting; // 屏幕宽度 375px = 750rpx，1px=2rpx
      // 1px = （750 / 屏幕宽度）rpx；
      // 1rpx = （屏幕宽度 / 750）px;

      this.setData({
        width,
        height,
        windowHeight,
        windowWidth,
        ratio: 750 / windowWidth,
        background: background
      });
      console.log('canvasdrawer readyPigment background:', background, width, height);
      const inter = setInterval(() => {
        if (this.ctx) {
          clearInterval(inter);
          this.ctx.clearActions();
		  this.reset() ;
          this.ctx.save();
          this.drawRect({
            background: background,
            top: 0,
            left: 0,
            width: width,
            height: height
          });
          //this.getImageList(views); //this.downLoadImages(0)
		  this.startPainting();
        }
      }, 200);
    },

	reset: function() {
		this.ctx.beginPath()
		this.ctx.setFillStyle('#000000')
		this.ctx.setStrokeStyle('#000000')
		this.ctx.setFontSize(10)
		this.ctx.setGlobalAlpha(1)
		this.ctx.setShadow(0, 0, 0, 'rgba(0, 0, 0, 0)')
		this.ctx.setLineCap('butt')
		this.ctx.setLineJoin('miter')
		this.ctx.setLineWidth(1)
		this.ctx.setMiterLimit(10)
		this.ctx.draw()
	},
    getImageList(views) {
      const imageList = [];

      for (let i = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          imageList.push(views[i].url);
        }
      }

      this.setData({
        imageList
      });
      this.downLoadImages(0);
    },

    downLoadImages(index) {
      const {
        imageList,
        tempFileList
      } = this;

      if (index < imageList.length) {
        //console.log('canvasdrawer downLoadImages:', imageList[index]);
        this.getImageInfo(imageList[index]).then(file => {
          tempFileList.push(file);
          this.setData({
            tempFileList
          });
          this.downLoadImages(index + 1);
		  /*
		  wx.showToast({
		    title: "canvas 已下载图片"+this.tempFileList,
		    icon: 'none',
		    duration: 2000
		  });
		  */
		   console.log('canvasdrawer downLoadImages index:',index,' tempFileList:', this.tempFileList);
        }).catch(fail => {
          console.log('canvasdrawer downLoadImages fail:', imageList[index], 'index:', index); //this.downLoadImages(index)
        });
      } else {
        this.startPainting();
      }
    },

    startPainting: function () {
      const { width, height, views, background, radius = 0 } = this.painting;
      this.width = width;
      this.height = height;
      //const { width, height, views, background, radius = 0 } = this.posterData;
      for (let i = 0; i < views.length; i++) {
      	console.log('canvasdrawer onload views.length:',views.length,' i:',i) ;
          if (views[i].type === 'image') {
              //let _img = views[i].url;
              let _views = views[i];
              let drawData = {};
      		 
              drawData = {
                  ..._views,
              };
      		console.log('canvasdrawer onload image drawData:',drawData,' i:',i) ;
              this.drawImage(drawData);
      		
          } else if (views[i].type === 'text') {
      		 this.drawText(views[i]);
          } else if (views[i].type === 'rect') {
              this.drawRect(views[i]);
          } else if (views[i].type === 'round') {
              this.drawRound(views[i]);
          }
      }
      
     
      this.ctx.draw(false, () => {
        console.log('canvasdrawer this.ctx.draw canvasdrawer_pic_cache:', this.cache);
        wx.removeStorageSync('canvasdrawer_pic_cache');
        wx.setStorageSync('canvasdrawer_pic_cache', this.cache);
        this.saveImageToLocal();
      });
    },

    drawImage(params) {
      this.ctx.save();
      const {
        url,
        top = 0,
        left = 0,
        width = 0,
        height = 0,
        borderRadius = 0,
        roundedRect = 0
      } = params;

      if (borderRadius) {
        this.ctx.beginPath();
        this.ctx.arc(left + borderRadius, top + borderRadius, borderRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.clip();
        this.ctx.drawImage(url, left, top, width, height);
        console.log('canvasdrawer drwImge borderRadius:', borderRadius);
      } else if (roundedRect) {
        var r = roundedRect;
        if (width < 2 * r) r = width / 2;
        if (height < 2 * r) r = height / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(left + r, top);
        this.ctx.arcTo(left + width, top, left + width, top + height, r);
        this.ctx.arcTo(left + width, top + height, left, top + height, r);
        this.ctx.arcTo(left, top + height, left, top, r);
        this.ctx.arcTo(left, top, left + width, top, r); //this.ctx.closePath();

        this.ctx.fill();
        this.ctx.clip();
        this.ctx.drawImage(url, left, top, width, height);
        console.log('canvasdrawer drwImge roundedRect:', r);
      } else {
        this.ctx.drawImage(url, left, top, width, height);
      }
      this.ctx.restore();
    },

    drawText(params) {
      this.ctx.save();
      const {
        MaxLineNumber = 2,
        breakWord = false,
        color = 'black',
        content = '',
        fontSize = 16,
        top = 0,
        left = 0,
        lineHeight = 20,
        textAlign = 'left',
        width,
        bolder = false,
        textDecoration = 'none'
      } = params;
      this.ctx.beginPath();
      this.ctx.setTextBaseline('top');
      this.ctx.setTextAlign(textAlign);
      this.ctx.setFillStyle(color);
      this.ctx.setFontSize(fontSize * 1.2); //this.ctx.setFontSize(content.font)

      if (!breakWord) {
        if (textAlign == 'center') {
          let text_left = parseInt((left + width - this.ctx.measureText(content).width) / 2);
          this.ctx.fillText(content, text_left, top);
          this.drawTextLine(text_left, top, textDecoration, color, fontSize, content);
        } else if (textAlign == 'right') {
          let text_left = parseInt(left + width - this.ctx.measureText(content).width);
          this.ctx.fillText(content, text_left, top);
          this.drawTextLine(text_left, top, textDecoration, color, fontSize, content);
          console.log('drawText() !breakWord content:', content, 'Width:', this.width, ' width:', width, ' content len:', this.ctx.measureText(content).width, 'textAlign:', textAlign, 'text_left:', text_left, ' left', left, 'textDecoration:', textDecoration);
        } else {
          this.ctx.fillText(content, left, top);
          this.drawTextLine(left, top, textDecoration, color, fontSize, content);
        } //console.log('drawText() !breakWord content:', content, 'windowWidth:', this.data.width, 'content len:', this.ctx.measureText(content).width, 'textAlign:', textAlign, 'text_left:', left, 'textDecoration:', textDecoration)

      } else {
        let fillText = '';
        let fillTop = top;
        let lineNum = 1; //console.log('drawText() breakWord content:', content, content.length, this.ctx.measureText(fillText).width,width)
		let len = 0; 
        for (let i = 0; i < content.length; i++) {
          fillText += [content[i]];
		  len += content[i].match(/[^\x00-\xff]/ig)?2:1   //计算汉字和字母的宽度
          if (this.ctx.measureText(fillText).width > width || (len+3)*uni.upx2px(fontSize) > width) {
            if (lineNum === MaxLineNumber) {
              if (i !== content.length) {
                fillText = fillText.substring(0, fillText.length - 1) + '...';
                this.ctx.fillText(fillText, left, fillTop);
                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
                fillText = '';
                break;
              }
            }

            this.ctx.fillText(fillText, left, fillTop);
            this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
            fillText = '';
			len = 0 ;
            fillTop += lineHeight;
            lineNum++;
			
          } else if (content.charCodeAt(i) == 10) {
            this.ctx.fillText(fillText, left, fillTop);
            this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
            fillText = '';
            fillTop += lineHeight;
            lineNum++;
          }
        }

        this.ctx.fillText(fillText, left, fillTop);
        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText);
      }

      this.ctx.restore();

      if (bolder) {
        this.drawText({ ...params,
          left: left + 0.3,
          top: top + 0.3,
          bolder: false,
          textDecoration: 'none'
        });
      }
    },

    getContent(detail, length = 24, row = 2) {
      let len = 0;
      let index = 0;
      let content = [];

      for (let i = 0; len < detail.length; i++) {
        // 若未定义则致为 ''
        if (!content[index]) content[index] = '';
        content[index] += detail[i]; // 中文或者数字占两个长度

        if (detail.charCodeAt(i) > 127 || detail.charCodeAt(i) >= 48 && detail.charCodeAt(i) <= 57) {
          len += 2;
        } else {
          len++;
        }

        if (len >= length || row - index == 1 && len >= length - 2) {
          len = 0;
          index++;
        }

        if (index === row) break;
      }

      return content;
    },

    drawTextLine(left, top, textDecoration, color, fontSize, content) {
      if (textDecoration === 'underline') {
        this.drawRect({
          background: color,
          top: top + fontSize * 1.2,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        });
      } else if (textDecoration === 'line-through') {
        this.drawRect({
          background: color,
          top: top + fontSize * 0.6,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        });
      }
    },

    drawRect(params) {
      this.ctx.save();
      const {
        background,
        top = 0,
        left = 0,
        width = 0,
        height = 0
      } = params;
      this.ctx.setFillStyle(background);
      this.ctx.fillRect(left, top, width, height);
      this.ctx.restore();
    },

    getImageInfo(url) {
      return new Promise((resolve, reject) => {
        if (this.cache[url]) {
          console.log(' canvasdrawer getImageInfo() cache[url]:', this.cache[url], 'url:', url);
          resolve(this.cache[url]);
        } else {
          const objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
          const objExp2 = new RegExp(/^http:\/\/store\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
          const objExp3 = new RegExp(/^wxfile:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
         
		  uni.getImageInfo({
            src: url,
            complete: res => {
              if (res.errMsg === 'getImageInfo:ok') {
                this.cache[url] = res.path;
				/*
				wx.showToast({
				  title: "canvas 图片下载完成"+res.path,
				  icon: 'none',
				  duration: 2000
				});
				*/
                resolve(res.path);
              } else {
                console.log('getImageInfo complete error url:', url, 'res:', res); //console.log('res:', res)
                this.$emit('getImage', {
                  errMsg: 'canvasdrawer:download fail'
                }); //reject(new Error(' canvasdrawer getImageInfo fail'))
              }
            },
            fail: res => {
				console.log(' canvasdrawer wx.getImageInfo 接口调用失败', res, url); //reject(new Error('canvasdrawer wx.getImageInfo 接口调用失败'))
				this.$emit('getImage', {
					errMsg: 'canvasdrawer:getImageInfo 接口调用失败'
				});
			}
          });

          if (objExp.test(url) || objExp2.test(url) || objExp3.test(url)) {} else {
            console.log('canvasdrawer getImageInfo cache url already:', url); //this.cache[url] = url
            //resolve(url)
          }
        }
      });
    },

    saveImageToLocal() {
      const {
        width,
        height
      } = this;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width,
        height,
        canvasId: 'canvasdrawer',
        complete: res => {
          if (res.errMsg === 'canvasToTempFilePath:ok') {
            this.setData({
              showCanvas: false,
              isPainting: false,
              imageList: [],
              tempFileList: []
            });
			/*
			wx.showToast({
			  title: "canvasdrawer 图片保留本地",
			  icon: 'none',
			  duration: 2000
			});
			*/
            this.$emit('getImage', {
              tempFilePath: res.tempFilePath,
              errMsg: 'canvasdrawer:ok'
            });
          } else {
            this.$emit('getImage', {
              errMsg: 'canvasdrawer:fail'
            });
          }
        }
      }, this);
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
@import "./canvasdrawer.css";
</style>