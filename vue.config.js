const { defineConfig } = require('@vue/cli-service')
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/Scss/variable.scss";
          @import "@/assets/Scss/mixin.scss";
        `
      }
    }
  },
  chainWebpack: (config) => {
    /**
     * 将svg图片以雪碧图的方式在项目中加载
     */ 
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')) // svg所在路径
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        // 参数配置
        symbolId: 'icon-[name]',
      })
  },
})
