import Vue from 'vue'

export default {

  models(id) {

    return Vue.http.get('api/admin/brands/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  create (data) {
    return Vue.http.post('api/admin/models', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete (id) {
    return Vue.http.delete('api/admin/models/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  update (id, data) {
    return Vue.http.post('api/admin/models/' + id + '/update', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

}