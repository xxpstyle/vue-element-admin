<template>
  <div>
    <uploadFile :file-list="fileList" upload-type="photo" @getFileList="getFileList" />
  </div>
</template>
<script>
import uploadFile from './UploadFile'
export default {
  components: { uploadFile },
  data() {
    return {
      QualificationInput: '',
      fileList: [
        {
          'url': 'http://pic27.nipic.com/20130313/9252150_092049419327_2.jpg',
          'name': '1540519646.png'
        }
      ]
    }
  },
  methods: {
    // 返回的文件地址
    getFileList(v) {
      console.log(v)
    }
  }
}
</script>
