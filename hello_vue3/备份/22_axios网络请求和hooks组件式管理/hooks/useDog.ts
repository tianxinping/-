import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default function () {
  // export default 无名函数；或者 export 有名函数

  //数据
  let dogList = reactive(['https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg'])

  //方法
  async function getDog() {
    try {
      let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
      console.log(result.data.message) // 拿到了
      dogList.push(result.data.message)
    } catch (error) {
      // try{} catch (error) {}处理异常
      console.log(error)
    }
  }
  //也能使用生命周期钩子
  onMounted(() => {
    getDog()
  })
  //向外部提供对象
  return {
    dogList,
    getDog,
  }
}
