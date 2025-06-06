<template>
  <div class="person">
    <h2>汽车信息：一辆{{ car.brand }}车，价值{{ car.prive }}万</h2>
    <button @click="changePrice">修改汽车的价格</button>
    <br>
    <hr>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="game in games" :key="game.id">{{ game.name }}</li>
    </ul>
    <button @click="changeFirstGame">修改第一个游戏的名字</button>
  </div>
</template>


<script lang="ts" setup>
defineOptions({
  name: 'Person'
})
import { ref } from 'vue'
// 数据
let car = ref({ brand: '奔驰', prive: 100 })
let games = ref([
  { id: 'aksjdfh01', name: '英雄联盟' },
  { id: 'aksjdfh02', name: '绝地求生' },
  { id: 'aksjdfh03', name: '王者荣耀' },
])
// ref:可以定义基本类型，对象类型数据,但要注意.value,对对象类型实现其底层还是reactive
// reactive:只可以定义对象类型数据


// 方法
function changePrice() {
  car.value.prive += 10
}
function changeFirstGame() {
  games.value[0].name = '原神'
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
