import {
    fetchList
} from '../io/api/list'
import {
    createItem
} from './item'
export default class List {
    constructor() {
        this.$el = $(`<section id="list">商品总览</section>`)
    }
    // 初始化
    init() {
        console.log(`list init`)
        this.getList()
    }
    // 渲染
    render() {
        console.log(`list render`)
        for (const item of this.productList) {
            this.$el.append(item.getEl())
        }
    }
    // 获取商品列表数据
    getList() {

        // let list = await fetchList()
        // console.log(list)
        fetchList().then(data => {
            console.log(data)
            this.productList = []
            for (const item of data) {
                this.productList.push(createItem(item))
            }
            for (const item of this.productList) {
                item.init()
            }
        }).then(() => {
            this.render()
        })
    }
    
    // 获取element
    getEl() {
        return this.$el
    }


}