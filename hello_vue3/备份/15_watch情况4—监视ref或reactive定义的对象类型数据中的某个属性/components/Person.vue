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
    car2: '宝马'
  }
});

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
    car2: '红旗'
  }
}

//情况4: 情况1，监视响应式对象中的某个属性，且该属性是基本类型的要写成函数式

// 若只想监视基本类型数据，这样写是不对的
/* watch(person.name, (newValue,oldValue)=>{
  console.log('person变化了',newValue,oldValue)
}) */
// 应该用一个函数返回它,就可以可以监视到它，且newValue和oldValue值也是正确的
// watch(() => person.name, (newValue, oldValue) => {
//   console.log('name变化了', newValue, oldValue)
// })

// 情况2，监视响应式对象中的对象类型属性，建议直接写函数式，需要关注细节的时候再加deep:true
watch(()=>person.car,(newValue,oldValue)=>{
  console.log('car变化了',newValue,oldValue)
},{deep:true})

// 总结：监视的对象里的属性，直接加函数式，由于关注的对象的地址，需要watch细枝末节加深度监视
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
