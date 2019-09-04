function loadImg(src) {
  let promise = new Promise((resolve, reject) => {
    let img = document.createElement('img')
    img.onload = () => {
      resolve(img)

    }
    img.onerror = () => {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}

let result = loadImg('https://www.baidu.com/img/bd_logo1.png?qua=high')
result.then((res) => {
  console.log('part1', res)
  return res
}).then((res) => {
  console.log('part2', `img-width:${res.width}`, `img-height:${res.height}`)
}).catch((err) => {
  console.log(err)
})