<template>
  <div id="app">
  <h2>------------APP内容-----------</h2>
  <h2>{{message}}</h2>
  <h2>{{$store.state.counter}}</h2>
  <button @click="addition">+</button>
  <button @click="subtraction">-</button>
   <button @click="addCount(5)">+5</button>
  <button @click="addCount(10)">+10</button>

  <h2>------------APP内容:getters相关信息-----------</h2>
  <h2>{{$store.getters.powerCounter}}</h2>

  <h2>------------HelloVuex内容-----------</h2>
  <hello-vuex :counter="counter"></hello-vuex>
  </div>
</template>

<script>
import HelloVuex from './components/HelloVuex'
export default {
  name: 'App',
  components:{
    HelloVuex
  },  
  data(){
    return{
      message:'我是APP组件',
    }
  },
  methods:{
    addition(){
      this.$store.commit('increment')
    },
    subtraction(){
      this.$store.commit('decrement')
    },
    addCount(count){
      this.$store.commit('incrementCount',count)
    }
  }
}
</script>
