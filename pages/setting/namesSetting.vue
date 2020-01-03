<template>
  <view class="namesSetting">
     <view class="ns1">名单设定</view>
     <view class="ns2">
       <!--图片-->
       <view class="img" @click="addApp">
         <img class="img" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/namesSetting.png?sign=ca953a2594d2d60252778d95592a03cc&t=1574755465" alt="">
       </view>
       <!-- 搜索栏 -->
       <view class="searchBox">
          <input class="searchInput" type="text" placeholder="请输入想查找的内容" v-model="searchInput" @input="searchtext">
          <view class="searchImg" @click="search"><img src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/search.png?sign=429e8c63c3f78208f69f827d4fa1193e&t=1574755438" alt=""></view>
       </view>
       <!-- 搜索栏 搜索的结果 -->
       <!-- <view class="add" v-if="isadd">
         <view class="">
           <view class="itemBox" @click="itemBox(index)" v-for="(addL,index) in addList" :key="index" :class="{'itemBoxBg':addL.active}">
             <view class="itemText">
               <view class="text1">{{addL.remark}}</view>
               <view class="text2">游戏`竞技</view>
             </view>
             <img class="itemImg" :src="url+addL.icon" alt="">
             <img  v-if="isEdit" class="itemImg2" :src="addL.active?checked:unChecked" alt="">
           </view>
         </view>
       </view> -->
       <!--主要内容 title  -->
       <view class="refresh">
         <view  class="refreshText">您的孩子可能喜欢...</view>
         <img @click="edit" class="editImg" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/app/edit.png?sign=8b46d9b294922126e42917aae29dcf65&t=1574407403" alt="">
         <span v-if="isEdit==false" class="edit" @click="edit">编辑</span><span v-if="isEdit" class="edit" @click="edit">完成</span>
       </view>
	   <!-- 编辑主要内容 -->
	    <view class="ns3 "  v-if="isEdit">
	      <view class="ns3Btn invisibleList" @click="invisibleList">
	        <img class="ns3_img" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/invisibleList.png?sign=14c9d52274b5b80480fd95079a213bd1&t=1575252594" alt="">
	        <view class="ns3_text">查看不可访问名单</view>
	      </view>
	      <view class="ns3Btn invisibleSetting" @click="invisibleSetting">
	        <img class="ns3_img" src="https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/invisibleSetting.png?sign=b73906312fea0d5df42d447828b32e7b&t=1575252616" alt="">
	        <view class="ns3_text">移至不可访问名单</view>
	      </view>
	    </view>
       <!-- 主要内容 content -->
       <view>
         <view class="item">
           <!--  -->
           <view class="itemBox" @click="itemBox(index)" v-for="(studys,index) in study" :key="index" :class="{'itemBoxBg':studys.active}">
             <view class="itemText">
               <view class="text1">{{studys.remark}}</view>
               <view class="text2">{{studys.type}}-{{studys.secibdaryType}}</view>
             </view>
             <img class="itemImg" :src="studys.icon" alt="">
             <img  v-if="isEdit" class="itemImg2" :src="studys.active?checked:unChecked" alt="">
           </view>

            <!-- <view class="itemBox" v-for="(read,index) in study" :key="index">
             <view class="itemText">
               <view class="text1">{{read.remark}}</view>
               <view class="text2">视频`竞技</view>
             </view>
             <img class="itemImg" :src="url+read.icon" alt="">
           </view> -->


           
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
 data() {
 	return {
 		
 		   url:"",
 		   deviceId:"",
 		   isEdit:false,
 		   isadd:false,
 		   searchInput:"",
 		   addList:[],
 		   study:[
 		   //   {icon: "https://www.985-211.com.cn/vdata/icon/2019122403113536503348.png", remark: "牛蛙1", url: "*.guadian.com",active:false},
 		   //   {icon: "https://www.985-211.com.cn/vdata/icon/2019122403113536503348.png", remark: "牛蛙12", url: "*.nenshang.com",active:false},
 		   //   {icon: "https://www.985-211.com.cn/vdata/icon/2019122403113536503348.png", remark: "牛蛙1234567890", url: "*.niangniu.com",active:false}
 		   ],
		   temporaryContainer:[],
 		   unChecked:"https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/unChecked.png?sign=5597041f7d58440fce96a121321bd712&t=1575253411",
 		   checked:"https://6e69-niuwa-js2i2-1300106435.tcb.qcloud.la/img/namesSetting/checked.png?sign=0c1d177458116841c8f1cbe269db4fc8&t=1575253473",
 		
 	}
 },

 methods: {
   searchtext:function(){
	  
     let that=this,inputNum;
	 inputNum=that.searchInput.length;
     if(inputNum=0||inputNum==""){
		that.study=that.temporaryContainer;
     }
   },
   search:function(){
	   let that=this;
	   that.temporaryContainer=that.study;
    // let a=[
    //     {icon: "/static/icon/finance/3.png", remark: "王者荣耀", url: "*.guadian.com",active:false},
    //     {icon: "/static/icon/finance/6.png", remark: "和平精英", url: "*.nenshang.com",active:false}
    //   ];
	uni.request({
	         url: that.url+'web/api/getWhiteList',
	         header: {
	                 "content-type": "application/json"
	             },
	         data: { deviceId: that.deviceId,flag:1,search:this.searchInput },
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
	             console.log("获取白名单失败");
	         },
	         complete: function() {
	             // complete
	         }
	     });
		 
		 // console.log();
      // this.addList=a;
   },
    edit:function(){
      let that=this;
      that.isEdit=!that.isEdit;
      for(let i=0;i<that.study.length;i++){
        that.study[i].active=false;
      } 
    },
    addApp:function(){
      const url='./addApp';
      uni.navigateTo({ url });
    },
    itemBox:function(index){
      // console.log(!this.study[index]);
      if(this.isEdit){
      this.study[index].active=!this.study[index].active;

      }
    },
    invisibleList:function(){
      const url='./invisibleList';
      uni.navigateTo({ url });
    },
    invisibleSetting:function(){
      let that=this;
      //                      记录下标，要删除的信息，
      let list=that.study,iss,addi=[],delList=[],textlist={},webinfo;
      // 删除进入黑名单的选项
        for(let i=0;i<list.length;i++){
            iss=list[i].active;
             if(iss==true){
              //  记录要删除的下标
              addi.push(i);
              //  记录要删除的{}
              textlist=list[i];
              console.log(list[i]);
              //  记录要删除的{}.remark的值
              webinfo=textlist.remark;
              // 删除的{}.remark的值
              delete textlist.remark;
              // {}.remark  替换成{}.webinfo
              textlist.webinfo=webinfo;
              console.log(textlist);
              // 要删除的所有信息
              delList.push(textlist);
             }
         }
        console.log(delList);
        for(let i=addi.length-1;i>=0;i--){
            list.splice(addi[i],1);  
        }//
        // 删除接口
        uni.request({ 
            url: that.url+'web/api/setWhiteList',
            header: {
                    "content-type": "application/json"
                },
            data: { deviceId: that.deviceId,action:"del",data:delList },
            method: "POST",  
            success: function(res){
                let datas=res.data;
                // console.log(datas);
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
            data: { deviceId: that.deviceId,flag:1,search:"" },
            method: "POST",  
            success: function(res){
                let datas=res.data;
                let a=datas.data,icon1;
				for (let s of a) {
					icon1=s.icon;
					// icon1=icon1.substring(0,icon1.indexOf(":"));
					icon1=icon1.substring(0,icon1.indexOf(":"));
					s.icon="https://www.985-211.com.cn/"+icon1;
					
					// console.log();
				}
				that.study=a;
                 
            },
            fail: function() {
                // fail
                console.log("获取白名单失败");
            },
            complete: function() {
                // complete
            }
        });
       
 },
}
</script>

<style>
/* .namesSetting{
  min-height:  100vh;
  position: relative;
} */
.ns1{
  font-size: 40rpx;
  /* margin:28rpx 33rpx; */
  margin-left: 33rpx;
}
.ns2{
  margin:42rpx 33rpx;
}
.img{
  width: 689rpx;
  height: 320rpx;
}
.searchBox{
  width: 689rpx;
  height: 84rpx;
  margin-top: 28rpx;
  border: 3rpx solid black;
  border-radius: 50rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
}
.searchInput{
  margin-left: 42rpx;
  font-size: 28rpx;
}
.searchImg{
  margin-right: 42rpx;
}
.searchImg>img{
  width: 28rpx;
  height: 28rpx;
}
.refresh{
  margin-top: 49rpx;
  font-size: 21rpx;
  color: #666666;
  display: flex;
  flex-direction: row;
  margin-bottom: 21rpx;
}
.refreshText{
  width: 600rpx;
  text-align: center;
  color: #999999;
}
.editImg{
  width: 28rpx;
  height: 28rpx;
  padding-right: 8rpx;
}
.edit{
  font-size: 22rpx;
}

.item{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.itemBox{
  width: 287rpx;
  height: 84rpx;
  box-shadow:  #666666 0px 0px 3px;
  margin: 63rpx 0rpx 0 42rpx;
  position: relative;
}
.itemBoxBg{
  background-color: #e5e5e5;
}
.itemBox:nth-child(even){
  /* margin-right: 20rpx; */
  margin-left: 70rpx;
}
.itemText{
  height: 84rpx;
  margin-left: 63rpx;
    display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
}
.text1{
  font-size: 24rpx;
  color: #333333;
  margin-bottom: 3rpx;
}
.text2{
  font-size: 22rpx;
  color: #666666;
  margin-top: 3rpx;
}
.itemImg{
  width: 84rpx;
  height: 84rpx;
  /* background-color: red; */
  position: absolute;
  top: -42rpx;
  left: -42rpx;
}
.itemImg2{
  width: 21rpx;
  height: 21rpx;
  /* background-color: red; */
  position: absolute;
  top: 14rpx;
  right: 14rpx;
}

.ns3{
/* position: fixed;
  left: 33rpx;
  bottom: 142rpx; */
  /* margin-left: 33rpx; */
  margin-top: 33rpx;
  display: flex;
  flex-direction: row;
  /* justify-content: center;
  align-items: center; */
}
.ns3Btn{
  width: 330rpx;
  height: 70rpx;
  border-radius: 50rpx;
  box-shadow:  #333333 0px 0px 6px;
  font-size: 24rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.invisibleList{
  background-color: white;
  color: #333333;
  
}
.invisibleSetting{
  background-color: #333333;
  color: white;
  margin-left: 28rpx;
}
.ns3_img{
  width: 21rpx;
  height: 21rpx;
  margin-right: 21rpx;
}
</style>
