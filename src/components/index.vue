<template>
  <div>
      {{msg}}
      <button @click="test">test</button>
      <el-tag>标签一</el-tag>
    <el-tag type="success">标签二</el-tag>
    <el-tag type="info">标签三</el-tag>
    <el-tag type="warning">标签四</el-tag>
    <el-tag type="danger">标签五</el-tag>
      <!-- <router-view :msg="msg"></router-view> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'i am index'
    }
  },
  methods: {
    test () {
      this.$router.push({ path: '/test', query: {msg: this.msg} })
    }
  }
}
</script>

<style>

</style>
