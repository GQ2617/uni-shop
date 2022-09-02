<template>
  <view>
    <!-- 放大镜模块 -->
    <view class="search-box"><my-search @click="gotoSearch"></my-search></view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(nav,index) in navList" :key="index" @click="navClickHandler(nav)">
        <image :src="nav.image_src" class="nav-img"></image>
      </view>
    </view>
    
    <!-- 楼层模块 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(floor,index) in floorList" :key="index">
        <!-- 楼层标题 -->
        <image :src="floor.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层主体 -->
        <view class="floor-img-box">
          <!-- 左侧 -->
          <navigator class="left-img-box" :url="floor.product_list[0].url">
            <image :src="floor.product_list[0].image_src" :style="{width: floor.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(product,index) in floor.product_list" :key="index" v-if="index!==0" :url="product.url">
              <image :src="product.image_src" mode="widthFix" :style="{width: product.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [], //轮播图数据
        navList: [], //导航列表数据
        floorList: [], //楼层数据
      };
    },

    methods: {
      // 1. 获取轮播图数据
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },
      // 2. 获取导航列表数据
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      // 3. 路由跳转(分类页面)
      navClickHandler(nav) {
        if (nav.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 4. 获取楼层数据
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.forEach(floor=>{
          floor.product_list.forEach(prod=>{
            prod.url='/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      // 5. 点击搜索栏去往search页面
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    },

    onLoad() {
      this.getSwiperList(),
        this.getNavList(),
        this.getFloorList()
    }
  }
</script>

<style lang="scss">
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  
  .floor-title{
    height: 60rpx;
    width: 100%;
    display: flex;
  }
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
</style>
