import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as echarts from 'echarts'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts

let app = new Vue({
    router,
    store,
    render: h => h(App)
})
app.$mount('#app')

// console.log(app)
// console.log(app.$store)