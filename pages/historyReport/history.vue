<template>
  <view>
    <view class="pos-time time">{{newDays.Year}}年 {{newDays.month}}月</view>
    <!--滑动日期-->
    <scroll-view
      class="scroll-view_H scrollview"
      scroll-into-view="cur"
      scroll-x="true"
      style="width: 100%"
    >
      <view class="scroll-view-item_H" v-for="(item,index) in oldDays" :key="index">
        <view class="scrollview-block">
          <img :src="img" class="scrollview-block-img" />
          <view class="scrollview-img-week pos-week">{{item.w}}</view>
          <view class="scrollview-img-date pos-date">{{item.d}}</view>
        </view>
      </view>
	  
      <view id="cur" class="scroll-view-item_H">
        <view class="scrollview-block">
          <img :src="curimg" class="scrollview-block-img" />
          <view class="scrollview-img-curweek pos-week">{{newDays.week}}</view>
          <view class="scrollview-img-curdate pos-date">{{newDays.date}}</view>
        </view>
      </view>
    </scroll-view>
    <view class="hr"></view>
    <!--标头-->
    <view v-for="(device,index1) in arraylist " :key="index1">
      <!--头-->
      <view style="border: 0px red solid;">
        <view class="deshouji">{{device.babyname}}的手机</view>
        <!--设备型号-->
        <view class="pos-text textCounter">{{device.device}}设备型号</view>
        <!--今日总时长小时分钟-->
        <view class="pos-alltime alltime">
          累计上网时间:
          <span class="timenum">{{device.min}}</span>
        </view>
      </view>
      <!--头-->

      <!--正文-->
      <!--标题-->
      <view class="tr">
        <view class="th">时间</view>
        <view class="th">访问地址</view>
        <view class="th">访问时长</view>
        <view class="th">操作级别</view>
        <view class="th">动作</view>
      </view>
      <!--标题-->
      <!--循环列表-->
      <view v-for="(item,index2) in device.data" :key="index2">
        <view class="tr" v-if="index2<=2">
          <view class="td" >{{item.startTimeStr}}</view>
          <view class="td">
            <!-- <span class="tdimg" value="">{{item.icon}}</span> -->
            <img :src="item.icon" alt />
          </view>
          <view class="td">{{item.time}}</view>
          <!-- <view class="td">{{item.flag}}</view> -->

          <view class="td">{{item.flag}}级</view>
          <view class="td" v-if="item.action == '1'">不允许</view>
          <view class="td" v-else-if="item.action=='0'">允许</view>
        </view>
      </view>
      <!--列表-->
      <!--按钮-->
      <view class="tr">
        <view class="ribao td" @click="historyReportDay(device.deviceUserId)">点击形成日报</view>
        <view class="td ribao" @click="historyReportWeek(device.deviceUserId)">点击形成周报</view>
        <view class="td ribao" @click="historyReportMonth(device.deviceUserId)">点击形成月报</view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    var util = require("../../utils/utils.js");
    return {
      url:"",
	  deviceId:"",
	  utilData:util,
      oldDays:[],
	  newDays:{},
      curimg:
        // "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/history/today-background.png",
        "cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/history/today-background.png",
      img:
        // "https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/history/before-background.png",
        "cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/history/before-background.png",
      alltime: [],
      allHour: [],
      allMinute: [],
      history: [],
      arraylist: [],
	  
    };
  },

  methods: {
    Detail: function(id, type) {
      const url = "./historyDetail/gameDetail?id=" + id + "&type=" + type;
      uni.navigateTo({ url });
    },

    historyReportDay: function(id) {
      console.log("进入日报");
      const url = "./historyReportDay?deviceid=" + id;
      uni.navigateTo({ url });
    },
    historyReportWeek: function(id) {
      console.log("进入月报");
      const url = "./historyReportWeek?deviceid=" + id;
      uni.navigateTo({ url });
    },
    historyReportMonth: function(id) {
      console.log("进入周报");
      const url = "./historyReportMonth?deviceid=" + id;
      uni.navigateTo({ url });
    }
  },

  onLoad: function() {
	let getDate=require("../../utils/utils.js");
	// console.log(getDate.year());
	// console.log(getDate.month());
    this.url=this.$consturl;
	let that=this;
	that.deviceId=uni.getStorageSync('deviceId');
	let days={},u=that.utilData,arr=[];
	for (var i = 5; i >= 0; i--) {
		days.m=u.beforeDate_month[i];
		days.d=u.beforeDate_date[i];
		days.y=u.beforeDate_year[i];
		days.w=getDate.week(days.y,days.m,days.d);
		arr.push(days);
		days={};
	}
	that.oldDays=arr;
	let time=new Date();
	that.newDays.Year=time.getFullYear();
	that.newDays.month=time.getMonth()+1;
	that.newDays.date=time.getDate();
	that.newDays.week=getDate.week(that.newDays.Year,that.newDays.month,that.newDays.date);
    // console.log("onload");
    function compare(num) {
             return function (a, b) {
             let value1 = a[num];
             let value2 = b[num];
             return value1 - value2;
            }
    };
    this.date_1;
    var _this = this;
    uni.request({
      // url: "http://192.168.1.133/web/api/getReport",
      url: _this.url+"web/api/getReport",
      header: {
        "content-type": "application/json"
      },
      data: { deviceId:that.deviceId },
      method: "POST", 
      // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        var data = res.data;
        // console.log(_this.dataa);
        console.log(data);
        // success
        var la = [];
        var dataD = [];
        // console.log("history请求资源web/api/getReport");
        for (var i = 0; i < data.length; i++) {
          var lsD = {
            babyname: data[i].babyName,
            deviceUserId: data[i].deviceUserId,
            remark: data[i].remark,
            device: data[i].device,
            min: data[i].min,
          };
          la.push(lsD);
          var data2 = data[i].data;
                for (var j = 0; j < data2.length; j++) {
                  var data3 = data2[j].data;
                        for (var ij = 0; ij < data3.length; ij++) {
							let imgu=data3[ij].icon;
							imgu=imgu.substring(0,imgu.indexOf(":"));
							data3[ij].icon="https://www.985-211.com.cn/"+imgu;
                          dataD.push(data3[ij]);
                        }
                }
          la[i].data = dataD.sort(compare("startTimeNum"));
          dataD=[];
        }
        console.log(la);
        _this.arraylist = la;

        // console.log(_this.arraylist);
        // _this._data.history = res.data;
        // console.log(_this._data.history);

        //每个id计算总时间
        // for(var i = 0; i < _this._data.history.length; i++) {
        //   _this._data.alltime[i] = 0;
        //   for(var j = 0; j < _this._data.history[i].data.length; j++) {
        //     _this._data.alltime[i] = parseInt(_this._data.alltime[i]) + parseInt(_this._data.history[i].data[j].hour * 60) + parseInt(_this._data.history[i].data[j].min);
        //   }
        // }
        // console.log(_this._data.alltime)
        // //分别计算分钟小时
        // for(var i = 0; i < _this._data.history.length; i++) {
        //   _this._data.allMinute[i] = parseInt(_this._data.alltime[i]) % 60;
        //   _this._data.allHour[i] = Math.floor(parseInt(_this._data.alltime[i])/60);
        // }
      },
      fail: function() {
        // fail
        console.log("浏览报告获取失败");
      }
    });
	// uni.showToast({
	//     title:that.newDays.week+";"+that.newDays.date,
	//     icon: 'none',
	//     duration: 2200
	//    })
	
	
  }
};
</script>


<style>
/*********************************** 布局 ***********************************/
.tdimg {
  position: relative;
  bottom: 20rpx;
  width: 70rpx;
  height: 70rpx;
}
.ribao {
  font-size: 24rpx;
  align-content: center;
  padding: 4% 0% 4% 40%;
  color: #ffffff;
  background-color: black;
  /*border-radius:50px;*/
}
.pos-time {
  position: relative;
  top: 40rpx;
  left: 20rpx;
}
.pos-scrollview {
  display: flex;
  flex-direction: row;
}
.pos-week {
  position: relative;
  bottom: 150rpx;
  left: 25%;
}
.pos-date {
  position: relative;
  bottom: 130rpx;
  left: 25%;
}
/*累计上网时间*/
.pos-alltime {
  position: relative;
  bottom: 50rpx;
  right: 20rpx;
}
/*xxx的手机*/
.deshouji {
  position: relative;
  color: #333333;
  top: 0rpx;
  left: 30rpx;
}
/*设备型号*/
.pos-text {
  position: relative;
  bottom: 41rpx;
  top: 0rpx;
  left: 30rpx;
  /*text-align: center;*/
}
/*  .pos-timeblock {
      position: relative;
      display: flex;
      flex-direction: row;
    }*/
.pos-left {
  flex: left;
  width: 60%;
  height: 100%;
}
.pos-right {
  flex: right;
  width: 40%;
  height: 100%;
}
/*  .pos-timeTitle{
      position:relative;
      left: 15%;
      top: 30rpx;
    }*/
/*  .pos-timeCounter {
      position:relative;
      left: 15%;
      top: 46rpx;
    }*/
/*  .pos-textCounter {
      position:relative;
      left: 45%;
      top: 43rpx;
    }*/
/*  .pos-tips {
      position:relative;
      left: 15%;
      top: 74rpx;
    }*/
/*  .pos-apps {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      top:30rpx;
    }*/
/*  .pos-app {
      height: 33.3%;
    }*/
/*  .pos-appimg {
      position: relative;
    }*/
/*  .pos-appName {
      position: relative;
      display: inline-block;
      left:20rpx;
      bottom: 20rpx;
      width:60%;
    }*/
/*  .pos-detail {
      position:relative;
      left: 100rpx;
      top:30rpx;
    }*/
/*********************************** 样式 ***********************************/
.hr {
  height: 30rpx;
  background-color: gainsboro;
}
.time {
  font-size: 32rpx;
  font-family: "苹方";
  color: #333333;
}
/*累计上网时间*/
.alltime {
  /*text-align: center;*/
  font-size: 24rpx;
  color: #333333;
  float: right;
}
.timenum {
  font-size: 24rpx;
  color: #333333;
}
.timeblock {
  margin: 0 auto;
  width: 680rpx;
  height: 370rpx;
  border-radius: 10rpx;
  box-shadow: 0 0 16rpx #cccccc;
}
.timeTitle {
  font-size: 28rpx;
  color: #333333;
}
.timeCounter {
  font-size: 24rpx;
  color: #333333;
}
.textCounter {
  font-size: 21rpx;
  color: #777777;
}
.tips {
  height: 80rpx;
  width: 70%;
}
.apps {
  width: 100%;
  height: 75%;
}
.appimg {
  height: 65rpx;
  width: 65rpx;
}
.appName {
  font-size: 21rpx;
  color: #777777;
}
.detail {
  font-size: 22rpx;
  color: #666666;
}

/*********************************** 滚动栏 ***********************************/
.scrollview {
  margin-top: 80rpx;
}
.scrollview-block-img {
  height: 145.83rpx;
  width: 145.83rpx;
}
.scrollview-block {
  margin-top: 4rpx;
  height: 145.83rpx;
  width: 145.83rpx;
  box-shadow: 0 0 5rpx #cccccc;
  border-radius: 5.5556rpx;
  display: block;
}
.scrollview-img-week {
  font-size: 18rpx;
  font-family: "苹方";
  color: #999999;
}
.scrollview-img-date {
  font-size: 55rpx;
  font-family: "苹方";
  color: #333333;
}
.scrollview-img-curweek {
  font-size: 18rpx;
  font-family: "苹方";
  color: #ffffff;
}
.scrollview-img-curdate {
  font-size: 55rpx;
  font-family: "苹方";
  color: #ffffff;
}
.scroll-view_H {
  white-space: nowrap;
}
.scroll-view-item {
  height: 148rpx;
}
.scroll-view-item_H {
  display: inline-block;
  width: 25%;
  height: 148rpx;
}

.tr {
  border: sandybrown 0px solid;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
}
.th,
.td {
  padding: 10px;
  /*border-bottom: 1px solid #dadada;*/
  /*border-right: 1px solid #dadada;*/
  /* text-align: center; */
  width: 100%;
}
.th1,
.th2,
.td1,
.td2 {
  width: 40%;
}
.th {
  font-weight: 800;
  /*background-color: #b66242;*/
  font-size: 26rpx;
  color: #333333;
}
.td {
  font-size: 20rpx;
  /*color: #333333;*/
}
.td > img {
  width: 100rpx;
  height: 90rpx;
}
</style>
