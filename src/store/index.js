/**
 * Created by alirzayev on 28/04/2017.
 */
/* eslint-disable eol-last */
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authUser'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  }
})