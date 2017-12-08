import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.INIT_TOPICS] (state, {topics}) {
    Vue.set(state, 'topics', topics)
  },
  [types.INIT_TOPIC] (state, {topic}) {
    Vue.set(state, 'topic', topic)
  },
  [types.INIT_BRANDS] (state, {brands}) {
    Vue.set(state, 'brands', brands)
  },
  [types.INIT_REPORTED_TOPICS] (state, {rTopics}) {
    Vue.set(state, 'reportedTopics', rTopics)
  },
  [types.INIT_REPORTED_USERS] (state, {rUsers}) {
    Vue.set(state, 'reportedUsers', rUsers)
  },
  [types.INIT_REPORTED_COMMENTS] (state, {rComments}) {
    Vue.set(state, 'reportedComments', rComments)
  }
}

