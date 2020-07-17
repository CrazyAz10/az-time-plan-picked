import Vue from 'vue'
import App from './App.vue'
import './styles/element-variables.scss'
import ElementUI from 'element-ui'
Vue.use(ElementUI, {
  size: 'mini' // set element-ui default size
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
