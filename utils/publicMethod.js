export default {
  // 方法1
  test1:1,
  test2:"2",
  test3:false,
  testMethod1: function () {
    console.log('对，我只是一个测试公共方法')
  },
  // 方法2
  testMethod2: function (val) {
    console.log('巧了，我也是测试公共方法，我是', val)
  }
}
