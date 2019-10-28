/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-20 08:03:19 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-10-28 23:01:41
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
        console.log(`2--promise constructor`)
        this.state = 'pending'
        bussnessFn((data) => {
            console.log(`6--resolve`)
            this.data = data
            promiseFsm.resolve(this)
        }, (msg) => {
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
// const StateMachine = require('javascript-state-machine')
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
// loadImg('//www.baidu.com/img/dong_a16028f60eed614e4fa191786f32f417.gif').then(successFn, failFn)
// loadImg('//www.baidu.com/img/dong_.gif').then(successFn, failFn)