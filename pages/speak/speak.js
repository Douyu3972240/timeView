// pages/speak/speak.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName:["姓名1"],
    currentInput:"",
    paragraph:[]
  },
  paragraph(e){
    console.log(e)
    let _this = this
    _this.data.paragraph.push(e.detail.value)
    _this.setData({
      paragraph: _this.data.paragraph
    })
  },
  inputName(e){
    let _this = this
    console.log(e)
    _this.setData({
      currentInput: e.detail.value
    })
  },
  confirm(){
    let _this = this
    if (_this.data.inputName.length > 10){
      wx.showToast({
        title: '最多只能有10个人',
        icon:"none"
      })
      return false
    }
    _this.data.inputName.push(_this.data.currentInput)
    _this.setData({
      inputName: _this.data.inputName
    })
    setTimeout({
      currentInput:""
    },10)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this

    wx.setNavigationBarTitle({
      title: '编写寄语',
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