/* eslint-disable indent,camelcase */
import topicServices from '../api/topic'
import userServices from '../api/user'
import brandServices from '../api/brand'
import commentServices from '../api/comment'
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

export function getFlags ({commit}) {
  return topicServices.flags()
    .then((response) => {
      let rTopics = response.body.topics
      console.log('reported topics', rTopics)
      commit(types.INIT_REPORTED_TOPICS, {
        rTopics
      })
    })
}

export function getUserFlags ({commit}) {
  return userServices.flags()
    .then((response) => {
      let rUsers = response.body.users
      console.log('reported users', rUsers)
      commit(types.INIT_REPORTED_USERS, {
        rUsers
      })
    })
}

export function getCommentFlags ({commit}) {
  return commentServices.flags()
    .then((response) => {
      let rComments = response.body.comments
      console.log('reported comments', rComments)
      commit(types.INIT_REPORTED_COMMENTS, {
        rComments
      })
    })
}

