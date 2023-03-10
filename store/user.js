export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: {
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  },

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      this.commit('user/saveAddressToStorage')
    },
    // 持久化存储
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },

  // 数据包装器
  getters: {},
}