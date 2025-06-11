<template>
  <div class="person">
    <h1>中国</h1>
    <h2 ref="title2">北京</h2>
    <h3>北京大学</h3>
    <button @click="showLog">点我输出h2元素</button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Person' })
import { ref,defineExpose } from 'vue' // define开头的可以不用引用

/* 
  标签的ref属性（类似于局部变量的意思）
    用在不同DOM上，获取DOM节点
    用在组件上，获取组件实例对象
      需要在组件内部引用，然后加上导出：defineExpose({})
*/

// 创建一个空的title2，用来存储ref标记的内容
// 这种方式不会造成干扰
let title2 = ref()

let a = ref(1)
defineExpose({ a })

function showLog() {
  // 注意这里最好不要用dom方式来实现，可能会打印其他页面的同名h2标签
  console.log(title2.value); 
  //<h2 data-v-4cadc14e>北京</h2> 多的东西时由于加了scoped局部样式
  
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
</style>
