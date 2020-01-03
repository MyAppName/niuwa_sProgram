<template>
    <view class="block loginContainer" :style="{height:curheight}">
        <view class="title block-title">填写儿童信息</view>
        <view class="info block-info">请按照实际情况填写家中儿童相关信息，并保证真实。有关之后牛蛙系统对儿童进行网络监督、教育等。
            二次修改请到"配置管理--用户管理"进行操作
        </view>

        <view class="block-prompt prompt">请选择家中孩子数量</view>
<!-- https://cloud.eaec.cn/cloud/static/images/childrenSet/childrenNum54%2054.png -->
        <img class="block-numberImg numberImg" src="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/tabs/childrenNum54 54.png"/>
        <view class="block-slider">
            <mp-slider @change="slider" step="1" min="1" max="5" show-value :value="childnum"
                backgroundColor="#333333" activeColor="#cccccc" blockColor="#333333" blockSize="18"></mp-slider>
        </view>


        <view v-for="child in childrenList" class="childs" :key="childrenList">
            <!-- <view class="viewide block-viewide" ></view> -->
			<view class="childBtn">
				<input type="button" :class="child.manFlag ? 'block-male maleButton' : 'block-male maleButton-none'" @click="changeGenderMale(child)" name="gender" value="男"/>
				<input type="button" :class="child.manFlag ? 'block-female femaleButton-none' : 'block-female femaleButton'" @click="changeGenderFemale(child)" name="gender" value="女"/>
			</view>
            <view class="childYear">
            	<input type="number" class="block-input input" placeholder="请输入儿童年龄" placeholder-class="inputPlaceholder" name="age" :value="child.age"/>
            	<label class="block-ageLabel ageLabel">岁</label>
            	<!-- <view class="block-underline underline"></view> -->
            </view>
            
        </view>

        <input @click="back" type="button" class="finish block-finish" value="完 成" hover-class="finishHover"/>
        
    </view>
</template>

<script>
import mpSlider from 'slider';
export default {
    components: {
        mpSlider,
    },
    data() {
        return {
            childnum: 1,
            childrenList: [
                { gender: '男' , age: '' , manFlag: true}
            ],
            longer: "width: 683.33rpx; height: 640.278rpx; ",
            curheight: 660.278+"rpx",
        }

    },
    methods :{
        /*
         * slider 滑动条滑动事件函数
         * 参数e，为滑动事件event
         * childnum为列表项数
         * curheight目的是跟随列表长度动态改变页面长度
         * childrenList为列表
         * 循环目的是初始化列表
         */
        slider(e) {
            this.childnum = e.mp.detail.value
            this.curheight = 640.278 + 235*(this.childnum-1) + "rpx"
            this.childrenList =[];
            for( var i = 0; i < e.mp.detail.value; i++) {
                this.childrenList.push({ gender: '男' , age: '' , manFlag: true})
            }
        },
        /*
         * changeGenderMale，changeGenderFemale 改变性别
         * 点击后样式也发生变化，manFlag来控制样式，数据改变
         */
        changeGenderMale : function(child) {
            child.manFlag=true;
            child.gender="男";
        },
        changeGenderFemale : function(child) {
            child.manFlag=false;
            child.gender="女";
        },
        /*
         * back 跳转页面
         * 设定完之后跳转到之前的页面，利用redirectTo的特性销毁当前页
         */
        back : function() {
            const url='../WiFiInfo/main';
            uni.redirectTo({ url });
        },

    }
}
</script>

<style>
/******************** 布局 ************************/
.block {
    position: absolute;
    top: 30rpx;
}
.block-title{
    position: relative;
    top: 30rpx;
    width: 100%
}
.block-info{
    position: relative;
    top: 70rpx;
    left: 15%;
    width: 70%;
}
.block-prompt {
    position: relative;
    top: 80rpx;
    left: 15%;
}
.block-numberImg {
    position: relative;
    top: 90rpx;
    left: 15%;
    width: 20%;
}
.block-slider {
    position: relative;
    top: 20rpx;
    left: 25%;
    width: 65%;
}
.childs{
	display: flex;
	flex-direction: row;
	margin-top: 30rpx;
}
.childBtn{
	display: flex;
	flex-direction: row;
	margin-left: 100rpx;
}
.childYear{
	display: flex;
	flex-direction: row;
	margin-left: 100rpx;
}
.block-input {
  width: 160rpx;
}

.block-underline {
    position: relative;
    left: 55%;
    bottom: 80rpx
}
.block-viewide {
    position: relative;
    left: 20%;
    top: 50rpx;
}
.block-finish {
    position: relative;
    left: 60%;
    top: 15rpx;
}

/******************** 内容 ************************/
.loginContainer{
    width: 683.33rpx;
    box-shadow: 0 0 16.9444rpx #cccccc;
    margin:0 auto;
    margin-top:41.64rpx;
    margin-left:33.333rpx;
    font-family: "黑体";
    border-radius: 5.5556rpx;
}
.title{
    margin:0 auto;
    text-align: center;
    font-size: 42rpx;   
    color: #333333;
}
.info{
    font-size: 20rpx;
    color: #666666;
}
.prompt {
    font-size: 23rpx;
    color: #cccccc;
}
.numberImg {
    height: 40rpx;
    width: 40rpx;
}
.maleButton {
    height: 52.78rpx;
    width: 111.11rpx;
    border-radius: 30rpx 0 0 30rpx;
    background-color: #333333;
    font-size: 20rpx;
    text-align: center;
    color: #ffffff;
}
.maleButton-none {
    height: 52.78rpx;
    width: 111.11rpx;
    border-radius: 30rpx 0 0 30rpx;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    font-size: 20rpx;
    text-align: center;
    color: #cccccc;
}
.femaleButton {
    height: 52.78rpx;
    width: 111.11rpx;
    border-radius: 0 30rpx 30rpx 0;
    background-color: #333333;
    border-left: 0;
    font-size: 20rpx;
    text-align: center;
    color: #ffffff;
}
.femaleButton-none {
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
.input {
    color: #333333;
    font-size: 20rpx;
}
.ageLabel {
    color:#cccccc;
    font-size: 20rpx;
	line-height: 53rpx;
}
.inputPlaceholder {
    color:#cccccc;
    font-size: 20rpx;
}
.underline {
    border-bottom: 1rpx solid #cccccc;
    width: 200rpx;
}
.viewide {
    border-bottom: 1rpx solid #e5e5e5;
    width: 370rpx;
    margin-bottom: 30rpx;
}
.finish {
    height: 70rpx;
    width: 160rpx;
    border-radius: 60rpx;
    background-color: #333333;
    font-size: 24rpx;
    text-align: center;
    color: #ffffff;
}
.finishHover {
    height: 70rpx;
    width: 160rpx;
    border-radius: 60rpx;
    background-color: #cccccc;
    font-size: 24rpx;
    text-align: center;
    color: #ffffff;
}

</style>