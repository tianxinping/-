<template>
  <div class="person">
    <h3>情况1: 监视【ref】定义的【基本类型】数据</h3>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Person' })
/* 
  watch
    监视数据变化
    vue3只能监视以下四种数据
      ref定义的数据 （不要.value）
      reactive定义的数据
      函数返回一个值（getter函数）
      一个包含上述内容的数组
*/
import { ref, watch } from 'vue'

let sum = ref(0)

function changeSum() {
  sum.value += 1
}
// 监视
// 情况1: 监视【ref】定义的【基本类型】数据
// watch(谁？, 回调函数) ;回调函数的参数：新值，旧值
// 注意：watch监视的值不写.value 因为监视的是值不是ref对象而是例如sum
/* 
watch(sum, (newValue, oldValue) => {
  console.log(newValue, oldValue)
}) 
  */
// 停止监视
const stopWatch = watch(sum, (newValue, oldValue) => {
  console.log(newValue, oldValue)
  if (newValue >= 10) {
    stopWatch() // 停止监视
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
