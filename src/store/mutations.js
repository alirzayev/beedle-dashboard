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
  }
}

