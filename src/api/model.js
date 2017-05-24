import Vue from 'vue'

export default {

  models(id) {

    return Vue.http.get('api/admin/brands/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  create(data) {

    return Vue.http.post('api/admin/models/', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

}