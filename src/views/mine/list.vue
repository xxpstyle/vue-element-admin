<template>
  <div>
    <table class="imagetable">
      <div v-for="(item, index) in dataList" :key="index">
        <th>
          <td :rowspan="getRowSize(item.children)" :colspan="getRowSize(item.children)">
            {{ item.name }}
          </td>
        </th>
        <th v-if="item.children.length>0">
          <td>
            <List :data-list="item.children" class="imagetable2"/>
          </td>
        </th>
      </div>
    </table>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  }, methods: {
    getRowSize(it) {
      if (it) {
        return it.length
      } else {
        return 1
      }
    }
  }
}
</script>

<style scoped>
  table.imagetable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
  }
  table.imagetable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
  }
  table.imagetable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #999999;
  }
</style>
