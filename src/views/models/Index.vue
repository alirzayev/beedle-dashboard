<template>
    <div class="ui container">
        <div class="card-block">
            <button type="button" class="btn btn-primary" @click="addModal = true">Add Model</button>
        </div>

        <add-modal
                :add_modal="this.addModal">
        </add-modal>
        <edit-modal
                :edit_modal="this.editModal"
                :data="this.editedItem"
        ></edit-modal>
        <vue-table
                :columns="columns"
                :fields="fields"
                :image_attr="image_attr"
                :api_response="response"
                :per_page="pagination.per_page"
        ></vue-table>
    </div>
</template>

<script>
  import modal from 'vue-strap/src/Modal'
  import EditModal from './modals/Edit.vue'
  import AddModal from './modals/Add.vue'
  import modelServices from '../../api/model'
  import { default as swal } from 'sweetalert2'

  export default {
    data () {
      return {
        addModal: false,
        editModal: false,
        columns: ['Name'],
        fields: ['name'],
        image_attr: 'cover_url',
        response: [],
        formData: new FormData(),
        editedItem: {},
        pagination: {
          'per_page': 10
        }
      }
    },
    components: {
      modal,
      EditModal,
      AddModal
    },
    methods: {
      createItem (data) {
        modelServices.create(data)
          .then((response) => {
            swal(
              'Good job!',
              response.body.message,
              'success'
            )
            this.addModal = false
            this.$set(this.response, this.response.length, response.body.model)
            console.log('model saved', response.body)
          })
      },
      updateBrand (item) {
        this.editModal = true
        this.editedItem = item
      },
      deleteBrand (id, index) {
        swal({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(() => {
          return modelServices.delete(id)
            .then((response) => {
              swal(
                'Deleted!',
                'Model has been deleted.',
                'success'
              )
              console.log('deleted_model', response.body)
              console.log('deleted item index', index)
              this.response.splice(index, 1)
            })
        })
      }
    },
    created () {
      modelServices.models(this.$route.params.id)
        .then((response) => {
          console.log(response.body)
          this.response = response.body.brand.models
        })

      // Make event for child component (VueTable)
      this.$on('addItem', this.createItem)
      this.$on('updateItem', this.updateBrand)
      this.$on('deleteItem', this.deleteBrand)
    }
  }
</script>

<style>

</style>

