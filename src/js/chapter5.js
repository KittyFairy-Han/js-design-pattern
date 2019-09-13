/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-12 07:33:34 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-09-12 07:57:50
 */
// 单例模式概念
/**一个类只有一个实例，
 * 
 */
class SingleObj {
    constructor() {
        //js语言无法把构造函数设为private，单利模式下构造函数是private的，外部不能使用new去构造
    }
}
SingleObj.getInstance = (function () {
    let instance

    return function closeBag() {
        if (!instance) {
            instance = new SingleObj()
        }
        return instance
    }

})()


//使用
let obj1 = SingleObj.getInstance()
let obj2 = SingleObj.getInstance()
let obj3 = new SingleObj()
console.log('obj1===obj2', obj1 === obj2, 'obj1===obj3', obj1 === obj3)

/* 
 应用场景举例 - 登录框
*/
/* class */
class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show(curInstance) {
        if (this.state === 'show') {
            alert(curInstance + '已经显示')
        } else {
            alert(curInstance + '显示成功')
        }
        this.state = 'show'
    }
    hide(curInstance) {
        if (this.state === 'hide') {
            alert(curInstance + '已经隐藏')
        } else {
            alert(curInstance + '隐藏成功')
        }
        this.state = 'hide'
    }
}
/* 获取唯一实例的方法 */
LoginForm.getInstance = (function () {
    let instance

    return function closeBag() {
        if (!instance) {
            instance = new LoginForm()
        }
        return instance
    }

})()


/* 测试代码 */
const login1 = LoginForm.getInstance();
const login2 = LoginForm.getInstance();
login1.show('login1')
login2.show('login2')
console.log('login1===login2', login1 === login2)

/* 
购物车、vue-store、react-redux也是单例模式 
*/