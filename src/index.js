/*
 * @Author: 鱼小柔 
 * @Date: 2019-09-10 07:14:20 
 * @Last Modified by: 鱼小柔
 * @Last Modified time: 2019-09-10 07:19:45
 */
// 题目 观看第三章第九、十节
// 自己的构思

class Car {
  constructor(name, type, price) {
    this.name = name
    this.type = type
    this.price = price
  }
  start() {
    console.log(`name:${this.name},type:${this.type},price:${this.price}`)
  }
  end(dist) {
    return this.price * dist
  }
}

// 老师的答案
class Car {
  constructor(name, type) {
    this.name = name
    this.type = type
  }
}
class ZC {
  constructor(name, type) {
    super(name, type)
    this.price = 2
  }
}
class KC {
  constructor(name, type) {
    super(name, type)
    this.price = 2
  }
}
class Trip {
  constructor(car) {
    this.car = car
  }
  start() {
    console.log(this.car.name, this.car.type)
  }
  end(dist) {
    return car.price * dist
  }
}
//自己的构思
class Floor {
  constructor(flag) {
    this.flag = flag
    this.maxContain = 100
    this.reset = 100
  }
}
class Car {
  constructor(number, floor) {
    this.number = number
    this.floor = floor
  }
}
class Process {
  constructor(floor, car) {
    this.floor = floor
    this.car = car
    this.startTime = null
    this.endTime = null
  }
  ready() {
    console.log(`floor---${this.floor.flag},剩余停车位${this.floor.reset}`)
  }
  myin() {
    this.floor.reset--
    this.startTime = this._now()
    console.log(`car---${this.car.number}进入,time---${new Date()}`)
  }
  out() {
    this.endTime = this._now()
    this.floor.reset++
    console.log(`car---${this.car.number}出库,停留时间${this.endTime-this.startTime}`)
  }
  _now() {
    return new Date.getSeconds()
  }
}
//老师的答案
//设计模式的题目要达到由一个类的实例去调用，显示该显示的信息。
class Park {
  constructor() {
    this.floorList = this._initFloorList()
    this.carInfoList = []
    this.camera = new Camera()
    this.screen = new Screen()
  }

  // 车为进入显示每层的剩余车位数目
  ready() {
    for (let item of this.floorList) {
      console.log(`第${item.id}层，空余车位：${item.getVacantNumber()}`)
    }
  }

  // 车进入
  myin(car) {
    
    // 空余车位信息显示
    // console.log(`----------in---------`)
    this.ready()
    // 相机抓拍
    console.log(`----------in---------`)
    this.camera.show(car)
    
    // 随机车辆停靠位置
    const floorIndex = randomZ(2)
    const placeIndex = randomZ(99)
    // 车位
    this.floorList[floorIndex].placeList[placeIndex].listenIn()
    // 处理车辆信息列表
    this.carInfoList[car.plateNo] = {
      inTime: new Date().getTime(),
      parkPosition: {
        floorIndex: floorIndex,
        placeIndex: placeIndex
      }
    }
  }

  // 车离开
  out(car) {
    // 车辆信息列表中定位到当前车辆信息
    const curCar = this.carInfoList[car.plateNo]
    const inTime = curCar.inTime
    const {
      floorIndex,
      placeIndex
    } = curCar.parkPosition
    // 车位动作
    this.floorList[floorIndex].placeList[placeIndex].listenOut()
    // 屏幕显示
    console.log(`----------out---------`)
    this.screen.show(car, inTime)
    // console.log(`----------out---------`)
  }

  // 初始化floor列表
  _initFloorList() {
    let list = []
    let i = 0;
    while (i < 3) {
      list.push(new Floor(i + 1))
      i++;
    }
    return list
  }

}
class Floor {
  constructor(index) {
    this.id = index
    this.placeList = this._initPlaceList()

  }
  getVacantNumber() {
    let total = 0
    for (const item of this.placeList) {
      if (item.vacant) {
        total++
      }
    }
    return total
  }

  // 初始化车位列表
  _initPlaceList() {
    let list = []
    let i = 0;
    while (i < 100) {
      list.push(new Place())
      i++;
    }
    return list
  }

}
class Place {
  constructor() {
    this.vacant = true

  }

  listenIn() {
    this.vacant = false

  }
  listenOut() {
    this.vacant = true

  }

}
class Camera {
  show(car) {
    const startTime = new Date().getTime()
    console.log(car.plateNo, '车进入,时间为：', startTime)
  }

}
class Screen {
  show(car, inTime) {
    const endTime = new Date().getTime()
    console.log(car.plateNo, '车离开，停留时间为：', endTime - inTime)
  }

}
class Car {
  constructor(plateNo) {
    this.plateNo = plateNo
  }
}

function randomZ(max) {

  return parseInt(Math.random() * (max + 1))
}

// test
const park = new Park()
const car1 = new Car('A123')
const car2 = new Car('B222')
const car3 = new Car('C345')
const car4 = new Car('D400')
park.myin(car1)
park.myin(car2)
park.out(car1)
park.myin(car3)
park.out(car3)
park.myin(car4)
park.out(car2)
park.out(car4)