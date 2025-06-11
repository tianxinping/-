<template>
  <div class="person">
    <h3>情况3: 监视【reactive】定义的【对象类型】数据</h3>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改人</button>
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
/*
  watch第一个参数：被监视的数据
  第二个参数：监视的回调
  第三个参数：配置对象（deep,immediate等）
*/
import { reactive, watch } from 'vue'

let person = reactive({
  name: '张三',
  age: 18,
})

function changeName() {
  person.name += '~'
}
function changeAge() {
  person.age += 1
}
function changePerson() {
  // person = { name: 'lisi', age: 20 } 在reactive中不能直接修改全部对象
  Object.assign(person,{ name: 'lisi', age: 20 })
}

/* 
  情况3: 监视【reactive】定义的【对象类型】数据
    默认开启深度监视
    newValue, oldValue还是一样的，地址值没变
*/
watch(person, (newValue, oldValue) => {
  console.log('person变化了', newValue, oldValue)
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
