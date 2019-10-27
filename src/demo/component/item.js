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
        this.fsm = new StateMachine({
            init: '取消加购',
            // 状态集合
            transitions: [{
                    name: 'doBuy',
                    from: '取消加购',
                    to: '加入购物车'
                },
                {
                    name: 'deleteBuy',
                    from: '加入购物车',
                    to: '取消加购'
                },
            ],
            methods: {
                // 执行加购 <=> [状态过渡].handle([主体])
                onDoBuy(self, itemSelf) {
                    // 主体接下来的业务逻辑
                    // console.log(self, itemSelf)
                    itemSelf.$btn.text('取消加购')
                    itemSelf.addToCart()
                },
                // 取消加购 <=> [状态过渡].handle([主体])
                onDeleteBuy(self, itemSelf) {
                    // 主体接下来的业务逻辑
                    // console.log(self, itemSelf)
                    itemSelf.$btn.text('加入购物车')
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


    // 添加到购物车
    addToCart() {
        console.log('item addToCart')
        this.cart.add(this.data)
    }
    // 从购物车中删除
    delFromCart() {
        console.log('item delFromCart')
        this.cart.del(this.data.id)
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
        this.$btn = $(`<button>t</button>`)
        this.$btn.click(() => {
            console.log(`item.$btn click`)
            if (this.fsm.is('加入购物车')) {
                // 【状态机】.【状态过渡】 <=> [某一状态过渡].handle([主体])
                this.fsm.deleteBuy(this)
            } else {
                // 【状态机】.【状态过渡】 <=> [某一状态过渡].handle([主体])
                this.fsm.doBuy(this)
            }
        })
        this.$el.append(this.$btn)
    }
    // 获取element
    getEl() {
        return this.$el
    }
}


function createDiscountItem(data) {
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

export function createItem(data) {
    if (data.isDis) {
        data = createDiscountItem(data)
    }
    return new Item(data)
}