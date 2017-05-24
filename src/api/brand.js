import Vue from 'vue'

export default {

  brands() {

    return Vue.http.get('api/admin/brands')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  create(data) {

    return Vue.http.post('api/admin/brands', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

}