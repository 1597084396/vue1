const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('style', resolve('src/assets/style'))
      .set('common', resolve('src/common'))
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://localhost:8080',
        target: 'https://wzbus.github.io/vue-set/#/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/mock'
        }
      }
    }
  }
}
