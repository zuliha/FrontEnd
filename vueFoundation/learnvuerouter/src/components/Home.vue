<template>
  <div>
    <h2>我是首页</h2>
    <!-- 路由嵌套，在组件内部使用 -->
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  path:'/home/news',
  created() {
    console.log("home created");
  },
  destroyed() {
    console.log("home destroyed");
  },

  // 这两个函数只有该组件被保持了状态使用了keep-alive时才是有效的
  activated() {
    this.$router.push(this.path).catch(err=>err)
  },
  // deactivated() {
  //   console.log("deactivated");
  // },

  // 组件内的导航守卫
  beforeRouteLeave(to, from, next) {
    console.log(this.$route.path);
    this.path = this.$route.path;
    next();
  },
};
</script>

<style>
</style>
