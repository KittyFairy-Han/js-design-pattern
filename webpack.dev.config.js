const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
    //打包的js文件输出的根目录以及具体路径
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
    //打包的bundle.js插入的html文件
  ],

  devServer: { //自动热更新
    contentBase: path.join(__dirname, './release'), //run dev时运行的根目录
    open: true, //自动打开浏览器
    port: 9000 //端口号
  }
}