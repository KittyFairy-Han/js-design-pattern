/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-20 08:03:19 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-10-23 07:59:53
 */

/* 
模式概念 
*/
console.log(`~*~*~*~*~*~*~*~*~*~*~~~~概念 - 观察者模式//~*~*~*~*~*~*~*~*~*~*~`)
/* 介绍 */
// 一个主题有N个观察者，当主题改变时，触发观察者行为

/* 使用 */
/* 主题 */
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state
        this.notifyAllObservers()
    }
    notifyAllObservers() {
        this.observers.forEach(observer => {
            observer.update()
        });
    }
    attach(newObserver) {
        this.observers.push(newObserver)
    }
}

/* 观察者 */
class Observer {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }
    update() {
        console.log(`this.subject is watching by ${this.name} this.subject's prop:state = ${this.subject.state}`)
    }
}

/* 测试代码 */
let mys = new Subject()
let o1 = new Observer('o1', mys)
let o2 = new Observer('o2', mys)
let o3 = new Observer('o3', mys)
mys.setState(2)

/* 
 应用场景举例 - jQ callbacks
*/
// 核心代码如下，完整代码看html

/* callBacks 类 */
let callBacks = $.Callbacks()

/* 添加一个观察者 <=> subject.attach(#下面三个回调函数#) */
callBacks.add(function (info) {
    console.log('cb1', info)
})
callBacks.add(function (info) {
    console.log('cb2', info)
})
callBacks.add(function (info) {
    console.log('cb3', info)
})

/* 触发 <=> subject.setState('触发时携带的内容') */
callBacks.fire('触发时携带的内容')


/* 
 应用场景举例 - nodejs 自定义事件
*/
// 看chapter10-3.js,控制台命令 $ node [js文件名],结果在控制台打印非浏览器


/* 
其他场景
*/
//promise then
//事件监听 click等
//nodejs中 处理http请求 多进程通信
//vue 和 react 组件生命周期
//vue watch选项