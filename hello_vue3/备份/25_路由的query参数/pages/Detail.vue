<template>
  <ul class="news-list">
    <li>编号：{{ query.id }}</li>
    <li>标题：{{ query.title }}</li>
    <li>内容：{{ query.content }}</li> <!-- 解构前 route.query.content -->
  </ul>
</template>

<script setup lang="ts">
  defineOptions({ name: 'About' })
  import { toRefs } from 'vue'
  import { useRoute } from 'vue-router'
  // use??? 是hooks的一种命名规范

  let route = useRoute()

  // 解构，可以不用写route.query.content了，简洁,toRefs保持响应式
  let { query } = toRefs(route)

</script>

<style scoped>
  .news-list {
    list-style: none;
    padding-left: 20px;
  }

  .news-list>li {
    line-height: 30px;
  }
</style>