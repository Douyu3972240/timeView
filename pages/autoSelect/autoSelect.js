let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    randomClass: "linear-gradient", //给添加的选项加上随机的class
    beginTime: 0, //用户点击帮我选择的次数 
    countdown: 3, //默认从第3秒开始倒计时
    sysInfo: null,
    number: [],
    isShowAutoChoose: false,
    inputText: "",
    timer: {
      countdown: null, //倒计时
      randomer: null, //随机的频率
    }, //管理时间的变量
    chooseArr: [], //用户输入的所有选项
    addChooseNumber: 1, //用于提示用户当前是添加的第几个选择,
    randomChoose: "", //程序帮用户选中了第几个
  },
  reset() {
    let _this = this
    _this.setData({
      chooseArr: [],
      randomChoose: "",
      beginTime: 0,
      addChooseNumber: 1
    })
  },
  beginChoose() {
    let _this = this
    //开始帮用户选出结果
    _this.data.beginTime = _this.data.beginTime + 1

    _this.setData({
      isShowAutoChoose: true,
      beginTime: _this.data.beginTime
    })
    clearInterval(_this.data.timer.countdown)
    clearInterval(_this.data.timer.randomer)

    _this.data.timer.randomer = setInterval(() => {
      _this.setData({
        randomChoose: parseInt(Math.random() * _this.data.chooseArr.length)
      })
      console.log(`randomChoose:${_this.data.randomChoose}`)
    }, 100)

    _this.data.timer.countdown = setInterval(() => {
      _this.data.countdown = _this.data.countdown - 1
      if (_this.data.countdown < 1) {
        clearInterval(_this.data.timer.countdown)
        clearInterval(_this.data.timer.randomer)
        _this.setData({
          isShowAutoChoose: false,
          countdown: 3
        })
        wx.showToast({
          title: `这次选中了 ${_this.data.chooseArr[_this.data.randomChoose].text} 哦~~`,
          icon: "none"
        })
      } else {
        _this.setData({
          countdown: _this.data.countdown
        })
      }

    }, 1 * 1000)
  },
  delete(e) {
    let _this = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: `确定删除第${e.currentTarget.dataset.index+1}个选项吗？`,
      success: res => {
        if (res.confirm) {
          //开始删除
          for (let i = 0; i < _this.data.chooseArr.length; i++) {
            if (e.currentTarget.dataset.text == _this.data.chooseArr[i]) {
              _this.data.chooseArr.splice(i, 1)
            }
          }
          _this.setData({
            addChooseNumber: _this.data.chooseArr.length + 1,
            chooseArr: _this.data.chooseArr
          })
        }
      }
    })
  },
  append() {
    //开始添加

    let _this = this
    console.log(`_this.data.chooseArr.length:${_this.data.chooseArr.length}`)
    if (_this.data.inputText.length == 0) {
      wx.showToast({
        title: `请先填写 选择${_this.data.addChooseNumber}`,
        icon: "none"
      })
      return false
    } else if (_this.data.inputText.length > 6) {
      wx.showToast({
        title: `最多只能输入6个字符`,
        icon: "none"
      })
      return false
    } else if (_this.data.chooseArr.length >= 12) {
      wx.showToast({
        title: `最多只能添加12个哦~~`,
        icon: "none"
      })
      return false
    }
    _this.data.randomClass = "linear-gradient"
    _this.data.chooseArr.push({
      text: _this.data.inputText,
      class: `${_this.data.randomClass}${parseInt(Math.random()*3)+1}`
    })
    _this.data.addChooseNumber = _this.data.chooseArr.length + 1

    _this.setData({
      addChooseNumber: _this.data.addChooseNumber,
      chooseArr: _this.data.chooseArr
    })
    setTimeout(() => {
      _this.setData({
        inputText: ""
      })
    }, 10)
  },
  inputChoose(e) {
    let _this = this
    console.log(e)
    _this.setData({
      inputText: e.detail.value.replace(/(^\s*)|(\s*$)/g, "")
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: `${app.time.getYMDHMS().year}/${app.time.getYMDHMS().month}/${app.time.getYMDHMS().day}`,
    })
    let sysInfo = wx.getSystemInfoSync()
    console.log(sysInfo)
    for (let i = 0; i < 10; i++) {
      this.data.number.push(i)
    }
    this.setData({
      sysInfo: sysInfo,
      number: this.data.number
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let _this = this
    clearInterval(_this.data.timer.countdown)
    clearInterval(_this.data.timer.randomer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})