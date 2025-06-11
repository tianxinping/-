// app.js - 小游戏应用入口
App({
  onLaunch() {
    console.log('女巫的毒药小游戏启动');
    
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    console.log('系统信息:', systemInfo);
    
    // 设置屏幕常亮（游戏时避免息屏）
    wx.setKeepScreenOn({
      keepScreenOn: true
    });
  },
  
  onShow() {
    console.log('小游戏显示');
  },
  
  onHide() {
    console.log('小游戏隐藏');
  },
  
  globalData: {
    version: '1.0.0'
  }
});