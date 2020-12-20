<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome to The LiveHouse!</div>
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    // ...mapGetters([
    //   'user'
    // ])
  },
  data () {
    return {
      value: new Date()
    }
  }
}
</script>

<style>
.dashboard-container {
   margin: 30px;
  }
.dashboard-text {
    font-size: 20px;
    line-height: 46px;
    text-align: center;
  }
</style>
