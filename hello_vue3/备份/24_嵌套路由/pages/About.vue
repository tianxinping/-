<template>
  <div class="about">
    <h2>大家好</h2>
  </div>
</template>
<script setup lang="ts">
  defineOptions({ name: 'About' })
  import { onMounted, onUnmounted } from 'vue'

  // 挂载完毕
  onMounted(() => {
    console.log('about 挂载完毕');

  })
  // 卸载完毕
  onUnmounted(() => {
    console.log('about 卸载完毕');
  })
</script>
<style scoped>
  .about {
    font-size: 18px;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    color: rgb(85, 84, 84);
  }


</style>