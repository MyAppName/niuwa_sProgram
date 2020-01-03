<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
export default {
    data() {
       return {
			url:""
       }
     },
    components:{

    },
    onLoad:function(options){
		let id=options.id,that=this;
		if(id==1){
			that.url=""
		}
		if(id==2){
			that.url=""
		}

    },
    onShow:function(){

    },
    methods:{
    },
}
</script>

<style scoped>

</style>
