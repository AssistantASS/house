<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome to The LiveHouse!</div>
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
  }
</style>
