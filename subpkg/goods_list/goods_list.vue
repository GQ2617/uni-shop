<template>
	<view>
		<view class="goods-list">
		  <view class="goods-item" v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods)">
		    <!-- 左侧图片 -->
        <view class="goods-item-left">
          <image :src="goods.goods_small_logo || defaultPic"></image>
        </view>
        <!-- 右侧信息 -->
        <view class="goods-item-right">
          <!-- 标题 -->
          <view class="goods-name">{{goods.goods_name}}</view>
          <!-- 价格 -->
          <view class="goods-info-box">
            <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
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
				queryObj:{
          query:'',
          cid:'',
          pageNum:1,
          pageSize:10
        },
            defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        goodsList:[],
        total:0,
        isLoading:false
			};
		},
    // 过滤器
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    methods:{
      // 1. 获取商品列表数据
      async getGoodsList(cb){
        // 打开节流阀
        this.isLoading=true
        // 获取数据
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        if(res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
        // 获取成功后关闭下拉加载(按需)
        cb && cb()
        // 获取成功后关闭节流阀
        this.isLoading=false
      },
      // 2. 点击商品信息跳转至商品详情页
      gotoDetail(goods){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+goods.goods_id
        })
      }
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    onReachBottom() {
      // 判断是否还有数据
      if(this.queryObj.pageNum*this.queryObj.pageSize >= this.total) return uni.$showMsg('已经到底了')
      // 根据节流阀状态决定是否发起请求
      if(this.isLoading) return
      this.queryObj.pageNum += 1
      this.getGoodsList()
    },
    onPullDownRefresh(){
      // 重置关键数据
      this.queryObj.pageNum=1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      // 重新发起请求
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    }
	}
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #F0F0F0;
  .goods-item-left{
    margin-right: 5px;
    image{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-price{
      font-size: 16px;
      color: #C00000;
    }
  }
}
</style>
