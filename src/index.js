/*
 * @Author: 鱼小柔 
 * @Date: 2019-10-11 08:23:02 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-10-16 08:02:18
 */

/* 职责链模式 */
// 一个对象,多个实例之间按顺序执行
console.log('%%%%%%%%%%%%%%%%%%%%%%---职责链模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
class Action {
  constructor(name) {
    this.name = name
    this.nextAction = null
  }
  setNextAction(action) {
    this.nextAction = action
  }
  handle() {
    console.log(`${this.name} 审批`)
    if (this.nextAction != null) {
      this.nextAction.handle()
    }
  }
}
//测试代码
let step1 = new Action('组长')
let step2 = new Action('经理')
let step3 = new Action('总监')
step1.setNextAction(step2)
step2.setNextAction(step3)
step1.handle()

/* 命令模式 */
// 发布命令者(少)与接受者分开(多)，命令对象作为中转站
// 少:多 数据单项流通
console.log('%%%%%%%%%%%%%%%%%%%%%%---命令模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
class Receiver {
  constructor(name) {
    this.name = name
  }
  exec() {
    console.log(this.name + ':执行')
  }
}
class Command {
  constructor(name, receiver) {
    this.name = name
    this.receiver = receiver
  }
  cmd() {
    console.log(this.name + ':触发命令')
    this.receiver.exec()
  }
}
class Invoker {
  constructor(name, command) {
    this.name = name
    this.command = command
  }
  ivk() {
    console.log(this.name + ':发起')
    this.command.cmd()
  }
}
//测试代码
let soldier = new Receiver('士兵')
let trumpeter = new Command('小号手', soldier)
let general = new Invoker('将军', trumpeter)
general.invoke()

/* 中介者模式 */
// N:N 数据双向流通
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
payer.setNumber(100)


/* 策略模式 */
// 不同类型用户执行不同策略，直接拆分成多个类处理，就不用大量的if else了
console.log('%%%%%%%%%%%%%%%%%%%%%%---策略模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
class LowRank {
  todo() {
    console.log(`普通用户购买`)
  }
}
class MidRank {
  todo() {
    console.log(`会员用户购买`)
  }
}
class SuperRank {
  todo() {
    console.log(`vip 购买`)
  }
}
// 测试代码
const orUser = new LowRank()
orUser.todo()
const memeberUser = new MidRank()
memeberUser.todo()
const vip = new SuperRank()
vip.todo()


/* 桥接模式 */
// 一个类拆分成两个类 再连接
console.log('%%%%%%%%%%%%%%%%%%%%%%---桥接模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
/* class ColorShape {
    yellowCircle(){
        console.log('yellow circle')
    }
    redCircle() {
        console.log('red circle')
    }
    yellowTri() {
        console.log('yellow triangle')
    }
    redTri() {
        console.log('red triangle')
    }
}
// 测试代码
let cs = new ColorShape()
cs.yellowCircle()
cs.redCircle()
cs.yellowTri()
cs.redTri() */
class Color {
  constructor(type) {
    this.type = type
  }
}
class Shape {
  constructor(type, color) {
    this.type = type
    this.color = color
  }
  draw() {
    console.log(`${this.type} ${this.color}`)
  }
}
//测试代码
let red = new Color('red')
let yellow = new Color('red')
let circle = new Color('circle', red)
let triangle = new Color('triangle', yellow)
circle.draw()
triangle.draw()

/* 备忘录模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---备忘录模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
// 备忘状态
class Memeto {
  constructor(content) {
    this.content = content
  }
  getContent() {
    return this.content
  }
}
// 备忘列表
class CareTaker {
  constructor() {
    this.list = []
  }
  add(memeto) {
    this.list.push(memeto)
  }
  get(index) {
    return this.list.pop()
  }
}
// 编辑器
class Editor {
  constructor() {
    this.ck = new CareTaker()
    this.content = null
  }
  setContent(content) {
    this.content = content
  }
  saveContentToMemeto() {
    this.ck.add(new Memeto(this.content))
  }
  getContentFeomMemeto() {
    this.content = memeto.getContent()
  }
}
// 测试代码
let editor = new Editor()
editor.setContent('输入111')
editor.setContent('修改222')
editor.saveContentToMemeto() //保存
editor.setContent('修改333')
editor.saveContentToMemeto() //保存
editor.setContent('修改444')
editor.getContentFeomMemeto() //撤销
editor.getContentFeomMemeto() //撤销

/* 原型模式 */
console.log('%%%%%%%%%%%%%%%%%%%%%%---原型模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
const prototypeObj = {
  getName() {
    return this.first + ' ' + this.last
  }
}
//测试代码
let x = Object.create(prototypeObj)
x.first = 'A'
x.last = 'B'
alert(x.getName())

/* 组合模式（树形结构） */
// 整体和单个节点操作一致，整体和单个节点的数据结构一致 --是组合模式的特点
console.log('%%%%%%%%%%%%%%%%%%%%%%---组合模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
const vitrulDom = {
  tag: 'div',
  attr: {
    id: 'div1',
    className: 'wrapper',
  },
  children: [{
      tag: 'span',
      attr: {

      },
      children: ['span-one']

    },
    {
      tag: 'span',
      attr: {

      },
      children: ['span-two']

    }

  ]

}

/* 享元模式 */
// 共享数据，节省开销，js没有经典场景
console.log('%%%%%%%%%%%%%%%%%%%%%%---享元模式---%%%%%%%%%%%%%%%%%%%%%%%%%')
// 父级代理点击事件
/* <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul> */