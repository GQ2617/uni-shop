<template>
	<view>
		<!-- 选择收货地址区域 -->
   <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 收货信息 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>{{address.userName}}</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>{{address.telNumber}}</text></view>
          <uni-icons type="forward" size="18"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{address.provinceName+address.cityName+address.countyName+address.detailInfo}}</view>
      </view>
    </view>
    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
        
			};
		},
    methods:{
      // 1. 选择收货地址
      ...mapMutations('user',['updateAddress']),
      async chooseAddress(){
         const [err,succ] = await uni.chooseAddress().catch(err=>err)
         if(err== null && succ.errMsg=="chooseAddress:ok"){
            this.updateAddress(succ)
         }
      }
    },
    computed:{
      ...mapState('user',['address'])
    }
	}
</script>

<style lang="scss">
// 底部边框线
.address-border{
  display: block;
  width: 100%;
  height: 5px;
}
// 选择收货地址
.address-choose-box{
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 收货信息
.address-info-box{
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding:0 5px;
  
  .row1{
    display: flex;
    justify-content: space-between;
    
    .row1-right{
      display: flex;
      align-items: center;
      
      .phone{
        margin-right: 5px;
      }
    }
  }
  
  .row2{
    display: flex;
    align-items: center;
    margin-top: 10px;
    .row2-left{
      white-space: nowrap;
    }
  }
}
</style>
