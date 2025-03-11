// 1.变量
var num = 10
var myAge = 18
var num1 = 20
var myFriendAge = 25

// 2.数据类型
var myNum = 10 // number 数值类型
var myName = '田新平'
var myString = "文本" // string 字符串类型
var myBoolean = true // false boolean 布尔类型
var myNull = null // null 用于清空变量内容，空类型
var myUndefined = undefined // undefined 声明了变量但未赋值，未定义类型
console.log(typeof myNum) // 输出 number
console.log(typeof myUndefined)

//3.运算符
var sum = 1 - 2 * 3 % 4
console.log(sum)

var resultStr = 'Tuoby学' + 'JavaScript'
console.log(resultStr)

var isTure = 3 >= 2
console.log(isTure)

console.log(3 == '3') // 输出 true
//数学运算符比比较运算符优先级高

// 4.语句
// 判断语句if
if (2 > 11) {
    console.log('我不会执行')
}

/* if (false) {
 }else{
    console.log('我会执行')
} */

if (false) {
    console.log('我不会执行')
} else if (false) {
    console.log('我不会执行')
} else {
    console.log('我会执行')
}

//循环语句for 得到一到一百的和
var sum = 0
for (var i = 1; i <= 100; i++) {
    // sum = sum + i 简化为
    sum += i
}
console.log(sum)

//和for结合得到一到一百的偶数和
var sum1 = 0
for (var i = 1; i <= 100; i++) {
    if (i % 2 === 0) { //!== 可以求奇数
        sum1 += i
    }
}
console.log(sum1)

// 5.函数
    /* 函数内外变量隔绝，有作用域，可以重名，如果想被外部接受
    需要用return空格加值 返回调用 */
    /* 函数调用时可以传入不同的参数来参加函数内代码的执行
    这两个数是变量，可以自定义，把他放到需要变化的值 */
function getSum (start, end){
    console.log('函数执行了')
    var sum = 0
    for (var i = start; i <= end; i++) {
        sum += i
    }
    return sum //写在return后的都不执行
}

//getSum()  调用函数
var result1 = getSum(1, 100) // 计算1-100的和 
console.log(result1) 

var result2 = getSum(200, 300) // 计算200-300的和
console.log(result2) 

//还是计算奇偶和
function getSumWithCondition (start, end, fn) {
    var sum = 0
    for (var i = start; i <= end; i++) {
        if (fn(i)) {
            sum += i
        }
    }
    return sum
}
var result = getSumWithCondition(1, 100, function (n) {
    if (n % 2 === 0){ // !== 奇数和
        return true
    }
    return  false
})
console.log(result)

// 数组
var myArr = [10, 20, 30, 40, 50]
console.log(myArr.length) // 数组长度，表示存储了5个值
console.log(myArr) // 查看数组及索引关系
console.log(myArr[0]) // 数组下标，表示第一个值
console.log(myArr[1]) // 数组下标，表示第二个值
console.log(myArr[myArr.length - 1]) // 数组下标，表示最后一个值

myArr.push(100)// 数组末尾添加一个值
myArr.unshift(200)// 数组开头添加一个值
console.log(myArr) 

var sum = 0
for (var i = 0; i < myArr.length; i++){ // 获取索引i，myArr.length表示数组长度
    sum += myArr[i]  //对数组求和，myArr[i]表示数组内部的值
    console.log(i, myArr[i])
}
console.log(sum)

myArr.forEach(function (item, index){ // 输出数组和索引，语义相比于for循环语义更强
    console.log(item, index)
})

// 7.对象
var obj = {
    name: '张三',
    age: 18
}
console.log(obj) // 输出整个对象
console.log(obj.name) // 获取name属性

//遍历
for (var key in obj) {
    console.log(key, obj[key]) // 输出key和对应的值,固定规则
}