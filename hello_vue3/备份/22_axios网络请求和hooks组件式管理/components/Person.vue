<template>
  <div class="person">
    <h2>当前求和为：{{ sum }},放大10倍后；{{ bigSum }}</h2>
    <button @click="add">点我sum+1</button>
    <hr>
    <img v-for="(dog, index) in dogList" :src="dog" :key="index">
    <!-- 
      遍历
        v-for：Vue 的循环指令，用于遍历数组或对象。
        :src：动态绑定图片的源地址（dog 为数组中的图片 URL）。
          :src="dog"：等价于 src="{{ dog }}"
        :key：为每个循环项指定唯一标识（index 为数组索引）。
     -->
    <br>
    <button @click="getDog">再来一只小狗</button>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'Person' })
  /*
    安装： npm i axios
      作用：网络请求，发送 HTTP 请求的库
      
      axios.get() 发送请求

      async function getDog(){
        let result = await axios.get('地址')
        dogList.push(result.data.message)
      }
  */

  // 引入hook 组合式 集中管理数据和方法
  import useSum from '@/hooks/useSum'
  import useDog from '@/hooks/useDog'

  const { sum, add, bigSum } = useSum()
  const { dogList, getDog } = useDog()
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

  img {
    height: 100px;
    margin-right: 10px;
  }
</style>
