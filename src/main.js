import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { maybe } from './utils/utils'
import Antd from 'ant-design-vue'

import '@/scss/common.scss'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Antd)

Vue.mixin({
  methods: {
	maybe,
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')