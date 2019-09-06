<template>
  <section ref="print" style="margin: 10px 20px 0;">
    <el-button type="primary" class="no-print" @click="doPrint">打印</el-button>打印内容
    <div class="no-print">不要打印我</div>
    <div style="page-break-before: always;">我会分页打印</div>
  </section>
</template>

<script>
export default {
  name: 'Print',
  methods: {
    doPrint() {
      this.$print(this.$refs.print)
    }
  }
}
</script>
