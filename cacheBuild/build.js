const path = require('path')
const fs = require('fs')
const buildAppConfigFile = require('./build-app-config')
const buildCacheHtmlFile = require('./build-cache-html')
const config = require('../vue.config')

// dist正则
const regDist = /dist\d+/
const reg = /dist(\d+)/
// 获取dist最新文件夹
const getDistPath = function (files) {
  // 筛选出dist文件夹
  let _files = files.filter(function(item) {
    return regDist.test(item)
  })
  // 更具时间戳大小排序
  _files.sort(function (a, b) {
    return b.match(reg)[1] - a.match(reg)[1]
  })
  return _files
}

// 打包文件夹
const outputDir = path.join(__dirname, '..', config.outputDir)
// 读取打包文件夹内的dist文件
fs.readdir(outputDir, function (err, files) {
  if(err) return console.error(err)
  const getFiles = getDistPath(files)
  const distPath = path.join(outputDir, getFiles[0])
  // 生成android的appConfig.json文件
  buildAppConfigFile(distPath)
  // 生成iOS的cache.html文件
  buildCacheHtmlFile(distPath)
})
