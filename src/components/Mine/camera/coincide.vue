<!--
 * @desc:图片加载
 * @Author: xxp
 * @Date: 2019-09-08 14:12:12
 * @LastEditTime: 2019-09-08 15:24:05
 -->
<template>
  <div v-if="visible" ref="coincide" class="coincide">
    <div class="btn">
      <div @click="saveCoincide">
        <Icon type="ios-checkmark-outline" />
        <div @click="cancelCoincide" />
        <Icon class="ml3" type="ios-close-outline" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import ViewCanvas from './canvashelper'

export default {
  data() {
    return {
      visible: false,
      options: {},
      CD: null,
      canvas: null
    }
  },
  watch: {
    visible(nv) {
      if (!nv) {
        this.$refs.coincide.removeChild(
          document.querySelector('.coincideCanvas')
        )
        this.reset()
      }
    }
  },
  methods: {
    /**
     *  初始化canvas
     *  创建节点、画入图像，添加节点
     *  初始化工具类
     */
    initCanvas() {
      const canvasImg = new Image()
      canvasImg.src = this.options.downImgBase
      canvasImg.addEventListener('load', () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvasImg.width
        canvas.height = canvasImg.height
        canvas.style.width = `${canvasImg.width}px`
        canvas.style.height = `${canvasImg.height}px`
        canvas.className = 'coincideCanvas'
        const ctx = canvas.getContext('2d')
        ctx.drawImage(canvasImg, 0, 0, canvasImg.width, canvasImg.height)
        this.$refs.coincide.appendChild(canvas)
        this.canvas = canvas
        this.CD = new ViewCanvas()
        this.CD.initial({
          canvas: document.querySelector('.coincideCanvas'),
          initCtxImg: _.cloneDeep(this.options.downImgBase)
        })
        this.CD.setFeatures('dragOn', true)
        this.CD.setFeatures('ScaleOn', true)
        this.CD.setImage(this.options.upImgBase, 'coincideCanvas')
      })
    },
    /* 保存当前重合合并的图像 */
    saveCoincide() {
      const coincideImgBase = this.canvas.toDataURL('image/png')
      this.$emit('getCoincideImgBase', coincideImgBase)
      this.visible = false
    },
    /* 取消按钮 */
    cancelCoincide() {
      this.$Modal.confirm({
        title: '关闭',
        content: '是否保存当前修改？',
        width: 350,
        onOk: () => {
          this.saveCoincide()
        },
        onCancel: () => {
          this.visible = false
        }
      })
    },
    /* model显示，调用初始化 */
    show(options) {
      this.options = _.cloneDeep(options)
      this.visible = true
      this.initCanvas()
    },
    /* 重置 */
    reset() {
      this.options = false
      this.CD = null
      this.canvas = null
    }
  }
}
</script>
<style>
.coincide {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: auto;
}
.coincide canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
}
.coincide .btn {
  position: fixed;
  top: 2rem;
  right: 4rem;
  z-index: 100;
}
.coincide .btn div {
  display: inline-block;
}
.coincide .btn div .ivu-icon {
  color: #ddd;
  font-size: 4rem;
}
.coincide .btn div .ivu-icon:hover {
  color: #fff;
  cursor: pointer;
}
</style>
