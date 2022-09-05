<template>
	<view>
		<view class="goods-list">
		  <view v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods)">
		    <my-goods :goods="goods" :showRadio="false" :showNum="false"></my-goods>
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

</style>
