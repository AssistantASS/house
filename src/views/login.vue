<template>
  <div id="login">
    <el-row type="flex" justify="center">
        <el-col :span="6">
            <div class="grid-content"></div>
        </el-col>
    </el-row>
     <el-row type="flex" justify="center" >
        <el-col :xs="{span:18}" :sm="{span:12}" :md="{span:10}" :lg="{span:8}">
            <div class="el_min_login">
            <el-card shadow="always">
                <h3 style="text-align:left">登录验证</h3>
                <el-divider></el-divider>
                <el-form :model="ValidateForm" ref="ValidateForm" label-width="100px" class="demo-ruleForm">
                <!-- 账号 -->
                <el-form-item
                    label="邮箱"
                    prop="email"
                    :rules="[
                    { required: true, message: '邮箱不能为空'},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]"
                >
                    <el-input type="email" placeholder="请输入邮箱" v-model="ValidateForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item
                    label="密码"
                    prop="password"
                    :rules="[
                    { required: true, message: '密码不能为空'},
                    ]"
                >
                    <!-- <el-input type="name" v-model="ValidateForm.name" autocomplete="off"></el-input> -->
                    <el-input placeholder="请输入密码" v-model="ValidateForm.password" show-password></el-input>
                </el-form-item>

                <el-radio-group v-model="radio">
                    <el-radio  :label=true>仅前端参考</el-radio>
                    <el-radio  :label=false>发送给后端</el-radio>
                </el-radio-group>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ValidateForm')">提交</el-button>
                    <el-button @click="resetForm('ValidateForm')">重置</el-button>
                </el-form-item>
                </el-form>

                <el-row :gutter="24">
                  <el-col :span="14" :offset="10"><el-link type="info" style="text-align:right;" @click="toRegister">还没有账号，立即注册>></el-link></el-col>
                </el-row>
            </el-card>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ValidateForm: {
        email: '',
        password: ''
      },
      radio: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('Name:' + this.ValidateForm.name + '\n' + 'Password:' + this.ValidateForm.password)
          this.$http.post('login?email=' + this.ValidateForm.email + '&password=' + this.ValidateForm.password).then(res => {
            if (res.data.length !== 0) {
              // console.log(res.data)
              if (res.data.role_id === 1 || res.data.role_id === 2) {
                this.$message({
                  message: '登录成功！',
                  type: 'success'
                })
                this.$store.dispatch('user/userLogin', res.data)
                this.$router.push({path: `/`})
              } else {
                this.$message.error('该账号不是管理人员！')
              }
            } else {
              console.log(res)
              this.$message.error('登录失败！')
            }
          }).catch(err => {
            console.log(err)
            // this.$message.error('登录失败！')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
.el-radio-group{
    display: flex;
    margin: 20px;
    justify-content: center;
}
.grid-content{
    border-radius: 4px;
    min-height: 30px;
}
.demo-ruleForm{
  max-width: 350px;
}
.el_min_login{
  min-width: 400px;
}
</style>
