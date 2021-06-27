<template>
  <div id="app">
    <!--方法一  -->
    <!-- <router-link to="/home" tag="button" replace>首页</router-link> -->
    <!--router-link默认渲染为a标签,tag可以指定渲染成什么组件,属性to:用于跳转指定的路径-->
    <!-- <router-link to="/about" replace>关于</router-link> -->
    <!-- <router-view></router-view> -->

    <!-- 方法二 -->
    <!-- <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>
    <router-view></router-view> -->

    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <!-- 方法一 -->
    <router-link :to="'/user/'+userId">用户</router-link>
    <!-- <router-link to="/profile">档案</router-link> -->
    <router-link :to="{path:'/profile',query:{name:'daxia',age:18}}">档案</router-link>

    <!-- 方法二 -->
    <!-- <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button> -->

    <!-- keep-alive使组件不被销毁 -->
    <keep-alive exclude="Profile">
    <router-view></router-view> 
    </keep-alive>

    
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      userId:'zhangsan'
    }
  },
//   methods:{
//     // 通过代码的方式修改路由vue-router
//     // push=>pushState
//     homeClick(){
//       // this.$router.push('/home')
//       this.$router.replace('/home')
//       console.log('homeClick')
//     },
//     aboutClick(){
//       // this.$router.push('/about')
//       this.$router.replace('/about')
//       console.log('aboutClick');
//     },
//     userClick(){
//       this.$router.push('/user/'+this.userId)
//     },
//     profileClick(){
//       this.$router.push({
//         path:'/profile',
//         query:{
//           name:'daxia',
//           age:18
//         }
//       })
//     }
//   }
}
</script>

<style>
  .router-link-active{
    color: aquamarine;
  }
</style>
