<template>
  <div>
    <UploadFile :file-list="fileList" upload-type="photo" @getFileList="getFileList" />
  </div>
</template>
<script>
import UploadFile from './uploadImg'
export default {
  components: { UploadFile },
  data() {
    return {
      QualificationInput: '',
      fileList: [
        {
          'url': 'http://pic27.nipic.com/20130313/9252150_092049419327_2.jpg',
          'contentType': 'image/png',
          'name': '1540519646.png'
        }
      ]
    }
  },
  methods: {
    getFileList(v) {
      console.log(v)
    }
  }
}
</script>
