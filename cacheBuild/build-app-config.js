'use strict'

const glob = require('glob')
const md5File = require('md5-file')
const fs = require('fs')
const path = require('path')

function buildAppConfigFile(distPath) {
  const filename = 'appConfig.json'

  // get root path of current app: '/xxxxxx/hqwy/dist/static?.?.?' => '/xxxxxx/hqwy/dist'
  const appRootPath = path.join(distPath, '..')

  // get `index.html` path
  const indexHtmlPath = path.join(appRootPath, 'index.html')
  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8')

  // extract resources from `index.html`
  // 这个正则假设资源的 URL 中不包含空格
  const reRes = /<(?:link|script)\s+[^>]*(?:src|href)=['"]?([^'"\s>]+)['"]?(?:\s|>)/g

  const resTags = indexHtmlContent.match(reRes)
  const resInHTML = []
  resTags.forEach((tag) => {
    const resPath = (reRes.exec(tag) || [])[1]
    reRes.lastIndex = 0
    if (resPath) resInHTML.push(resPath)
  })
  // console.log(resInHTML)

  const fileListResInHTML = resInHTML.map((item) => {
    const filePath = path.join(appRootPath, item)
    // 这里用 glob.sync() 包一下，一是确保有这个文件，二是确保与其它 fileList 的格式是一致的
    return glob.sync(filePath)[0]
  })

  // get all resource path
  const fileList = [
    indexHtmlPath,
  ].concat(
    fileListResInHTML,
    glob.sync(path.join(distPath, 'css/**/*.css')),
    glob.sync(path.join(distPath, 'js/**/*.{js,gz}')),
    glob.sync(path.join(distPath, 'img/**/*.*'))
  )
  // console.log(fileList)

  // filter fileList - remove invalid items & dedupe
  const fileListFinal = []
  fileList.forEach((item) => {
    if (item && fileListFinal.indexOf(item) < 0) fileListFinal.push(item)
  })
  // console.log(fileListFinal)

  // get content of `appConfig.json`
  const appConfigSrcPath = path.join(__dirname, `../public/`, filename)
  const appConfig = JSON.parse(fs.readFileSync(appConfigSrcPath, 'utf8'))
  // console.log(appConfig)

  // generate resource manifest
  const resources = fileListFinal.map((item) => {
    let url = path.relative(appRootPath, item)
    let md5 = md5File.sync(item)
    let resource = { url, md5 }

    if (url === 'index.html') {
      resource.content = indexHtmlContent
    }
    return resource
  })

  // output
  appConfig.resources = resources
  const json = JSON.stringify(appConfig, null,'\t')
  // console.log(json)
  const appConfigDistPath = path.join(appRootPath, filename)
  fs.writeFileSync(appConfigDistPath, json, 'utf-8')

  console.log('  Generated config file: ' + filename + '\n')
}

// @MOCK: run script for testing
// const distPath = '../hqwy/v3/static3.0.0'
// buildAppConfigFile(distPath)

// exports
module.exports = buildAppConfigFile
