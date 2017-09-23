<template>
    <div class="ui container">
        <div class="card-block">
            <button type="button" class="btn btn-primary" @click="addModal = true">Add Topic</button>
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
  import topicServices from '../../api/topic'
  import { default as swal } from 'sweetalert2'

  export default {
    data () {
      return {
        addModal: false,
        editModal: false,
        columns: ['Title', 'Content', 'Likes', 'Comments', 'Model'],
        detail_column: 'comments_count',
        fields: ['title', 'content', 'likes_count', 'comments_count', 'name'],
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
    computed: {
      topics () {
        return this.$store.state.topics
      }
    },
    components: {
      modal,
      EditModal,
      AddModal
    },
    methods: {
      createItem (data) {
        topicServices.create(data)
          .then((response) => {
            swal(
              'Good job!',
              response.body.message,
              'success'
            )
            this.addModal = false
            this.$set(this.response, 0, response.body.topic)
            console.log('topic saved', response.body)
          })
      },
      updateUser (item) {
        this.editModal = true
        this.editedItem = item
      },
      deleteTopic (id, index) {
        swal({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(() => {
          return topicServices.delete(id)
            .then((response) => {
              swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              console.log('deleted_user', response.body)
              console.log('deleted items index', index)
              this.response.splice(index, 1)
            })
        })
      },
      topicComments (id) {
        this.$router.push('topics/' + id + '/comments')
      }
    },
    created () {
      this.$store.dispatch('getTopics').then(() => {
        this.response = this.$store.state.topics
      })
      // Make event for child component (VueTable)
      this.$on('addItem', this.createItem)
      this.$on('updateItem', this.updateUser)
      this.$on('deleteItem', this.deleteTopic)
      this.$on('show', this.topicComments)
    }
  }
</script>

<style>

</style>

