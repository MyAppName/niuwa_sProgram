<template>
  <view>
    <view class="loginContainer block" >
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
	    <view class="login" id="login1">
        <view class="loginTitle block-title">填写Modem信息</view>
        <input class="input_b input_y" type="text" placeholder="请输入Modem信息" v-model="model_text" />
        <input class="input_b input_y" type="password" placeholder="请输入密码" v-model="model_password" />
        <input @click="button_next($event,'1')" class="butt_next" type="button" value="下一步" />
        <view class="clear" ></view>
        </view>
		
        <view class="login" id="login2" v-show="loginShow2">
        <view class="loginTitle block-title">盒子WIFI信息录入</view>
        <input class="input_b input_y" type="text" placeholder="请输入什么什么" v-model="wifi_text" />
        <input class="input_b input_y" type="password" placeholder="请输入密码" v-model="wifi_password" />
        <input @click="button_next($event,'2')" class="butt_next" type="button" value="下一步" />
        <view class="clear"></view>
        </view>
		
        <view class="login" id="login3" v-show="loginShow3">
        <view class="loginTitle block-title">填写儿童信息</view>
        <input class="input_b input_y" type="text" placeholder="紧急联系人手机号" v-model="child_text" />
        <input class="input_b input_y" type="number" placeholder="家中有几个孩子" v-model="child_number" />
        <input @click="button_next($event,'3')" class="butt_next" type="button" value="下一步" />
        <view class="clear"></view>
        </view>
		
	</scroll-view>
       
      
    </view>
    <view class="footer block">
      <view class="footer_size">填写model信息</view>
      <view class="footer_size">盒子WIFI信息录入</view>
      <view class="footer_size">儿童信息</view>
      <!-- <view class="footer_size">监控设备录入</view> -->
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      url:"",
      scrollTop: 0,
      loginShow2: false,
      loginShow3: false,
      model_text: "",
      model_password: "",
      wifi_text: "",
      wifi_password: "",
      child_text: "",
      child_number: ""
    };
  },
  onPageScroll(Object){
    console.log(Object);
  },
  methods: {
    scroll: function(e) {
				// console.log(e)
				this.scrollTop = e.mp.detail.scrollTop
			},
    //点击下一步 显示下一模块
    button_next: function(e, index) {

					// this.scrollTop = 820
		
      console.log(this.scrollTop);
      if (index == 1) {

        if (this.model_text.length>=6&&this.model_password.length>=6) {
          this.loginShow2 = true;
          console.log("model:" + this.model_text, this.model_password);
          let auth_timetimer = setInterval(() => {
            this.scrollTop = this.scrollTop+1; 
            if (this.scrollTop >= 430) {
				this.scrollTop = 430; 
              clearInterval(auth_timetimer);
           }
          },1);
        } else {
          uni.showToast({
              title:'账号密码不能低于六位',
			  icon: 'none',
              duration: 1000
                  })
        }
      }
      // 
      if (index == 2) {
        if (this.wifi_text.length>=6 && this.wifi_password >=6) {
          this.loginShow3 = true;
          let auth_timetimer = setInterval(() => {
            this.scrollTop = this.scrollTop+1; 
            if (this.scrollTop >= 840) {
				this.scrollTop = 840; 
              clearInterval(auth_timetimer);
           }
          }, 1);
          console.log("wifi:" + this.wifi_text, this.wifi_password);
        } else {
          uni.showToast({
              title: '账号密码不能低于六位',
			  icon: 'none',
              duration: 1000
                  })
        }
      }
      // 
      if (index == 3) {
        let that = this;
        if (this.child_text != "" && this.child_number != "") {
          uni.request({
            // url: "http://192.168.1.133/web/api/addDeviceUser",
             
              url: that.url+"web/api/addDeviceUser",
            header: {
              "content-type": "application/json"
            },
            data: { 
              mac: that.model_text ,
            remark:that.model_password,
            deviceUserInfo:that.wifi_text,
            deviceId:that.wifi_password,
             patriarch :that.child_text
            },
            method: "post",
            success: function(res) {
              console.log(res);
            },
            fail: function() {
              // fail
              console.log("request..----------->....fail");
            },
          });
        } else {
          uni.showToast({
              title:  '账号密码不能低于六位',
			  icon: 'none',
              duration: 1000
                  })
        }
      }
    }
    // qwe:function(){

    // }
  },
  onLoad:function(){
    this.url=this.$consturl;
  }
};
</script>

<style>
/*********************************** 布局 ***********************************/
.loginContainer{
  width: 100%;
  height: 70vh;
  overflow: scroll;
}
.scroll-Y{
  width: 100%;
  height: 100%;
}
.login{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
}
.loginTitle{
  margin-top: 150rpx;
  margin-bottom: 20rpx;

}
.input_b{
  width: 430rpx;
  height: 90rpx;
  font-size: 25rpx;
  border-radius: 50rpx;
  margin-top: 20rpx;
  padding-left: 100rpx;
  background-color:#ffffff;
  overflow: hidden;
}
.butt_next{
  margin-top: 40rpx;
  width: 520rpx;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 50rpx;
  background-color: black;
  color: #ffffff;
  font-size: 28rpx;
  text-align: center;
}
/* 底部 */
.footer {
  width: 100%;
  height: 29vh;
  /*background-color: red;*/
  font-family: "黑体";
  /* top: 70%; */
  position: fixed;
  bottom: 0;
  left: 0;
}
.footer_size {
  font-size: 25rpx;
  height: 33%;
  border-bottom: 1px solid #cccccc;
}

</style>
