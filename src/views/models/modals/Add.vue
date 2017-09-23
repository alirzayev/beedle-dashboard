<template>
    <div class="ui container">
        <modal title="aaaa" class="modal-primary" v-model="MyModal" @cancel="closeModal" @ok="saveItem"
               effect="fade/zoom">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">Add New Model</h4>
            </div>
            <div class="form-group">
                <label for="brand">Brand</label>
                <input type="text" id="brand" v-model="modelname" class="form-control"
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
  /* eslint-disable quotes */
  import modal from 'vue-strap/src/Modal'

  export default {
    data () {
      return {
        value: null,
        options: [],
        formData: new FormData(),
        modelname: this.modelname
      }
    },
    computed: {
      MyModal () {
        return this.add_modal
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
        this.formData.append('name', this.modelname)
        this.formData.append('brand_id', this.$route.params.id)
        this.$parent.$emit('addItem', this.formData)
      },
      closeModal () {
        this.$parent.addModal = false
      }
    },
    mounted () {
      this.$store.dispatch('getBrands').then(() => {
        this.options = this.$store.state.brands
      })
    },
    props: {
      add_modal: {
        type: Boolean,
        required: true
      }
    }
  }
</script>
