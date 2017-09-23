import Vue from 'vue'

export default {

  create (data) {
    return Vue.http.post('api/admin/users', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete (id) {
    return Vue.http.delete('api/admin/comments/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  update (id, data) {
    return Vue.http.post('api/admin/users/' + id + '/update', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}