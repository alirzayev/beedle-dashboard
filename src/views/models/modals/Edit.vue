<template>
    <div class="ui container">
        <modal title="aaaa" class="modal-primary" v-model="MyModal" @cancel="closeModal" @ok="saveItem"
               effect="fade/zoom">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Add New Model</h4>
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="data.name" class="form-control"
                       placeholder="Enter the title">
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
  import modelServices from '../../../api/model'
  import { default as swal } from 'sweetalert2'

  export default {
    data () {
      return {
        value: null,
        options: [],
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
      saveItem () {
        this.formData.append('name', this.data.name)
        modelServices.update(this.data.id, this.formData)
          .then((response) => {
            swal(
              'Good job!',
              response.body.message,
              'success'
            )
            this.$parent.editModal = false
            console.log('brand updated', response.body)
            console.log('params', this.formData.cover)
          })
      },
      onFileChange (ele) {
        let files = ele.target.files || ele.dataTransfer.files
        if (!files.length) {
          return
        }
        this.formData.append('cover', files[0])
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
      data: {
        type: Object,
        required: true
      }
    }
  }
</script>
