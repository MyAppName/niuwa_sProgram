<template>
	<view class="frame">
	<view class="dpbd">截止{{dayData.thisTime}}</view>
	<view class="dpbd">孩子总上网时长{{dayData.total_time}}分钟</view>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">饼图右侧图</view>
		</view>
		<view class="qiun-charts qiun-rows" >
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"></canvas>
		</view>
	</view>
	<view class="dpbd">
	      访问
	      <span class="llwztitile">最多次的网址是：</span>
	      <span class="llwztitile">{{findtimemore.webinfo}}</span>
	      <image class="topimg" :src="findtimemore.icon" />
	    </view>
	    <view class="dpbd">
	      访问
	      <span class="llwztitile">时间最长的网址是：</span>
	      <span class="llwztitile">{{findclickmore.webinfo}}</span>
	      <image class="topimg" :src="findclickmore.icon" />
	    </view>
	<!-- <view>=================================================================</view> -->
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">基本柱状图</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view>
	</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
	var canvaPie=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				dayData: [],
				findtimemore: "",
				findclickmore: "",
				url:""		
			}
		},
		onLoad(options) {
			this.url=this.$consturl;
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData(options.deviceid);
		},
		methods: {
			butt: function() {
		      console.log("按钮已触发");
		    },
		    sub: function() {
		      const url = "../historyzhou/main";
		      uni.navigateTo({ url });
		    },
		    fh: function() {
		      // console.log(123);
		      const url = "../history/main";
		      uni.navigateTo({ url });
		    },	
			getServerData(deviceid){
				let that = this,pData,lData;
				uni.request({
				      url: that.url+'web/api/findHistoryReportDay',
				      header: {
				        'content-type': 'application/json'
				      },
				      data: {deviceid:deviceid},
				      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
				      // header: {}, // 设置请求的 header
				      success: function(res){
				        that.dayData=res.data;
				         that.findtimemore=res.data.findTypesp.findtimemore;
				        that.findclickmore=res.data.findTypesp.findclickmore;
				        let Column={categories:[],series:[]};
						let Pie={series:[]};
						let asdasda={"name": "","data":""};
				        let lsg= that.dayData.findTypesp.type[0];
				        lData=that.dayData.findTypesp.listTime;
				        let sss=[];
				        for(let t in lsg){
				          sss.push(lsg[t]);
				        };
				       let x= [{ data: 0, name: "视频" },
				            { data: 1, name: "购物" },
				            { data: 2, name: "学习" },{ data: 2, name: "学习" }
				            ];
							
				            for(var i =0;i<x.length;i++){
								
				              x[i].data=sss[i];
				              // console.log(x[i].value);
				               pData=x;
				            };
						Column.categories=[ "2","4","8","10","12","14","16","18","20","22","24"];
						asdasda.data=lData;
						asdasda.name="所用时间";
						Column.series.push(asdasda);
						console.log(Column);
						_self.showColumn("canvasColumn",Column);
						Pie.series=pData;
						_self.showPie("canvasPie",Pie);
				      },
				      fail: function() {
				        // fail
				        console.log('history请求资源......fail');
				      },
				      complete: function() {
				      }
				    });
			},
			showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:{show:true},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});
				
			},
			touchColumn(e){
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
					}
				});
			},
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{
					  show:true,
					  position:'right',
					  float:'center',
					  itemGap:10,
					  padding:5,
					  lineHeight:26,
					  margin:5,
					  borderWidth :1
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  labelWidth:15
						}
					},
				});
				this.piearr=canvaPie.opts.series;
			},
			touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
		}
	}
</script>

<style>
page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
.wrap {
  width: 100%;
  height: 400px;
}
.dian {
  width: 30rpx;
  margin-top: 10rpx;
  height: 30rpx;
  margin-right: 10rpx;
}
/* .bing { */
  /* position :relative;
    top:80% */
/* } */
.l {
  position: relative;
  left: 100rpx;
  background-color: #f4f4f4;
  border-radius: 100px;
  width: 100rpx;
  height: 100rpx;
  border: 50px solid gold;
}
.r {
  font-size: 25rpx;
  position: relative;
  bottom: 240rpx;
  left: 520rpx;
}
.list {
  margin-left: 10%;
  font-size: 25rpx;
}
.zhexian {
  position: relative;
}
.wrap2 {
  width: 100%;
  height: 300px;
  position: absolute;
  left: 0rpx;
}

.butt {
  font-size: 25rpx;
  padding: 10rpx;
  width: 50%;
  background-color: #27aa80;
  color: #ffffff;
  border-radius: 50px;
}
.fh {
  width: 100%;
  background-color: #27aa80;
  color: #ffffff;
  align-content: center;
  font-size: 25rpx;
  height: 100rpx;
  margin-top: 40rpx;
  padding: 25rpx;
}

.dpbd {
  margin-left: 10rpx;
  font-size: 25rpx;
  padding-right: 70rpx;
  margin-bottom: 30rpx;
}
.llwztitile {
  font-size: 35rpx;
}
.topimg {
  width: 90rpx;
  height: 90rpx;
  margin-left: 30rpx;
}
.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts-pie{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts-right{display:flex;align-items:center;width: 250upx; height:500upx;background-color: #FFFFFF;}
.legend-itme{width: 200upx; margin-left: 30upx; height:50upx;align-items:center;}
.legend-itme-point{width: 20upx; height:20upx; margin: 15upx;  border: 1px solid #FFFFFF; border-radius: 20upx;background-color: #000000;}
.legend-itme-text{height:50upx;line-height: 50upx;color: #666666;font-size: 26upx;}

</style>