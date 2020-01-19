import axios from 'axios'
import Vue from 'vue'
import router from './router'
//axios创建连接
const http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/admin/api'
  // baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(config => {
  // 请求头传入认证  Bearer是行业规范 Authorization前端这个是大写，后端是小写会自动对应
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token || ''
  }
  return config
}, error => {
  return Promise.reject(error);
})
// axios可以设置拦截器，可以用来设置返回后端错误提示
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    //给Vue实例设置当错误弹出的信息
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  //如果出现401（没有token的情况）就返回登陆界面
  // 这里用Vue.prototype.$router 不能跳转？？
  if (err.response.status === 401) {
    router.push('/login')
  }
})
export default http