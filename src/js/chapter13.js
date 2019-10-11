/*
 * @Author: 鱼小柔 
 * @Date: 2019-10-11 08:23:02 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-10-11 08:46:11
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