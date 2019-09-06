/** When your routing table is too long, you can split it into small modules**/

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
  }]
}
export default mineRouter
