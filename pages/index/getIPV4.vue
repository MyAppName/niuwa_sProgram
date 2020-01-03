<template>
	<view>
		<button type="primary" show-message-card="123" @click="getIp()">1</button>
	</view>
</template>

<script>
export default {
    data() {
       return {
		
       }
     },
    components:{

    },
    onLoad:function(options){
		uni.showModal({
		    title: '提示框',
		    content: '请确实已连接盒子WIFI',
		    success: function(res) {
		        if (res.confirm) {
		        } else if (res.cancel) {
		
		        }
		    }
		})
    },
    onShow:function(){
		
    },
    methods:{
		getIp:function () {
			
		  
		   
		}
		
    }
}
</script>

<style scoped>

</style>