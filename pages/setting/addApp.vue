<template>
  <view class="aa">
    <view class="aa1">
      名单设定
    </view>
    <!--  -->
    <view class="aa2">
      <img src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/addApp_banner.png?sign=dd52c12b6d3a0f0708d4db64a82aa487&t=1574825797" alt="">
    </view>
    <!--  -->
    <view class="aa3">
      <view class="notice">
        <view>为了给孩子们创造一个和谐健康又全面的网络环境，希望各位家长积极参与进来。上传您所知道适合孩子们使用的APP或网址截图即可收到我们的奖励礼品。</view>
        <view>* 请保证上传截图清晰，没有遮挡</view>
        <view>* 上传截图后我们将在1～3个工作日内校验并给您反馈</view>
      </view>
    </view>
    <!-- 相机 -->
    <view class="aa4">
      <view class="aa4Text">请上传使用截图<span class="num">({{urlsSum}}/9)</span></view>
      <view class="j-upload">
      <img @click="previewImg(index)" v-for="(src,index) in urls" :key="src" :src="src"  class="imgs img" >
        <view class="j-upload-btn img" @click="uploadImg()">
           <img class="img" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/camera.png?sign=4bd77d15f5b729cd84a52aa21b6c8616&t=1574825822" alt="">
        </view>
      </view>

      
    </view>
    <view class="aa5">
       <!-- <view class="aa5Btn aa5BtnL"  @click="historyUp">
          <view class="aa5Icon"><img src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/historyUp.png?sign=b0145758481476d94922420c0da765e5&t=1574826042" alt=""  class="aa5Icon"></view>
          <view>查看历史上传记录</view>
          
          </view> -->
        <view class="aa5Btn aa5BtnR" @click="upFile">
          <view class="aa5Icon"><img src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/upFile.png?sign=76db4540f8ea6c0aee26d797a1192c0a&t=1574826153" alt=""  class="aa5Icon"></view>

          <view>上传</view>
        </view>
      </view>
  </view>
</template>

<script>


export default {

 /** 
  * 页面的初始数据 
  */
 data() { 
	 return {
		 url:"",
		 deviceId:"a",
		 urls:[],
		 urlsSum:0,
		 Urls:""
	 }
    

 }, 
 methods: {
   uploadImg(){
          let that = this;
          if(that.urlsSum<=9){
            uni.chooseImage({
				
              count: that.max || 3,
              sizeType: ['original', 'compressed'],
              sourceType: ['album', 'camera'],
              success: function (res) {
                // console.log(res);
                res.tempFilePaths.forEach(v=>{
                 that.urls.push(v);
                 that.urlsSum=that.urls.length;
                });
               // that.$emit("choosed",{all:that.urls,currentUpload:res.tempFilePaths});
            }
          })
          }else{
            uni.showToast({
                        title: '已经九张啦！',
                        icon: 'none',
                        duration: 2000
                        })
          }
          
        },
        previewImg(index){
          let that = this;
          uni.showActionSheet({
            itemList:["预览","删除"],
            success: function(res) {
              if(res.tapIndex === 0){
                uni.previewImage({
                  current:that.urls[index],
                  urls:that.urls
                });
              } else {
                that.urls.splice(index,1);
                that.urlsSum=that.urls.length;
                uni.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 1500
                        })
              }
            },
          });
        },
        historyUp:function(){
          let that = this;
          uni.request({
            url: that.url+'web/api/getSupplementList',
            header: {
                'content-type': 'application/json'
            },
            data:{
              deviceId:that.deviceId
            },
            method: 'get', 
            success: function(res){
          let str=res.data.data;
              str=JSON.parse(str);
              console.log(str);
              uni.showToast({
                        title: "请求成功",
                        icon: 'none',
                        duration: 2000
                        })
             
               
                
            },
            fail: function() {
                // fail
                // console.log("获取白名单组失败");
                uni.showToast({
                        title: 'fail,id:'+that.deviceId,
                        icon: 'none',
                        duration: 2000
                        })
            },
        });
        },
        upFile:function(){
          let l,that=this;
          l=that.urls.length;
          for(let i=0;i<l;i++){
            uni.uploadFile({
              url:that.url+"file/uploadSupplement",
							filePath:that.urls[i],
							name:"file",
							success:function(res){
                console.log(res);
                let a=JSON.parse(res.data).data;
                that.Urls=that.Urls+","+a;
                // console.log(that.Urls);
                // console.log(i,l);
                if(i+1==l){
                  setSupplement();
                }
							}
						})
          }

        function setSupplement(){
          let u = that.Urls.substr(1);
          console.log(u);
          uni.request({
            url: that.url+'web/api/setSupplement',
            header: {
                    "content-type": "application/json"
                },
            data:{
              deviceId:that.deviceId,
              url:that.Urls
            },
            method: "POST",  
            success: function(res){ 
                if(res.data.msg=="success"){
                 uni.showModal({
                     title: '上传成功',
                     content: '是否返回上一页',
                     success: function(res) {
                         if (res.confirm) {
                 			uni.navigateBack({
                 				delta:1
                 			})
                         } else if (res.cancel) {}
                     }
                 })
                }else{
                  uni.showToast({
                        title: '上传失败',
                        icon: 'none',
                        duration: 2000
                        })
                }
            },
            fail: function() {
                console.log("web/api/setSupplement失败");
                },
            });
        }
          
        }
    
  },
 onLoad: function (options) { 
   let that=this;
    that.url=that.$consturl;
    that.deviceId=uni.getStorageSync('deviceId');
 },
}
</script>

<style>
.aa{
  padding-left: 33rpx;

}
.aa2{
  width: 688rpx;
  height: 98rpx;
  margin-top: 42rpx;
}
.aa2>img{
  width: 688rpx;
  height: 98rpx;
}
.aa3{
  width: 649rpx;
  /* height: 154rpx; */
  margin-top: 28rpx;
  padding: 28rpx 21rpx;
  background-color: #eeeeee;
  font-family: Microsoft Yahei;
  font-size: 22rpx;
  color: #666666;
}
/* .notice{
  
} */
.aa4{
  margin-top: 49rpx;

}
.aa4Text{
  font-size: 21rpx;
  color: #333333;
  /* margin-bottom: 22rpx; */
}
.num{
  font-size: 18rpx;
  font-size: #666666;
}
.j-upload{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}
.j-upload-btn{
  border: 1px dashed #ddd;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* margin-right: 20rpx; */
  margin-top: 30rpx;
}
.imgs{
  margin-top: 30rpx;
}
  .img{
    width: 215rpx;
    height: 215rpx;
    /* margin:10rpx 20rpx 10rpx 0; */
   
  }
  .img:nth-child(3n-1){
    margin: 30rpx 21rpx 0 21rpx;
  }

  .aa5{
    display: flex;
    flex-direction: row;
    margin-top: 120rpx;
    
  }
  .aa5Btn{
    width: 330rpx;
    height: 70rpx;
    font-size: 24rpx;
    color: #333333;
    border-radius: 50rpx;
    box-shadow: 0 0 3px #666666;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center
  }
  .aa5BtnL{
     background-color: #ffffff;
  }
  .aa5BtnR{
    background-color: #333333;
    color: #ffffff;
    margin-left: 21rpx;
  }
  .aa5Icon{
    width: 27rpx;
    height: 27rpx;
    margin-right: 24rpx;
  }
</style>
