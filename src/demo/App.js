import List from "./component/list"
import { getCart } from "./component/cart"
export default class App {
   constructor(id) {
      this.$el = $('#' + id)
   }
   // 初始化
   init() {
      console.log(`app init`)
      this.initList()
      this.initCart()
      this.render()
   }
   // 渲染
   render() {
      console.log(`app render`)
      this.$el.append( this.list.getEl(), this.cart.getEl())
   }
   
   initList() {
      this.list = new List()
      this.list.init()

   }
   initCart() {
      this.cart = getCart()
      this.cart.init()
   }
   
}