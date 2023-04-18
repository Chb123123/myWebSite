import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import 'animate.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$baseUrl = 'http://127.0.0.1'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
