import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

// 首页
const Index = r => require.ensure([], () => r(require('@/pages/Index/Index.vue')), 'Index')

// 路由配置
var router = new Router({
  // 哈希模式
  mode: 'hash',
  // 路由导航
  routes: [
    // 首页 > 重定向 > 首页
    { path: '/', redirect: '/Index' },
    // 首页
    { path: '/Index', name: 'Index', meta: { title: '首页' }, component: Index },
    
  ]
})


// 全局路由钩子
router.afterEach((to, from) => {

})

router.beforeEach((to, from, next) => {
    // 放行页面
    next()
})

export default router