class House {
  constructor(city){
    this.city = city
  }
  getCity(){
    console.log(`house in ${this.city}`)
  }
}
class Person {
  constructor(name,house) {
    this.name = name
    this.house = house
  }
  saySomething(){
    console.log(`my name is ${this.name} , I live in ${this.house.city}`)
  }
}
class Student extends Person{
   constructor(name, house, gradeClass) {
     super(name,house)
     this.gradeClass = gradeClass
   }
   saySomething() {
     console.log(`I am an -${this.gradeClass}- student , my name is ${this.name}`)
    //  this.house.getCity()//报错
   }
}

class Teacher extends Person {
  constructor(name, house, subject) {
    super(name, house)
    this.subject = subject
  }
  saySomething() {
    console.log(`I teach -${this.subject}-  , my name is ${this.name} , I live in ${this.house.city}`) //this.house.city是undefined
  }
}

//test
const SA = new Student('小喵','萧山','大三')
const TA = new Teacher('秋名', '滨江', '大学英语')
SA.saySomething()
TA.saySomething()