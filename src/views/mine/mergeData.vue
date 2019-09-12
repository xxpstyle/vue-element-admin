<template>
  <section>
    <el-table
      id="tableId"
      :data="dataList"
      :span-method="objectSpanMethod"
      highlight-current-row
      stripe
      border
      style="width: 100%;"
      @selection-change="selsChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column type="index" label="序号" width="100"/>
      <el-table-column prop="userCode" label="账号"/>
      <el-table-column prop="userName" label="姓名"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="birth" label="出生日期"/>
    </el-table>
  </section>
</template>
<script>
export default {
  name: 'ManagerPage',
  data() {
    return {
      // 表格
      dataList: [
        { userName: '一', userCode: '星期一', sex: '男', birth: '2019-09-11' },
        { userName: '一', userCode: '星期一', sex: '男', birth: '2019-09-11' },
        { userName: '一', userCode: '星期二', sex: '男', birth: '2019-09-11' },
        { userName: '李四', userCode: '星期二', sex: '男', birth: '2019-09-12' },
        { userName: '王五', userCode: '1', sex: '男', birth: '2019-09-12' }],
      spanArr: []
    }
  },
  mounted() {
    let contactDot = 0
    this.dataList.forEach((item, index) => {
      item.index = index
      if (index === 0) {
        this.spanArr.push(1)
      } else {
        if (item.userName === this.dataList[index - 1].userName) {
          this.spanArr[contactDot] += 1
          this.spanArr.push(0)
        } else {
          this.spanArr.push(1)
          contactDot = index
        }
      }
    })
  }, methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 0) {
      //   const _row = this.spanArr[rowIndex]
      //   const _col = _row > 0 ? 1 : 0
      //   return {
      //     rowspan: _row,
      //     colspan: _col
      //   }
      // }
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
