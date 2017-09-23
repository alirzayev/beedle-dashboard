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
  }
}