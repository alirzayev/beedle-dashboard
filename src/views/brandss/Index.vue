<template>
    <div class="ui container">
        <div class="card-block">
            <button type="button" class="btn btn-primary" @click="addModal = true">Add Brand</button>
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
                :objects="objects"
                :detail_column="detail_column"
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
  import brandServices from '../../api/brand'
  import { default as swal } from 'sweetalert2'

  export default {
    data () {
      return {
        addModal: false,
        editModal: false,
        columns: ['Name', 'Model'],
        detail_column: 'models_count',
        fields: ['name', 'models_count'],
        objects: ['model'],
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
        brandServices.create(data)
          .then((response) => {
            swal(
              'Good job!',
              response.body.message,
              'success'
            )
            this.addModal = false
            this.$set(this.response, this.response.length, response.body.brand)
            console.log('brand saved', response.body)
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
          return brandServices.delete(id)
            .then((response) => {
              swal(
                'Deleted!',
                'Brand has been deleted.',
                'success'
              )
              console.log('deleted_brand', response.body)
              console.log('deleted items index', index)
              this.response.splice(index, 1)
            })
        })
      },
      openModels (id) {
        this.$router.push('brands/' + id + '/models')
      }
    },
    created () {
      this.$store.dispatch('getBrands').then(() => {
        this.response = this.$store.state.brands
      })
      // Make event for child component (VueTable)
      this.$on('addItem', this.createItem)
      this.$on('updateItem', this.updateBrand)
      this.$on('deleteItem', this.deleteBrand)
      this.$on('show', this.openModels)
    }
  }
</script>

<style>

</style>

