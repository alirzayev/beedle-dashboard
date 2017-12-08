import Vue from 'vue'

export default {

  users () {

    return Vue.http.get('api/admin/users')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  create (data) {
    return Vue.http.post('api/admin/users', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete (id) {
    return Vue.http.delete('api/admin/users/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  update (id, data) {
    return Vue.http.post('api/admin/users/' + id + '/update', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  block (id) {
    return Vue.http.post('api/admin/users/' + id + '/block')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  unblock (id) {
    return Vue.http.post('api/admin/users/' + id + '/unblock')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  flags () {
    return Vue.http.get('api/admin/report/users')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  ignoreReport (id) {
    return Vue.http.delete('api/admin/report/users/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
}