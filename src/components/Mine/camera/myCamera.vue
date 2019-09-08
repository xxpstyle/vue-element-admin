<!--
 * @desc:pc打开摄像头
 * @Author: xxp
 * @Date: 2019-09-08 14:12:12
 * @LastEditTime: 2019-09-08 16:14:25
 -->
<template>
  <div class="scan-doc" style="width: 100%;text-align: center;">
    <video ref="video" :width="defaultWH.width" :height="defaultWH.height+'px'" />
    <canvas ref="canvas" :width="defaultWH.width" :height="defaultWH.height+'px'" />
    <el-tooltip v-show="btnShow!=1" class="item" effect="dark" content="打开摄像头" placement="top">
      <el-button class="el-icon-refresh" circle @click.native="openCamera" />
    </el-tooltip>
    <el-tooltip v-show="btnShow==1" class="item" effect="dark" content="拍照" placement="top">
      <el-button type="primary" class="el-icon-upload2" circle @click.native="getImg" />
    </el-tooltip>
    <el-tooltip v-show="btnShow==1" class="item" effect="dark" content="关闭摄像头" placement="top">
      <el-button type="danger" class="el-icon-error" circle @click.native="closeCamera" />
    </el-tooltip>
    <div style="text-align: left;width: 180px;height: 135px;border:1px dashed #000;">
      <!--<div class="mc">{{item.mc}}</div>-->
      <img
        v-for="(item,index) in imgDataArr"
        :key="index"
        :src="item.base"
        class="imgname"
        alt
        style=" width: 180px;height: 135px; "
        @click.self="imgDataDetail(index)"
      >
    </div>
    <el-button type="danger" @click.native="doCloseImg">退出</el-button>
    <el-button :disabled="imgDataArr.length<1" type="success" @click.native="doAddImg">报到</el-button>
  </div>
</template>

<script>
import _ from 'lodash'
// import fileUtil from './fileUtil.js'

export default {
  name: 'MyCamera',
  // eslint-disable-next-line vue/require-prop-types
  props: ['visible'],
  data() {
    return {
      defaultWH: {
        width: 600,
        height: 450
      },
      MediaStreamTrack: null,
      imgDataArr: [],
      counter: 1,
      btnShow: 0
    }
  },
  watch: {
    visible(n, o) {
      if (this.visible === true) {
        this.imgDataArr = []
        if (this.visible === false) {
          this.closeCamera()
        } else if (this.visible === true) {
          this.openCamera()
        }
      }
    }
  },
  mounted() {
    this.openCamera()
  },
  methods: {
    /* 调用本地摄像头 */
    openCamera() {
      this.imgDataArr = []
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false
          })
          .then(stream => {
            this.MediaStreamTrack =
              typeof stream.stop === 'function'
                ? stream
                : stream.getTracks()[0]
            this.$refs.video.srcObject = stream
            this.$refs.video.play()
            this.btnShow = 1
          })
          .catch(err => {
            console.log(err)
            this.$message.info('无法操作，未找到拍照设备！')
          })
      }
    },
    /* 关闭摄像头 */
    closeCamera() {
      this.MediaStreamTrack && this.MediaStreamTrack.stop()
      this.MediaStreamTrack = null
      this.btnShow = 0
    },
    /* 获取当前影像为某一图像 */
    getImg() {
      if (!this.MediaStreamTrack) return
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.drawImage(
        this.$refs.video,
        0,
        0,
        this.defaultWH.width,
        this.defaultWH.height
      )
      const imgData = this.$refs.canvas.toDataURL('image/png')
      this.imgDataArr = [
        {
          id: this.counter,
          base: imgData,
          mc: `图像${this.counter}`
        }
      ]
      // this.counter++;
    },
    /* 删除图像 */
    delImgData(index) {
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除该图像？',
        width: 350,
        onOk: () => {
          this.imgDataArr.splice(index, 1)
        }
      })
    },
    /* 保存修改后更新对应修改的图像 */
    updateImgData(imgdata) {
      const findIndex = _.findIndex(
        this.imgDataArr,
        item => item.id === imgdata.id
      )
      this.$set(this.imgDataArr, findIndex, imgdata)
    },
    /* 将点击的图像画入到操作图像的canvas中去 */
    imgDataDetail(index) {
      this.$emit('on-imgDataChange', _.cloneDeep(this.imgDataArr[index]))
    },
    /* 重置 */
    reset() {
      this.closeCamera()
      this.MediaStreamTrack = null
      this.imgDataArr = []
      this.counter = 1
    },
    // 保存
    doAddImg() {
      // this.closeCamera()
      //
      this.$emit('change', this.imgDataArr[0].base)
      // const fileData = fileUtil.base64ToFile(this.imgDataArr[0].base, 'imgDataArr23.png')
      // 表单上传到后台
      /**
       * const formData = new FormData()
      formData.append(
        'filename',
        fileUtil.base64ToFile(this.imgDataArr[0].base, '123.png')
      )
      authApi
        .upload(formData)
        .then(r => {
          if (r.data.name) {
            this.$emit('change', r.data.name)
          } else {
            this.$message.info('上传失败')
          }
        })
        .catch(e => {
          this.$message.info('上传失败')
        })
       */
    },
    // 关闭
    doCloseImg() {
      this.closeCamera()
      this.$emit('doClose')
    }
  }
}
</script>

<style>
.scan-doc video {
  background-color: #000;
  box-shadow: 1px 1px 10px 1px #aaa;
}

.scan-doc canvas {
  display: none;
}

.scan-doc .btn-group li {
  text-align: center;
  border: 1px solid #aaa;
  margin: 2rem 0;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.scan-doc .imgData {
  cursor: pointer;
  width: 180px;
  height: 135px;
  overflow: hidden;
  position: relative;
  margin-top: 0.4rem;
  margin-right: 2.5rem;
  background-color: #000;
  float: left;
}

.scan-doc .imgData:hover > .mc {
  top: 0px;
}

.scan-doc .imgData:hover > .del {
  bottom: 0px;
}

.scan-doc .imgData img {
  width: 100%;
  height: 100%;
}

.scan-doc .imgData .mc,
.scan-doc .imgData .del {
  position: absolute;
  width: 100%;
  color: #fff;
  z-index: 1;
  font-size: 14px;
  background-color: #aaa;
  text-align: center;
}

.scan-doc .imgData .mc {
  top: -21px;
}

.scan-doc .imgData .del {
  bottom: -21px;
}

.scan-doc .imgData .del:hover {
  color: #c53929;
}
</style>
