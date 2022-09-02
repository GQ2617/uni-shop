<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <view :class="['left-scroll-view-item',index == active ? 'active' : '']" @click="changeActive(index)" v-for="(cate,index) in cateList"
          :key="index">{{cate.cat_name}}</view>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <!-- 二级分类列表 -->
        <view class="cate-lv2-list" v-for="(cate2,index) in cateLevel2" :key="index">
          <!-- 二级分类标题 -->
          <view class="cate-lv2-title">{{cate2.cat_name}}</view>
          <!-- 二级分类内容 || 三级分类列表 -->
          <view class="cate-lv3-list">
            <!-- 三级分类item项 -->
            <view class="cate-lv3-item" v-for="(cate3,index) in cate2.children" :key="index" @click="gotoGoodsList(cate3)">
              <!-- 图片 -->
              <image :src="cate3.cat_icon"></image>
              <!-- 文本 -->
              <text>{{cate3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        active: 0,
        scrollTop:0,
        cateList: [],
        cateLevel2:[],
      };
    },
    methods: {
      // 1. 获取屏幕高度
      async getSysInfo() {
        const sysInfo = await uni.getSystemInfo()
        this.wh = sysInfo[1].windowHeight
      },
      // 2. 获取左侧一级分类列表数据
      async getcateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message  //一级分类
        this.cateLevel2 = res.message[0].children  //二级分类
      },
      // 3. 改变active
      changeActive(index) {
        this.active = index //选中样式
        this.cateLevel2 = this.cateList[index].children  //每个一级分类下的二级分类
        this.scrollTop = this.scrollTop == 0 ? 1 : 0   //新一级分类的滚动条设置
      },
      // 4. 点击三级分类进入商品列表页面
      gotoGoodsList(cate3){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+cate3.cat_id
        })
      }
      
    },
    onLoad() {
      // 1. 获取屏幕高度
      this.getSysInfo()
      // 2. 获取商品分类列表
      this.getcateList()
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .cate-lv2-title{
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    .cate-lv3-list{
      display: flex;
      flex-wrap: wrap;
      .cate-lv3-item{
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        image{
          width: 60px;
          height: 60px;
        }
        text{
          font-size: 12px;
        }
      }
    }
  }
</style>
