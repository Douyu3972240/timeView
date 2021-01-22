let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      "title": "全屏滚动字幕",
      "describe": "用于手机全屏显示滚动字幕，泡妞、要微信、告示必备。有了它你就是最亮的仔。",
      "url": '../fullScreenText/fullScreenText'
    }, {
      "title": "选择困难症福音",
      "describe": "输入所有你的选择，小程序会帮你做出选择，专治选择困难症。",
      "url": '../autoSelect/autoSelect'
    }, {
      "title": "石头剪刀布",
      "describe": "在你无聊的时候是否会想起这个儿时的回忆。",
      "url": '../miniGame01/miniGame01'
    }, {
      "title": "",
      "describe": "程序猿小哥正在抓紧开发呢,更多功能马上就来",
      "url": ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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