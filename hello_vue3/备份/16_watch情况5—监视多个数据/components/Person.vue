<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.car1 }}、{{ person.car.car2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeCar1">修改车1</button>
    <button @click="changeCar2">修改车2</button>
    <button @click="changeAllCar">修改所有车</button>
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
      函数返回一个值（getter函数）-- 代码中提及
        如果属性值不是对象类型，需要写成函数形式
      一个包含上述内容的数组

  watch的参数
    参数1：被监视的数据
    参数2：监视的回调
    参数3：配置对象（deep,immediate等）
*/
import { reactive, watch } from 'vue'

let person = reactive({
  name: '张三',
  age: 18,
  car: {
    car1: '奔驰',
    car2: '宝马',
  },
})

function changeName() {
  person.name += '~'
}

function changeAge() {
  person.age++
}

function changeCar1() {
  person.car.car1 = '奥迪'
}

function changeCar2() {
  person.car.car2 = '大众'
}

function changeAllCar() {
  // 对象里面的对象可以直接修改，不需要ref的.vuale或者reactive的Object.assign
  person.car = {
    car1: 'su7',
    car2: '红旗',
  }
}

// 情况5，监视多个数据
// 监视name和第一台车
watch(
  // [()=> person.name,person.car], 也是可以的
  [() => person.name, () => person.car.car1],
  (newValue, oldValue) => {
    console.log('car变化了', newValue, oldValue)
  },
  { deep: true },
)
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
