/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-20 08:03:19 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-10-18 08:34:08
 */

/* 
模式概念 
*/

/* 介绍 */
// 一个对象有不同状态
// 不同状态执行不同逻辑
// 总不能用if else 所以就有了状态模式

/* 
 应用场景举例 - Promise
*/
console.log(`~*~*~*~*~*~*~*~*~*~*~~~~应用场景举例 - Promise//~*~*~*~*~*~*~*~*~*~*~`)
/* Promise类 */
class myPromise {
  constructor(bussnessFn) {
    console.log(`2--promise constructor`)
    this.state='pending'
    bussnessFn((data)=>{
      console.log(`6--resolve`)
      this.data = data
      promiseFsm.resolve(this)
    }, (msg)=>{
      console.log(`6--reject`)
      this.msg = msg
      promiseFsm.reject(this)
    })
  }

  

  then(succesFn, failFn) {
    console.log(`4--then`)
    this.succesFn = succesFn
    this.failFn = failFn
  } 
  //pending状态 执行bussnessFn
  //resolve状态 执行success
}

/* 有限状态机类 */
const StateMachine = require('javascript-state-machine');
let promiseFsm = new StateMachine({
  init: 'pending',
  transitions: [{
      name: 'resolve',
      from: 'pending',
      to: 'successed'
    },
    {
      name: 'reject',
      from: 'pending',
      to: 'failed'
    },
  ],
  methods: {
    // 执行成功
    onResolve(fsm, promise) {
      console.log('7--onResolve')
      promise.succesFn(promise.data)
    },
    // 执行失败
    onReject(fsm, promise) {
      console.log('7--onReject')
      promise.failFn(promise.data)
    }
  }
})


// 测试代码
function loadImg(url) {
  console.log(`1--loadImg`)
  const bussnessFn = (resolve, reject) => {
    console.log(`3--bussnessFn`)
    let img = document.createElement('img')
    img.src = url
    img.onload = () => {
      console.log(`5--onload`)
      //异步请求成功
      const data = {
        type: parseInt(Math.random() * 2),
        width: 500,
        height: 200
      }
      resolve(data)

    }
    img.onerror = (msg) => {
      console.log(`5--onload`)
      //异步请求失败
      reject(msg)

    }

    return promise
  }
  let promise = new myPromise(bussnessFn)
  return promise

}
const successFn = (successData) => {
  console.log(`8--then successFn`)
  console.log(successData)
}
const failFn = (failMsg) => {
  console.log(`8--then failFn`)
  console.log(failMsg)
}
loadImg('//www.baidu.com/img/dong_a16028f60eed614e4fa191786f32f417.gif').then(successFn, failFn)
loadImg('//www.baidu.com/img/dong_a16028f60eed614e4fa191786f32f417.gif').then(successFn, failFn)
loadImg('//www.baidu.com/img/dong_.gif').then(successFn, failFn)


