const path = require('path')
const webpack = require('webpack')
const Config = require('./config')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const packageJson = require('./package.json')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const assetsDir = './dist' + Config.getDate()
const resolve = (dir) => path.join(__dirname, dir)
const posixJoin = (_path) => path.posix.join(assetsDir, _path)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '././' : './',
  outputDir: packageJson.name,
  assetsDir: assetsDir,
  lintOnSave: true,
  productionSourceMap: true,
  css: {  // 引用全局css
    extract: true,
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/global/index.scss";
        `,
      },
    },
  },
  // babel-loader 转译文件
  transpileDependencies: [/normalize-url/, /mini-css-extract-plugin/, /prepend-http/, /sort-keys/],
  // 配置代理
  devServer: {
    proxy: {
      '/gateway': {
        target: 'http://t2-wsdaikuan.2345.com',
        changeOrigin: true,
      },
      '/api/manage': {
        target: 'http://t2-wsdaikuan.2345.com',
        changeOrigin: true,
      },
    },
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  configureWebpack: (config) => {
    config.resolve.extensions = ['.js', '.vue', '.json'];
    if (IS_PROD) {
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendors: {
              name: 'chunk-vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'initial',
            },
            common: {
              name: 'chunk-common',
              minChunks: 2,
              priority: -20,
              chunks: 'initial',
              reuseExistingChunk: true,
            },
          },
        },
      };
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        }),
        // 如果存在app静态文件目录
        // new CopyWebpackPlugin([{
        //   from: resolve('app'),
        //   to: 'app',
        //   ignore: ['.*']
        // }]),
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require('./public/vendor/vendor-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require('./public/vendor/hyappUtils-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require('./public/vendor/hyappUI-manifest.json'),
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: path.resolve(__dirname, './public/vendor/*.js'),
          // dll 引用路径
          publicPath: './vendor',
          // dll最终输出的目录
          outputPath: './vendor',
        }),
      );
    }
  },
  chainWebpack: (config) => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     */
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 设置全局属性
    config.plugin('define').tap(([args = {}]) => [{
        ...args,
        VERSION: '"' + packageJson.version + '"',
      }]);
    // 修复HMR
    config.resolve.symlinks(true);
    if (IS_PROD) {
      config.optimization.delete('splitChunks')
    }
    config.when(IS_PROD, (config) => config.output
      .set('filename', posixJoin('js/[name].[chunkhash].js'))
      .set('chunkFilename', posixJoin('js/[id].[chunkhash].js'))
    );
    // 设置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('APP_IMG', resolve('src/assets/images'));
    //图标压缩
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: "65-90", speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 },
      })
  },
}
