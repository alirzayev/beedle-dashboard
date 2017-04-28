import Vue from 'vue'
import Router from 'vue-router'
// Containers
// Views
import Login from '@/views/auth/Login'
import MainLayout from '@/containers/Full'
import Dashboard from '@/views/Dashboard'
import Users from '@/views/users/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: MainLayout,
      meta: {requiresAuth: true},
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'users',
          name: 'Users',
          component: Users
        }
      ]
    }
  ]
})
