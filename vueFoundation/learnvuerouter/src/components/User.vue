<template>
  <div>
    <h2>用户界面</h2>
    <p>我是用户的相关信息</p>
    <p>{{ userId }}</p>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: "User",
  created() {
    console.log("user created");
  },
  destroyed() {
    console.log("user destroyed");
  },
  computed: {
    userId() {
      return this.$route.params.abc;
    },
  },
  // created() {
  //   console.log('created');
  //   document.title='用户'
  // },
}
</script>

<style>
</style>
