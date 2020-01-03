<template>
    <view class="label">
        <view class="pos-label title">盒子管理</view>
        <view class="pos-security block" @click="goSecurity()">
            <view class="pos-label-big label1">账号与安全</view>
            <view class="pos-label-small label2">{{username}}</view>
            <img src="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/tabs/more.png" class="pos-img img"/>
        </view>


        <view class="viewide-line pos-viewide"></view>

        <view class="pos-control block" @click="goChildSetting()">
            <view class="pos-label-big label1">用户管理</view>
            <view class="pos-label-small label2">家中儿童设置</view>
            <img src="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/tabs/more.png" class="pos-img img"/>
        </view>
        

        <view class="viewide-line pos-viewide2"></view>

        <view class="pos-switch title">账号切换</view>

        <view class="pos-pwd block" @click="goSwitch()">
            <view class="pos-label-big label1">监管者密码</view>
            <view class="pos-label-small label2">********</view>
            <img src="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/tabs/more.png" class="pos-img img"/>
        </view>
        
    </view>
</template>


<script>
export default {
    
    data() {      
        return {
            url:"",
           username: '',
           PWD: '',
        }
    },
    methods: {
        goSecurity: function() {
            const url='./changePWD';
            uni.navigateTo({ url });
        },
        goChildSetting: function() {
            const url='./childrenInfo';
            uni.navigateTo({ url });
        },
        goSwitch: function() {
            const url='./WiFiInfoLogin';
			
            uni.navigateTo({ url });
        },
    },
    mounted() {
        this.username = this.$root.$mp.query.username
        this.PWD = this.$root.$mp.query.PWD
    }
}
</script>

<style>
/*********************************** 布局 ***********************************/
.pos-label {
    position: relative;
    top: 30rpx;
    left: 8%;
}
.pos-security{
    position: relative;
    top: 30rpx;
    left: 10%;
}
.pos-label-big {
    position: relative;
}
.pos-label-small {
    position: relative;
}
.pos-img {
    position: relative;
    left: 80%;
    bottom: 70rpx;
    bottom: 70rpx;
}
.pos-control {
    position: relative;
    top: 30rpx;
    left: 10%;
}
.pos-switch {
    position: relative;
    top: 30rpx;
    left: 8%;
}
.pos-pwd {
    position: relative;
    top: 30rpx;
    left: 10%;
}
.pos-viewide {
    position: relative;
    top: 20rpx;
}
.pos-viewide2 {
    position: relative;
    top: 23rpx;
}

/*********************************** 样式 ***********************************/
.label {
    font-family: "苹方";
}
.img {
    height: 24rpx;
    width: 18rpx;
}
.title {
    font-size: 40rpx;
    color: #333333;
}
.label1 {
    font-size: 32rpx;
    color: #333333;
}
.label2 {
    font-size: 24rpx;
    color: #cccccc;
}
.block {
    height: 120rpx;
    width: 100%;
}
.viewide-line {
    border-bottom: 1rpx solid #e5e5e5e5;
    width: 100%;
}

</style>
