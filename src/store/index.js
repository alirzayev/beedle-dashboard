/**
 * Created by alirzayev on 28/04/2017.
 */
/* eslint-disable eol-last */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import auth from './modules/authUser'

Vue.use(Vuex)

const state = {
  topics: [],
  topic: {},
  brands: [],
  reportedTopics: [],
  reportedUsers: [],
  reportedComments: []
}

export default new Vuex.Store({
  modules: {
    auth
  },
  state,
  actions,
  mutations
})