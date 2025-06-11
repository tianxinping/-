<template>
  <div class="person">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}，{{ nl }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>


<script lang="ts" setup>
defineOptions({ name: 'Person' })

import { reactive, toRefs, toRef } from 'vue'

// 数据
let person = reactive({
  name: '张三',
  age: 18
})

/* 
  如果想要对数据解构赋值，拿出来并且保持响应式
    解构赋值，引入toRefs，name和age变成了ref对象
    toRefs: 将响应式对象中的所有属性都转成ref对象
      注意： 仅对响应式对象有效：toRefs 只对 reactive 创建的对象有效，对普通对象或 ref 无效。
            浅层转换：toRefs 是浅层的，只会为第一层属性创建 ref。嵌套对象需要递归处理。
            与 toRef 的混用：如果需要为可能不存在的属性创建 ref，使用 toRef。
*/
// let {name,age} = person // 如果这样写，name和age结构变成了普通对象，不是响应式对象了

let { name, age } = toRefs(person)
// toRefs接收由reactive所定义的响应式对象，
// 并且把响应式对象里的每一组key.value都拿出来成为新的对象
// 新的对象的值来自于reactive里面的

let nl = toRef(person, 'age') // 了解，如果需要为可能不存在的属性创建 ref，使用 toRef。

// 方法
function changeName() {
  name.value += '~'
}

function changeAge() {
  age.value += 1
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

li {
  font-size: 20px;
}
</style>
