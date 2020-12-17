<template>
  <div id="register-success">
    <el-row type="flex" justify="center">
        <el-col :span="6">
            <el-card shadow="always">
                <h1 style="text-align=center">注册成功页</h1>
                <el-divider></el-divider>
                <h3>用户名：{{user.name}}</h3>
                <h3>邮箱：{{user.email}}</h3>
                <h3>性别：{{user.gender}}</h3>
                <h3>密码：{{user.password}}</h3>
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
    const email = this.$route.query.email
    const gender = this.$route.query.gender
    const password = this.$route.query.password
    this.user = {
      name: name,
      email: email,
      gender: gender,
      password: password
    }
  }
}
</script>

<style>

</style>
