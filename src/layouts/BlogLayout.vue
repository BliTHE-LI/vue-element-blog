<template>
  <div>
    <el-container>
      <el-header>
        <PageHeader></PageHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <PageFooter></PageFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
export default {
  name: 'BlogLayout',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>
<style lang="scss" scoped>
  .el-container {
    min-width: 960px;
  }
  .el-header {
    background-color: #333;
  }
  .el-footer {
    background-color: rgb(49, 38, 38);
  }
  .el-main {
    min-height: calc(100vh - 120px);
  }
</style>
