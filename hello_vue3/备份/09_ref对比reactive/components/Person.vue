<template>
  <div class="person">
    <h2>汽车信息：一辆{{ car.brand }}车，价值{{ car.prive }}万</h2>
    <button @click="changePrice">修改汽车的价格</button>
    <button @click="changeCar">修改汽车</button>
    <hr>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我+1</button>
  </div>
</template>


<script lang="ts" setup>
defineOptions({
  name: 'Person'
})
import { ref, reactive } from 'vue'
// 数据
// let car = reactive({ brand: '奔驰', prive: 100 })
let car = ref({ brand: '奔驰', prive: 100 })
let sum = ref(0)

// 方法
function changePrice() {
  // car.prive += 10
  car.value.prive += 10
}
function changeCar() {

  // reavtive整体修改
  // car = { brand: '宝马', prive: 200 } // reactive不能直接重新分配一个对象，会成普通数据,页面不更新
  // car = reactive({ brand: '宝马', prive: 200 }) 也不能这样写，car不是同一个数据，链接断开了，页面不更新

  // Object.assign(car, { brand: '宝马', prive: 200 }) // 只可以这样写，reactive可以重新分配一个对象，页面更新

  //ref整体修改
  car.value = { brand: '宝马', prive: 200 } // 动了value就是响应式数据

  /* 
    使用原则
      若需要基本类型的响应数据，必须ref
      若需要响应式对象，层级不深，ref，reactive都可以
      若需要响应式对象，层级很深，推荐reactive

      不必过于纠结，ref一把梭也可以，表单多的情况下会出现很多.value
  */

}
function changeSum() {
  sum.value += 1
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
