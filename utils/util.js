function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function getDateStr(today, addDayCount, type = 0) {
  var dd;

  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }

  dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期 

  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期 

  var d = dd.getDate();
  var hour = dd.getHours();
  var minute = dd.getMinutes();
  var second = dd.getSeconds();

  if (m < 10) {
    m = '0' + m;
  }

  ;

  if (d < 10) {
    d = '0' + d;
  }

  ;

  if (hour < 10) {
    hour = '0' + hour;
  }

  ;

  if (minute < 10) {
    minute = '0' + minute;
  }

  ;

  if (second < 10) {
    second = '0' + second;
  }

  ;

  if (type == 0) {
    //返回日期
    return y + "-" + m + "-" + d;
  } else if (type == 1) {
    //返回时间 分钟
    return hour + ":" + minute;
  } else if (type == 2) {
    //返回时间 秒
    return hour + ":" + minute + ":" + second;
  } else {
    return y + "-" + m + "-" + d;
  }
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

function getDateDiff(dateTimeStamp) {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var year = day * 365;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;

  if (diffValue < 0) {
    //非法操作
    return '数据出错';
  }

  var yearC = diffValue / year;
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;

  if (yearC >= 1) {
    result = parseInt(yearC) + '年以前';
  } else if (monthC >= 1) {
    result = parseInt(monthC) + '个月前';
  } else if (weekC >= 1) {
    result = parseInt(weekC) + '星期前';
  } else if (dayC >= 1) {
    result = parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '小时前';
  } else if (minC >= 5) {
    result = parseInt(minC) + '分钟前';
  } else {
    result = '刚刚发表';
  }

  return result;
}

function formatString(str) {
  if (typeof str != "string") {
    console.log('去除回车换行空格失败！参数不是字符串类型');
    return;
  }

  str = str.replace(/\ +/g, ""); //去掉空格

  str = str.replace(/[\r\n]/g, ""); //去掉回车换行

  return str;
} //计算两个时间戳的差


function calDateDiff(startTime, endTime, type = 0) {
  //日期格式化
  var start_date = new Date(startTime.replace(/-/g, "/"));
  var end_date = new Date(endTime.replace(/-/g, "/")); //转成毫秒数，两个日期相减

  var ms = end_date.getTime() - start_date.getTime(); //转换成天数

  var day = parseInt(ms / (1000 * 60 * 60 * 24));

  if (type == 0) {
    //毫秒级
    return ms;
  } else if (type == 1) {
    //日级
    return day;
  } //do something
  //console.log("day = ", day);

}

function filterEmoji(name) {
  var str = name.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, "");
  return str;
} // 版本对比  兼容


function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }

  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

function base64src(base64data) {
  let FILE_BASE_NAME = 'tmp_base64src';
  return new Promise((resolve, reject) => {
    if (!wx.getFileSystemManager) {
      reject(new Error('微信版本过低'));
      return;
    }

    let fsm = wx.getFileSystemManager();
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];

    if (!format) {
      reject(new Error('ERROR_BASE64SRC_PARSE'));
    }

    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',

      success() {
        resolve(filePath);
      },

      fail() {
        reject(new Error('ERROR_BASE64SRC_WRITE'));
      }

    });
  });
}

; //获取客户端平台

function getPlatform() {
  var platform = 'ios';

  try {
    var res = wx.getSystemInfoSync();
    platform = res.platform;
  } catch (e) {// Do something when catch error
  }

  return platform;
}

function percentage(number1, number2) {
  return Math.round(number1 / (number1 + number2) * 10000) / 100.00 + "%"; // 小数点后两位百分比
}

function checkEmail(email){
    return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(email);
}
//校验手机格式
function checkPhoneNumber(mobile){
    return RegExp(/^1[34578]\d{9}$/).test(mobile);
}

module.exports = {
  formatTime: formatTime,
  getDateDiff: getDateDiff,
  getDateStr: getDateStr,
  formatString: formatString,
  calDateDiff: calDateDiff,
  compareVersion: compareVersion,
  filterEmoji: filterEmoji,
  checkPhoneNumber: checkPhoneNumber,
  base64src: base64src,
  getPlatform: getPlatform,
  percentage: percentage,
  checkEmail:checkEmail,
  formatLocation: formatLocation,
  dateUtils: dateUtils,
};