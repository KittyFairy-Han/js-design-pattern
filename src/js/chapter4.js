/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-11 07:15:21 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-09-11 07:22:58
 */

// 工厂模式概念
// 产品
class A {
    constructor(name) {
        this.name = name
    }
    //······

}
// 工厂
function creator(name) {
    return new A(name)
}
// 用法
creator('实例a')





// 工厂模式-经典场景
// 1--jq
class JQ {
    constructor(selector) {
        //······
    }
    //······
}
window.$ = function (selector) {
    return new JQ(selector)
}
$('div')
// 2--React.createElement
// 3--Vue异步组件