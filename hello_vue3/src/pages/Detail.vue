<template>
  <ul class="news-list">
    <li>编号：{{ route.params.id }}</li>
    <li>标题：{{ route.params.title }}</li>
    <li>内容：{{ route.params.content }}</li> <!-- 解构前 route.query.content -->
  </ul>
</template>

<script setup lang="ts">
  defineOptions({ name: 'About' })

  import { useRoute } from 'vue-router'
  const route = useRoute()

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