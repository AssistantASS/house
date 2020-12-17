<template>
  <div id="login-success">
    <el-row type="flex" justify="center">
        <el-col :span="6">
            <el-card shadow="always">
                <h1 style="text-align=center">登录成功页</h1>
                <el-divider></el-divider>
                <h3>用户名为：{{user.name}}</h3>
                <h3>密码为：{{user.password}}</h3>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  mounted () { // 改变当前路由组件参数数据时, 不会重新创建组件对象, mounted不会重新执行
    const name = this.$route.query.name
    const password = this.$route.query.password
    this.user = {
      name: name,
      password: password
    }
  }
}
</script>

<style>

</style>
