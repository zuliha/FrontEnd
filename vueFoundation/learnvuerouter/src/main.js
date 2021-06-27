import Vue from 'vue'
import App from './App'
import router from './router/index'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    // 挂载router
    router,
    render: h => h(App)
})