/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-13 09:47:27 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-09-18 08:17:17
 */
/* 
模式概念 
*/

/* 介绍 */
// 不改变原有的类,装饰器扩招原有的类

/* 使用 */
class Circle {
    draw() {
        console.log(`circle ❀一个⚪`)
    }
}
class Decorator {
    constructor(orignCircle) {
        this.orignCircle = orignCircle
    }
    draw() {
        console.log(`↑circle.draw----------------------↓dec.draw`)
        this.orignCircle.draw()
    }
    wipe() {
        console.log(`decorator 擦除一个圆`)
    }
}
const circle = new Circle()
const dec = new Decorator(circle)
circle.draw()
dec.draw()
dec.wipe()

console.log(`~*~*~*~*~*~*~*~*~*~*~~~~应用场景举例 - ES7装饰器//~*~*~*~*~*~*~*~*~*~*~`)
//@xxx这种装饰器是官方提供的接口，本质上可以理解为一个回调函数，参数是固定的。
//比如类装饰器接收一个参数，方法装饰器接收三个参数：target name descriptor
//descriptor = {value: ƒ, writable: , enumerable: , configurable: }
/* 
 应用场景举例 - ES7装饰器
*/

/* class */
@testDec
class Demo {

}

/* 装饰器方法 */
function testDec(target) {
    target.isDec = true
}

/* 测试代码 */
console.log(Demo.isDec)

/* 原理 */
// @testDec相当于
Demo = testDec(Demo) || Demo

console.log(`~*~*~*~*~*~*~*~*~*~*~应用场景举例 - vue mixins//~*~*~*~*~*~*~*~*~*~*~`)

/* 
 应用场景举例 - vue mixins
*/

/* 装饰器方法 */
function myMixins(mixinList) {
    return function (target) {
        // 闭包内为自定义code
        // console.log(target.prototype)
        // console.log(mixinList)
        Object.assign(target.prototype, ...mixinList)

    }

}

/* 装饰内容 */
const another = {
    method() {
        console.log('other method')
    }
}

/* class */
@myMixins([another])
class myVue {
    vueFn() {
        console.log('vm fn')
    }
}



/* 测试代码 */
const vm = new myVue()
vm.method()

console.log(`~*~*~*~*~*~*~*~*~*~*~应用场景举例 - 一般函数变为只读函数//~*~*~*~*~*~*~*~*~*~*~`)

/* 
 应用场景举例 - 一般函数变为只读函数
*/

/* 装饰器方法 */
function readOnly(target, name, descriptor) {
    // console.log(target, name, descriptor)
    descriptor.writable = false //return之前为自定义code
    return descriptor
}


/* class */
class Person {
    @readOnly
    getName() {
        console.log('nameabc')
        return 'nameabc'
    }
}



/* 测试代码 */
const person = new Person()
person.getName()
/* person.getName() = function () {
  return 'namedef'
} 报错 */

console.log(`~*~*~*~*~*~*~*~*~*~*~应用场景举例 - 日志打印//~*~*~*~*~*~*~*~*~*~*~`)

/* 
 应用场景举例 - 日志打印
*/

/* 装饰器方法 */
function log(target, name, descriptor) {
    const originVal = descriptor.value

    descriptor.value = function () {
        let argList = Array.from(arguments)
        console.log(`打印日志:执行方法${name},参数为:${argList},结果为:`)
        return originVal.apply(this, arguments)
    }
    return descriptor
}


/* class */
class MyMath {
    @log
    add(a, b) {
        return a + b
    }
}



/* 测试代码 */
const math = new MyMath()
let result = math.add(1, 1)
console.log(result)
