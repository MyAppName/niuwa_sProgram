<template>
    <view class="loginContainer block">
        <view class="loginTitle block-title">修改密码</view>
        <view class="loginContent block-info">请填写盒子的新密码</view>
            <label :class="isActive ? 'change_loginLabel1  block-label-after' : 'loginLabel1 block-label'">新密码</label>
            <view :class="isActive? 'focusline  block-underline' : 'underline block-underline'">
                <img style="height: 30.78rpx; width: 30.78rpx; position: relative; top: 40rpx;" :src="img" />
                <input class="loginInput block-input" type="text" @focus="inview"  @blur="outview" v-model.lazy="PWD"  required v-if="passwordType==='text'" />
                <input class="loginInput block-input" type="password" @focus="inview"  @blur="outview" v-model.lazy="PWD" required v-if="passwordType==='password'" />
                <img @click="isSee" class="canSee block-see1" :src="img3" />
            </view>


            <label :class="isActive2 ? 'change_loginLabel2 block-label-after2' : 'loginLabel2 block-label2' ">再次输入新密码</label>
            <view :class="isActive2 ? 'focusline block-underline2' : 'underline block-underline2'">
                <img style="height: 30.78rpx; width: 30.78rpx; position: relative; top: 90rpx;" :src="img2" />
                <!-- <input class="loginInput block-input2" :type="passwordType" @focus="inview2"  @blur="outview2" v-model="WiFiPWD"/> -->
                <input class="loginInput block-input2" type="text" v-model="rePWD"  @focus="inview2"  @blur="outview2" required v-if="passwordType==='text'" />
                <input class="loginInput block-input2" type="password" v-model="rePWD"  @focus="inview2"  @blur="outview2" required v-if="passwordType==='password'" />
                <img @click="isSee" class="canSee block-see" :src="img3" />
            </view>


            <button class="loginButton block-button" hover-class="loginButtonHover" @click="gotoInfo(username, PWD)">完成</button>
        </view>
    </view>
</template>


<script>
export default {
    data() {      
        return {
            isActive : false,
            isActive2: false,
            // img: "https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Normal54%2054%20.png",
            // img2:"https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Normal54%2054%20.png",
            // img3:"https://cloud.eaec.cn/cloud/static/images/login/PWD-unvisible36%2018.png",
            img: "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_defult.png?sign=11df1ae2482f388f318fb0b8b5d17a56&t=1574316889",
            img2:"https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_defult.png?sign=11df1ae2482f388f318fb0b8b5d17a56&t=1574316889",
            img3:"https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_hide.png?sign=c41b8db7c6119d9c8009132fa0a9dc50&t=1574317541",
            see: false,
            passwordType: "password",
            PWD: "",
            rePWD: "",
        }
    },
    methods: {
         /*
         * inview，outview 焦点进出函数
         * 利用mpvue的两个焦点函数，做到输入时样式的变化，同时输入内容后保持样式不变
         */
        inview: function() {
            this.isActive = true;
            // this.img = "https://cloud.eaec.cn/cloud/static/images/login/ModAccount-Finish54%2054.png"
            this.img = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/mod_defult.png?sign=7289109a206e31946aaebb1536a58757&t=1574317687"
        },
        outview: function() {
            if (this.PWD == '') {
                this.isActive = false
                this.img = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_hide.png?sign=8d98be84d25ea9283528bc82c6a2b639&t=1574317704"
                // this.img = "https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Normal54%2054%20.png"
            }
        },
        inview2: function() {
            this.isActive2 = true;
            this.img2 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/mod_success.png?sign=7ae582371bd44399ca0fed5bc867e81e&t=1574317728"
            // this.img2 = "https://cloud.eaec.cn/cloud/static/images/login/ModAccount-Finish54%2054.png"
        },
        outview2: function() {
            if (this.rePWD == '') {
                this.isActive2 = false
                this.img2 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_defult.png?sign=0d9543623e5bffaa04141c5e49617de8&t=1574317757"
                // this.img2 = "https://cloud.eaec.cn/cloud/static/images/login/WiFiPWD-Normal54%2054%20.png"
            }
        },
        /*
        * isSee 控制密码是否可见
        * 设立一个名为see的flag来判断是否可见
        */
        isSee: function() {
            if (this.see == false) {
                // this.img3 = "https://cloud.eaec.cn/cloud/static/images/login/PWD-visible36%2018.png"
                this.img3 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_show.png?sign=9ff6a0c3b44ead7317582d79aa2924c7&t=1574317777"
                this.passwordType = "text"
                this.see = true;
            }
            else if (this.see == true){
                // this.img3 = "https://cloud.eaec.cn/cloud/static/images/login/PWD-unvisible36%2018.png"
                this.img3 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/login/password_hide.png?sign=1650695f6488fecb1f6719be246c9ae5&t=1574317794"
                this.passwordType = "password"
                this.see = false;
            }  
        },
        /*
        * gotoInfo 跳转页面函数
        * 跳转至WiFiInfo，并传递username和password
        */
        gotoInfo(username, PWD) {
            const url='../WiFiInfo/main';
            uni.redirectTo({ url });
        },

    }
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
.block-see1 {
    position: absolute;
    top: 58rpx;
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
