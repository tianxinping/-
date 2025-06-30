<template>
  <div class="news">
    <ul>
      <li><a href="#">新闻1</a></li>
      <li><a href="#">新闻2</a></li>
      <li><a href="#">新闻3</a></li>
      <li><a href="#">新闻4</a></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  defineOptions({ name: 'About' })
</script>
<style scoped>
  .news {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  ul {
    margin-top: 30px;
    list-style: none;
    padding-left: 10xp;
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