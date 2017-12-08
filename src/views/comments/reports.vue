<template>
    <div class="ui container">
        <vue-table
                :columns="columns"
                :fields="fields"
                :object_fields="object_fields"
                :objects="objects"
                :action_column="action_column"
                :editable="false"
                :api_response="response"
                :per_page="pagination.per_page"
        ></vue-table>
    </div>
</template>

<script>
  import commentServices from '../../api/comment'
  import { default as swal } from 'sweetalert2'
  import find from 'lodash/find'

  export default {
    data () {
      return {
        columns: ['Comment', 'Reported by', 'Reason'],
        action_column: 'reason',
        fields: ['reason'],
        object_fields: ['content', 'fullname'],
        objects: ['owner', 'comment'],
        action: {},
        response: [],
        pagination: {
          'per_page': 10
        }
      }
    },
    methods: {
      refresh () {
        this.$store.dispatch('getCommentFlags').then(() => {
          this.response = this.$store.state.reportedComments
          console.log('reports', this.response)
        })
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
          return commentServices.ignoreReport(id)
            .then((response) => {
              swal(
                'Delete!',
                'Your file has been ignored.',
                'success'
              )
              console.log('deleted_user', response.body)
              console.log('deleted items index', index)
              this.response.splice(index, 1)
            })
        })
      },
      changeStatus (id, status) {
        let reported = find(this.response, t => t.id === parseInt(id))
        swal({
          title: 'Delete Comment',
          text: 'Are you sure to do this?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(() => {
          return commentServices.delete(reported.comment.id).then(() => {
            this.refresh()
          })
        })
      },
      getActionDetails (id) {
        let reported = find(this.response, t => t.id === parseInt(id))
        if (reported.comment) {
          this.action.btn_title = 'Delete Comment'
          this.action.class = 'btn-warning'
          this.action.column_status = 'Active'
        }
        return this.action
      }
    },
    created () {
      this.refresh()
      // Make event for child component (VueTable)
      this.$on('deleteItem', this.deleteComment)
      this.$on('action', this.changeStatus)
    }
  }
</script>

<style>

</style>

