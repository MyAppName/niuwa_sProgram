import Vue from 'vue'
import App from './App'
import pm from "./utils/publicMethod.js"

Vue.config.productionTip = false
Vue.prototype.$consturl = "https://www.985-211.com.cn/cloud/"
Vue.prototype.$pm=pm
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
