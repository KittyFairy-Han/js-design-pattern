import {
    log
} from '../utils'
import {
    fetchList
} from '../io/api/buy-list'


class Cart {
    constructor() {
        this.$el = $(`<section id="cart">购物车</section>`)
    }
    // 初始化
    init() {
        console.log(`cart init`)
        this.getList()
    }
    // 渲染
    render() {
        console.log(`cart render`)
        // console.log(this.buyList)
        const tex = this.buyList.join('--\n')
        this.$el.text(tex)
    }
    // 刷新
    refresh() {
        console.log(`cart refresh`)
        this.$el.empty()
        this.render()
    }
    // 获取数据
    getList() {
        fetchList().then(data => {
            console.log(data)
            this.buyList = []
            for (const item of data) {
                this.buyList.push(item.name)
            }
        }).then(() => {
            this.render()
        })
    }
    // 操作 装饰器模式 观察者模式
    @log
    add(itemName) {
        this.buyList.push(itemName)
        this.refresh() 
    }
    @log
    del(itemName) {
        this.buyList = this.buyList.filter(item => {
            return item != itemName
        })
        // console.log(this.buyList)
        this.refresh()
    }

    // 获取element
    getEl() {
        return this.$el
    }
}

// 单例模式
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
