import Vue from 'vue'
import App from './App.vue'
import elementUi from '@/element'
Vue.use(elementUi)
Vue.config.productionTip = false
// 设置element size属性
Vue.prototype.$ELEMENT = { size: 'mini' };

new Vue({
  render: h => h(App),
}).$mount('#app')
