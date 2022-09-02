<template>
	<view>
    <!-- 搜索框 -->
	  <view class="search-box">
	  	<uni-search-bar :radius="100" cancelButton="none" @input="input"></uni-search-bar>
	  </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-if="searchResults.length == 0">
      <!-- 标题 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表 -->
      <view class="history-list">
        <uni-tag v-for="(history,index) in historyList" :key="index" :text="history" @click="gotoGoodsList(history)"></uni-tag>
      </view>
    </view>
    <!-- 搜索建议 -->
	  <view class="sugg-list" v-else>
	    <view class="sugg-item" v-for="(sugg,index) in searchResults" :key="index" @click="gotoDetail(sugg.goods_id)">
	      <view class="goods-name">{{sugg.goods_name}}</view>
	      <uni-icons type="arrowright" size="16"></uni-icons>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
        keywords:'',
        searchResults:[],
        historyList:['a','app','ass']
			};
		},
    methods:{
      // 1. 获取输入框内容,并做防抖处理
      input(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.keywords = e.value
          this.getSearchResult()
        },500)
      },
      // 2. 根据输入内容获取相应数据
      async getSearchResult(){
        if(this.keywords===''){
          this.searchResults=[]
          return
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keywords})
        if(res.meta.status!==200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveSearchHistory()
      },
      // 3. 点击跳转商品详情页
      gotoDetail(goods_id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
        })
      },
      // 4. 存储历史搜索
      saveSearchHistory(){
        // const set = new Set(this.historyList)
        // set.delete(this.keywords)
        // set.add(this.keywords)
        // this.historyList=Array.from(set)
        
        this.historyList.unshift(this.keywords)
        this.historyList = this.historyList.filter((item,index)=>{
          return this.historyList.indexOf(item) === index
        })
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      // 5. 清空历史搜索
      cleanHistory(){
        this.historyList=[]
        uni.setStorageSync('kw','[]')
      },
      // 6. 点击历史记录跳转到商品列表页
      gotoGoodsList(history){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?goods_id='+history
        })
      }
    },
    onLoad(){
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    }
	}
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top:0;
  z-index: 999;
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box{
  padding: 0 5px;
  .history-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    
    .uni-tag{
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
