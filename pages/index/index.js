let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSentenceIndex: 0, //决定显示sentence里面的第几个
    sentence: ['少壮不努力,老大徒伤悲', '花有重开时,人无再少年', '一寸光阴一寸金,寸金难买寸光阴', '等时间的人,就是浪费时间的人', '钉子是敲进去的,时间是挤出来的', '黑发不知勤学早,白首方悔读书迟'],
    animationSentence: [], //用于将句子以动画的方式显示出来
    scaleArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    percent: 0, //百分比，默认为0
    timer: {
      refreshTime: null, //用于控制刷新界面上的时间
      refreshSentence: null, //用于刷新谚语,
      animationWord: null, //用于谚语里面每个文字的显示定时器
    }, //时间管理
    timeUnit: {
      year: [0, 0, 0, 0],
      month: [0, 0],
      day: [0, 0],
      hour: [0, 0],
      minute: [0, 0],
      second: [0, 0]
    },
    time: {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("index onLoad")
    let _this = this
    let percent = app.time.calculatePercent(`${app.time.getYMDHMS().year}/01/01 00:00:00`, `${app.time.getYMDHMS().year}/12/30 23:59:59`, `${app.time.getYMDHMS().year}/${app.time.getYMDHMS().month}/${app.time.getYMDHMS().day} ${app.time.getYMDHMS().hour}:${app.time.getYMDHMS().minute}:${app.time.getYMDHMS().second}`)


    if (percent < 50) {
      //表示已过的时间没有超过一半
      _this.data.sentence.unshift(`${app.time.getYMDHMS().year}年还有${parseInt(100 - percent)}%,且行且珍惜`)
    } else {
      _this.data.sentence.unshift(`${app.time.getYMDHMS().year}年剩余${parseInt(100 - percent)}%,珍惜现在,把握未来`)
    }
    _this.setData({
      sentence: _this.data.sentence
    })
    console.log(_this.data.sentence)
    _this.coolText(_this.data.sentence, 300)


    _this.setData({
      time: app.time.getYMDHMS(),
      timeUnit: {
        year: [app.time.getYMDHMS().year.toString()[0], app.time.getYMDHMS().year.toString()[1], app.time.getYMDHMS().year.toString()[2], app.time.getYMDHMS().year.toString()[3]],
        month: [app.time.getYMDHMS().month.toString()[0], app.time.getYMDHMS().month.toString()[1]],
        day: [app.time.getYMDHMS().day.toString()[0], app.time.getYMDHMS().day.toString()[1]],
        hour: [app.time.getYMDHMS().hour.toString()[0], app.time.getYMDHMS().hour.toString()[1]],
        minute: [app.time.getYMDHMS().minute.toString()[0], app.time.getYMDHMS().minute.toString()[1]],
        second: [app.time.getYMDHMS().second.toString()[0], app.time.getYMDHMS().second.toString()[1]]
      }
    })




    wx.setNavigationBarTitle({
      title: `${_this.data.time.year}/${_this.data.time.month}/${_this.data.time.day}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  coolText(text, duration) {
    //text 传入的文字数组
    //showAnimation 每个字显示出来需要用到的时间，单位ms
    let _this = this
    let arr = []
    let showTextIndex = 0 //当前是显示到第几个文字了

    for (let i = 0; i < text.length; i++) {
      arr.push([])
      for (let k = 0; k < text[i].length; k++) {
        arr[i].push({
          duration,
          text: text[i][k],
          opacity: 0
        })
      }
    }
    _this.setData({
      animationSentence: arr
    })
    //以上文字已完成基本配置
    //下面开始逐个显示出来
    clearInterval(this.data.animationWord)
    _this.data.animationWord = setInterval(() => {
      if (showTextIndex < _this.data.animationSentence[_this.data.showSentenceIndex].length) {
        _this.data.animationSentence[_this.data.showSentenceIndex][showTextIndex].opacity = 1
        showTextIndex++
        _this.setData({
          animationSentence: _this.data.animationSentence
        })
      }
    }, 150)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("index onShow")
    let _this = this
    clearInterval(_this.data.timer.refreshTime)
    clearInterval(_this.data.timer.refreshSentence)

    _this.data.timer.refreshSentence = setInterval(() => {
      //每5000ms更新一次
      _this.data.showSentenceIndex++
        if (_this.data.showSentenceIndex == _this.data.sentence.length - 1) {
          _this.data.showSentenceIndex = 0
        }
      _this.setData({
        showSentenceIndex: _this.data.showSentenceIndex
      })
      //更新完毕后调用coolText方法，让文字逐字显示出来
      _this.coolText(_this.data.sentence, 300)
    }, 5000)




    _this.data.timer.refreshTime = setInterval(() => {
      //每250ms更新一次时间,和百分比
      _this.setData({
        time: app.time.getYMDHMS(),
        percent: app.time.calculatePercent(`${app.time.getYMDHMS().year}/01/01 00:00:00`, `${app.time.getYMDHMS().year}/12/30 23:59:59`, `${app.time.getYMDHMS().year}/${app.time.getYMDHMS().month}/${app.time.getYMDHMS().day} ${app.time.getYMDHMS().hour}:${app.time.getYMDHMS().minute}:${app.time.getYMDHMS().second}`),
        timeUnit: {
          year: [app.time.getYMDHMS().year.toString()[0], app.time.getYMDHMS().year.toString()[1], app.time.getYMDHMS().year.toString()[2], app.time.getYMDHMS().year.toString()[3]],
          month: [app.time.getYMDHMS().month.toString()[0], app.time.getYMDHMS().month.toString()[1]],
          day: [app.time.getYMDHMS().day.toString()[0], app.time.getYMDHMS().day.toString()[1]],
          hour: [app.time.getYMDHMS().hour.toString()[0], app.time.getYMDHMS().hour.toString()[1]],
          minute: [app.time.getYMDHMS().minute.toString()[0], app.time.getYMDHMS().minute.toString()[1]],
          second: [app.time.getYMDHMS().second.toString()[0], app.time.getYMDHMS().second.toString()[1]]
        }
      })
    }, 250)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let _this = this
    console.log("onHide")
    clearInterval(_this.data.timer.animationWord)
    clearInterval(_this.data.timer.refreshSentence)
    clearInterval(_this.data.timer.refreshTime)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    let _this = this
    console.log("onUnload")
    clearInterval(_this.data.timer.animationWord)
    clearInterval(_this.data.timer.refreshSentence)
    clearInterval(_this.data.timer.refreshTime)
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

  },
  onShareTimeline(){
    console.log("onShareTimeline被调用")
    return {
      title:"好料不停",
      query:"pages/test01/test01",
      imageUrl:""
    }
  }
})