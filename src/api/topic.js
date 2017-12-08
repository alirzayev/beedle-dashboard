import Vue from 'vue'

export default {

  topics () {
    return Vue.http.get('api/admin/topics')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  show (id) {
    return Vue.http.get('api/admin/topics/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  create (data) {
    return Vue.http.post('api/admin/topics', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete (id) {
    return Vue.http.delete('api/admin/topics/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  update (id, data) {
    return Vue.http.put('api/admin/topics/' + id, data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  activate (id) {
    return Vue.http.post('api/admin/topics/' + id + '/activate')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  deactivate (id) {
    return Vue.http.post('api/admin/topics/' + id + '/deactivate')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  flags () {
    return Vue.http.get('api/admin/report/topics')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  ignoreReport (id) {
    return Vue.http.delete('api/admin/report/topics/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}