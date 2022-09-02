<template>
	<view class="my-search-container" @click="goSearch">
	  <view class="my-search-box">
	    <!-- 放大镜 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    methods:{
      goSearch(){
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
.my-search-container{
  background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  
  .my-search-box{
    height: 36px;
    background-color: #FFFFFF;
    border-radius: 15px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .placeholder{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
