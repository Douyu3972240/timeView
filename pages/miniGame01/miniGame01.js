let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChoice:true,  //用户是否可以选择，保证在结果出来之前用户只能点一下
    competitionResult:"",
    userNumber: "",
    robotNumber: "",
    robot: null,
    userChoice: null,
    options: [{
      icon: "iconshitou",
      n: 0,
    }, {
      icon: "iconbu",
      n: 1,
    }, {
      icon: "iconjiandao",
      n: 2,
    }]
  },
  choice(e) {
    let _this = this
    if(_this.data.isChoice == false){
      return false
    }
    _this.setData({
      isChoice:false
    })
    console.log(e)
    console.log(e.currentTarget.dataset.type)
    for (let i = 0; i < _this.data.options.length; i++) {
      if (_this.data.options[i].n == e.currentTarget.dataset.type) {
        _this.data.userChoice = _this.data.options[i]
        break;
      }
    }
    _this.setData({
      userNumber: e.currentTarget.dataset.type,
      userChoice: _this.data.userChoice
    })

    let randomNumber = 0 //记录随机的次数

    _this.setData({
      robot: _this.data.options[parseInt(Math.random() * (_this.data.options.length))]
    })
    randomNumber = randomNumber + 1
    let random = 0
    let timer = setInterval(() => {
      random = parseInt(Math.random() * (_this.data.options.length))
      _this.setData({
        robotNumber: random,
        robot: _this.data.options[random]
      })
      if (randomNumber >= 5) {
        clearInterval(timer)
        randomNumber = 0
        //然后开始判断结果
        if (_this.data.robotNumber == 2 && _this.data.userNumber == 0) {
          //这里判断为 2剪刀 0石头  玩家赢
          console.log(`玩家赢 r:${_this.data.robotNumber},u:${_this.data.userNumber}`)
          _this.setData({
            competitionResult:"winer"
          })
        } else
        if (_this.data.userNumber == 2 && _this.data.robotNumber == 0) {
          console.log(`robot赢 r:${_this.data.robotNumber},u:${_this.data.userNumber}`)
          _this.setData({
            competitionResult: "loser"
          })
        } else
        if (_this.data.robotNumber > _this.data.userNumber) {
          //这里判断为机器人赢
          console.log(`robot赢 r:${_this.data.robotNumber},u:${_this.data.userNumber}`)
          _this.setData({
            competitionResult: "loser"
          })
        } else
        if (_this.data.userNumber > _this.data.robotNumber) {
          console.log(`玩家赢 r:${_this.data.robotNumber},u:${_this.data.userNumber}`)
          _this.setData({
            competitionResult: "winer"
          })
        } else {
          console.log(`平局 r:${_this.data.robotNumber},u:${_this.data.userNumber}`)
          _this.setData({
            competitionResult: "dogfall"
          })
        }
      }
      setTimeout(()=>{
        _this.setData({
          competitionResult: "",
          isChoice:true
        })
      },3000)
      console.log(`randomNumber:${randomNumber}`)
      randomNumber = randomNumber + 1
    }, 100)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
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