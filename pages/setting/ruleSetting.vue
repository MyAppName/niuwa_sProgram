<template>
  <view>
    <view class="RS1">规则设定</view>
    <view class="RS2">
      <view>名单设定</view>
      <view class="item" @click="to(1)">
        <view class="itemText">
          <view>可访问/不可访问名单设置</view>
          <view class="itemText2">新增2个内容</view>
        </view>
        <view class="enter">></view>
      </view>
    </view>
    <view class="line"></view>

    <view class="RS2">
      <view>时间管控</view>
      <view class="item" @click="to(2)">
        <view class="itemText">
          <view>{{isDay}} {{startTime}}-{{endTime}}</view>
          <view class="itemText2">{{isbut}}</view>
        </view>
        <view class="enter">></view>
      </view>
    </view>
  </view>
</template>

<script>


export default {

 /** 
  * 页面的初始数据 
  */
 data() {
 	return {
 		deviceId:"",
 		code:"",
 		isbut:"已关闭",
 		isDay:"",
 		startTime:"00:00",
 		endTime:"00:00",
		url:""
 	}
 },
 methods: {
        to:function(num){
            if(num==1){
              // const url='../listSetting/main';
              const url='./namesSetting';
              uni.navigateTo({url:url})
            }
            if(num==2){
              const url='./timeControl';
              uni.navigateTo({url:url})
            }
        },
  },

 onLoad: function (options) { 
	 console.log(this.$pm.test1);
   let that=this;   
   that.url=that.$consturl;
   that.deviceId=wx.getStorageSync('deviceId');
   uni.request({
            url: that.url+'web/api/getTimeStrategy',
            header: {
                    "content-type": "application/json"
                },
            data: { deviceId: that.deviceId},
            method: "POST",  
            success: function(res){
                let str=res.data.data.timeStrategy;//10:00 11:00 Mon,Tue,Wed,Thu,Fri
				 str=str.split(" ");//切割字符串
				 let isbut=res.data.data.timeStatus;
				// console.log(arr);
				let timeControl={};
				timeControl.isbut=false;
				if(isbut==1){
					timeControl.isbut=true;
				}
				timeControl.isDay=false;
				timeControl.startTime=str[0];
				timeControl.endTime=str[1];
				uni.setStorageSync('timeControl', timeControl);
				
				let a=wx.getStorageSync('timeControl');
				if(a!=''){
				that.startTime=a.startTime;
				that.endTime=a.endTime;
				if(a.isbut==true){
				   that.isbut="已开启";
				}
				if(a.isDay==false){
				   that.isDay="每天";
				}
				if(a.isDay==true){
				   that.isDay="工作日";
				}
				}
                 
            },
            fail: function() {
                // fail
                console.log("获取白名单失败");
            },
            complete: function() {
                // complete
            }
        });
 },
 onShow() {
   let a=wx.getStorageSync('timeControl');
   if(a!=''){
   this.startTime=a.startTime;
   this.endTime=a.endTime;
   if(a.isbut==true){
      this.isbut="已开启";
   }
   if(a.isbut==false){
      this.isbut="已关闭";
   }
   if(a.isDay==false){
      this.isDay="每天";
   }
   if(a.isDay==true){
      this.isDay="工作日";
   }
   }
  },
 
}
</script>

<style>
.line{
  width: 100%;
  height: 1rpx;
  background-color: #e5e5e5;
}
.RS1{
  height: 70rpx;
  line-height: 70rpx;
  font-size: 38rpx;
  margin-left: 35rpx;

}
.RS2{
  margin:28rpx 35rpx;
  font-size: 34rpx;
  color: #333333;
}
.item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  font-size: 24rpx;
  color: #333333;
  margin-top: 7rpx;
}
.enter{
  height: 70rpx;
  line-height: 70rpx;
  font-size: 40rpx;
  color: #999999;
}
.itemText2{
  font-size: 22rpx;
  color: #666666;
}
</style>
