<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="add">点我sum+1</button>
    <hr>
    <img v-for="(dog, index) in dogList" :src="dog" :key="index">
    <br>
    <button @click="getDog">再来一只小狗</button>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'Person' })
  /* 
    安装： npm i axios
  */
  import { ref, reactive } from 'vue'
  import axios from 'axios'

  let sum = ref(0)
  let dogList = reactive([
    'https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg'
  ])
  function add() {
    sum.value++
  }

  async function getDog() {
    try {
      let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
      console.log(result.data); // 拿到了
      dogList.push(result.data.message)
    }
    // try{} catch (error) {}处理异常
    catch (error) {
      console.log(error);

    }

  }
</script>
<!-- scoped 局部样式，这里的样式只有本页面能用， -->
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

  img {
    height: 100px;
    margin-right: 10px;
  }
</style>
