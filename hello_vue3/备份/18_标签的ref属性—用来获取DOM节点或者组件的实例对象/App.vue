<template>
  <Person ref="ren"/>
  <!-- 
      在组件上加ref=""，拿不到什么东西，被保护了
      除非组件内部加上 defineExpose({a,b,c})
   -->
  <button @click="showDOM">获取子组件的实例对象</button>

</template>
<script lang="ts" setup>
// JS/TS
defineOptions({ name: 'App' })
import Person from './components/Person.vue'
import {ref} from 'vue'

let ren = ref()

function showDOM(){
  console.log(ren.value)
}
</script>

<style></style>
