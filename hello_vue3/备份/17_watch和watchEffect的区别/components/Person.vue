<template>
  <div class="person">
    <h3>当水温超过60度或者水位达到80cm时，发送请求</h3>
    <h2>当前水温：{{ temp }}度</h2>
    <h2>当前水位：{{ height }}cm</h2>
    <button @click="changeTemp">水温+1</button>
    <button @click="changeHeight">水位+10</button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Person' })

import { ref, watch, watchEffect } from 'vue'

let temp = ref(10)
let height = ref(0)

function changeTemp() {
  temp.value += 10
}
function changeHeight() {
  height.value += 10
}

// watch实现
/* watch([temp, height], (newVal) => {
  // 从newVal中拿到新的值
  const [newTemp, newHeight] = newVal

  if (newTemp > 60 || newHeight >= 80) {
    console.log('发送请求')
  }
}) */

// 如果需要监视的数据很多，就需要watchEffect了

/* 
  watchEffect 立即运行一个函数，同时响应式的追踪其依赖，并在依赖更改时重新执行该函数
  
  watch对比watchEffect
    都能监听响应式数据的变化，不同的是监听数据变化的方式不同
    watch 要明确指出监视的数据
    watchEffect 不用明确指出监视的数据（函数中用到哪些属性就监视哪些属性）
*/
watchEffect(() => {
  if (temp.value > 60 || height.value >= 80) {
    console.log('发送请求')
  }
})
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 1px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}

li {
  font-size: 20px;
}
</style>
