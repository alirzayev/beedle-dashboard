<template>
    <div class="ui container">
        <vue-table
                :columns="columns"
                :fields="fields"
                :object_fields="object_fields"
                :objects="objects"
                :detail_column="detail_column"
                :action_column="action_column"
                :editable="false"
                :api_response="response"
                :per_page="pagination.per_page"
        ></vue-table>
    </div>
</template>

<script>
  import userServices from '../../api/user'
  import { default as swal } from 'sweetalert2'
  import find from 'lodash/find'

  export default {
    data () {
      return {
        columns: ['Fullname', 'Email', 'Reason'],
        action_column: 'is_blocked',
        detail_column: 'fullname',
        fields: ['reason'],
        object_fields: ['fullname', 'email'],
        objects: ['user'],
        action: {},
        response: [],
        pagination: {
          'per_page': 10
        }
      }
    },
    methods: {
      refresh () {
        this.$store.dispatch('getUserFlags').then(() => {
          this.response = this.$store.state.reportedUsers
          console.log('reports', this.response)
        })
      },
      deleteuser (id, index) {
        swal({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(() => {
          return userServices.ignoreReport(id)
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
          title: reported.user.is_blocked === 0 ? 'Block the user' : 'Unblock the user',
          text: 'Are you sure to do this?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(() => {
          if (reported.user.is_blocked === 0) {
            return userServices.block(reported.user.id).then(() => {
              this.refresh()
            })
          } else {
            return userServices.unblock(reported.user.id).then(() => {
              this.refresh()
            })
          }
        })
      },
      getActionDetails (id) {
        let reported = find(this.response, t => t.id === parseInt(id))
        if (reported.user.is_blocked === 1) {
          this.action.btn_title = 'Unblock'
          this.action.class = 'btn-warning'
          this.action.column_status = 'Blocked'
        } else {
          this.action.btn_title = 'Block'
          this.action.class = 'btn-info'
          this.action.column_status = 'Unblocked'
        }
        return this.action
      }
    },
    created () {
      this.refresh()
      // Make event for child component (VueTable)
      this.$on('deleteItem', this.deleteuser)
      this.$on('action', this.changeStatus)
    }
  }
</script>

<style>

</style>

