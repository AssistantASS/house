<template>
  <div class="dashboard-editor-container">
    <el-menu class="navbar" mode="horizontal">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
        <!-- :is-active="sidebar.opened" -->
        <Breadcrumb/>

        <div class="right-menu">

      <!-- <div class="right-menu">

        <el-tooltip content="Gitee源码" effect="dark" placement="bottom">
          <MoGuGit id="mogu-git" class="right-menu-item" />
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <MoGuDoc id="mogu-doc" class="right-menu-item" />
        </el-tooltip>

        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-tooltip>

        <el-tooltip effect="dark" content="换肤" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"></theme-picker>
        </el-tooltip>

        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item>
              <span style="display:block;" @click="aboutMe">关于我</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="showLog">更新日志</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
        <span v-if="user.name === null || user.name === '' || user.name === undefined" class="el-dropdown-link" @click="toLogin" >
            请登录
        </span>
        <el-dropdown :router="true" v-else>
           <span class="el-dropdown-link">
                {{user.userRole.name}}，{{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu :router="true" slot="dropdown">
                <el-dropdown-item @click.native="updateMessage" >修改个人信息</el-dropdown-item>
                <el-dropdown-item divided @click.native="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>

    <!-- <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-row class="panel-group" style="margin-left:20px;" :gutter="40">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="2018.12.20 更新" name="1">
            <div>增加更新日志</div>
          </el-collapse-item>
          <el-collapse-item title="2018.12.19 更新" name="2">
            <div>修改Gitee中readme页面</div>
            <div>项目地址：https://gitee.com/moxi159753/mogu_blog_v2</div>
          </el-collapse-item>
          <el-collapse-item title="2018.12.18 更新" name="3">
            <div>重新部署了线上环境</div>
            <div>线上环境地址：http://www.moguit.cn</div>
          </el-collapse-item>
        </el-collapse>
      </el-row>
    </el-dialog> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Breadcrumb from '@/views/layout/Navbar/BreadCrumb/BreadCrumb'
import Hamburger from '@/views/Hamburger'
// import Screenfull from '@/components/Screenfull'
// import ThemePicker from '@/components/ThemePicker'
// import MoGuGit from '@/components/MoGu/Git'
// import MoGuDoc from '@/components/MoGu/Doc'
// import { mapGetters } from "vuex";
export default {
  components: {
    // Screenfull,
    Breadcrumb,
    Hamburger
    // ThemePicker,
    // MoGuGit,
    // MoGuDoc
  },
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    this.user = this.$store.state.user.user
    // console.log(this.user)
  },
  computed: {
    //    ...mapGetters(["user"]),
    // ...mapGetters(["sidebar"]),
    sidebar () {
      return this.$store.state.app.sidebar
    },
    routes () {
      return this.$router.options.routes
    }
  },
  //   data () {
  //     return {
  //       dialogFormVisible: false,
  //       title: '更新日志',
  //       activeName: '1'
  //     }
  //   },
  //   computed: {
  //     ...mapGetters(['sidebar', 'avatar'])
  //   },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    toLogin () {
      this.$router.push('/login')
    },
    exit () {
      this.$message({
        message: '退出成功！',
        type: 'success'
      })
      this.$store.dispatch('user/userExit')
      this.$router.push('/login')
    },
    updateMessage () {
      this.$router.push('/person')
    }
    //     logout () {
    //       this.$store.dispatch('LogOut').then(() => {
    //         // 为了重新实例化vue-router对象 避免bug
    //         location.reload()
    //       })
    //     },
    //     showLog: function () {
    //       console.log('点击了显示日志')
    //       this.dialogFormVisible = true
    //     },
    //     aboutMe: function () {
    //       this.$router.push({path: '/system/aboutMe'})
    //     }
  }
}
</script>

<style>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;}
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    text-align: right;
    padding-right: 20px;
    }
    .right-menu:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;}
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;}
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
         .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
      /* }
    }
  }
} */
</style>
