import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// echarts
import * as echarts from 'echarts'

// VMdPreview
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdPreview);

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