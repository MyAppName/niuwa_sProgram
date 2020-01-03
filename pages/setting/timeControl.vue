<template>
  <view>
    <!-- <img class="avatarUrl" :src="avatarUrl" alt="">
  <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">获取权限</button> -->
  <view class="TC_title">时间管控</view>
  <view class="TC_btn">
    <view class="TC_btnText">是否开启时间管控</view>
    <view  class="TC_btnBtn" v-if="isbut==false" @click="changeBtn">
      <view class="open openColor">开</view><view class="close closeColor">关</view>
    </view>
    <view  class="TC_btnBtn" v-if="isbut==true"  @click="changeBtn">
      <view class="open openColor2">开</view><view class="close closeColor2">关</view>
    </view>
  </view>
  <view class="timeTitle" v-if="isbut==true">
    <view>管控日期</view>
    <view @click="workingDay" v-if="isDay==false">每天</view>
    <view @click="workingDay" v-if="isDay==true">工作日</view>
  </view>
  <view class="timeChoose"  v-if="isbut==true">
    <view class="Choose">
      <view class="start"> <img class="startimg" :src="start" alt=""> 选择起始时间</view>
      <view>
        <picker mode="time" :value="startTime" fields='month' @change="timeChange" @click='myclick'>
          <view class="picker">
              {{startTime}}
          </view>
        </picker>
      </view>
    </view>

    <view class="Choose">
      <view class="start"> <img class="startimg" :src="end" alt=""> 选择结束时间</view>
      <view>
        <picker mode="time" :value="endTime" fields='month' @change="timeChange2" @click='myclick'>
          <view class="picker">
              {{endTime}}
          </view>
        </picker>
      </view>

    </view>
  </view>
  <view  v-if="isbut==true" class="Submission" @click="Submission">提交</view>
  </view>
</template>
<script>


export default {

 /** 
  * 页面的初始数据 
  */

 data() {
 	return {  
    url:"",
    deviceId:"a",
    isbut:false,
    isDay:false,
    code:"",
    startTime:"00:00",
    endTime:"00:00",
    daylimit:"Mon,Tue,Wed,Thu,Fri",
    start:'https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/list/start54.png?sign=6e76137c858fc3bc3c46c94db4e72f93&t=1574669501',
    end:'https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/list/end54.png?sign=1af34b6e7daee94422370b57c9a9f873&t=1574670491',
 }
 },
 methods: {
        timeChange: function (e) {
          this.startTime=e.mp.detail.value;
        // console.log('picker发送选择改变，携带值为',  e.mp.detail.value)endTime
          },
        timeChange2: function (e) {
          this.endTime=e.mp.detail.value;
        // console.log('picker发送选择改变，携带值为',  e.mp.detail.value)endTime
          },
        changeBtn:function(){
            this.isbut=!this.isbut;
            if(this.isbut==true){
              
              // uni.showToast({
              //           title: '开启成功',
              //           icon: 'success',
              //           duration: 1000
              //           })
            }
            if(this.isbut==false){
              let timeControl={};
              
			  // console.log(timeControl);
              let ts=this;
			  uni.request({
			      url: ts.url+'web/api/setTimeStrategy',
			      header: {
			              "content-type": "application/json"
			          },
			      data:{
			        deviceId:ts.deviceId,
			        startTime:"00:00",
			        endTime:"00:00",
			        daylimit:"",
			  		timeStatus:0
			      },
			      method: "POST",  
			      success: function(res){
			          if(res.data.msg=="success"){    
			            ts.startTime="00:00";
			            ts.endTime="00:00";
						timeControl.isbut=false;
						timeControl.isDay=false;
						timeControl.startTime=ts.startTime;
						timeControl.endTime=ts.endTime;
						uni.setStorageSync('timeControl', timeControl);
			            uni.showModal({
			                title: '关闭成功',
			                content: '是否返回上一页',
			                success: function(res) {
			                    if (res.confirm) {
									uni.navigateBack({
										delta:1
									})
			                    } else if (res.cancel) {}
			                }
			            })
			              }else{
			            uni.showToast({
			                  title: '关闭成功'+res.data.msg+"_id:"+ts.deviceId,
			                  icon: 'loading',
			                  duration: 2000
			                  })
			          }
			      },
			      fail: function(res) {
			          uni.showToast({
			                  title: '设置失败id:'+ts.deviceId,
			                  icon: 'none',
			                  duration: 2000
			                  })
			      },
			  });
            }
          },
          workingDay:function(){
            this.isDay=!this.isDay;
            if(this.isDay==true){
              this.daylimit="Mon,Tue,Wed,Thu,Fri";
            }
            if(this.isDay==false){
              this.daylimit="Mon,Tue,Wed,Thu,Fri,Sat,Sun";
            }
          },
          Submission:function(){
            let ts=this;
            if(ts.isbut){
             uni.request({
            url: ts.url+'web/api/setTimeStrategy',
            header: {
                    "content-type": "application/json"
                },
            data:{
              deviceId:ts.deviceId,
              startTime:ts.startTime,
              endTime:ts.endTime,
              daylimit:ts.daylimit,
			  timeStatus:1
            },
            method: "POST",  
            success: function(res){
                if(res.data.msg=="success"){    
                  let timeControl={};
                  timeControl.isbut=ts.isbut;
                  timeControl.isDay=ts.isDay;
                  timeControl.startTime=ts.startTime;
                  timeControl.endTime=ts.endTime;
                  uni.setStorageSync('timeControl', timeControl);
                  uni.showModal({
                      title: '提交成功',
                      content: '是否返回上一页',
                      success: function(res) {
                          if (res.confirm) {
                  			uni.navigateBack({
                  				delta:1
                  			})
                          } else if (res.cancel) {}
                      }
                  })
                    }else{
                  uni.showToast({
                        title: res.data.msg+"_id:"+ts.deviceId,
                        icon: 'loading',
                        duration: 2000
                        })
                }
            },
            fail: function(res) {
                uni.showToast({
                        title: '设置失败id:'+ts.deviceId,
                        icon: 'none',
                        duration: 2000
                        })
            },
        });
        }else{
           
        }
          },
          // Lose:function(){
          //   console.log("lose");
          // },
        },

 onLoad: function (options) { 
   this.url=this.$consturl;
   let a=uni.getStorageSync('timeControl');
   this.deviceId=uni.getStorageSync('deviceId');
  //  console.log(a);
   if(a!=''){
   this.isbut=a.isbut;
   this.isDay=a.isDay;
   this.startTime=a.startTime;
   this.endTime=a.endTime;
   }
   
  //  console.log('用户按了拒绝按钮');
       
 },
}
</script>

<style>
.TC_title{
  width: 100%;
  font-size: 32rpx;
  text-align: center;
  color: #333333;
}
.TC_btn{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 48rpx;
}
.TC_btnText{
  height: 53rpx;
  line-height: 53rpx;
  font-size: 24rpx;
  color: #333333;
  margin-left: 93rpx;

}
.TC_btnBtn{
  display: flex;
  flex-direction: row;
  margin-right:93rpx ;

}
.TC_btnBtn>view{
  width: 112rpx;
  height: 54rpx;
  line-height: 54rpx;
  text-align: center;

}
.open{
  border-top-left-radius: 50rpx;
  border-bottom-left-radius: 50rpx;
  
}
.close{
  border-top-right-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
  
}
.openColor{
  background-color: #ffffff;
  color: #000000;
  box-shadow:  #000000 0px 0px 3rpx;
}
.closeColor{
  background-color: #000000;
  color: #ffffff;
}
.openColor2{
  background-color: #000000;
  color: #ffffff;
  
}
.closeColor2{
  background-color: #ffffff;
  color: #000000;
  box-shadow:  #000000 0px 0px 3rpx;
}

.timeTitle{
  width: 500rpx;
  height: 70rpx;
  line-height: 70rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 93rpx;
  margin-top: 20rpx;
  font-size: 24rpx;
  color: #999999;
}

.timeChoose{
  width: 500rpx;
  height: 140rpx;
  line-height: 70rpx;
  
  margin-left: 93rpx;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #333333;

}
.Choose{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.start{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.startimg{
  width: 40rpx;
  height: 40rpx;
  margin-right: 14rpx;
}
.Submission{
  width: 224rpx;
  height: 54rpx;
  line-height: 54rpx;
  margin: 60rpx auto;
  box-shadow:  #000000 0px 0px 3rpx;
  text-align: center;
  font-size: 28rpx;
  border-radius: 30rpx;
  color: white;
  background-color: #000000;
}
</style>
