<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="add">点我sum+1</button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Person' })
import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'
/* 
  对生命周期的理解
    人的生命周期
      【时刻】    【要做的事】
       出生        哭
       经历        哭、笑
       死亡        遗嘱
    
    组件的生命周期 
      【时刻】    【要做的事-调用特定的函数】
       创建         created
       挂载         mounted
       更新
       销毁

*/

/* 
  Vue2的生命周期

    创建（创建前 beforeCreate，创建完成 created）
      创建前的钩子 beforeCreate(){};创建完毕的钩子 created(){}

    挂载（挂载前 beforeMount，挂载关闭 mounted）
      挂载前 created(){}; 挂载完毕的钩子 mounted(){}

    更新（更新完 beforeUpdate，更新完毕 updated）
      更新前 beforeUpdate(){}; 更新完毕的钩子 updated(){}

    销毁（销毁前 beforeDestroy，销毁完毕 destroyed）

*/

/* 
  Vue3的生命周期
    创建
      console.log('创建')
    挂载
      挂载前   挂载完毕（常用）

    更新
      更新前   更新完毕（常用）

    卸载
      卸载前（常用）   卸载完毕

*/
let sum = ref(0)
function add(){
  sum.value++
}

// 创建
  console.log("创建"); //合成了setup
// 挂载前
  onBeforeMount(()=>{
    console.log("挂载前");
  })
// 挂载完毕
  onMounted(()=>{
    console.log("子---挂载完毕"); // 子挂载顺序是快于父的
  })
// 更新
onBeforeUpdate(()=>{
  console.log("更新前");
})
// 更新完毕
onUpdated(()=>{
  console.log("更新完毕");
})
// 卸载前
onBeforeUnmount(()=>{
  console.log("卸载前");
})
// 卸载完毕
onUnmounted(()=>{
  console.log("卸载完毕");
})
// 卸载后
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
