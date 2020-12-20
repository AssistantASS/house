<template>
  <div id="app">
    <el-container>
<!-- 模态框 -->
      <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible"  v-show="dialogFormVisible">
        <span>
          <el-form :inline="true" :model="user" class="demo-form" size="mini"  ref="user">
            <el-divider content-position="left">基本信息</el-divider>
            <el-form-item label="评论图片：" prop="id_card_picture_f_path"  v-if="user.user">
              <img style="width: 100px; height: 100px" :src="require('../../assets/imgs/'+user.picture_name)" alt="" >
            </el-form-item>
            <br>
            <el-form-item label="用户：" prop="name">
              <!-- <el-input v-if="user.user" v-model="user.user.name"></el-input> -->
              <span v-if="user.user">{{user.user.name}}</span>
            </el-form-item>
            <br>
            <el-form-item label="评论：" prop="opinion">
              <!-- <el-input v-model="user.opinion"></el-input> -->
              <span v-if="user.user">{{user.opinion}}</span>
            </el-form-item>
            <br>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close()">取 消</el-button>
          <el-button type="success" @click="addAndUpdateUser('user')">确 定</el-button>
        </span>
      </el-dialog>
        <!-- 测试添加图片 -->
       <el-dialog :title="dialogTitleTest"  :visible.sync="dialogFormVisibleTest"  v-show="dialogFormVisibleTest">
        <span>
          <el-form :inline="true" :model='userTest' class="demo-form" size="mini" :rules="rules" ref="userTest">
            <el-divider content-position="left">基本信息</el-divider>
            <el-form-item label="用户id：" prop="user_id">
              <el-input v-model="userTest.user_id"></el-input>
              <!-- <span v-if="user.user">{{user.user.name}}</span> -->
            </el-form-item>
            <el-form-item label="房子id：" prop="house_id">
              <el-input v-model="userTest.house_id"></el-input>
              <!-- <span v-if="user.user">{{user.user.name}}</span> -->
            </el-form-item>
            <el-form-item label="评论：" prop="opinion">
              <el-input v-model="userTest.opinion"></el-input>
              <!-- <span v-if="user.user">{{user.user.name}}</span> -->
            </el-form-item>
            <!-- <el-form-item label="上传图片：" prop="picture">
              <el-input v-model="userTest.picture"></el-input>
            </el-form-item> -->
            <br>
             <el-form-item label="上传图片" :label-width="formLabelWidth">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload="false"
                :on-progress="handleUpload"
                :on-success="handleSuccess"
                :file-list="fileList"
                ref="handle"
                >
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <!-- <el-button type="primary" @click="uploader">上传</el-button> -->
            </el-form-item>
            <br>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close()">取 消</el-button>
          <el-button type="success" @click="addUser('userTest')">确 定</el-button>
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
        <el-form-item label="房屋名称:" prop="title" >
          <el-input v-model="xuser.title" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('xuser')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="add()">添加</el-button>
        </el-form-item>
      </el-form>
      <el-main>
        <el-table :data="userList" border style="width: 100%;"  v-loading="loading">
          <el-table-column :resizable="false" prop="user.name"  label="评论人" min-width="40%"></el-table-column>
          <el-table-column :resizable="false" prop="house.title"  label="房屋名称"  min-width="40%"></el-table-column>
          <el-table-column :resizable="false" prop="house.city"  label="房屋所在城市" min-width="60%"></el-table-column>
          <el-table-column :resizable="false" prop="house.region"  label="房屋所在地区"  min-width="50%"></el-table-column>
          <el-table-column :resizable="false" prop="house.address"  label="房屋地址"  min-width="80%"></el-table-column>
          <el-table-column :resizable="false" prop="opinionCount.count"  sortable label="点赞数" min-width="30%"></el-table-column>
          <el-table-column :resizable="false" fixed="right"  label="操作"  min-width="40%">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row.opinion_id)" type="primary" size="small">查看</el-button>
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
        name: '',
        title: ''
      },
      dialogTitle: '',
      dialogFormVisible: false,
      dialogTitleTest: '',
      dialogFormVisibleTest: false,
      // 模态框的数据
      user: [],
      // 添加评论
      userTest: {
        file: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      formLabelWidth: '80px',

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
    fetch () {
      this.xuser.name = ''
      this.xuser.title = ''
      this.$message({
        message: '刷新成功',
        type: 'success'
      })
      this.page.current = 1
      this.pageInation()
    },
    pageInation (users) {
      let that = this
      // 每次点击更改页码值
      // console.log(users)
      if (users === null || users === undefined) {
        this.$http.get('findOpinion').then(res => {
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
        } else {
          this.userList = null
        }
      }
    },
    currentChange (current) {
      // console.log(current)
      this.page.current = current
      // 姓名模糊查询的分页：
      if (this.xuser.name !== '' || this.xuser.title !== '') {
        this.$http.get('findOpinion?name=' + this.xuser.name + '&title=' + this.xuser.title).then(res => {
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
      this.dialogTitleTest = '录入评论信息'
      this.userTest = {}
      this.dialogFormVisibleTest = true
    },
    addUser (formName) {
      this.dialogFormVisibleTest = false
      this.$refs.handle.submit()
      // this.uploader(formName)
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$http({
      //       url: 'send',
      //       method: 'post',
      //       params: {
      //         email: this.user.email
      //       },
      //       headers: {
      //         'Content-Type': 'application/x-www-form-json'
      //       }
      //     }).then(() => {
      //       this.dialogFormVisible = false
      //       this.$message({
      //         message: '更新成功',
      //         type: 'success'
      //       })
      //       this.user = {}
      //       // this.page.current = 1;
      //       this.pageInation()
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     this.dialogFormVisible = true
      //     return false
      //   }
      // })
    },
    // 修改用户：
    edit (id) {
      this.id = id
      this.dialogTitle = '查看用户评论'
      this.$http.get(`findOpinion?opinion_id=${id}`).then(res => {
        this.user = res.data[0]
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
          this.fetch()
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
      if (this.dialogTitle === '查看用户评论') {
        this.user = {}
      }
      this.dialogFormVisible = false
    },
    onSubmit (ruleForm) {
    //   if () {
      // 用户id为空，姓名不为空，进行模糊查询
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 根据姓名模糊查询：
          this.$http.get('findOpinion?name=' + this.xuser.name + '&title=' + this.xuser.title).then(res => {
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

    //   else {
    //     // 用户id和姓名都为空
    //     if (this.xuser.name === '') {
    //       this.message('请输入有效字符', 'error')
    //     }
    //   }
    },
    // 消息通知框：
    message (messages, mtype) {
      this.$message({
        message: messages,
        type: mtype
      })
    },
    handleUpload (event, file, fileList) {
      let formData = new FormData()
      console.log(this.userTest.user_id)
      console.log(this.userTest.house_id)
      console.log(this.userTest.opinion)
      console.log(file.raw)
      formData.append('mpf', file.raw)
      formData.append('uid', 10)
      this.$http({
        url: 'insertOpinion',
        method: 'post',
        data: formData,
        params: {
          userOpinionDTO: this.userTest
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.pageInation()
    },
    handleSuccess (res, file, fileList) {
      this.$notify.success({
        title: '成功',
        message: `图片上传成功`
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.$refs.handle.clearFiles()
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploader () {
      // console.log(this.$refs.handle)
      // this.$refs.handle1.handleUpload()
      this.$refs.handle.submit()
      // let formData = new FormData()
      // formData.append('file', this.form.file)
      // console.log(this.form.file.raw)
      // this.$http.post('insertOpinionTest', formData,
      //   { 'Content-Type': 'multipart/form-data' }
      // )
      //   .then(res => {
      //     console.log('res')
      //     console.log(res)
      //   })
    }
  }

}
</script>
<style>
body {
    margin: 0;
  }
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
