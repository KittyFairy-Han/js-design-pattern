/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-20 08:03:19 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-09-30 07:20:43
 */

/* 
模式概念 
*/

/* 介绍 */
// 一个对象有不同状态
// 不同状态执行不同逻辑
// 总不能用if else 所以就有了状态模式


/* 使用 */
/* class(主体) */
class Context {
  constructor() {
    this.state = null
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
  }

}


/* 状态 */
class State {
  constructor(color) {
    this.color = color
  }
  handle(context) {
    console.log(`turn to ${this.color} light`)
    context.setState(this)
  }
}

/* 测试代码 */
let context = new Context()

let green = new State('green')
let red = new State('red')
let yellow = new State('yellow')

green.handle(context)
console.log(context.getState())
yellow.handle(context)
red.handle(context)


/* 
 应用场景举例 - 有限状态机
*/
console.log(`~*~*~*~*~*~*~*~*~*~*~~~~应用场景举例 - 有限状态机//~*~*~*~*~*~*~*~*~*~*~`)


/* 主体 */
class UpdateDom {
  constructor() {
    this.state = ''
  }
  showState() {
    return this.state
  }
  setState(state) {
    console.log(state)
    // console.log(this)
    this.state = state
    this.showState()
  }
}
let updateDom = new UpdateDom()
/* 状态机类 */
const StateMachine = require('javascript-state-machine');
let fsm = new StateMachine({
  init: '取消收藏',
  // 状态集合
  transitions: [{
      name: 'doStore',
      from: '取消收藏',
      to: '收藏'
    },
    {
      name: 'deleteStore',
      from: '收藏',
      to: '取消收藏'
    },
  ],
  methods: {
    // 执行收藏 <=> [状态过渡].handle([主体])
    onDoStore(self, updateDom) {
      // 主体接下来的业务逻辑
      // console.log(this, updateDom)
      updateDom.setState(this.state)
      $('#app #part1').text(`现在的状态是：${this.state}`)
      $('#app #part1').css({
        backgroundColor: this.state === '收藏' ? 'red' : 'grey'
      })
    },
    // 取消收藏 <=> [状态过渡].handle([主体])
    onDeleteStore(self, updateDom) {
      // 主体接下来的业务逻辑
      // console.log(this, updateDom)
      updateDom.setState(this.state)
      $('#app #part1').text(`现在的状态是：${this.state}`)
      $('#app #part1').css({
        backgroundColor: this.state === '收藏' ? 'red' : 'grey'
      })
    }
  }
})

/* 测试 */
$('#app').click(() => {
  if (fsm.is('收藏')) {
    // 【状态机】.【状态过渡】 <=> [某一状态过渡].handle([主体])
    fsm.deleteStore(updateDom)
  } else {
    // 【状态机】.【状态过渡】 <=> [某一状态过渡].handle([主体])
    fsm.doStore(updateDom)
  }
})

/* 
 应用场景举例 - Promise
*/
console.log(`~*~*~*~*~*~*~*~*~*~*~~~~应用场景举例 - Promise//~*~*~*~*~*~*~*~*~*~*~`)

/* Promise类 */
class myPromise {
  constructor(bussnessFn) {
    
    bussnessFn(this.resolve, this.reject)
  }

  setState(state) {
    this.state = state
  }

  resolve(data) {
    console.log(this)
    promise.data = data
    fsm1.resolve(this)
  }

  reject(errorInfo){
    promise.errorInfo = errorInfo
    fsm1.reject(this)
  }

  then(succesFn, failFn) {
    promise.succesFn = succesFn
    this.failFn = failFn
  }

  catch(errorFn){
    promise.errorFn = errorFn
  }
  //pending状态 执行bussnessFn
  //resolve状态 执行
}

/* 有限状态机类 */
let fsm1 = new StateMachine({
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
      alert('onResolve------')
      promise.setState(fsm.to)
      if(promise.data.type){
         promise.succesFn(promise.data)
      }else{
         promise.failFn(promise.data)
      } 
    },
    // 执行失败
    onReject(fsm, promise) {
      alert('onReject-------')
      promise.setState(fsm.to)
      promise.errorFn(promise.errorInfo)
    }
  }
})

let promise
// 测试代码
function loadImg(url) {
  const bussnessFn = (resolve, reject) => {
    let img = document.createElement('img')
    img.src = url
    img.onload = () => {
      //异步请求成功
      const data = {
        type:parseInt(Math.random()*2),
        width:500,
        height:200
      }
      resolve(data)
      
    }
    img.onerror = () => {
      //异步请求失败
      reject()
      
    }

    return promise
  }
  promise = new myPromise(bussnessFn)
  return promise

}
loadImg('//www.baidu.com/img/dong_a16028f60eed614e4fa191786f32f417.gif').then(successFn, failFn)
const successFn = (successData) => {
   console.log(successData)
}
const failFn = (failData) => {
  console.log(failData)
}
loadImg('//www.baidu.com/img/dong_a16028f60eed614e4fa191786f32f417.gif').catch(errorFn)
const errorFn = (errorInfo) => {
  console.log(errorInfo)
}