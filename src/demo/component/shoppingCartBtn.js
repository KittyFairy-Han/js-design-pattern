export default class ShoppingCart {
    constructor(id) {
        this.$el = $(`<section id="shopping-cart-button"></section>`)
    }
    init() {
        console.log(`btn init`)
    }
    // 获取element
    getEl() {
        return this.$el
    }

}