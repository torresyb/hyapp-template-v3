const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const dllPath = 'public/vendor'
module.exports = {
  entry: {
    vendor: [
      'vue/dist/vue.esm.js',
      'vue-router',
      'vuex',
      'axios',
    ],
    hyappUI: [
      'hyapp-ui/dist/hyapp.min.js',
    ],
    hyappUtils: [
      'hyapp-utils/dist/hyapp-utils.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, dllPath),
    filename: '[name].dll_[chunkhash:4].js',
    library: '[name]_[chunkhash:4]',
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.join(__dirname, dllPath),
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      name: '[name]_[chunkhash:4]',
      context: process.cwd(),
    }),
  ],
}
