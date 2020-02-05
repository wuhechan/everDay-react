let path = require('path')
let webpack = require('webpack')
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ROOT_PATH = path.resolve(__dirname)
let APP_PATH = path.resolve(ROOT_PATH, 'app')
let BUILD_PATH = path.resolve(ROOT_PATH, 'build')
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(APP_PATH, 'index.js')]
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: BUILD_PATH,
    compress: true,
    port: 8088,
    host: "localhost",
    hot:true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,     // 解析less
        use: ExtractTextWebpackPlugin.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析
        })
      },
      {
        test: /\.scss$/,     // 解析scss
        use: ExtractTextWebpackPlugin.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader', 'sass-loader'] // 从右向左解析
        })
      },
      {
        test: /\.css$/,     // 解析css
        use: ExtractTextWebpackPlugin.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(jpeg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, //小于8K的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/' // 图片打包后存放的目录
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  resolve: {
    // 省略后缀
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {   // 抽离第三方插件
          test: /node_modules/,   // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor',  // 打包后的文件名，任意命名    
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: {
          // 抽离自己写的公共代码，utils里面是一个公共类库
          chunks: 'initial',
          name: 'utils',  //  任意命名
          minSize: 0    // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'My react app',
      chunks: ['vendor', 'app', 'utils'],
      template: path.resolve(APP_PATH, 'index.html'),
      filename: path.resolve(BUILD_PATH, 'index.html'),
    }),
    new ExtractTextWebpackPlugin({ filename: 'style.css' }),
    new CleanWebpackPlugin()
  ]
}