<template>
  <div id="app">
    <el-container>
<!-- 模态框 -->
      <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible"  v-show="dialogFormVisible">
        <span>
          <el-form :inline="true" :model="user" class="demo-form" size="mini" :rules="rules" ref="user">
            <el-divider content-position="left">基本信息</el-divider>
             <el-form-item label="姓名：" prop="name">
              <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
              <el-form-item label="邮箱：" prop="email">
              <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
             <el-form-item label="手机号：" prop="phone">
              <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <!-- <el-form-item label="用户角色：" prop="userRoleName">
              <el-input v-if="user.userRole" v-model="user.userRole.name" placeholder="0-100"></el-input>
            </el-form-item> -->
            <el-form-item label="用户角色：" prop="userRoleName">
              <el-radio-group v-if="user.userRole" v-model="user.userRole.name">
                <template v-for="(role,index) in userRoles">
                  <el-radio :label="role.name" :key="index"></el-radio>
                </template>
              </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="性别：" prop="gender" class="e_radio">
              <el-radio-group v-model="user.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close()">取 消</el-button>
          <el-button type="success" @click="addAndUpdateUser('user')">确 定</el-button>
        </span>
      </el-dialog>
<!-- 主界面 -->
      <el-header>
        <!-- <div class="i1"><i class="el-icon-edit">简易学生成绩管理系统</i></div> -->
        <div class="refresh"><i class="el-icon-refresh" @click="fetch()"><el-link>刷新</el-link></i></div>
      </el-header>
      <el-form :inline="true" :model="xuser" class="demo-form-inline" size="mini" ref="xuser">
        <!-- <el-form-item label="用户id:" prop="user_id" >
          <el-input v-model="xuser.user_id" placeholder="精确查询"></el-input>
        </el-form-item> -->
        <el-form-item label="用户姓名:" prop="name" >
          <el-input v-model="xuser.name" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('xuser')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="add()">录入</el-button>
        </el-form-item>
      </el-form>
      <el-main>
        <el-table :data="userList" border style="width: 100%;" v-loading="loading">
          <el-table-column :resizable="false" prop="user_id" label="用户id" min-width="50%" ></el-table-column>
          <el-table-column :resizable="false" prop="name"  label="姓名" min-width="50%"></el-table-column>
          <el-table-column :resizable="false" prop="gender"  label="性别"  min-width="30%"></el-table-column>
          <el-table-column :resizable="false" prop="email"  label="邮箱" min-width="70%"></el-table-column>
          <el-table-column :resizable="false" prop="phone"  label="手机号"  min-width="50%"></el-table-column>
          <el-table-column :resizable="false" prop="password"  label="密码"  min-width="50%"></el-table-column>
          <el-table-column :resizable="false" prop="userRole.name"  label="用户角色" min-width="50%"></el-table-column>
          <el-table-column :resizable="false" fixed="right"  label="操作" >
            <template slot-scope="scope">
              <el-button @click="edit(scope.row.user_id)" type="primary" size="small">编辑</el-button>
              <el-button @click="remove(scope.row.user_id)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 页码： -->
          <!-- <div float="left" style="font-size:12px;color:info">一共有{{page.total}}条记录</div> -->
          <div class="block" style='text-align:right;margin-top:10px'>
            <el-pagination
              @current-change="currentChange"
              layout="prev, pager, next, total"
              :page-size="page.size"
              :current-page="page.current"
              :total="page.total">
            </el-pagination>
          </div>

      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      userList: [],
      currentList: [],
      xuser: {
        // user_id: '',
        name: ''
      },
      dialogTitle: '',
      dialogFormVisible: false,
      // 模态框的数据
      user: [],
      userRoles: [],
      formInline: {
        user: '',
        region: ''
      },
      // 分页：
      page: {
        current: 1,
        size: 5,
        total: 0
      },
      rules: {
        // "xuser.user_id": [
        //   {required: true, message: '用户id不可为空', trigger: 'blur'},
        //   {type:'number',message:'输入数字字符',trigger:'blur'}
        // ],
        name: [
          { required: true, message: '姓名不可为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请选择邮箱信息', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
        // userRoleName: [
        //   { required: true, message: '角色不可为空', trigger: ['blur', 'change'] }
        // ]
      },
      loading: true
    }
  },
  created () {
    // this.fetch();
    this.pageInation()
  },
  methods: {
    // 无分页显示用户列表：
    fetch (msg) {
      if (msg !== 1) {
        this.$message({
          message: '刷新成功',
          type: 'success'
        })
      }
      this.xuser.name = ''
      this.page.current = 1
      this.pageInation()
      //     // this.$http.get('getUserList').then(res=>{
      //     //   console.log('返回的数据：')
      //     //   console.log(res.data)
      //     //   this.userList = res.data
      //     // });
      //     this.xuser.name = '';
      //     this.page.current = 1;
      //     this.pageInation();
    },
    pageInation (users) {
      let that = this
      // 每次点击更改页码值
      // console.log(users)
      if (users === null || users === undefined) {
        this.$http.get('findUsers?currentPage=' + that.page.current + '&pageSize=' + that.page.size).then(res => {
          this.page.total = res.data.users.length
          var resData = res.data.users
          // console.log(resData)
          // resData.skip((that.page.current - 1) * that.page.size).limit(that.page.size)
          var c = 0 + (that.page.current - 1) * that.page.size
          var c2 = that.page.current * that.page.size
          for (var i = c; i < c2; i++) {
            this.currentList.push(resData[i])
            // console.log(i)
            if (i === resData.length - 1) {
              break
            }
          }
          this.userList = this.currentList
          this.currentList = []
          this.loading = false
        })
      } else {
        if (users.length !== 0) {
          var c = 0 + (that.page.current - 1) * that.page.size
          var c2 = that.page.current * that.page.size
          for (var i = c; i < c2; i++) {
            this.currentList.push(users[i])
            // console.log(i)
            if (i === users.length - 1) {
              break
            }
          }
          this.userList = this.currentList
          this.currentList = []
          this.loading = false
        } else {
          this.userList = null
        }
      }

      // console.log(this.userList)
      // if (res.data === null || res.data.length === 0) {
      //   // 除第一页的其他某页全都删除了的情况：
      //   that.page.current = that.page.current - 1
      //   that.pageInation()
      // } else {
      //   that.userList = res.data
      //   that.page.total = res.data.total
      // }
    },
    currentChange (current) {
      // console.log(current)
      this.loading = true
      this.page.current = current
      // 姓名模糊查询的分页：
      if (this.xuser.name !== '') {
        this.$http.get('findUsers?name=' + this.xuser.name).then(res => {
          // console.log(res.data)
          this.page.total = res.data.users.length
          var fuzzyUsers = res.data.users
          this.pageInation(fuzzyUsers)
        })
        return
      }
      this.pageInation()
    },
    // 录入和修改：
    addAndUpdateUser (formName) {
      this.dialogFormVisible = false
      if (this.dialogTitle === '录入学生信息') {
        this.addUser(formName)
      } else {
        this.ConfirmUpdateUser(this.user_id, formName)
      }
    },
    // 新增用户：
    add () {
      this.dialogTitle = '录入学生信息'
      this.dialogFormVisible = true
    },
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$http.post('students', this.user).then(() => {
          //   // 清空录入框信息：
          //   this.user = {}
          //   // 隐藏录入框：
          //   this.dialogFormVisible = false
          //   this.$message({
          //     message: '录入成功',
          //     type: 'success'
          //   })
          //   this.page.current = 1
          //   this.pageInation()
          // })
          this.$http({
            url: 'send',
            method: 'post',
            params: {
              email: this.user.email
            },
            headers: {
              'Content-Type': 'application/x-www-form-json'
            }
          }).then(() => {
            this.dialogFormVisible = false
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.user = {}
            // this.page.current = 1;
            this.pageInation()
          })
        } else {
          console.log('error submit!!')
          this.dialogFormVisible = true
          return false
        }
      })
    },
    // 修改用户：
    edit (id) {
      this.id = id
      this.dialogTitle = '修改用户信息'
      this.$http.get(`findUsers?user_id=${id}`).then(res => {
        this.user = res.data.users[0]
        this.userRoles = res.data.userRoles.filter((item) => {
          return item.role_id !== 5 && item.role_id !== 3
        })
        this.dialogFormVisible = true
      })
    },
    ConfirmUpdateUser (id, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.user)
          var userRoleDemo = this.userRoles
          var userToRole = userRoleDemo.filter(item => {
            return item.name === this.user.userRole.name
          })
          console.log(userToRole)
          this.user.userRole = userToRole[0]
          this.user.role_id = this.user.userRole.role_id
          console.log(this.user)

          // this.$http.post(`updateUser?user_id=22&name=vm`).then(() => {
          //   this.dialogFormVisible = false
          //   this.$message({
          //     message: '更新成功',
          //     type: 'success'
          //   })
          //   this.user = {}
          //   // this.page.current = 1;
          //   this.pageInation()
          // })
          this.$http({
            url: 'updateUser',
            method: 'post',
            params: {
              userdto: this.user
            },
            headers: {
              'Content-Type': 'application/x-www-form-json'
            }
          }).then(() => {
            this.dialogFormVisible = false
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.user = {}
            // this.page.current = 1;
            this.pageInation()
          })
        } else {
          console.log('error submit!!')
          this.dialogFormVisible = true
          return false
        }
      })
    },
    // 删除用户：
    remove (id) {
      this.$confirm('确认删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`deleteUserByUserId?user_id=${id}`).then(() => {
          this.$message({
            message: '删除用户成功!',
            type: 'success'
          })
          // this.page.current = 1;
          var msg = 1
          this.fetch(msg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        })
      })
    },
    // 关闭模态框：
    close () {
      if (this.dialogTitle === '修改学生信息') {
        this.user = {}
      }
      this.dialogFormVisible = false
    },
    onSubmit (ruleForm) {
      // 用户id不为空，姓名为空，进行精确查询
      // if (this.xuser.user_id !== '' && this.xuser.name === '') {
      //   this.$refs[ruleForm].validate((valid) => {
      //     if (valid) {
      //       // 根据用户id精确查询：
      //       alert(this.xuser.user_id)
      //       this.$http.get(`findByuserid/${this.xuser.user_id}`).then(res => {
      //         console.log('用户id查询')
      //         console.log(res.data)
      //         this.userList = res.data
      //         this.xuser.user_id = ''
      //         this.page.total = 0
      //         // this.pageInation();
      //       })
      //     } else {
      //       this.message('请输入3位数字用户id', 'error')
      //       return false
      //     }
      //   })
      // } else if (this.xuser.user_id === '' && this.xuser.name !== '') {
      //   // 用户id为空，姓名不为空，进行模糊查询
      //   this.$refs[ruleForm].validate((valid) => {
      //     if (valid) {
      //       console.log('姓名查询')
      //       // 根据姓名模糊查询：
      //       this.$http.get('findByName?currentPage=' + this.page.current + '&pageSize=' + this.page.size + '&names=' + this.xuser.name).then(res => {
      //         console.log('姓名模糊分页查询结果：')
      //         console.log(res.data)
      //         this.userList = res.data.data
      //         this.page.total = res.data.total
      //       })
      //     } else {
      //       this.message('不要输入太奇葩的字符', 'warning')
      //       return false
      //     }
      //   })
      // }// 用户id和姓名都为空
      // else {
      //   if (this.xuser.user_id === '' && this.xuser.name === '') {
      //     this.message('请输入有效字符', 'error')
      //   }
      // }
      if (this.xuser.name !== '') {
        // 用户id为空，姓名不为空，进行模糊查询
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            // 根据姓名模糊查询：
            this.$http.get('findUsers?name=' + this.xuser.name).then(res => {
              // console.log(res.data)
              this.page.total = res.data.users.length
              // this.userList = res.data.data
              // this.page.total = res.data.total
              var fuzzyUsers = res.data.users
              console.log(fuzzyUsers)
              this.page.current = 1
              this.pageInation(fuzzyUsers)
            })
          } else {
            this.message('不要输入太奇葩的字符', 'warning')
            return false
          }
        })
      } else {
        // 用户id和姓名都为空
        if (this.xuser.name === '') {
          this.message('请输入有效字符', 'error')
        }
      }
    },
    // 消息通知框：
    message (messages, mtype) {
      this.$message({
        message: messages,
        type: mtype
      })
    }
  }

}
</script>
<style>

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    /* text-align: center; */
    line-height: 60px;
  }
.i1{
  text-align: center;
}
.refresh{
  cursor: pointer;
  text-align: right;
}
  /* .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  } */
.el-form{
  text-align: center;
  justify-content: center;
  margin-top: 40px;
}
.e_radio{
  overflow: hidden;
}
</style>
