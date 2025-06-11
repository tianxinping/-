<template>
  <div class="person"></div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Person' })

import { type PersonInter,type Persons } from '@/types' // 这里的PersonInter是一种规范，需要加上type来引用

// 为Person添加规范
// let person: PersonInter = { id: 'djsalfdks01', name: '张三', age: 20 }

// 为数组添加规范
// let personList:Array<PersonInter> = [
let personList:Persons = [ //简化代码量
  { id: 'djsalfdks01', name: '张三', age: 20 },
  { id: 'djsalfdks02', name: '李四', age: 21 },
  { id: 'djsalfdks03', name: '王五', age: 22 }
]


</script>
<!-- scoped 局部样式，这里的样式只有本页面能用， -->
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
