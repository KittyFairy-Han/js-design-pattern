/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-13 09:47:27 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-09-17 06:38:55
 */
/* 
模式概念 
*/

/* 介绍 */
// 不改变原有的类,装饰器扩招原有的类

/* 使用 */
class Circle{
  draw(){
    console.log(`circle ❀一个⚪`)
  }
}
class Decorator{
  constructor(orignCircle){
     this.orignCircle = orignCircle
  }
  draw(){
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

//-----------------------------------------------

/* 
 应用场景举例 - ES7装饰器
*/

/* class */
// @testDec
class Demo{

}

/* 装饰器方法 */
function testDec(target) {
  target.isDec = true
}

/* 测试代码 */
alert(Demo.isDec)

/* 原理 */
// @testDec相当于
Demo = testDec(Demo) || Demo

//-----------------------------------------------

/* 
其他场景
*/