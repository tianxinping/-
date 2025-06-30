<template>
  <div class="header">
    <h2>大家好,我是一般组件</h2>
  </div>
</template>
<script setup lang="ts">
  defineOptions({ name: 'Header' })
</script>
<style scoped>
  .header {
    font-size: 18px;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    color: rgb(85, 84, 84);
  }


</style>