/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-10 07:14:20 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-10-28 22:38:21
 */
/* 
模式概念 
*/

/* 介绍 */


/* 使用 */
class Adaptee {
    constructor() {

    }
    oringnRequest() {
        return `德国插头`
    }
}
class Target {
    constructor() {
        this.adaptee = new Adaptee()
    }
    request() {
        const responseInfo = this.adaptee.oringnRequest()
        console.log(`${responseInfo}--->>>中国插头`)
        return
    }
}
class Client {
    do(target) {
        target.request()
    }
}
const client = new Client()
const target = new Target()
client.do(target)

//-----------------------------------------------

/* 
 应用场景举例 - vue computed
*/

/* 原接口 */
/* 适配器 */
var vm = new Vue({
    el: '#app',
    data() {
        return {
            // 原接口 
            message: 'abcde'
        }
    },
    computed: {
        // 原接口 
        reversedMessage() {
            return this.message.split('').reverse().jion('')
        }
    }
})

/* 测试代码 */
// 见html文件

/* ps */
// 完整的代码在html中,这里是关键代码.
// 用vue的computed举例 但并不能运行起来 因为没有vue的环境.L0
//-----------------------------------------------

/* 
其他场景
*/