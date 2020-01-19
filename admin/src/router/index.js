import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/Login.vue'),
    //官网：路由任意Route属性，现在任意的 route 属性必须在新 meta 属性的作用域内，以避免和以后的新特性发生冲突。
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/list', name: 'categoryList', component: () => import('views/category/CategoryList.vue') },
      { path: '/categories/create', name: 'categoryEdit', component: () => import('views/category/CategoryEdit.vue') },
      //props是代表把:id的数据注入到CategoryEdit中,CategoryEdit就可以使用id值来进行判断了.
      { path: '/categories/edit/:id', name: 'categoryEdit', component: () => import('views/category/CategoryEdit.vue'), props: true },

      { path: '/ads/list', name: 'adList', component: () => import('views/ad/AdList.vue') },
      { path: '/ads/create', name: 'adEdit', component: () => import('views/ad/AdEdit.vue') },
      { path: '/ads/edit/:id', name: 'adEdit', component: () => import('views/ad/AdEdit.vue'), props: true },

      { path: '/articles/list', name: 'articlesList', component: () => import('views/article/ArticleList.vue') },
      { path: '/articles/create', name: 'articlesEdit', component: () => import('views/article/ArticleEdit.vue') },
      { path: '/articles/edit/:id', name: 'articlesEdit', component: () => import('views/article/ArticleEdit.vue'), props: true },

      { path: '/admins/list', name: 'adminsList', component: () => import('views/admin/AdminList.vue') },
      { path: '/admins/create', name: 'adminsEdit', component: () => import('views/admin/AdminEdit.vue') },
      { path: '/admins/edit/:id', name: 'adminsEdit', component: () => import('views/admin/AdminEdit.vue'), props: true },

      { path: '/items/list', name: 'itemsList', component: () => import('views/item/ItemList.vue') },
      { path: '/items/create', name: 'itemsEdit', component: () => import('views/item/ItemEdit.vue') },
      { path: '/items/edit/:id', name: 'itemsEdit', component: () => import('views/item/ItemEdit.vue'), props: true },

      { path: '/heroes/list', name: 'heroesList', component: () => import('views/hero/HeroList.vue') },
      { path: '/heroes/create', name: 'heroesEdit', component: () => import('views/hero/HeroEdit.vue') },
      { path: '/heroes/edit/:id', name: 'heroesEdit', component: () => import('views/hero/HeroEdit.vue'), props: true },
    ]
  }

]

const router = new VueRouter({
  routes
})
//导航守卫
router.beforeEach((to,from,next) => {
  //如果不是免登陆且不存在token 就要去登陆界面
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router
