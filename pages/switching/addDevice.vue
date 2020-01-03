<template>
    <view class="Container">
        <view class="title">
            <view class="title-content">填写监控设备信息</view>
        </view>
        <view class="mac-input">
            <view class="input-content">
                <img class="input-content-img" :src="img1"/>
                <view :class="isMAC ? 'input-content-label-focus'  : 'input-content-label' ">MAC地址</view>
               
            </view>
            <input class="input-content-input" @focus="inview1"  @blur="outview1" v-model="MAC"/>
            <view :class="isMAC ? 'input-underline-focus' : 'input-underline'"></view>
        </view>
        <view class="device-input">
            <view class="input-content">
                <img class="input-content-img" :src="img2"/>
                <view :class="isDevice ? 'input-content-label-focus'  : 'input-content-label' ">请输入手机型号</view>
               
            </view>
            <input class="input-content-input" @focus="inview2"  @blur="outview2"  v-model="device"/>
            <view :class="isDevice ? 'input-underline-focus' : 'input-underline'"></view>
        </view>
        <view class="name-input">
            <view class="input-content">
                <img class="input-content-img" :src="img3"/>
                <view :class="isName ? 'input-content-label-focus'  : 'input-content-label' ">请输入监控设备昵称</view>
            
            </view>
            <input class="input-content-input" @focus="inview3"  @blur="outview3"  v-model="name"/>
            <view :class="isName ? 'input-underline-focus' : 'input-underline'"></view>
        </view>
        <view class="button">
            <button @click="Submit" class="Button" hover-class="ButtonHover">{{status}}</button>
        </view>
    </view>
</template>


<script>
export default {
    data() {      
        return {
            url:"",
            MAC : '',
            device : '',
            name : '',
            id : '',
            edit: 0,
            editList: [],
            isMAC : false,
            isDevice : false,
            isName : false,
            // img1: 'https://cloud.eaec.cn/cloud/static/images/device/%5BNormal%5DMAC54%2054.png',
            // img2: 'https://cloud.eaec.cn/cloud/static/images/device/%5BNormal%5Ddevice-num54%2054%20.png',
            // img3: 'https://cloud.eaec.cn/cloud/static/images/device/%5BNormal%5Ddevice-name54%2054.png',
            img1: 'https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_mac.png?sign=cac3cdeebc2ca874082239329d725769&t=1574316523',
            img2: 'https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_device_type.png?sign=7970311deea684016b4aa79f5d74401c&t=1574316555',
            img3: 'https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_device_info.png?sign=b9684ea54c11dfc5ea98205b0eca072c&t=1574316584',           
            status: '未填完',
			deviceId:""
        }
    },
    methods: {
        /*
         * inview，outview 焦点进出函数
         * 利用mpvue的两个焦点函数，做到输入时样式的变化，同时输入内容后保持样式不变
         */
        inview1: function() {
            this.isMAC = true;
            this.img1 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_mac.png?sign=cac3cdeebc2ca874082239329d725769&t=1574316523"
        },
        outview1: function() {
            if (this.MAC == '') {
                this.isMAC = false
                this.img1 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_mac.png?sign=cac3cdeebc2ca874082239329d725769&t=1574316523"
            }
            if (this.MAC != '' && this.device != '' && this.name != '') {
                this.status = '完成';
            }else {
                this.status = '未填完';
            }
        },
        inview2: function() {
            this.isDevice = true;
            // this.img2 = "https://cloud.eaec.cn/cloud/static/images/device/%5Bclick%5Ddevice-num54%2054.png"
            this.img2 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_device_type.png?sign=7970311deea684016b4aa79f5d74401c&t=1574316555"


        },
        outview2: function() {
            if (this.device == '') {
                this.isDevice = false
                // this.img2 = "https://cloud.eaec.cn/cloud/static/images/device/%5BNormal%5Ddevice-num54%2054%20.png"
                this.img2 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_device_type.png?sign=7970311deea684016b4aa79f5d74401c&t=1574316555"
            }
            if (this.MAC != '' && this.device != '' && this.name != '') {
                this.status = '完成';
            }else {
                this.status = '未填完';
            }
        },
        inview3: function() {
            this.isName = true;
            // this.img3 = "https://cloud.eaec.cn/cloud/static/images/device/%5Bclick%5Ddevice-name54%2054.png"
            this.img3 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_device_info.png?sign=b9684ea54c11dfc5ea98205b0eca072c&t=1574316584"
        },
        outview3: function() {
            if (this.name == '') {
                this.isName = false
                // this.img3 = "https://cloud.eaec.cn/cloud/static/images/device/%5BNormal%5Ddevice-name54%2054.png"
                this.img3 = "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/device/defult_device_info.png?sign=b9684ea54c11dfc5ea98205b0eca072c&t=1574316584"
            }
            if (this.MAC != '' && this.device != '' && this.name != '') {
                this.status = '完成';
            }else {
                this.status = '未填完';
            }
        },

        /*
         * 用于判断是添加操作还是修改操作
         * status判断表单是否填完，edit判断是添加操作还是修改操作
         * 添加操作在执行完毕后会提交数据并跳转页面
         * 修改操作会在执行完毕之后跳转页面，并向跳转页面提交json格式的修改后的数据
         */
        Submit: function() {
    
            if (this.status == '完成' && this.edit == 0) {
                var that = this;
                uni.request({
                    // url: 'https://cloud.eaec.cn/cloud/web/api/addDeviceUser',
                    url: that.url+'web/api/addDeviceUser',
                    data: { 
                            mac: that._data.MAC,
                            remark:that._data.name,
                            deviceUserInfo : that._data.device,
                            deviceId:that.deviceId },
                    header: {
                        'content-type': 'application/json'
                    },
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function(res){
                        // success
                        console.log(res.status);
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                });

                uni.navigateBack({
                	delta:1
                })

            } else if (this.status == '完成' && this.edit == 1){

                for (var i = 0; i < this.editList.length; i++) {

                    if (this.id == this.editList[i].deviceUserId) {
                        this.editList[i].deviceUserInfo = this.device;
                        this.editList[i].remark = this.name;
                        this.editList[i].MAC = this.mac
                    }
                }   

                let str = JSON.stringify(this.editList);
                const url='./editDevice?jsonStr=' + str;
                uni.redirectTo({ url });
            }

        }

    },


    /*
    * onload函数用于接收edit之前的json数据
    */
    onLoad: function(options) {
        this.url=this.$consturl;
		let that = this;
		that.deviceId=uni.getStorageSync('deviceId');
        var item = JSON.parse(options.jsonStr);
        //this.setData({editList:options.jsonStr});
        this.editList = item;
        console.log(this.editList);
        this.id = options.editID;
        if (options.edit != null)
             this.edit = options.edit;
        this.MAC = '89-4d-38-d5';
        for (var i = 0; i < this.editList.length; i++) {
           
            if (this.id == this.editList[i].deviceUserId) {
                this.device = this.editList[i].deviceUserInfo;
                this.name = this.editList[i].remark;
                this.MAC = this.editList[i].mac;
            }
        }   
    },
}
</script>

<style>
.Container{
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
}
.title {
    width: 100%;
    height: 18%;
    text-align: center;
}
.mac-input {
    width: 100%;
    height: 18%;
    display: flex;
    flex-direction: column;
}
.device-input {
    width: 100%;
    height: 18%;
    display: flex;
    flex-direction: column;
}   
.name-input {
    width: 100%;
    height: 18%;
    display: flex;
    flex-direction: column;
}
.button {
    width: 100%;
    height: 28%;
}


.title-content {
    color: #333333;
    position: relative;
    top: 30rpx;
}


/***************** 表单样式 *****************/
.input-content {
    display: flex;
    flex-direction: row;
    justify-content:  center;
    width: 100%;
    height: 85%;
}
.input-content-img {
    height: 55rpx;
    width: 55rpx;
    position: relative;
    top:20rpx;
    left: 10%;
}
.input-content-label {
    font-size: 28rpx;
    color: #cccccc;
    height: 100%;
    width: 80%;
    position: relative;
    top:35rpx;
    left: 15%;
}
.input-content-label-focus{
    font-size: 22rpx;
    color: #666666;
    height: 100%;
    width: 80%;
    position: relative;
    top:5rpx;
    left: 15%;
}
.input-content-input {
    height: 85%;
    width: 100%;
    position: relative;
    left: 27%;
    bottom: 25rpx;
    font-size: 30rpx;
    color: #333333;
}
.input-underline {
    border-top:2.777rpx solid #e5e5e5e5;
    width: 500rpx;
    height: 15%;
    position: relative;
    left: 15%;
    bottom: 10rpx;
}
.input-underline-focus {
    border-top:2.777rpx solid #666666;
    width: 500rpx;
    height: 15%;
    position: relative;
    left: 15%;
    bottom: 10rpx;
}

/***************** 按钮样式 *****************/
.Button {
    font-size: 24rpx;
    color: #ffffff;
    position: relative;
    left: 20%;
    top: 30%;
    background-color: #cccccc;
    border-radius: 50rpx;
    height: 69rpx;
    width: 152rpx;
}
.ButtonHover {
    font-size: 24rpx;
    color: #ffffff;
    position: relative;
    left: 20%;
    top: 30%;
    background-color: #333333;
    border-radius: 50rpx;
    height: 69rpx;
    width: 152rpx;
}
</style>
