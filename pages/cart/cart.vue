<template>
  <view>
    <view class="cart-container" v-if="cart.length!==0">
      <!-- 收货地址区域 -->
      <my-address></my-address>
      
      <!-- 商品信息区域 -->
      <view class="cart-title">
        <!-- 左侧图标 -->
        <uni-icons type="shop" size="18"></uni-icons>
        <!-- 右侧文本 -->
        <text class="cart-title-text">购物车</text>
      </view>
      
      <!-- 循环渲染购物车商品信息 -->
      <uni-swipe-action>
        <view v-for="(cart,index) in cart" :key="index">
          <uni-swipe-action-item :options="options" @click="swiperItemClickHandler(cart)">
            <my-goods :goods="cart" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>
          </uni-swipe-action-item>
        </view>
      </uni-swipe-action>
      
      <!-- 结算区域 -->
      <my-settle></my-settle>
    </view>
    
    <!-- 空白购物车 -->
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">这里空空如也~</text>
    </view>

  </view>
</template>

<script>
  import badgeMix from '../../mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {

    mixins: [badgeMix],
    data() {
      return {
        options:[
          {
            text:'删除',
            style:{
              backgroundColor:'#C00000'
            }
          }
        ]
      };
    },
    computed: {
      ...mapState('cart', ['cart']),
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      // 1. 选中状态
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      // 2. 商品数量
      numChangeHandler(e) {
        this.updateGoodsCount(e)
        this.setBadge()
      },
      // 3. 删除商品
      swiperItemClickHandler(e){
        this.removeGoodsById(e)
        this.setBadge()
      }
    }
  }
</script>

<style lang="scss">

  .cart-container{
    padding-bottom: 50px;
    
    .cart-title {
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 14px;
      padding-left: 5px;
      border-bottom: 1px solid #efefef;
    
      .cart-title-text {
        margin-left: 10px;
      }
    }
  }
  
  .empty-cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    
    .empty-img{
      width: 90px;
      height: 90px;
    }
    .tip-text{
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
