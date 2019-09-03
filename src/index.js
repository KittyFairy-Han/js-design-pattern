class
JQuery
{
  constructor(selector)
  {
    let slice = Array.prototype.slice
    let doms = slice.call(document.querySelectorAll(selector))
    let len = doms ? doms.length : 0
    for (let i = 0; i < len; i++) {
      this[i] = doms[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append(node)
  {

  }
}
window.$ = function (s) {
  return new JQuery(s)
}
//test
console.log($('p'))