import { DH_UNABLE_TO_CHECK_GENERATOR } from "constants"

/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-18 08:32:03 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-10-28 22:43:58
 */
/* 
模式概念 
*/

/* 介绍 */
// A不让C访问，但是可以让B访问，所以C通过B得知A的某个信息。B相当于一个经纪人，A是明星。

/* 使用 */
class RealImage {
    constructor(fileName) {
        this.fileName = fileName
    }
    loadImage() {
        console.log(`loading image : ${this.fileName}`)
    }
    display() {
        console.log(`display image ${this.fileName}`)
    }
}
class ProxyImage {
    constructor(fileName) {
        this.image = new RealImage(fileName)
    }
    display() {
        this.image.display()
    }
}
const image = new ProxyImage('XXXYYY')
image.display()
//-----------------------------------------------

/* 
 应用场景举例 - dom节点时间监听代理
*/

/* 
 应用场景举例 - jq的$.proxy
*/

//以上两个在html文件中

/* 
 应用场景举例 - ES6的Proxy 明星经纪人
*/

/* class */
class Star {
    constructor() {
        this.name = 'ABC'
        this.age = 25
        this.phone = '13998903422'
    }

}
let star = new Star()
/* 代理经纪人 */
let agent = new Proxy(star, {
    get: function (target, key) {
        if (key === 'phone') {
            return 'agent : 15856781234'
        }
        return target[key]
    },
    set: function (target, key, val) {
        if (key === 'pay' && val < 100000) {
            console.log('报价太低,12w以上')
            return true
        }
        target[key] = val
        return true
    }
})

/* 测试代码 */
console.log(agent.name, agent.age)
console.log(agent.phone)
agent.pay = 150000
console.log(agent.pay)
agent.pay = 10000
console.log(agent.pay)
