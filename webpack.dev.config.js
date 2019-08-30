const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //入口
  entry: './src/index.js',
  //出口
  output: {
    path: __dirname,
    filename: './release/bundle.js'
    //打包的js文件输出的根目录以及具体路径
  },

  //语法解析模块
  module: {
    rules: [
      {
        test:/\.js?$/,//检验的文件
        exclude:/(node_modules)/,//排除
        loader:'babel-loader'//检验js文件除去nodemodules里面的js文件，用babel把它转换为es2015
      }
    ]
  },
  
  //
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
    //打包的bundle.js插入的html文件
  ],

  //
  devServer: { //自动热更新
    contentBase: path.join(__dirname, './release'), //run dev时运行的根目录
    open: true, //自动打开浏览器
    port: 9000 //端口号
  }
}