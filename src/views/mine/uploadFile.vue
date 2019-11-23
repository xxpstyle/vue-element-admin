<template>
  <div>
    <el-upload
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :http-request="uploadFile"
      :accept="accept"
      :limit="10"
      action=""
      list-type="picture-card"
      class="upload-demo">
      <i class="el-icon-plus"/>
      <div slot="tip" class="el-upload__tip">只能上传{{ seeTrans[uploadType] }}文件，且不超过{{ fileSize }}Mb</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>
<script>
/**
   * 图片上传封装
   * @param fileList 文件初始化数据 [{'url': '','name': '123.png'}]
   * @param uploadType 文件类型
   * @param limit 文件个数限制
   * @param fileSize 文件大小限制
   */
export default {
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    uploadType: {
      type: String,
      default: () => 'photo'
    },
    limit: {
      type: Number,
      default: () => 1
    },
    fileSize: {
      type: Number,
      default: () => 25
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      uploadTypeTrans: {
        'photo': {
          accept: 'image/jpeg,image/png,image/bmp'
        },
        'music': {
          accept: 'audio/mp3,video/mp4'
        },
        'doc': {
          accept: 'text/plain,application/msword,application/excel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        'pdf': {
          accept: 'application/pdf'
        }
      },
      accept: 'image/jpeg,image/png,image/bmp',
      seeTrans: { music: '歌曲', photo: '图片' }
    }
  },
  mounted() {
    // 限制文件格式
    if (this.uploadType && this.uploadTypeTrans[this.uploadType].accept) {
      this.accept = this.uploadTypeTrans[this.uploadType].accept
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      // 判断图片类型和大小
      const isLt16M = file.size / 1024 / 1024 < this.fileSize
      if (!isLt16M) {
        this.$message.error(`上传文件大小不能超过  ${this.fileSize}MB！`)
      }
      return isLt16M
    },
    handleRemove(file, fileList) { // 删除图片
      console.log(file, fileList)
      this.fileList.map((v, index) => {
        if (v.name === file.name) {
          this.fileList.splice(index, 1)
          this.$emit('getFileList', this.fileList)
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    async uploadFile(file) {
      try {
        const formData = new FormData()
        formData.append(this.uploadType, file.file)
        // 表单提交到后台
        this.$emit('getFileList', this.fileList)
        this.$message.success('上传成功')
        console.log(this.fileList)
      } catch (error) {
        this.fileList.pop()
        this.$message.error(`上传文件错误: ${error.message}`)
      } finally {
        console.log('上传结束')
      }
    },
    handlePreview(file) { // 查看图片
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    // 图片个数限制提示
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>
