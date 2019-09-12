<template>
  <section>
    <el-form :inline="true" :model="queryForm">
      <el-form-item label="用户">
        <el-input v-model="queryForm.userName" clearable placeholder="用户账号、姓名"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="dataList"
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button type="primary" size="small" @click="handleAdd(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination
        :page-sizes="[10, 30,50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="doChangeLimit"
        @current-change="doChangePage"/>
    </el-col>

    <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false" :title="tit">
      <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="100px">
        <el-form-item label="账号" prop="userCode">
          <el-input v-model="addForm.userCode"/>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="addForm.userName"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.sex"/>
        </el-form-item>
        <el-form-item label="出生日" prop="birth">
          <el-date-picker v-model="addForm.birth" type="date"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button :loading="addLoading" type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: 'ManagerPage',
  data() {
    return {
      queryForm: {
        userName: ''
      },
      // 表格
      dataList: [],
      total: 0,
      page: 0,
      limit: 10,
      sels: [], // 勾选列
      // 新增
      tit: '新增用户',
      addLoading: false,
      addForm: {},
      addFormVisible: false,
      addFormRules: {
        userCode: [
          { required: true, message: '用户账号不可为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '用户名称不可为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '用户性别不可为空', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '用户出生日不可为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    selsChange: function(sels) {
      this.sels = sels
    },
    // 改变当前页
    doChangePage(val) {
      this.page = val
      this.getData()
    },
    // 改变显示条数
    doChangeLimit(val) {
      this.limit = val
      this.getDataList()
    },
    // 获取表格数据
    getDataList() {
      api.list({
        pageVo: { page: this.page, limit: this.limit },
        en: { userName: this.queryForm.userName }
      }).then(r => {
        this.$message.success(r.data.msg)
        this.dataList()
      })
    },
    // 弹出新增与窗口
    handleAdd(index, row) {
      if (row) {
        this.tit = '编辑用户'
        this.addForm = Object.assign({}, row)
      } else {
        this.tit = '新增用户'
        this.addForm = {
          userCode: '',
          userName: '',
          sex: '',
          birth: ''
        }
      }
      this.addFormVisible = true
    },
    // 提交
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认要提交吗?', '提示', {
            type: 'warning'
          }).then(() => {
            const data = {
              userCode: this.addForm.userCode,
              userName: this.addForm.userName,
              sex: this.addForm.sex,
              birth: this.addForm.birth
            }
            api.add(data).then(r => {
              this.$message.success(r.data.msg)
              this.dataList()
            })
          })
        }
      })
    },
    // 删除
    handleDel(id) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        api.delete(id).then(r => {
          this.$message.success(r.data.msg)
          this.dataList()
        })
      })
    },
    // 批量删除
    handleBatchDel() {
      this.$confirm('确认删除选中的记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const ids = this.sels.map(item => item.id).toString()
        api.delete(ids).then(r => {
          this.$message.success(r.data.msg)
          this.dataList()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
