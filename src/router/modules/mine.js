/*
 * @desc: 收集组件的路由
 * @Author: xxp
 * @Date: 2019-09-07 10:08:48
 * @LastEditTime: 2019-09-08 15:38:35
 */

import Layout from '@/views/layout/Layout'

const mineRouter = {
  path: '/mine',
  component: Layout,
  redirect: '/mine/print',
  name: 'mine',
  meta: {
    title: 'mine',
    icon: 'table'
  },
  children: [{
    path: 'print',
    component: () => import('@/views/mine/print'),
    name: 'print',
    meta: {
      title: '页面打印'
    }
  },
  {
    path: 'html2pdf',
    component: () => import('@/views/mine/html2pdf'),
    name: 'html2pdf',
    meta: {
      title: 'html2pdf'
    }
  },
  {
    path: 'myCamera',
    component: () => import('@/views/mine/cameraTest'),
    name: 'myCamera',
    meta: {
      title: 'pc打开摄像头'
    }
  }]
}
export default mineRouter
