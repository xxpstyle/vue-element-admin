<!--
 * @desc:
 * @Author: xxp
 * @Date: 2019-09-07 10:08:48
 * @LastEditTime: 2019-09-08 15:11:04
 -->
<template>
  <section ref="print" style="margin: 10px 20px 0;">
    <el-button type="primary" class="no-print" @click="doPrint">打印</el-button>打印内容
    <div class="no-print">不要打印我</div>
    <div style="page-break-before: always;">我会分页打印</div>
  </section>
</template>

<script>
/**
 * @desc:页面打印
 * @author: xxp
 * @param {type}
 * @date: Do not edit
 * @lastEditTime: Do not edit
 */
export default {
  name: 'Print',
  data() {
    return {
    }
  },
  methods: {
    doPrint() {
      this.$print(this.$refs.print)
    },
    test() {
      this.doPrint()
    }
  }
}
</script>
<style scoped>
.btn {
  margin-top: 12px;
  margin-bottom: 12px;
  top: 10px;
}
</style>
