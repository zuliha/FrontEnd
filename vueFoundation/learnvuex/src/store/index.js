import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)
    // 2.创建对象
const store = new Vuex.Store({
    state: {
        counter: 10
    },
    mutations: { //同步操作，修改state
        // 方法
        increment(state) {
            state.counter++
        },
        decrement(state) {
            state.counter--
        },
        incrementCount(state, count) {
            state.counter += count
        },
    },
    actions: { //异步操作，修改state

    },
    getters: {
        powerCounter(state) {
            return state.counter * state.counter
        }

    },
    modules: {

    }
})

// 3.导出store对象
export default store