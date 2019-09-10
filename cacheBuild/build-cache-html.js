'use strict'

const fs = require('fs')
const path = require('path')

function buildCacheHtmlFile(distPath) {
  const filename = 'cache.html'

  // get root path of current app: '/xxxxxx/hqwy/dist/static?.?.?' => '/xxxxxx/hqwy/dist'
  const appRootPath = path.join(distPath, '..')

  const template = `
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<title>Cache Manifest</title>
<style>img{display:block;max-width:10px;max-height:10px;}</style>
<!-- css -->
</head>
<body>
<!-- js -->
<!-- img -->
</body>
</html>
`
  // get resource list
  const appConfigSrcPath = path.join(appRootPath, 'appConfig.json')
  const appConfig = JSON.parse(fs.readFileSync(appConfigSrcPath, 'utf8'))
  const resList = appConfig.resources

  // inject
  const cssResList = []
  const jsResList = []
  const imgResList = []
  const cssTagTemplate = '<link rel="stylesheet" href="{{ url }}">'
  const jsTagTemplate = '<script defer src="{{ url }}"></script>'
  const imgTagTemplate = '<img src="{{ url }}">'

  resList.forEach((item) => {
    const filepath = item.url.split('?')[0]
    if (/\.css$/i.test(filepath)) {
      cssResList.push(filepath)
    } else if (/\.js$/i.test(filepath)) {
      jsResList.push(filepath)
    } else if (/\.(png|jpg|jpeg|gif|webp)$/i.test(filepath)) {
      imgResList.push(filepath)
    }
  })

  let html = template
  function injectRes(resList, tagTemplate, injectionPoint) {
    const tags = (resList.map((item) => tagTemplate.replace('{{ url }}', item))).join('\n')
    html = html.replace(injectionPoint, tags)
  }
  injectRes(cssResList, cssTagTemplate, '<!-- css -->')
  injectRes(jsResList, jsTagTemplate, '<!-- js -->')
  injectRes(imgResList, imgTagTemplate, '<!-- img -->')

  // output
  // console.log(html)
  const htmlDistPath = path.join(appRootPath, filename)
  fs.writeFileSync(htmlDistPath, html, 'utf-8')

  console.log('  Generated manifest file: ' + filename + '\n')
}

// @MOCK: run script for testing
// const distPath = '../hqwy/v3/static3.0.0'
// buildCacheHtmlFile(distPath)

// exports
module.exports = buildCacheHtmlFile
