<template>
  <section>
    <div class="control-box">
      <el-button @click="expandAll = !expandAll">{{ expandAll ? '收起' : '展开' }}</el-button>
      <el-button @click="changeData">更新数据</el-button>
      <a style="color: #4AB7BD" href="https://github.com/lison16/v-org-tree">v-org-tree文档</a>
    </div>
    <div class="tree-wrapper">
      <org-tree
        :data="data"
        :node-render="nodeRender"
        :expand-all="expandAll"
        :horizontal="false"
        :props="props"
        collapsable
        @on-expand="onExpand"
        @on-node-click="onNodeClick"/>
    </div>
  </section>
</template>

<script>
import orgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import { data, newData } from './data'

export default {
  name: 'App',
  components: { orgTree },
  data() {
    return {
      data,
      expandAll: false,
      props: {
        id: 'dep_id',
        label: 'title',
        expand: 'expand',
        children: 'dep_children'
      }
    }
  },
  methods: {
    nodeRender(h, data) {
      // console.log(data)
      return (
        < span > {data.label
        }<
        /span>
      )
    },
    onNodeClick(e, data) {
      console.log(data)
    },
    onExpand(val, status) {
      console.log(val, status)
    },
    changeData() {
      this.data = newData
    }
  }
}
</script>

<style scoped>
  .control-box {
    padding: 10px;
  }

  .control-box button {
    padding: 6px 10px;
    font-size: 14px;
    background: #f7f5f5;
    border: 1px solid #95d7fd;
    border-radius: 4px;
    height: 14px;
    line-height: 14px;
    box-sizing: content-box;
  }

  .tree-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
