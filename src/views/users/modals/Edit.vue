<template>
    <div class="ui container">
        <modal title="Modal title" class="modal-primary" v-model="MyModal" @cancel="closeModal" @ok="saveItem"
               effect="fade/zoom">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Edit User</h4>
            </div>
            <div class="form-group">
                <label for="fullname">Fullname</label>
                <input type="text" id="fullname" v-model="item.fullname" class="form-control"
                       value="">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="item.email" class="form-control"
                       placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="item.password" class="form-control"
                       placeholder="Enter password">
            </div>
            <div class="form-group">
                <label for="cover">Cover</label>
                <input type="file" id="cover" @change="onFileChange" class="form-control">
            </div>
        </modal>
    </div>
</template>

<script>
  import modal from 'vue-strap/src/Modal'
  import userService from '../../../api/user'
  import { default as swal } from 'sweetalert2'

  export default {
    data () {
      return {
        formData: new FormData()
      }
    },
    computed: {
      MyModal () {
        return this.edit_modal
      }
    },
    components: {
      modal
    },
    methods: {
      onFileChange (ele) {
        let files = ele.target.files || ele.dataTransfer.files
        if (!files.length) {
          return
        }
        this.formData.append('cover', files[0])
      },
      saveItem () {
        this.formData.append('fullname', this.item.fullname)
        this.formData.append('email', this.item.email)
        this.formData.append('password', this.item.password)

        userService.update(this.item.id, this.formData)
          .then((response) => {
            swal(
              'Good job!',
              response.body.message,
              'success'
            )
            this.$parent.editModal = false
            console.log('user saved', response.body)
          })
      },
      closeModal () {
        this.$parent.editModal = false
      }
    },
    props: {
      edit_modal: {
        type: Boolean,
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>
