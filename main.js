import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 1. 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
// 请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 响应拦截器
$http.afterRequest = function(options) {
  uni.hideLoading()
}

// 2. 封装showMsg()方法
uni.$showMsg=function(title="数据加载失败！",duration=1500,icon="error"){
  uni.showToast({
    title,
    duration,
    icon
  })
}


App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
