<template>
  <Header />
  <div class="app">
    <h2 class="title">Vue路由测试</h2>
    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/news" active-class="active">新闻</RouterLink>
      <RouterLink :to="{ path: '/about' }" active-class="active">关于</RouterLink>
      <!-- 用RouterLink替代a，to替换href，并且不能直接设置class，而是active-class -->
    </div>
    <!-- 展示区 -->
    <div class="main-content">
      <!-- 此处根据路径展示组件 -->
      <!-- 引入RouterView并占位 -->
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineOptions({ name: 'App' })

  import Header from '@/components/Header.vue'
  import { RouterView, RouterLink } from 'vue-router'
  /*
      路由 route
        路由就是一组key-value的对应关系，其中key为路径，value为组件
        当我们单页面开发的时候，点击按钮切换路径，路由器（router）匹配路由（route）规则，渲染对应的组件

      npm i vue-router 安装路由
        1.新建需要导航前往的页面
        2.创建router文件夹，新建index.ts文件，创建路由器并暴露
        3.在main.ts中引入路由器使用并挂载
        4.在App.vue中引入RouterView和RouterLink并使用
        
      注意：
        一般组件一般放在components;路由组件一般放在pages/views
          一般组件：手写出来的
            <Demo/>
          路由组件：靠路由规则渲染来的
            routes:[{path:'/demo',component:Demo}]
        通过点击导航，视觉上消失的组件被卸载了，需要再挂载(见About.vue)

      路由器的两种工作模式
        history（例如哔哩哔哩）
          优点：URL更加美观，不带#，更接近传统的网站URL
          缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有404错误
        hash
          优点：兼容性更好，因为不需要服务器端处理路径
          缺点：URL中带#，不够美观，且在SEO优化方面相对较差

        to的两种写法
          1.字符串写法：to='/home'
          2.对象写法（优先）
            1)path跳转 :to="{ path: '/home'}" 
            2)名字跳转 :to="{ name: 'home'}"

    */

</script>

<style>

  /* App */
  .title {
    text-align: center;
    /* 单词间距 */
    word-spacing: 5px;
    margin: 30px 0;
    height: 70px;
    line-height: 70px;
    background-image: linear-gradient(45deg, gray, white);
    border-radius: 10px;
    box-shadow: 0 0 2px;
    font-size: 30px;
  }

  .navigate {
    display: flex;
    justify-content: space-around;
    margin: 0 100px;
  }

  .navigate a {
    display: block;
    text-align: center;
    width: 90px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    /* 字母/字符间距 */
    letter-spacing: 5px;
  }

  .navigate a.active {
    background-color: #64967E;
    color: #ffc268;
    font-weight: 900;
    text-shadow: 0 0 1px black;
    font-family: 微软雅黑;
  }

  .main-content {
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
    width: 90%;
    height: 400px;
    border: 1px solid;
  }
</style>
