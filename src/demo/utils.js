// 装饰器是基于 Proxy 的，所以也接收 targetObj, propName, propDescriptor 这三个参数
export function log(targetObj, propName, propDescriptor) {
    const originFn = propDescriptor.value

    propDescriptor.value = function (...args) {
        // args 为调用 originFn 时传过来的参数数组
        // 扩展的代码
        console.log(`打印日志:执行方法${propName},参数为:`, ...args)
        // 执行原函数的逻辑
        originFn.apply(this, args)
    }
    // console.log(propDescriptor)
    return propDescriptor
}

/* 
@log fn <=> 
step1:拷贝属性描述对象
des = fn.description
step2: 应用装饰器 (ps:装饰器函数 是一个回调函数 接收和返回都是固定的  接收 3 个参数, 并且要返回 description即属性描述对象
des = log(target, property, fn.description)
step3:新的属性描述对象应用于fn
fn.description = des

当执行 .fn 的时候，就是执行 des.value
所以 扩展的代码 就写在 des.value 里面
但是 fn 原来的逻辑也要照常执行啊 
所以 用 call 或者 apply 执行原来的逻辑 

*/