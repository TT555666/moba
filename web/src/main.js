import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'assets/scss/style.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
import 'assets/iconfont/iconfont.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.component('tt-card',Card)
Vue.component('tt-list-card',ListCard)
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
