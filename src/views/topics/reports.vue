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
  import topicServices from '../../api/topic'
  import { default as swal } from 'sweetalert2'
  import find from 'lodash/find'

  export default {
    data () {
      return {
        columns: ['Title', 'Content', 'Status', 'Reported by', 'Reason'],
        action_column: 'is_active',
        fields: ['reason'],
        object_fields: ['title', 'content', 'is_active', 'fullname'],
        objects: ['topic', 'owner', 'user'],
        action: {},
        response: [],
        pagination: {
          'per_page': 10
        }
      }
    },
    methods: {
      refresh () {
        this.$store.dispatch('getFlags').then(() => {
          this.response = this.$store.state.reportedTopics
          console.log('reports', this.response)
        })
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
          return topicServices.ignoreReport(id)
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
          title: reported.topic.is_active === 1 ? 'Deactivate Topic' : 'Activate Topic',
          text: 'Are you sure to do this?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(() => {
          if (reported.topic.is_active === 1) {
            return topicServices.deactivate(reported.topic.id).then(() => {
              this.refresh()
            })
          } else {
            return topicServices.activate(reported.topic.id).then(() => {
              this.refresh()
            })
          }
        })
      },
      getActionDetails (id) {
        let reported = find(this.response, t => t.id === parseInt(id))
        if (reported.topic.is_active === 1) {
          this.action.btn_title = 'Deactivate'
          this.action.class = 'btn-warning'
          this.action.column_status = 'Active'
        } else {
          this.action.btn_title = 'Activate'
          this.action.class = 'btn-info'
          this.action.column_status = 'Deactive'
        }
        return this.action
      }
    },
    created () {
      this.refresh()
      // Make event for child component (VueTable)
      this.$on('deleteItem', this.deleteTopic)
      this.$on('action', this.changeStatus)
    }
  }
</script>

<style>

</style>

