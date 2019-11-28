<template>
  <div>
    <list :data-list="dataList"/>
  </div>
</template>

<script>
import list from './list.vue'

export default {
  name: 'Table',
  components: { list },
  data() {
    return {
      dataList: [
        {
          id: 1, name: '菜单1',
          children: [
            { id: 1, name: '菜单1-1', children: [] },
            { id: 1, name: '菜单1-2', children: [] },
            { id: 1, name: '菜单1-3', children: [] }
          ]
        },
        {
          id: 1, name: '菜单2',
          children: [
            { id: 1, name: '菜单2-1', children: [] },
            { id: 1, name: '菜单2-2', children: [] },
            { id: 1, name: '菜单2-3', children: [] }
          ]
        }]
    }
  }
}
</script>

<style scoped>

</style>
