<template>
	<view>
		<view class="my-settle-container">
      <!-- 全选区域 -->
      <label class="radio" @click="changeAllState">
        <radio :checked="isAllCheck" color="#C00000" /><text>全选</text>
      </label>
      
      <!-- 合计区域 -->
      <view class="amount-box">
        合计：<text class="amount">￥{{checkedAmount}}</text>
      </view>
      
      <!-- 结算按钮 -->
      <view class="btn-settle">结算({{checkedCount}})</view>
    </view>
	</view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    computed:{
      ...mapGetters('cart',['checkedCount','total','checkedAmount']),
      isAllCheck(){
        return this.checkedCount == this.total
      }
    },
    methods:{
      ...mapMutations('cart',['updateAllGoodsState']),
      // 全选/反选
      changeAllState(){
        this.updateAllGoodsState(!this.isAllCheck)
      }
    }
	}
</script>

<style lang="scss">
.my-settle-container{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  
  .radio{
    display: flex;
    align-items: center;
  }
  
  .amount{
    color: #C00000;
  }
  
  .btn-settle{
    height: 50px;
    min-width: 100px;
    background-color: #C00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
