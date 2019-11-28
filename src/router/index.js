import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/order_input',
    component: Layout,
    children: [
      {
        path: '/order_input',
        component: () => import('@/views/订单录入/index.vue'),
        name: '订单录入',
        meta: { title: '订单录入', icon: 'edit', affix: true }
      }
    ]
  },
  {
    path: '/order_manage',
    component: Layout,
    children: [
      {
        path: '/order_manage',
        component: () => import('@/views/订单管理/index'),
        name: 'Documentation',
        meta: { title: '订单管理', icon: 'nested', affix: true }
      }
    ]
  }
]

/**
 * 异步路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/data_show',
    component: Layout,
    children: [
      {
        path: '/data_show',
        component: () => import('@/views/数据SHOW/index'),
        name: 'data_show',
        meta: { title: '数据SHOW', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: '学校推广',
      icon: 'clipboard'
    },
    children: [
      // {
      //   path: 'create',
      //   component: () => import('@/views/example/create'),
      //   name: 'CreateArticle',
      //   meta: { title: 'Create Article', icon: 'edit' }
      // },
      // {
      //   path: 'edit/:id(\\d+)',
      //   component: () => import('@/views/example/edit'),
      //   name: 'EditArticle',
      //   meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
      //   hidden: true
      // },
      // {
      //   path: 'list',
      //   component: () => import('@/views/example/list'),
      //   name: 'ArticleList',
      //   meta: { title: 'Article List', icon: 'list' }
      // }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/error-page/404'),
        name: 'Tab',
        meta: { title: '回款与查账', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: '系统管理',
      icon: '设置'
    },
    children: [
      {
        path: 'user_manage',
        component: () => import('@/views/系统管理/账号管理/index'),
        name: 'user_manage',
        meta: { title: '账号管理', noCache: true }
      },
      {
        path: '405',
        component: () => import('@/views/error-page/404'),
        name: 'Page4041',
        meta: { title: '区域管理', noCache: true }
      },
      {
        path: '406',
        component: () => import('@/views/error-page/404'),
        name: 'Page4042',
        meta: { title: '快递公司管理', noCache: true }
      },
      {
        path: '407',
        component: () => import('@/views/error-page/404'),
        name: 'Page4043',
        meta: { title: '产品管理', noCache: true }
      },
      {
        path: 'abc',
        // component: () => import('@vue/test-utils/dist'),
        name: 'passwords',
        meta: { title: '密码修改' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
