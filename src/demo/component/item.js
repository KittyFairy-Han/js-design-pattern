import {
    log
} from '../utils'
import {
    getCart
} from "./cart"
/* 状态机类 */
const StateMachine = require('javascript-state-machine');

export default class Item {
    constructor(data) {
        this.$el = $('<div class="product"></div>')
        this.data = data
        this.cart = getCart()
    }
    // 初始化
    init() {
        console.log(`item init`)
        // 状态模式
        this.fsm = new StateMachine({
            init: '加入购物车',
            // 状态集合
            transitions: [{
                    name: 'deleteBuy',
                    from: '取消加购',
                    to: '加入购物车'
                },
                {
                    name: 'doBuy',
                    from: '加入购物车',
                    to: '取消加购'
                },
            ],
            methods: {
                // 执行加购 <=> [状态过渡].handle([主体])
                onDoBuy(self, itemSelf) {
                    // 主体接下来的业务逻辑
                    console.log('onDobuy',self, itemSelf)
                    itemSelf.$btn.text(self.to)
                    itemSelf.addToCart()
                },
                // 取消加购 <=> [状态过渡].handle([主体])
                onDeleteBuy(self, itemSelf) {
                    // 主体接下来的业务逻辑
                    console.log('ondelBuy',self, itemSelf)
                    itemSelf.$btn.text(self.to)
                    itemSelf.delFromCart()
                }
            }
        })
        this.render()
    }
    // 渲染
    render() {
        console.log('render item')
        this.renderContent()
        this.renderBtn()
    }
     renderContent() {
         let content = ''
         for (const val of Object.values(this.data)) {
             content += `<span>${val}</span>`
         }
         this.$content = $(content)
         this.$el.append(this.$content)
     }
     renderBtn() {
         this.$btn = $(`<button>加入购物车</button>`)
         this.$btn.click(() => {
             console.log(`item.$btn click`)
             console.log(this.fsm)
             if (this.fsm.is('加入购物车')) {
                 // 【状态机】.【状态过渡】 <=> [某一状态过渡].handle([主体])
                 this.fsm.doBuy(this)
             } else {
                 // 【状态机】.【状态过渡】 <=> [某一状态过渡].handle([主体])
                 this.fsm.deleteBuy(this)
             }
         })
         this.$el.append(this.$btn)
     }


    // 添加到购物车 装饰器模式
    @log
    addToCart() {
        this.cart.add(this.data.name)
    }
    // 从购物车中删除 装饰器模式
    @log
    delFromCart() {
        this.cart.del(this.data.name)
    }
    
   
    // 获取element
    getEl() {
        return this.$el
    }
}

// 代理器模式(拦截器模式)
function createDiscountData(data) {
    return new Proxy(data, {
        get: (targetObj, propkey) => {
            if (propkey === 'name') {
                return `${targetObj[propkey]}[折扣]`
            }
            if (propkey === 'price') {
                return targetObj[propkey] * 0.8
            }
            return targetObj[propkey]
        }
    })

}

// 适配器模式
function chagetoDiscountData(src) {
    let adapter = src
    if (src.isDis) {
        adapter.name = src.name + '【折扣】'
        adapter.price = src.price * 0.8
    }
    return adapter
}



// 工厂模式
export function createItem(data) {
    if (data.isDis) {
        data = createDiscountData(data)
        // 用 chagetoDiscountData(data) 也可
    } 
    // console.log(new Item(data))
    return new Item(data)
}