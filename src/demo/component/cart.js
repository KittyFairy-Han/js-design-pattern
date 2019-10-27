class Cart {
    constructor() {
        this.$el = $(`<section id="cart">购物车</section>`)
    }
    // 初始化
    init(){
        console.log(`cart init`)
        this.getList()
        this.render()
    }
    // 渲染
    render() {
        console.log(`cart render`)
        if (!this.buyList.length) return
        for (const item of this.buyList) {
            this.$el.append(item.getEl())
        }
    }
    getList(){
        this.buyList = []
    }
    //
    add(item) {
        this.buyList.push(item)
        
    }
    del(id) {
        this.buyList = this.buyList.filter(item => {
            return item.id != id
        })
    }
     
     // 获取element
     getEl() {
         return this.$el
     }
}

function getCartWrapper() {
    let instance

    return function () {
        if (!instance) {
            instance = new Cart()
        }
        return instance
    }

}

export const getCart = getCartWrapper()

/* export function getCart2() {
    if(!instance){
        instance = new Cart()
    }
    return instance
} */
