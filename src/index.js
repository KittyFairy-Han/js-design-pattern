/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-20 08:03:19 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-09-25 08:17:29
 */

/* 
模式概念 
*/

/* 介绍 */
// 顺序访问一个集合
// 使用者无需知道集合内部的结构（封装）
// nodeList 和 JQList 都不是数组,所以不能用 forEach 去遍历。由此可见遍历三个数据结构要用到三种不同的方法。
// 写一个方法 myEach 满足三种数据结构的遍历,这个方法就是一个迭代器的作用
let array = [1, 2, 3]
let nodeList = document.getElementsByTagName('div')
let $divList = $('div')

// 遍历数组
array.forEach((item) => {
  // console.log(item)
})

// 遍历 nodeList 对象
for (let i = 0; i < nodeList.length; i++) {
  // console.log(nodeList[i])
}

// 遍历 jq对象 列表
$divList.each((key, item) => {
  // console.log(key, item)
})

// nodeList 和 JQList 都不是数组,所以不能用 forEach 去遍历。由此可见遍历三个数据结构要用到三种不同的方法。
// 写一个方法 myEach 满足三种数据结构的遍历,这个方法就是一个迭代器
function myEach() {

}

/* 使用 */
/* class */
class Container {
  constructor(list) {
    this.list = list
  }
  getIterator() {
    return new Iterator(this)
  }
}


/* 迭代器 */
class Iterator {
  constructor(container) {
    this.list = container.list
    this.index = 0
  }
  next() {
    if (!this.hasNext()) {
      return null
    }
    return this.list[this.index++]
  }
  hasNext() {
    if (this.index >= this.list.length) {
      return false
    }
    return true
  }
}

/* 测试代码 */
let container = new Container([1, 2, 3, 4, 5, 6, 7])
let iterator = container.getIterator()
if (iterator.hasNext()) {
  console.log(iterator.next())
}

/* 
 应用场景举例 - jq myEach
*/


/* 
 应用场景举例 - es6 iterator
*/
// why
// es6语法中，有多种数据结构都是有序的数据集合，不仅仅是数组还有 Map Set String arguments NodeList等
// 有序的数据集合都是可遍历的，但是由于不是数组，并不能用foreach，所以Iterator出现，为所有可遍历的数据集合提供统一的接口
// how
// 以上数据类型都有[Symbol.iterator]属性
// 属性是个函数，执行函数返回一个迭代器
// 迭代器有next方法 可顺序迭代子元素 
// 可运行Array.prototype[Symbol.iterator]来测试

/* 封装一个遍历方法 */
console.log(`~*~*~*~*~*~*~*~*~*~*~~~~应用场景举例 - es6 iterator - Symbol.iterator//~*~*~*~*~*~*~*~*~*~*~`)

function myEach(data) {
  let iterator = data[Symbol.iterator]()
  let isDone = false
  while (!isDone) {
    const step = iterator.next()
    console.log(step)
    isDone = step.done
    const item = step.value
    item && console.log(item)
  }
}
/* 测试 */
let arr = [1, 2, 3]
let divList = document.getElementsByTagName('div')
myEach(arr)
// myEach(divList)

/* 结合 for of 语法封装一个遍历方法 */
console.log(`~*~*~*~*~*~*~*~*~*~*~~~~应用场景举例 - es6 iterator - for of//~*~*~*~*~*~*~*~*~*~*~`)

function myEach2(data) {
  for (let item of data) {
    console.log(item)
  }
}

/* 测试 */
myEach2(arr)
myEach2(divList)
