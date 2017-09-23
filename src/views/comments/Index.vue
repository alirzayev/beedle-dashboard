<template>
    <div class="ui container">
        <vue-table
                :columns="columns"
                :fields="fields"
                :objects="objects"
                :api_response="response"
                :per_page="pagination.per_page"
        ></vue-table>
    </div>
</template>

<script>
  import modal from 'vue-strap/src/Modal'
  import EditModal from './modals/Edit.vue'
  import commentService from '../../api/comment'
  import { default as swal } from 'sweetalert2'

  export default {
    data () {
      return {
        addModal: false,
        editModal: false,
        columns: ['Comment', 'Commented by'],
        fields: ['content', 'fullname'],
        objects: ['owner'],
        response: [],
        formData: new FormData(),
        editedItem: {},
        pagination: {
          'per_page': 5
        }
      }
    },
    computed: {
      topic () {
        return this.$store.state.topic
      }
    },
    components: {
      modal,
      EditModal
    },
    methods: {
      addComment () {
        this.formData.append('fullname', this.userData.fullname)
        this.formData.append('email', this.userData.email)
        this.formData.append('password', this.userData.password)

        commentService.create(this.formData)
          .then((response) => {
            console.log('new user created', response.body)

            if (response.body.error === false) {
              swal(
                'Good job ..!',
                response.body.message,
                'success'
              )
              this.addModal = false
              // -- refresh the table immediately, when we add new user.
              // -- add new value to the '0' index of response array.
              this.$set(this.response, 0, this.userData)
            }
          })
      },
      onFileChange (ele) {
        let files = ele.target.files || ele.dataTransfer.files
        if (!files.length) {
          return
        }
        this.formData.append('cover', files[0])
      },
      updateComment (item) {
        this.editModal = true
        this.editedItem = item
      },
      deleteComment (id, index) {
        swal({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(() => {
          return commentService.delete(id)
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
      }
    },
    mounted () {
      this.$store.dispatch('getTopic', this.$route.params.id).then(() => {
        this.response = this.topic.comments
      })
      // Make event for child component (VueTable)
      this.$on('updateItem', this.updateComment)
      this.$on('deleteItem', this.deleteComment)
      this.$on('show', this.topicComments)
    }
  }
</script>

<style>

    .col-centered {
        float: none;
        margin: 0 auto;
    }

</style>

