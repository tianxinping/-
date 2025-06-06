<template>
  <div class="person">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Person',
  setup() {
    // setup函数中的this是undefined，Vue3中已经弱化this了
    // 数据
    // 注意，此时的数据都不是响应式的
    let name = '张三'
    let age = 18
    let tel = '13888888888'

    // 方法
    function changeName() {
      name = 'zhang-san' // 注意：这样修改name页面没有变化
      console.log(name) // name确实改了，但不是响应式的
    }
    function changeAge() {
      age += 1
    }
    function showTel() {
      alert(tel)
    }

    // 返回给模板使用
    return { name, age, changeName, changeAge, showTel }
  },
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
