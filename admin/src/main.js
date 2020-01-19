import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './http'
import '../src/assets/style.css'
Vue.config.productionTip = false

Vue.prototype.$http = http

// Mixin允许你封装一块在应用的其他组件中都可以使用的函数。
Vue.mixin({
  computed: {
    //上传地址不用时时更新，用computed较好
    uploadUrl_mixin() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    //为了给上传图片添加表头，防止token验证,最好定方法，之前定属性没法时时更新
    getAuthHeaders_mixin() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
