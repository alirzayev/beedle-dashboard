<template>
    <div class="ui container">
        <div class="card-block">
            <button type="button" class="btn btn-primary" @click="addModal = true">Add User</button>
        </div>
        <modal title="Modal title" class="modal-primary" v-model="addModal" @ok="addNewUser" effect="fade/zoom">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Add User</h4>
            </div>
            <div class="form-group">
                <label for="fullname">Fullname</label>
                <input type="text" id="fullname" v-model="userData.fullname" class="form-control"
                       placeholder="Name fullanme">
                <span class="help-block">Please enter your fullname</span>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="userData.email" class="form-control"
                       placeholder="Enter email">
                <span class="help-block">Please enter your email</span>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="userData.password" class="form-control"
                       placeholder="Enter password">
                <span class="help-block">Please enter your password</span>
            </div>
            <div class="form-group">
                <label for="cover">Cover</label>
                <input type="file" id="cover" @change="onFileChange" class="form-control">
            </div>
        </modal>

        <edit-modal
                :edit_modal="this.editModal"
                :item="this.editedItem"
        ></edit-modal>
        <vue-table
                :columns="columns"
                :fields="fields"
                :api_response="response"
                :api_service="getApi()"
        ></vue-table>
    </div>
</template>

<script>
  import modal from 'vue-strap/src/Modal'
  import EditModal from './modals/Edit.vue'
  import userService from '../../api/user'
  import { default as swal } from 'sweetalert2'

  export default {
    data () {
      return {
        addModal: false,
        editModal: false,
        userData: {
          'fullname': null,
          'email': null,
          'password': null,
          'created_at': Date.now()  // this item is not required! It is just about design!
                                    // it is fake item will display immediately when we add new user.
        },
        columns: ['Name', 'Email', 'Created At'],
        fields: ['fullname', 'email', 'created_at'],
        response: [],
        formData: new FormData(),
        editedItem: {}
      }
    },
    components: {
      modal,
      EditModal
    },
    methods: {
      addNewUser () {
        this.formData.append('fullname', this.userData.fullname)
        this.formData.append('email', this.userData.email)
        this.formData.append('password', this.userData.password)

        userService.create(this.formData)
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
      updateUser (item) {
        this.editModal = true
        this.editedItem = item
      },
      deleteUser (id, index) {
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(() => {
          return userService.delete(id)
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
      getApi () {
        return userService
      }
    },
    created () {
      userService.users()
        .then((response, error) => {
          console.log('users', response.body.users)
          this.response = response.body.users
        })
      // Make event for child component (VueTable)
      this.$on('updateItem', this.updateUser)
      this.$on('deleteItem', this.deleteUser)
    }
  }
</script>

<style>

</style>

