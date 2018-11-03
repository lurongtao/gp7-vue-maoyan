const path = require('path')

function resolve (url) {
  return path.resolve(__dirname, url)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', resolve('./src/components'))
      .set('styles', resolve('./src/assets/styles'))
      .set('pages', resolve('./src/pages'))
      .set('utils', resolve('./src/utils'))
  },

  devServer: {
    proxy: {
      '/ajax': {
        target: 'http://m.maoyan.com',
        changeOrigin: true,
        headers: {
          referer: 'http://m.maoyan.com',
          host: 'm.maoyan.com'
        },
        hostRewrite: 'm.maoyan.com'
      }
    }
  }
}