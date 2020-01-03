<template>
  <view class="invisibleList">
     <view class="iv">
       <view class="iv1"> 名单设定</view>
       <view class="iv2">
         <view style="overflow:hidden">
         <view class="iv2_title">不可访问名单</view></view>
         <view class="iv2_btns">

           <view class="iv2_btn iv2_btnL" @click="iv2_btnL">
             <img class="iv2_btnsImg" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/iv2_btnL.png?sign=8ed388ae73ebe8d62798ec768f83b7dc&t=1575260315" alt="">
             <view>取消</view>
           </view>

           <view  class="iv2_btn iv2_btnR" @click="iv2_btnR">
             <img class="iv2_btnsImg" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/iv2_btnR.png?sign=78c37aa29660960458258886e1d0e901&t=1575260337" alt="">
             <view>移至白名单</view>
           </view>

         </view>
         <view class="iv2_list" >
           <view class="li"  v-for="(studys,index) in study" :key="index" @click="li(index)">
            <view class="item1"  :class="{'item2':studys.active}">
             <img class="item_sub" :src="studys.icon" alt="icon">
            </view>
            <view class="item_text" :class="{'item_text2':studys.active}">{{studys.remark}}</view>
           </view>
 
           
         </view>
       </view>
     </view>
  </view>
</template>

<script>


export default {

 /** 
  * 页面的初始数据 
  */
 data(){ 
	 return {
		 url:"",
		 study:[
		   // {icon: "/static/icon/finance/3.png", remark: "test1", url: "*.guadian.com",active:true},
		   // {icon: "/static/icon/finance/6.png", remark: "test2", url: "*.nenshang.com",active:false},
		   // {icon: "/static/icon/finance/5.png", remark: "test3", url: "*.niangniu.com",active:false},
		   // {icon: "/static/icon/finance/3.png", remark: "test4", url: "*.guadian.com",active:false},
		   // {icon: "/static/icon/finance/6.png", remark: "test55555555555555555", url: "*.nenshang.com",active:false},
		   // {icon: "/static/icon/finance/5.png", remark: "test6", url: "*.niangniu.com",active:false}
		 ],
	 }
    
  
 }, 
 methods: {
  // 取消
   iv2_btnL:function(){
     for(let i=0;i<this.study.length;i++){
        this.study[i].active=false;
      }
   },
  // 移至白名单
   iv2_btnR:function(){
      let that=this;
      let list=that.study,iss,addi=[],delList=[],textlist={},webinfo;
      // 删除进入白名单的选项
        for(let i=0;i<list.length;i++){
            iss=list[i].active;
             if(iss==true){
              addi.push(i);
               //  记录要增加的{}
              textlist=list[i];
              console.log(list[i]);
              //  记录要增加的{}.remark的值
              webinfo=textlist.remark;
              // 增加的{}.remark的值
              delete textlist.remark;
              // {}.remark  替换成{}.webinfo
              textlist.webinfo=webinfo;
              console.log(textlist);
              // 要增加的所有信息
              delList.push(textlist);
             }
         }
        console.log(addi);
        for(let i=addi.length-1;i>=0;i--){
            list.splice(addi[i],1);  
        }//

         uni.request({
            url: that.url+'web/api/setWhiteList',
            header: {
                    "content-type": "application/json"
                },
            data: { deviceId: that.deviceId,action:"add",data:delList },
            method: "POST",  
            success: function(res){
                let datas=res;
                console.log(datas.msg);
                if(datas.msg==success){
                  uni.showToast({
                        title: '设置成功',
                        icon: 'success',
                        duration: 2000
                        })
                }
                
            },
            fail: function() {
                // fail
                // console.log("删除白名单失败");
                uni.showToast({
                        title:"删除白名单失败",
                        icon: 'loading',
                        duration: 2000
                        })
            },
            complete: function() {
                // complete
            }
        });//
   },
   li:function(index){
      // console.log(!this.study[index]);
      this.study[index].active=!this.study[index].active;
    }

  },
 onLoad: function (options) { 
   let that=this;
   that.url=that.$consturl;
   that.deviceId=uni.getStorageSync('deviceId');
   uni.request({
            url: that.url+'web/api/getWhiteList',
            header: {
                    "content-type": "application/json"
                }, 
            data: { deviceId: that.deviceId,flag:2,search:"" },
            method: "POST",  
            success: function(res){
                let datas=res.data;
                let a=datas.data,icon1;
                for (let s of a) {
                	icon1=s.icon;
                	icon1=icon1.substring(0,icon1.indexOf(":"));
                	s.icon="https://www.985-211.com.cn/"+icon1;
                	
                	// console.log();
                }
                that.study=a;
               
                
            },
            fail: function() {
                // fail
                console.log("获取黑名单失败");
            },
            complete: function() {
                // complete
            }
        });
  

       
 },
}
</script>
<style>
.iv1{
  margin-left: 34rpx;
}
.iv2{
  width: 689rpx;
  margin-top: 42rpx;
  margin-left: 33rpx;
  box-shadow:0px 0px 3px #999999;
  border-radius: 10rpx;
}
.iv2_title{
  width: 100%;
  text-align: center;
  font-size: 34rpx;
  color: #333333;
  margin-top: 42rpx;
}

.iv2_btns{
  margin-top: 35rpx;
  margin-left: 92rpx;
  display: flex;
  flex-direction: row;

}
.iv2_btn{
  width: 238rpx;
  height: 70rpx;
  border-radius: 50rpx;
  box-shadow:  #333333 0px 0px 6px;
  font-size: 22rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.iv2_btnL{
  background-color: white;
  color: #333333;
  
}
.iv2_btnR{
  background-color: #333333;
  color: white;
  margin-left: 28rpx;
}
.iv2_btnsImg{
  width: 21rpx;
  height: 21rpx;
  margin-right: 21rpx;
}


.iv2_list{
  margin: 25rpx 92rpx 0 92rpx;
  padding-bottom: 42rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.item1{
  width: 84rpx;
  height: 84rpx;
  border: 8rpx solid #ffffff;
  
}
.item2{
  width: 84rpx;
  height: 84rpx;
  border: 8rpx solid #333333;
  border-radius: 20rpx;
}
.item_sub{
  width: 72rpx;
  height: 72rpx;
  margin: 6rpx ;
}
.item_text{
  width: 84rpx;
  font-size: 21rpx;
  text-align: center;
  color: #999999;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.item_text2{
  width: 84rpx;
  font-size: 21rpx;
  text-align: center;
  color: #333333;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>