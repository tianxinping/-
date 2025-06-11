<template>
  <Person v-if="isShow"/>
  <!-- v-if 执行一个判断，结果为false不加载 -->
  <!-- v-show 可以隐藏组件，但是结构还在且未销毁 -->
</template>
<script lang="ts" setup>
// JS/TS
defineOptions({ name: 'App' })
import Person from './components/Person.vue'
import { ref,onMounted } from 'vue'

let isShow = ref(true)
onMounted(()=>{
  console.log("App.vue --- 挂载完毕");
  // 父组件的钩子都是在子组件的钩子之后执行
  // App永远是最后挂载的
})

</script>

<style></style>
