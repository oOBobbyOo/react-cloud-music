const path = require('path')
const { override, addWebpackAlias } = require('customize-cra')

module.exports = override(
  addWebpackAlias({
    //路径别名
    '@': path.resolve(__dirname, 'src'),
    '@a': path.resolve(__dirname, 'src/assets'),
    '@c': path.resolve(__dirname, 'src/components'),
  }),
  (config) => {
    return config
  }
)
