<template>
  <div id="app">
    <el-container>
<!-- 模态框 -->
      <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible"  v-show="dialogFormVisible">
        <span>
          <el-form :inline="true" :model="user" class="demo-form" size="mini" :rules="rules" ref="user">
            <el-divider content-position="left">基本信息</el-divider>
             <el-form-item label="姓名：" prop="name">
              <!-- <el-input  v-model="user.real_name" disabled></el-input> -->
              <span>{{user.real_name}}</span>
            </el-form-item>
             <!-- <el-form-item label="照片：" prop="photo_name" v-if="user.photo_name !== null">
              <img style="width: 100px; height: 100px" :src="require('../../assets/imgs/'+user.photo_name)" alt="" >
            </el-form-item> -->
            <br>
             <el-form-item label="状态：" prop="status" class="e_radio">
              <el-radio-group v-model="user.status">
                <el-radio label="未通过"></el-radio>
                <el-radio label="已通过"></el-radio>
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
          <el-table-column :resizable="false" prop="real_name"  label="姓名" min-width="40%"></el-table-column>
          <el-table-column :resizable="false" prop="user.phone"  label="手机号"  min-width="65%"></el-table-column>
          <el-table-column :resizable="false" prop="work_time"  label="从业时间(年)" min-width="65%"></el-table-column>
          <el-table-column :resizable="false" prop="star"  label="评分"  min-width="65%"></el-table-column>
          <el-table-column :resizable="false" prop="status"  label="状态"  min-width="30%"></el-table-column>
          <el-table-column :resizable="false" fixed="right"  label="操作">
            <template slot-scope="scope">
              <el-button  v-if="scope.row.status !== '已通过' " @click="edit(scope.row.user_id)" type="primary" size="small">编辑</el-button>
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
      // 分页：
      page: {
        current: 1,
        size: 5,
        total: 0
      },
      rules: {
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
    },
    pageInation (users) {
      let that = this
      // 每次点击更改页码值
      // console.log(users)
      if (users === null || users === undefined) {
        this.$http.get('findAgent').then(res => {
        //   console.log(res.data)
          this.page.total = res.data.length
          var resData = res.data
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
          for (var j = 0; j < this.userList.length; j++) {
            if (this.userList[j].status === 0) {
              this.userList[j].status = '待审核'
            } else if (this.userList[j].status === 1) {
              this.userList[j].status = '已通过'
            } else {
              this.userList[j].status = '未通过'
            }
          }
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
          for (var j = 0; j < this.userList.length; j++) {
            if (this.userList[j].status === 0) {
              this.userList[j].status = '待审核'
            } else if (this.userList[j].status === 1) {
              this.userList[j].status = '已通过'
            } else {
              this.userList[j].status = '未通过'
            }
          }
          this.currentList = []
        } else {
          this.userList = null
        }
      }
    },
    currentChange (current) {
      // console.log(current)
      this.page.current = current
      // 姓名模糊查询的分页：
      if (this.xuser.name !== '') {
        this.$http.get('findAgent?real_name=' + this.xuser.name).then(res => {
          // console.log(res.data)
          this.page.total = res.data.length
          var fuzzyUsers = res.data
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
          this.$http.post('students', this.user).then(() => {
            // 清空录入框信息：
            this.user = {}
            // 隐藏录入框：
            this.dialogFormVisible = false
            this.$message({
              message: '录入成功',
              type: 'success'
            })
            this.page.current = 1
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
      this.dialogTitle = '审批用户'
      this.$http.get(`findAgent?user_id=${id}`).then(res => {
        console.log(res.data[0])
        this.user = res.data[0]
        this.user.photo = null
        this.user.photo_save_path = null
        this.user.id_card_picture_r = null
        this.dialogFormVisible = true
      })
    },
    ConfirmUpdateUser (id, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.user)
          console.log(this.user.status)
          if (this.user.status === '已通过') {
            this.user.status = 1
          } else {
            this.user.status = 2
          }
          console.log(this.user.status)
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
            url: 'adminUpdateAgent',
            method: 'post',
            params: {
              agentDTO: this.user
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
      // 用户id为空，姓名不为空，进行模糊查询
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 根据姓名模糊查询：
          this.$http.get('findAgent?real_name=' + this.xuser.name).then(res => {
            // console.log(res.data)
            this.page.total = res.data.length
            // this.userList = res.data.data
            // this.page.total = res.data.total
            var fuzzyUsers = res.data
            console.log(fuzzyUsers)
            this.page.current = 1
            this.pageInation(fuzzyUsers)
          })
        } else {
          this.message('不要输入太奇葩的字符', 'warning')
          return false
        }
      })
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
