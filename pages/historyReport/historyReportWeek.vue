<template>
<view>
      <view>
          <view class="swzbview"><image class="swzb" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/swzb.png?sign=5e5da4ec04411ba9f14867da840f8e36&t=1567058965"/></view>
          <view class="swsjdb">———— 上网时间对比 ————</view>
          
           <view class="qiun-columns">
           	<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
           		<view class="qiun-title-dot-light">基本折线图</view>
           	</view>
           	<view class="qiun-charts" >
           		<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
           	</view>
           </view>
          
          <!-- <view class="zxbg">
            <image class="d" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/ywsjgs.png?sign=7b5bed6635641b6d55211816dab36e70&t=1567060753"/>
            用网时间较少（平均每天用网时间不超过10分钟）
          </view>
          <view class="zxbg">
            <image class="d" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/ywsjyb.png?sign=93198129c524af8ce30f05c0270bbe9b&t=1567060715"/>
            用网时间一般（平均每天用网时间不超过30分钟）
          </view>
          <view class="zxbg">
            <image class="d" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/ywsjzc.png?sign=b67ce0c0b23ccea817a871f80e4ee690&t=1567060697"/>
            用网时间正常（平均每天用网时间不超过60分钟）
          </view>
          <view class="zxbg">
            <image class="d" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/ywsjlc.png?sign=66d029dae091ff4241b191e0af5ab234&t=1567060734"/>
            用网时间略长（平均每天用网时间不超过90分钟）
          </view>
          <view class="zxbg">
            <image class="d" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/yx.png?sign=1e7a25254f1da6dc989f0ccd17e81bdf&t=1567060572"/>
            用网时间过多（平均每天用网时间不超过120分钟）
          </view> -->

          <view class="v">
            <image class="vimg" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/xyy.png?sign=9a55457d8ca00ccddf3ac259311120b1&t=1567134189"></image>
          </view>
      </view>

      <view>
          <view class="swsjdb">———— 浏览网址TOP3 ————</view>

          <view class="zxbg">访问<span class="llwztitile">最多次</span>前TOP3的网址是：</view>
          <view class="tr">
            <view class="td" v-for="(item,index) in weekData.top.click" :key="index">
              <view v-if="index== '1'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP2.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
              </view>
               <view  v-else-if="index=='0'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP1.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
               </view>
               <view  v-else-if="index=='2'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP3.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
               </view>
              <br/>
              <image class="topimg" :src="item.icon"/>
              <br/>
              <view class="top_font">{{item.webinfo}}</view>
            </view>
          </view>

          <view class="zxbg">访问<span class="llwztitile">时间最长</span>前TOP3的网址是：</view>
          <view class="tr">
            <view class="td" v-for="(item,index) in weekData.top.time" :key="index">
              <view v-if="index== '1'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP2.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
              </view>
               <view  v-else-if="index=='0'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP1.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
               </view>
               <view  v-else-if="index=='2'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP3.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
               </view>
              <br/>
              <image class="topimg" :src="item.icon"/>
              <br/>
              <view class="top_font">{{item.webinfo}}</view>
            </view>
          </view>

          <view class="zxbg">访问过的<span class="llwztitile">敏感网站</span>是：</view>
          <view class="tr">
            <view class="td" v-for="(item,index) in weekData.top.flag" :key="index">
              <view v-if="index== '1'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP2.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
              </view>
               <view  v-else-if="index=='0'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP1.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
               </view>
               <view  v-else-if="index=='2'">
              <image class="topnum" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/TOP3.png?sign=fa8a7374b9438955b7311c5266faabf8&t=1567062449"/>
               </view>
              <br/>
              <image class="topimg" :src="item.icon"/>
              <br/>
              <view class="top_font">{{item.webinfo}}</view>
            </view>
          </view>

        <view class="v">
          <image class="vimg" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/llbg/xyy.png?sign=9a55457d8ca00ccddf3ac259311120b1&t=1567134189"></image>
        </view>
      </view>
      <view>
          <view class="swsjdb">————— 综合点评 —————</view>
          <view class="dpbd">孩子平均上网时间：<span class="llwztitile">{{weekData.dayTimeStr}}</span></view><br/>
          <view class="dpbd">
            <span class="zhdpclfs">处理方式：</span>耐心做工作。面对孩子过度上网的情况，家长
            不要着急，应该更加耐心地和孩子做思想工作。如果你此时很
            着急，只能增加孩子的叛逆心理。首先应该反思自己，是不
            是自己工作太忙了，而忽视了孩子需要人陪伴的事情，才导
            致孩子把主要情感寄托在网络上。多带孩子<span class="zhdpclfs">展开查看详情></span>
          </view><br/>
          <view class="dpbd">孩子上网偏向：<span class="llwztitile">{{weekData.asd}}</span></view><br/>
        <view class="dpbd"><span class="zhdpclfs">处理方式</span>：叮嘱孩子要劳逸结合，家长可以多引导孩子玩耍或增加陪伴时间。</view>
        <!-- <input class="butt" type="button"  value="转成长图分享至朋友圈"> -->
        <!-- <input class="fh" type="button" @click="fh()" value="返回"> -->
      </view>

</view>
</template>


<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaLineA=null;
  export default {
    data () {
      return {
        weekData:[],
		url:"",
		cWidth:'',
		cHeight:'',
		pixelRatio:1,
       
      }
    },
	onLoad(options) {
		this.url=this.$consturl;
		_self = this;
		this.cWidth=uni.upx2px(750);
		this.cHeight=uni.upx2px(500);
		// console.log(this);
		this.getServerData(options.deviceid);
	},
    methods:{
		getServerData(deviceid){
			let that=this,lineData;
			  uni.request({
			  url: that.url+'web/api/findHistoryReportWeek',
			  header: {
			    'content-type': 'application/json'
			  },
			  data: {deviceid:deviceid},
			  method: 'get',
			  success: function(res){
			    that.weekData=res.data;
			    let LineA={categories:[],series:[]};
				let asdasda={"name": "","data":""};
			    let lineD=res.data.findTime;
			    let o=[];
			  o[0]=lineD.findTime7_1;o[1]=lineD.findTime7_2;o[2]=lineD.findTime7_3;o[3]=lineD.findTime7_4;o[4]=lineD.findTime7_5;o[5]=lineD.findTime7_6;o[6]=lineD.findTime7_7;
			  lineData=o;
			  asdasda.data=lineData;
			  asdasda.name="每天的上网时长";
			  LineA.categories=['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			  LineA.series.push(asdasda);
			  _self.showLineA("canvasLineA",LineA);
			  },
			  fail: function() {
			  },
			  complete: function() {
			  }
			});
		},
		showLineA(canvasId,chartData){
			canvaLineA=new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'line',
				fontSize:11,
				legend:{show:true},
				dataLabel:false,
				dataPointShape:true,
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				xAxis: {
					type:'grid',
					gridColor:'#CCCCCC',
					gridType:'dash',
					dashLength:8
				},
				yAxis: {
					gridType:'dash',
					gridColor:'#CCCCCC',
					dashLength:8,
					splitNumber:5,
					min:10,
					max:180,
					format:(val)=>{return val.toFixed(0)+'秒'}
				},
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				extra: {
					line:{
						type: 'straight'
					}
				}
			});
			
		},
		touchLineA(e) {
			canvaLineA.showToolTip(e, {
				format: function (item, category) {
					return category + ' ' + item.name + ':' + item.data 
				}
			});
		},
        fh:function() {
              console.log(123);
              const url = "../history/main";
              uni.navigateTo({ url });
            }
    },
    onShareAppMessage () {}
  }
</script>


<style scoped>
  /* .zhexian{

  } */
  .wrap {
    width: 100%;
    height: 300px;
  }
  .butt{
    font-size: 25rpx;
    padding: 10rpx;
    width: 50%;
    background-color: #27aa80;
    color: #ffffff;
    border-radius:50px;
  }
  .fh{
    width: 100%;
    background-color: #27aa80;
    color: #ffffff;
    align-content: center;
    font-size: 25rpx;
    height: 100rpx;
    margin-top:40rpx;
    padding: 25rpx;
  }
  .swzb{
    width: 30%;
    height: 80rpx;
    /*margin-left: 35%;*/

  }
  .swzbview{
    display:flex;
    justify-content: center;
  }
  .swsjdb{
    align-content: center;
    font-size: 32rpx;
    color: #333333;
    margin-left: 20%;
  }
  .zxbg{
    margin-top: 30prx;
    font-size: 24rpx;
    color: #333333;
    margin-left: 10%;
    margin-bottom: 10rpx;
  }
  .v{
    display:flex;
    justify-content: center;
    margin-top: 60rpx;
    margin-bottom: 60rpx;
   }
  .vimg{
    width: 30rpx;
    height: 20rpx;
  }
  .d{
    width: 30rpx;
    height: 30rpx;
    margin-right: 10rpx;
  }
.topimg{
  width: 90rpx;
  height: 90rpx;
}
.topnum{
  width: 70rpx;
  height: 20rpx;
  margin-bottom: 10rpx;
}
.llwztitile{
  font-size: 40rpx;
}
.top_font{
  font-size: 30rpx;
}
.dpbd{
  padding-left: 70rpx;
  padding-right: 70rpx;
  font-size: 26rpx;
  margin-bottom: 30rpx;
}
.zhdpclfs{
  color: #27aa80;
}




  .tr{
    /*margin-bottom: 60rpx;*/
    border: sandybrown 0px solid;
    width:100%;
    display: flex;
    justify-content: space-between;
  }
  .th,.td{
    padding: 10px;
    /*border-bottom: 1px solid #dadada;*/
    /*border-right: 1px solid #dadada;*/
    text-align: center;
    width: 100%;
  }
  .th1,.th2,.td1,.td2{
    width: 40%;
  }
  .th{
    font-weight: 800;
    /*background-color: #b66242;*/
    font-size: 28rpx;
    color: #333333;
  }
  .td{
    font-size: 20rpx;
    color: #333333;
  }
  .qiun-charts {
  	width: 750upx;
  	height: 500upx;
  	background-color: #FFFFFF;
  }
  
  .charts {
  	width: 750upx;
  	height: 500upx;
  	background-color: #FFFFFF;
  }
</style>
