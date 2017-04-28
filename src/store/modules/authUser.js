/* eslint-disable eol-last,comma-dangle,no-trailing-spaces,no-trailing-spaces,space-before-function-paren,space-before-blocks */
import authService from '../../api/auth'
import router from '../../router'

const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE'

// initial State
const state = {
  isLoggedIn: !!localStorage.getItem('token'),
  user: null
}

// getters
const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  }
}

// actions
const actions = {
  login ({commit}, data) {
    authService.authenticate(data)
      .then((response) => {
        localStorage.setItem('token', response.body.access_token)
        console.log('login success', response)
        commit(AUTHENTICATE_SUCCESS)
        router.push('/')
      })
      .then((error) => {
        console.log('login failed', error)
        commit(AUTHENTICATE_FAILURE)
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
}

export default {
  state,
  getters,
  actions,
  mutations,
}