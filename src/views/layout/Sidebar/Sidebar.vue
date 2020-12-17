<template>
<div class="container">
    <!-- <el-row class="container">
        <el-col :span="24" class="container"> -->
            <el-scrollbar class="scrollbar-wrapper" wrap-style="overflow-x:hidden;" view-style="font-weight: bold;height:100%;">
              <el-menu :router="true" mode="vertical" :default-active="$route.path" class="el-menu-vertical-demo container"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
              :collapse="isCollapse">
                  <template v-for="(item,index) in items">
                      <el-submenu :index="index+''" :key="index">
                          <template slot="title">
                              <i :class="item.parent.icon"></i>
                              <span>{{item.parent.name}}</span>
                          </template>
                          <template v-for="(child,index) in item.children">
                              <el-menu-item v-if="user.name === null || user.name === '' || user.name === undefined"  @click.native="toLogin" :key="index">{{child.name}}</el-menu-item>
                              <el-menu-item v-else :index="child.url" :key="child.name">{{child.name}}</el-menu-item>
                              <!-- <el-submenu index="1-1">
                                  <template slot="title">title1-1</template>
                                  <el-menu-item index="1-1-1">title1-1-1</el-menu-item>
                              </el-submenu> -->
                          </template>
                      </el-submenu>
                      <!-- <el-submenu index="2">
                          <template slot="title">
                              <i class="el-icon-menu"></i>
                              <span>title2</span>
                          </template>
                          <el-menu-item index="2-1">title2-1</el-menu-item>
                          <el-menu-item index="2-2">title2-2</el-menu-item>
                          <el-menu-item index="2-3">title2-3</el-menu-item>
                      </el-submenu>
                      <el-submenu index="3">
                          <template slot="title">
                              <i class="el-icon-menu"></i>
                              <span>title3</span>
                          </template>
                          <el-menu-item index="3-1">title3-1</el-menu-item>
                          <el-menu-item index="3-2">title3-2</el-menu-item>
                          <el-menu-item index="3-3">title3-3</el-menu-item>
                      </el-submenu>
                      <el-submenu index="4">
                          <template slot="title">
                              <i class="el-icon-menu"></i>
                              <span>title1</span>
                          </template>
                          <el-menu-item index="1-1">title1-1</el-menu-item>
                          <el-menu-item index="1-2">title1-2</el-menu-item>
                          <el-menu-item index="1-3">title1-3</el-menu-item>
                      </el-submenu> -->
                  </template>
              </el-menu>
            </el-scrollbar>
        <!-- </el-col>
    </el-row> -->
</div>
</template>

<script>

export default {
  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      user: {},
      items: [
        {
          parent: {
            name: '用户管理',
            icon: 'el-icon-user-solid'
          },
          children: [
            {
              name: '用户管理',
              url: '/user/permisson_manager'
            },
            {
              name: '房东审核',
              url: '/user/landlord_audit'
            },
            {
              name: '经纪人审核',
              url: '/user/agent_audit'
            }
          ]
        },
        {
          parent: {
            name: '租房管理',
            icon: 'el-icon-s-home'
          },
          children: [
            {
              name: '查询约看信息',
              url: '/houseRend/houseRendMessage'
            },
            {
              name: 'title1-2',
              url: '/1/1-2'
            },
            {
              name: 'title1-3',
              url: '/1/1-3'
            }
          ]
        },
        {
          parent: {
            name: '房源信息管理',
            icon: 'el-icon-s-shop'
          },
          children: [
            {
              name: '房源信息查询',
              url: '/houseSource/houseSourceMessage'
            },
            {
              name: '查看房屋评论',
              url: '/houseSource/comments'
            },
            {
              name: 'title1-3',
              url: '/houseSource/1-3'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    // console.log(this.$route)
    this.user = this.$store.state.user.user
    console.log(this.user)
    if (this.user.role_id === 2) {
      this.items = [
        {
          parent: {
            name: '房源信息管理',
            icon: 'el-icon-s-shop'
          },
          children: [
            {
              name: '房源信息查询',
              url: '/houseSource/houseSourceMessage'
            },
            {
              name: '查看房屋评论',
              url: '/houseSource/comments'
            },
            {
              name: 'title1-3',
              url: '/1/1-3'
            }
          ]
        }
      ]
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    routes () {
      return this.$router.options.routes
    }
  },
  methods: {
    goTo () {
      // if(child.isJumpExternalUrl == 1) {
      //     window.open(child.url)
      // } else {
      //     this.$router.push({path: child.url})
      // }
      // this.$router.push({path:child.url})
    },
    toLogin () {
      this.$message.error('请先登录！')
    }
  }
}
</script>

<style>
.container{
    height: 100%;
}
.scrollbar-wrapper{
    height:100% ;
    overflow-x: hidden;
}
</style>
