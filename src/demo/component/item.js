import {
    getCart
} from "./cart"

export default class Item {
    constructor(data) {
        this.$el = $('<div class="product"></div>')
        this.data = data
    }
    // 初始化
    init() {
        console.log(`item init`)
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
        this.cart.add(this.data)
    }
    // 从购物车中删除
    delFromCart() {
        this.cart.del(this.data.id)
    }
    
    renderContent() {
        let content = ''
        for (const val of Object.values(this.data)) {
            content += `<span>${val}</span>`
        }
        this.$el.append($(content))
    }
    renderBtn() {
        const btn = `<button>test</button>`
        $(btn).click(() => {
            // addToCart
            // delFromCart
        })
        this.$el.append($(btn))
    }
    // 获取element
    getEl() {
        return this.$el
    }
}

export function createItem(data) {
    return new Item(data)
}