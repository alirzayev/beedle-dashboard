/* eslint-disable indent,camelcase */
import topicServices from '../api/topic'
import brandServices from '../api/brand'
import * as types from './mutation-types'

export function getTopics ({commit}) {
  return topicServices.topics()
    .then((response) => {
      let topics = response.body.topics
      console.log('topics', topics)
      commit(types.INIT_TOPICS, {
        topics
      })
    })
}

export function getTopic ({commit}, topic_id) {
  return topicServices.show(topic_id)
    .then((response) => {
      let topic = response.body.topic
      console.log('topic', topic)
      commit(types.INIT_TOPIC, {
        topic
      })
    })
}

export function getBrands ({commit}) {
  return brandServices.brands()
    .then((response) => {
      let brands = response.body.brands
      console.log('brands', brands)
      commit(types.INIT_BRANDS, {
        brands
      })
    })
}

