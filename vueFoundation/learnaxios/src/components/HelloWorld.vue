<template>
  <h2>{{categories}}</h2>
</template>

<script>
import axios from 'axios'

export default {
  name:'HelloWorld',
  data(){
      return{
          categories:''
      }
  },
  created(){
      axios({
          url:'http://123.207.32.32:8000/category'
      }).then(res=>{
          this.categories=res;
      })
  },
  
}
</script>