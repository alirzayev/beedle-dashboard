// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VueTable from './components/VueTable.vue'
import { default as swal } from 'sweetalert2'
import vSelect from 'vue-multiselect'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(swal)

Vue.component('vue-table', VueTable)
Vue.component('multiselect', vSelect)

// Vue.http.options.root = 'http://beedle.caspiansoft.com/'
Vue.http.options.root = 'http://188.226.148.17'
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  request.headers.set('Accept', 'application/json')
  next(function (response) {
    // modify response
    if (response.body.error === true) {
      swal(
        'Error Found!',
        response.body.message,
        'error'
      )
    }
  })
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

