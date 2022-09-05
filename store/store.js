import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex
Vue.use(Vuex)

// 引入小仓库
import cart from './cart.js'
import user from './user.js'

// 创建实例
const store = new Vuex.Store({
  modules:{
    cart,
    user,
  }
})

export default store