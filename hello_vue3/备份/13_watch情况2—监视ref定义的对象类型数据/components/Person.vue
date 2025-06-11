<template>
  <div class="person">
    <h3>情况2: 监视【ref】定义的【对象类型】数据</h3>
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
import { ref, watch } from 'vue'

let person = ref({
  name: '张三',
  age: 18,
})

function changeName() {
  person.value.name += '~'
}
function changeAge() {
  person.value.age += 1
}
function changePerson() {
  person.value = { name: 'lisi', age: 20 }
}
// watch
// 情况2: 监视的是 ref 定义的 对象类型 数据，
// 监视的对象的地址值（person存的是对象引用地址），若要监视对象内部属性的变化，需要手动开启第三个参数
/* 
  watch(person,(newValue,oldValue)=>{
    console.log('person变化了'+newValue,oldValue)
  }) 
*/

// {deep: true} 深度监视;immediate: true 立即监视:不加只有符合要求才执行回调函数，加了初始化时立即执行一次回调函数
watch(person, (newValue, oldValue) => {
  console.log('person变化了', newValue, oldValue)
  /* 
    注意：若修改的是对象中的属性，newValue和oldValue都是新值，因为是同一个对象
         一般工作中只接受一个value值，表示新值
  */
},
  { deep: true },
)

/* 
  watch第一个参数：被监视的数据
  第二个参数：监视的回调
  第三个参数：配置对象（deep,immediate等）
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
