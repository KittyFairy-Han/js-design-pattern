/*
 * @Author: 鱼小柔 
 * @Date: 2019-10-11 08:23:02 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-10-12 08:18:21
 */

/* 命令模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---命令模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
class Receiver {
    exec(name) {
        console.log(name + ':执行')
    }
}
class Command {
    constructor(name, receiver) {
        this.receiver = receiver
    }
    cmd() {
        console.log(name + ':触发命令')
        this.receiver.exec()
    }
}
class Invoker {
    constructor(name, command) {
        this.command = command
    }
    ivk() {
        console.log(name + ':发起')
        this.command.cmd()
    }
}
//测试代码
let soldier = new Receiver('士兵')
let trumpeter = new Command('小号手', soldier)
let general = new Invoker('将军', trumpeter)
general.invoke()
/* 备忘录模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---备忘录模式---%%%%%%%%%%%%%%%%%%%%%%%%%')

/* 职责链模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---职责链模式---%%%%%%%%%%%%%%%%%%%%%%%%%')

/* 中介者模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---中介者模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
class Mediator {
    constructor(name, a, b) {
        this.name = name
        this.a = a
        this.b = b
    }
    setA() {
        console.log(`${this.name} : ${this.b}->${this.a}`)
        let num = this.b.number
        this.a.setNumber(num + 100)
    }
    setB() {
        console.log(`${this.name} : ${this.a}->${this.b}`)
        let num = this.a.number
        this.b.setNumber(num - 100)
    }

}
class A {
    constructor(name) {
        this.name = name
        this.number = 0
    }
    setNumber(num, m) {
        this.number = num
        console.log(this.name + ':' + this.number)
        m && m.setB()
    }
}
class B {
    constructor(name) {
        this.name = name
        this.number = 0
    }
    setNumber(num, m) {
        this.number = num
        console.log(this.name + ':' + this.number)
        m && m.setA()
    }
}
//测试代码
let saler = new A('房东')
let payer = new B('租客')
let m = new Mediator('房产中介', saler, payer)
saler.setNumber(1000)
console.log(a.number, b.number)
payer.setNumber(100)
console.log(a.number, b.number)

/* 策略模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---策略模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
/* 组合模式（树形结构） */
console.log('%%%%%%%%%%%%%%%%%%%%%%---组合模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
/* 桥接模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---桥接模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
/* 原型模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---原型模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
/* 享元模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---享元模式---%%%%%%%%%%%%%%%%%%%%%%%%%')