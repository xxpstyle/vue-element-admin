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
    path: 'manager-page',
    component: () => import('@/views/mine/manager-page'),
    name: 'manager-page',
    meta: {
      title: 'manager-page'
    }
  },
  {
    path: 'mergeData',
    component: () => import('@/views/mine/mergeData'),
    name: 'mergeData',
    meta: {
      title: 'mergeData'
    }
  },
  {
    path: 'org-tree',
    component: () => import('@/views/mine/org-tree/index'),
    name: 'org-tree',
    meta: {
      title: 'org-tree'
    }
  },
  {
    path: 'myCamera',
    component: () => import('@/views/mine/cameraTest'),
    name: 'myCamera',
    meta: {
      title: 'pc打开摄像头'
    }
  },
  {
    path: 'uploadImg',
    component: () => import('@/views/mine/uploadFileTest'),
    name: 'uploadImg',
    meta: {
      title: '图片上传'
    }
  },
  {
    path: 'table',
    component: () => import('@/views/mine/table'),
    name: 'table',
    meta: {
      title: '表格'
    }
  }
  ]
}
export default mineRouter
