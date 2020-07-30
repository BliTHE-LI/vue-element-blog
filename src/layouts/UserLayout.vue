<template>
  <div class="user-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'UserLayout'
}
</script>

<style lang="scss" scoped>
  .user-layout {
    width: 100vw;
    height: 100vh;
    background-color: #333;
    position: absolute;
    overflow-y: auto;
  }
</style>
