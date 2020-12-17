<template>
  <div id="app">
    <el-container>
<!-- 模态框 -->
      <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible"  v-show="dialogFormVisible">
        <span>
          <el-form :inline="true" :model="user" class="demo-form" size="mini" :rules="rules" ref="user" v-loading="loading">
            <el-divider content-position="left">房屋配置</el-divider>
            <div v-if="user.allocation">
                <el-tag v-if="user.allocation.tv === 1"><span>电视</span></el-tag>
                <el-tag v-if="user.allocation.refrigerator === 1"><span>冰箱</span></el-tag>
                <el-tag v-if="user.allocation.washing_machine === 1"><span>洗衣机</span></el-tag>
                <el-tag v-if="user.allocation.air_condition === 1"><span>空调</span></el-tag>
                <el-tag v-if="user.allocation.wifi === 1"><span>WI-FI</span></el-tag>
                <el-tag v-if="user.allocation.beds === 1"><span>床</span></el-tag>
                <el-tag v-if="user.allocation.water_heater === 1"><span>热水器</span></el-tag>
                <el-tag v-if="user.allocation.chest === 1"><span>衣柜</span></el-tag>
                <el-tag v-if="user.allocation.desk === 1"><span>书桌</span></el-tag>
                <el-tag v-if="user.allocation.cooking === 1"><span>厨具</span></el-tag>
            </div>
            <br>
             <el-divider content-position="left">房屋特色</el-divider>
             <div v-if="user.feature">
                <el-tag type="success" v-if="user.feature.independent_bathroom  === 1"><span>独立卫浴</span></el-tag>
                <el-tag type="success" v-if="user.feature.independent_balcony === 1"><span>独立阳台</span></el-tag>
                <el-tag type="success" v-if="user.feature.smart_sock === 1"><span>智能锁</span></el-tag>
                <el-tag type="success" v-if="user.feature.self_decorating === 1"><span>可自行装修</span></el-tag>
                <el-tag type="success" v-if="user.feature.first_rent === 1"><span>首次出租</span></el-tag>
                <el-tag type="success" v-if="user.feature.fully_furnished === 1"><span>拎包入住</span></el-tag>
                <el-tag type="success" v-if="user.feature.nearby_subway === 1"><span>地铁十分钟</span></el-tag>
                <el-tag type="success" v-if="user.feature.any_time_to_see === 1"><span>随时看房</span></el-tag>
                <el-tag type="success" v-if="user.feature.check_in_at_once === 1"><span>随时入住</span></el-tag>
            </div>
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
        <el-form-item label="城市地区:">
          <el-cascader :options="regionData" v-model="xuser.regiondata" :props="{value:'label'}"  placeholder="请选择城市及地区"></el-cascader>
        </el-form-item>
        <el-form-item label="地址:" prop="address" >
          <el-input v-model="xuser.address" placeholder="查询"></el-input>
        </el-form-item>
        <el-form-item label="房屋名称:" prop="title" >
          <el-input v-model="xuser.title" placeholder="查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('xuser')">查询</el-button>
        </el-form-item>
      </el-form>
      <el-main>
        <el-table :data="userList" border style="width: 100%;" v-loading="loading">
          <!-- <el-table-column :resizable="false" prop="house_id" label="用户id" min-width="50%" ></el-table-column> -->
          <el-table-column :resizable="false" prop="title"  label="房屋名" min-width="30%"></el-table-column>
          <el-table-column :resizable="false" prop="user.name"  label="房东" min-width="35%"></el-table-column>
          <el-table-column :resizable="false" prop="province"  label="省份"  min-width="25%"></el-table-column>
          <el-table-column :resizable="false" prop="city"  label="城市"  min-width="25%"></el-table-column>
          <el-table-column :resizable="false" prop="region"  label="地区" min-width="25%"></el-table-column>
          <el-table-column :resizable="false" prop="address"  label="地址"  min-width="70%"></el-table-column>
          <el-table-column :resizable="false" prop="house_type"  label="房型"  min-width="50%"></el-table-column>
          <el-table-column :resizable="false" fixed="right"  label="操作" >
            <template slot-scope="scope">
              <el-button @click="edit(scope.row.house_id)" type="primary" size="small">查看详情</el-button>
              <el-button @click="remove(scope.row.house_id)" type="danger" size="small">删除</el-button>
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
import { regionData } from 'element-china-area-data'
export default {
  name: 'App',
  data () {
    return {
      userList: [],
      currentList: [],
      xuser: {
        // user_id: '',
        title: '',
        regiondata: []
      },
      regionData: regionData,
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
      },
      loading: true
    }
  },
  created () {
    // this.fetch();
    this.pageInation()
  },
  methods: {
    // 刷新：
    fetch (msg) {
      this.xuser.title = ''
      this.xuser.regiondata = []
      this.xuser.address = ''
      if (msg !== 1) {
        this.$message({
          message: '刷新成功',
          type: 'success'
        })
      }
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
        this.$http.get('findHouses').then(res => {
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
      if (this.xuser.name !== '') {
        this.$http.get('findHouses?title=' + this.xuser.title).then(res => {
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
      this.dialogTitle = '查看房屋信息'
      this.$http.get(`findHousesDetail?house_id=${id}`).then(res => {
        this.user = res.data[0]
        this.dialogFormVisible = true
        // console.log(this.user)
        this.loading = false
      })
    },
    ConfirmUpdateUser (id, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
    // 删除房源：
    remove (id) {
      this.$confirm('确认删除该房源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`deleteHouseById?house_id=${id}`).then(() => {
          this.$message({
            message: '删除房屋成功!',
            type: 'success'
          })
          //   this.pageInation()
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
      if (this.xuser.regiondata.length !== 0) {
        if (this.xuser.regiondata[0].indexOf('市') > 0) {
          if (this.xuser.regiondata[0].indexOf('直辖市') > 0) {
            this.xuser.regiondata[1] = this.xuser.regiondata[0]
            this.xuser.regiondata[0] = '直辖市'
          }
        } else if (this.xuser.regiondata[0].indexOf('行政') > 0) {
          if (this.xuser.regiondata[0].length !== 5) {
            this.xuser.regiondata[2] = this.xuser.regiondata[1]
            this.xuser.regiondata[1] = this.xuser.regiondata[0]
            this.xuser.regiondata[0] = '特别行政区'
          }
        }
        console.log(this.xuser.regiondata)
      } else {
        this.xuser.regiondata[2] = ''
        this.xuser.regiondata[1] = ''
        this.xuser.regiondata[0] = ''
      }

      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 根据姓名模糊查询：
          this.$http.get('findHouses?title=' + this.xuser.title + '&province=' + this.xuser.regiondata[0] + '&city=' + this.xuser.regiondata[1] + '&region=' + this.xuser.regiondata[2] + '&address=' + this.xuser.address).then(res => {
            console.log(res.data)
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
