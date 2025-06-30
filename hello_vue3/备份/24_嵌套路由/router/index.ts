//创建一个路由器并暴露

// 第一步：引入createRouter和createWebHistory工作模式
import { createRouter, createWebHistory } from 'vue-router'

// 引入组件
import Home from '@/pages/Home.vue'
import News from '@/pages/News.vue'
import About from '@/pages/About.vue'
import Detail from '@/pages/Detail.vue'

// 第二步：创建路由器router管理路由routes
const router = createRouter({
  history: createWebHistory(), // 路由器的工作模式
  // 一个个的路由
  routes: [
    {
      name: 'zhuye',
      path: '/home',
      component: Home,
    },
    {
      name: 'xinwen',
      path: '/news',
      component: News,
      children: [
        {
          path: 'detail',
          component: Detail,
        },
      ],
    },
    {
      name: 'guanyu',
      path: '/about',
      component: About,
    },
  ],
})

// 暴露router
export default router
