const path = require('path')

function resolve (url) {
  return path.resolve(__dirname, url)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', resolve('./src/components'))
      .set('styles', resolve('./src/assets/styles'))
  }
}