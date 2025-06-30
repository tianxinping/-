<template>
  <div class="news">
    <!-- 导航区 -->
    <ul>
      <li v-for="news in newsList" :key="news.id">
        <!-- 第一种复杂的写法，to的字符串写法：冒号+模版字符串+？+$+&链接符 -->
        <!-- <RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">{{ news.title }}</RouterLink> -->
        <!-- 第二种写法，to的对象写法 -->
        <RouterLink :to="{
          path: '/news/detail', // name: 'xiangqin'也能跳转
          query: {
            id: news.id, // 这里能用news.id，因为在v-for循环中
            title: news.title,
            content: news.content
          }
        }">{{ news.title }}</RouterLink>
      </li>
    </ul>
    <!-- 展示区 -->
    <div class="news-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup lang="ts">
  defineOptions({ name: 'About' })
  /* 
    query参数
  */
  import { reactive } from 'vue'
  import { RouterView, RouterLink } from 'vue-router'

  const newsList = reactive([
    { id: 'afdhj01', title: '新闻1', content: '新闻1的内容' },
    { id: 'afdhj02', title: '新闻2', content: '新闻2的内容' },
    { id: 'afdhj03', title: '新闻3', content: '新闻3的内容' },
    { id: 'afdhj04', title: '新闻4', content: '新闻4的内容' },
  ])
</script>

<style scoped>
  .news {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .news ul {
    margin-top: 30px;
    /* list-style: none; */
    padding-left: 10xp;
  }

  .news li::marker {
    color: #64967E;
  }

  .news li>a {
    font-size: 18px;
    line-height: 40px;
    text-decoration: none;
    color: #64967E;
    text-shadow: 0 0 1px rgb(0, 84, 0);
  }

  .news-content {
    width: 70%;
    height: 90%;
    border: 1px solid;
    margin-top: 20px;
    border-radius: 10px;
  }
</style>