<template>
  <div class="person">
    姓：<input type="text" v-model="firstName"> <br>
    <!-- v-bind 渲染，简写: ;v-model 双向绑定 -->
    名：<input type="text" v-model="lastName"> <br>
    <button @click="changeFullName">将全名改为li-si</button> <br>
    全名：<span>{{ fullName }}</span> <br>
    全名：<span>{{ fullName }}</span> <br>
    全名：<span>{{ fullName }}</span>
  </div>
</template>


<script lang="ts" setup>
defineOptions({ name: 'Person' })

import { ref, computed } from 'vue'

// 数据
let firstName = ref('张')
let lastName = ref('三')

// 方法
// 这么定义的fullName是一个计算属性，且只读
// let fullName = computed(() => {
//   return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
//   // 截取第一个字母变成大写
// })

// 这么定义的fullName是一个计算属性，可读可写
let fullName = computed({
  get() {
    return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
  },
  set(val) {
    const [str1, str2] = val.split('-')
    firstName.value = str1
    lastName.value = str2
  }
})

function changeFullName() {
  fullName.value = 'li-si'
}



/* 
  computed计算属性是有缓存的，只有当它依赖的属性发生变化时才会重新计算
  方法没有缓存，用几次调用几次
*/

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
