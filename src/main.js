import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import VueRoute from './router/route.js'
// 全局组件
import EcText from './components/EcText'
import EcImage from './components/EcImage'
import elementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './style/main.scss'
Vue.config.productionTip = false
Vue.use(Router)
Vue.use(elementUI)
Vue.prototype.$axios = axios
let components = [EcText, EcImage]
components.forEach(item => {
  Vue.component(item.name, item)
})
const router = new Router({
  routes: VueRoute
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
