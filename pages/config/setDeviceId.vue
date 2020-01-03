<template>
    <view class="loginContainer block">
        <view class="loginTitle block-title">绑定设备ID</view>
        <view class="loginContent block-info">请输入盒子WIFI账号及密码进行设备绑定</view>
            <!-- <label :class="isActive ? 'change_loginLabel1  block-label-after' : 'loginLabel1 block-label'">盒子WIFI账号</label> -->
            <view :class="isActive? 'focusline  block-underline' : 'underline block-underline'">
                
				<image style="height: 30.78rpx; width: 30.78rpx; position: relative; top: 80rpx;" :src="img" ></image>
                <input class="loginInput block-input" type="text" @focus="inview"  @blur="outview" v-model="username" placeholder="盒子WIFI账号"/>
				
            </view>
			<!-- <label :class="isActive ? 'change_loginLabel1  block-label-after' : 'loginLabel1 block-label'">盒子WIFI密码</label> -->
			<view :class="isActive? 'focusline  block-underline' : 'underline block-underline'">
			    
				<image style="height: 30.78rpx; width: 30.78rpx; position: relative; top: 80rpx;" :src="img" ></image>
			    <input class="loginInput block-input" type="text" @focus="inview"  @blur="outview" v-model="password" placeholder="盒子WIFI密码"/>
			</view>
			<view class="btns">
				<view class="btn btn1"  @click="logon()">去注册</view>
				<view class="btn btn2" @click="gotoInfo()">确认</view>
			</view>
			
			
			<view class="deviceId">
				当前设备ID为:{{deviceId}}     
				ip为:{{ipv4}}
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
            // passwordType: "password",
            username: "",
			password:"",
			deviceId:"",
			ipv4:""

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
        gotoInfo:function() {
		console.log(this.username+";"+this.password);
		let un=this.username;
		if(un.length>0){
			uni.setStorageSync('deviceId', un);
			uni.navigateBack({
				delta:1
			})
		}
 
        },
		logon:function(){
			if(this.ipv4=="172.16.2.61"){
				uni.navigateTo({
					url:"../index/toGetiIP"
				}) 
			}else{
				uni.showToast({
				    title:"请检查是否连着盒子WIFI",
				    icon: 'loading',
				    duration: 2000
				   })
			}
		}
    },
    onLoad: function(options) {
        this.url=this.$consturl;
        let that = this;
        that.deviceId=uni.getStorageSync('deviceId');
		that.ipv4=options.ipv4;
		console.log(that.ipv4);
    },
}
</script>

<style>
/*********************************** 布局 ***********************************/
.deviceId{
	/* margin-top: 70rpx; */
	margin-left: 100rpx;
}
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
.logon{
	/* position: relative;
	bottom: 0;
	right:0; */
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
.btns{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 70rpx;
}
.btn{
	font-size: 25rpx;
}
.btn1{
	width: 100rpx;
	margin-left: 100rpx;
	color: blue;
	text-align: center;
}
.btn2{
	color: #ffffff;
	background-color: #cccccc;
	border-radius: 50rpx;
	height: 69rpx;
	width: 152rpx;
	margin-right: 70rpx;
	text-align: center;
	line-height: 70rpx;
}

/*********************************** 样式 ***********************************/
.loginContainer{
    width: 683.33rpx;
    height: 660.278rpx;
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
    height: 60rpx;
    margin-left: 50rpx;
	margin-top: 30rpx;
    font-size: 28rpx;
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




</style>
