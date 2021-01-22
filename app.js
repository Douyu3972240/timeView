
App({
  //在这里将需要用到的函数引入进来是为了解决不能引入跟路径的问题，需要用的地方直接获取app就可以了
  time : require('/utils/time.js'),
  colorHex(rgb) {
    // RGB颜色值的正则
    var reg = /^(rgb|RGB)/;
    if (reg.test(rgb)) {
      var strHex = "#";
      // 把RGB的3个数值变成数组
      var colorArr = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      // 转成16进制
      for (var i = 0; i < colorArr.length; i++) {
        console.log(`colorArr[${i}]:${Number(colorArr[i])},${Number(colorArr[i]).toString(16).length < 2}`)
        var hex = Number(colorArr[i]).toString(16).length < 2 ? `0${Number(colorArr[i]).toString(16)}` : Number(colorArr[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      return strHex;
    } else {
      return String(rgb);
    }
  },
  colorRgb(hex) {
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    var color = hex.toLowerCase();
    if (reg.test(color)) {
      // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
        var colorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        color = colorNew;
      }
      // 处理六位的颜色值，转为RGB
      var colorChange = [];
      for (var i = 1; i < 7; i += 2) {
        colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
      }
      return "RGB(" + colorChange.join(",") + ")";
    } else {
      return color;
    }
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (e) {
    console.log("app onLaunch",e)
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
