export default {
  namespaced: true,
  state: {
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  },
  actions: {},
  mutations: {
    // 添加至购物车
    addToCart(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('cart/saveToStorage')
    },
    // 修改商品选中状态
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('cart/saveToStorage')
      }
    },
    // 修改购物车商品数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('cart/saveToStorage')
      }
    },
    // 删除商品
    removeGoodsById(state, goods) {
      state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)
      this.commit('cart/saveToStorage')
    },
    // 全选/反选
    updateAllGoodsState(state,newState){
      state.cart.forEach(item=>item.goods_state = newState)
      this.commit('cart/saveToStorage')
    },
    // 持久化存储
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }
  },
  getters: {
    // 计算购物车中商品总数量
    total(state) {
      let count = 0
      state.cart.forEach(item => count += item.goods_count)
      return count
    },
    // 计算选中商品总数量
    checkedCount(state) {
      return state.cart.filter(item => item.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 选中商品总价格
    checkedAmount(state){
      return state.cart.filter(item=>item.goods_state)
                       .reduce((total,item)=>total+=item.goods_count*item.goods_price,0)
                       .toFixed(2)
    }
  }
}
