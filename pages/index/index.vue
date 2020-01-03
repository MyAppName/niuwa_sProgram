<template>
    <view class="allSize">
		<view class="topBar" v-if="topBar1">
			<view class="topBar1" >
				<view>
					当前设备ID为:{{deviceId}}
				</view>
				<!-- <view>
					当前网络IP为:{{ipv4}} /{{ipText}}
				</view> -->
			</view>
		</view>
        <view class="block1" >
            <image @click="goControl"  src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/index/Setting984_440.png?sign=ad432d33162ffc563ee0906546deafef&t=1574227413" mode="aspectFit" class="image1 block-img"/>
            <view @click="goControl" class="block-title title">配置管理</view>
            <view @click="goControl" class="block-content content">对牛娃设备进行配置等操作，如开关功能控制设定</view>	
        </view>
        <view style="height: 2%;"></view>   
        <view class="block2" >
            <img @click="goSwitch" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/index/SwitchAccount984_440.png?sign=0e3fe37a89173e1f4c436fae15c3f1b9&t=1574227586" mode="aspectFit" class="image1 block-img"/>
            <view @click="goSwitch" class="block-title title">账号切换</view>
            <view @click="goSwitch" class="block-content content">一键切换、管理家中所持移动端和PC端产品，安全快捷</view>
        </view>   
        <view style="height: 2%;"></view>   
        <view class="block3" >
            <img @click="goList" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/index/listSetting984_440.png?sign=f8d3fde20bb065d85247b848afcb5cd0&t=1574227630" mode="aspectFit" class="image1 block-img"/>
			<!-- <img @click="goList" src="http://49.232.51.79:8080/cloud/static/icon/game/6.png" mode="aspectFit" class="image1 block-img"/> -->
            <view @click="goList" class="block-title title">名单设定</view>
            <view @click="goList" class="block-content content">添加白名单内容，让孩子健康上网，实时监控</view>
        </view>   
        <view style="height: 2%;"></view>   
        <view class="block4" >
            <img @click="goHistory" src= "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/index/history984_440.png?sign=458864f23b7514b2a583bb2f4695ad83&t=1574227644" mode="aspectFit" class="image1 block-img"/>
            <view @click="goHistory" class="block-title title">浏览报告</view>
            <view @click="goHistory" class="block-content content">根据儿童上网访问历史和使用轨迹的记录快速生成H5</view>
        </view>   
        <view style="height: 2%;"></view> 
        <!-- <web-view src="http://tlwx.reliantongbak.com/brfs/jsapi_s.php?openId=oqa1_1oTiBWjeWJmrrXnDZjVfOpM"></web-view> -->
		<drag-button
					:btnText="btnText"
		            :isDock="true"
		            :existTabBar="false"
		            @btnClick="btnClick()"
					@btnLongpress="longClick()"
		            /> 
    </view>
</template>


<script>
    // import global from "@/components/global/";
	import dragButton from "@/components/drag-button/drag-button.vue"
	import pm from '../../utils/publicMethod.js'
export default {

    data() {      
        return {
            url:"",
			deviceId:"",
			ipv4:"",
			ipText:"未连接盒子WIFI",
			btnText:"ID",
			// topBar:false,
			topBar1:false
			
        }
    },
	components: {
	        dragButton
	    },
    methods : {
		longClick:function(){
			// let that=this,times;
			// clearTimeout(times);
			// that.topBar=!that.topBar;
			// that.btnText="切换";
			// if(!that.topBar){
			// 	that.btnText="长按设置";
			// 	times=setTimeout(function(){
			// 		that.btnText="长按设置";
			// 	},10000);
			// }
		},
		btnClick:function(){
			let that=this,times;
			that.topBar1=!that.topBar1; 
			times=setTimeout(function(){
				that.topBar1=false;
			},10000);
			
		},
		register:function(){
			uni.navigateTo({ url:"./toGetiIP?id=1" });
		},
		Switch:function(){
			uni.navigateTo({ url:"./toGetiIP?id=2" });
		},
        /*
         * goControl,goSwitch,goHistory,goList 页面跳转函数
         * navigateTo微信提供的跳转函数，跳转后可以返回之前的页面
         */
        goControl: function() {
            // const url='../config/setDeviceId?ipv4='+this.ipv4;
            // uni.navigateTo({ url:url });
			const url='../config/config';
			uni.navigateTo({ url:url });
			

        },
        goSwitch: function() {
			if(this.deviceId==""){
				uni.showToast({
				    title:"当前设备ID为空，请先配置设备ID",
				    icon: 'loading',
				    duration: 1000
				   })
				return
			}
            // const url='../switching/repeatPWD';
			const url='../switching/SwitchAccount';
            uni.navigateTo({ url:url });
        },
        goHistory: function() {
			if(this.deviceId==""){
				uni.showToast({
				    title:"当前设备ID为空，请先配置设备ID",
				    icon: 'loading',
				    duration: 1000
				   })
				return
			}
            const url='../historyReport/history';
			
            uni.navigateTo({ url:url });
        },
        goList : function () {
			if(this.deviceId==""){
				uni.showToast({
				    title:"当前设备ID为空，请先配置设备ID",
				    icon: 'loading',
				    duration: 1000
				   })
				return
			}
            const url='../setting/ruleSetting';
            uni.navigateTo({url:url })
        },

    },
    onLoad:function(options){
		// this.$pm.testMethod1();
		// pm.testMethod2();
		// this.$pm.test1=8;
		// console.log(pm.test2===1);
		// console.log(options.deviceId);
		// let deviceId=uni.getStorageSync('deviceId');
		let deviceId=options.deviceId;
		let that=this;
		if(deviceId==""||deviceId==null||deviceId==undefined){
			that.deviceId=uni.getStorageSync('deviceId');
		}else{
			deviceId=options.deviceId||"";
			uni.setStorageSync('deviceId', deviceId);
			that.deviceId=uni.getStorageSync('deviceId');
		}
		
        
		
    },
	  onShow:function(){
		  
	  }
}
</script>

<style>
/*lijie********************************** 布局 ***********************************/
.topBar{
	width: 100%;
	position: fixed;
	top: 0rpx;
	left: 30rpx;
	z-index: 999999;
}
.topBar1{
	font-size: 21rpx;
	color: #0000FF;
	background-color: #FFFFFF;
	padding: 10upx;
}
.topBar2{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	padding: 10upx;
}
.topBtn{
	height: 30rpx;
	font-size: 28rpx;
	box-shadow:  #333333 0px 0px 6px;
	padding: 15rpx 30rpx;
	border-radius: 25rpx;
	color:  #333333;
	background-color: #FFFFFF;
}
.topBtn1{
	color: #0000FF;
}
.allSize {
    position: absolute;
    height: 100%;
    left: 3%;
    width: 94%;
    display: flex;
    flex-direction: column;
}
.block1 {
    position: relative;  
    height: 23%;
}
.block2 {
    position: relative;
    height: 23%;
}
.block3 {
    position: relative;
    height: 23%;
}
.block4 {
    position: relative;
    height: 23%;
}
.block-img {
    width: 100%;
    height: 100%;
	z-index: 1;
}
.block-title {
    position: relative;
    bottom:200rpx;
    left:80rpx;
}
.block-content {
    position: relative;
    bottom:170rpx;
    left:80rpx;
}

/*********************************** 样式 ***********************************/
.image1 {
    width: 100%;
}
.title {
    font-size: 28rpx;
    color: #ffffff;
}
.content {
    font-size: 22rpx;
    color: #ffffff;
    width:40%;
}

</style>
