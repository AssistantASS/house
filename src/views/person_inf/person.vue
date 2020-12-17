<template>
  <div id="register">
     <el-row type="flex" justify="center">
        <el-col :span="6">
            <div class="grid-content"></div>
        </el-col>
    </el-row>
     <el-row type="flex"  justify="center">
        <el-col :xs="{span:16}" :sm="{span:12}" :md="{span:10}" :lg="{span:8}">
          <div class="el_min_register">
            <el-card shadow="always">
                <h3 style="text-align:center">个人信息修改</h3>
                <el-divider></el-divider>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="ruleForm.gender" >
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword">
                        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="buttonGroup">
                        <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        phone: '',
        email: '',
        gender: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'number', message: '手机号必须为数字值' }
        ],
        email: [
          { required: true, message: '请选择邮箱信息', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          var name = this.ruleForm.name
          var gender = this.ruleForm.gender
          var email = this.ruleForm.email
          var password = this.ruleForm.password
          this.$router.push({path: '/register-success', query: {name, gender, email, password}})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.el-radio-group{
   justify-content: left;
   /* text-align: left; */
   /* margin: 0; */
}
.buttonGroup{
    text-align: left;
}
.grid-content{
    border-radius: 4px;
    min-height: 10px;
}
.el_min_register{
  min-width: 400px;
}
</style>
