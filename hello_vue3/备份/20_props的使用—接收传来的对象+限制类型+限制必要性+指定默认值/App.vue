<template>
  <Person a="haha" :list="personList" />
  <!-- vue2内容。不加冒号表示传递字符串,加了表示表达式，除了ref标识不用加冒号 -->
  <!-- <h2 a="1+1" :b="1 + 1" c="x" :d="x" ref="qwe">测试</h2> 运行结果：<h2 a="1+1" b="2" c="x" d="9">测试</h2> -->
</template>
<script lang="ts" setup>
// JS/TS
defineOptions({ name: 'App' })
import Person from './components/Person.vue'
import { reactive } from 'vue'
import { type Persons } from '@/types/index'

let x = 9
// reactive包裹的数据传递范型的方式
let personList = reactive<Persons>([
  { id: 'aksdfj01', name: '张三', age: 18 },
  { id: 'aksdfj02', name: '李四', age: 19 },
  { id: 'aksdfj03', name: '王五', age: 20, gender: '男' }, // 为他单独添加属性
])
</script>

<style></style>
