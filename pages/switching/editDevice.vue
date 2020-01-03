<template>
    <view class="container block">
        <view class="title block-title">关爱对象</view>
        <view class="block-edit">
           <!-- <view @click="add" class="add">
                <img src="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/switchPages/add_28_28.png" class="add-img  block-add-img"/>
                <view class="add-label block-add-label">添加监控对象</view>
            </view> -->
            <view @click="save"  class="edit">
                <img src="	cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/device/save.png" class="add-img  block-add-img"/>
                <view class="add-label block-add-label">保存修改</view>
            </view>
        </view>

        <view class="block-vfor">
            <view class="block-devices"  v-for="device in deviceList">
				<view class="block-devicesL">
					<view class="delete-img-block"><img @click="del(device);n()" src="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/device/delete.png" class="delete-img" /></view>
					<view class="devices-img-block"><img :src="device.img" class="devices-img"/></view>
					<view class="devices-label">
					    <view class="devices-label-up">{{device.deviceUserInfo}}</view>
					    <view class="devices-label-down">{{device.remark}}</view>
					</view> 
				</view>
                              
                <view class="edit-label" @click="edit(device)">修改</view>
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
            editList : [],
			deviceId:""

        }
    },
    methods: {

        //跳转页面
        add : function() {
            const url='./addDevice';
            uni.navigateTo({
            	url:url
            })
        },
        //跳转页面
        save : function() {
            // for(var i = 0; i < this.deviceList.length; i++) {
            //     var that = this;
            //     uni.request({
            //         url: this.url+'web/api/updateDeviceUser',
            //         data: {
            //             mac : that._data.deviceList[i].remark,
            //             remark : that._data.deviceList[i].remark,
            //             deviceUserInfo :that._data.deviceList[i].deviceUserInfo,
            //             deviceUserId : that._data.deviceList[i].deviceUserId,
            //         },
            //         header: {
            //             'content-type': 'application/json'
            //         },
            //         method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            //         // header: {}, // 设置请求的 header
            //         success: function(res){
            //             // success
            //             console.log(res);
            //         },
            //         fail: function() {
            //             // fail
            //         },
            //         complete: function() {
            //             // complete
            //         }
            //     });

            // }

            // const url='./SwitchAccount';
            // uni.redirectTo({ url });
			uni.navigateBack({
				delta:1
			})
            
        },
        /*
         * 删除函数
         * 点击按钮删除
         * 删除后post请求传递信息
         * 
         * */
        del: function(device) {
            uni.request({
                url: this.url+'web/api/delDeviceUser',
                data: {deviceUserId: device.deviceUserId },
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function(){
                    // success
                    console.log("success");
                },
                fail: function() {
                    // fail
                    console.log("fail");
                },
                complete: function() {
                    // complete
                }
            });
        },
        /*
         * 刷新函数
         * 删除后再次从后台拿一遍数据，刷新列表
         * 
         * */
        n: function() {
            var that = this;
            uni.request({
                url: this.url+'web/api/getDeviceUserList',
                data: {deviceId:that.deviceId},
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function(res){
                    // success
                    console.log(res.data);
                    that._data.deviceList = res.data;
                },
                fail: function() {
                    // fail
                },
                complete: function() {
                    // complete
                }
            });
        },

        //传递json至addDevice
        edit : function(device){
            //console.log("asdasd" + this.deviceList);
            let str = JSON.stringify(this.deviceList);
            //console.log(str);
            // const url='../addDevice/main?deviceUserInfo=' + device.deviceUserInfo + '&remark='+ device.remark + 
            //     '&edit=' + 1 + '&deviceUserId=' + device.deviceUserId;
            const url='./reviseDevice?jsonStr=' + str + '&editID=' + device.deviceUserId + '&edit=' + 1;
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
                'content-type':'application/json'
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
                that._data.deviceList = res.data;
                if (that._data.editList.length != 0) {
                    for(var i = 0; i < that._data.deviceList.length; i++) {
                        that._data.deviceList[i] = that._data.editList[i];
                    }
                }
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
	margin-top: 60rpx;
}
.block-info{

}
.block-edit {

    width: 80%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
	margin-top: 60rpx;
}
.block-add-img {

}
.block-add-label {
    display: inline;

}
.block-vfor {

    width: 100%;
    height: 300rpx;
}

/************* v-for 渲染表单样式 **************/
.block-devices {

	height: 70rpx;
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: space-between;
    /* border: 3px solid #cccccc; */
	margin-top: 60rpx;
}
.block-devicesL{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.delete-img-block {

}
.devices-img-block {

}
.delete-img {
    height: 50rpx;
    width: 50rpx;
	margin-left: 91rpx;
}
.devices-img {
    height: 60rpx;
    width: 60rpx;
}
/* 上下结构 flex布局 label样式 */
.devices-label {
    display: flex;
    flex-direction: column;

}
.devices-label-up {
    font-size: 21rpx;
    color:#cccccc;
}
.devices-label-down {
    font-size: 26rpx;
    color:#333333;
}
/*******************************/
.edit-label {
    width: 10%;
	height: 70rpx;
	line-height: 70rpx;
    font-size: 26rpx;
    color:#333333;
	margin-right: 70rpx;

}
/**********************************************/





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
.add{
    height: 70rpx;
    width: 45%;
    border-radius: 40rpx;
    box-shadow: 0 0 15rpx #cccccc;
}
.edit{
    height: 70rpx;
    width: 45%;
    border-radius: 40rpx;
    box-shadow: 0 0 15rpx #cccccc;
    background: #666666;
    color : #ffffff;
}
.add-img{
    position:relative;
    left: 15%;
    height: 22rpx;
    width: 22rpx;
}
.add-label{
    position:relative;
    left: 25%;
    font-size: 20rpx;
    color: #aaaaaa;
}


</style>
