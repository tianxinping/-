<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h2>地址：{{ address }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>


<script lang="ts" setup>
defineOptions({
  name: 'Person'
})
// ref创建基本类型的响应式数据
// 想要哪个数据是响应式的就用ref包一下,变成了实例对象,
// 在script中要使用它必须.value，但模版中不用，会自动加
import { ref } from 'vue'

let name = ref('张三')
let age = ref(18) // 后面两个数据没变化不需要ref()
let tel = '13888888888'
let address = '北京市海淀区'

// 方法
function changeName() {
  name.value = 'zhang-san' // 注意：这样修改name页面没有变化
  console.log(name.value) // name确实改了，但不是响应式的
}
function changeAge() {
  age.value += 1
}
function showTel() {
  alert(tel)
}
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
</style>
