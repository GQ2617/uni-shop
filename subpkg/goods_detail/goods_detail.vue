<template>
  <view v-if="goods_info.goods_name">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="1500" :duration="1000" :circular="true">
      <swiper-item v-for="(info,index) in goods_info.pics" :key="index">
        <image :src="info.pics_big" @click="priviewImg(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递,免运费--{{cart.length}}</view>
    </view>

    <!-- 详细信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>

    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="gotoCart" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    data() {
      return {
        goods_info: [],
        // 左侧按钮组的配置对象
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    methods: {
      // 1. 获取商品详情信息
      async getGoodsInfo(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style="display:block";').replace(
          /webp/g, 'jpg')
        this.goods_info = res.message
      },
      // 2. 图片预览
      priviewImg(index) {
        uni.previewImage({
          current: index,
          urls: this.goods_info.pics.map(item => item.pics_big)
        })
      },
      // 3. 查看购物车
      gotoCart(e){
        if(e.content.text === '购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      // 获取仓库中加入购物车方法
      ...mapMutations('cart',['addToCart']),
      // 4. 加入购物车
      buttonClick(e){
        if(e.content.text==='加入购物车'){
          const goods = {
            goods_id : this.goods_info.goods_id,
            goods_name : this.goods_info.goods_name,
            goods_price : this.goods_info.goods_price,
            goods_count : 1,
            goods_small_logo : this.goods_info.goods_small_logo,
            goods_state : true
          }
          this.addToCart(goods)
          uni.$showMsg('已加入购物车','success')
        }
      }
    },
    computed:{
      ...mapState('cart',['cart']),
      ...mapGetters('cart',['total'])
    },
    watch:{
      total:{
        handler(newValue){
          const findResult = this.options.find(item=>item.text === '购物车')
          if(findResult){
            findResult.info = newValue
          }
        },
        immediate:true
      }
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsInfo(goods_id)
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      margin: 10px 0;
      font-size: 18px;
      color: #C00000;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray
    }
  }
  
  .goods-detail-container {
    // 给页面外层的容器，添加 50px 的内padding，
    // 防止页面内容被底部的商品导航组件遮盖
    padding-bottom: 50px;
  }
  
  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
