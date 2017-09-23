import Vue from 'vue'
import Router from 'vue-router'
// Containers
// Views
import Login from '../views/auth/Login'
import MainLayout from '../containers/Full'
import Dashboard from '../views/Dashboard'
import Users from '../views/users/Index'
import Brands from '../views/brands/Index'
import Models from '../views/models/Index.vue'
import Topics from '../views/topics/Index.vue'
import Comments from '../views/comments/Index.vue'

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
        },
        {
          path: 'topics',
          name: 'Topics',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/',
              name: 'Topics',
              component: Topics
            },
            {
              path: ':id/comments',
              name: 'Comments',
              component: Comments
            }
          ]
        },
        {
          path: 'brands',
          redirect: '/brands',
          name: 'Brands',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Brands
            },
            {
              path: ':id/models',
              name: 'Models',
              component: Models
            }
          ]
        }
      ]
    }
  ]
})
