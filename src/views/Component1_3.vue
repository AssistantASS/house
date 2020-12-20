<template>
  <!-- <div class="upload-demo">
	<el-upload action="#" list-type="picture-card" :auto-upload="false" ref="handle" :on-success="handleSuccess" :before-upload="beforeUploadFile">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
          <i class="el-icon-zoom-in"></i>
        </span>
        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleUpload(file)">
          <i class="el-icon-upload"></i>
        </span>
        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove">
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
 <el-button type="primary" @click="uploader">上传</el-button>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</div> -->
<div class="upload-demo">
  <el-form :model="form">
    <el-form-item label="上传文件" :label-width="formLabelWidth">
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
      <el-button type="primary" @click="uploader">上传</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      form: {
        file: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    // handleRemove (file) {
    //   console.log(file)
    // },
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    handleUpload (event, file, fileList) {
      let formData = new FormData()
      console.log('Ada')
      console.log(file.raw)
      formData.append('mpf', file.raw)
      formData.append('uid', 10)

      this.$http.post('insertOpinionTest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    handleSuccess (res, file, fileList) {
      this.$notify.success({
        title: '成功',
        message: `文件上传成功`
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
