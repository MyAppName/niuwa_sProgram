<template>
    <view>
        <view class="page">
            <view class="time"> 
                <span class="timeNumber">{{allhours}}</span>小时
                <span class="timeNumber">{{allminutes}}</span>分钟
            </view>

            <view class="timeLabel">游戏总时长</view>
            
            <view class="list-block" :style="{height: curheight}">
                <view class="item-block" v-for="(item, index) in detail" :key="index">
                    <view class="rand">{{index+1}}</view>
                    <img class="item-img" :src="item.icon"/>
                    <view class="img-name">{{item.name}}</view>
                    <view class="item-timelable">累计使用时间：<span class="itme-time">{{minutes[index]}}</span> 
                        <span style="font-size:15rpx;">分钟</span> </view>
                </view>
            </view>  

        </view>      

    </view>
</template>


<script>
export default {
     
    data() {   
        return {
            curheight: (7*130) + 'rpx;',
            url:"",
            detail: [],
            hour: '',
            min: '',
            minutes: [],
            id: '',
            type: '',
            allhours: '',
            allminutes: '',
        }

    },

    methods : {
        
    },

    onLoad: function(options) {
        this.url=this.$consturl;
        console.log(options);
        if (typeof(options.id) != 'undefined') {
            this.id = options.id;
            console.log(this.id);
        }
        if (typeof(options.type) != 'undefined') {
            this.type = options.type;
            console.log(this.type);
        }
        var that = this;

        uni.request({
            url: that.url+'web/api/getReportDetail',
            header: {
                'content-type': 'application/json'
            },
            data : {deviceUserId: that._data.id,
                    type: that._data.type},
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
                // console.log(res);
                console.log(res.data);
                
                that._data.detail = res.data.detail;
                for(var i = 0; i < that._data.detail.length; i++) {
                    that._data.hour = that._data.detail[i].hour;
                    that._data.min = that._data.detail[i].min;
                    that._data.minutes[i] = parseInt(that._data.hour*60) + parseInt(that._data.min);
                }

                that._data.allminutes = parseInt(res.data.total_time) % 60;
                that._data.allhours = Math.floor(parseInt(res.data.total_time)/60);

                that._data.curheight = (that._data.detail.length*130) + 'rpx;'

               
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        });
    }


    
}
</script>

<style>
/***************** 页面主体 *****************/
.page {
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    font-family: '苹方';
    color: #333333;
}

/***************** 时间 *****************/
.time {
    position: relative;
    top:50rpx;
    text-align: center;
    font-size: 30 rpx;
    width: 100%;
    height: 100rpx;
}
.timeNumber {
    font-size: 70rpx;
}
.timeLabel {
    position: relative;
    top: 50rpx;
    text-align: center;
    font-size: 26rpx;
    color: #666666;
    height: 30rpx;
}

/***************** 列表 *****************/
.list-block {
    box-shadow: 0 0 15rpx #cccccc;
    border-radius: 30rpx;
    position: relative;
    top: 80rpx;
    left: 5%;
    width: 90%;
    margin-bottom: 50rpx;

    display: flex;
    flex-direction: column;
}
.item-block {
    height:130rpx;
    border-bottom: 1rpx solid #e5e5e5;

    display: flex;
    flex-direction: row;
}
.rand {
    font-size: 28rpx;
    position: relative;
    top: 51rpx;
    width: 10%;
    text-align: center;
    color:#666666
}
.item-img {
    height: 90rpx;
    width: 90rpx;
    position: relative;
    top: 20rpx;
}
.img-name {
    font-size: 22rpx;
    position: relative;
    left: 3%;
    top: 54rpx;
    width: 30%;
    color: #666666;
    
}
.item-timelable {
    font-size: 22rpx;
    position: relative;
    left:10%;
    top: 53rpx;
    color: #666666;
}
.itme-time {
    font-size: 25rpx;
    color: #333333;
}

</style>