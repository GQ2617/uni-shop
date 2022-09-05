<template>
  <view>
    <view class="goods-item">
      <!-- 左侧图片 -->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
        <image :src="goods.goods_small_logo || defaultPic"></image>
      </view>
      <!-- 右侧信息 -->
      <view class="goods-item-right">
        <!-- 标题 -->
        <view class="goods-name">{{goods.goods_name}}</view>
        <!-- 价格 -->
        <view class="goods-info-box">
          <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numClickHandler"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      }
    },
    // 过滤器
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods:{
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numClickHandler(value){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:+value
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #F0F0F0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      image {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex:1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }
      
      .goods-info-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .goods-price {
          font-size: 16px;
          color: #C00000;
        }
      }
      
    }
  }
</style>
