const { defineConfig } = require('@vue/cli-service')
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
  }
})
