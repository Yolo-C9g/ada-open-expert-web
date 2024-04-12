import { projectConfigHelper } from '@/assets/script/config/project'
import StorageHelper from '@/assets/script/tools/storage'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/components/Layout/index.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/enterprise',
    children: [
      {
        path: '/enterprise',
        name: 'enterprise',
        redirect: '/enterprise/staff',
        children: [
          {
            path: '/enterprise/staff',
            name: 'staff',
            component: () => import('../views/enterprise/staff/index.vue')
          }
        ]
       },{
        path: '/medical',
        name: 'medical',
        redirect: '/medical/need',
        children: [
          {
            path: '/medical/need',
            name: 'need',
            component: () => import('../views/medical/need/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
    routes
})

router.beforeEach((to, from, next) => {
  const accountInfo = StorageHelper.get(projectConfigHelper.accountInfo as string)
  if (to.path !== '/login' && !accountInfo) {
    return next('/login')
  }
  next()
});

export default router
