let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentKeyType: "", //当前是在设置哪个key
    rgb: '', //初始值
    pick: false,
    keyword: ["傻逼", "煞笔", "萨比", "撒币", "sb", "毛泽东", "袁隆平", "fuck", "操你", "艹", "艹你", "毛泽东", "pig", "dog", "王八", "杂总", "杂种", "神经病", "cao", "习近平", "周恩来", "http", "www", ".com", ".cn", ".net", ".tv", "://", "你吗", "尼玛", "腻玛", "nima", "高清", "监控", "偷拍", "摄像头", "妇女", "少妇", "轮", "乱", "奸", "孬", "半夜", "嫂子", "酒店", "一炮", "一泡", "一晚", "tou拍", "小姐", "xiao姐", "xiaojie", "夜总会", "腾讯", "监听", "偷听", "窃听", "做爱", "做ai", "zuo爱", "makelove"], //关键字屏蔽
    timer: null,
    setTimeoutTimer: null,
    isLoopAnimation: false, //是否开始循环动画
    fontSpeed: 100, //100慢，200快， 300很快
    backgroundColor: "#333333", //背景颜色
    frontColor: "#ff0000", //字体颜色
    fontSize: 100, //100rpx 小，200rpx 中， 300rpx 大
    isShowFullText: false, //是否显示滚动字幕
    animate: null,
    elementInfo: null,
    inputText: "", //用户输入的文字
    text: [],
    sysInfo: null,
    animationTime: 0
  },
  pickColor(e) {
    let _this = this
    let color = app.colorHex(e.detail.color)
    console.log(color)
    console.log(e)
    _this.setData({
      [_this.data.currentKeyType]: color
    })
  },
  close() {
    let _this = this
    wx.setNavigationBarColor({
      backgroundColor: "#333333",
      frontColor: "#ffffff"
    })
    let animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear'
    })
    let animate = animation.bottom(`-${_this.data.elementInfo.height}px`).step().export()
    _this.setData({
      animate: animate
    })




    //先关闭滚动显示
    _this.setData({
      isShowFullText: false,
      animate: null,
      text: [],
      elementInfo: null
    })
    clearTimeout(_this.data.timer)
  },
  begin() {
    let _this = this
    //先开始判断
    if (_this.data.backgroundColor == _this.data.frontColor) {
      wx.showToast({
        title: '背景色和文字颜色不能一样',
        icon: "none"
      })
      return false
    } else if (_this.data.inputText.length == 0) {
      wx.showToast({
        title: '请输入文字',
        icon: "none"
      })
      return false
    }

    for (let i = 0; i < _this.data.keyword.length; i++) {
      if (_this.data.inputText.toLowerCase().indexOf(_this.data.keyword[i]) >= 0) {
        //存在关键字
        wx.showToast({
          title: '请不要输入非法字眼',
          icon: "none"
        })
        return false
      }
    }
    //以上判断都没有问题了，开始吧

    _this.setData({
      isShowFullText: true
    })

    for (let i = 0; i < _this.data.inputText.length; i++) {
      _this.data.text.push(_this.data.inputText[i])
    }

    _this.setData({
      text: _this.data.text,
      isLoopAnimation: true
    })
    //设置title和背景颜色
    console.log(_this.data.backgroundColor.toString())
    wx.setNavigationBarColor({
      backgroundColor: `${_this.data.backgroundColor}`,
      frontColor: `#000000`
    })
    wx.setNavigationBarTitle({
      title: ""
    })
    console.log("开始调用 getElementInfo")
    _this.getElementInfo(_this.data.fontSpeed)


  },
  changeEnd(e) {
    //选择字体大小和滚动速度
    let _this = this
    console.log(e)
    _this.setData({
      [e.currentTarget.dataset.key]: e.detail.value
    })
  },
  select(e) {
    let _this = this
    //设置选颜色面板的初始值

    _this.setData({
      pick: false,
    })
    _this.setData({
      pick: true,
      rgb: app.colorRgb(e.currentTarget.dataset.value).toLowerCase(),
      currentKeyType: e.currentTarget.dataset.key
    })

  },
  inputWord(e) {
    let _this = this
    console.log(e)
    console.log(e.detail.value)
    _this.setData({
      inputText: e.detail.value
    })
  },
  getElementInfo(speed) {
    let _this = this
    console.log("这里证明getElementInfo被调用了")
    if (_this.data.isShowFullText == false) {
      return false
    }

    //或得到指定元素的信息，并且设定动画时常
    let sysInfo = wx.getSystemInfoSync()
    console.log("system info is:", sysInfo)
    _this.setData({
      sysInfo
    })
    const query = wx.createSelectorQuery()
    query.select('#text').boundingClientRect()
    query.exec(res => {
      console.log('#text', res)
      if (_this.data.elementInfo == null) {
        console.log("这里需要算出元素在x轴上的中心距离，在y轴上的中心距离")
        //这里需要算出元素在x轴上的中心距离，在y轴上的中心距离
        let xCenter = parseInt(sysInfo.windowWidth / 2 - res[0].width / 2)
        let yCenter = parseInt(sysInfo.windowHeight / 2 - res[0].height / 2)
        res[0].xCenter = xCenter
        res[0].yCenter = yCenter
        res[0].lineHeight = _this.data.fontSize * 0.75


        for (let key in res[0]) {
          console.log(`${key}:${res[0][key]}`)
          if (isNaN(res[0][key]) == false) {
            res[0][key] = parseInt(res[0][key])
          }
        }

  

        _this.setData({
          elementInfo: res[0],
          elementInfoStr: JSON.stringify(res[0])
        })

      }

      //  时间 * 速度 = 文字移动距离
      //  文字长度越长，距离越大
      //  文字移动距离 / 速度 = 时间

      let time = parseInt(((parseInt(_this.data.elementInfo.height) + sysInfo.windowHeight) / speed).toFixed(3) * 1000)
      console.log(`(${parseInt(_this.data.elementInfo.height)} + ${sysInfo.windowHeight}) / ${speed}*1000 = ${time}`)


      let animation = wx.createAnimation({
        duration: time,
        timingFunction: 'linear'
      })
      let animate = animation.bottom(`${sysInfo.windowHeight}px`).step().export()
      setTimeout(() => {
        _this.setData({
          animationTime: time,
          animate
        })
      }, 100)


      if (_this.data.isLoopAnimation) {
        //如果是开启的循环
        _this.data.timer = setTimeout(() => {
          //这里需要初始化
          animation = wx.createAnimation({
            duration: 0,
            timingFunction: 'linear'
          })

          let animate = animation.bottom(`-${_this.data.elementInfo.height}px`).step().export()
          // setTimeout(() => {

          _this.setData({
            animate
          })

          _this.getElementInfo(speed)
          // }, 10)
        }, time)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    let text = ""
    wx.hideShareMenu()
    wx.setNavigationBarTitle({
      title: `${app.time.getYMDHMS().year}/${app.time.getYMDHMS().month}/${app.time.getYMDHMS().day}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    let _this = this

    let animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear'
    })
    let animate = animation.bottom(`-${_this.data.elementInfo.height}px`).step().export()
    _this.setData({
      animate: animate
    })
    clearTimeout(_this.data.timer)
    _this.setData({
      isLoopAnimation: false,
      elementInfo: null
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})