<template>
    <view class="loginContainer block">
        <view class="loginTitle block-title">请再次输入密码以确认</view>

            <label :class="isActive2 ? 'change_loginLabel2 block-label-after2' : 'loginLabel2 block-label2' ">确认密码</label>
            <view :class="isActive2 ? 'focusline block-underline2' : 'underline block-underline2'">
                <img style="height: 30.78rpx; width: 30.78rpx; position: relative; top: 110rpx;" :src="img2" />
                <!-- <input class="loginInput block-input2" :type="passwordType" @focus="inview2"  @blur="outview2" v-model="WiFiPWD"/> -->
                <input class="loginInput block-input2" type="text" v-model="rePWD"  @focus="inview2"  @blur="outview2" required v-if="passwordType==='text'" />
                <input class="loginInput block-input2" type="password" v-model="rePWD"  @focus="inview2"  @blur="outview2" required v-if="passwordType==='password'" />
                <img @click="isSee" class="canSee block-see" :src="img3" />
            </view>


            <button class="loginButton block-button" hover-class="loginButtonHover" @click="gotoInfo()">完成</button>
        </view>
   
</template>


<script>
export default {
    data() {      
        return {
            url:"",
            isActive : false,
            isActive2: false,
            // img2:"https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Normal54%2054%20.png",
            // img3:"https://cloud.eaec.cn/cloud/static/images/login/PWD-unvisible36%2018.png",
            img2:"https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_defult.png?sign=4eb65f08dde71207edd590b186052aaf&t=1574322001",
            img3:"https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_hide.png?sign=73817714f787f54c22687ddba684adcb&t=1574322041",
            see: false,
            passwordType: "password",
            rePWD: "",
			deviceId:"",
            getPWD: '',
        }
    },
    methods: {

        inview2: function() {
            this.isActive2 = true;
            // this.img2 = "https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Finish54%2054.png"
            this.img2 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_success.png?sign=51ead4c1a48107d63f00e2bbaa7a99f8&t=1574322798"
        },
        outview2: function() {
            if (this.rePWD == '') {
                this.isActive2 = false
                // this.img2 = "https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Normal54%2054%20.png"
                this.img2 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_defult.png?sign=75b0653757047567865a5ab26e4533b2&t=1574322881"
            }
        },
        isSee: function() {
            if (this.see == false) {
                // this.img3 = "https://cloud.eaec.cn/cloud/static/images/login/PWD-visible36%2018.png"
                this.img3 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_show.png?sign=68f098f7c9c979070b29a02d48532fc8&t=1574322896"
                this.passwordType = "text"
            }
            else if (this.see == true){
                // this.img3 = "https://cloud.eaec.cn/cloud/static/images/login/PWD-unvisible36%2018.png"
                this.img3 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_hide.png?sign=06c68d9651a55093bd23c59b326f1cce&t=1574322915"
                this.passwordType = "password"
            }  
        },
        gotoInfo() {
            if (this.rePWD == this.getPWD) {
				const url='./SwitchAccount';
                uni.redirectTo({ url });
            }
            else {
                uni.showModal({
                    title: '密码错误',
                    content: '身份验证失败',
                    success: function(res) {
                        if (res.confirm) {
                            
                        } else if (res.cancel) {
                
                        }
                    }
                })
            }
        },

    },

    onLoad: function() {
        this.url=this.$consturl;
        let that = this;
        that.deviceId=uni.getStorageSync('deviceId');
        uni.request({
            url: that.url+'web/api/getBoxWifi',
            data: {deviceId:that.deviceId},
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            success: function(res){
                // success
				console.log(res);
                that.getPWD = res.data.data.password;
				console.log(that.getPWD );

            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        });
    },

}
</script>

<style>
/*********************************** 布局 ***********************************/
.block {
    position: absolute;
    top: 30rpx;
}
.block-title{
    position: relative;
    top: 30rpx;
    width: 100%
}
.block-info{
    position: relative;
    top: 70rpx;
    left: 15%;
    width: 70%;
}
.block-label {
    position: relative;
    top: 110rpx;
    left: 25%;
}
.block-label2 {
    position: relative;
    top: 70rpx;
    left: 25%;
}
.block-label-after {
    position: relative;
    top: 85rpx;
    left: 25%;
}
.block-label-after2 {
    position: relative;
    top: 40rpx;
    left: 25%;
}
.block-underline {
    position: relative;
    top: 20rpx;
    left: 15%;
}
.block-underline2 {
    position: relative;
    bottom: 70rpx;
    left: 15%;
}
block-input {
    position: relative;
    left: 20%;
}
.block-input2 {
    position: relative;
    top:45rpx;
}
.block-see {
    position: relative;
    left: 95%;
}
.block-button {
    position: relative;
    left: 200rpx;
}

/*********************************** 样式 ***********************************/
.loginContainer{
    width: 683.33rpx;
    height: 640.278rpx;
    box-shadow: 0 0 16.9444rpx #cccccc;
    margin:0 auto;
    margin-top:41.64rpx;
    margin-left:33.333rpx;
    font-family: "黑体";
    border-radius: 5.5556rpx;
}
.loginTitle{
    margin:0 auto;
    text-align: center;
    font-size: 42rpx;   
    color: #333333;
}
.loginContent { 
    font-size: 20rpx;
    color: #666666;
}
.loginLabel1 {
    font-size: 28rpx;
    color: #CCCCCC;
}
.change_loginLabel1 {
    font-size: 20rpx;
    color: #CCCCCC;
}
.loginLabel2 {
    font-size: 28rpx;
    color: #CCCCCC;
}
.change_loginLabel2 {
    font-size: 20rpx;
    color: #CCCCCC;
}
.underline{
    border-bottom:2.777rpx solid #e5e5e5e5;
    width: 500rpx;
}
.loginInput {
    height: 80rpx;
    margin-left: 50rpx;
    font-size: 28 rpx;
    color:#333333;
}

.focusline {
    border-bottom:2.777rpx solid #666666;
    width: 500rpx;
}

.canSee {
    height: 20.78rpx; 
    width: 40.78rpx; 
}

.loginButton {
    font-size: 24rpx;
    color: #ffffff;
    background-color: #333333;
    border-radius: 50rpx;
    height: 69rpx;
    width: 152rpx;
}
.loginButtonHover {
    font-size: 24rpx;
    color: #ffffff;
    background-color: #cccccc;
    border-radius: 50rpx;
    height: 69rpx;
    width: 152rpx;
}

</style>
