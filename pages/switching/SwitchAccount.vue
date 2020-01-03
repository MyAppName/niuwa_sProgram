<template>
    <view class="container block">
        <view class="title block-title">关爱对象</view>
        <view class="content block-info">关爱对象管理，并设定是否开启浏览限制</view>
<!-- https://cloud.eaec.cn/cloud/static/images/switchPages/add28%2028.png
 https://cloud.eaec.cn/cloud/static/images/device/edit28%2028.png-->
        <view class="block-edit">
            <view @click="add" class="add adds">
                <img src="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/switchPages/add_28_28.png" class="add-img  block-add-img"/>
                <view class="add-label block-add-label">添加关爱对象</view>
            </view>
            <view @click="edit" class="edit adds">
                <img src="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/device/updata.png" class="add-img  block-add-img"/>
                <view class="add-label block-add-label">修改关爱对象</view>
            </view>
        </view>

        <view class="block-vfor" v-for="device in deviceList">
            <view class="block-devices devices">
                <img :src="device.img" class="block-devices-img devices-img"/>
                <view class="block-devices-label">
                    <view class="block-devices-label-up  devices-label-up">{{device.deviceUserInfo}}</view>
                    <view class="block-devices-label-down  devices-label-down">{{device.remark}}</view>
                </view>
				<view class="btn">
					
					<button type="button" :class="device.flag? 'limitOpen block-devices-button-left' : ' block-devices-button-left limitOpen-none' 
					"@click="openlimit(device)">开</button>
					
					<button type="button" :class="device.flag? 'limitClose-none block-devices-button-right' : 'limitClose block-devices-button-right' 
					"@click="closelimit(device)">关</button>
					
				</view>
            </view>
        </view>
            
    </view>
</template>


<script>
export default {
    data() {      
        return {
            url:"",
            deviceNum : 3,
            deviceList: [],
			deviceId:""
        }
    },
    methods: {
        /*
         * openlimit
         * 打开限制，调用接口，post传递数据
         */ 
        openlimit : function(device) {
			console.log(device);
            device.flag = 1;
            uni.request({
                url: this.url+'web/api/updateSwitchFlag',
                data: {deviceUserId: device.deviceUserId,flag: 1,},
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function(res){
                    uni.showToast({
                        title:"开启成功",
                        icon: 'success',
                        duration: 1500
                       })
                },
                fail: function() {
                    // fail
                },
                complete: function() {
                    // complete
                }
            });
        },
        /*
         * closelimit
         * 关闭限制，调用接口，post传递数据
         */ 
        closelimit : function(device) {
            device.flag = 0;
            console.log(device.deviceUserId);
            uni.request({
                url: this.url+'web/api/updateSwitchFlag',
                data: {deviceUserId:   device.deviceUserId,
                        flag: 0,},
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST', 
                success: function(res){
                    console.log(res);
					uni.showToast({
					    title:"关闭成功",
					    icon: 'success',
					    duration: 1500
					   })
                },
                fail: function() {
                    // fail
                },
                complete: function() {
                    // complete
                }
            });
        },
        add : function() {
            const url='./addDevice';
            uni.navigateTo({ url });
        },
        edit : function() {
            const url='./editDevice';
            uni.navigateTo({ url });
        },
    },

    onShow: function() {
        this.url=this.$consturl;
        let that = this;
        that.deviceId=uni.getStorageSync('deviceId');
        uni.request({
            url: that.url+'web/api/getDeviceUserList',
            data: {deviceId:that.deviceId},
            header: {
                'content-type': 'application/json'
            },
            method: 'POST', 
            success: function(res){

                console.log(res.data);
                that._data.deviceList = res.data;
            },
            fail: function() {
                // fail
            }

        });
    },
}
</script>

<style>
/*********************************** 布局 ***********************************/
.block {
  
}
.block-title{

}
.block-info{
    bottom: 80rpx;
}
.block-edit {
    width: 80%;
    bottom: 380rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
	margin-top: 60rpx;
}
.block-add-img {
   
}
.block-add-label {

}
.block-vfor {

    width: 100%;
	margin-top: 40rpx;
}
.block-devices {
	width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.block-devices-img {

}
.block-devices-label {
   
}
.block-devices-label-up {

}
.block-devices-label-down {

}
.block-devices-button-left {
   
}
.block-devices-button-right {

}


/*********************************** 样式 ***********************************/
.container{
    width: 683.33rpx;
    height: 640.278rpx;
    box-shadow: 0 0 16.9444rpx #cccccc;
    margin:0 auto;
    margin-top:41.64rpx;
    margin-left:33.333rpx;
    font-family: "苹方";
    border-radius: 5.5556rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.btn{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	/* margin-left: 100rpx; */
}
.title{
    margin:0 auto;
    text-align: center;
    font-size: 42rpx;   
    color: #333333;
}
.content { 
    font-size: 20rpx;
    text-align: center;
    color: #666666;
}
.adds{
    height: 70rpx;
    width: 45%;
    border-radius: 40rpx;
    box-shadow: 0 0 15rpx #cccccc;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.add-img{
    left: 15%;
    height: 22rpx;
    width: 22rpx;
}
.add-label{
    left: 25%;
    font-size: 20rpx;
    color: #aaaaaa;
}


.devices {
    height: 100rpx;

}
.devices-img {
    height: 60rpx;
    width: 60rpx;
}
.devices-label-up {
    font-size: 21rpx;
    color:#cccccc;
}
.devices-label-down {
    font-size: 26rpx;
    color:#333333;
}

/* 按钮样式 */
.limitOpen {
    height: 52.78rpx;
    width: 111.11rpx;
    border-radius: 30rpx 0 0 30rpx;
    background-color: #333333;
    font-size: 20rpx;
    text-align: center;
    color: #ffffff;
	margin-left: 200rpx;
}
.limitOpen-none {
    height: 52.78rpx;
    width: 111.11rpx;
    border-radius: 30rpx 0 0 30rpx;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    font-size: 20rpx;
    text-align: center;
    color: #cccccc;
	margin-left: 200rpx;
}
.limitClose {
    height: 52.78rpx;
    width: 111.11rpx;
    border-radius: 0 30rpx 30rpx 0;
    background-color: #333333;
    border-left: 0;
    font-size: 20rpx;
    text-align: center;
    color: #ffffff;
}
.limitClose-none {
    height: 52.78rpx;
    width: 111.11rpx;
    border-radius: 0 30rpx 30rpx 0;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-left: 0;
    font-size: 20rpx;
    text-align: center;
    color: #cccccc;
}

</style>
