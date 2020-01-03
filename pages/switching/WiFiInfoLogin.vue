<template>
    <view class="loginContainer block">
        <view class="loginTitle block-title">盒子WiFi信息</view>
        <view class="loginContent block-info">请确认一遍盒子的账号和密码，所需账号密码请与Modem账号和密码保持一致</view>
            <label :class="isActive ? 'change_loginLabel1  block-label-after' : 'loginLabel1 block-label'">盒子账号</label>
            <view :class="isActive? 'focusline  block-underline' : 'underline block-underline'">
                <img style="height: 30.78rpx; width: 30.78rpx; position: relative; top: 40rpx;" :src="img" />
                <input class="loginInput block-input" type="text" @focus="inview"  @blur="outview" v-model.lazy="username"/>
            </view>


            <label :class="isActive2 ? 'change_loginLabel2 block-label-after2' : 'loginLabel2 block-label2' ">请输入盒子密码</label>
            <view :class="isActive2 ? 'focusline block-underline2' : 'underline block-underline2'">
                <img style="height: 30.78rpx; width: 30.78rpx; position: relative; top: 90rpx;" :src="img2" />
                <!-- <input class="loginInput block-input2" :type="passwordType" @focus="inview2"  @blur="outview2" v-model="WiFiPWD"/> -->
                <input class="loginInput block-input2" type="text" v-model="PWD"  @focus="inview2"  @blur="outview2" required v-if="passwordType==='text'" />
                <input class="loginInput block-input2" type="password" v-model="PWD"  @focus="inview2"  @blur="outview2" required v-if="passwordType==='password'" />
                <img @click="isSee" class="canSee block-see" :src="img3" />
            </view>


            <button class="loginButton block-button" hover-class="loginButtonHover" @click="gotoInfo(username, PWD)">下一步</button>
        </view>
        </view>
    </view>
</template>


<script>
export default {
    data() {      
        return {
            url:"",
            isActive : true,
            isActive2: true,
            // img: "https://cloud.eaec.cn/cloud/static/images/login/ModAccount-Normal54%2054.png",
            // img2:"https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Normal54%2054%20.png",
            // img3:"https://cloud.eaec.cn/cloud/static/images/login/PWD-unvisible36%2018.png",
            img: "	cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/mod_defult.png",
            img2:"cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/password_defult.png",
            img3:"cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/password_hide.png",
            see: false,
            passwordType: "password",
            username: "",
            PWD: "",

            getPWD: '',
            getusername: '',
        }
    },
    methods: {
        inview: function() {
            this.isActive = true;
            // this.img = "https://cloud.eaec.cn/cloud/static/images/login/ModAccount-Finish54%2054.png"
            this.img = "cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/mod_success.png"
        },
        outview: function() {
            if (this.username == '') {
                this.isActive = false
                // this.img = "https://cloud.eaec.cn/cloud/static/images/login/ModAccount-Normal54%2054.png"
                this.img = "cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/mod_defult.png"
            }
        },
        inview2: function() {
            this.isActive2 = true;
            // this.img2 = "https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Finish54%2054.png"
            this.img2 = "cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/password_success.png"
        },
        outview2: function() {
            if (this.PWD == '') {
                this.isActive2 = false
                // this.img2 = "https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Normal54%2054%20.png"
                this.img2 = "cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/password_defult.png"
            }
        },
        isSee: function() {
            if (this.see == false) {
                this.see = true;
                // this.img3 = "https://cloud.eaec.cn/cloud/static/images/login/PWD-visible36%2018.png"
                this.img3 = "	cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/password_show.png"
                this.passwordType = "text"
            }
            else if (this.see == true){
                this.see = false;
                // this.img3 = "https://cloud.eaec.cn/cloud/static/images/login/PWD-unvisible36%2018.png"
                this.img3 = "cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/password_hide.png"
                this.passwordType = "password"
            }  
        },
        gotoInfo(username, PWD) {

            if (username != this.getusername || PWD != this.getPWD) {
                uni.showModal({
                    title: '账号密码错误',
                    content: '请重新输入账号密码',
                    success: function(res) {
                        if (res.confirm) {
                            
                        } else if (res.cancel) {

                        }
                    }
                })
            }
            else {
                const url='../WiFiInfo/main?username='+username+'&PWD='+PWD;
                uni.redirectTo({ url });
            }
        },

    },


    onLoad: function() {
        this.url=this.$consturl;
        var that = this;
        uni.request({
            url: this.url+'web/api/getBoxWifi',
            data: {deviceId:'test'},
            header: {
                'content-type': 'application/json'
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
                console.log(res.data);
                that._data.username = res.data.username;
                that._data.PWD = res.data.password;
                that._data.getusername = res.data.username;
                that._data.getPWD = res.data.password;
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
    left: 97%;
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
    height: 10rpx;
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
