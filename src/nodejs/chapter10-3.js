console.log(`~*~*~*~*~*~*~*~*~*~*~~~~应用场景nodejs自定义事件 - ~*~*~*~*~*~*~*~*~*~*~`)
console.log(`~*~*~*~*~*~*~*~*~*~*~~~~EventEmitter - ~*~*~*~*~*~*~*~*~*~*~`)
// 可以理解为 nodejs 封装好的观察者模式类
const EventEmitter = require('events').EventEmitter
const emitter1 = new EventEmitter()

/* 关联 */
/* some <=> subject, [回调函数] <=> observer, on <=> subject.attach(observer) */
emitter1.on('some', info => {
    console.log('fn1', info)
})
emitter1.on('some', info => {
    console.log('fn2', info)
})

/* 触发 */
/* some <=> subject, xxxx <=> 触发时携带的内容 */
emitter1.emit('some', 'xxxx')



console.log(`~*~*~*~*~*~*~*~*~*~*~~~~自定义类继承EventEmitter - ~*~*~*~*~*~*~*~*~*~*~`)
// 自己定义一个类 继承 nodejs 的EventEmitter，则这个自定义类也支持 自定义事件监听与触发
class Dog extends EventEmitter {
    constructor(name) {
        super()
        this.name = name
    }
}
const simon = new Dog('simon')

/* 关联 */
/* bark <=> subject, [回调函数] <=> observer, on <=> subject.attach(observer) */
simon.on('bark', function (info) {
    console.log(`${this.name}`, 'bark-1')
})
simon.on('bark', function (info) {
    console.log(`${this.name}`, 'bark-2')
})

/* 触发 */
/* bark <=> subject, xxxx <=> 触发时携带的内容 */
simon.emit('bark')

console.log(`~*~*~*~*~*~*~*~*~*~*~~~~node fs类 - ~*~*~*~*~*~*~*~*~*~*~`)
// stream 用到自定义事件
const fs = require('fs')
const readStream = fs.createReadStream('../data/long-word-file.txt')

/* data <=> 主题, 【回调函数】 <=> 观察者  */
readStream.on('data', (chunk) => {
    console.log(`node fs类 - `)
    length = chunk.toString().length
    console.log('chunklength',length)
})

console.log(`~*~*~*~*~*~*~*~*~*~*~~~~node fs类、readline类 - ~*~*~*~*~*~*~*~*~*~*~`)
// 结合readLine 用的自定义事件
const readLine = require('readline')
let rl = readLine.createInterface({
    input: fs.createReadStream('../data/long-word-file.txt')
})

/* line <=> 主题, 【回调函数】 <=> 观察者  */
let lineNum = 0
rl.on('line', (line) => {
    lineNum++
})

/* close <=> 主题, 【回调函数】 <=> 观察者  */
rl.on('close', () => {
    console.log(`node fs类、readline类 -`)
    console.log('lineNum', lineNum)
})