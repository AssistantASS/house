import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/layout'
// import Test from '@/components/test'
// import Index from '@/components/index'
import Login from '@/views/login'
import LoginSuccess from '@/views/login-success'
import Register from '@/views/register'
import RegisterSuccess from '@/views/register-success'
import Index from '@/views/layout/index'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// import Component1 from '@/views/Component1'
// import Component1_1 from '@/views/Component1_1'
// import Component1_2 from '@/views/Component1_2'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/login',
    //   component: () => import('@/views/login/index'),
    //   hidden: true
    // },
    // {
    //   path: '/404',
    //   component: () => import('@/views/404'),
    //   hidden: true
    // },
    // {
    //   path: '/',
    //   component: Layout,
    //   redirect: '/dashboard',
    //   children: [{
    //     path: 'dashboard',
    //     name: 'Dashboard',
    //     component: () => import('@/views/dashboard/index'),
    //     meta: { title: 'Dashboard', icon: 'dashboard' }
    //   }]
    // },
    // { path: '*', redirect: '/404', hidden: true }
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/loginSuccess',
      name: 'LoginSuccess',
      component: LoginSuccess
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/register-success',
      name: 'RegisterSuccess',
      component: RegisterSuccess
    },
    {
      path: '/',
      component: Index,
      redirect: '/dashboard',
      name: '首页',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          meta: { title: 'dashboard' }
        }
      ]
    },
    {
      path: '/user',
      redirect: '/user/permisson_manager',
      component: Index,
      name: '用户管理',
      meta: { title: '用户管理' },
      children: [
        {
          path: 'permisson_manager',
          name: '用户管理',
          component: () => import('@/views/user/permissions.vue'),
          meta: { title: '用户管理' }
          // children: [
          //   {
          //     path: '1-1-1',
          //     name: '1-1-1',
          //     component: () => import('@/views/Component1_1_1.vue'),
          //     meta: { title: '1-1-1' }
          //   }
          // ]
        },
        {
          path: 'landlord_audit',
          name: '房东审核',
          component: () => import('@/views/user/landlord_audit.vue'),
          meta: { title: '房东审核' }
        },
        {
          path: 'agent_audit',
          name: '经纪人审核',
          component: () => import('@/views/user/agent_audit.vue'),
          meta: { title: '经纪人审核' }
        }
      ]
    },
    {
      path: '/houseRend',
      redirect: '/houseRend/houseRendMessage',
      component: Index,
      name: '租房管理',
      meta: { title: '租房管理' },
      children: [
        {
          path: 'houseRendMessage',
          name: '查询约看信息',
          component: () => import('@/views/houseRend/HouseRendManager.vue'),
          meta: { title: '查询约看信息' }
          // children: [
          //   {
          //     path: '1-1-1',
          //     name: '1-1-1',
          //     component: () => import('@/views/Component1_1_1.vue'),
          //     meta: { title: '1-1-1' }
          //   }
          // ]
        },
        {
          path: '1-2',
          name: 'title1-2',
          component: () => import('@/views/Component1_3.vue'),
          meta: { title: 'title1-2' }
        },
        {
          path: '1-3',
          name: 'title1-3',
          component: () => import('@/views/Component1_3.vue'),
          meta: { title: 'title1-3' }
        }
      ]
    },
    {
      path: '/houseSource',
      redirect: '/houseSource/houseSourceMessage',
      component: Index,
      name: '房源信息管理',
      meta: { title: '房源信息管理' },
      children: [
        {
          path: 'houseSourceMessage',
          name: '房源查询信息',
          component: () => import('@/views/houseSource/HouseSourceManager.vue'),
          meta: { title: '房源查询信息' }
        },
        {
          path: 'comments',
          name: '查看房屋评论',
          component: () => import('@/views/houseSource/Comments.vue'),
          meta: { title: '查看房屋评论' }
        },
        {
          path: '1-3',
          name: '查看房屋评论',
          component: () => import('@/views/Component1_3.vue'),
          meta: { title: '查看房屋评论' }
        }
      ]
    },
    {
      path: '/person',
      // name: '个人页面修改',
      redirect: '/person',
      component: Index,
      // meta: { title: '个人页面修改' },
      children: [
        {
          path: '',
          name: '个人页面修改',
          component: () => import('@/views/person_inf/person.vue'),
          meta: { title: '个人页面修改' }
        }
      ]
    }
  ]
})

// Router.beforeEach((to, from, next) => {
//   next()
// })
