import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {
        path:'/',
        redirect:'/home'
      },
      {
        path:'/home',
        name:'home',
        component:()=>import ('views/Home.vue')
      },
      {
        path:'/articles/:id',
        name:'article',
        component:()=>import ('views/Article.vue'),
        props:true
      }
  ]
  },
  {
    path:"/heroes/:id",
    name:'hero',
    component:()=>import('views/Hero.vue'),
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
