import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
    router: Router,
    store: Store,
    render: h => h(App)
}).$mount('#app')
