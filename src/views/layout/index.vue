<template>
    <div id="app" :class="classObj" class="app-wrapper">
        <el-container class="container" >
                <el-container class="container">
                    <div v-if="false && sidebar.opened" class="drawer-bg"></div>
                    <!-- <el-aside class="aside"> -->
                        <!-- <el-scrollbar wrapClass="scrollbar-wrapper"> -->
                            <Sidebar class="sidebar-container"/>
                        <!-- </el-scrollbar> -->
                    <!-- </el-aside> -->

                    <!-- <el-main class="main">  -->
                    <div class="main-container">
                        <Navbar/>
                        <AppMain/>
                    </div>
                     <!-- </el-main> -->
                </el-container>
            </el-container>
    </div>

</template>

<script>
import Sidebar from '@/views/layout/Sidebar/Sidebar.vue'
import AppMain from '@/views/layout/AppMain/AppMain.vue'
import Navbar from '@/views/layout/Navbar/Navbar.vue'
export default {
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  name: 'app',
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    const name = this.$route.query.name
    this.user = {
      name: name
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
        // mobile: this.device === "mobile"
      }
    }
  }
}
</script>

<style>
/* .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .grid-content{
    border-radius: 4px;
    min-height: 30px;
} */
/* .el-menu-item-group__title{
    padding: 0;
} */
* {
    padding: 0;
    margin: 0;
}
html,
body {
    height: 100%;
}

#app {
    height: 100%;
}

.container {
    height: 100%;
}

.aside {
    height: 100%;
    width: 180px !important;
    /* min-width: 200px; */
    /* max-width: 240px; */
    /* background: #545c64; */
}
/* .scrollbar-wrapper{
    height:100% ;
    overflow-x: hidden;
} */
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    /* background: #545c64; */
}
  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 180px;
    position: relative;
    width: 100%;
  }
</style>
