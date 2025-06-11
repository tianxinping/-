<template>
  <div class="person">
    <ul>
      <li v-for="personItem in list" :key="personItem.id">
        <!-- key 唯一标识，不加会用索引值作为key -->
        {{ personItem.name }} -- {{ personItem.age }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Person' })

import { defineProps, withDefaults } from 'vue' //definePros是宏函数，不用引用，define开头的一般是
import { type Persons } from '@/types'

//接收list，只单纯接收会出问题，例如list传5的错误
// defineProps(['list'])

//接收list，保存起来,为了防止传错，需要定义类型
// let x = defineProps<{ list: Persons }>()

//接收list，限制类型，限制必要性
// let x = defineProps<{list?:Persons}>()

//接收list，限制类型，限制必要性，指定默认值
let x = withDefaults(defineProps<{ list?: Persons }>(), {
  list: () => [{ id: 'ajdhfsa01', name: '康师傅·红烧牛肉面', age: 88 }],
})

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
