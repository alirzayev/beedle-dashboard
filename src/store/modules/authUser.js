/* eslint-disable eol-last,comma-dangle,no-trailing-spaces,no-trailing-spaces,space-before-function-paren,space-before-blocks,padded-blocks,brace-style */
import authService from '../../api/auth'
import router from '../../router'

const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE'
const AUTH_USER = 'AUTH_USER'

// initial State
const state = {
  isLoggedIn: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user'))
}

// getters
const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  user: state => {
    return state.user
  }
}

// actions
const actions = {
  login ({commit, dispatch}, data) {
    authService.authenticate(data)
      .then((response, error) => {
        if (response) {
          localStorage.setItem('token', response.body.access_token)
          console.log('login success', response)
          commit(AUTHENTICATE_SUCCESS)
          dispatch('getAuthUser')
          router.push('/')
        }
        else {
          console.log('login failed', error)
          commit(AUTHENTICATE_FAILURE)
        }

      })
  },
  getAuthUser({commit}){
    authService.user()
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.body))
        console.log('auth user', response)
        commit(AUTH_USER, {user: response.body})
      })
      .then((error) => {
        console.log('auth user failed', error)
      })
  }
}

// mutations
const mutations = {

  [AUTHENTICATE_SUCCESS] (state) {
    state.isLoggedIn = true
  },

  [AUTHENTICATE_FAILURE] (state, error) {
    state.isLoggedIn = false
  },

  [AUTH_USER] (state, {user}) {
    state.user = user
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}